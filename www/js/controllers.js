angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ContractsCtrl', function($scope, Contracts) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.contracts = Contracts.all();
  $scope.remove = function(contract) {
    Contracts.remove(contract);
  };
})

.controller('ContractDetailCtrl', function($scope, $stateParams, Contracts, Invoices) {
  $scope.contract = Contracts.get($stateParams.contractId);
  $scope.invoices = Invoices.all();
})
.controller('ContractNewCtrl', function($scope, Contracts) {
  $scope.contract = {};
  $scope.save = function(contract) {
    Contracts.add(contract);
  }
})
.controller('InvoiceNewCtrl', function($scope, $stateParams, Invoices) {
  $scope.invoice = { contract_id: parseInt($stateParams.contractId) };
  $scope.save = function(invoice) {
    Invoices.add(invoice);
  }
})
.controller('InvestorsCtrl', function($scope, Investors) {
  $scope.investors = Investors.all();
  $scope.remove = function(investor) {
    Investors.remove(investor);
  };
});
