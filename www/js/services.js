angular.module('starter.services', [])
.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('Error encountered: ');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})
.factory('Investments', function($cordovaSQLite, DBA) {
  return {
    all: function() {
      return DBA.query("SELECT * FROM investments").then(function(result){
        return DBA.getAll(result);
      });
    },
    get_for: function(investor_id) {
      return DBA.query("SELECT * FROM investments WHERE investor_id = (?)",[investor_id]).then(function(result){
        return DBA.getAll(result);
      });
    },
    remove: function(investment) {
      var parameters = [investment.id];
      return DBA.query("DELETE FROM investments WHERE id = (?)", parameters);
    },
    add: function(investment) {
      var parameters = [investment.investor_id, investment.amount, investment.date, investment.description];
      return DBA.query("INSERT INTO investments (investor_id, amount, date, description) VALUES (?,?,?,?)", parameters);
    },
    get: function(investmentId) {
      var parameters = [investmentId];
      return DBA.query("SELECT * FROM investments WHERE id = (?)", parameters).then(function(result) {
        return DBA.getById(result);
      });
    },
    update: function(origInvestment, updatedInvestment) {
      var parameters = [updatedInvestment.id, investment.investor.id, investment.amount, investment.date, investment.description, origInvestment.id];
      return DBA.query("UPDATE investments SET id = (?), investor_id = (?), amount = (?), date = (?), description = (?) WHERE id = (?)", parameters);
    },
    total_investment: function(){
      return DBA.query("Select TOTAL(amount) as total FROM investments WHERE is_profit IS NOT 'true'").then(function(result){
        return DBA.getAll(result)[0].total;
      });
    },
    total_profit: function(){
      return DBA.query("Select TOTAL(amount) as total FROM investments WHERE is_profit IS 'true'").then(function(result){
        return DBA.getAll(result)[0].total;
      });
    },
    total_investment_for: function(id){
      return DBA.query("Select TOTAL(amount) as total FROM investments WHERE investor_id = (?)",[id]).then(function(result){
        return DBA.getById(result);
      });
    }
  };
})
.factory('Investors', function($cordovaSQLite, DBA) {
  return {
    all: function() {
      return DBA.query("SELECT * FROM investors").then(function(result){
        return DBA.getAll(result);
      });
    },
    remove: function(investor) {
      var parameters = [investor.id];
      return DBA.query("DELETE FROM investors WHERE id = (?)", parameters);
    },
    add: function(investor) {
      var parameters = [investor.name];
      return DBA.query("INSERT INTO investors (name) VALUES (?)", parameters);
    },
    get: function(investorId) {
      var parameters = [investorId];
      return DBA.query("SELECT * FROM investors WHERE id = (?)", parameters).then(function(result) {
        return DBA.getById(result);
      });
    },
    update: function(origInvestor, updatedInvestor) {
      var parameters = [updatedInvestor.id, updatedInvestor.name, origInvestor.id];
      return DBA.query("UPDATE investors SET id = (?), name = (?) WHERE id = (?)", parameters);
    }
  };
})
.factory('Contracts', function($cordovaSQLite, DBA) {
  return {
    all: function() {
      return DBA.query("SELECT * FROM contracts").then(function(result){
        return DBA.getAll(result);
      });
    },
    remove: function(contract) {
      var parameters = [contract.id];
      return DBA.query("DELETE FROM contracts WHERE id = (?)", parameters);
    },
    add: function(contract) {
      var parameters = [contract.name, contract.tender_amount, contract.description, contract.date];
      return DBA.query("INSERT INTO contracts (name, tender_amount, description, date) VALUES (?,?,?,?)", parameters);
    },
    get: function(contractId) {
      var parameters = [contractId];
      return DBA.query("SELECT * FROM contracts WHERE id = (?)", parameters).then(function(result) {
        return DBA.getById(result);
      });
    },
    update: function(origCont, updatedCont) {
      var parameters = [updatedCont.id, updatedCont.name, updatedCont.tender_amount, updatedCont.description, updatedCont.date, updatedCont.profit_amount, updatedCont.bill_amount, origCont.id];
      return DBA.query("UPDATE contracts SET id = (?), name = (?), tender_amount = (?), description = (?), date = (?), profit_amount = (?), bill_amount = (?) WHERE id = (?)", parameters);
    },
    total_tender: function() {
      return DBA.query("Select TOTAL(tender_amount) as total FROM contracts").then(function(result){
        return DBA.getAll(result)[0].total;
      });
    }
  };
})
.factory('Expenses', function($cordovaSQLite, DBA) {
  return {
    all: function() {
      return DBA.query("SELECT * FROM expenses").then(function(result){
        return DBA.getAll(result);
      });
    },
    remove: function(expense) {
      var parameters = [expense.id];
      return DBA.query("DELETE FROM expenses WHERE id = (?)", parameters);
    },
    add: function(expense) {
      var parameters = [expense.name, expense.amount, expense.description, expense.date, expense.contract_id];
      return DBA.query("INSERT INTO expenses (name, amount, description, date, contract_id) VALUES (?,?,?,?,?)", parameters);
    },
    get: function(expenseId) {
      var parameters = [expenseId];
      return DBA.query("SELECT * FROM expenses WHERE id = (?)", parameters).then(function(result) {
        return DBA.getById(result);
      });
    },
    total_expense: function() {
      return DBA.query("Select TOTAL(amount) as total FROM expenses").then(function(result){
        return DBA.getAll(result)[0].total;
      });
    },
    total_for: function(id) {
      return DBA.query("Select TOTAL(amount) as total FROM expenses WHERE contract_id = (?)", [id]).then(function(result){
        return DBA.getById(result);
      });
    }
  };
});
