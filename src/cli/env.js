const parseEnv = () => {
	const vars = [];
	for (const key in process.env) {
		if (key.includes('RSS_')) {
			vars.push(`${key}=${process.env[key]}`);
		}
	}

	console.log(vars.join('; '));
};

parseEnv();
