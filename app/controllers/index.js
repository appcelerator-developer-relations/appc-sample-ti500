// var log = require('log');

// var ACTIVITY_EVENTS = ['useractivitywascontinued', 'useractivitywillsave'];

// var activities = [];

(function constructor(args) {
	// var activity;

	// for (var i = 0, l = $.index.tabs.length; i < l; i++) {
	// 	activity = Ti.App.iOS.createUserActivity({
	// 		activityType: 'com.appcelerator.sample.ti500.tab.n' + i,
	// 		title: $.index.tabs[i].title,
	// 		userInfo: {
	// 			activeTab: i
	// 		},
	// 		eligibleForSearch: true,
	// 		eligibleForPublicIndexing: true,
	// 		eligibleForHandoff: true,
	// 		keyWords: [Ti.App.name, 'tabs'],
	// 		needsSave: false,
	// 		requiredUserInfoKeys: ['activeTab']
	// 	});

	// 	ACTIVITY_EVENTS.forEach(function (event) {
	// 		activity.addEventListener(event, function (e) {
	// 			log.args('Ti.App.iOS.UserActivity:' + e.type, e);
	// 		});
	// 	});

	// 	activities.push(activity);
	// }

	// Ti.App.iOS.addEventListener('continueactivity', function (e) {
	// 	log.args('Ti.App.iOS:continueactivity', e);

	// 	if (e.userInfo.activeTab !== undefined) {
	// 		$.index.activeTab = $.index.tabs[e.userInfo.activeTab];
	// 	}
	// });

	$.index.open();

})(arguments[0] || {});

// function onFocus(e) {
// 	activities[e.index].becomeCurrent();
// 	activities[e.index].needsSave = true;
// }
