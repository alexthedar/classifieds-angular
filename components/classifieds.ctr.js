(function() {

  "use strict";

  angular
    .module("classifieds")
    .controller("classifiedsCTRL", function ($scope, $http, classifiedsFactory, $mdSidenav) {

      classifiedsFactory.getClassifieds()
        .then(function(classifieds) {
          $scope.classifieds = classifieds.data;
        })

      var contact = {
        name: "shit brain",
        phone: "555-555-5555",
        email: "kill@myself.com"
      }
      $scope.openSidebar = function(){
        $mdSidenav('left').open()
      }
      $scope.closeSidebar = function(){
        $mdSidenav('left').close()
      }

      $scope.saveClassified = function(classified) {
        if(classified ){
          $scope.classifieds.push(classified);
          $scope.classified = {};
          $scope.closeSidebar()
        }
      }
    });
})();
