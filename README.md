# big-parsing

The problem consists in extracting data from a JSON file too big to be parsed / hold in memory as a whole.

The file is a valid JSON file, consisting in an array of objects. The structure of objects is not known, apart from the
fact that they have an `id` and a `name` attributes.

The formatting of the file is not known: it may be a single line file, or formatted using a variety of whitespace
options.

The problem consists in writing a Node.js program which must:

- accept an `id` as a command-line argument
- log to the console the `name` attribute of the object with the corresponding id.

To simulate low memory constraints, your program should work with `node --max_old_space_size=50`

---
This guide will walk you through using the backend of the application.

## Set up your workstation

* Install [Node.js](http://nodejs.org) to your local workstation

## Clone your Application

Clone the application to your local workstation:

	$ git clone https://github.com/adnanelamghari/big-parsing.git
	$ cd big-parsing

## Prepare your Application

To use this Node JS application, you will need to conform to 2 basic requirements:

1. Use [NPM](https://npmjs.org/) to manage dependencies
2. Use [Node](https://nodejs.org/en/) to run the project

#### 1. Install dependencies with NPM

Then install the dependencies with `npm`.

	npm install

#### 2. Use Nodemon to manage processes

To run the application use npm start or find-record script on the package.json file :

	npm run find-record id=[record-id]

Example :

     npm run start id=62359

This should return: Damon Jerde

This tells npm to run `find-record` command using node : `tsc && node --max_old_space_size=50 dist/index.js`.

#### 3. Change the input file

By default, the project will use the input.json file to look for the wanted record, you can change the file link in
the `src/parser.controller.ts` class constructor.

## Test code

To test the code of this project simply run the test script :

    npm run test
