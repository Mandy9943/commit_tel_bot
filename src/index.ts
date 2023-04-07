import * as express from "express";
import { sendlastCommit } from "./lib";
import { PushEvent } from "./types";
require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola, mundo!");
});

app.post("/webhook", async (req, res) => {
  try {
    const repositoryUrl = req.body.repository.html_url;
    console.log("req.body.repository", req.body);
    const commitData: PushEvent = req.body;
    await sendlastCommit(commitData);

    res.sendStatus(200);
  } catch (error) {
    console.log("error", error);

    res.sendStatus(500);
  }
});

app.listen(3856, () => {
  console.log("El bot está escuchando en el puerto 3856...");
});
