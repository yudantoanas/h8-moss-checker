const fs = require('fs').promises
// const { existsSync } = require('fs')
const { exec } = require('child_process')
const STUDENTS_PATH= 'students.json'
const PR_TIME_PATH = 'prTimes.json'

const IGNORED_NODES = [ 'node_modules', 'package.json', 'readme.md', 'package-lock.json' ]

class GithubRepo {
  // Config functions
  static async getConfig() {
    return require('../config/config.js')
  }

  static getSSHName({ batch_name, repoName }) {
    return `git@github.com:${batch_name}/${repoName}`
  }

  // Main functions
  static validateRepoName({ repo }) {
    return new Promise((resolve, reject) => {
      const phaseRepos = require(`../config/valid-repositories.js`)
 
      let fetchedRepo = phaseRepos.find(phaseRepo => {
        return phaseRepo.name.toLowerCase() === repo.toLowerCase()
      })

      if(fetchedRepo) resolve(fetchedRepo)
      else reject({
        message: "You entered the repo name, but it's invalid. Check the input repo name again.",
        availableRepos: (() => {
          return phaseRepos.map(phaseRepo => phaseRepo.name)
      })
    })
    })
  }

  // Version 1.0 codebase

  // static getPhaseRepos({ phase, type }) {
  //   return new Promise((resolve, reject) => {
  //     switch(phase){
  //       case 0:
  //         if (type === 'challenges') {
  //           resolve(fs.readFile('./config/repositories/phase-0-repository.json', 'utf-8'))
  //         } else if (type === 'livecodes') {
  //           resolve(fs.readFile('./config/repositories/phase-0-livecode.json', 'utf-8'))
  //         } else reject('config type should be challenges / livecodes at phase 0')
  //         break
  //       case 1:
  //         if (type === 'challenges') {
  //           resolve(fs.readFile('./config/repositories/phase-1-repository.json', 'utf-8'))
  //         } else if (type === 'rockets') {
  //           resolve(fs.readFile('./config/repositories/phase-1-rocket.json', 'utf-8'))
  //         } else reject('config type should be challenges / rockets at phase 1')
  //         break
  //       default:
  //         reject('This tool only works in Phase 0 and 1.')
  //     }
  //   })
  // }

  // static async generateTemplate() {
  //   try {
  //     const { batch_name, phase, week, day, type } = await this.getConfig()

  //     if (!batch_name)
  //       throw 'please input batch name in /config/config.json'
  //     else if (isNaN(phase) || phase < 0 || phase > 3) 
  //       throw 'please input phase by [0 or 1 or 2 or 3] in /config/config.json'
  //     else if (!week)
  //       throw 'please input week in /config/config.json'
  //     else if (!day)
  //       throw 'please input day in /config/config.json'
      
  //     let phaseRepos = await this.getPhaseRepos({ phase, type })

  //     if (type === 'livecodes') {
  //       const { name, sources } = phaseRepos[`w${week}d${day}`]
        
  //       await sources.forEach(async (source) => await this.generateSingleRepo({
  //         batch_name,
  //         name,
  //         source,
  //         customFolder: name + '-' + sources[i].split('.js')[0]
  //       }))

        
  //       // for (let i = 0; i < sources.length; i++) {
  //       //   await this.generateSingleRepo({
  //       //     batch_name,
  //       //     name: name,
  //       //     source: sources[i],
  //       //     customFolder: name + '-' + sources[i].split('.js')[0]
  //       //   })
  //       // }
  //       return await this.deleteRepo({ name })
  //     } else {
  //       return await phaseRepos[`w${week}d${day}`].forEach(async repo => {
  //         const { name, source, modular } = repo
  //         await this.generateSingleRepo({ batch_name, name, source, modular })
  //         await this.deleteRepo({ name })
  //       })
  //       // for (let i = 0; i < phaseRepos[`w${week}d${day}`].length; i++) {
  //       //   const { name, source, modular } = phaseRepos[`w${week}d${day}`][i]
  //       //   await this.generateSingleRepo({ batch_name, name, source, modular })
  //       //   await this.deleteRepo({ name })
  //       // }
  //     }
  //   } catch (err) {
  //     return Promise.reject(err) 
  //   }
  // }

