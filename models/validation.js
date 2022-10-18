'use strict'

const path = require('path')
const { readFile, writeFile } = require('fs').promises
const GithubRepo = require('./githubrepo.js')

const BASE_PATH = path.resolve(__dirname, `../cases`)
const VALIDATION_FILTERED_FILE = 'validations.json'
const VALIDATION_FILE = 'validations.csv'
const EXCLUDED_REPOS = ['master', 'main']

class Validation {
  // Version 1.0 codebase

  // static async excludes({batch_name, folder, base_ratio}) {
  //   console.log({batch_name, folder, base_ratio})
  //   readFile(path.resolve(BASE_PATH, batch_name, folder, VALIDATION_FILE), 'utf-8')
  //   .then(file => {
  //     return file
  //       .split('\n')
  //       .reduce((acc, curr) => {
  //         const [ firstStudent, secondStudent, ratio ] = curr.split(',')
  //         if (Number(ratio) > base_ratio) {
  //           acc.push({
  //             firstStudent,
  //             secondStudent,
  //             ratio: Number(ratio)
  //           })
  //         }

  //         return acc
  //       }, [])
  //       .filter(({ firstStudent, secondStudent }) => {
  //         switch(true){
  //           case EXCLUDED_REPOS.includes(firstStudent):
  //           case EXCLUDED_REPOS.includes(secondStudent):
  //             return false
  //           default:
  //             return true
  //         }
  //       })
  //   })
  //   .then(files => {
  //     files.sort((a, b) => b.ratio - a.ratio)

  //     return writeFile(
  //       path.resolve(BASE_PATH, batch_name, folder, VALIDATION_FILTERED_FILE),
  //       JSON.stringify(files, null, 2)
  //     )
  //   })
  //   .catch(e => {
  //     throw e
  //   })
  // }

  // static filterCase() {
  //   return new Promise((resolve, reject) => {
  //     let conf = {}

  //     GithubRepo
  //     .getConfig()
  //     .then(({ batch_name, phase, week, day, type, base_ratio }) => {
  //       conf = { batch_name, phase, week, day, type, base_ratio }
  //       return GithubRepo.getPhaseRepos({ phase, type })
  //     })
  //     .then(phaseRepos => {
  //       const period = `w${conf.week}d${conf.day}`
  //       const repos = phaseRepos[period]

  //       switch(conf.type) {
  //         case 'livecodes':
  //           repos.sources.forEach(repo => {
  //             const folder = `${repos.name}-${repo.split('.js')[0]}`

  //             this.excludes({ ...conf, folder })
  //           })
  //           break
  //         case 'rocket':
  //         case 'challenges':
  //           repos.forEach(repo => {
  //             const { name: folder } = repo

  //             this.excludes({ ...conf, folder })
  //           })
  //           break
  //         default:
  //           throw 'You have to set the type before running this tool.'
  //       }

  //       resolve()
  //       // if (type !== 'livecodes') {
  //       //   // phaseRepos[`w${week}d${day}`].forEach()
  //       //   for (let i = 0; i < phaseRepos[period].length; i++) {
  //       //     const { name } = phaseRepos[period][i]
  //       //     this.excludes({ batch_name, base_ratio, folder: name })
  //       //   }
  //       // } else {
  //       //   for (let i = 0; i < phaseRepos[period].sources.length; i++) {
  //       //     const name = phaseRepos[period].name 
  //       //       + '-' + phaseRepos[period].sources[i].split('.js')[0]
  //       //     this.excludes({ batch_name, base_ratio, folder: name })
  //       //   }
  //       // }
  //     })
  //     .catch(reject)
  //   })

  //   // try {
  //   //   const { batch_name, phase,
  //   //     week,
  //   //     day,
  //   //     type,
  //   //     base_ratio
  //   //   } = await GithubRepo.getConfig()

  //   //   const phaseRepos = await GithubRepo.getPhaseRepos({ phase, type })

  //   //   if (type !== 'livecodes') {
  //   //     // phaseRepos[`w${week}d${day}`].forEach()
  //   //     for (let i = 0; i < phaseRepos[`w${week}d${day}`].length; i++) {
  //   //       const { name } = phaseRepos[`w${week}d${day}`][i]
  //   //       this.excludes({ batch_name, base_ratio, folder: name })
  //   //     }
  //   //   } else {
  //   //     for (let i = 0; i < phaseRepos[`w${week}d${day}`].sources.length; i++) {
  //   //       const name = phaseRepos[`w${week}d${day}`].name 
  //   //         + '-' + phaseRepos[`w${week}d${day}`].sources[i].split('.js')[0]
  //   //       this.excludes({ batch_name, base_ratio, folder: name })
  //   //     }
  //   //   }
  //   // } catch (error) {
  //   //   throw error
  //   // }
  // }
}

module.exports = Validation