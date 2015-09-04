var log = require('log');

/**
 * Self-executing function containing all code that is executed when an instance
 * of this controller is created, apart from dependencies and variables declared
 * above. Just for readability, much like a class constructor.
 */
(function constructor(args) {

	// Show logs from before this controller was created
	showHistory();

	// Fired in alloy.js when new logs are added
	log.on('change', showHistory);

})(arguments[0] || {});

/**
 * Shows the logs collected in a global var by alloy.js
 */
function showHistory() {
	$.log.value = log.history;
}

function clearHistory() {
	log.history = '';

	showHistory();
}
