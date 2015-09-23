# Titanium 5.0.0 Sample App

This sample app demonstrates as much of the new APIs introduced in Titanium 5.0. Since this release is a big one, we've created separate sample apps for:

* WatchOS 2 Connectivity: [WatchSession Sample App](https://github.com/appcelerator-developer-relations/appc-sample-watchos2)
* iOS App Search: [App Search Sample App](https://github.com/appcelerator-developer-relations/appc-sample-appsearch)
* iOS Handoff: [Handoff Sample App](https://github.com/appcelerator-developer-relations/appc-sample-handoff)

We're working on a sample to demonstrate [Windows Runtime Direct API Access](http://docs.appcelerator.com/platform/latest/#!/guide/Windows_Runtime_Direct_API_Access) as well as the [Hyperloop Module for iOS](http://labs.appcelerator.com/project/55f74a9f421c44837717716b/Hyperloop-Module) now available via Appcelerator Labs.

For a lists of all the changes see the [release notes](http://docs.appcelerator.com/platform/release-notes/?version=5.0.0.GA) and linked JIRA filters.

## iOS: Icons & Launch Images
To support [App Thinning](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AppThinning/AppThinning.html) we now generate [Asset Catalogs](https://developer.apple.com/library/ios/recipes/xcode_help-image_catalog-1.0/chapters/Recipe.html) for the app icons and launch images. In most cases you won't notice, but be aware that:

* You no longer need to have any `appicon*.png` files in `assets/iphone`. Just provide a 1024x1024 24-bit [DefaultIcon.png](DefaultIcon.png) in your project root and Titanium will generate the missing required sizes for you.
* The build will fail if your icons do not meet Apple requirements and you don't provide a valid `DefaultIcon.png`.
* You can no longer use launch images within the app itself [like this](http://www.tidev.io/2015/01/06/how-to-re-use-the-launch-image-in-the-app/).
* [Localized Splash Screens](http://docs.appcelerator.com/platform/latest/#!/guide/Icons_and_Splash_Screens-section-29004897_IconsandSplashScreens-LocalizedSplashScreens) still work, but App Thinning for these images will not because Launch Images do not support localized Asset Catalogs.

For more information: [iOS graphic asset requirements and options](http://docs.appcelerator.com/platform/latest/#!/guide/Icons_and_Splash_Screens-section-29004897_IconsandSplashScreens-iOSgraphicassetrequirementsandoptions)

## Attributed Strings
The [Attributed Strings](app/controllers/attributedstrings.xml) sample demonstrate the use of the new Alloy `<AttributedString>` proxy property. You can use this as a child element of `<Label>`, `<TextArea>` and `<TextField>`. As you can see the last one also supports `<AttributedHintText>`.

For iOS only we've added support for the attribute type [`ATTRIBUTE_LINE_BEAK`](http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI-property-ATTRIBUTE_LINE_BREAK). Use this with one of the `Ti.UI.ATTRIBUTE_LINE_BREAK_BY_*` constants as shown in the [TSS](app/styles/attributedstrings.tss) to determine how lines break.

## Alloy themes
Apart from `tiapp.xml` you can now theme [almost everything](https://jira.appcelerator.org/browse/ALOY-1307). We've added support for `i18n`, `lib` and `platform` folders. If you have a white-label app you can now easily brand strings, libraries and Android icons, splash screens and themes.

## Other noticeable changes
Not demonstrated in the sample, but definitely worth mentioning:

### Alloy CLI
Thanks to Kosuke Isobe Alloy now has some of the new commands Kosuke introduced in [alloy-smelter](https://www.npmjs.com/package/alloy-smelter):

	[appc] alloy copy <source> <destination>
		copy the controller, view, and style files from <source> to <destination>

	[appc] alloy move <source> <destination>
		move the controller, view, and style files from <source> to <destination>

	[appc] alloy remove <source>
		remove the controller, view, and style files at <source>

### Appcelerator CLI
Also new on the CLI front are two command for the Appcelerator CLI. The `info` commands combines the results from `appc ti info` with information about Appcelerator CLI Installer and Core Package. The other allows you to switch to another org without needing to logout and in again. Pass `--org-id <id>` if you know the ID. We're [working](https://jira.appcelerator.org/browse/TISTUD-7504) on making this easier in Studio as well.

	appc info
		Display development environment information
	appc switch org [options]
		switch logged in org

### Titanium CLI
If you clean a project in Studio or via CLI using `[appc] ti clean` it used to only clean the `build` folder, but now it also cleans the `Resources` folder if it's an Alloy project. Whenever you run into an issue, always first clean to rule out any bugs introduced by the incremental builds we use to speed up your development workflow.

-----------------

## Other APIs


### [Alloy](https://github.com/appcelerator/alloy/releases)

* Theme i18n, lib, vendor and platform folders
* User Alloy.CFG and Alloy.Globals in XML
* `<Alloy module="m" />`
* i18n for widgets
* Event listeners add/get/remove
* CommandBar
* Use `$.args` in custom queries
* ToolBar tag? (https://jira.appcelerator.org/browse/ALOY-1089)
* Selective compile (https://jira.appcelerator.org/browse/ALOY-1216)

### [Titanium](https://jira.appcelerator.org/issues/?filter=16923)

* `<navbar-hidden>` works again (CHECK IF DOCS ARE UP TO DATE!)
* Elevation https://jira.appcelerator.org/browse/TIMOB-17359
* IndicatorColor https://jira.appcelerator.org/browse/TIMOB-19026
* allowsBackgroundLocationUpdates https://jira.appcelerator.org/browse/TIMOB-19008

### Contacts

<p>Starting with iOS 9.0, to get the ID of a <code>Titanium.Contacts.Person</code> object use the <code>identifier</code> property. Prior to iOS 9.0, use the <code>id</code> property.</p>


<h4>Large Icon Support for Notifications</h4>

<p>This Release supports adding a large icon to be shown in the content area of a notificaiton.  Set the
<a href="http://docs.appcelerator.com/platform/latest/#!/api/Titanium.Android.Notification-property-largeIcon">largeIcon</a>
property of the Ti.Android.Notification object.</p>

<h4>Titanium Themes</h4>

<p>This Release introduces new predefined Titanium themes for Android to hide the action bar and optionally the status bar.</p>

<p>Set the <code>android:theme</code> attribute of the Android manifest <code>application</code> element or set a Window object's
<code>theme</code> property to one of the following new themes:</p>

<ul>
<li><code>Theme.AppCompat.NoTitleBar</code>: hides the action and title bar</li>
<li><code>Theme.AppCompat.NoTitleBar.Fullscreen</code>: Same as Theme.AppCompat.NoTitleBar with a fullscreen window (covers the status bar).</li>
</ul>

------------------

<table>
<tr><th>API</th><th>Type</th><th>Notes</th></tr>

  <tr><td>Titanium.Contacts.getGroupByIdentifier</td><td>method</td><td><p>Gets the group with the specified identifier. (New API, supported on iPhone and iPad.)</p></td></tr>

  <tr><td>Titanium.Contacts.getPersonByIdentifier</td><td>method</td><td><p>Gets the person with the specified identifier. (New API, supported on Android, iPhone and iPad.)</p></td></tr>

  <tr><td>Titanium.Contacts.Person.identifier</td><td>property</td><td><p>Identifier of the person. (New API, supported on iPhone and iPad.)</p></td></tr>

  <tr><td>Titanium.Geolocation.allowsBackgroundLocationUpdates</td><td>property</td><td><p>Determines if the app can do background location updates.
 (New API, supported on iPhone and iPad.)</p></td></tr>

  <tr><td>Titanium.Media.AudioPlayer.change</td><td>event</td><td><p>Fired when the state of the playback changes. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.Media.AudioPlayer.complete</td><td>event</td><td><p>Fired when the audio has finished playing. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.Media.AudioPlayer.error</td><td>event</td><td><p>Fired when there's an error. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.Media.Sound.change</td><td>event</td><td><p>Fired when the state of the playback changes. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.Media.Sound.complete</td><td>event</td><td><p>Fired when the audio has finished playing. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.Media.Sound.error</td><td>event</td><td><p>Fired when an error occurs while playing the audio. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.Media.VideoPlayer.complete</td><td>event</td><td><p>Fired when movie playback ends or a user exits playback. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.Media.VideoPlayer.error</td><td>event</td><td><p>Fired when movie playback encounters an error. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.Network.Cookie.maxAge</td><td>property</td><td><p>Sets the Max-Age attribute of a Cookie, in delta-seconds. (New API, supported on Android.)</p></td></tr>

  <tr><td>Titanium.UI.Clipboard</td><td>object</td><td><p>A module used for accessing clipboard data. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ListView.noresults</td><td>event</td><td><p>Fired when the search using either searchView or searchText has no results. (Added support for Android.)</p></td></tr>

  <tr><td>Titanium.UI.Picker.selectionOpens</td><td>property</td><td><p>Determines whether calling the method <code>setSelectedRow</code> opens when called
 (New API, supported on Android.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.canCancelEvents</td><td>property</td><td><p>Determines whether this scroll view can cancel subview touches in order to scroll instead. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.contentOffset</td><td>property</td><td><p>X and Y coordinates to which to reposition the top-left point of the scrollable region.
 (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.decelerationRate</td><td>property</td><td><p>The deceleration rate of the ScrollView. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.disableBounce</td><td>property</td><td><p>Determines whether scroll bounce of the scrollable region is enabled. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.horizontalBounce</td><td>property</td><td><p>Determines whether horizontal scroll bounce of the scrollable region is enabled. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.maxZoomScale</td><td>property</td><td><p>Maximum scaling factor of the scrollable region and its content. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.minZoomScale</td><td>property</td><td><p>Minimum scaling factor of the scrollable region and its content. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.overScrollMode</td><td>property</td><td><p>Determines the behavior when the user overscolls the view. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.scrollIndicatorStyle</td><td>property</td><td><p>Style of the scrollbar. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.scrollType</td><td>property</td><td><p>Limits the direction of the scrollable region, overriding the deduced setting. Set to 
<code>horizontal</code> or <code>vertical</code>.
 (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.scrollsToTop</td><td>property</td><td><p>Controls whether the scroll-to-top gesture is effective. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.setZoomScale</td><td>method</td><td><p>Sets the value of the Titanium.UI.ScrollView.zoomScale property. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.verticalBounce</td><td>property</td><td><p>Determines whether vertical scroll bounce of the scrollable region is enabled. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.ScrollView.zoomScale</td><td>property</td><td><p>Scaling factor of the scroll view's content. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.Switch.color</td><td>property</td><td><p>Color to use for switch text, as a color name or hex triplet. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.Switch.enabled</td><td>property</td><td><p>Determines whether the switch is enabled. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.Switch.titleOff</td><td>property</td><td><p>Text to display on the switch in its "off" state, when the toggle button style is in use. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.Switch.titleOn</td><td>property</td><td><p>Text to display on the switch in its "on" state, when the toggle button style is in use. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.TextArea.showUndoRedoActions</td><td>property</td><td><p>Determinates if the undo and redo buttons on the left side of the keyboard should be displayed or not. Only valid on iOS9 and above. (New API, supported on iPad.)</p></td></tr>

  <tr><td>Titanium.UI.TextField.showUndoRedoActions</td><td>property</td><td><p>Determinates if the undo and redo buttons on the left side of the keyboard should be displayed or not. Only valid on iOS9 and above. (New API, supported on iPad.)</p></td></tr>

  <tr><td>Titanium.UI.View.backgroundImage</td><td>property</td><td><p>Background image for the view, specified as a local file path or URL. (Added support for Windows Phone.)</p></td></tr>

  <tr><td>Titanium.UI.View.zIndex</td><td>property</td><td><p>Z-index stack order position, relative to other sibling views. (Added support for Windows Phone.)</p></td></tr>

<tr>
</table>