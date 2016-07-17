angular.module('starter.services', [])
.factory('ApiService', function($http) {
  var api_endpoint = 'http://localhost:3000/api/'
  return {
    get: function(endpoint) {
      return $http.get(api_endpoint + endpoint);
    },
    post: function(endpoint, params = {}) {
      return $http({url: api_endpoint + endpoint, data: params, method: "POST"});
    },
    delete: function(endpoint) {
      return $http({url: api_endpoint + endpoint, method: "DELETE"});
    },
    update: function(endpoint, params = {}) {
      return $http({url: api_endpoint + endpoint, data: params, method: "PUT"});
    }
  }
})
.factory('Investments', function(ApiService) {
  var investments = [];
  return {
    all: function() {
      return ApiService.get("investments").then(function(response){
        investments = response.data;
        return investments;
      });
    },
    get_for: function(investor_id) {
      return this.all().then(function(res){
        var selected = [];
        res.forEach(function(val){
          if(val.investor_id == investor_id){
            selected.push(val);
          }
        });
        return selected;
      });
    },
    remove: function(investment) {
      return ApiService.delete("investments/" + investment.id).then(function(response){
        investments.forEach(function(val, id){
          if(val.id == investment.id){
            investments.splice(id, 1);
          }
        });
        var selected = [];
        investments.forEach(function(val){
          if(val.investor_id == investment.investor_id){
            selected.push(val);
          }
        });
        return selected;
      });
    },
    add: function(investment) {
      ApiService.post("investments", investment).then(function(response){
        investments.push(response.data);
      });
    },
    get: function(investmentId) {
      // var parameters = [investmentId];
      // return DBA.query("SELECT * FROM investments WHERE id = (?)", parameters).then(function(result) {
      //   return DBA.getById(result);
      // });
    },
    update: function(origInvestment, updatedInvestment) {
      // var parameters = [updatedInvestment.id, investment.investor.id, investment.amount, investment.date, investment.description, origInvestment.id];
      // return DBA.query("UPDATE investments SET id = (?), investor_id = (?), amount = (?), date = (?), description = (?) WHERE id = (?)", parameters);
    },
    total_investment: function(){
      // return DBA.query("Select TOTAL(amount) as total FROM investments WHERE investor_id IS NOT 'undefined'").then(function(result){
      //   return DBA.getAll(result)[0].total;
      // });
    },
    total_profit: function(){
      var total = 0;
      investments.forEach(function(val){
        if(val.investor_id == null){
          total += val.amount;
        }
      });
      return total;
    },
    total_investment_for: function(id){
      // return DBA.query("Select TOTAL(amount) as total FROM investments WHERE investor_id = (?)",[id]).then(function(result){
      //   return DBA.getById(result).total;
      // });
    }
  };
})
.factory('Investors', function(ApiService) {
  var investors = [];
  return {
    all: function() {
      return ApiService.get("investors").then(function(response){
        investors = response.data;
        return investors;
      });
    },
    remove: function(investor) {
      // var parameters = [investor.id];
      // return DBA.query("DELETE FROM investors WHERE id = (?)", parameters);
    },
    add: function(investor) {
      ApiService.post("investors", investor).then(function(response){
        investors.push(response.data);
      });
    },
    get: function(investorId) {
      return ApiService.get("investors/" + investorId).then(function(response){
        return response.data;
      });
    },
    update: function(origInvestor, updatedInvestor) {
      // var parameters = [updatedInvestor.id, updatedInvestor.name, origInvestor.id];
      // return DBA.query("UPDATE investors SET id = (?), name = (?) WHERE id = (?)", parameters);
    }
  };
})
.factory('Contracts', function(ApiService) {
  var contracts = [];
  return {
    all: function() {
      return ApiService.get("contracts").then(function(response){
        contracts = response.data;
        return contracts;
      });
    },
    remove: function(contract) {
      // var parameters = [contract.id];
      // return DBA.query("DELETE FROM contracts WHERE id = (?)", parameters);
    },
    add: function(contract) {
      ApiService.post("contracts", contract).then(function(response){
        contracts.push(response.data);
      });
    },
    get: function(contractId) {
      return ApiService.get("contracts/" + contractId).then(function(response){
        return response.data;
      });
    },
    update: function(updatedCont) {
      ApiService.update("contracts/" + updatedCont.id, updatedCont).then(function(response){
      });
    },
    total_tender: function() {
      // return DBA.query("Select TOTAL(tender_amount) as total FROM contracts").then(function(result){
      //   return DBA.getAll(result)[0].total;
      // });
    }
  };
})
.factory('Expenses', function(ApiService) {
  var expenses = [];
  return {
    all: function() {
      return ApiService.get("expenses").then(function(response){
        expenses = response.data;
        return expenses;
      });
    },
    remove: function(expense) {
      return ApiService.delete("expenses/" + expense.id).then(function(response){
        expenses.forEach(function(val, id){
          if(val.id == expense.id){
            expenses.splice(id, 1);
          }
        });
        var selected = [];
        expenses.forEach(function(val){
          if(val.contract_id == expense.contract_id){
            selected.push(val);
          }
        });
        return selected;
      });
    },
    add: function(expense) {
      ApiService.post("expenses", expense).then(function(response){
        expenses.push(response.data);
      });
    },
    get: function(expenseId) {
      return ApiService.get("expenses/" + expenseId).then(function(response){
        return response.data;
      });
    },
    total_expense: function() {
      // return DBA.query("Select TOTAL(amount) as total FROM expenses").then(function(result){
      //   return DBA.getAll(result)[0].total;
      // });
    },
    all_for: function(contract_id) {
      return this.all().then(function(res){
        var selected = [];
        res.forEach(function(val){
          if(val.contract_id == contract_id){
            selected.push(val);
          }
        });
        return selected;
      });
    },
    total_for: function(contract_id) {
      var total = 0;
      expenses.forEach(function(val){
        if(val.contract_id == contract_id){
          total += val.amount;
        }
      });
      return total;
    }
  };
});
