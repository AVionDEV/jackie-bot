const fs = require('fs');

const mysql = require('mysql');

async function modulesUpdate(client) {
  const slash_commands = [];
  const comms = fs.readdirSync(__dirname + "/commands").filter(e => e.endsWith('.js'));
  comms.forEach(el => { slash_commands.push(require(`${__dirname}/commands/${el}`).data); });
  console.log(slash_commands);
  client.application.commands.set(slash_commands);
  return;
}

function useCommand(i) {

  const command = require(`./commands/${i.commandName}.js`);

  const conn = mysql.createConnection({ "host": "localhost", "user": "root", "password": "Kb3K^PaQ2uE#3{_X", "database": "jackie_bot" });
  conn.query(`select disabled_modules from guilds where id = '${i.guildid}'`, (err, res) => {
    if (err) {
      console.log(err);
      i.reply({ 'content': "Sorry, but there is an error... Please report about it to developer by using `/report`", "ephemeral": true });

      return conn.end(err => { if (err) { conn.destroy() } });
    }

    if(JSON.parse(res[0]['disabled_modules']).includes(command.category)) return i.reply({'content': "Sorry, but module `"+command.category+"` have been disabled by admins :neutral_face:"});

    command.execute(i);

  });

}

module.exports = {
  update: modulesUpdate,
  execute: useCommand
}