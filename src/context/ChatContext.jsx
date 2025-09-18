import { createContext, useState, useEffect, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { generateResponseService } from "../api/geminiService";
import { defaultSuggestions } from "../data/defaultPrompts";
// import useAuth from "../hooks/useAuth";
import {
  getConversationsService,
  createConversationService,
  updateConversationService,
  deleteConversationService,
} from "../api/conversationService";
import { getMessagesService, addMessageService } from "../api/messageService";

const ChatContext = createContext();

const ChatProvider = ({ children, user, token }) => {
  // Get auth status
  //   const { user, token } = useAuth();

  // UI State
  const [activeItem, setActiveItem] = useState(null);
  const [promptSuggestions, setPromptSuggestions] = useState([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);

  // Backend Data State
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Error handling
  const [error, setError] = useState(null);

  // Track if we've attempted to load conversations for this user
  const [hasLoadedConversations, setHasLoadedConversations] = useState(false);

  // FIXED: Make loadConversations a useCallback to prevent dependency issues
  const loadConversations = useCallback(async () => {
    // Double-check authentication before making API calls
    if (!user || !token) {
      console.log("Skipping conversation load - user not authenticated");
      setIsLoadingChats(false);
      return;
    }

    try {
      setIsLoadingChats(true);
      setError(null);
      console.log("Loading conversations for user:", user.username);

      const response = await getConversationsService();

      // Transform backend data to match frontend format
      const transformedChats = response.data.conversations.map((conv) => ({
        id: conv._id,
        title: conv.title,
        createdAt: conv.createdAt,
        lastActivity: conv.lastActivity,
        messageCount: conv.messageCount,
        isArchived: conv.isArchived,
      }));

      setChatHistory(transformedChats);
      setHasLoadedConversations(true);
      console.log(
        "Successfully loaded conversations:",
        transformedChats.length
      );
    } catch (error) {
      console.error("Failed to load conversations:", error);

      // Only show error if user is actually authenticated
      if (user && token) {
        setError("Failed to load conversations. Using local storage.");

        // Fallback to localStorage if backend fails
        const savedChats = localStorage.getItem("chatHistory");
        if (savedChats) {
          setChatHistory(JSON.parse(savedChats));
        }
      }
    } finally {
      setIsLoadingChats(false);
    }
  }, [user, token]); // Include dependencies

  // FIXED: Properly handle auth state changes
  useEffect(() => {
    if (user && token && !hasLoadedConversations) {
      console.log("User authenticated, loading conversations...");
      loadConversations();
    } else if (!user || !token) {
      // Clear data if user logs out
      console.log("User not authenticated, clearing data...");
      setChatHistory([]);
      setCurrentMessages([]);
      setIsLoadingChats(false);
      setError(null);
      setHasLoadedConversations(false); // Reset load flag
    }
  }, [user, token, hasLoadedConversations, loadConversations]);

  const loadMessages = useCallback(
    async (conversationId) => {
      // Check authentication before loading messages
      if (!user || !token) {
        console.log("Cannot load messages - user not authenticated");
        return [];
      }

      try {
        setIsLoadingMessages(true);
        setError(null);
        const response = await getMessagesService(conversationId);

        // Transform backend messages to frontend format
        const transformedMessages = response.data.messages.map((msg) => ({
          id: msg._id,
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          createdAt: msg.createdAt,
          isEdited: msg.isEdited,
        }));

        setCurrentMessages(transformedMessages);
        return transformedMessages;
      } catch (error) {
        console.error("Failed to load messages:", error);
        if (user && token) {
          setError("Failed to load messages");
        }

        // Fallback to localStorage
        const savedMessages = localStorage.getItem(
          `chatMessages_${conversationId}`
        );
        if (savedMessages) {
          const messages = JSON.parse(savedMessages);
          setCurrentMessages(messages);
          return messages;
        }
        return [];
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [user, token]
  );

  const addChat = useCallback(
    async (title = "New Chat") => {
      // Check authentication before creating chat
      if (!user || !token) {
        console.log("Cannot create chat - user not authenticated");
        throw new Error("User not authenticated");
      }

      try {
        const response = await createConversationService(title);
        const newChat = {
          id: response.data.conversation._id,
          title: response.data.conversation.title,
          createdAt: response.data.conversation.createdAt,
          lastActivity: response.data.conversation.lastActivity,
          messageCount: 0,
          isArchived: false,
        };

        setChatHistory((prev) => [newChat, ...prev]);
        return newChat;
      } catch (error) {
        console.error("Failed to create conversation:", error);

        if (user && token) {
          setError("Failed to create conversation");
        }

        // Fallback to local creation only if authenticated
        if (user && token) {
          const localChat = {
            id: `chat-${Date.now()}`,
            title,
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            messageCount: 0,
            isArchived: false,
          };
          setChatHistory((prev) => [localChat, ...prev]);
          return localChat;
        }

        throw error; // Re-throw if not authenticated
      }
    },
    [user, token]
  );

  const deleteChat = useCallback(
    async (chatId) => {
      if (!user || !token) return;

      try {
        await deleteConversationService(chatId);
        setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));

        // Clear messages if this was the active chat
        if (activeItem === chatId) {
          setCurrentMessages([]);
        }
      } catch (error) {
        console.error("Failed to delete conversation:", error);
        if (user && token) {
          setError("Failed to delete conversation");
        }

        // Fallback to local deletion
        setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
      }
    },
    [user, token, activeItem]
  );

  const renameChat = useCallback(
    async (chatId, newTitle) => {
      if (!user || !token) return;

      try {
        await updateConversationService(chatId, { title: newTitle });
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === chatId ? { ...chat, title: newTitle } : chat
          )
        );
      } catch (error) {
        console.error("Failed to rename conversation:", error);
        if (user && token) {
          setError("Failed to rename conversation");
        }

        // Fallback to local rename
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === chatId ? { ...chat, title: newTitle } : chat
          )
        );
      }
    },
    [user, token]
  );

  const addMessage = useCallback(
    async (conversationId, content, role) => {
      if (!user || !token) {
        throw new Error("User not authenticated");
      }

      try {
        const response = await addMessageService(conversationId, content, role);
        const newMessage = {
          id: response.data.message._id,
          role: response.data.message.role,
          content: response.data.message.content,
          timestamp: new Date(
            response.data.message.createdAt
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          createdAt: response.data.message.createdAt,
          isEdited: false,
        };

        setCurrentMessages((prev) => [...prev, newMessage]);

        // Update chat history with new message count and last activity
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === conversationId
              ? {
                  ...chat,
                  messageCount: chat.messageCount + 1,
                  lastActivity: new Date().toISOString(),
                }
              : chat
          )
        );

        return newMessage;
      } catch (error) {
        console.error("Failed to add message:", error);
        if (user && token) {
          setError("Failed to save message");
        }

        // Fallback to local storage only if authenticated
        if (user && token) {
          const localMessage = {
            id: `${role}-${Date.now()}`,
            role,
            content,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            createdAt: new Date().toISOString(),
            isEdited: false,
          };

          setCurrentMessages((prev) => [...prev, localMessage]);
          return localMessage;
        }

        throw error; // Re-throw if not authenticated
      }
    },
    [user, token]
  );

  // Generate prompt suggestions (doesn't require auth)
  const fetchPromptSuggestions = async () => {
    if (promptSuggestions.length > 0) return;
    setIsLoadingPrompts(true);

    try {
      const promptRequest =
        "Give me five prompt ideas of any topic, to see what you're capable of. Prompts must be only text generation-related. Must be a sentence long (not more than 10-12 words). Each prompt should be separated by a hyphen. Go straight to the point.";
      const botResponseContent = await generateResponseService(
        promptRequest,
        []
      );
      promptRequest, [];
      const arrayPrompts = botResponseContent
        .split("-")
        .filter((p) => p.trim() !== "");
      const promptCards = arrayPrompts.map((suggestion) => ({
        icon: <Sparkles className="prompt-card__icon" />,
        title: suggestion.trim(),
      }));
      setPromptSuggestions(promptCards);
    } catch (error) {
      console.error("Failed to generate prompt suggestion:", error);
      setPromptSuggestions(defaultSuggestions);
    } finally {
      setIsLoadingPrompts(false);
    }
  };

  const createNewChat = useCallback(
    async (navigate, firstMessage = null) => {
      if (!user || !token) {
        console.log("Cannot create new chat - user not authenticated");
        return;
      }

      try {
        // Create conversation with a temporary title
        const tempTitle = firstMessage
          ? firstMessage.length > 25
            ? `${firstMessage.substring(0, 25)}...`
            : firstMessage
          : "New Chat";

        const newChat = await addChat(tempTitle);
        setActiveItem(newChat.id);

        if (firstMessage) {
          navigate(`/chat/${newChat.id}`, { state: { firstMessage } });
        } else {
          navigate(`/chat/${newChat.id}`);
        }

        return newChat.id;
      } catch (error) {
        console.error("Failed to create new chat:", error);
        if (user && token) {
          setError("Failed to create new chat");
        }
      }
    },
    [user, token, addChat]
  ); // Include addChat in dependencies

  const clearError = () => setError(null);

  const value = {
    // UI State
    activeItem,
    setActiveItem,
    promptSuggestions,
    isLoadingPrompts,

    // Data State
    chatHistory,
    currentMessages,
    isLoadingChats,
    isLoadingMessages,
    error,

    // Actions
    loadConversations,
    loadMessages,
    addChat,
    deleteChat,
    renameChat,
    addMessage,
    fetchPromptSuggestions,
    createNewChat,
    clearError,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatContext, ChatProvider };
