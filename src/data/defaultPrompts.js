import { Sparkles, Mail, FileText, Share2 } from "lucide-react";

export const defaultSuggestions = [
  {
    icon: <Sparkles className="prompt-card__icon" />,
    title: "Create a step-by-step plan for launching a new product",
  },
  {
    icon: <Mail className="prompt-card__icon" />,
    title: "Write a polite email to decline an invitation to a Webinar",
  },
  {
    icon: <FileText className="prompt-card__icon" />,
    title: "Summarize this blog post in a few key points",
  },
  {
    icon: <Share2 className="prompt-card__icon" />,
    title: "Explain blockchain in simple terms, assume I am a 5 YO",
  },
];