  // static templateGenerate() {
  //   return new Promise((resolve, reject) => {
  //     let conf = {}
  //     // get config first
  //     this.getConfig()
  //     // then check for its configuration
  //     .then(({ batch_name, phase, week, day, type }) => {
  //         if (!batch_name)
  //           throw 'please input batch name in /config/config.json'
  //         else if (isNaN(phase) || phase < 0 || phase > 3) 
  //           throw 'please input phase by [0 or 1 or 2 or 3] in /config/config.json'
  //         else if (!week)
  //           throw 'please input week in /config/config.json'
  //         else if (!day)
  //           throw 'please input day in /config/config.json'
          
  //         // if it passes the validation, then add this to config
  //         conf = { batch_name, phase, week, day, type }
    
  //         // run this
  //         this.getPhaseRepos({ phase, type })
  //         // and then...
  //         .then(phaseRepos => {
  //           phaseRepos = JSON.parse(phaseRepos)
  //           const period = `w${conf.week}d${conf.day}`
      
  //           switch(conf.type){
  //             case 'livecodes':
  //               const { name, sources } = phaseRepos[period]
      
  //               conf = { ...conf, name, customFolder: name + '-' + sources[i].split('.js')[0] }
  //               sources.forEach((source) => this.generateSingleRepo({ ...conf, source }))
      
  //               return this.deleteRepo({ name: conf.name })
  //             case 'challenges':
  //             case 'rocket':
  //               return phaseRepos[period].forEach(async repo => {
  //                 conf = { ...conf, ...repo }
                  
  //                 try{
  //                   await this.generateSingleRepo(conf)
  //                   await this.deleteRepo(conf)
  //                 }catch(e){
  //                   reject(e)
  //                 }
  //               })
  //             default:
  //               throw 'You have to set the type before running this tool.'
  //           }
  //         })
  //         .catch(reject)
  //     })
  //   })
  // }

  // static generateSingleRepo({ batch_name, name, source, customFolder, modular }) {
  //   return new Promise(async (resolve, reject) => {
  //     // try {
  //     //   if(await fs.access(name)) await fs.rmdir(name)
  //     // } catch (e) {
  //     //   console.log(e)
  //     // }
  
  //     // let folder = customFolder || name
  
  //     // git.clone(this.getSSHName({ batch_name, repoName: name }))
  //     // .then(() => fs.mkdir(`./cases/${batch_name}/${folder}/files`, { recursive: true }))
  //     // .then(() => fs.readdir(`./templates`))
  //     // .then(async files => {
  //     //   files.forEach(async file => {
  //     //     await fs.copyFile(`./templates/${file}`, `./cases/${batch_name}/${folder}/`)
  //     //   })
  
  //     //   const conf = { cwd: name, batch_name, repoName: name, source, folder, modular }
    
  //     //   return this.generateStudents(conf)
  //     // })
  //     // .then(result => {
  //     //   return this.autoGenerateFiles(conf)
  //     // })
  //     // .catch(console.log)
      
  //     try {
  //       let folder = customFolder || name
  //       await new Promise((resolve) => {
  //         exec(`git clone ${this.getSSHName({ batch_name, repoName: name })}`, () => resolve())
  //       })
    
  //       await fs.mkdir(`./cases/${batch_name}/${folder}/files`, { recursive: true })
    
  //       const files = await fs.readdir('./templates')
  
        
  //       for (let i = 0; i < files.length; i++) {
  //         await fs.copyFile(`./templates/${files[i]}`, `./cases/${batch_name}/${folder}/${files[i]}`)
  //         // await new Promise((resolve, reject) => {
  //         //   exec(`cp ./templates/${files[i]} ./cases/${batch_name}/${folder}`, (error) => {
  //         //     if (error) return reject(error)
    
  //         //     resolve()
  //         //   })
  //         // })
  //       }
    
