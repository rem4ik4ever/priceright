// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { subscribeRouter } from "./subscribe";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('public.', subscribeRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
