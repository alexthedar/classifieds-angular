(function () {
  'use strict'

  angular
    .module('classifieds')
    .controller('editClassifiedsCTRL', function($scope, $state, $mdSidenav, $mdDialog, classifiedsFactory, $timeout){

      var vm = this
      vm.classifieds = classifiedsFactory.ref
      vm.closeSidebar = closeSidebar
      vm.saveEdit = saveEdit
      vm.classified = vm.classifieds.$getRecord($state.params.id)

      $timeout(function(){
        $mdSidenav('left').open()
      })

      // sidebarnav watcher
      $scope.$watch('vm.sidenavOpen', function(sidenav){
        if(sidenav===false){
          $mdSidenav('left')
            .close()
            .then(function(){
              $state.go('classifieds')
            })
        }
      })

      function closeSidebar(){ vm.sidenavOpen = false }

      //Save emitter
      function saveEdit(classified){
        vm.classifieds.$save(vm.classified).then(function(){
          $scope.$emit('editSaved', 'Edit Saved')
          vm.sidenavOpen = false
        })
      }
    })
})();
