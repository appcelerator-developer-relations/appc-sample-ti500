var log = require('log');

var activities = [];

(function constructor(args) {

	for (var i = 0, l = $.index.tabs.length; i < l; i++) {
		activities.push(Ti.App.iOS.createUserActivity({
			activityType: 'com.appcelerator.sample.ti500.tab.n' + i,
			title: $.index.tabs[i].title,
			userInfo: {
				activeTab: i
			},
			eligibleForSearch: true,
			eligibleForPublicIndexing: true,
			eligibleForHandoff: true,
			keyWords: [Ti.App.name, 'tabs'],
			needsSave: false,
			requiredUserInfoKeys: ['activeTab']
		}));
	}

	Ti.App.iOS.addEventListener('continueactivity', function (e) {
		log.args('Ti.App.iOS:continueactivity', e);

		if (e.userInfo.activeTab !== undefined) {
			$.index.activeTab = $.index.tabs[e.userInfo.activeTab];
		}
	});

	$.index.open();

})(arguments[0] || {});

function onFocus(e) {
	activities[e.index].becomeCurrent();
}
