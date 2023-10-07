import { rest } from "msw";

export const handlers = [
  rest.post("http://192.168.1.59:3000/api/register", (req, res, ctx) => {
    const data = {
      name: "Name",
      username: "Username",
      password: "Password123!",
    };
    return res(ctx.status(201), ctx.json(data));
  }),
];
