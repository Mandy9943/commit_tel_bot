"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv").config();
exports.config = {
    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN,
    },
    repos: [
        {
            name: "hidden-sin",
            url: "https://github.com/Mandy9943/hidden-sin",
            owner: "Mandy9943",
        },
        // {
        //   name: "repositorio2",
        //   url: "https://api.github.com/repos/<usuario>/<repositorio2>/commits",
        // },
    ],
    users: [
        {
            id: 709820730,
        },
    ],
    groups: [
    // {
    //   id: 647622329,
    // },
    ],
};
//# sourceMappingURL=config.js.map