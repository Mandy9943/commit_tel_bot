"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const TelegramBot = require("node-telegram-bot-api");
const config_1 = require("./config");
const db_1 = require("./db");
const bot = new TelegramBot(config_1.config.telegram.token, { polling: true });
function sendMessage(chatId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bot.sendMessage(chatId, message);
        console.log(`message : ${message} sent \n`);
    });
}
exports.sendMessage = sendMessage;
// Configurar una respuesta cuando el bot reciba el comando /start
bot.onText(/\/start/, (msg, match) => {
    bot.sendMessage(msg.chat.id, "¡Hola! Soy el bot de Github para Telegram. Estoy aquí para mantenerte informado sobre los últimos commits en un repositorio de Github. Para empezar, envíame el nombre del repositorio que deseas monitorear.");
});
bot.onText(/\/post_group_commits/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    // Insertar el chat id en la tabla
    try {
        yield (0, db_1.saveChatGroup)(msg.chat.id, msg.chat.title);
        bot.sendMessage(chatId, "Chat id guardado con éxito");
    }
    catch (error) {
        console.error(error.message);
    }
}));
bot.onText(/\/stop_group_posting/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const message = yield (0, db_1.deleteChatGroup)(chatId);
    console.log("message", message);
    bot.sendMessage(chatId, message);
}));
//# sourceMappingURL=bot.js.map