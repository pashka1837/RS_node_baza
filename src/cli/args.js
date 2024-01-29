const parseArgs = () => {
	const vars = process.argv.slice(2);
	const strAr = [];
	for (let i = 0; i < vars.length - 1; i += 2) {
		strAr.push(`${vars[i].replace('--', '')} is ${vars[i + 1]}`);
	}

	console.log(strAr.join(', '));
};

parseArgs();
