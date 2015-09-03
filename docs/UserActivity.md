# UserActivity

## When to use UserActivity?

* If you want to use Hand Off
* If you want to make the history of the user's activity in your app searchable by the user (since activities are only indexed after `becomeCurrent()` has been called on them)
* If you want to make activities searchable by anyone (since you can set `eligibleForPublicIndexing`).
	* **NOTE**: Wonder how this works with `becomeCurrent()`? Kind of means you can do a public handoff of a shared activity?

## `useractivitywillsave`
Fires when you call `

Might take a while after invalidating searchable activity to dissapear from search

handoff between apps and websites both ways!
https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/AdoptingHandoff/AdoptingHandoff.html#//apple_ref/doc/uid/TP40014338-CH2-DontLinkElementID_1

## NOTES
* UserActivity only indexed after you have made it current at least once
* http://www.slideshare.net/kitasuke/search-apis-in-spotlight-and-safari

## TODO
* https://wiki.appcelerator.org/display/eng/Handoff+User+Activities
* Use https://github.com/cheekiatng/Titanium-Search-Sample-App

## ISSUES
* [TIMOB-19439 Date properties of Ti.App.iOS.Searchable* and UserActivity should accept JS Date object](https://jira.appcelerator.org/browse/TIMOB-19439)
