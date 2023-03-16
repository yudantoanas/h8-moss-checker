'use strict'
const fs = require('fs').promises
const { execSync } = require('child_process')
const similarityCheck = require('string-similarity')

const MossController = require('./moss')
const BranchController = require('./branch')
const RepositoryController = require('./repository')

const GithubRepo = require('../models/githubrepo')
const { writeSyncJSON } = require('../helpers/jsonHelper')
const { sortDescending } = require('../helpers/sortHelper')

class CheckerController {
  static check(params) {
    console.time(`Checking complete! I took`)
    let conf = {
      debug: params.debug,
      moss: {
        enabled: !params.ignoreMoss,
        basePath: ''
      },
      filterRatio: params.filterMinRatio || 0,
      repo: params.repository
    }

    GithubRepo.getConfig()
      .then(config => {
        conf = { ...conf, ...config }

        return GithubRepo.validateRepoName(conf)
      })
      .then(({ name }) => BranchController.getBranches(name, conf))
      .then(({ branches, config }) => {
        conf = { ...config }
        return branches
      })
      .then(branches => BranchController.cloneFromBranches(branches, conf))
      .then(async config => ({
        ...config,
        gitMetadata: await config.gitMetadata
      }))
      .then(conf => BranchController.writeMetadata(conf))
      .then(async ({ config, files }) => {
        conf = { ...config }

        return await files
      })
      .then(files => Promise.all(files.map(async (firstFile, i) => ({
        content: await fs.readFile(`${conf.path.outputPath}/${firstFile}.js`, 'utf8'),
        name: firstFile
      }))))
      .then(results => this.findSimilarities(results, conf))
      .then(results => this.generateResults(results, conf))
      .then(async results => {
        if (conf.moss.enabled) {
          const mossUrl = await MossController.generateMossResults(results, conf)
          // return await MossController.generateMossResults(results, conf).then(({ results }) => MossController.saveResults(results, conf))
          return `Moss says... we should check here:\n${mossUrl}\n\nThe URL is valid for 2 weeks.`
        }
        else return 'MOSS checking ignored. Skipping...'
      })
      .then(message => {
        console.log()
        console.log(message)
        console.log()
      })
      .then(() => console.timeEnd(`Checking complete! I took`))
      // urgent error
      // .catch((error) => console.error(error))
      .catch(({ stack }) => console.error({ err: stack, conf }))
      .finally(_ => {
        // !conf.debug && execSync(`rm -rf ${conf.path.branchPath}`)
        // urgent error
        // !conf.debug && execSync(`rm -rf ${conf.path.testPath}`)
      })
  }

  static checkClassroom(params, usernames) {
    console.time(`Checking complete! I took`)
    let conf = {
      debug: params.debug,
      moss: {
        enabled: !params.ignoreMoss,
        basePath: ''
      },
      filterRatio: params.filterMinRatio || 0,
      usernames: usernames
    }

    GithubRepo.getConfig()
      .then(config => {
        conf = { ...conf, ...config }

        return RepositoryController.getRepositories(conf)
      })
      .then(config => {
        return RepositoryController.bulkClone(config)
      })
      // .then(({ branches, config }) => {
      //   conf = { ...config }
      //   return branches
      // })
      // .then(branches => BranchController.cloneFromBranches(branches, conf))
      .then(async config => ({
        ...config,
        gitMetadata: await config.gitMetadata
      }))
      .then(config => {
        return RepositoryController.writeMetadata(config)
      })
      .then(async ({ config, files }) => {
        conf = { ...config }

        return await files
      })
      .then(files => Promise.all(files.map(async (firstFile, i) => ({
        content: await fs.readFile(`${conf.path.outputPath}/${firstFile}.js`, 'utf8'),
        name: firstFile
      }))))
      .then(results => this.findSimilarities(results, conf))
      .then(results => this.generateResults(results, conf))
      .then(async results => {
        if(conf.moss.enabled) {
          const mossUrl = await MossController.generateMossResults(results, conf)
          // return await MossController.generateMossResults(results, conf).then(({ results }) => MossController.saveResults(results, conf))
          return `Moss says... we should check here:\n${mossUrl}\n\nThe URL is valid for 2 weeks.`
        }
        else return 'MOSS checking ignored. Skipping...'
      })
      .then(message => {
        console.log()
        console.log(message)
        console.log()
      })
      .then(() => console.timeEnd(`Checking complete! I took`))
      // urgent error
      // .catch((error) => console.error(error))
      .catch(({ stack }) => console.error({ err: stack, conf }))
      .finally(_ => {
        // !conf.debug && execSync(`rm -rf ${conf.path.branchPath}`)
        // urgent error
        // !conf.debug && execSync(`rm -rf ${conf.path.testPath}`)
      })
  }

  static generateResults = (ratioResults, conf) => {
    let totalCases = 0

    ratioResults = ratioResults.filter(result => {
      let flag = false
      const caseCount = result.studentCases.length

      if (caseCount) {
        totalCases += caseCount
        flag = true
      }

      return flag
    })

    conf.debug && writeSyncJSON('./debug.json', ratioResults)

    console.log(`Generated and filtered results successfully.`)
    console.log()

    console.log(`Total cases found: ${totalCases} case(s)`)
    console.log()

    console.log(`Sorting results and saving results to file...`)

    let id = 1
    ratioResults = ratioResults.map(result => {
      return { id: id++, ...result }
    })

    writeSyncJSON(`${conf.path.resultPath}`, ratioResults)

    console.log(`Local checking complete!`)
    console.log(`Student's git metadata file is saved here: ${conf.path.metadataPath}`)
    console.log()
    console.log(`Local ratio checking results file is saved here: ${conf.path.resultPath}`)
    console.log()

    return ratioResults
  }

  static findSimilarities = (results, conf) => {
    const { base_ratio: baseRatio, filterRatio, gitMetadata, debug } = conf
    const defaultRatio = filterRatio || 0

    return results.map((firstResult, i) => {
      const output = {
        student: gitMetadata[i],
        studentCases: []
      }

      results.forEach((secondResult, j) => {
        if (i > j) {
          const ratioResult = similarityCheck.compareTwoStrings(firstResult.content, secondResult.content)
          const normalizedRatio = (ratioResult - baseRatio) / (1 - baseRatio) * 100 // will change to baseRatio

          // debug
          debug && console.log(firstResult.name, secondResult.name, ratioResult, normalizedRatio)

          if (normalizedRatio > defaultRatio) {
            const relatingStudent = gitMetadata.find(student => student.branch === secondResult.name.split('.js')[0])

            debug && console.log({ relatingStudent, result2: secondResult.name.split('.js')[0] })

            output.studentCases.push({
              with: relatingStudent,
              ratio: +normalizedRatio.toFixed(2)
            })
          }
        }
      })

      output.studentCases.sort((a, b) => sortDescending(a, b, 'ratio'))

      return output
    })
  }
}

module.exports = CheckerController