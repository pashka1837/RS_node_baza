import {createWriteStream} from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {stdin} from 'node:process';
import {pipeline} from 'node:stream/promises';

const write = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const PATH = `${__dirname}/files/fileToWrite.txt`;

	await pipeline(
		stdin,
		createWriteStream(PATH),
	);
};

await write();
