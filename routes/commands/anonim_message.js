module.exports = {
  category: "utils",
  data: {
    name: "anonim_message",
    description: "Write anonim message!",
    type: 1,
    options: [
      {
        name: "content",
        description: "Write a content!",
        type: 3,
        required: true
      }
    ]
  },
  execute: (i) => {
    i.reply({ "content": "Your message was sent!", "ephemeral": true });
    i.channel.send({ "content": i.options.get("content").value });
  }
}