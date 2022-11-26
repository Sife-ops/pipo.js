import { Client as Discord } from "discord.js";
import { Client as Irc } from "irc";
import { token } from "./config";

const discord = new Discord({ intents: ["Guilds", "GuildMessages"] });

// todo: liberachat
const irc = new Irc("irc.geekshed.net", "pipojs", {
  port: 6697,
  channels: ["#redbook"],
  secure: true,
});

irc.addListener("message", function (from, to, message) {
  console.log(from + " => " + to + ": " + message);
});

discord.once("ready", () => {
  console.log("ready");
});

discord.on("messageCreate", (m) => {
  console.log(m);
});

discord.login(token).then(() => console.log("discord: logged in"));
