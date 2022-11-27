import { Client as Discord, TextChannel } from "discord.js";
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

discord.once("ready", () => {
  console.log("ready");
});

discord.on("messageCreate", (m) => {
  if (m.author.id === "1046005694769414174") {
    return;
  }
  irc.say("#redbook", `${m.author.username} (Discord): ${m.content}`);
});

irc.addListener("message", function (from, to, message) {
  const ts = discord.channels.cache.get("990776652604801044") as TextChannel;
  ts.send(`${from} (IRC): ${message}`);
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

discord.login(token).then(() => console.log("discord: logged in"));
