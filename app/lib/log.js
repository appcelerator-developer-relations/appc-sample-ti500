/* global ENV_PROD */

var moment = require('alloy/moment');

var notification;

var Log = module.exports = _.extend({}, Backbone.Events);

/**
 * Global function to format logs, emit an event and log it to the console.
 *
 * Takes any number of and type of arguments.
 */

Log.history = '';

Log.args = function () {
	log(Array.prototype.slice.call(arguments));
};

Log.argsWithImage = function () {
	var args = Array.prototype.slice.call(arguments);
	var image = args.pop();

	log(args, image);
};

function log(args, image) {

	// Stringify non-strings
	args = args.map(function (arg) {
		return (typeof arg === 'string') ? arg : JSON.stringify(arg, null, 2);
	});

	var message = args.join(' ');

	// Use error-level for production or they will not show in Xcode console
	console[ENV_PROD ? 'error' : 'info'](message);

	notification && notification.close();

	notification = Alloy.createController('notification', {
		message: message,
		image: image
	});

	// Add the message to a global variable for controllers/console.js to use
	Log.history = (Log.history || '') + '[' + moment().format('HH:mm:ss.S') + '] ' + message + '\n\n';

	// Trigger an event for controllers/console.js to listen to and display the log
	Log.trigger('change');
}
