# Code Similarity Checker

Code Checker is a Javascript-based project that checks for any similarities between 2 (or more) strings from all branches (excluding `main`/`master` branch) of a selected repository.

This project also uses [Moss](https://theory.stanford.edu/~aiken/moss/) for second opinion, anti-plagiarism checking.

## Background

This project is a continuation from Cheat Detector application, that was developed by [isrotrip](https://github.com/isrotrip), made for finding similarities inside each of the student's codes. The project was developed using Javascript and Python.

## Features

* Javascript based, using Dice's Coefficient to find similarities between 2 (or more) different strings.
* Nearly all processes are asynchronous, making the process faster.
* Normalized ratio, starting from the `base_ratio` set in `config.js`.
* Also features a second opinion similarity checking from Moss.

## How it works

This app utilizes [`string-similarity`](https://github.com/aceakash/string-similarity) package, which uses the Dice's Coefficient algorithm, to check 2 (or more) different strings for similarities. Code Checker will also strips unused comments, which will reduce noise mostly caused by the challenge's template, and improves accuracy during checking.

## Setup

#### `config/config.js`

Rename `config.example.js` to `config.js`, and change its contents as needed:

``` js
module.exports = {
  batch_name: "batch-name", // batch/organization/class name
  prefix_name: "prefix-name", // repo prefix name, e.g.: fsjs-p1-v2-c1
  base_ratio: 0.8 // minimum base ratio to be filtered, ranging from 0-1. Default: 0.8
}
```

#### `moss`

Get your Moss script by [registering your user email](https://theory.stanford.edu/~aiken/moss/) at Moss.

`tl;dr` - Send email to `moss@moss.stanford.edu` without any subject, shown below:

``` sh
registeruser
mail <your_email@mail.com>
```

Change `your_email@mail.com` with your actual email, without brackets.

After a short while, the script will be sent from Moss, containing the needed scripts along with the instructions. Place the script within the file `moss` inside the same directory as `app.js` file.

#### `config/valid-repositories.js`

Add your valid repositories in array of objects format. For example:

``` js
module.exports = [
  {
    name: "your-repository-name"
  }
]
```

**NOTE**:
* One repository must be enclosed in an object.
* this is not used when checking for GitHub Classroom

At this time, the object only contains the `name` property. Additional properties will be added in the future.

#### `config/usernames.js`

Add student usernames in an array format. For example:

``` js
module.exports = [
    'asep_doradon',
]
```

**NOTE**: 
- this file is **mandatory** for checking repos from GitHub Classroom
- username(s) can be taken from `students` tab, if the data is not same with their real gh username or they haven't clone the repo from classroom then it won't be included in the checking process

## Usage

Run `node app.js` to see available commands:

``` md
Code Similarity Checker
Version 2.0

Usage

check repo-name <repo> [no-moss]
        Validates repository of a set organization,
        and checks for similarity for each branch(es).
        Submits 2 files to Moss by default, for second opinion.
        - repo-name <repo>      specifies repository name
        - [no-moss]             disables Moss checking
        - [min-ratio] <0-100>   filters normalized ratio

checkClassroom [no-moss]
        Validates repository of a set organization (classroom repo),
        and checks for similarity from each student repositories.
        Submits 2 files to Moss by default, for second opinion.
        - [no-moss]             disables Moss checking
        - [min-ratio] <0-100>   filters normalized ratio
```

Currently available commands:

* `node app.js check repo-name <repository> [no-moss]`
  
  This command requires `repo-name` parameter set, followed by the actual repository name from `valid-repository.js`.

* `node app.js checkClassroom [no-moss]`

 The results of these processes can be seen at `batches/<batch-name>/<prefix-name>/results.json` directory.

## Contribute

I'm gladly accept your contribution! Just open a new pull request at [Pull Requests](/pulls) menu, and make details of what you've made on your branch.

## Have an issue?

Glad to help! Just open a new issue at [Issues](/issues) menu when you're facing a bug or suggesting a new feature.
