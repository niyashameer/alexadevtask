const fs = require("fs");
fs.readFileSync;
const readline = require("readline");

const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout,
});

let jsObject = {
    name: null,
    address: null
}
core();

function add() {
    rl.question("What is your name?", (nm) => {
        rl.question("What is your address?", (addrs) => {
            jsObject.name = nm;
            jsObject.address = addrs;
            let dataBuffer = fs.readFileSync("registry.json");
            let reg = JSON.parse(dataBuffer);
            reg.push(jsObject);
            let jsonString = JSON.stringify(reg);
            fs.writeFileSync("registry.json", jsonString);
            console.log("Done adding!")
           core();
        });
    });
}

function del() {
    
    let dataBuffer = fs.readFileSync("registry.json");
    let reg = JSON.parse(dataBuffer);
    let arr = [];

    rl.question("Name of entry to be deleted:", (nm) => {
        for(let i=0 ; i < reg.length; i++) {
            if(reg[i].name !== nm) {
                arr.push(reg[i]);
            }
            else{
                arr.splice(i,1);
            }
        }
        console.log("Deleted!");
        let jsonString = JSON.stringify(arr);
        fs.writeFileSync("registry.json", jsonString)
        core();
    })
}

function view() {
    const dataBuffer = fs.readFileSync("registry.json");
    console.table(JSON.parse(dataBuffer.toString()));
    core();
}

function core() {
    rl.question("add/delete/view: ", (answer) => {
        switch(answer){
            case "add": add();
            break;
            case "delete": del();
            break;
            case "view": view();
            break;
            default: console.log("Enter the correct input!"); core();
            break;
        }
    })
}





