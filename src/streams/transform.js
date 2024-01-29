
import {stdin, stdout} from 'node:process';
import {pipeline} from 'node:stream/promises';
import {Transform} from 'node:stream';

const myTrans = new Transform({

	transform(chunk, ecnoding, callback) {
		const str = chunk.toString();
		let newStr = '';
		for (let i = str.length - 1; i > -1; i--) {
			newStr += str[i];
		}

		callback(null, `${newStr}\n`);
	},
});

const transform = async () => {
	await pipeline(
		stdin,
		myTrans,
		stdout,
	);
};

await transform();
