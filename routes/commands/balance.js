const mysql = require('mysql');

module.exports = {
  category: "economy",
  data: {
    name: "balance",
    description: "Check your/somebody's balance!",
    type: 1,
    options: [
      {
        required: false,
        name: "member",
        description: "Choose a member that balance you wanna check!",
        type: 6
      }
    ]
  },
  execute: i => {
    const member = i.options.get("member");

    const conn = mysql.createConnection({ "host": "localhost", "user": "root", "password": "Kb3K^PaQ2uE#3{_X", "database": "jackie_bot" });

    if (member == null) {

      conn.query('select wallet, card, coins from `economy-sys` ' + `where id = '${i.user.id}'`, (err, res) => {
        if (err) {
          console.log(err);
          i.reply({ 'content': "Sorry, but there is an error... Please report about it to developer by using `/report`", "ephemeral": true });

          return conn.end(err => { if (err) { conn.destroy() } });
        }

        if (res.length == 0) return i.reply({ 'content': "Before using this command use `/start_economy`", 'ephemeral': true });

        const embed = {
          author: {
            name: i.user.tag,
            icon_url: (i.user.avatar != null) ? i.user.avatarURL() : "https://i.pinimg.com/564x/9f/00/f2/9f00f214a3f600739544362261916727.jpg"
          },
          description: `:purse: **Wallet**: $${res[0]['wallet']}\n:credit_card: **Card**: $${res[0]['card']}\n\n:bank: **Net worth**: $${res[0]['wallet'] + res[0]['card']}`,
          color: 0xa4e287
        }

        i.reply({ 'embeds': [embed], 'ephemeral': true });

        conn.end(err => { if (err) { conn.destroy() } });

      });

    } else {

      conn.query('select wallet, card, coins from `economy-sys` ' + `where id = '${member.user.id}'`, (err, res) => {
        if (err) {
          console.log(err);
          i.reply({ 'content': "Sorry, but there is an error... Please report about it to developer by using `/report`", "ephemeral": true });

          return conn.end(err => { if (err) { conn.destroy() } });
        }

        if (res.length == 0) return i.reply({ 'content': `Oops, seems **${member.user.tag}** haven't an account in our economy system!`, 'ephemeral': true });

        const embed = {
          author: {
            name: member.user.tag,
            icon_url: (member.user.avatar != null) ? member.user.avatarURL() : "https://i.pinimg.com/564x/9f/00/f2/9f00f214a3f600739544362261916727.jpg"
          },
          description: `:purse: **Wallet**: $${res[0]['wallet']}\n:credit_card: **Card**: $${res[0]['card']}\n\n:bank: **Net worth**: $${res[0]['wallet'] + res[0]['card']}`,
          color: 0xa4e287
        }

        i.reply({ 'embeds': [embed], 'ephemeral': true });

        conn.end(err => { if (err) { conn.destroy() } });

      });

    }
  }
}