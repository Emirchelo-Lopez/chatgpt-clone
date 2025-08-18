import { Sparkles, Mail, FileText, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import PromptCard from "../../components/ui/PromptCard/PromptCard";
import ChatInput from "../../components/ui/ChatInput/ChatInput";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import { generateResponse } from "../../api/gemini-ai";
import "./home-page.scss";

const HomePage = () => {
  const [promptSuggestions, setPromptSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to generate a single prompt suggestion
    const generatePromptSuggestion = async () => {
      const promptRequest =
        "Give me five prompt ideas of any topic, to see what you're capable of. Prompts must be only text generation-related. Must be a sentence long (not more than 10-12 words). Each prompt should be separated by a hyphen. Go straight to the point.";

      try {
        // Get AI response
        const botResponseContent = await generateResponse(promptRequest, []); // Last parameter asks for all the chat conversation, since is only one message we leave it empty
        return botResponseContent;
      } catch (error) {
        console.error("Failed to generate prompt suggestion:", error);
        return "Write a creative story about a magical forest";
      }
    };

    // Function to generate 4 prompt suggestions
    const renderPromptSuggestions = async () => {
      setIsLoading(true);

      const stringPrompts = await generatePromptSuggestion();

      const arrayPrompts = stringPrompts.split("-");

      const promptCards = arrayPrompts.map((suggestion) => ({
        icon: <Sparkles className="prompt-card__icon" />,
        title: suggestion,
      }));

      setPromptSuggestions(promptCards);

      setIsLoading(false);

      //   try {
      //     const suggestions = await Promise.all([
      //       generatePromptSuggestion(),
      //       generatePromptSuggestion(),
      //       generatePromptSuggestion(),
      //       generatePromptSuggestion(),
      //     ]);

      //   } catch (error) {
      //     console.error("Failed to generate prompt suggestions:", error);
      //     // Fallback to default suggestions
      //     setPromptSuggestions([
      //       {
      //         icon: <Sparkles className="prompt-card__icon" />,
      //         title: "Create a step-by-step plan for launching a new product",
      //       },
      //       {
      //         icon: <Mail className="prompt-card__icon" />,
      //         title: "Write a polite email to decline an invitation to a Webinar",
      //       },
      //       {
      //         icon: <FileText className="prompt-card__icon" />,
      //         title: "Summarize this blog post in a few key points",
      //       },
      //       {
      //         icon: <Share2 className="prompt-card__icon" />,
      //         title: "Explain blockchain in simple terms, assume I am a 5 YO",
      //       },
      //     ]);
      //   } finally {
      //     setIsLoading(false);
      //   }
    };

    renderPromptSuggestions();
  }, []);

  return (
    <div className="chatgpt-clone">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Section */}
        <div className="main-content__welcome-section">
          <div className="main-content__welcome-container">
            {/* Welcome Message */}
            <h1 className="main-content__welcome-title">Hey there 👋</h1>
            <h2 className="main-content__welcome-subtitle">
              What can I help with?
            </h2>

            {/* Description */}
            <p className="main-content__description">
              I handcrafted these prompts just for you! Premium, top-shelf
              stuff! Use them wisely or recklessly. No judgment! 😊
            </p>

            {/* Prompt Suggestions Grid */}
            <div className="main-content__prompts-grid">
              {promptSuggestions.slice(0, 4).map((prompt, index) => (
                <PromptCard
                  key={index}
                  icon={prompt.icon}
                  title={prompt.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="main-content__chat-input-section">
          <div className="main-content__chat-input-container">
            <ChatInput placeholder="Message ChatGPT" />
            <p className="main-content__footer-text">
              ChatGPT can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
