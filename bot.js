const Discord = require("discord.js");
const client = new Discord.Client();

const commandPrefix = "/";
const states = {available: 0, out: 1, picked: 2, banned: 3};

let maps = [
    {id: 0, name: "Luigis Piste", state: states.available},
    {id: 1, name: "Peach Beach", state: states.available},
    {id: 2, name: "Baby Park", state: states.available},
    {id: 3, name: "Staubtrockene Piste", state: states.available},
    {id: 4, name: "Pilzbrücke", state: states.available},
    {id: 5, name: "Marios Piste", state: states.available},
    {id: 6, name: "Daisys Dampfer", state: states.available},
    {id: 7, name: "DK Bergland", state: states.available},
    {id: 8, name: "Waluigi Arena", state: states.available},
    {id: 9, name: "Sorbet Land", state: states.available},
    {id: 10, name: "Pilz-City", state: states.available},
    {id: 11, name: "DK Bergland", state: states.available},
    {id: 12, name: "Wario Colosseum", state: states.available},
    {id: 13, name: "Dinodino-Dschungel", state: states.available},
    {id: 14, name: "Bowsers Festung", state: states.available},
    {id: 15, name: "Regenbogen-Boulevard", state: states.available}
  ];




client.on("ready", () => {
    console.log("I am ready!");
});

function createMapList(){
    let msg = "";
    for (let map of maps){
        msg += map.name + ", Status: " + (map.state ? "Gewählt\n" : "Noch da\n");
    }
    message.channel.send(msg);

};

client.on("message", message => {
    if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();



    if ( command === "maps") {
        console.log("maps");
    }
    if (command === "ban") {
        console.log("ban");

    }
    if (command === "pick") {
        console.log("pick");
        
    }
    if (command === "givememap"){
        console.log("givememap");

    }



});

client.login(process.env.BOT_TOKEN)