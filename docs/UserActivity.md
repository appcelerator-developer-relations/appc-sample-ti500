# UserActivity

## When to use UserActivity?

* If you want to use Hand Off
* If you want to make the history of the user's activity in your app searchable by the user (since activities are only indexed after `becomeCurrent()` has been called on them)
* If you want to make activities searchable by anyone (since you can set `eligibleForPublicIndexing`).
	* **NOTE**: Wonder how this works with `becomeCurrent()`? Kind of means you can do a public handoff of a shared activity?

## `useractivitywillsave`
Fires when you call `

## NOTES
* UserActivity only indexed after you have made it current at least once
* http://www.slideshare.net/kitasuke/search-apis-in-spotlight-and-safari

## TODO
* https://wiki.appcelerator.org/display/eng/Handoff+User+Activities
* Create activity for each tab then make current on focus and focus on handoff
* On `useractivitywillsave` (if it works) update activity userInfo with time to see if that works.
* Use https://github.com/cheekiatng/Titanium-Search-Sample-App

## ISSUES
* [TIMOB-19439 Date properties of Ti.App.iOS.Searchable* and UserActivity should accept JS Date object](https://jira.appcelerator.org/browse/TIMOB-19439)
* [TIMOB-19441
useractivitywillsave does not fire before continuing on other device](https://jira.appcelerator.org/browse/TIMOB-19441)

