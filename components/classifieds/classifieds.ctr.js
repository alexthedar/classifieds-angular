(function() {

  "use strict";

  angular
    .module("classifieds")
    .controller("classifiedsCTRL", function ($scope, $http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {


      var vm = this

      vm.categories
      vm.classified
      vm.classifieds
      vm.closeSidebar = closeSidebar
      vm.deleteClassified = deleteClassified
      vm.editing
      vm.editClassified = editClassified
      vm.saveEdit = saveEdit
      vm.openSidebar = openSidebar
      vm.saveClassified = saveClassified

      $scope.$on('newClassified', function(event, classified){
        vm.classifieds.$add(classified)
        showToast('Classified Saved')
      })

      $scope.$on('editSaved', function(event, message){
        showToast(message)
      })


      // READ
      vm.classifieds = classifiedsFactory.ref
      vm.classifieds.$loaded().then(function(classifieds){
        vm.categories = getCategories(classifieds)
      })

      //CREATE
      function saveClassified (classified) {
        if(classified ){
          classified.contact = contact
          vm.classifieds.push(classified);
          vm.classified = {};
          closeSidebar();
          showToast("Classified Saved")
        }
      }

      // UPDATE
      function editClassified (classified){
        $state.go('classifieds.edit', {
          id: classified.$id
        })
      }

      function saveEdit () {
        vm.editing = false
        vm.classified = {}
        closeSidebar()
        showToast("Edit Saved")
      }

      // DELETE
      function deleteClassified (event, classified){
        var confirm = $mdDialog.confirm()
                      .title("Are you sure you want to delete "+ classified.title+" ?")
                      .ok('Yes')
                      .cancel('No')
                      .targetEvent(event)

        $mdDialog.show(confirm).then(function(){
          vm.classifieds.$remove(classified)
          showToast("Classified Deleted")
        }, function(){  })
      }

      // Sidebar
      function openSidebar (){
        $state.go('classifieds.new')
      }
      function closeSidebar (){ $mdSidenav('left').close() }

      // alerts
      function showToast(message){
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position("top, right")
            .hideDelay(3000)
        )
      }

      // Search
      function getCategories(classifieds){
        var categories = []
        angular.forEach(classifieds, function(item){
          angular.forEach(item.categories, function(category){
            categories.push(category)
          })
        })
        return _.uniq(categories)
      }

    });
})();
