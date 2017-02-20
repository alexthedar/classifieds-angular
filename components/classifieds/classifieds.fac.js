(function(){
  'use strict'

  angular
    .module('classifieds')
    .factory('classifiedsFactory', function($http, $firebaseArray){

      var ref = firebase.database().ref();

      return {
        ref: $firebaseArray(ref)
      }
    })
})();
