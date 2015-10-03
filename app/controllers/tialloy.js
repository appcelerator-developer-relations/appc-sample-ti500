var log = require('log');

/**
 * I wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {

	// Add another event listener to the first button
	// $.addListener($.firstButton, 'longpress', myListener);

	// Log all listeners added via XML and $.addListener()
	log.args('$.getListener()', $.getListener());

})(arguments[0] || {});

function onWindowClose(e) {
	log.args('onWindowClose: Removing all event listeners added via XML or $.addListener().');

	$.removeListener();
}

function myListener(e) {
	alert('Hello from: myListener() via ' + e.type);
}

function removeMyListener(e) {
	$.removeListener($.firstButton);

	Ti.UI.createAlertDialog({
		title: 'Removed all listeners to any events of the first button',
		message: 'Try all three events of the first button again.'
	}).show();
}

function closeWindow() {
	$.win.close();
}