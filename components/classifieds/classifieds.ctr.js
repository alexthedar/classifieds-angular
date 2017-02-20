(function() {

  "use strict";

  angular
    .module("classifieds")
    .controller("classifiedsCTRL", function ($http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

      // fake contact
      var contact = {
        name: "test test",
        phone: "555-555-5555",
        email: "test@test.com"
      }

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



      // READ
      classifiedsFactory.getClassifieds()
        .then(function(classifieds) {
          vm.classifieds = classifieds.data;
          vm.categories = getCategories(vm.classifieds)
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
        vm.editing = true
        openSidebar()
        vm.classified = classified
        console.log('here', classified)
        console.log('vm', vm.classified)
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
          var index = vm.classifieds.indexOf(classified)
          vm.classifieds.splice(index, 1)
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
