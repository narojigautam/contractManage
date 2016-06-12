angular.module('starter.controllers', [])

.controller('InvestmentsCtrl', function($scope, $stateParams, Investments, Expenses, Investors) {
  Investments.all().then(function(res){
    $scope.enteries = res;
  });
  Expenses.all().then(function(res){
    $scope.enteries = $scope.enteries.concat(res);
  });
  $scope.removeEntry = function(entry) {
    Investments.remove(investment);
  };
  $scope.title_of = function(entry) {
    if (typeof(entry.investor_id) != "undefined" && entry.investor_id != 'undefined' && entry.investor_id != '') {
      Investors.get(entry.investor_id).then(function(res){
        entry.title = res.name;
      });
    } else if (typeof(entry.investor_id) != "undefined" && entry.investor_id == 'undefined') {
      entry.title = "From Profit";
    } else {
      entry.title = "Expense";
    }
    return entry.title;
  };
})
.controller('InvestmentNewCtrl', function($scope, $stateParams, Investments, Investors) {
  $scope.investment = {investor_id: $stateParams.investorId};
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

  Contracts.all().then(function(res){
    $scope.contracts = res;
  });
  Expenses.total_expense().then(function(res){
    $scope.total_expense = res;
  });
  Contracts.total_tender().then(function(res){
    $scope.total_tender = res;
  });
  $scope.total_expense_for = function(contract) {
    Expenses.total_for(contract.id).then(function(res){
      contract.total_expense = res;
    });
    return contract.total_expense;
  }
})

.controller('ContractDetailCtrl', function($scope, $stateParams, Contracts, Expenses) {
  Contracts.get($stateParams.contractId).then(function(res){
    $scope.contract = res;
  });
  Expenses.all_for($stateParams.contractId).then(function(res){
    $scope.expenses = res;
  });
  $scope.removeExpense = function(expense) {
    Expenses.remove(expense);
    Expenses.all_for($stateParams.contractId).then(function(res){
      $scope.expenses = res;
    });
  };
})
.controller('ContractNewCtrl', function($scope, Contracts) {
  $scope.contract = {};
  $scope.save = function(contract) {
    Contracts.add(contract);
  }
})
.controller('ExpenseNewCtrl', function($scope, $stateParams, Expenses, Investors) {
  $scope.expense = { contract_id: parseInt($stateParams.contractId) };
  Investors.all().then(function(res){
    $scope.investors = res;
  });
  $scope.save = function(expense) {
    Expenses.add(expense);
  }
})
.controller('InvestorsCtrl', function($scope, Investors, Investments, Expenses) {
  Investors.all().then(function(res){
    $scope.investors = res;
  });
  Investments.all().then(function(res){
    $scope.investments = res;
  });
  Investments.total_investment().then(function(res){
    $scope.total_investment = res;
  });
  Investments.total_profit().then(function(res){
    $scope.total_profit = res;
  });
  Expenses.total_expense().then(function(res){
    $scope.total_expense = res;
  });
  $scope.total_investment_for = function(investor) {
    Investments.total_investment_for(investor.id).then(function(res){
      investor.total_investment = res;
    });
    return investor.total_investment;
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
  Investments.get_for($stateParams.investorId).then(function(res){
    $scope.investments = res;
  });
  $scope.investor_id = $stateParams.investorId;
  Investors.get($stateParams.investorId).then(function(res){
    $scope.investor = res;
  });
  $scope.removeInvestment = function(investment) {
    Investments.remove(investment);
    Investments.get_for($stateParams.investorId).then(function(res){
      $scope.investments = res;
    });
  };
})
.controller('ProfitCtrl', function($scope, Contracts, Investments, Expenses) {
  Contracts.all().then(function(res){
    $scope.contracts = res;
  });
  Expenses.all().then(function(res){
    $scope.expenses = res;
  });
  Investments.total_profit().then(function(res){
    $scope.total_profit = res;
  });
  $scope.profit = function(contract, bill_amount) {
    contract.bill_amount = parseInt(bill_amount);
    Expenses.total_for(contract.id).then(function(res){
      contract.profit_amount = parseInt(bill_amount) - parseInt(res);
      Contracts.update(contract, contract);
      Investments.add({amount: contract.profit_amount, description: "Profit from " + contract.name, date: Date.call()});
    });
  }
});