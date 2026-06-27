var app = angular.module("myapp" ,[]);
app.controller("mycontroller" , function($scope , $http){
    $scope.user={};
    $scope.loans=[];
    $scope.eligibleloan=[];
    $scope.submitted=false;
    $scope.errormsg="";

    $http.get("loan.json").then(function(res){
        $scope.loans = res.data.loanProducts;
    });

    $scope.getcreditclass = function(){
        if(!$scope.user.creditscore) return "";
        if($scope.user.creditscore < 500)
            return "red";
        else if($scope.user.creditscore < 800)
            return "yellow"
        else
            return "green";
    };

    $scope.check = function(){
        $scope.submitted = true;
        $scope.eligibleloan = [];
        $scope.errormsg = "";

        if($scope.user.salary <= 20000 || $scope.user.age <= 18){
            $scope.errormsg = "salary must be > 20000 and age must be > 18";
        }

        angular.forEach($scope.loans , function(loan){
            if($scope.user.age <= loan.maxAge && $scope.user.salary >= loan.minSalary && $scope.user.creditscore >= 500){
                $scope.eligibleloan.push(angular.copy(loan));
            }
        });
    };

    $scope.cal = function(loan){
        let p = loan.amount;
        let r = loan.interestRate/12/100;
        let n = loan.selectedTerm;

        let emi = (p * r * Math.pow(1 + r , n)) / (Math.pow(1 + r , n) - 1);
        loan.emi = emi;
        loan.totalpayment = emi * n;
        loan.totalinterest = loan.totalpayment - p;
    };
});