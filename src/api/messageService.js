import axiosInstance from "./axios";

// Get messages for a specific conversation
export const getMessagesService = async (
  conversationId,
  page = 1,
  limit = 50
) => {
  const response = await axiosInstance.get(`/api/messages/${conversationId}`, {
    params: { page, limit },
  });
  return response.data;
};

// Add a new message to a conversation
export const addMessageService = async (conversationId, content, role) => {
  const response = await axiosInstance.post("/api/messages", {
    conversationId,
    content,
    role,
  });
  return response.data;
};

// Edit an existing message
export const editMessageService = async (messageId, content, role) => {
  const response = await axiosInstance.put(`/api/messages/${messageId}`, {
    content,
    role,
  });
  return response.data;
};

// Delete a message
export const deleteMessageService = async (messageId) => {
  const response = await axiosInstance.delete(`/api/messages/${messageId}`);
  return response.data;
};
