/* global log */

var timerId;

(function constructor(args) {

	// Required to be able to receive events from the watch
	// The session will also automatically activate when you
	// call methods or properties on Ti.WatchSession (except for addEventListener that is)
	Ti.WatchSession.activate();

	setupListeners();

	showProperties();

})(arguments[0] || {});

function setupListeners() {

	['watchSessionReceivedMessage', 'watchSessionReceivedUserInfo', 'watchSessionReceivedFile', 'watchSessionReceivedAppContext', 'watchStateChanged', 'watchReachabilityChanged', 'watchSessionFinishedFileTransfer', 'watchSessionFinishedUserInfoTransfer'].forEach(function (event) {

		Ti.WatchSession.addEventListener(event, function (e) {

			logEvent(e);

			if (event.indexOf('Changed') !== -1) {
				showProperties();
			}

		});

	});
}

function showProperties() {

	['isSupported', 'isPaired', 'isWatchAppInstalled', 'isComplicationEnabled', 'isReachable', 'recentAppContext'].forEach(function (property) {
		showProperty(property);
	});

}

function showProperty(property) {

	if (_.isObject(property)) {
		property = property.source.text;
	}

	var valStr = JSON.stringify(Ti.WatchSession[property]);

	log('Ti.WatchSession.' + property, valStr);

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

function updateAppContext(e) {

	/**
	 * Sends an app context update to the apple watch. If watchapp is in
	 * background during transfer, watchapp's delegate will receive the app
	 * context immediately when it becomes active. Only 1 app context is
	 * stored at any one time, subsequent updates will simply replace the
	 * earlier one sent.
	 */
	Ti.WatchSession.updateAppContext(createSamplePayload());

	// Ti.WatchSession.recentAppContext should now have the last sent context
	showProperty('recentAppContext');
}

function logEvent(e) {

	// If previous still shows, hide it here
	hideLog();

	$.logText.text = log('Ti.WatchSession:' + e.type, e);

	if (e.type === 'watchSessionReceivedFile') {
		$.logImage.image = e.data;

		$.logImageWrap.show();

	} else {
		$.logImageWrap.hide();
	}

	// Scroll content back to top if it's not
	$.logWrap.contentOffset = {
		x: 0,
		y: 0
	};

	// Fade in
	$.logWrap.animate({
		opacity: 1
	});

	// Hide after 5 seconds
	timerId = setTimeout(hideLog, 5000);
}

function hideLog() {

	// When cancelled manually, clear timer set to hide it autmatically
	timerId && clearTimeout(timerId);

	// Fade out
	$.logWrap.animate({
		opacity: 0
	});
}

function createSamplePayload() {
	return {
		foo: 'bar',
		time: (new Date()).toString()
	};
}
