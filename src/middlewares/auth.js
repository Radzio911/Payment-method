import jwt from "jsonwebtoken";
import { Session, User } from "../models/index.js";

export const auth = async (req, res, next) => {
  const token = req.body.token || req.cookies.token;

  if (!token) {
    req.user = null;
    req.session = null;
    req.isAuthenticated = () => false;
    req.getUserId = () => null;
    next();
  }

  jwt.verify(token, process.env.JWT, async (err, decoded) => {
    if (!err) {
      const sessionId = decoded.sessionId;
      const session = await Session.findById(sessionId);
      if (session) {
        if (!session.expired) {
          req.user = await User.findById(session.user);
          req.session = session;
        } else {
          await Session.findByIdAndDelete(sessionId);
          req.user = null;
          req.session = null;
        }
      } else {
        req.user = null;
        req.session = null;
      }
    } else {
      req.user = null;
      req.session = null;
    }

    req.isAuthenticated = () => {
      return req.session != null && req.user != null;
    };

    req.getUserId = () => {
      return req.user ? req.user._id : null;
    };
  });
  next();
};

export const requireLogin = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.status(403).json({ message: "You should be logged in!" });
};
