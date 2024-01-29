// Import {readFile} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {stdout} from 'node:process';
const {createHash} = await import('node:crypto');

const calculateHash = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const PATH = `${__dirname}/files/fileToCalculateHashFor.txt`;

	const input = createReadStream(PATH);
	const hash = createHash('sha256');
	input.pipe(hash).setEncoding('hex').pipe(stdout);

	// Try {
	// 	const content = await readFile(PATH, {encoding: 'utf8'});
	// 	const newHash = createHash('sha256').update(content).digest('hex');
	// 	const writable = stdout;
	// 	writable.write('\n' + newHash);
	// } catch {
	// 	console.error('FS operation failed');
	// }
};

await calculateHash();
