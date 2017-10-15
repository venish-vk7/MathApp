// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.config(function($stateProvider,$urlRouterProvider){
     $stateProvider
     .state('home',{
          url:'/home',
          templateUrl:'template/home.html',
          controller:'homeController'
     })
     .state('profile',{
        url:'/profile',
        templateUrl:'template/profile.html',
        controller:'profileController'
     })
     .state('view',{
       url:'/view',
       templateUrl:'template/view.html',
       controller:'viewController'
     })
     $urlRouterProvider.otherwise('/home');
})
.controller('homeController',function($scope,$location,$timeout){
   $timeout(function(){
        $location.path('/profile');
   },2000)
})
.controller('profileController',function($scope,$http,$rootScope,$location,$filter,$ionicLoading,$ionicPopup){
    $scope.inputType="text";
    $scope.$watch('catagory',function(newValue,oldValue){
      switch(newValue){
        case 'trivia' :
                $scope.type="";
                $scope.inputType="number";
        break;
        case 'math':
                $scope.type="";
                $scope.inputType="number";
        break;
        case 'date':
                $scope.inputType="text";
                //$scope.type="";
                $scope.type = $filter('date')(new Date(),'MM/dd');
        break;
        case  'year':
                $scope.type="";
                $scope.inputType="text";
                $scope.type = $filter('date')(new Date(),'yyyy');
        break;
      } 
    });
    
    $scope.sendData =  function(){
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        $http
        .get("http://numbersapi.com/" + $scope.type+ "/"+$scope.catagory)
        .then(function(response){
            $rootScope.data=response.data;
            $ionicLoading.hide();
            $location.path("/view");
        },function(err){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Alert',
            template: 'Please Enter valid data' 
          });
        });
    }
})
.controller('viewController',function($scope,$rootScope){
        $scope.factData = $rootScope.data;
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
