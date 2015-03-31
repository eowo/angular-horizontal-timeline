/**
 * Angular JS horizontal timeline
 *
 * (c) eowo
 * http://github.com/eowo/angularjs-horizontal-timeline
 *
 * Version: v0.0.1
 *
 * Licensed under the MIT license
 */

var template =
'<div class="timeline">'+
'<div class="timeline-left">'+
'	<label>{{startDate}}</label>'+
'</div>'+
'<div class="timeline-center">'+
'<div class="progress">'+
'	<span ng-style="{width:progress_percent+\'%\'}"></span>'+
'	<ul class="timeline-events">'+
'		<li class="timeline-event" ng-repeat="event in events"'+
'			ng-mouseenter="selectedEvent[$index]=true"'+
'			ng-mouseleave="selectedEvent[$index]=false"'+
'			event-date="event.date"'+
'			title="{{event.date}}"'+
'			timeline-event-marker><span></span>'+
'			<div class="timeline-event-box"'+
'				ng-show="selectedEvent[$index]"'+
'				ng-hide="!selectedEvent[$index]"'+
'				ng-bind-html="event.content | unsafe">'+
'			</div>'+
'		</li>'+
'	</ul>'+
'	<ul class="timeline-bg">'+
'		<li class="timeline-month" ng-repeat="month in months"'+
'			timeline-month><span title="{{month.date}}">{{month.name}}</span>'+
'			<ul>'+
'				<li class="timeline-day" ng-repeat="day in month.days"'+
'					ng-style="{ \'left\' : ($index * (100/month.days.length) )+\'%\'}">'+
'					<span title="{{month.date + \'-\' + day}}"><i></i>{{day}}</span>'+
'				</li>'+
'			</ul></li>'+
'	</ul>'+
'</div>'+
'</div>'+
'<div class="timeline-right">'+
'	<label>{{endDate}}</label>'+
'</div>'+
'</div>';

angular.module('angular-horizontal-timeline', ['ngSanitize'])

.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})

.directive('horizontalTimeline', function(){
	function controller($scope){
		$scope.selectedEvent = [];
		$scope.months= [];

		$scope.getPosition = function(date){
			date = moment(date);
			var diff = date.diff(moment($scope.startDate), 'months');
			var curWeekWidth = 100/$scope.months[diff].days.length;
			var monthsWidth = 100/$scope.months.length;
			var ixOfWeek = Math.ceil(date.format('D')/7) - 1;
			var curDOfMPercent = (date.format('D') - $scope.months[diff].days[ixOfWeek] ) * 14.28;

			return ( (monthsWidth * diff) + (((ixOfWeek * curWeekWidth) + (curDOfMPercent / 100 * curWeekWidth)) / 100 * monthsWidth) );
		};

		var range  = moment().range(moment($scope.startDate), moment($scope.endDate));
		range.by('months', function(month) {
			$scope.months.push({
				'date':month.format('YYYY-MM'),
				'name':month.format('MMMM'),
				'days':[]});

			var dayrange = moment().range(month.startOf('month').format('YYYY-MM-DD'), month.endOf('month').format('YYYY-MM-DD'));
			dayrange.by('weeks', function(week) {
				$scope.months[$scope.months.length - 1].days.push(week.format('DD'));
			});
		});

		$scope.progress_percent = $scope.getPosition(moment().format('YYYY-MM-DD'));
	}

	return {
		restrict: 'AEC',
		controller: controller,
		scope: {
			startDate: '@',
			endDate: '@',
			events: '='
		},
		template:template
	};
})

.directive('timelineMonth', function() {
	function link(scope, element, attr) {
		var monthWidth = 100/scope.months.length;
		element.css({'width': monthWidth+'%'});
	}
	return {
		restrict: 'A',
		link : link
	};
})

.directive('timelineEventMarker', function() {
	function link(scope, element, attr) {
		var eventDate = scope.$eval(attr.eventDate);
		var pos = scope.getPosition(eventDate);
		element.css({'left': pos+'%'});
	}
	return {
		restrict: 'A',
		link : link,
		scope: false
	};
});