# Titanium 5.0 Sample App

## NOTES
* You should not need to switch to preproduction but have an option for `appc use` to select RC/beta/nightly stream. [CLI-789](https://jira.appcelerator.org/browse/CLI-789)
* `appc setup` failed to get SDK. Should work as above. [CLI-698](https://jira.appcelerator.org/browse/CLI-698)
* WatchApp template should include sample code to connect to Titanium app. [TIMOB-19412](https://jira.appcelerator.org/browse/TIMOB-19412)
* Why is `isWatchAppInstalled` false when the app is there, can communicate and `isReachable` is true?
* Should we have an example of `isComplicationEnabled`?
* Why is `recentAppContext` empty even after sending (and receiving) an app context from the watch?
* What does `activate()` do?

## TODO
* Add check for OS-es and versions
* Add complication to Watch App sample and demo transferCurrentComplication() 
* Only include one app icon to generate others from
* Add image to send from watch to Xcode
* Update image to send from app in assets/iphone/images
* Lots of buttons not working as expected yet
* Get my hands om some new/changed APIs list
* https://wiki.appcelerator.org/display/eng/Integrate+a+WatchKit+App+Built+in+Xcode

## Prerequisites

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
	
## Launching a Titanium App including its Watch App

	appc run -p ios -I 9.0 --launch-watch-app
	
## Communicating between the Titanium and Watch App

### In the Watch App
There's only three files of the generated template that I've touched for this sample:

* Open `extensions/<name>/<name>.xcodeproj` in Xcode 7+
* Find the Watch App interface under `<name>/<name> WatchApp/interface.storyboard`
	* See [Apple Watch Programming Guide / Watch Apps](https://developer.apple.com/library/prerelease/watchos/documentation/General/Conceptual/WatchKitProgrammingGuide/CreatingtheUserInterface.html#//apple_ref/doc/uid/TP40014969-CH4-SW1).
* Find the communication with the Titanium App under `<name>/<name> WatchApp Extension/InterfaceCntroller.h` and `.m`.



## Links

* [Apple Watch Programming Guide](https://developer.apple.com/library/prerelease/watchos/documentation/General/Conceptual/WatchKitProgrammingGuide/index.html)
* [Apple Watch Human Interface Guidelines](https://developer.apple.com/watch/human-interface-guidelines/)