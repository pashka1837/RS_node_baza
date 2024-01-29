import fs from 'node:fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const rename = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const oldPath = `${__dirname}/files/wrongFilename.txt`;
	const newPath = `${__dirname}/files/properFilename.md`;

	const isNewExists = fs.access(newPath).then(() => true).catch(() => false);

	if (isNewExists) {
		return console.error('FS operation failed');
	}

	try {
		await fs.rename(oldPath, newPath);
	} catch {
		console.error('FS operation failed');
	}
};

await rename();