  //       await this.generateStudents({
  //         cwd: name,
  //         batch_name,
  //         repoName: name,
  //         folder
  //       })
    
  //       await this.autoGenerateFiles({
  //         cwd: name,
  //         batch_name,
  //         repoName: name,
  //         source,
  //         folder,
  //         modular
  //       })
  //     } catch (error) {
  //       return Promise.reject(error)
  //     }
  //   })
  // }

  // static async generateStudents({ cwd, batch_name, folder }) {
  //   try {
  //     await new Promise((resolve, reject) => {
  //       exec('git branch -a', {
  //         cwd
  //       }, async (error, stdout) => {
  //         if (error) return reject(error)
          
  //         const students = stdout
  //           .split('\n')
  //           .map((line) => {
  //             return line.split('remotes/origin/')
  //           })
  //           .filter((line) => {
  //             if (!line || line[1] === undefined) return false
  //             else if (line[1]) {
  //               if (line[1].slice(0, 3) === 'pr/') return false
  //               else if (line[1].slice(0, 3) === 'HEA') return false
  //             }
  //             return true
  //           })
  //           .map((line) => {
  //             return line[1]
  //           })

  //         await fs.writeFile(`./cases/${batch_name}/${folder}/${STUDENTS_PATH}`, JSON.stringify(students, null, 2))
  //         resolve()
  //       })
  //     })
  //   } catch (err) {
  //     return Promise.reject(err)
  //   }
  // }

  // static async autoGenerateFiles({ cwd, batch_name, source, folder, modular }) {
  //   try {
  //     const rawStudents = await fs.readFile(`./cases/${batch_name}/${folder}/${STUDENTS_PATH}`, 'utf-8')
  //     const students = JSON.parse(rawStudents)

  //     for (let i = 0; i < students.length; i++) {
  //       await this.generateSingleFile({
  //         branchName: students[i],
  //         cwd,
  //         batch_name,
  //         source,
  //         folder,
  //         modular
  //       })
  //     }
  //   } catch (err) {
  //     return Promise.reject(err)
  //   }
  // }

  // static async generateFile({ branchName, cwd, batch_name, source, folder, modular }){
  //   try {
  //     await fs.mkdir(cwd)
  //     await git.cwd()
  //   } catch(e) {
  //     Promise.reject(e)
  //   }
  // }

  // static generateSingleFile({ branchName, cwd, batch_name, source, folder, modular }) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //   //     git
  //   //     .cwd(cwd)
  //   //     .checkout(branchName)
  //   //     .then(() => fs.readFile(`./cases/${batch_name}/${folder}/${PR_TIME_PATH}`, 'utf-8'))
  //   //     .then(studentPRs => {
  //   //       studentPRs = JSON.parse(studentPRs)
          
  //   //       return new Promise(async (resolve, reject) => {
  //   //         // START CONSOLE LOGGING
  //   //         // let fsFiles = (await fs.readdir(cwd)).filter(node => !IGNORED_NODES.includes(node) && node[0] !== '.')
  //   //         // let currentDir = cwd
    
  //   //         // console.log(fsFiles)
  //   //         // END CONSOLE LOGGING
    
  //   //         exec(`ls`, { cwd }, async (err, stdout) => {
  //   //           // console.log(stdout)
  //   //           if (err) return reject(err)
              
  //   //           if (modular) {
  //   //             let fileContent = ''
  //   //             let files = stdout.split('\n').slice(0, -1).filter(node => {
  //   //               if(node === 'node_modules') console.log(`NODE_MODULES DETECTED AT BRANCH ${branchName}`)
  //   //               return !IGNORED_NODES.includes(node) || !node.split('/').includes('node_modules')
  //   //             })
    
