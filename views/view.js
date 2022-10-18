'use strict'

class View {
  static showError(err) {
    console.log('Error:\n===============')
    console.log(err)
  }

  static showSuccess(message) {
    console.log('Success:\n===============')
    console.log(message)
  }

  static showHelp(){
    console.log('Code Similarity Checker')
    console.log('Version 2.0')
    console.log('')
    console.log('Usage')
    console.log('')
    // check
    console.log('check repo-name <repo> [no-moss]')
    console.log('\tValidates repository of a set organization,')
    console.log('\tand checks for similarity for each branch(es).')
    console.log('\tSubmits 2 files to Moss by default, for second opinion.')
    console.log('\t- repo-name <repo>\tspecifies repository name')
    console.log('\t- [no-moss]\t\tdisables Moss checking')
    console.log('\t- [min-ratio] <0-100>\tfilters normalized ratio')
    console.log('')
  }
}

module.exports = View