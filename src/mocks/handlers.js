import { rest } from 'msw';
import { PUBLIC_SELF_API_HOST } from '/config/env';

export const handlers = [
  rest.get(`${PUBLIC_SELF_API_HOST}/health`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'good health' }));
  }),
  rest.get(`${PUBLIC_SELF_API_HOST}/not-health`, async (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({ message: 'not health' }));
  }),
  rest.get(`${PUBLIC_SELF_API_HOST}/health-timeout`, async (req, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return res(ctx.status(200), ctx.json({ message: 'good health' }));
  }),
];
