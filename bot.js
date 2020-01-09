require('dotenv').config();
const tmi = require('tmi.js');
const { getRandomQuote } = require('./api-services');


const channelOpts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const client = new tmi.Client(channelOpts);

const onMessageHandler = async(target, context, msg, self) => {
  if(self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if(commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if(commandName === '!quote'){
    const quote = await getRandomQuote();

    client.say(target, `"${quote.quote}" - ${quote.character}`);
    console.log(`Excuted ${commandName} command`);
  
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
  
};

client.on('message', onMessageHandler);
client.on('connect', onConnectedHandler);

client.connect();



function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function onConnectedHandler(addr, port) {
  // eslint-disable-next-line no-console
  console.log(`* Connected to ${addr}:${port}`);
}
