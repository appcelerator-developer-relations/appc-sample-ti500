var log = require('log');

(function constructor(args) {

	// Required to be able to receive events from the watch
	// The session will also automatically activate when you
	// call methods or properties on Ti.WatchSession (except for addEventListener that is)
	Ti.WatchSession.activateSession();

	setupListeners();

	showProperties();

})(arguments[0] || {});

function setupListeners() {

	['receivemessage', 'receiveuserinfo', 'receivefile', 'receiveapplicationcontext', 'watchstatechanged', 'reachabilitychanged', 'finishfiletransfer', 'finishuserinfotransfer'].forEach(function (event) {

		Ti.WatchSession.addEventListener(event, function (e) {

			if (e.type === 'receivefile') {
				log.argsWithImage('Ti.WatchSession:' + e.type, e, e.data);

			} else {

				log.args('Ti.WatchSession:' + e.type, e);

				if (event.indexOf('Changed') !== -1) {
					showProperties();
				}
			}

		});

	});
}

function showProperties() {

	['isSupported', 'isPaired', 'isWatchAppInstalled', 'isComplicationEnabled', 'isReachable', 'recentApplicationContext'].forEach(function (property) {
		showProperty(property);
	});

}

function showProperty(property) {

	if (_.isObject(property)) {
		property = property.source.text;
	}

	var valStr = JSON.stringify(Ti.WatchSession[property]);

	log.argsSilent('Ti.WatchSession.' + property, valStr);

	updateText(property, valStr);
}

function updateText(id, text) {

	$[id].animate({
		opacity: 0

	}, function () {
		$[id].text = text;

		$[id].animate({
			opacity: 1
		});
	});
}

/**
 * The cancel*() methods are difficult to demonstrate since it will only cancel
 * if you transfer lots of data, the iPhone can't connect to the Watch or for
 * some other reason the transfer is still pending.
 */

function cancelAllFileTransfers() {
	Ti.WatchSession.cancelAllFileTransfers();
}

function cancelAllTransfers() {
	Ti.WatchSession.cancelAllTransfers();
}

function cancelAllUserInfoTransfers() {
	Ti.WatchSession.cancelAllUserInfoTransfers();
}

function sendMessage(e) {
	Ti.WatchSession.sendMessage(createSamplePayload());
}

function transferFile(e) {
	Ti.WatchSession.transferFile({
		fileURL: '/images/logo.png',
		metaData: createSamplePayload()
	});
}

function transferCurrentComplication(e) {
	Ti.WatchSession.transferCurrentComplication(createSamplePayload());
}

function transferUserInfo(e) {

	/**
	 * Transfers an user info object to the installed watchapp on the apple
	 * watch in the background. Subsequent transfers are queued.
	 */
	Ti.WatchSession.transferUserInfo(createSamplePayload());
}

function updateApplicationContext(e) {

	/**
	 * Sends an app context update to the apple watch. If watchapp is in
	 * background during transfer, watchapp's delegate will receive the app
	 * context immediately when it becomes active. Only 1 app context is
	 * stored at any one time, subsequent updates will simply replace the
	 * earlier one sent.
	 */
	Ti.WatchSession.updateApplicationContext(createSamplePayload());

	// Ti.WatchSession.recentAppContext should now have the last sent context
	showProperty('recentApplicationContext');
}

function createSamplePayload() {
	return {
		foo: 'bar',
		time: (new Date()).toString()
	};
}
