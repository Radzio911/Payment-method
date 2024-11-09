import { appendFileSync } from "fs";

export const error = (err, req, res, next) => {
  appendFileSync("error.log", `${err}\n`);
  res.json({ error: err + "" });
};
