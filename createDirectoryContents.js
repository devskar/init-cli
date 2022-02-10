const fs = require('fs');

const createDirectoryContents = (templatePath, outputPath, setupFileName) => {
	const filesToCreate = fs.readdirSync(templatePath);

	filesToCreate.forEach(file => {
		const origFilePath = `${templatePath}/${file}`;
		const stats = fs.statSync(origFilePath);

		if (stats.isFile()) {
			// don't copy the config file
			if (file === setupFileName) return;

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

module.exports = createDirectoryContents;
