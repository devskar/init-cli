const installDependencies = (templatePath, outputPath, setupFileName) => {
	const origFilePath = `${templatePath}/${setupFileName}`;

	const initScript = require(origFilePath);

	if (initScript === null) return;

	initScript(outputPath);
};
module.exports = installDependencies;
