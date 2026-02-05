export const config = {
  botToken: process.env.BOT_TOKEN!,
  backendUrl: process.env.BACKEND_URL ?? 'http://localhost:3000',
  botSharedSecret: process.env.BOT_SHARED_SECRET ?? '',
}
