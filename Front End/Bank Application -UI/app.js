var app=angular.module('app',['ngRoute','angularUtils.directives.dirPagination']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './src/authentication/adminLogin.html',
        controller: 'adminLoginController'
    }).when('/operatorLogin',{
        templateUrl: './src/authentication/operatorLogin.html',
        controller: 'operatorLoginController'
    }).when('/adminDashboard', {
            templateUrl: './src/dashboard/adminDashboard.html',
            controller: 'adminController'
    }).when('/registerUser', {
        templateUrl: './src/authentication/registerUser.html',
        controller: 'registerController'
    }).when('/userDashboard', {
        templateUrl: './src/dashboard/userDashboard.html',
        controller: 'userController'
    }).when('/newApplication', {
        templateUrl: './src/application/newApplication.html',
        controller: 'newApplicationController'
    }).when('/search', {
        templateUrl: './src/application/search.html',
        controller: 'searchController'
    }).when('/userNewApplication',{
        templateUrl: './src/application/userNewApplication.html',
        controller: 'userNewApplicationController'
    }).when('/applications', {
        templateUrl: './src/application/Applications.html',
        controller: 'applicationController'
    }).when('/applicationsUser', {
        templateUrl: './src/application/ApplicationsUser.html',
        controller: 'applicationUserController'
    }).when('/users',{
        templateUrl: './src/authentication/users.html',
        controller: 'usersController'
    }).when('/viewApplication',{
        templateUrl: './src/application/viewApplication.html',
        controller: 'viewController'
    }).when('/userView', {
        templateUrl: './src/application/userView.html',
        controller: 'userViewController'
    })
     .otherwise({
         template: '404'
     })
});

app.controller('adminLoginController' , function($scope,$location,$http) {
    $scope.goToOperatorLogin = function () {
        $location.path('/operatorLogin');
    };

    $scope.adminLogin = function () {
        $scope.loader = true;
        var username = $scope.username;
        var password = $scope.password;
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/adminLogin',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'username='+username+'&password='+password
        }).then(function(response) {
            $scope.loader = false;
            if(response.data == 'done'){
                $location.path('/adminDashboard');
            }else {
                alert("Wrong Credentials!");
            }

        });
    };
});

app.controller('operatorLoginController' , function($scope, $location, $http) {
    $scope.goToAdminLogin = function () {
    $location.path('/');
    };

    $scope.userLogin = function () {
        $scope.loader = true;
        var username = $scope.username;
        var password = $scope.password;
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/userLogin',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'username='+username+'&password='+password
        }).then(function(response) {
            $scope.loader = false;
            if(response.data == 'done'){
                $location.path('/userDashboard');
            }else {
                alert("Wrong Credentials!");
            }

        });
    };
});

app.controller('adminController', function ($scope,$location) {
    $scope.addUser = function () {
       $location.path('/users') ;
    }
    $scope.logOut = function () {
        $location.path('/');
    }
    $scope.application = function () {
        $location.path('/applications');
    }
});

app.controller('registerController', function ($scope,$location,$http) {
    $scope.roleList = [
        {jobRole: 'Admin'},
        {jobRole: 'User'}
    ];
    $scope.register = function () {
        $scope.loader = true;
        var username = $scope.username;
        var password = $scope.password;
        var name = $scope.name;
        var nic = $scope.nic;
        var jobRole = $scope.role;
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/register',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'username='+username+'&password='+password+'&jobRole='+jobRole+'&name='+name+'&nic='+nic
        }).then(function(response) {
            if(response.data == 'done'){
                $scope.loader = false;
                alert("User Registered!!");
                $location.path('/users');
            }

        });
    };
    $scope.back = function () {
        $location.path('/users');
    }
});

app.controller('userController', function ($scope,$location, $http) {
    $scope.logOut = function () {
        $location.path('/operatorLogin');
    }
    $scope.application = function () {
        $location.path('/applicationsUser');
    }
});

