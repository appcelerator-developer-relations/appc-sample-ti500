function onListViewItemclick(e) {
	var controllerName = e.itemId;

	$.tab.open(Alloy.createController(controllerName).getView());
}