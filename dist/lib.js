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
exports.sendlastCommit = exports.sendMultiplesCommits = void 0;
const bot_1 = require("./bot");
const config_1 = require("./config");
const db_1 = require("./db");
const github_1 = require("./github");
const sendMultiplesCommits = (repositoryUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const commits = yield (0, github_1.getLatestCommits)(getRepositoryByName(repositoryUrl), 5);
    if (commits.length > 0) {
        const message = `Se han subido ${commits.length} nuevos commits al repositorio ${getRepositoryName(repositoryUrl)}:\n\n${commits.join("\n")}`;
        for (const user of config_1.config.users) {
            yield (0, bot_1.sendMessage)(user.id, message);
        }
        //   for (const group of config.groups) {
        //     await sendMessage(group.id, message);
        //   }
    }
});
exports.sendMultiplesCommits = sendMultiplesCommits;
const sendlastCommit = (repositoryUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = getRepositoryByName(repositoryUrl);
    const lastCommitInfo = yield (0, github_1.getLastCommit)(repository);
    const message = `Nuevo commit en ${repository.name}\nComment: ${lastCommitInfo.message}\nFecha: ${lastCommitInfo.date}`;
    const groups = yield (0, db_1.getAllGroups)();
    for (const user of config_1.config.users) {
        yield (0, bot_1.sendMessage)(user.id, message);
    }
    for (const group of groups) {
        yield (0, bot_1.sendMessage)(group.chat_id, message);
    }
});
exports.sendlastCommit = sendlastCommit;
function getRepositoryByName(repositoryUrl) {
    return config_1.config.repos.find((repo) => repo.url === repositoryUrl);
}
function getRepositoryName(repositoryUrl) {
    var _a;
    return ((_a = getRepositoryByName(repositoryUrl)) === null || _a === void 0 ? void 0 : _a.name) || "";
}
//# sourceMappingURL=lib.js.map