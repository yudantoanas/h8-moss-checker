const ss = require('string-similarity')

class ComparerController {
  static findSimilarities = (results, conf) => Promise.all(results.map(async (firstResult, i) => {
    return await new Promise((resolve => {
      const fileResults = []
      results.forEach(async (secondResult, j) => {
        if(i > j){
          const baseRatio = 0.8
          const defaultRatio = conf.filterRatio || 0
					const ratioResult = ss.compareTwoStrings(firstResult.content, secondResult.content)
					const ratio = (ratio - baseRatio) / (1 - baseRatio) * 100 // will change to baseRatio
					
					// debug
					if(conf.debug){
						console.log(firstResult.name, secondResult.name, ratioResult, ratio)
					}

          if(ratio > defaultRatio) {
            let Student1, Student2, student1Flag = true, student2Flag = true
            for(let i = 0; i < conf.gitMetadata.length; i++){
              const meta = conf.gitMetadata[i]

              if(student1Flag && meta.branch === firstResult.name.split('.js')[0]){
                // debug
                conf.debug && console.log({
                  meta: meta.branch,
                  result1: firstResult.name.split('.js')[0],
                })
                
                Student1 = meta
                student1Flag = false
              } else if(student2Flag && meta.branch === secondResult.name.split('.js')[0]){
                // debug
                conf.debug && console.log({
                  meta: meta.branch,
                  result2: secondResult.name.split('.js')[0]
                })
                
                Student2 = meta
                student2Flag = false
              }
            }

            const result = { Student1, Student2, ratio: +ratio.toFixed(2) }

            fileResults.push(result)
          }
        }
      })
      resolve(fileResults)
    }))
  }))
}

module.exports = ComparerController