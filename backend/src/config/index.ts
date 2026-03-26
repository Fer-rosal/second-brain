import 'dotenv/config';

interface Config {
  TELEGRAM_TOKEN: string;
  N8N_WEBHOOK_URL: string;
  PORT: number;
}

if (!process.env.TELEGRAM_TOKEN) {
  console.error("Error: TELEGRAM_TOKEN no está definido en el archivo .env");
  process.exit(1);
}

if (!process.env.N8N_WEBHOOK_URL) {
  console.error("Error: N8N_WEBHOOK_URL no está definido en el archivo .env");
  process.exit(1);
}

const config: Config = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};

export default config;