import { Client } from "discord.js";
import { token } from "./config";

const client = new Client({ intents: ["Guilds"] });

client.once("ready", () => {
  console.log("ready");
});

client.on("messageCreate", (m) => {
  console.log(m);
});

client.login(token).then((res) => console.log(res));
