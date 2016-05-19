angular.module('starter.controllers', [])

.controller('InvestmentsCtrl', function($scope, Investments, Investors) {
  $scope.investments = Investments.all();
  $scope.investors = Investors.all();
})
.controller('InvestmentNewCtrl', function($scope, $stateParams, Investments, Investors) {
  $scope.investor = Investors.get($stateParams.investorId)
  $scope.investment = {investor: $scope.investor};
  $scope.save = function(investment) {
    Investments.add(investment);
  }
})
.controller('ContractsCtrl', function($scope, Contracts, Expenses) {
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
  var expenses = Expenses.all();
  for (var i = 0; i < expenses.length; i++) {
    $scope.total_expense += parseInt(expenses[i].amount);
  }
  for (var i = 0; i < $scope.contracts.length; i++) {
    $scope.total_tender += parseInt($scope.contracts[i].tender_amount);
  }
})

.controller('ContractDetailCtrl', function($scope, $stateParams, Contracts, Expenses) {
  $scope.contract = Contracts.get($stateParams.contractId);
  $scope.expenses = Expenses.all();
})
.controller('ContractNewCtrl', function($scope, Contracts) {
  $scope.contract = {};
  $scope.save = function(contract) {
    Contracts.add(contract);
  }
})
.controller('ExpenseNewCtrl', function($scope, $stateParams, Expenses, Investors) {
  $scope.expense = { contract_id: parseInt($stateParams.contractId) };
  $scope.investors = Investors.all();
  $scope.save = function(expense) {
    Expenses.add(expense);
  }
})
.controller('InvestorsCtrl', function($scope, Investors, Investments) {
  $scope.investors = Investors.all();
  $scope.investments = Investments.all();
  $scope.total_investment = 0;
  for (var i = 0; i < $scope.investments.length; i++) {
    $scope.total_investment += parseInt($scope.investments[i].amount);
  }
  $scope.total_investment_for = function(investorId) {
    var total = 0;
    for (var i = 0; i < $scope.investments.length; i++) {
      if (investorId == $scope.investments[i].investor.id) {
        total += parseInt($scope.investments[i].amount);
      }
    }
    return total;
  }
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
.controller('InvestorDetailCtrl', function($scope, $stateParams, Investors, Investments) {
  $scope.investments = Investments.all();
  $scope.investor = Investors.get($stateParams.investorId);
})
.controller('ProfitCtrl', function($scope, Contracts, Investments) {
  $scope.contracts = Contracts.all();
  $scope.bill_amount = 0;
  var investments = Investments.all();
  var total_bill = 0;
  var total_expense = 0;
  for (var i = 0; i < $scope.contracts.length; i++) {
    if(!(typeof($scope.contracts[i].bill_amount) == "undefined")) {
      total_bill += parseInt($scope.contracts[i].bill_amount);
    }
  }
  for (var j = 0; j < investments.length; j++) {
    total_expense += parseInt(investments[j].amount);
  }
  $scope.total_profit = total_expense - total_bill;
  $scope.profit = function(contract, bill_amount) {
    contract.bill_amount = bill_amount;
    var profit_amt = contract.tender_amount - bill_amount;
    Investments.add({amount: profit_amt, description: "Profit from " + contract.name, investor: {name: "Profit From Contract"}})
  }
});