import { createContext, useState, useEffect, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { generateResponse } from "../api/gemini-ai";
import { defaultSuggestions } from "../data/defaultPrompts";
import {
  getConversationsService,
  getConversationService,
  createConversationService,
  updateConversationService,
  deleteConversationService,
} from "../api/conversationService";
import { getMessagesService, addMessageService } from "../api/messageService";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // UI State
  const [activeItem, setActiveItem] = useState(null);
  const [promptSuggestions, setPromptSuggestions] = useState([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);

  // Backend Data State
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Error handling
  const [error, setError] = useState(null);

  // Load conversations when component mounts
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setIsLoadingChats(true);
      setError(null);
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
    } catch (error) {
      console.error("Failed to load conversations:", error);
      setError("Failed to load conversations");
      // Fallback to localStorage if backend fails
      const savedChats = localStorage.getItem("chatHistory");
      if (savedChats) {
        setChatHistory(JSON.parse(savedChats));
      }
    } finally {
      setIsLoadingChats(false);
    }
  };

  const loadMessages = async (conversationId) => {
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
      setError("Failed to load messages");
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
  };

  const addChat = async (title = "New Chat") => {
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
      setError("Failed to create conversation");

      // Fallback to local creation
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
  };

  const deleteChat = async (chatId) => {
    try {
      await deleteConversationService(chatId);
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));

      // Clear messages if this was the active chat
      if (activeItem === chatId) {
        setCurrentMessages([]);
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      setError("Failed to delete conversation");

      // Fallback to local deletion
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    }
  };

  const renameChat = async (chatId, newTitle) => {
    try {
      await updateConversationService(chatId, { title: newTitle });
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, title: newTitle } : chat
        )
      );
    } catch (error) {
      console.error("Failed to rename conversation:", error);
      setError("Failed to rename conversation");

      // Fallback to local rename
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, title: newTitle } : chat
        )
      );
    }
  };

  const addMessage = async (conversationId, content, role) => {
    try {
      const response = await addMessageService(conversationId, content, role);
      const newMessage = {
        id: response.data.message._id,
        role: response.data.message.role,
        content: response.data.message.content,
        timestamp: new Date(response.data.message.createdAt).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
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
      setError("Failed to save message");

      // Fallback to local storage
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
  };

  // Generate prompt suggestions (unchanged)
  const fetchPromptSuggestions = async () => {
    if (promptSuggestions.length > 0) return;
    setIsLoadingPrompts(true);

    try {
      const promptRequest =
        "Give me five prompt ideas of any topic, to see what you're capable of. Prompts must be only text generation-related. Must be a sentence long (not more than 10-12 words). Each prompt should be separated by a hyphen. Go straight to the point.";
      const botResponseContent = await generateResponse(promptRequest, []);
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

  const createNewChat = useCallback(async (navigate, firstMessage = null) => {
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
      setError("Failed to create new chat");
    }
  }, []);

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
