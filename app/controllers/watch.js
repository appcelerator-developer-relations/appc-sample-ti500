(function constructor(args) {

	setupListeners();

	updateProperties();

})(arguments[0] || {});

function setupListeners() {

	['watchSessionReceivedMessage', 'watchSessionReceivedUserInfo', 'watchSessionReceivedFile', 'watchSessionReceivedAppContext', 'watchStateChanged', 'watchReachabilityChanged', 'watchSessionFinishedFileTransfer', 'watchSessionFinishedUserInfoTransfer'].forEach(function(event) {

		Ti.WatchSession.addEventListener(event, function(e) {

			var eStr = JSON.stringify(e);

			console.info('[Ti.WatchSession:' + event + '] ' + eStr);

			if (event === 'watchSessionReceivedFile') {

				// var cacheFile = e.data.getFile();
				// var downloadedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cacheFile.getName());
				// downloadedFile.write(e.data);   
				// imageView.setImage(downloadedFile);

			} else if (event.indexOf('Changed') !== -1) {
				updateProperties();
			}

		});

	});
}

function updateProperties() {

	['isSupported', 'isPaired', 'isWatchAppInstalled', 'isComplicationEnabled', 'isReachable', 'recentAppContext'].forEach(function(property) {
		updateProperty(property);	
	});

}

function updateProperty(property) {
	
	if (_.isObject(property)) {
		property = property.source.text;
	}

	var valStr = JSON.stringify(Ti.WatchSession[property]);

	console.info('[updateProperty(' + property + ')] ' + valStr);

	updateText(property, valStr);
}

function updateText(id, text) {
	$[id].animate({
		opacity: 0
	}, function () {
		$[id].animate({
			text: text,
			opacity: 1
		});
	});
}