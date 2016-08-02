angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
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
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  $urlRouterProvider.otherwise('/login');
});
