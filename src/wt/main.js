import path from 'path';
import {fileURLToPath} from 'url';
import {cpus} from 'node:os';
import {Worker} from 'node:worker_threads';

const hrtime = process.hrtime.bigint;

function exitWorkers(remain, startTime, resMap) {
	if (!remain) {
		const result = Array.from(resMap)
			.sort((a, b) => a[0] - b[0])
			.map(v => v[1]);
		console.log(result);
		console.log('took -', Number(hrtime() - startTime) / 1e6 | 0, 'ms to finish WITH workers');
		// This consol log just shows how much time took to process all the data
		// for example in my PC with 12 cores it took 2750ms with 12 workers, witout workers it's 4150ms
		process.exit();
	}
}

const performCalculations = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const workerPATH = `${__dirname}/worker.js`;

	const cpusQ = cpus().length;
	let remain = cpusQ;

	const messages = Array.from({length: cpusQ}, (_, i) => i + 10);

	function run_WITH_workers() {
		const startTime = hrtime();
		// Just to check when function started running
		const resMap = new Map();

		messages.forEach(d => {
			const worker = new Worker(workerPATH, {workerData: {data: d}});
			worker.on('message', message => {
				const {data, status} = message;
				resMap.set(worker.threadId, {data, status});
				remain--;
				exitWorkers(remain, startTime, resMap);
			});

			worker.on('error', () => {
				resMap.set(worker.threadId, {data: null, status: 'error'});
				remain--;
				exitWorkers(remain, startTime, resMap);
			});
		});
	}

	function run_WITHOUT_workeres() {
		const start = hrtime();
		// Just to check when function started running
		const nthFibonacci = n => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
		const result = messages.map(m => {
			const x = m * 2;
			const data = nthFibonacci(x);
			return {data, status: 'resolved'};
		});
		console.log(result);
		console.log('took -', Number(hrtime() - start) / 1e6 | 0, 'ms to finish WITHOUT workers');
	}

	run_WITH_workers();

	// Run_WITHOUT_workeres();
};

await performCalculations();

