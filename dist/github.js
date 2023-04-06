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
exports.getLatestCommits = exports.getLastCommit = void 0;
const rest_1 = require("@octokit/rest");
// Crear una instancia de Octokit y autenticar con un token de acceso personal de Github
const octokit = new rest_1.Octokit({
    auth: "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",
});
function getLastCommit(repository) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Obtener los últimos commits del repositorio
        const { data: commits } = yield octokit.repos.listCommits({
            owner: repository.owner,
            repo: repository.name,
        });
        // Obtener el último commit
        const lastCommit = commits[0];
        // Crear un objeto con el mensaje y la fecha del último commit
        const commitInfo = {
            message: lastCommit.commit.message,
            date: (_a = lastCommit.commit.author) === null || _a === void 0 ? void 0 : _a.date,
        };
        // Devolver el objeto con la información del último commit
        return commitInfo;
    });
}
exports.getLastCommit = getLastCommit;
function getLatestCommits(repository, count) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!repository) {
            return [];
        }
        const response = yield octokit.repos.listCommits({
            owner: repository.owner,
            repo: repository.name,
            per_page: count,
        });
        return response.data.map((commit) => commit.commit.message);
    });
}
exports.getLatestCommits = getLatestCommits;
//# sourceMappingURL=github.js.map