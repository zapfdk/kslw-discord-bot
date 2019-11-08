const Discord = require("discord.js");
const Fuse = require("fuse.js");

const commandPrefix = "/";
const states = {available: 0, out: 1, picked: 2, banned: 3};
const statesToTxt = {
    0: "Verfügbar",
    1: "Draußen",
    2: "Gepicked",
    3: "Banned"    
};

const fuzzySearchOptions = {
    shouldSort: true,
    threshold: 1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name"
    ]
};

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

const client = new Discord.Client();
const fuse = new Fuse(maps, fuzzySearchOptions);

client.on("ready", () => {
    console.log("I am ready!");
});

function createMapList(){
    let msg = "";
    for (let map of maps){
        msg += map.name + ", Status: " + statesToTxt[map.state];
    }
    return msg;
};

function searchMap(searchString){
    const result = fuse.search(searchString);
    return result[0];
};

client.on("message", message => {
    if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

    const args = message.content.slice(commandPrefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if ( command === "maps") {
        console.log("maps");
        let msg = createMapList();
        message.channel.send(msg);
    }
    if (command === "ban") {
        const map = searchMap(args.join(" "));
        maps[map.id].state = states.banned;
        let msg = "Banned: " + map.name;
        message.channel.send(msg);
    }
    if (command === "pick") {
        const map = searchMap(args.join(" "));
        maps[map.id].state = states.picked;
        let msg = "Picked: " + map.name;
        message.channel.send(msg);        
    }
    if (command === "givememap"){
        let choice = Math.floor(Math.random() * maps.length);  
        let msg = "Map: " + maps[choice].name;
        message.channel.send(msg);
    }
});

client.login("NjQyNDIxNDA5ODE3MTY1ODM0.XcWzRg.Cy4l3_18a0mnEESSuKJosBJlWl4");