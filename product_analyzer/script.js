var app = angular.module("myapp" , []);
app.controller("mycontroller" , function($scope , $http){
    $http.get("product.json") 
    .then(function(res) {
        $scope.products = res.data.products;

        $scope.categories = [...new Set($scope.products.map(p => p.category))];

        $scope.mostexp = $scope.products.reduce((a,b) =>
            $scope.finalprice(a) > $scope.finalprice(b) ? a : b
        );

        let total = $scope.products.reduce((sum , p) => sum + p.price , 0)
        $scope.avgprice = total/$scope.products.length;

        $scope.electronics = $scope.products
            .filter(p => p.category === "Electronics")
            .map(p => p.name)
            .join(",");

        $scope.mumbai = $scope.products
            .filter(p => p.city === "Mumbai")
            .map(p => p.name)
            .join(",");
    });
    
    $scope.finalprice = function(p) {
        return p.price - (p.price * p.discount) /100;
    };
    
});