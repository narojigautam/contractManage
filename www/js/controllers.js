angular.module('starter.controllers', [])

.controller('InvestmentsCtrl', function($scope, $stateParams, Investments, Expenses, Payments) {
  Investments.all().then(function(res){
    $scope.enteries = res;
    Expenses.all().then(function(res){
      $scope.enteries = $scope.enteries.concat(res);
    });
    Payments.all().then(function(res){
      $scope.enteries = $scope.enteries.concat(res);
    });
  });
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
    $scope.total_tender = Contracts.total_tender();
  });
  Expenses.all().then(function(){
    $scope.total_expense = Expenses.total_expense();
  });

  $scope.total_expense_for = function(contract) {
    contract.total_expense = Expenses.total_for(contract.id);
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
    Expenses.remove(expense).then(function(res){
      $scope.expenses = res;
    });
  };
})
.controller('ContractPaymentsCtrl', function($scope, $stateParams, Contracts, Payments) {
  Contracts.get($stateParams.contractId).then(function(res){
    $scope.contract = res;
  });
  Payments.all_for($stateParams.contractId).then(function(res){
    $scope.payments = res;
  });
  $scope.removePayment = function(payment) {
    Payments.remove(payment).then(function(res){
      $scope.payments = res;
    });
  };
})
.controller('ContractNewCtrl', function($scope, Contracts) {
  $scope.contract = {};
  $scope.save = function(contract) {
    Contracts.add(contract);
  }
})
.controller('ExpenseNewCtrl', function($scope, $stateParams, Expenses) {
  $scope.expense = { contract_id: parseInt($stateParams.contractId) };
  $scope.save = function(expense) {
    Expenses.add(expense);
  }
})
.controller('PaymentNewCtrl', function($scope, $stateParams, Payments) {
  $scope.payment = { contract_id: parseInt($stateParams.contractId) };
  $scope.save = function(payment) {
    Payments.add(payment);
  }
})
.controller('InvestorsCtrl', function($scope, $window, $state, Investors, Investments, Expenses, LoginService, Payments) {
  if($window.localStorage['contractManageToken']) {
    LoginService.validateToken().then(function(res){
      if(res.status != 200) {
        $window.localStorage.removeItem('contractManageToken');
        $window.localStorage.removeItem('contractManageClient');
        $window.localStorage.removeItem('contractManageUid');
        $state.go('login');
      }
    });
  }
  Investors.all().then(function(res){
    $scope.investors = res;
  });
  Investments.all().then(function(res){
    $scope.investments = res;
    $scope.total_investment = Investments.total_investment();
    $scope.total_profit = Investments.total_profit();
  });
  Expenses.all().then(function(res){
    $scope.total_expense = Expenses.total_expense();
  });
  Payments.all().then(function(res){
    $scope.total_payments = Payments.total_payments();
  });
  $scope.total_investment_for = function(investor) {
    investor.total_investment = Investments.total_investment_for(investor.id);
    return investor.total_investment;
  }
  $scope.remove = function(investor) {
    Investors.remove(investor);
  };
  $scope.logout = function() {
    $window.localStorage.removeItem('contractManageToken');
    $window.localStorage.removeItem('contractManageClient');
    $window.localStorage.removeItem('contractManageUid');
    $state.go('login');
  }
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
    Investments.remove(investment).then(function(res){
      $scope.investments = res;
    });
  };
})
.controller('ProfitCtrl', function($scope, Contracts, Investments, Expenses, Payments) {
  Contracts.all().then(function(res){
    $scope.contracts = res;
  });
  Expenses.all().then(function(res){
    $scope.expenses = res;
  });
  $scope.total_profit = Investments.total_profit();
  Payments.all().then(function(res){
    $scope.total_payments = Payments.total_payments();
  });

  $scope.total_payment_for = function(contract) {
    contract.total_payment = Payments.total_for(contract.id);
    return contract.total_payment;
  }
  $scope.profit = function(contract, bill_amount) {
    contract.bill_amount = parseInt(bill_amount);
    expense_amt = Expenses.total_for(contract.id)
    contract.profit_amount = parseInt(bill_amount) - parseInt(expense_amt);
    Contracts.update(contract);
    Investments.add({amount: contract.profit_amount, description: "Profit from " + contract.name, date: Date.call()});
  }
})
.controller('LoginCtrl', function($scope, $ionicPopup, $state, $window, LoginService) {
  $scope.data = {};
  if($window.localStorage['contractManageToken']) {
    LoginService.validateToken().then(function(res){
      if(res.status == 200) {
        $state.go('tab.investors');
      } else {
        $window.localStorage.removeItem('contractManageToken');
        $window.localStorage.removeItem('contractManageClient');
        $window.localStorage.removeItem('contractManageUid');
      }
    });
  }

  $scope.login = function() {
    LoginService.loginUser($scope.data.username, $scope.data.password).then(function(data) {
      if(data.status == 200) {
        $state.go('tab.investors');
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      }
    });
  }
});
