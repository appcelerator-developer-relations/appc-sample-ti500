/**
 * Called via the view to demonstrate the new Titanium Android themes
 */
function openWindowWithTheme(e) {

	// The button's title is our theme name
	var theme = e.source.title;

	Alloy.createController('theme', {

		// Ugly but effective hack into Alloy's data binding to use arguments in the view
		// See the theme-view where {theme} makes Alloy expect the following argument:
		$model: {
			__transform: {
				theme: e.source.title
			}
		}

	}).getView().open();
}

function onSliderChange(e) {
	$.elvView.elevation = e.value;
}

function notify(e) {

	// You could hard-code the activity name found in build/android/Manifest.xml - but I don't
	// From: https://github.com/appcelerator/titanium_mobile/blob/290969563132b3fe51c479267541bacdfe9b9844/android/cli/commands/_build.js#L1733-L1736
	var activityName = Ti.App.name.split(/[^A-Za-z0-9_]/).map(function (word) {
		return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
	}).join('');
	/^[0-9]/.test(activityName) && (activityName = '_' + activityName);

	// Create an intent to open ourselves
	var intent = Ti.Android.createIntent({
		action: Ti.Android.ACTION_MAIN,
		className: Ti.App.id + '.' + activityName + 'Activity',
		packageName: Ti.App.id
	});
	intent.flags |= Ti.Android.FLAG_ACTIVITY_CLEAR_TOP | Ti.Android.FLAG_ACTIVITY_NEW_TASK;
	intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);

	// Create and show a notification
	Ti.Android.NotificationManager.notify(1, Titanium.Android.createNotification({
		contentTitle: 'Something Happened',
		contentText: 'Click to return to the application.',
		contentIntent: Titanium.Android.createPendingIntent({
			intent: intent,
			flags: Titanium.Android.FLAG_UPDATE_CURRENT
		}),

		// Use system rewind icon as default icon and fastforward as largeIcon
		icon: Ti.Android.R.drawable.ic_media_rew,
		largeIcon: Ti.Android.R.drawable.ic_media_ff

	}));
}

function setSelectedRow() {
	$.picker.setSelectedRow(0, 2);
}

function closeWindow(e) {
	$.win.close();
}