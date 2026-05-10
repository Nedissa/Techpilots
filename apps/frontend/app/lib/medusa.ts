import Medusa from "@medusajs/js-sdk"

export const medusa = new Medusa({
  baseUrl: "https://techpilots.medusajs.app",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
})
