(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController(SampleData,$scope,$http)
    {
              // Data
        $scope.helloText = SampleData.data.helloText;

        $http.get('http://localhost:3000/currentuser').then(function(result){
          $scope.currentU = result;
          console.log($scope.currentU);
        });

    }
})();
