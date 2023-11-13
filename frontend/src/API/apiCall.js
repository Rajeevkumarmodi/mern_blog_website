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

// create blog api call
export const creatBlog = async (body, header) => {
  return await apiCommanRequest(
    "POST",
    `${BLOG_BASE_URL}/createblog`,
    body,
    header
  );
};

// all blogs api

export const allUsersAllBlogs = async (header, body) => {
  return await apiCommanRequest(
    "GET",
    `${BLOG_BASE_URL}/allblogs`,
    body,
    header
  );
};

// signle blog api

export const singleBlog = async (id, header, body) => {
  return await apiCommanRequest(
    "GET",
    `${BLOG_BASE_URL}/bloginfo/${id}`,
    body,
    header
  );
};

// user like blog api

export const userLikeBlog = async (id, header, body) => {
  return await apiCommanRequest(
    "GET",
    `${BLOG_BASE_URL}/${id}/like`,
    body,
    header
  );
};

// user unlike blog api

export const userUnlikeBlog = async (id, header, body) => {
  return await apiCommanRequest(
    "GET",
    `${BLOG_BASE_URL}/${id}/unlike`,
    body,
    header
  );
};

// comment api

export const userComment = async (id, header, body) => {
  return await apiCommanRequest(
    "POST",
    `${BLOG_BASE_URL}/${id}/comment`,
    body,
    header
  );
};
