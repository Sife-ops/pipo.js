import { Client as Discord } from "discord.js";
import { Client as Irc } from "irc";
import { token } from "./config";

const discord = new Discord({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

// todo: liberachat
const irc = new Irc("irc.geekshed.net", "pipojs", {
  port: 6697,
  channels: ["#redbook"],
  secure: true,
  debug: true,
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// discord.once("ready", () => {
//   console.log("ready");
// });

discord.on("messageCreate", (m) => {
  console.log("messageCreate", m);
  irc.say("#redbook", `${m.author.username} (Discord): ${m.content}`);
});

irc.addListener("message", function (from, to, message) {
  console.log(from + " => " + to + ": " + message);
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

discord.login(token).then(() => console.log("discord: logged in"));
