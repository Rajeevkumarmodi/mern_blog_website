import { apiCommanRequest } from "./apiCommanRequest";
const USER_BASE_URL = "http://localhost:8080/user/api";
const BLOG_BASE_URL = "http://localhost:8080/blog/api";
// http://localhost:8080/user/api/userinfo

export const signupUser = async (body, header) => {
  return await apiCommanRequest(
    "POST",
    `${USER_BASE_URL}/signup`,
    body,
    header
  );
};

export const loginUser = async (body, header) => {
  return await apiCommanRequest("POST", `${USER_BASE_URL}/login`, body, header);
};

export const singleUser = async (header, body) => {
  return await apiCommanRequest(
    "GET",
    `${USER_BASE_URL}/userinfo`,
    body,
    header
  );
};
