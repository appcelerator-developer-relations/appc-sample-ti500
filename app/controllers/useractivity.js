var log = require('log');
var moment = require('alloy/moment');

var activity;

var ACTIVITY_EVENTS = ['useractivitywascontinued', 'useractivitywillsave'];

(function constructor(args) {

	createUserActivity();

	// Ti.App.iOS.addEventListener('continueactivity', function (e) {
	// 	log.args('Ti.App.iOS:continueactivity', e);
	// });

})(arguments[0] || {});

function createUserActivity() {

	if (activity) {

		ACTIVITY_EVENTS.forEach(function (event) {
			activity.removeEventListener(event, logActivityEvent);
		});

		activity.invalidate();

		activity = null;
	}

	activity = Ti.App.iOS.createUserActivity({
		activityType: 'com.appcelerator.sample.ti500.foo',
		title: 'Doing Foo',
		userInfo: {
			foo: 'bar'
		},
		eligibleForHandoff: $.eligibleForHandoff.value,
		eligibleForPublicIndexing: $.eligibleForPublicIndexing.value,
		eligibleForSearch: $.eligibleForSearch.value,
		expirationDate: moment().add(3, 'minutes').format("yyyy-MM-dd'T'HH:mm:ss.SSS'+0000"),
		keywords: ['foo'],
		needsSave: $.needsSave.value,
		requiredUserInfoKeys: ['foo'],
		webpageURL: 'http://googl.com/#q=foo'
	});

	// activity.addContentAttributeSet();

	if (!activity.supported) {
		alert('activity not supported');
		return;
	}

	ACTIVITY_EVENTS.forEach(function (event) {
		activity.addEventListener(event, logActivityEvent);
	});
}

function toggleCurrent(e) {

	if (e.source.title === 'Become') {
		activity.becomeCurrent();

		e.source.title = 'Resign';
	} else {
		activity.resignCurrent();

		e.source.title = 'Become';
	}
}

function toggleSwitch(e) {
	var id = e.source.text;

	$[id].value = !!$[id].value;
}

function logActivityEvent(e) {
	log.args('Ti.App.iOS.UserActivity:' + e.type, e);
}
