const LIMIT = 24 * 60 * 60;

function today() {
  const t = new Date();
  return `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}`;
}

const requests = {};

export const rateLimiting = (req, res, next) => {
  const t = today();
  const ip = req.ip;
  if (requests[ip]) {
    if (requests[ip][t]) {
      requests[ip][t] += 1;
    } else {
      requests[ip] = { [t]: 1 };
    }
  } else {
    requests[ip] = { [t]: 1 };
  }

  console.log(requests[ip][t], LIMIT, requests[ip][t] > LIMIT);

  if (requests[ip][t] > LIMIT) {
    console.log("Limit");
    res.json({ error: "limit" });
  } else {
    console.log("Nie Limit");
    next();
  }
};
