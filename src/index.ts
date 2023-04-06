import * as express from "express";
import { sendlastCommit } from "./lib";
require("dotenv").config();
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const repositoryUrl = req.body.repository.html_url;
    await sendlastCommit(repositoryUrl);

    res.sendStatus(200);
  } catch (error) {
    console.log("error", error);

    res.sendStatus(500);
  }
});

app.listen(3856, () => {
  console.log("El bot está escuchando en el puerto 3856...");
});
