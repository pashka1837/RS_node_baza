import {execFile, spawn, fork} from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';
const spawnChildProcess = async args => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const cpPATH = `${__dirname}/files/script.js`;

	// Const toChild = fork(cpPATH, [...args]);
	const toChild = spawn('node', [`${cpPATH}`, ...args]);

	process.stdin.pipe(toChild.stdin);
	toChild.stdout.pipe(process.stdout);
	// Process.stdin.on('data', d => {
	// 	const chunkStringified = d.toString();

	// 	toChild.send(`${d}`);
	// 	if (chunkStringified.includes('CLOSE')) {
	// 		process.exit(0);
	// 	}
	// });

	// toChild.on('message', m => console.log(m));
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
