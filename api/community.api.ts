import instance from "./axios";

export const getCommunityPosts = async () => {
  const response = await instance.get("/community/posts");
  return response;
};

export const createPost = async (data: { content: string }) => {
  const response = await instance.post("/community/posts", data);
  return response;
};

export const getEvents = async () => {
  const response = await instance.get("/community/events");
  return response;
};
