// Made by Demon Martin#0193, I take no response for what this tool gets used for.
console.clear()
const fs = require(`fs`)
if (!fs.existsSync(`./list.txt`)) {
    return console.log(`[Error] Found no list.txt!`)
}

let List = fs.readFileSync(`./list.txt`, "utf8").replace(/(\r)/gm, "").trim().split(`\n`)
let Types = {};
let Endings = []

if (!List) {
    return console.log("[Error] list.txt is empty!")
} else {

}

// CHECK LIST AND SORT
List.forEach(line => {
    var acc_split = line.split(`@`)
    var ending = acc_split[1]
    if (!Types[`${ending}`]) {
        Endings.push(ending)
        Types[`${ending}`] = [`${line}`]
        return;
    }
    Types[`${ending}`].push(line)
});

/*console.log(`[LOG] Types: ${JSON.stringify(Types)}`)*/

if (!fs.existsSync(`./emails/`)) {
    console.log("[Error] Couldn't find \"emails\" folder, creating one.")
    fs.mkdirSync(`./emails/`)
}
// WRITE LIST INTO EACH FILE
if(!Endings.length < 1) {
    return console.log("[Error] List.txt is empty!")
} 
console.log(`[LOG] Found Endings: ${Endings.join(`, `)}`)

Endings.forEach((end) => {
    let sortedList = Types[`${end}`].join(`\n`).trim();
    fs.writeFileSync(`./emails/${end}.txt`, sortedList)
    console.log(`[Created] ${end}.txt with ${sortedList.length} emails.`)
})

console.log(`[Finshed] Created ${Endings.length} files in "./emails/"`)