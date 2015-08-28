(function constructor(args) {

	setupListeners();

	updateProperties();

})(arguments[0] || {});

function setupListeners() {

	['watchSessionReceivedMessage', 'watchSessionReceivedUserInfo', 'watchSessionReceivedFile', 'watchSessionReceivedAppContext', 'watchStateChanged', 'watchReachabilityChanged', 'watchSessionFinishedFileTransfer', 'watchSessionFinishedUserInfoTransfer'].forEach(function (event) {

		Ti.WatchSession.addEventListener(event, function (e) {

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

	['isSupported', 'isPaired', 'isWatchAppInstalled', 'isComplicationEnabled', 'isReachable', 'recentAppContext'].forEach(function (property) {
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
		$[id].text = text;

		$[id].animate({
			opacity: 1
		});
	});
}

function cancelAllTransfers(e) {
	Ti.WatchSession.cancelAllTransfers();
}

function cancelAllFileTransfers(e) {
	Ti.WatchSession.cancelAllFileTransfers();
}

function cancelAllUserInfoTransfers(e) {
	Ti.WatchSession.cancelAllUserInfoTransfers();
}

function sendMessage(e) {
	Ti.WatchSession.sendMessage({
		message: {
			message: 'Hi',
			from: 'app',
			type: 'message'
		}
	});
}

function transferFile(e) {
	Ti.WatchSession.transferFile({
		fileURL: '/images/logo.png',
		metaData: {
			data: 'appcelerator logo'
		}
	});
}

function transferCurrentComplication(e) {
	Ti.WatchSession.transferCurrentComplication({
		// ?
	});
}

function transferUserInfo(e) {
	Ti.WatchSession.transferUserInfo({
		userInfo: {
			data: 'user info from app',
			created: '2015'
		}
	});
}

function updateAppContext(e) {
	//only the latest appContext is registered. Send 2 to test.
	Ti.WatchSession.updateAppContext({
		appContext: {
			status: 'AppContext from app',
			updates: 2
		}
	});

}
