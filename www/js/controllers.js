angular.module('starter.controllers', [])

.controller('InvestmentsCtrl', function($scope, $stateParams, Investments, Expenses) {
  $scope.title = $stateParams.filterBy;
  $scope.filterBy = {};
  if($stateParams.filterBy == "Profit") {
    $scope.filterBy = {is_profit: true};
  }
  $scope.investments = Investments.all();
  if($stateParams.filterBy == "All") {
    $scope.investments = $scope.investments.concat(Expenses.all());
  }
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
  $scope.expenses = Expenses.all();
  for (var i = 0; i < $scope.expenses.length; i++) {
    $scope.total_expense += parseInt($scope.expenses[i].amount);
  }
  for (var i = 0; i < $scope.contracts.length; i++) {
    $scope.total_tender += parseInt($scope.contracts[i].tender_amount);
  }
  $scope.total_expense_for = function(contractId) {
    var totalx = 0;
    for (var i = 0; i < $scope.expenses.length; i++) {
      if (contractId == $scope.expenses[i].contract_id) {
        totalx += parseInt($scope.expenses[i].amount);
      }
    }
    return totalx;
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
.controller('InvestorsCtrl', function($scope, Investors, Investments, Expenses) {
  $scope.investors = Investors.all();
  $scope.investments = Investments.all();
  $scope.total_investment = 0;
  $scope.total_expense = 0;
  $scope.total_profit = 0;
  for (var i = 0; i < $scope.investments.length; i++) {
    if($scope.investments[i].is_profit) {
      $scope.total_profit += parseInt($scope.investments[i].amount);
    } else {
      $scope.total_investment += parseInt($scope.investments[i].amount);
    }
  }
  var expenses = Expenses.all();
  for (var i = 0; i < expenses.length; i++) {
    $scope.total_expense += parseInt(expenses[i].amount);
  }
  $scope.total_balance = parseInt($scope.total_investment) + parseInt($scope.total_profit) - parseInt($scope.total_expense);
  $scope.total_investment_for = function(investorId) {
    var total = 0;
    for (var i = 0; i < $scope.investments.length; i++) {
      if (!$scope.investments[i].is_profit && investorId == $scope.investments[i].investor.id) {
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
.controller('ProfitCtrl', function($scope, Contracts, Investments, Expenses) {
  $scope.contracts = Contracts.all();
  $scope.expenses = Expenses.all();
  var investments = Investments.all();
  $scope.total_profit = 0;
  for (var j = 0; j < investments.length; j++) {
    if(investments[j].is_profit) {
      $scope.total_profit += parseInt(investments[j].amount);
    }
  }
  $scope.profit = function(contract, bill_amount) {
    contract.bill_amount = bill_amount;
    var expenses_amount = 0;
    for (var i = 0; i < $scope.expenses.length; i++) {
      if($scope.expenses[i].contract_id == contract.id) {
        expenses_amount += parseInt($scope.expenses[i].amount);
      }
    }
    contract.profit_amount = parseInt(bill_amount) - expenses_amount;
    Investments.add({amount: contract.profit_amount, description: "Profit from " + contract.name, is_profit: true, date: Date.call()})
  }
});