const discord = require('discord.js');
const cfg = require('./cfg.json');
const mysql = require('mysql');

const modules = require('./routes/index.js');

// https://discord.com/api/oauth2/authorize?client_id=1036356109692313660&permissions=4392674655479&redirect_uri=https%3A%2F%2Fdiscord.com%2F&scope=applications.commands%20bot

const client = new discord.Client({
  'partials': ['Channel', 'GuildMember', 'GuildScheduledEvent', 'ThreadMember', 'User', 'Message', 'Reaction'],
  'intents': ['AutoModerationConfiguration', 'AutoModerationExecution', 'DirectMessageReactions', 'DirectMessageTyping', 'DirectMessages', 'GuildBans', 'GuildEmojisAndStickers', 'GuildIntegrations', 'GuildInvites', 'GuildMembers', 'GuildMessageReactions', 'GuildMessageTyping', 'GuildMessages', 'GuildPresences', 'GuildScheduledEvents', 'GuildVoiceStates', 'GuildWebhooks', 'Guilds', 'MessageContent']
});

client.on('interactionCreate', i => {

  modules.execute(i);

});

client.on('guildCreate', g => {

  const conn = mysql.createConnection({ "host": "localhost", "user": "root", "password": "Kb3K^PaQ2uE#3{_X", "database": "jackie_bot" });
  conn.query(`SELECT premium FROM guilds WHERE id = '${g.id}'`, (err, res) => {
    if (err) return console.log(err);
    if (res.length == 0) {
      conn.query(`INSERT INTO guilds (id, disabled_modules, premium) VALUES ('${g.id}','[]',0)`, err => {
        if (err) console.log(err);
        conn.end(err => { if (err) return conn.drop(); });
      });
    }
  });

  if (g.systemChannel != null) {
    g.systemChannel.send({
      embeds: [
        {
          author: { name: "Jackie bot", icon_url: (g.client.user.avatar != null) ? g.client.user.avatarURL() : "https://i.pinimg.com/564x/9f/00/f2/9f00f214a3f600739544362261916727.jpg" },
          description: "**Thanks for choosing me** :heart:\n\nUse `/help` to see what i'm could!",
          color: 0xa4e287
        }
      ]
    });
  }

});

client.login(cfg.token).then((v) => { console.log("[BOT]: Yo, i'm alive!"); modules.update(client); });