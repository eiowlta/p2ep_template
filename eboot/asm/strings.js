let dir = joinPath("eboot", "strings");
const files = readDirectory(dir).filter((a) => a.endsWith(".json"));

const tableTypes = {
  offset: (info, table, messages) => {
    section("eboot");
    let base = parseInt(table.addr, 16);
    provide(
      `str_table_${info.name}_${table.suffix}_${table.format}_${table.addr}`,
      base
    );
    org(base + 4);
    let len = table.length ?? info.length;
    let off = table.offset ?? 0;
    for (let i = 0; i < len; i++) {
      let msgName = `${info.name}_${i + off}_${table.suffix}`;
      //   console.log(msgName);
      if (messages.messages[msgName] === undefined)
        throw `Couldn't find ${msgName}`;
      let addr = msgManager.addMessage(
        messages.messages[msgName],
        `str_${msgName}_${table.format}`,
        table.format
      );
      section("eboot");
      write_u32(addr - base);
    }
  },
  pointer: (info, table, messages) => {
    section("eboot");
    let base = parseInt(table.addr, 16);
    let off = table.offset ?? 0;
    let symbolName = `str_table_${info.name}_${table.suffix}_${table.format}_${table.addr
      }${off > 0 ? "_" + off : ""}`;
    provide(symbolName, base);
    org(base);
    let len = table.length ?? info.length;
    for (let i = 0; i < len; i++) {
      let stride = table.stride ?? 1;
      let msgName = `${info.name}_${i + off}`
      if (table.suffix) msgName += `_${table.suffix}`;
      let addr = 0;
      if (messages.messages[msgName] === undefined) {
        if (table.allowMissing) {
          console.log(`Skipping ${msgName}`)
          section("eboot");
          addr = read_u32(true);
        }
        else throw new Error(`Unable to find entry ${msgName}`)
      } else {
        addr = msgManager.addMessage(
          messages.messages[msgName],
          `str_${msgName}_${table.format}`,
          table.format,
          0xffff,
          true
        );
      }
      section("eboot");
      write_u32(addr);
      while (stride-- > 1) {
        reserve(4);
      }
    }
  },
  greenbox: (info, table, messages) => {
    console.log("Skipping greenbox...");
  }
};

for (const file of files) {
  let name = file.replace(".json", "");
  console.log(`Building ${name} strings table`);
  let info = JSON.parse(readTextFile(joinPath(dir, file)));
  let msgFileName = `${name}.msg`;
  let data = readTextFile(joinPath(dir, msgFileName));
  let messages = msgManager.parseMessageFile(msgFileName, data, "event");
  //   console.log(messages);
  for (const table of info.tables) {
    tableTypes[table.type](info, table, messages);
  }
}
