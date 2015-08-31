# Titanium 5.0 Sample App

## Installing Xcode 7 and Titanium 5 betas

* Install [latest Xcode 7 beta](https://developer.apple.com/xcode/downloads/).

* Install latest AppC betas via Studio:

	* Set *Preferences > Studio > Updates* to *Beta Release*.
	* Check for and install updates.

* **OR:** Install betas via AppC CLI:

		appc config set defaultEnvironment preproduction
		appc login
		appc use latest
		appc ti sdk install <url>

## Adding a Watch App to your Titanium App

	cd ~/your-ti-app
	appc new --type applewatch --template watchos2
	
## Launching a Titanium App with its Watch App

	appc run -p ios -I 9.0 --launch-watch-app
	
## Communicating between the Titanium and Watch App

### In the Watch App
There's only a few files of the generated template that I've touched for this sample:

* Open `extensions/<name>/<name>.xcodeproj` in Xcode 7+
* Find the Watch App storyboard under `<name>/<name> WatchApp/interface.storyboard`
	* See [Apple Watch Programming Guide / Watch Apps](https://developer.apple.com/library/prerelease/watchos/documentation/General/Conceptual/WatchKitProgrammingGuide/CreatingtheUserInterface.html#//apple_ref/doc/uid/TP40014969-CH4-SW1).
* Find the communication with the Titanium App under `<name>/<name> WatchApp Extension/InterfaceController.h` and `.m`.
	* See [Integrate a WatchKit App Built in Xcode](https://wiki.appcelerator.org/display/eng/Integrate+a+WatchKit+App+Built+in+Xcode) 
* I've put the image to send form the Watch to `extensions/<name>/<name> Extension/logo.png` and added it to the Xcode project by dragging it to `<name>/<name> Extension/Supporting Files`.

#### Starting the session

### In the Titanium App

In the Titanium app we'll use `Ti.WatchSession`.

## Links

* [Apple Watch Programming Guide](https://developer.apple.com/library/prerelease/watchos/documentation/General/Conceptual/WatchKitProgrammingGuide/index.html)
* [Apple Watch Human Interface Guidelines](https://developer.apple.com/watch/human-interface-guidelines/)

---------------------------------------

## ISSUES
* [CLI-789
Provide a easier way to install nightly/beta/RC CLI and SDK versions through CLI](https://jira.appcelerator.org/browse/CLI-789)
* [CLI-698
In preprod, you cannot install Titanium SDK from Appc CLI](https://jira.appcelerator.org/browse/CLI-698)
* [TIMOB-19412
WatchOS2 template should demonstrate use of WatchConnectivity](https://jira.appcelerator.org/browse/TIMOB-19412)
* [TIMOB-19423
Ti.WatchSession.recentAppContext not updated by what is received from watch](https://jira.appcelerator.org/browse/TIMOB-19423)
* [What does `Ti.WatchSession.activate()` do?](https://github.com/appcelerator/titanium_mobile/commit/2d570841ebfe41a2a4808cfb8a82cd9494c305bf#commitcomment-12943180)
* [TIMOB-19424
iOS: After a few builds, icons and launch images are missing](https://jira.appcelerator.org/browse/TIMOB-19424)
* [TIMOB-19425
Remove the need to call Ti.WatchSession.activate()](https://jira.appcelerator.org/browse/TIMOB-19425)
* [TIMOB-19427
Use name method/event names on Titanium and Watch side of session](https://jira.appcelerator.org/browse/TIMOB-19427)

## TODO
* Document code, also Watch part
* Test on device
* Add complication to Watch App sample and demo transferCurrentComplication() 
* Only include one app icon to generate others from
* Get my hands om some new/changed APIs list
	* https://wiki.appcelerator.org/display/eng/Integrate+a+WatchKit+App+Built+in+Xcode