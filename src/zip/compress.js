import {createReadStream, createWriteStream} from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {createGzip} from 'node:zlib';
import {pipeline} from 'node:stream/promises';

const compress = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const fromPATH = `${__dirname}/files/fileToCompress.txt`;
	const toPATH = `${__dirname}/files/archive.gz`;

	await pipeline(
		createReadStream(fromPATH),
		createGzip(),
		createWriteStream(toPATH),
	);
};

await compress();
