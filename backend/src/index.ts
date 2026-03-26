import { Bot } from "grammy";
import axios from "axios";
import config from "./config/index.js";
import bot from "./bot/index.js";


const { TELEGRAM_TOKEN, N8N_WEBHOOK_URL, PORT } = config;

//antes de iniciar el bot, hay que mandar un 
//post a la direccón de test del webhook a n8n para asegurarnos que el webhook está activo
axios.post(N8N_WEBHOOK_URL, { test: true })
  .then(() => {
    console.log("Webhook de n8n activo");
  })
  .catch((error) => {
    console.error("Error al activar el webhook de n8n:", error);
  });

const startBot = async () => {
  try {
    await bot.start();
    console.log(`Bot iniciado en el puerto ${PORT}`);
  } catch (error) {
    console.error("Error al iniciar el bot:", error);
  }}

console.log("🤖 Bot (TS) en marcha...");
