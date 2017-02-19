(function() {

  "use strict";

  angular
    .module("classifieds")
    .controller("classifiedsCTRL", function ($scope, $http, classifiedsFactory) {

      classifiedsFactory.getClassifieds()
        .then(function(classifieds) {
          $scope.classifieds = classifieds.data;
        })

    });
})();
