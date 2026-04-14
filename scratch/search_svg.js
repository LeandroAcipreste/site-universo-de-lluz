import fs from 'fs';
import readline from 'readline';

async function searchKeywords() {
  const fileStream = fs.createReadStream('c:\\Users\\User\\Documents\\site-UL\\src\\pages\\retiro\\imagens\\elementos.svg');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const keywords = ['nuvem', 'passaro', 'bird', 'cloud', 'nome', 'name', 'beija', 'flor', 'humming'];
  
  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    for (const kw of keywords) {
      if (line.includes(kw)) {
        console.log(`Line ${lineCount}: Found "${kw}" - ${line.substring(0, 200)}...`);
      }
    }
    if (lineCount % 100000 === 0) console.log(`Processed ${lineCount} lines...`);
  }
}

searchKeywords();
