const cac = require("cac");
const pkg = require("../package.json");
const { compressImage } = require("./compress");
const cli = cac();

cli.command("[...args]", "input args")
	.option("-i, --input [input]", "input file name")
	.option("-o, --output [output]", "output file name")
	.option("-r, --ratio [ratio]", "the compress ratio")
	.action((args, options) => {
		console.log(args, options);
		if (args.length == 0) process.exit(1);

		const res = { input: null, output: null, ratio: null };
		res.input = options.input || args[0];
		res.output = options.output || (options.input ? args[0] : args[1]) || "low.png";
		res.ratio =
			options.ratio ||
			(options.input && options.output ? args[0] : options.input || options.output ? args[1] : args[2]) ||
			0.1;

		console.log("input image:", res.input);
		console.log("output image:", res.output);
		console.log("compress ratio:", res.ratio);

		compressImage(res.input, res.output, res.ratio);
	});

cli.help().version(pkg.version);
cli.parse();
