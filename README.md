# angular-horizontal-timeline
Simple horizontal timeline directive for AngularJS

# Demo
https://eowo.github.io

# Install
You can download all necessary angular-horizontal-timeline files manually or install it with bower:

```
$ bower install --save angular-horizontal-timeline
```

# Load
To use the directive, include the angular-horizontal-timeline's javascript and css files in your web page:

```
<script src="angular-horizontal-timeline.js"></script>
<link rel="stylesheet" href="angular-horizontal-timeline.css">
```

# Add module dependency
```
angular.module('app', ['angular-horizontal-timeline']);
```

# Usage
```
<horizontal-timeline 
  start-date="2015-01" 
  end-date="2015-05"
  events="[{"date":"2015-03-24","content":"<p>lorem ipsum</p>"},{"date":"2015-04-07","content":"<p>lorem ipsum</p>"}]">
</horizontal-timeline>
```
