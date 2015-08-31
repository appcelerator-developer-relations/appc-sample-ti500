var timerId, isOpen = false;

$.close = close;

(function constructor(args) {

	$.message.text = args.message;

	if (args.image) {
		$.image.image = args.image;

		$.imageWrap.show();

	} else {
		$.wrap.remove($.imageWrap);
	}

	$.win.open();

	isOpen = true;

	// Hide after 5 seconds
	timerId = setTimeout(close, 5000);

})(arguments[0] || {});

function close() {

	// When cancelled manually, clear timer set to hide it autmatically
	if (timerId) {
		clearTimeout(timerId);

		timerId = null;
	}

	$.win.close();

	isOpen = false;
}
