import { apiCommanRequest } from "./apiCommanRequest";
const USER_BASE_URL = "http://localhost:8080/user/api";
const BLOG_BASE_URL = "http://localhost:8080/blog/api";

export const signupUser = async (body, header) => {
  return await apiCommanRequest(
    "POST",
    `${USER_BASE_URL}/signup`,
    body,
    header
  );
};
