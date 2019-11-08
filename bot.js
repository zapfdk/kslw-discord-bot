const Discord = require('discord.js');
const client = new Discord.Client();

let maps = [
    {id: 0, name: "Luigis Piste", state: null},
    {id: 1, name: "Peach Beach", state: null},
    {id: 2, name: "Baby Park", state: null},
    {id: 3, name: "Staubtrockene Piste", state: null},
    {id: 4, name: "Pilzbrücke", state: null},
    {id: 5, name: "Marios Piste", state: null},
    {id: 6, name: "Daisys Dampfer", state: null},
    {id: 7, name: "DK Bergland", state: null},
    {id: 8, name: "Waluigi Arena", state: null},
    {id: 9, name: "Sorbet Land", state: null},
    {id: 10, name: "Pilz-City", state: null},
    {id: 11, name: "DK Bergland", state: null},
    {id: 12, name: "Wario Colosseum", state: null},
    {id: 13, name: "Dinodino-Dschungel", state: null},
    {id: 14, name: "Bowsers Festung", state: null},
    {id: 15, name: "Regenbogen-Boulevard", state: null}
  ];



client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === '/maplist') {
        for (let map of maps){
            if (map.state !== null)
            {
                continue;
            }
            let msg = "";
            msg += map.name + " : " + toString(map.id);
            message.reply(msg);
            console.log(msg);
        }
       }
});

client.login(process.env.BOT_TOKEN)