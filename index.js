#!/usr/bin/env node

const commander = require('commander');
const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const createDirectoryContents = require('./createDirectoryContents');
const packageJson = require('./package.json');

const CURR_DIR = process.cwd();
const TEMPLATE_CHOICES = fs.readdirSync(`${__dirname}/templates`);

const main = async () => {
	const options = validateCommandLineArgs();

	if (!options.template) {
		options.template = await askForTemplate();
	}

	const { templatePath, outputPath } = generatePaths(options);

	createDirectoryContents(templatePath, outputPath);
};

const generatePaths = options => {
	const templatePath = `${__dirname}/templates/${options.template}`;

	let outputPath;
	if (options.projectName === '.') {
		outputPath = CURR_DIR;
	} else {
		outputPath = resolve(CURR_DIR, options.projectName);
		fs.mkdirSync(outputPath);
	}

	return { templatePath, outputPath };
};

const askForTemplate = async () => {
	const templateQuestion = {
		name: 'template',
		type: 'list',
		message: 'What project template would you like to generate?',
		choices: TEMPLATE_CHOICES,
	};

	return await inquirer.prompt(templateQuestion).then(answers => {
		return answers.template;
	});
};

const validateCommandLineArgs = () => {
	const options = {};
	const program = new commander.Command(packageJson.name)
		.version(packageJson.version)
		.argument(
			'[project-name]',
			'the name of the project',
			name => (options.projectName = name),
			'.'
		)
		.usage('<project-name> [options]')
		.addOption(new commander.Option('-L, --list', 'list available templates'))
		.addOption(
			new commander.Option(
				'-t, --template <template-name>',
				'select a template'
			)
				.choices(TEMPLATE_CHOICES)
				.argParser(value => (options.template = value))
		)
		.parse(process.argv);

	if (program.opts().list) {
		console.log('available templates:');
		console.log('\t' + TEMPLATE_CHOICES.join('\n\t'));
		process.exit(0);
	}

	// set default value
	options.projectName = options.projectName || '.';

	return options;
};

main();
