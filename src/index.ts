import { Client as Discord } from "discord.js";
import { token } from "./config";
import { Client as Irc } from "irc";

const discord = new Discord({ intents: ["Guilds", "GuildMessages"] });
const irc = new Irc("irc.libera.chat", "pipojs", { port: 6697 });

discord.once("ready", () => {
  console.log("ready");
});

discord.on("messageCreate", (m) => {
  console.log(m);
});

discord.login(token).then((res) => console.log(res));
