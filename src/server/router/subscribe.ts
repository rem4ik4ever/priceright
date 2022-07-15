import { createRouter } from "./context";
import { z } from 'zod'
import { addSubscriptionEmail } from "../services/email-subscription";

export const subscribeRouter = createRouter()
.mutation("subscribeEmail", {
  input: z
    .object({
      email: z.string().email('invalid_email').min(1),
    })
    .nullish(),
  async resolve({ ctx, input }) {
    const subscribed = await addSubscriptionEmail(input?.email as string)
    if(subscribed){
      return {
        succes: true
      }
    }
    return {
      success: false
    };
  },
})
