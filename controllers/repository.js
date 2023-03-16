const { exec, execSync, spawnSync } = require('child_process')
const fs = require('fs').promises
const fsSync = require('fs')

const { gitClone, gitCloneClassroom, gitSSH } = require('../helpers/gitHelper')
const { recursiveCombine } = require('../helpers/checker')
const { createDirIfNotExist } = require('../helpers/fileHelper')
const { sortAscending } = require('../helpers/sortHelper')

class RepositoryController {
    static getRepositories(config) {
        return new Promise((success, fail) => {
            const BASE_PATH = `batches/${config.batch_name}/${config.prefix_name}`

            config.repositoriesUrl = config.usernames.map(username => gitSSH({ batchName: config.batch_name, repoName: `${config.prefix_name}-${username}` }))

            config.path = {
                testPath: `${BASE_PATH}/tests`,
                outputPath: `${BASE_PATH}/outputs`,
                resultPath: `${BASE_PATH}/results.json`,
                mossPath: `${BASE_PATH}/moss-results.json`,
                mergedPath: `${BASE_PATH}/merged-results.json`,
                metadataPath: `${BASE_PATH}/metadata.json`,
            }

            // console.log(config);

            let result = []
            let count = 0

            config.repositoriesUrl.forEach(repo => {
                console.log(`Checking repository ${repo} of ${config.batch_name} started`)
                console.log()

                exec(`git ls-remote ${repo} "refs/heads/*"`, { encoding: 'utf8' }, (err, output) => {
                    count++
                    if (err) {
                        console.log(err, "<<<ERR");
                    } else {
                        let branches = output.split('\n').map(line => line.split('\t')[1]).slice(0, -1).map(ref => ref.split('/').splice(-1)[0])
                        branches = branches.filter(branch => ['main'].includes(branch)).sort((a, b) => sortAscending(a, b))
                        result.push(repo.split('/')[1])

                        if (count === config.repositoriesUrl.length) {
                            console.log(`Total repositories: ${result.length}`)
                            config.repositories = result

                            success(config)
                        }
                    }
                })
            });
        })
    }

    static bulkClone(config) {
        console.log(`Cloning all repository...`)
        console.log()

        return {
            ...config,
            gitMetadata: Promise.all(config.repositories.map(async repository => {
                try {
                    // do git clone
                    await gitCloneClassroom(config.path.testPath, repository)

                    const testPath = `${config.path.testPath}/${repository}`
                    const outputPath = `${config.path.outputPath}/${repository}`

                    // show git log from cloned branch
                    return (new Promise((success, fail) => {
                        exec(`git log`, { cwd: `${testPath}` }, (err, out) => {
                            if (err) throw fail(err)

                            const metadata = {
                                repository: repository,
                                author: out.split('\n').find(line => line.includes('Author:')).split(': ')[1].split(' <')[0],
                                commitTimeline: out.split('\n').filter(line => line.includes('Date:'))
                            }

                            createDirIfNotExist(`${config.path.outputPath}`, true)

                            fsSync.writeFileSync(`${outputPath}.js`, recursiveCombine(`${testPath}`))

                            success(metadata)
                        })
                    }))
                } catch (e) {
                    console.error(e)
                }
            }))
        }
    }

    static writeMetadata(config) {
        console.log(`Writing git metadata to a file...`)
    
        config.gitMetadata = config.gitMetadata.sort((a, b) => {
          if (a.repository > b.repository) return 1
          if (a.repository < b.repository) return -1
          return 0
        })
    
        config.debug && console.log(config.gitMetadata)
    
        fsSync.writeFileSync(`${config.path.metadataPath}`, JSON.stringify(config.gitMetadata, null, 2))
    
        console.log(`Writing complete.`)
        console.log()
    
        console.log(`Filtering and generating results...`)
        return {
          config,
          files: fs.readdir(config.path.testPath)
        }
      }
}

module.exports = RepositoryController