function processList() {
  // Created by @softwares (discord). I take no responsibility for the usage of this tool.
  console.clear();

  const fs = require(`fs`);

  if (!fs.existsSync(`./list.txt`)) {
    console.log(`[Error] Unable to find list.txt!`);
    return;
  }

  let List = fs.readFileSync(`./list.txt`, "utf8").replace(/(\r)/gm, "").trim().split(`\n`);
  let Types = {};
  let Endings = [];

  if (!List) {
    console.log("[Error] list.txt is empty!");
    return;
  }

  // CHECK LIST AND SORT
  List.forEach(line => {
    var acc_split = line.split(`@`);
    var ending = acc_split[1];

    if (!Types[`${ending}`]) {
      Endings.push(ending);
      Types[`${ending}`] = [`${line}`];
      return;
    }

    Types[`${ending}`].push(line);
  });

  /*console.log(`[LOG] Types: ${JSON.stringify(Types)}`)*/

  if (!fs.existsSync(`./emails/`)) {
    console.log("[Error] Couldn't find the \"emails\" folder. Creating one.");
    fs.mkdirSync(`./emails/`);
  }

  // WRITE LIST INTO EACH FILE
  if (Endings.length < 1) {
    console.log("[Error] List.txt is empty!");
    return;
  }

  console.log(`[LOG] Found Endings: ${Endings.join(`, `)}`);

  Endings.forEach((end) => {
    let sortedList = Types[`${end}`].join(`\n`).trim();
    fs.writeFileSync(`./emails/${end}.txt`, sortedList);
    console.log(`[Created] ${end}.txt with ${sortedList.length} emails.`);
  });

  console.log(`[Finished] Created ${Endings.length} files in "./emails/"`);
}

processList();