  //   //             while (files.length) {
  //   //               if (!files[0]) {
  //   //                 files = files.slice(1)
  //   //               } else if (files[0].includes('.test.js')) {
  //   //                 files = files.slice(1)
  //   //               } else if (files[0].slice(-3) === '.js') {
  //   //                 fileContent += `// ============ File Path ${folder}/${files[0]} ============\n`
  //   //                 fileContent += await fs.readFile(`./${folder}/${files[0]}`, 'utf-8') + '\n'
  //   //                 files = files.slice(1)
  //   //               } else if (files[0].split('/').includes('node_modules') || files[0].includes('.')) {
  //   //                 files = files.slice(1)
  //   //               } else {
  //   //                 try {
  //   //                   await new Promise((resolve) => {
  //   //                     exec(`ls`, {
  //   //                       cwd: `${cwd}/${files[0]}`
  //   //                     }, (err, stdout) => {
  //   //                       if (err) {
  //   //                         console.log(`there's ${files[0]}`)
  //   //                       } else {
  //   //                         stdout
  //   //                         .split('\n')
  //   //                         .slice(0, -1)
  //   //                         .forEach((file) => {
  //   //                           files.push(`${files[0]}/${file}`)
  //   //                         })
  //   //                       }
      
  //   //                       files = files.slice(1)
      
  //   //                       resolve()
  //   //                     })
  //   //                   })
  //   //                 } catch (error) {
  //   //                   files = files.slice(1)
  //   //                 }
  //   //               }
  //   //             }
                
  //   //             return { modular, result: fs.writeFile(`./cases/${batch_name}/${folder}/files/${branchName}.js`, fileContent) }
                

  //   //             return this.gitLog({ cwd, studentPRs, batch_name, branchName, folder, found: null, modular, resolve, reject })
  //   //           } else {
  //   //             let found = null
            
  //   //             const bestCases = [ source ] // change it to source
              
  //   //             const allData = stdout.split('\n')
              
  //   //             bestCaseLoop:
  //   //             for (let i = 0; i < bestCases.length; i++) {
  //   //               for (let j = 0; j < allData.length; j++) {
  //   //                 if (allData[j].includes(bestCases[i])) {
  //   //                   found = allData[j]
  //   //                   break bestCaseLoop
  //   //                 }
  //   //               }
  //   //             }
    
  //   //             if (!found) {
  //   //               const rawStudents = await fs.readFile(`./cases/${batch_name}/${folder}/${STUDENTS_PATH}`, 'utf-8')
  //   //               let students = JSON.parse(rawStudents)
    
  //   //               students = students.filter((student) => student !== branchName)
    
  //   //               return fs.writeFile(`./cases/${batch_name}/${folder}/${STUDENTS_PATH}`, JSON.stringify(students, null, 2))
  //   //             }
    
  //   //             return this.gitLog({ cwd, studentPRs, branchName, batch_name, folder, found, modular, resolve, reject })
  //   //           }
  //   //         })
  //   //       })
  //   //     })
  //   //     .then(({ batch_name, folder, studentPRs }) => {
  //   //       console.log(`./cases/${batch_name}/${folder}/${PR_TIME_PATH}`)
  //   //       return fs.writeFile(`./cases/${batch_name}/${folder}/${PR_TIME_PATH}`, JSON.stringify(studentPRs, null, 2))
  //   //     })
  //   //     .then(resolve)
  //   //     .catch(reject)

  //       let studentPRs
  
  //       // git.cwd.checkout(branchName)
  //       console.log(`checking out ${branchName}...`)
  //         exec(`git checkout ${branchName}`, { cwd }, async (err) => {
  //           try {
  //             if (err) throw err
  
  //             studentPRs = JSON.parse(await fs.readFile(`./cases/${batch_name}/${folder}/${PR_TIME_PATH}`, 'utf-8'))
        
  //             // START CONSOLE LOGGING
  //             // let currentDir = cwd
              
  //             // can be made recursive
  //             // async function recursiveCheck(currentDir)

