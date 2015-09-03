var log = require('log');
var moment = require('alloy/moment');

var activity;
var firstBecomeCurrent = false;

(function constructor(args) {

	Ti.App.iOS.addEventListener('continueactivity', function (e) {
		log.argsSilent('Ti.App.iOS:continueactivity', e);

		updateStatus('the continueactivity event was fired after continuing an activity from search or another device. The message should be updated with that of the search index or other device. (see logs for details)');

		$.message.value = e.userInfo.message;
	});

})(arguments[0] || {});

function createUserActivity() {

	var parameters = {

		// The value needs to be defined in tiapp.xml
		activityType: 'com.appcelerator.sample.ti500.message',

		title: 'Writing a message',

		keywords: ['foo'],

		userInfo: {
			message: $.message.value
		},

		eligibleForHandoff: $.eligibleForHandoff.value,
		eligibleForPublicIndexing: $.eligibleForPublicIndexing.value,
		eligibleForSearch: $.eligibleForSearch.value,

		// Try searching both soon after you focus on this tab and then about 5
		// minutes later again. The second time you should not find it.
		expirationDate: moment().add(3, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'),

		// regardless of the setting, the first call to becomeCurrent() will
		// always trigger the useractivitywillsave event
		needsSave: $.needsSave.value,

		requiredUserInfoKeys: ['message'],
		webpageURL: 'http://googl.com/#q=message'
	};

	activity = Ti.App.iOS.createUserActivity(parameters);

	activity.addContentAttributeSet(Ti.App.iOS.createSearchableItemAttributeSet({
		itemContentType: Ti.App.iOS.UTTYPE_IMAGE,
		contentDescription: $.message.value
	}));

	log.argsSilent('Ti.App.iOS.createUserActivity()', parameters);

	activity.addEventListener('useractivitywillsave', onUseractivitywillsave);
	activity.addEventListener('useractivitywascontinued', onUseractivitywascontinued);

	if (activity.supported) {
		activity.becomeCurrent();
	} else {
		log.args('Did not call becomeCurrent() because activity.supported is:', activity.supported);
	}
}

function destroyUserActivity() {
	activity.removeEventListener('useractivitywillsave', onUseractivitywillsave);
	activity.removeEventListener('useractivitywascontinued', onUseractivitywascontinued);

	activity.invalidate();

	activity = null;
	firstBecomeCurrent = true;

	log.argsSilent('Ti.App.iOS.UserActivity.invalidate()');
}

function onUseractivitywillsave(e) {
	log.argsSilent('Ti.App.iOS.UserActivity:useractivitywillsave', e);

	if (firstBecomeCurrent) {
		firstBecomeCurrent = false;

		updateStatus('the useractivitywillsave event was fired after becomeCurrent(). (see logs for details)');

	} else {
		updateStatus('the useractivitywillsave event was fired after setting needsSave to true. (see logs for details)');
	}

	activity.userInfo = {
		message: $.message.value
	};

	log.argsSilent('Updated activity.userInfo.message:', activity.userInfo.message);
}

function onUseractivitywascontinued(e) {
	log.argsSilent('Ti.App.iOS.UserActivity:useractivitywascontinued', e);

	updateStatus('the useractivitywascontinued event was fired after continuing this activity on another device. The message on the other device should now be what you had up here. (see logs for details)');
}

function onTabFocus(e) {

	if (!activity) {
		createUserActivity();
	}
}

function onTabBlur(e) {

	// The blur event is also fired when another window or alert opens over the
	// TabGroup, so we check if the tab indeed is not active anymore.
	if (!$.tab.active) {
		destroyUserActivity();
	}
}

function onTextAreaChange(e) {

	// Every (appropriate) time you set this to true the activity will receive
	// the useractivitywillsave event where you can then update the activity so
	// that when handed off, the other devices has the most recent information.
	activity.needsSave = $.needsSave.value;
}

function onTextAreaBlur(e) {
	log.argsSilent('blur ' + e.message);
}

function toggleSwitch(e) {
	var id = e.source.text;

	$[id].value = !$[id].value;
}

function onSwitchChange(e) {

	// The settings cannot be changed after creation so we need to recreate it
	destroyUserActivity();
	createUserActivity();
}

function updateStatus(text) {
	$.status.text = 'At ' + moment().format('HH:mm:ss.SS') + ' ' + text;
}
