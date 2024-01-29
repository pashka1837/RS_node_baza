import {createReadStream, createWriteStream} from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {createUnzip} from 'node:zlib';
import {pipeline} from 'node:stream/promises';

const decompress = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const toPATH = `${__dirname}/files/fileToCompressNew.txt`;
	const fromPATH = `${__dirname}/files/archive.gz`;

	await pipeline(
		createReadStream(fromPATH),
		createUnzip(),
		createWriteStream(toPATH),
	);
};

await decompress();
