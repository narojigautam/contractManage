angular.module('starter.controllers', [])

.controller('InvestmentsCtrl', function($scope, Investments) {
  $scope.investments = Investments.all();
  $scope.total_investment = 0;
  for (var i = 0; i < $scope.investments.length; i++) {
    $scope.total_investment += $scope.investments[i].amount;
  }
})
.controller('InvestmentNewCtrl', function($scope, Investments, Investors) {
  $scope.investment = {};
  $scope.investors = Investors.all();
  $scope.save = function(investment) {
    Investments.add(investment);
  }
})
.controller('InvestmentDetailCtrl', function($scope, $stateParams, Investments, Investors) {
  $scope.investments = Investments.all();
  $scope.investor = Investors.get($stateParams.investorId);
})
.controller('ContractsCtrl', function($scope, Contracts, Invoices) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.contracts = Contracts.all();
  $scope.total_expense = 0;
  $scope.total_tender = 0;
  var invoices = Invoices.all();
  for (var i = 0; i < invoices.length; i++) {
    $scope.total_expense += invoices[i].amount;
  }
  for (var i = 0; i < $scope.contracts.length; i++) {
    $scope.total_tender += $scope.contracts[i].tender_amount;
  }
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
.controller('InvoiceNewCtrl', function($scope, $stateParams, Invoices, Investors) {
  $scope.invoice = { contract_id: parseInt($stateParams.contractId) };
  $scope.investors = Investors.all();
  $scope.save = function(invoice) {
    Invoices.add(invoice);
  }
})
.controller('InvestorsCtrl', function($scope, Investors) {
  $scope.investors = Investors.all();
  $scope.remove = function(investor) {
    Investors.remove(investor);
  };
})
.controller('InvestorNewCtrl', function($scope, Investors) {
  $scope.investor = {};
  $scope.save = function(investor) {
    Investors.add(investor);
  }
})
.controller('ProfitCtrl', function($scope, Contracts, Investments) {
  $scope.contracts = Contracts.all();
  $scope.bill_amount = 0;
  var total_bill = 0;
  var total_tender = 0;
  for (var i = 0; i < $scope.contracts.length; i++) {
    if(!(typeof($scope.contracts[i].bill_amount) == "undefined")) {
      total_bill += $scope.contracts[i].bill_amount;
    }
    if(!(typeof($scope.contracts[i].tender_amount) == "undefined")) {
      total_tender += $scope.contracts[i].tender_amount;
    }
  }
  $scope.total_profit = total_tender - total_bill;
  $scope.profit = function(contract, bill_amount) {
    contract.bill_amount = bill_amount;
    var profit_amt = contract.tender_amount - bill_amount;
    Investments.add({amount: profit_amt, description: "Profit from " + contract.name, investor: {name: "Profit From Contract"}})
  }
});
