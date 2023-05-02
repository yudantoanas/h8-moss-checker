const { exec, execSync } = require('child_process')
const { existsSync } = require('fs')

const gitSSH = ({ batchName, repoName }) => {
	return `git@github.com:${batchName}/${repoName}`
}

const gitClone = (repo, branch, path) => {
	return new Promise((success, fail) => {
		if (existsSync(`${path}/${branch}`)) execSync(`rm -rf ${path}/${branch}`)

		exec(`git clone --branch ${branch} --single-branch ${repo} ${path}/${branch}`, (e) => {
			if (e) fail(e)
			else success()
		})
	})
}

const gitCloneClassroom = (path, repository, batch_name) => {
	return new Promise((success, fail) => {
		if (existsSync(`${path}/${repository}`)) execSync(`rm -rf ${path}/${repository}`)

		const execStatement = `git clone --branch main --single-branch git@github.com:${batch_name}/${repository} ${path}/${repository}`
		exec(execStatement, (e) => {
			if (e) fail(e)
			else success()
		})
	})
}


module.exports = {
	gitClone,
	gitCloneClassroom,
	gitSSH
}