# WatchSession

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

#### Changing Watch App name
Via Xcode under `<name>` > Targets > `<name> WatchApp` > General > Identity > Display Name

## Links

* [Apple Watch Programming Guide](https://developer.apple.com/library/prerelease/watchos/documentation/General/Conceptual/WatchKitProgrammingGuide/index.html)
* [Apple Watch Human Interface Guidelines](https://developer.apple.com/watch/human-interface-guidelines/)

##### Running on device

You need Watch provisioning profiles set in tiapp.xml and the device should run iOS 9 or you can change `<min-ios-ver>` to your device's version but you might not be able to use all. Just use the same wildcard pp-uuid you use for the Titanium app

---------------------------------------

## ISSUES
* [TIMOB-19412
WatchOS2 template should demonstrate use of WatchConnectivity](https://jira.appcelerator.org/browse/TIMOB-19412)
* [TIMOB-19424
iOS: After a few builds, icons and launch images are missing](https://jira.appcelerator.org/browse/TIMOB-19424)
* [TIMOB-19425
Remove the need to call Ti.WatchSession.activate()](https://jira.appcelerator.org/browse/TIMOB-19425)

## TODO
* Document code, also Watch part
* Test on device
* Add complication to Watch App sample and demo transferCurrentComplication() 
* Check what to do with glances (is now empty)
* Only include one app icon to generate others from
* Get my hands om some new/changed APIs list
	* https://wiki.appcelerator.org/display/eng/Integrate+a+WatchKit+App+Built+in+Xcode
	* https://api.flowdock.com/files/52195/oBwM5FJibyY9hEedP7Rbhg/changes_4_2_0.html