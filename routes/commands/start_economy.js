const mysql = require('mysql');

module.exports = {
  category: "economy",
  data: {
    name: "start_economy",
    description: "Registers your account in our economy system!",
    type: 1
  },
  execute: i => {
    const conn = mysql.createConnection({ "host": "localhost", "user": "root", "password": "Kb3K^PaQ2uE#3{_X", "database": "jackie_bot" });

    conn.query('select id from `economy-sys` where id = '+`'${i.user.id}'`, (err, res) => {
      if (err) {
        console.log(err);
        i.reply({ 'content': "Sorry, but there is an error... Please report about it to developer by using `/report`", "ephemeral": true });

        return conn.end(err => { if (err) { conn.destroy() } });
      }
      if (res.length != 0) {
        i.reply({ 'content': "You're already registered your account in out economy system!", "ephemeral": true })
        conn.end(err => { if (err) { conn.destroy() } });
      } else {
        conn.query('insert into `economy-sys` (id) values '+`('${i.user.id}')`, err => {
          if (err) {
            console.log(err);
            i.reply({ 'content': "Sorry, but there is an error... Please report about it to developer by using `/report`", "ephemeral": true });
          } else {
            i.reply({ 'content': "Your account was registered successfully :white_check_mark:\nNow you can use our economy system!", "ephemeral": true })
          }

          conn.end(err => { if (err) { conn.destroy() } });
        })
      }
    });
  }
}