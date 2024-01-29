
import {opendir} from 'node:fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const list = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const dirPath = `${__dirname}/files`;
	try {
		const dir = await opendir(dirPath);
		const names = [];
		for await (const dirent of dir) {
			names.push(dirent.name);
		}

		console.log(names);
	} catch {
		console.error('FS operation failed');
	}
};

await list();
