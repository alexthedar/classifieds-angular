angular
  .module('classifieds', ["ngMaterial", "ui.router", "firebase"])
  .config(function($mdThemingProvider, $stateProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('orange')

  $stateProvider.state('classifieds', {
                          url: '/classifieds',
                          templateUrl: './components/classifieds/classifieds.tpl.html',
                          controller: 'classifiedsCTRL as vm'})
                .state('classifieds.new', {
                          url: '/new',
                          templateUrl: './components/classifieds/new/classifieds.new.tpl.html',
                          controller: 'newClassifiedsCTRL as vm'})
                .state('classifieds.edit', {
                          url: '/edit/:id',
                          templateUrl: './components/classifieds/edit/classifieds.edit.tpl.html',
                          controller: 'editClassifiedsCTRL as vm',
                          params: {
                            classified: null
                          }
                        })
                .state('default', {
                          url: '',
                          templateUrl: './components/classifieds/classifieds.tpl.html',
                          controller: 'classifiedsCTRL as vm'
                        })
  })
