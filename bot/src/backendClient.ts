import axios from 'axios'
import { config } from './config'

export const backend = axios.create({
  baseURL: config.backendUrl,
  timeout: 5000,
  headers: config.botSharedSecret
    ? { 'x-bot-token': config.botSharedSecret }
    : undefined,
})
