(function(){
  'use strict'

  angular
    .module('classifieds')
    .factory('classifiedsFactory', function($http){

      function getClassifieds () {
        return $http.get('./classifieds.json')
      }
      
      return {
        getClassifieds: getClassifieds
      }
    })
})();
