var log = require('log');

/**
 * I wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {

	// Show logs from before this controller was created
	showLogs();

	// Listen to changes to the logs
	log.on('change', showLogs);

})(arguments[0] || {});

function showLogs() {
	$.log.value = log.history;
}

function clearLogs() {
	log.history = '';

	showLogs();
}
