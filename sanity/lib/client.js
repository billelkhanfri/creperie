// sanity/client.js
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-12-14", // YYYY-MM-DD
  useCdn: false, // true = lecture rapide mais données pas toujours à jour
  token: process.env.SANITY_API_TOKEN, // seulement côté serveur
});
