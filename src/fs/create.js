import {open, appendFile} from 'node:fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const create = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const PATH = `${__dirname}/files/fresh.txt`;
	try {
		const file = await open(PATH);
		file.close();
		return console.error('FS operation failed');
	} catch {
		await appendFile(PATH, 'I am fresh and young');
	}
};

await create();
