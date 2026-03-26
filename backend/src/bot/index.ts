import { Bot } from "grammy";
import axios from "axios";
import config from "../config/index.js";

const bot = new Bot(config.TELEGRAM_TOKEN);

bot.on("message:text", async (ctx) => {
  const userText = ctx.message.text;

  try {
    // 1. Envía el texto a n8n
    const response = await axios.post(config.N8N_WEBHOOK_URL, {
      text: userText,
      userName: ctx.from.first_name
    });

    // 2. Extrae la respuesta de Gemini del JSON que configuramos en n8n
    const aiReply = response.data.reply;

    // 3. Responde al usuario en Telegram
    await ctx.reply(aiReply);

  } catch (error) {
    console.error("Error conectando con el cerebro n8n:", error);
    await ctx.reply("Lo siento, estoy teniendo un cortocircuito.");
  }
});

export default bot;