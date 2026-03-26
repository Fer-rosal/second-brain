import { Bot } from "grammy";
import axios from "axios";
import config from "./config/index.js";

const { TELEGRAM_TOKEN, N8N_WEBHOOK_URL, PORT } = config;

const bot = new Bot(TELEGRAM_TOKEN);

bot.on("message", async (ctx) => {
  const text = ctx.message?.text;
  
  if (!text) return;

  try {
    // El bot es un "puente" hacia el cerebro en n8n
    const response = await axios.post(N8N_WEBHOOK_URL, {
      chatId: ctx.chat.id,
      userName: ctx.from?.first_name,
      text: text,
    });

    if (response.data && response.data.reply) {
      await ctx.reply(response.data.reply);
    }
  } catch (error) {
    console.error("Error en el puente n8n:", error);
    await ctx.reply("Lo siento, perdí la conexión con mi cerebro central.");
  }
});

bot.start();
console.log("🤖 Bot (TS) en marcha...");