app.controller('newApplicationController', function ($scope, $location, $http) {
    $scope.creditList = [
        {score: 1},
        {score: 0}
    ];
    $scope.addApplication = function () {
        $scope.loader = true;
        var nic = $scope.nic;
        var income = $scope.income;
        var co_income = $scope.co_income;
        var amount = $scope.amount;
        var credit = $scope.credit;
        var gender = $scope.gender;
        var education = $scope.education;
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/newApplication',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'nic='+nic+'&income='+income+'&co_income='+co_income+'&amount='+amount+'&credit='+credit+'&gender='+gender+'&education='+education
        }).then(function(response) {
            if(response.data == 'done'){
                $scope.loader = false;
                alert("New Application Registered!!");
                $location.path('/applications')
            }

        });
    };
    $scope.back = function () {
        $location.path('/applications');
    }
});

app.controller('userNewApplicationController', function ($scope, $location, $http) {
    $scope.creditList = [
        {score: 1},
        {score: 0}
    ];
    $scope.addApplication = function () {
        $scope.loader = true;
        var nic = $scope.nic;
        var income = $scope.income;
        var co_income = $scope.co_income;
        var amount = $scope.amount;
        var credit = $scope.credit;
        var gender = $scope.gender;
        var education = $scope.education;
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/newApplication',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'nic='+nic+'&income='+income+'&co_income='+co_income+'&amount='+amount+'&credit='+credit+'&gender='+gender+'&education='+education
        }).then(function(response) {
            if(response.data == 'done'){
                $scope.loader = false;
                alert("New Application Registered!!");
                $location.path('/applicationsUser');
            }

        });
    };
    $scope.back = function () {
        $location.path('/applicationsUser');
    }
});

app.controller('applicationController', function ($scope, $location, $http, $rootScope) {
    $scope.applications = [];
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/applications',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function(response) {
        $scope.applications = response.data;
    });

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.back = function () {
        $location.path('/adminDashboard');
    }

    $scope.newApplication = function () {
        $location.path('/newApplication');
    }

    $scope.putId = function (id) {
        $rootScope.id = id;
        $location.path('/viewApplication');
    }

    $scope.export = function () {
        $("#applications").table2excel({
            filename: "Applications.xls"
        });
    }

    $scope.makePdf = function (id) {
        $scope.education = null;
        $scope.gender = null;
        $scope.prediction = null;
        $scope.creditscore = null;
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/search',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'id='+id
        }).then(function(response) {
            if(response.data[0].Education === 0){
                $scope.education = 'Non-Graduate';
            } else {
                $scope.education = 'Graduate';
            }

            if(response.data[0].Gender === 0){
                $scope.gender = 'Female';
            } else{
                $scope.gender = 'Male';
            }

            if(response.data[0].Prediction === "0"){
                $scope.prediction = 'Not-Eligible';
            } else if(response.data[0].Prediction === "1"){
                $scope.prediction = 'Eligible';
            } else{
                $scope.prediction = 'Pending';
            }

            if(response.data[0].CreditScore === 0){
                $scope.creditscore = 'False';
            } else{
                $scope.creditscore = 'True';
            }

            var docDef = {
                content: [
                    {text: 'Bank Loan Application', style: 'header'},
                    {text: 'Application Id : '+ response.data[0].Id, style: 'body'},
                    {text: 'Applicant NIC : '+response.data[0].NIC+'V',style: 'body'},
                    {text: 'Applicant Income : '+response.data[0].Income,style: 'body'},
                    {text: 'Co-Applicant Income : '+response.data[0].CoIncome,style: 'body'},
                    {text: 'Loan Amount : '+response.data[0].Amount,style: 'body'},
                    {text: 'Credit Score : '+$scope.creditscore,style: 'body'},
                    {text: 'Education Level : '+$scope.education,style: 'body'},
                    {text: 'Gender : '+$scope.gender,style: 'body'},
                    {text: 'Eligibility Prediction : '+$scope.prediction,style: 'body'},
                    {text: 'Loan Status : '+response.data[0].Status,style: 'body'},
                ],
                styles: {
                    header: {
                        fontSize: 22,
                        bold: true,
                        alignment: 'center',
                        lineHeight: 3
                    },
                    body: {
                        fontSize: 12,
                        bold: false,
                        alignment: 'left',
                        lineHeight: 2
                    }
                }
            }
            pdfMake.createPdf(docDef).download();
        });
    }
});

