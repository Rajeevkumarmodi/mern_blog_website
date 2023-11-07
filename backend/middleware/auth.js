import jwt from "jsonwebtoken";

const jwt_authentication = async (req, res, next) => {
  const token = req.header("auth_token");
  if (!token) {
    return res
      .status(404)
      .send({ error: "Please authenticate using a valid token" });
  }

  try {
    const { userId } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = userId;
    console.log("fetchuser", userId);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error", error });
  }
};

export default jwt_authentication;
