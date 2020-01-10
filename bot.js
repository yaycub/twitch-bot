/* eslint-disable no-console */
require('dotenv').config();
const tmi = require('tmi.js');
const chance = require('chance').Chance();
const { getFuturamaQuote, getDragQuote, getSimpsonQuote, getOpening } = require('./api-services');


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

client.on('message', onMessageHandler);
client.on('connect', onConnectedHandler);

client.connect();

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

async function onMessageHandler(target, context, msg, self) {
  if(self) { return; } 

  const commandName = msg.trim();

  if(commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if(commandName === '!quote'){
    const quote = await chance.pickone([getFuturamaQuote(), getSimpsonQuote(), getDragQuote(), getOpening()]);

    client.say(target, `"${quote.quote}" - ${quote.character}`);
    console.log(`Excuted ${commandName} command`);
  
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

async function quoteByMin() {
  const quote = await chance.pickone([getFuturamaQuote(), getSimpsonQuote(), getDragQuote(), getOpening()]);
  client.say(process.env.CHANNEL_NAME, `"${quote.quote}" - ${quote.character}`);
}

function spamChat() {
  return new Promise(resolve => setTimeout(resolve, 500));
}

async function say(){
  while(true){
    await spamChat();
    await quoteByMin();
  }
}

// say();
