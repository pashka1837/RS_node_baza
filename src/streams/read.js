import {createReadStream} from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {stdout} from 'node:process';
import {pipeline} from 'node:stream/promises';

const read = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const PATH = `${__dirname}/files/fileToRead.txt`;

	await pipeline(
		createReadStream(PATH),
		stdout,
	);
};

await read();
