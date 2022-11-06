module.exports = {
  category: "utils",
  data: {
    name: "ping",
    description: "Replies with Pong!",
    type: 1
  },
  execute: i => {
    i.reply({'content': `:ping_pong: ${new Date().getTime()-i.createdTimestamp}ms pong!`});
  }
}