  //             async function recursiveCheck(currentDir, appendedContent){
  //               try {
  //                 let fsFiles = (await fs.readdir(currentDir)).filter(node => !IGNORED_NODES.includes(node) && node[0] !== '.')
  //                 fsFiles.forEach(async path => {
  //                   let rootPath = `${currentDir}/${path}`
  //                   const pathProps = await fs.lstat(rootPath)
  //                   if(pathProps.isDirectory()) {
  //                     appendedContent += await recursiveCheck(rootPath, appendedContent)
  //                   } else {
  //                     // if(rootPath.includes('.ejs')) console.log(`it's view file!`)
  //                     // else
  //                     if(rootPath.includes('.test.js')) console.log(`it's a test file!`)
  //                     else {
  //                       try {
  //                         appendedContent += await fs.readFile(rootPath, 'utf8')
  //                       } catch (error) {
  //                         console.log({
  //                           rootPath,
  //                           pathProps,
  //                           msgs: pathProps.isFile(),
  //                           branchName
  //                         })
  //                       }
  //                     }
  //                   }
  //                 })
  //               } catch (e) {
  //                 console.log(e)
  //               } finally {
  //                 return appendedContent
  //               }
  //             }

  //             // // 1. read directory, filtering ignored paths
  //             // let fsFiles = (await fs.readdir(cwd)).filter(node => !IGNORED_NODES.includes(node) && node[0] !== '.')
  //             // // 2. loop for each file
  //             // fsFiles.forEach(async path => {
  //             //   // a. append path to cwd
  //             //   let rootPath = `${cwd}/${path}`
  //             //   // b. await for fs.lstat() to get props
  //             //   //    - if it's a directory... then loop to step 1, with rootPath as cwd
  //             //   //    - else, append to a var
  //             //   const pathProps = await fs.lstat(rootPath)
  //             //   if(pathProps.isDirectory()) {
  //             //     const subdir = await fs.readdir(rootPath)
  //             //     subdir.forEach(async file => {
  //             //       try{
  //             //         let subpath = `${rootPath}/${file}`
  //             //         let fileProps = await fs.lstat(subpath)
  //             //         if(fileProps.isDirectory()) {
  //             //         console.log({ file, isDir: fileProps.isDirectory() })
  //             //         } else {
  //             //           let content = await fs.readFile(subpath, 'utf8')
  //             //           console.log({ subpath, content })
  //             //         }
  //             //       } catch (e) {
  //             //         console.log(e)
  //             //       }
  //             //     })
  //             //   } else {
  //             //     let content = await fs.readFile(rootPath, 'utf8')
  //             //     console.log({ path, content })
  //             //   }
  //             // })

  //             // console.log(cwd)

  //             console.log({
  //               result: await recursiveCheck(cwd, '')
  //             })
    
  //             resolve()
  //           } catch (e) {
  //             reject(e)
  //           }
  //         })

  //       // .then(() => resolve(fs.writeFile(`./cases/${batch_name}/${folder}/${PR_TIME_PATH}`, JSON.stringify(studentPRs, null, 2))))
  //       // .catch(reject)

  //         // END CONSOLE LOGGING
  
  //         // exec(`ls`, { cwd }, async (err, stdout) => {
  //         //   // console.log(stdout)
  //         //   if (err) return reject(err)
  
  //         //   if (modular) {
  //         //     let fileContent = ''
  //         //     let files = stdout.split('\n').slice(0, -1).filter(node => {
  //         //       if(node === 'node_modules') console.log(`NODE_MODULES DETECTED AT BRANCH ${branchName}`)
  //         //       return !IGNORED_NODES.includes(node) || !node.split('/').includes('node_modules')
  //         //     })

  //         //     console.log({ files, length: files.length })
  
