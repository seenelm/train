import { rest } from "msw";

export const handlers = [
  rest.post("http://192.168.1.59:3000/api/register", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        token: "sample_token",
        username: "Username",
        userId: 1237,
      })
    );
  }),
  rest.post("http://192.168.1.59:3000/api/login", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        token: "sample_token",
        username: "Username",
        userId: 1237,
      })
    );
  }),
];
