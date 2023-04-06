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
exports.deleteChatGroup = exports.getAllGroups = exports.saveChatGroup = exports.db = void 0;
const sqlite3 = require("sqlite3");
exports.db = new sqlite3.Database("database.sqlite");
// Crear una tabla "users" con dos columnas: "id" y "preference"
exports.db.serialize(() => {
    exports.db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, 
      preference TEXT
    )
  `);
});
// Crear tabla para almacenar los chat ids
exports.db.run(`CREATE TABLE IF NOT EXISTS chat_group (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER UNIQUE NOT NULL,
    group_name TEXT NOT NULL
  )`);
function saveChatGroup(chatId, groupName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.db.run("INSERT OR REPLACE INTO chat_group (chat_id, group_name) VALUES (?, ?)", [chatId, groupName]);
    });
}
exports.saveChatGroup = saveChatGroup;
function getAllGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT * FROM chat_group";
        return new Promise((resolve, reject) => {
            exports.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("rows", rows);
                resolve(rows);
            });
        });
    });
}
exports.getAllGroups = getAllGroups;
function deleteChatGroup(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        let message = "";
        return new Promise((resolve, reject) => {
            exports.db.get("SELECT * FROM chat_group WHERE chat_id = ?", [chatId], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                    return;
                }
                if (row) {
                    exports.db.run("DELETE FROM chat_group WHERE chat_id = ?", [chatId], (err) => {
                        if (err) {
                            console.error(err.message);
                            reject(err);
                            return;
                        }
                        message = "El envío de commits ha sido detenido para este grupo.";
                        resolve(message);
                    });
                }
                else {
                    message = "Este grupo no está registrado en la base de datos.";
                    resolve(message);
                }
            });
        });
    });
}
exports.deleteChatGroup = deleteChatGroup;
//# sourceMappingURL=db.js.map