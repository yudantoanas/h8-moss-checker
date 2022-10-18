const View = require('../views/view')

class CommandController {
	static showHelp(){
		return View.showHelp()
	}
}

module.exports = CommandController