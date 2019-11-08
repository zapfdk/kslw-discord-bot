const Discord = require('discord.js');
const client = new Discord.Client();

let maps = [
    {id: 0, name: "Luigis Piste", state: none},
    {id: 1, name: "Peach Beach", state: none},
    {id: 2, name: "Baby Park", state: none},
    {id: 3, name: "Staubtrockene Piste", state: none},
    {id: 4, name: "Pilzbrücke", state: none},
    {id: 5, name: "Marios Piste", state: none},
    {id: 6, name: "Daisys Dampfer", state: none},
    {id: 7, name: "DK Bergland", state: none},
    {id: 8, name: "Waluigi Arena", state: none},
    {id: 9, name: "Sorbet Land", state: none},
    {id: 10, name: "Pilz-City", state: none},
    {id: 11, name: "DK Bergland", state: none},
    {id: 12, name: "Wario Colosseum", state: none},
    {id: 13, name: "Dinodino-Dschungel", state: none},
    {id: 14, name: "Bowsers Festung", state: none},
    {id: 15, name: "Regenbogen-Boulevard", state: none}
  ];



client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === '/maplist') {
        for (let map of maps){
            if (!map.state)
            {
                continue;
            }
            let msg = "";
            msg += map.name + " : " + toString(map.id);
            message.reply(msg);
        }
       }
});

client.login(process.env.BOT_TOKEN)