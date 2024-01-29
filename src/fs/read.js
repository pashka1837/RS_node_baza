import {readFile} from 'node:fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
const read = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const PATH = `${__dirname}/files/fileToRead.txt`;
	try {
		const content = await readFile(PATH, {encoding: 'utf8'});
		console.log(content);
	} catch {
		console.error('FS operation failed');
	}
};

await read();
