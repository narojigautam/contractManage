// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, Investors) { //, $cordovaSQLite
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // if(window.cordova) {
    //   db = $cordovaSQLite.openDB("contractManage.db", "1.0", "ContractMgr", -1);
    // } else {
    //   db = window.openDatabase("contractManage.db", "1.0", "ContractMgr", -1);
    // }

    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS investors (id integer primary key, name text)");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS investments (id integer primary key, investor_id integer, amount integer, date datetime, description text)");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS contracts (id integer primary key, name text, tender_amount integer, date datetime, description text, profit_amount integer, bill_amount integer)");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS expenses (id integer primary key, name text, description text, amount integer, date datetime, contract_id integer)");
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.investments', {
    url: '/investments',
    views: {
      'tab-investors': {
        templateUrl: 'templates/tab-investments.html',
        controller: 'InvestmentsCtrl'
      }
    }
  })
  .state('tab.investment-new', {
    url: '/investors/:investorId/investments/new',
    views: {
      'tab-investors': {
        templateUrl: 'templates/investment-new.html',
        controller: 'InvestmentNewCtrl'
      }
    }
  })
  .state('tab.contracts', {
      url: '/contracts',
      views: {
        'tab-contracts': {
          templateUrl: 'templates/tab-contracts.html',
          controller: 'ContractsCtrl'
        }
      }
    })
  .state('tab.contract-new', {
    url: '/contracts/new',
    views: {
      'tab-contracts': {
        templateUrl: 'templates/contract-new.html',
        controller: 'ContractNewCtrl'
      }
    }
  })
  .state('tab.expense-new', {
    url: '/contracts/:contractId/expenses/new',
    views: {
      'tab-contracts': {
        templateUrl: 'templates/expense-new.html',
        controller: 'ExpenseNewCtrl'
      }
    }
  })
  .state('tab.contract-detail', {
    url: '/contracts/:contractId',
    views: {
      'tab-contracts': {
        templateUrl: 'templates/contract-detail.html',
        controller: 'ContractDetailCtrl'
      }
    }
  })
  .state('tab.investors', {
    url: '/investors',
    views: {
      'tab-investors': {
        templateUrl: 'templates/tab-investors.html',
        controller: 'InvestorsCtrl'
      }
    }
  })
  .state('tab.investor-new', {
    url: '/investors/new',
    views: {
      'tab-investors': {
        templateUrl: 'templates/investor-new.html',
        controller: 'InvestorNewCtrl'
      }
    }
  })
  .state('tab.investor-detail', {
    url: '/investors/:investorId',
    views: {
      'tab-investors': {
        templateUrl: 'templates/investor-detail.html',
        controller: 'InvestorDetailCtrl'
      }
    }
  })
  .state('tab.profit', {
    url: '/profit',
    views: {
      'tab-profit': {
        templateUrl: 'templates/profit.html',
        controller: 'ProfitCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/investors');

});
