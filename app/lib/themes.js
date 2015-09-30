exports.createLabel = function(params) {
	params.text = 'Hello from: app/lib/themes.js';

	return Ti.UI.createLabel(params);
};