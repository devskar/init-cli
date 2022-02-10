const inquirer = require('inquirer');
const { exec } = require('child_process');
const oraPromise = import('ora');

const CHOICES = ['npm', 'yarn', 'install later'];

const packageManagerQuestion = {
	name: 'packageManager',
	type: 'list',
	message: 'How would you like to install the dependencies?',
	choices: CHOICES,
};

const init = async projectPath => {
	const ora = (await oraPromise).default;

	inquirer.prompt(packageManagerQuestion).then(answers => {
		const packageManager = answers.packageManager;
		const packageManagerCommand =
			packageManager === 'npm'
				? 'npm install'
				: packageManager === 'yarn'
				? 'yarn'
				: null;

		if (packageManagerCommand == null) {
			console.log('Dependencies will not be installed.');
			return;
		}

		console.log(`Installing dependencies using ${packageManager}`);

		const spinner = ora('Installing dependencies...').start();
		exec(
			`cd ${projectPath} && ${packageManagerCommand}`,
			(err, stdout, stderr) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(stdout);
				console.log(stderr);

				spinner.succeed('Dependencies installed!');
			}
		);
	});
};

module.exports = init;
