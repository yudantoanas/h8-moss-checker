// const GithubRepo = require('../models/githubrepo')
const { execSync } = require('child_process')
const { writeFileSync } = require('fs')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

class MossController {
  static async generateMossResults(results, config){
    let caseCount = 0
    let counter = 1
  
    let mossCmd

    results.forEach(result => caseCount += result.studentCases.length)

    console.log()
    console.log(`Asking Moss for a second opinion...`)

    try{
      let args = `-l javascript ./${config.path.outputPath}/*.js`
  
      if(process.platform === 'win32') mossCmd = `bash -c "./moss ${args}"`
      else mossCmd = `./moss ${args}`
      console.log(`Sending data to Moss server...`)
    
      const { stdout, stderr } = await exec(mossCmd)
      if(stderr) throw stderr
      console.log(stdout.split('\n'), "========================");
      return stdout.split('\n').splice(-2, 1)[0]
    }catch(e){
      throw e
    }

    // console.log({
    //   caseCount,
    //   results
    // });

    // return {
    //   results: await Promise.all(results.map(async result => {
    //     try{
    //       let baseStudentPath = `./${config.path.outputPath}/${result.student.branch}.js`
  
    //       let mossCmd
  
    //       result.studentCases = await Promise.all(result.studentCases.map(async studentCase => {
    //         const { with: relatingStudent } = studentCase
  
    //         let studentCount = counter++
    //         let relatingStudentPath = `./${config.path.outputPath}/${relatingStudent.branch}.js`
    //         let args = `-l javascript ${baseStudentPath} ${relatingStudentPath}`
  
    //         if(process.platform === 'win32') mossCmd = `bash -c "./moss ${args}"`
    //         else mossCmd = `./moss ${args}`
            
    //         try {
    //           console.log(`Sending case #${studentCount} to Moss server...`)
    //           console.log(`Case #${studentCount}: ${result.student.branch} x ${relatingStudent.branch}`);
    
    //           const { stdout, stderr } = await exec(mossCmd)
  
    //           if(stdout){
    //             const mossOutput = stdout.split('\n')
    //             const url = mossOutput[mossOutput.length - 2]
  
    //             config.debug && console.log(mossOutput)
  
    //             console.log(`Generated case #${studentCount}`)
    //             console.log(`URL: ${url}`)
  
    //             studentCase.mossUrl = url
    //           } else throw new Error(stderr)
    //         } catch (e) {
    //           console.log(e)
    //         } finally {
    //           return studentCase
    //         }
    //       }))
  
    //       return result
    //     } catch(e) {
    //       console.error(e)
    //     }
    //   })),
    //   config
    // }
	}

  // static saveResults(results, config){
  //   return new Promise(success => {
  //     writeFileSync(`${config.path.resultPath}`, JSON.stringify(results, null, 2))
      
  //     success(`Results has been updated with Moss URLs successfully! Head over to ${config.path.resultPath} to see the updated results!`)
  //   })
  // }
	
  // static async resubmitNulls(){
  //   console.time('Completed! Time needed for completion was')
  //   let conf = {}
    
  //   GithubRepo.getConfig()
  //   .then(config => {
  //     Object.assign(conf, { ...config })
  //     return GithubRepo.getPhaseRepos(conf)
  //   })
  //   .then(phaseRepos => {
  //     conf.phaseRepos = JSON.parse(phaseRepos)[`w${conf.week}d${conf.day}`][0]
  //     conf.basePath = {
  //       merged: `results/${conf.batch_name}/merged/${conf.repo.name}.json`,
  //     }

  //     if(fsSync.existsSync(conf.basePath.merged)) {
  //       console.log(`Found results! Finding null MOSS results...`)
  //       const results = JSON.parse(fsSync.readFileSync(`${conf.basePath.merged}`, 'utf-8'))
  //       const resultsWithNullURLs = results.filter(result => {})
        
  //       console.log(`Merging and writing to a new file...`)

  //       if(!fsSync.existsSync(`results/${conf.batch_name}/merged`))
  //         fsSync.mkdirSync(`results/${conf.batch_name}/merged`)

  //       fsSync.writeFileSync(`results/${conf.batch_name}/merged/${conf.repo.name}.json`, JSON.stringify(mergedResults, null, 2))
  //       console.log(`Mergine complete! Head onto results/merged/${conf.repo.name}.json to view the results!`)
  //     } else {
  //       console.log(`There are no MOSS results. Skipping...`)
  //     }

  //     return
  //   })
  //   .then(() => {
  //     console.timeEnd('Completed! Time needed for completion was')
  //   })
  // }
}

module.exports = MossController
