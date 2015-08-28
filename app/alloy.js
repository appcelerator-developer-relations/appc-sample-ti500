/* global Alloy, ENV_PROD */

// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

/**
 * Always wrap code in alloy.js in a self-executing function or any variable
 * you define here will polute the global scope. If you really want to make
 * a variable global set it as a property of global, which is a reference to
 * "this", which is the (global) scope of this CommonJS module.
 */
(function(global) {

  // Create a global JS-only event dispatcher by extending Backbone's Events
  // as a better alternative for Ti.App.fireEvent which crosses the bridge.
  Alloy.Events = _.extend({}, Backbone.Events);

  /**
   * Global function to format logs, emit an event and log it to the console.
   *
   * Takes any number of and type of arguments.
   */
  global.log = function log() {

  	// Turn arguments into a true array and stringify non-strings
  	var args = Array.prototype.slice.call(arguments).map(function (arg) {
  		return (typeof arg === 'string') ? arg : JSON.stringify(arg, null, 2);
  	});

  	var message = args.join(' ');

  	// Use error-level for production or they will not show in Xcode console
  	console[ENV_PROD ? 'error' : 'info'](message);

    // Return formatted message
    return message;
  };

})(this);
