var log = require('log');
var moment = require('alloy/moment');

var activity;

(function constructor(args) {

	createUserActivity();

	Ti.App.iOS.addEventListener('continueactivity', function (e) {
		log.args('Ti.App.iOS:continueactivity', e);
	});

})(arguments[0] || {});

function createUserActivity() {

	if (activity) {

		activity.removeEventListener('useractivitywillsave', onUseractivitywillsave);
		activity.removeEventListener('useractivitywascontinued', onUseractivitywascontinued);

		activity.invalidate();

		activity = null;
	}

	activity = Ti.App.iOS.createUserActivity({
		activityType: 'com.appcelerator.sample.ti500.foo',
		title: 'Writing a message',
		userInfo: {
			message: $.message.value
		},
		eligibleForHandoff: $.eligibleForHandoff.value,
		eligibleForPublicIndexing: $.eligibleForPublicIndexing.value,
		eligibleForSearch: $.eligibleForSearch.value,
		expirationDate: moment().add(3, 'minutes').format("yyyy-MM-dd'T'HH:mm:ss.SSS'+0000"),
		keywords: ['message'],
		needsSave: $.needsSave.value,
		requiredUserInfoKeys: ['message'],
		webpageURL: 'http://googl.com/#q=message'
	});

	// activity.addContentAttributeSet();

	if (!activity.supported) {
		return log.args('activity.supported', activity.supported);
	}

	// make current when our tab has focus

	activity.addEventListener('useractivitywillsave', onUseractivitywillsave);
	activity.addEventListener('useractivitywascontinued', onUseractivitywascontinued);
}

function onUseractivitywillsave(e) {
	log.args('Ti.App.iOS.UserActivity:useractivitywillsave', e);

	activity.userInfo = {
		message: $.mes
	};
}

function onUseractivitywascontinued(e) {
	log.args('Ti.App.iOS.UserActivity:useractivitywascontinued', e);

	// disable textarea?
}

function toggleCurrent(e) {

	// if (e.source.title === 'Become') {
	// 	activity.becomeCurrent();

	// 	e.source.title = 'Resign';
	// } else {
	// 	activity.resignCurrent();

	// 	e.source.title = 'Become';
	// }
}

function toggleSwitch(e) {
	var id = e.source.text;

	$[id].value = !!$[id].value;
}

function onTextAreaFocus(e) {
	console.log('focus');

	activity.becomeCurrent();
}

function onTextAreaBlur(e) {
	console.log('blur');

	activity.invalidate();
}

function onTextAreaChange(e) {
	activity.needsSave = true;
}
