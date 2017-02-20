(function () {
  'use strict'

  angular
    .module('classifieds')
    .controller('newClassifiedsCTRL', function($scope, $state, $mdSidenav, $mdDialog, classifiedsFactory, $timeout){

      var vm = this
      vm.closeSidebar = closeSidebar
      vm.saveClassified = saveClassified


      $timeout(function(){
        $mdSidenav('left').open()
      })

      // sidebarnav watcher
      $scope.$watch('vm.sidenavOpen', function(sidenavOpen){
        if(sidenavOpen === false){
          $mdSidenav('left')
            .close()
            .then(function(){
              $state.go('classifieds')
            })
        }
      })


      function closeSidebar(){ vm.sidenavOpen = false }

      //Save emitter
      function saveClassified(classified){
        if(classified){
          console.log('emit')

          // fake contact
          classified.contact = {
            name: "test test",
            phone: "555-555-5555",
            email: "test@test.com"
          }
          $scope.$emit('newClassified', classified)
          vm.sidenavOpen = false
        }
      }
    })
})();
