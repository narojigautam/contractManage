angular.module('starter.services', [])
.factory('Investments', function() {
  var investments = [];

  return {
    all: function() {
      return investments;
    },
    remove: function(investment) {
      investments.splice(investments.indexOf(investment), 1);
    },
    add: function(investment) {
      investment.id = investments.length + 1;
      investments.push(investment);
    },
    get: function(investmentId) {
      for (var i = 0; i < investments.length; i++) {
        if (investments[i].id === parseInt(investmentId)) {
          return investments[i];
        }
      }
      return null;
    }
  };
})
.factory('Contracts', function() {
  var contracts = [];

  return {
    all: function() {
      return contracts;
    },
    remove: function(contract) {
      contracts.splice(contracts.indexOf(contract), 1);
    },
    add: function(contract) {
      contract.id = contracts.length + 1;
      contract.date = Date.call();
      contracts.push(contract);
    },
    get: function(contractId) {
      for (var i = 0; i < contracts.length; i++) {
        if (contracts[i].id === parseInt(contractId)) {
          return contracts[i];
        }
      }
      return null;
    }
  };
}).factory('Investors', function() {
  var investors = [];

  return {
    all: function() {
      return investors;
    },
    remove: function(investor) {
      investors.splice(investors.indexOf(investor), 1);
    },
    add: function(investor) {
      investor.id = investors.length + 1;
      investor.date = Date.call();
      investors.push(investor);
    },
    get: function(investorId) {
      for (var i = 0; i < investors.length; i++) {
        if (investors[i].id === parseInt(investorId)) {
          return investors[i];
        }
      }
      return null;
    }
  };
})
.factory('Expenses', function() {
  var expenses = [];

  return {
    all: function() {
      return expenses;
    },
    remove: function(expense) {
      expenses.splice(expenses.indexOf(expense), 1);
    },
    add: function(expense) {
      expense.id = expenses.length + 1;
      expenses.push(expense);
    },
    get: function(expenseId) {
      for (var i = 0; i < expenses.length; i++) {
        if (expenses[i].id === parseInt(expenseId)) {
          return expenses[i];
        }
      }
      return null;
    }
  };
});
