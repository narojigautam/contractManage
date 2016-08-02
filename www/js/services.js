angular.module('starter.services', [])
.factory('authorizationInterceptor', function($window) {
  return {
    request: function (config) {
      var token = $window.localStorage['contractManageToken'];
      var client = $window.localStorage['contractManageClient'];
      var uid = $window.localStorage['contractManageUid'];
      config.headers = config.headers || {};
      if (token) {
        config.headers['access-token'] = token;
        config.headers['client'] = client;
        config.headers['uid'] = uid;
      }
      return config;
    }
  };
})
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authorizationInterceptor');
}])
.factory('ApiService', function($http, $window) {
  var api_endpoint = 'http://contracts-api.herokuapp.com/api/'
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
      var total = 0;
      investments.forEach(function(val){
        if(val.investor_id != null){
          total += val.amount;
        }
      });
      return total;
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
      var total = 0;
      investments.forEach(function(val){
        if(val.investor_id == id){
          total += val.amount;
        }
      });
      return total;
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
      return ApiService.delete("investors/" + investor.id).then(function(response){
        investors.forEach(function(val, id){
          if(val.id == investor.id){
            investors.splice(id, 1);
          }
        });
      });
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
      var total = 0;
      contracts.forEach(function(val){
        total += parseInt(val.tender_amount);
      });
      return total;
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
      var total = 0;
      expenses.forEach(function(val){
        total += val.amount;
      });
      return total;
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
})
.factory('LoginService', function($q, $window, $http, ApiService) {
    return {
        loginUser: function(name, pw) {
            return ApiService.post("auth/sign_in", {email: name, password: pw}).then(function(response){
              $window.localStorage['contractManageToken'] = response.headers("access-token");
              $window.localStorage['contractManageUid'] = response.headers("uid");
              $window.localStorage['contractManageClient'] = response.headers("client");
              return response;
            }, function(response){
              return response;
            });
        },
        validateToken: function(){
          var token = $window.localStorage['contractManageToken'];
          var client = $window.localStorage['contractManageClient'];
          var uid = $window.localStorage['contractManageUid'];
          return ApiService.get("auth/validate_token.json?uid=" + uid + "&client=" + client + "&access-token=" + token).then(function(response) {
            return response;
          }, function(response) {
            return response;
          });
        }
    }
});
