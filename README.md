# init-cli

inspired by [this article](https://medium.com/northcoders/creating-a-project-generator-with-node-29e13b3cd309) but added [commander.js](https://github.com/tj/commander.js)

## Installation

### using yarn

```bash
git clone https://github.com/devskar/init-cli
cd init-cli
yarn
yarn global add $PWD
```

Note: if the last step does not work for you, you can still use `npm install -g`

### using npm

```bash
git clone https://github.com/devskar/init-cli
cd init-cli
npm install
npm install -g
```

## Usage

Note: make sure you added the npm bin to your Path!

run `init-cli <project-name> [options]` anywhere

available options:

-V, --version output the version number <br>
-L, --list list available templates <br>
-t, --template <template-name> select a template <br>
-h, --help display help for command <br>

## Setup Scripts

Each template can have one `init.setup.js`. It has to export a function that can take `projectPath` as string argument. That script will be run after all files have bin created. It should be used to install dependencies or any other ways to setup the project.
