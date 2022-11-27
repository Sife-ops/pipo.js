import { Client as Discord, TextChannel } from "discord.js";
import { Client as Irc } from "irc";
import * as config from "./config";

const discord = new Discord({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

// todo: liberachat
const irc = new Irc(config.irc.server, config.irc.nick, {
  port: config.irc.port,
  channels: [config.irc.channel],
  secure: true,
  debug: true,
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

discord.once("ready", () => {
  console.log("ready");
});

discord.on("messageCreate", (m) => {
  if (m.author.id !== config.discord.application_id) {
    irc.say(config.irc.channel, `${m.author.username} (Discord): ${m.content}`);
  }
});

irc.addListener("message", function (from, to, message) {
  const ts = discord.channels.cache.get(
    config.discord.channel_id
  ) as TextChannel;
  ts.send(`${from} (IRC): ${message}`);
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

discord
  .login(config.discord.token)
  .then(() => console.log("discord: logged in"));
