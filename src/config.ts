require("dotenv").config();
export const config = {
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
  },
  repos: [
    {
      name: "qx",
      url: "https://github.com/Eldar-Finance/qx",
      owner: "Eldar-Finance",
      deployments: {
        main: "https://quantumx.network",
        dev: "https://quantum-original-dev.vercel.app/",
        dev2: "https://quantum-dev.vercel.app/",
      },
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
