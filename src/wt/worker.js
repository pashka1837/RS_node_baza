import {
	parentPort,
	workerData,
} from 'node:worker_threads';
const nthFibonacci = n => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
	const {data} = workerData;

	if (data === 17) {
		throw Error();
	}

	const message = {
		data: nthFibonacci(data * 2),
		// Multipleid by 2 to increase execution time so you could see difference when using workers and witout
		status: 'resolved',
	};

	parentPort.postMessage(message);
};

sendResult();
