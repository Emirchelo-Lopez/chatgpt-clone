import axiosInstance from "./axios";

// Get all conversations for the current user
export const getConversationsService = async (
  page = 1,
  limit = 20,
  archived = false
) => {
  const response = await axiosInstance.get("/api/conversations", {
    params: { page, limit, archived },
  });
  return response.data;
};

// Get a single conversation with its messages
export const getConversationService = async (conversationId) => {
  const response = await axiosInstance.get(
    `/api/conversations/${conversationId}`
  );
  return response.data;
};

// Create a new conversation
export const createConversationService = async (title = "New Chat") => {
  const response = await axiosInstance.post("/api/conversations", { title });
  return response.data;
};

// Update conversation (mainly for renaming)
export const updateConversationService = async (conversationId, data) => {
  const response = await axiosInstance.put(
    `/api/conversations/${conversationId}`,
    data
  );
  return response.data;
};

// Delete a conversation
export const deleteConversationService = async (conversationId) => {
  const response = await axiosInstance.delete(
    `/api/conversations/${conversationId}`
  );
  return response.data;
};

// Archive/unarchive a conversation
export const archiveConversationService = async (
  conversationId,
  archived = true
) => {
  const response = await axiosInstance.patch(
    `/api/conversations/${conversationId}/archive`,
    { archived }
  );
  return response.data;
};
