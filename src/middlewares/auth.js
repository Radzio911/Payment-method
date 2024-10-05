import jwt from "jsonwebtoken";
import { Session } from "../models/index.js";

export const auth = async (req, res, next) => {
  await jwt.verify(req.cookies.token, process.env.JWT, async (err, decoded) => {
    if (err) {
    } else {
      const sessionId = decoded.sessionId;
      const session = await Session.findById(sessionId);
      if (session) {
        if (!session.expired) {
          req.user = session.user;
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
    }
    req.isAuthenticated = () => {
      return req.session != null && req.user != null;
    };
  });
  next();
};

export const requireLogin = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.status(403).json({ message: "You should be logged in!" });
};
