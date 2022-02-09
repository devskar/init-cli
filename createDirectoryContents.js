const fs = require('fs');
const CURR_DIR = process.cwd();

module.exports = createDirectoryContents = (templatePath, outputPath) => {
	const filesToCreate = fs.readdirSync(templatePath);

	filesToCreate.forEach(file => {
		const origFilePath = `${templatePath}/${file}`;
		const stats = fs.statSync(origFilePath);

		if (stats.isFile()) {
			// Rename
			if (file === '.npmignore') file = '.gitignore';
			const fileOutputPath = `${outputPath}/${file}`;

			fs.copyFileSync(origFilePath, fileOutputPath);
		} else if (stats.isDirectory()) {
			fs.mkdirSync(`${outputPath}/${file}`);

			// recursive call
			createDirectoryContents(
				`${templatePath}/${file}`,
				`${outputPath}/${file}`
			);
		}
	});
};
