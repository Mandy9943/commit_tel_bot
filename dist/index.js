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
const express = require("express");
const lib_1 = require("./lib");
require("dotenv").config();
const app = express();
app.use(express.json());
app.post("/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repositoryUrl = req.body.repository.html_url;
        yield (0, lib_1.sendlastCommit)(repositoryUrl);
        res.sendStatus(200);
    }
    catch (error) {
        console.log("error", error);
        res.sendStatus(500);
    }
}));
app.listen(3000, () => {
    console.log("El bot está escuchando en el puerto 3000...");
});
//# sourceMappingURL=index.js.map