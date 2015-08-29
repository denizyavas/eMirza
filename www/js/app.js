var app = angular.module('starter', ['ionic'])

app.controller('IndexCtrl', function($scope, $http, $ionicLoading, $ionicModal) {
$scope.dates = []
$scope.contents = []

$scope.openLink = function(url) {
    window.open(url, "_blank")
}

$scope.getHomePage = function() {
    $ionicLoading.show({
      template: 'Loading homepage contents...'
    });
   $http.get("http://www.denizyavas.com/pics")
   .success(function(response) {
       $scope.contents = [];
       angular.forEach(response.images, function (child) {
          $scope.contents.push(child);
		  if($scope.dates.indexOf(child.dateText) <= -1){
			$scope.dates.push(child.dateText);
		  }
       });
       $ionicLoading.hide();
   })
}

$scope.getDatePics = function(dateText) {
   $ionicLoading.show({
      template: 'Loading <b>' + dateText +'</b> contents...'
    });
   $http.get("http://www.denizyavas.com/pics")
   .success(function(response) {
       $scope.contents = [];
       angular.forEach(response.images, function (child) {
			if(child.dateText == dateText){
				$scope.contents.push(child);
		  }
				$scope.dates.push(child.dateText);
       });
       $ionicLoading.hide();
   })
}

$scope.showImages = function(index, largeUrl) {
 $scope.largeUrl = largeUrl;
 $scope.activeSlide = index;
 $scope.showModal('templates/image-popover.html');
}

$scope.showModal = function(templateUrl) {
 $ionicModal.fromTemplateUrl(templateUrl, {
 scope: $scope,
 animation: 'slide-in-up'
 }).then(function(modal) {
 $scope.modal = modal;
 $scope.modal.show();
 });
 }
 
 // Close the modal
 $scope.closeModal = function() {
 $scope.modal.hide();
 $scope.modal.remove()
 };

$scope.getHomePage()


})

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.cordova && window.cordova.InAppBrowser) {
      window.open = cordova.InAppBrowser.open;
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})