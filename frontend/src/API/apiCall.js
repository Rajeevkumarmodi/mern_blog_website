import { apiCommanRequest } from "./apiCommanRequest";
const USER_BASE_URL = "https://mern-blog-website-api.vercel.app/user/api";
const BLOG_BASE_URL = "https://mern-blog-website-api.vercel.app/blog/api";

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

export const allUsersAllBlogs = async (header, categorie, search, body) => {
  return await apiCommanRequest(
    "GET",
    `${BLOG_BASE_URL}/allblogs/?categorie=${categorie}&search=${search}`,
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

// user blogs

export const userBlogs = async (header, body) => {
  return await apiCommanRequest(
    "GET",
    `${BLOG_BASE_URL}/getuserblogs`,
    body,
    header
  );
};

// edit single blog

export const editSingleBlog = async (body, header, id) => {
  return await apiCommanRequest(
    "PATCH",
    `${BLOG_BASE_URL}/editblog/${id}`,
    body,
    header
  );
};

// delete blog

export const deleteSingleBlog = async (id, header, body) => {
  return apiCommanRequest("DELETE", `${BLOG_BASE_URL}/${id}`, body, header);
};
