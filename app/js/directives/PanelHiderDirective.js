komoonasStats.directive('panelHider', function() {
    return function($scope, element, attrs) {
        if ($scope.$last){
            angular.element('.mainContainer').css('visibility', 'visible');

        }
    };
})
