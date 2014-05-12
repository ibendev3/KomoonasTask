komoonasStats.directive('multiSelect', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.$watch('tagsList', function(n,o) {
                    if (n == undefined)
                        return;
                    element.multiselect({
                        buttonClass: 'btn',
                        buttonWidth: 'auto',
                        buttonContainer: '<div class="btn-group" />',
                        maxHeight: 300,
                        onChange:function(element, checked){
                            tagIdSelectionChange(element.html(), checked, $scope);
                        },
                        buttonText: function(options) {
                            if (options.length == 0 || options.length == element.context.length ) {
                                return 'Tags Filtes: All Selected <b class="caret"></b>';
                            }
                            else if (options.length > 1) {
                                return options.length + ' selected  <b class="caret"></b>';
                            }
                            else {
                                var selected = '';
                                options.each(function() {
                                    selected += $(this).text() + ', ';
                                });
                                return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
                            }


                        }
                    });

                    // Watch for any changes to the length of our select element
                    $scope.$watch(function () {
                        return element[0].length;
                    }, function () {
                        element.multiselect('rebuild');
                    });

                    // Watch for any changes from outside the directive and refresh
                    $scope.$watch(attrs.ngModel, function () {
                        element.multiselect('refresh');
                    });
                })


            }

        };
    });