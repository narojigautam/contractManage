angular.module('starter.services', [])

.factory('Contracts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var contracts = [{
    id: 1,
    name: "Siolim Bridge",
    description: "Bridge to connect Siolim and Chopdem"
  }];

  return {
    all: function() {
      return contracts;
    },
    remove: function(contract) {
      contracts.splice(contracts.indexOf(contract), 1);
    },
    add: function(contract) {
      contract.id = contracts.length + 1;
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
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var investors = [];

  return {
    all: function() {
      return investors;
    },
    remove: function(investor) {
      investors.splice(investors.indexOf(investor), 1);
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
.factory('Invoices', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var invoices = [{
    id: 1,
    contract_id: 1,
    name: "Investment",
    description: "Invested by Vasu Niloji",
    type: "investment",
    amount: 10000
  }];

  return {
    all: function() {
      return invoices;
    },
    remove: function(invoice) {
      invoices.splice(invoices.indexOf(invoice), 1);
    },
    add: function(invoice) {
      invoice.id = invoices.length + 1;
      invoices.push(invoice);
    },
    get: function(invoiceId) {
      for (var i = 0; i < invoices.length; i++) {
        if (invoices[i].id === parseInt(invoiceId)) {
          return invoices[i];
        }
      }
      return null;
    },
    forContract: function(contractId) {
      resp = [];
      for (var i = 0; i < invoices.length; i++) {
        if (invoices[i].contract_id === parseInt(contractId)) {
          resp.push(invoices[i]);
        }
      }
      return resp;
    }
  };
});
