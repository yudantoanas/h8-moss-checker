const { exec, execSync, spawnSync } = require('child_process')
const fs = require('fs').promises
const fsSync = require('fs')

const { gitClone, gitSSH } = require('../helpers/gitHelper')
const { recursiveCombine } = require('../helpers/checker')
const { createDirIfNotExist } = require('../helpers/fileHelper')
const { sortAscending } = require('../helpers/sortHelper')

class BranchController {
  static getBranches(name, config) {
    return new Promise((success, fail) => {
      const BASE_PATH = `batches/${config.batch_name}/${name}`

      config.repo = { name }
      config.gitRepo = gitSSH({ batchName: config.batch_name, repoName: config.repo.name })

      config.path = {
        testPath: `${BASE_PATH}/tests`,
        outputPath: `${BASE_PATH}/outputs`,
        resultPath: `${BASE_PATH}/results.json`,
        mossPath: `${BASE_PATH}/moss-results.json`,
        mergedPath: `${BASE_PATH}/merged-results.json`,
        metadataPath: `${BASE_PATH}/metadata.json`,
      }

      console.log(`Checking repository ${config.repo.name} of ${config.batch_name} started`)
      console.log()

      const output = execSync(`git ls-remote ${config.gitRepo} "refs/heads/*"`, { encoding: 'utf8' })

      let branches = output.split('\n').map(line => line.split('\t')[1]).slice(0, -1).map(ref => ref.split('/').splice(-1)[0])

      branches = branches.filter(branch => !['master', 'main'].includes(branch)).sort((a, b) => sortAscending(a, b))

      console.log(`Total branches: ${branches.length}`)

      success({ branches, config })
    })
  }

  static cloneFromBranches(branches, config) {
    console.log(`Cloning each branch from a repository...`)

    console.log(`Branch cloning complete.`)
    console.log()

    return {
      ...config,
      gitMetadata: Promise.all(branches.map(async branch => {
        try {
          // do git clone
          await gitClone(config.gitRepo, branch, config.path.testPath)

          const branchTestPath = `${config.path.testPath}/${branch}`
          const branchOutputPath = `${config.path.outputPath}/${branch}`

          // show git log from cloned branch
          return (new Promise((success, fail) => {
            exec(`git log`, { cwd: `${branchTestPath}` }, (err, out) => {
              if (err) throw fail(err)

              const metadata = {
                branch,
                author: out.split('\n').find(line => line.includes('Author:')).split(': ')[1].split(' <')[0],
                commitTimeline: out.split('\n').filter(line => line.includes('Date:'))
              }

              createDirIfNotExist(`${config.path.outputPath}`, true)

              fsSync.writeFileSync(`${branchOutputPath}.js`, recursiveCombine(`${branchTestPath}`))

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
      if (a.branch > b.branch) return 1
      if (a.branch < b.branch) return -1
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

module.exports = BranchController