  //         //     while (files.length) {
  //         //       if (!files[0]) {
  //         //         files = files.slice(1)
  //         //       } else if (files[0].includes('.test.js')) {
  //         //         files = files.slice(1)
  //         //       } else if (files[0].slice(-3) === '.js') {
  //         //         fileContent += `// ============ File Path ${folder}/${files[0]} ============\n`
  //         //         fileContent += await fs.readFile(`./${folder}/${files[0]}`, 'utf-8') + '\n'
  //         //         files = files.slice(1)
  //         //       } else if (files[0].split('/').includes('node_modules') || files[0].includes('.')) {
  //         //         files = files.slice(1)
  //         //       } else {
  //         //         try {
  //         //           await new Promise((resolve, reject) => {
  //         //             exec(`ls`, {
  //         //               cwd: `${cwd}/${files[0]}`
  //         //             }, (err, stdout) => {
  //         //               if (err) {
  //         //                 reject(err)
  //         //                 console.log(`${cwd}/${files[0]}`)
  //         //               } else {
  //         //                 stdout
  //         //                 .split('\n')
  //         //                 .slice(0, -1)
  //         //                 .forEach((file) => {
  //         //                   files.push(`${files[0]}/${file}`)
  //         //                 })
  //         //               }
    
  //         //               files = files.slice(1)
    
  //         //               resolve()
  //         //             })
  //         //           })
  //         //         } catch (error) {
  //         //           console.log(error)
  //         //           files = files.slice(1)
  //         //         }
  //         //       }
  //         //     }
              
  //         //     await fs.writeFile(`./cases/${batch_name}/${folder}/files/${branchName}.js`, fileContent)
              
  //         //     this.gitLog({ cwd, studentPRs, batch_name, branchName, folder, found: null, modular, resolve, reject })
  //         //   } else {
  //         //     let found = null
          
  //         //     const bestCases = [ source ] // change it to source
            
  //         //     const allData = stdout.split('\n')
            
  //         //     bestCaseLoop:
  //         //     for (let i = 0; i < bestCases.length; i++) {
  //         //       for (let j = 0; j < allData.length; j++) {
  //         //         if (allData[j].includes(bestCases[i])) {
  //         //           found = allData[j]
  //         //           break bestCaseLoop
  //         //         }
  //         //       }
  //         //     }
  
  //         //     if (!found) {
  //         //       const rawStudents = await fs.readFile(`./cases/${batch_name}/${folder}/${STUDENTS_PATH}`, 'utf-8')
  //         //       let students = JSON.parse(rawStudents)
  
  //         //       students = students.filter((student) => student !== branchName)
  
  //         //       await fs.writeFile(`./cases/${batch_name}/${folder}/${STUDENTS_PATH}`, JSON.stringify(students, null, 2))
  
  //         //       return resolve()
  //         //     }
  
  //         //     this.gitLog({ cwd, studentPRs, branchName, batch_name, folder, found, modular, resolve, reject })
  //         //   }
  //         // })
  //     } catch (err) {
  //       reject(err)
  //     }
  //   })
  // }

  // static gitLog({ cwd, studentPRs, batch_name, branchName, folder, found, modular, resolve, reject }) {
  //   return new Promise((resolve, reject) => {
  //     exec(`git log`, { cwd }, (error, stdout) => {
  //       if (error) return reject(error)

  //       let githubName = null
  
  //       const prTimes = stdout.split('\n').reduce((acc, curr) => {
  //         if (curr.includes('Date:')) {
  //           acc.push(curr)
  //         }
  //         if (!githubName && curr.includes('Author:')) {
  //           githubName = curr.split(' ')[1]
  //         }
  //         return acc
  //       }, [])
  
  //       studentPRs.push({
  //         name: branchName,
  //         prTimes,
  //         githubName 
  //       })
        
  //       if (branchName === 'main') { // edit here if you add new master
  //         branchName = 'master'
  //       }
  
  //       if (modular) {
  //         resolve()
  //       } else {
  //         exec(`cp ${found} ../cases/${batch_name}/${folder}/files/${branchName}.js`, {
  //           cwd
  //         }, (error) => {
  //           if (error) return reject(error)
    
  //           resolve()
  //         })
  //       }
  //     })
  //   })
  // }

  // static async deleteRepo({ name }) {
  //   await new Promise((resolve, reject) => {
  //     exec(`
  //       rm -rf ${name}
  //     `, (error) => {
  //       if (error) {
  //         return reject(error)
  //       }

  //       return resolve()
  //     })
  //   })
  // }
}


module.exports = GithubRepo