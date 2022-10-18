const { readFileSync, writeFileSync } = require('fs')
const { readFile, writeFile } = require('fs/promises')

const serialize = (data) => JSON.stringify(data, null, 2)

// Synchronous

const readJSON = (path) => readFile(path).then(JSON.parse)

const writeJSON = (path, data) => writeFile(path, serialize(data))

// Promise-based

const readSyncJSON = (path) => JSON.parse(readFileSync(path))

const writeSyncJSON = (path, data) => writeFileSync(path, serialize(data))

module.exports = {
	serialize, readJSON, readSyncJSON, writeJSON, writeSyncJSON
}