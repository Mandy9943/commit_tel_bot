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
    "Hi there! I'm the Quantumx Github bot for Telegram.\n\nI'm here to keep you informed about the latest commits in the repository.\n\nAdd me a group and I will start sending you the latest commits."
  );
});

bot.onText(/\/post_group_commits/, async (msg) => {
  const chatId = msg.chat.id;

  // Insertar el chat id en la tabla

  try {
    await saveChatGroup(msg.chat.id, msg.chat.title);
    bot.sendMessage(chatId, "Ok, I will start sending messages now.");
  } catch (error) {
    console.error(error.message);
  }
});

bot.onText(/\/stop_group_posting/, async (msg) => {
  const chatId = msg.chat.id;
  const message = await deleteChatGroup(chatId);

  bot.sendMessage(chatId, message);
});
