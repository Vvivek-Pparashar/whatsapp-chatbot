const qrcode = require("qrcode-terminal");
const { ask } = require("./ai.js");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message", async (message) => {
  console.log(message);
  const prompt = message.body;
  const answer = await ask(prompt);

  if (answer) {
    client.sendMessage(message.from, answer);
  } else {
    message.reply("??");
  }
});

// client.on("message", (message) => {
//   message.react("🧑");
//   message.reply("vivek is gr8")
// });

// ------------------------ mention all the people in a group -------------------------

// client.on("message", async (msg) => {
//   if (msg.body === "trying our bot") {
//     const chat = await msg.getChat();

//     let text = "";
//     let mentions = [];

//     for (let participant of chat.participants) {
//       const contact = await client.getContactById(participant.id._serialized);

//       mentions.push(contact);
//       text += `@${participant.id.user} `;
//     }

//     await chat.sendMessage(text, { mentions });
//   }
// });

client.on("ready", () => {
  console.log("your bot is ready to listen message");
});

client.initialize();
