require("dotenv").config();
export const config = {
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
  },
  repos: [
    {
      name: "hidden-sin",
      url: "https://github.com/Mandy9943/hidden-sin",
      owner: "Mandy9943",
    },
    {
      name: "qx",
      url: "https://github.com/Eldar-Finance/qx",
      owner: "Eldar-Finance",
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
};
