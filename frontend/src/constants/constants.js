let hostName = window.location?.hostname;
export const USER_BASE_URL =
  hostName === "localhost"
    ? "http://localhost:8080/user/api"
    : "https://mern-blog-website-api.vercel.app/user/api";
export const BLOG_BASE_URL =
  hostName === "localhost"
    ? "http://localhost:8080/blog/api"
    : "https://mern-blog-website-api.vercel.app/blog/api";
