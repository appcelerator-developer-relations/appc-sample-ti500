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

})(this);
