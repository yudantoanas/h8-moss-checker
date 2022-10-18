const { existsSync, mkdirSync } = require('fs')

const createDirIfNotExist = (path, recursive = false) => {
	if(!existsSync(path)) mkdirSync(path, { recursive })
}

module.exports = {
	createDirIfNotExist
}