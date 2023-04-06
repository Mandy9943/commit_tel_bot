import * as TelegramBot from "node-telegram-bot-api";
import { config } from "./config";
import { deleteChatGroup, saveChatGroup } from "./db";

const bot = new TelegramBot(config.telegram.token, { polling: true });

export async function sendMessage(
  chatId: number,
  message: string
): Promise<void> {
  await bot.sendMessage(chatId, message);
  console.log(`message : ${message} sent \n`);
}

// Configurar una respuesta cuando el bot reciba el comando /start
bot.onText(/\/start/, (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    "¡Hola! Soy el bot de Github para Telegram. Estoy aquí para mantenerte informado sobre los últimos commits en un repositorio de Github. Para empezar, envíame el nombre del repositorio que deseas monitorear."
  );
});

bot.onText(/\/post_group_commits/, async (msg) => {
  const chatId = msg.chat.id;

  // Insertar el chat id en la tabla

  try {
    await saveChatGroup(msg.chat.id, msg.chat.title);
    bot.sendMessage(chatId, "Chat id guardado con éxito");
  } catch (error) {
    console.error(error.message);
  }
});

bot.onText(/\/stop_group_posting/, async (msg) => {
  const chatId = msg.chat.id;
  const message = await deleteChatGroup(chatId);
  console.log("message", message);

  bot.sendMessage(chatId, message);
});
