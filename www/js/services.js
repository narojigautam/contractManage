angular.module('starter.services', [])

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
  var invoices = [];

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
    }
  };
});
