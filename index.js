//AnimediaBOT 960662384131846174
const discord = require('discord.js');
const discordModals = require('discord-modals');
const fs = require('fs');
const bot = new discord.Client({
  presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: "Pawlock#4083",
            type: "LISTENING",
        }],
  },
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MEMBERS'
  ],
  partials: [
    'MESSAGE',
    'CHANNEL',
    'REACTION',
    'GUILD_MEMBER'
  ]
});
discordModals(bot);


const eventDir = fs.readdirSync('./events').filter(eventFile => eventFile.endsWith('.js'));

for (const eventFile of eventDir) {
  const event = require(`./events/${eventFile}`);
  event.execute(bot);
}

bot.on('interactionCreate', interaction =>{
  if(interaction.isButton()){
    const button = require(`./buttons/${interaction.customId}`)
    button.execute(interaction)
  } else {
  const command = require(`./commands/${interaction.commandName}`);
  command.execute(interaction);}
})

bot.on('modalSubmit', modal =>{
  const modals = require(`./modals/${modal.customId}`);
  modals.execute(modal, bot);
})


bot.login(process.env['token']);

// HTTP Server
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);