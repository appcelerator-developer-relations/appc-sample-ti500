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

## [WatchSession](docs/WatchSession.md)
See linked doc.

## ISSUES
* [CLI-789
Provide a easier way to install nightly/beta/RC CLI and SDK versions through CLI](https://jira.appcelerator.org/browse/CLI-789)
* [CLI-698
In preprod, you cannot install Titanium SDK from Appc CLI](https://jira.appcelerator.org/browse/CLI-698)
* [TIMOB-19412
WatchOS2 template should demonstrate use of WatchConnectivity](https://jira.appcelerator.org/browse/TIMOB-19412)
* [TIMOB-19424
iOS: After a few builds, icons and launch images are missing](https://jira.appcelerator.org/browse/TIMOB-19424)
* [TIMOB-19425
Remove the need to call Ti.WatchSession.activate()](https://jira.appcelerator.org/browse/TIMOB-19425)