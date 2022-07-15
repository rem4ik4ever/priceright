import { createRouter } from "./context";
import {z} from 'zod'

const trackerRouter = createRouter()
  .mutation("open", {
    input: z.object({
      tracker: z.string()
    }),
    async resolve({ctx, input}) {
      await prisma?.pixelTracker.update({
        where: {tracker: input.tracker},
        data: {openCount: {increment: 1}}
      })
      return true;
    }
  })
