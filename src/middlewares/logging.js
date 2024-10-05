import { appendFileSync } from "fs";

export const logging = (req, res, next) => {
  res.on("finish", () => {
    const startDateTime = new Date();
    const ip = req.ip;
    const url = req.originalUrl;
    const method = req.method;
    const code = res.statusCode;

    appendFileSync(
      "log.log",
      `${method} | ${startDateTime.toISOString()} | ${code} | ${url} | ${ip}\n`
    );
  });

  next();
};
