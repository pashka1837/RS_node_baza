import {opendir, copyFile, mkdir} from 'node:fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const copy = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const oldDirPath = `${__dirname}/files`;
	const newDirPath = `${__dirname}/files_copy`;

	try {
		const oldDir = await opendir(oldDirPath);
		await mkdir(newDirPath);
		for await (const dirent of oldDir) {
			const fileName = dirent.name;
			await copyFile(`${oldDirPath}/${fileName}`, `${newDirPath}/${fileName}`);
		}
	} catch {
		console.error('FS operation failed');
	}
};

await copy();
