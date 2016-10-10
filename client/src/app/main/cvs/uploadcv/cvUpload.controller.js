(function() {
  'use strict';

  angular
    .module('app.pages.cvUpload', ['ngFileUpload'])
    .controller('CVUpload', CVUpload);

  /** @ngInject */

  function CVUpload($scope, Upload, $element, $timeout, $window, $http) {
    $http.get('/companylist').success(function(response) {
      $scope.companies = response;
    });


    $scope.searchTerm = null;
    $scope.clearSearchTerm = function() {

    };
    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
    $element.find('input').on('keydown', function(ev) {
      ev.stopPropagation();
    });
    //print($scope.ccc);
    $scope.formData = {};

    $scope.$watch('formData.company1', function() {
      for (var i = 0; i < $scope.companies.length; i++) {
        if ($scope.companies[i].name == $scope.formData.company1) {
          $scope.selectedObject = $scope.companies[i];
          if ($scope.selectedObject.catv == false) {
            $scope.formData.position1 = "";
          }
          $scope.secondpre = true;
        }
      }
    });

    $scope.$watch('formData.company2', function() {
      for (var i = 0; i < $scope.companies.length; i++) {
        if ($scope.companies[i].name == $scope.formData.company2) {
          $scope.selectedObject1 = $scope.companies[i];
          if ($scope.selectedObject1.catv == false) {
            $scope.formData.position2 = "";
          }
          $scope.thirdpre = true;

        }
      }
    });
    $scope.$watch('formData.company3', function() {
      for (var i = 0; i < $scope.companies.length; i++) {
        if ($scope.companies[i].name == $scope.formData.company3) {
          $scope.selectedObject2 = $scope.companies[i];
          if ($scope.selectedObject2.catv == false) {
            $scope.formData.position3 = "";
          }

        }
      }
    });


    // $scope.sendForm = function(file) {
    //
    //   //console.log($scope.formData.selected.length);
    //   console.log($scope.formData.picFile);
    //   console.log($scope.formData);
    //   console.log(file);
    //
    // }

    $scope.sendForm = function(file) {
      console.log("--->start");
      console.log($scope.formData.picFile);
      console.log($scope.formData);
      console.log(file);
      console.log("--->end");

      file.upload = Upload.upload({

        url: ' /upload',
        data: {
          file: file,
          fname: $scope.formData.firstname,
          lname: $scope.formData.lastname,
          email: $scope.formData.email,
          mobilenumber: $scope.formData.mobilenumber,
          telnumber: $scope.formData.telnumber,
          company1: $scope.formData.company1,
          company2: $scope.formData.company2,
          company3: $scope.formData.company3,
          position1: $scope.formData.position1,
          position2: $scope.formData.position2,
          position3: $scope.formData.position3
        },
      });

      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
        });
        if (response.data.error_code === 0) { //validate success
          $window.alert('Success ' + response.config.data.file.name + 'uploaded. Response: ');
        } else {
          $window.alert('an error occured');
        }
      }, function(response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
        $window.alert('Error status: ' + resp.status);
      }, function(evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }

  }


})();
