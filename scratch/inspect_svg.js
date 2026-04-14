import fs from 'fs';
import readline from 'readline';

async function processLineByLine() {
  const fileStream = fs.createReadStream('c:\\Users\\User\\Documents\\site-UL\\src\\pages\\retiro\\imagens\\elementos.svg');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  for await (const line of rl) {
    if (line.length > 500) {
        console.log(line.substring(0, 500) + '...');
    } else {
        console.log(line);
    }
    count++;
    if (count > 100) break;
  }
}

processLineByLine();