app.controller('applicationUserController', function ($scope, $location, $http, $rootScope) {
    $scope.applications = [];
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/applications',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function(response) {
        $scope.applications = response.data;
    });

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.back = function () {
        $location.path('/userDashboard');
    }

    $scope.newApplication = function () {
        $location.path('/userNewApplication');
    }

    $scope.putId = function (id) {
        $rootScope.id = id;
        $location.path('/userView');
    }

    $scope.export = function () {
        $("#applications").table2excel({
            filename: "Applications.xls"
        });
    };
    
    $scope.makePdf = function (id) {
        $scope.education = null;
        $scope.gender = null;
        $scope.prediction = null;
        $scope.creditscore = null;
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/search',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'id='+id
        }).then(function(response) {
            if(response.data[0].Education === 0){
                $scope.education = 'Non-Graduate';
            } else {
                $scope.education = 'Graduate';
            }

            if(response.data[0].Gender === 0){
                $scope.gender = 'Female';
            } else{
                $scope.gender = 'Male';
            }

            if(response.data[0].Prediction === "0"){
                $scope.prediction = 'Not-Eligible';
            } else if(response.data[0].Prediction === "1"){
                $scope.prediction = 'Eligible';
            } else{
                $scope.prediction = 'Pending';
            }

            if(response.data[0].CreditScore === 0){
                $scope.creditscore = 'False';
            } else{
                $scope.creditscore = 'True';
            }

            var docDef = {
                content: [
                    {text: 'Bank Loan Application', style: 'header'},
                    {text: 'Application Id : '+ response.data[0].Id, style: 'body'},
                    {text: 'Applicant NIC : '+response.data[0].NIC+'V',style: 'body'},
                    {text: 'Applicant Income : '+response.data[0].Income,style: 'body'},
                    {text: 'Co-Applicant Income : '+response.data[0].CoIncome,style: 'body'},
                    {text: 'Loan Amount : '+response.data[0].Amount,style: 'body'},
                    {text: 'Credit Score : '+$scope.creditscore,style: 'body'},
                    {text: 'Education Level : '+$scope.education,style: 'body'},
                    {text: 'Gender : '+$scope.gender,style: 'body'},
                    {text: 'Eligibility Prediction : '+$scope.prediction,style: 'body'},
                    {text: 'Loan Status : '+response.data[0].Status,style: 'body'},
                ],
                styles: {
                    header: {
                        fontSize: 22,
                        bold: true,
                        alignment: 'center',
                        lineHeight: 3
                    },
                    body: {
                        fontSize: 12,
                        bold: false,
                        alignment: 'left',
                        lineHeight: 2
                    }
                }
            }
            pdfMake.createPdf(docDef).download();
        });
    }
});

app.controller('usersController', function ($scope, $location, $http) {
    $scope.users = [];
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/allUsers',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function(response) {
        $scope.users = response.data;
    });

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.back = function () {
        $location.path('/adminDashboard');
    }

    $scope.newUser = function () {
        $location.path('/registerUser');
    }
});

app.controller('viewController', function ($scope, $rootScope, $location, $http) {
    $scope.approveBtn = false;
    $scope.rejectBtn = false;
    $http({
        method: 'POST',
        url: 'http://localhost:3000/api/search',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: 'id='+$rootScope.id
    }).then(function(response) {
        $scope.data = response.data;
        if(response.data[0].Prediction == '0' || response.data[0].Prediction == 'Pending' || response.data[0].Status == 'Approved' || response.data[0].Status == 'Rejected'){
            $scope.approveBtn = true;
            $scope.rejectBtn = true;
        }
    });

    $scope.Approve = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/approveLoan',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'id='+$rootScope.id
        }).then(function(response) {
            if(response.data == 'done'){
                alert("Application Approved!");
                $location.path('/applications');
            }
        });

    };

    $scope.Reject = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/rejectLoan',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'id='+$rootScope.id
        }).then(function(response) {
            if(response.data == 'done'){
                alert("Application Rejected!");
                $location.path('/applications');
            }
        });

    };
});

app.controller('userViewController', function ($scope, $rootScope, $location, $http) {
    $http({
        method: 'POST',
        url: 'http://localhost:3000/api/search',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: 'id='+$rootScope.id
    }).then(function(response) {
        $scope.data = response.data;
    });
});

