var app = angular.module("app", []);

app.controller("ctrl", function($scope, $http){

    $scope.products = [];
    $scope.cart = [];
    $scope.discount = 0;

    // ✅ LOAD JSON
    $http.get("product.json").then(function(res){
        console.log(res.data); // debug
        $scope.products = res.data.products;
    });

    // ✅ ADD TO CART
    $scope.addToCart = function(p){
        let item = $scope.cart.find(x => x.id === p.id);

        if(item){
            item.qty++;
        } else {
            $scope.cart.push({...p, qty:1});
        }

        p.stockAvailable--;
    };

    // ❌ FIXED: don't use stockAvailable in cart
    $scope.inc = function(c){
        c.qty++;
    };

    $scope.dec = function(c){
        if(c.qty > 1){
            c.qty--;
        }
    };

    // ✅ SUBTOTAL
    $scope.subtotal = function(){
        return $scope.cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
    };

    // ✅ DISCOUNT
    $scope.applyPromo = function(){
        let total = $scope.subtotal();
        $scope.discount = 0;

        if(total >= 5000){
            $scope.discount += total * 0.10;
        }

        let fruits = $scope.cart.filter(c => c.category === "Fruits");
        if(fruits.length > 3){
            $scope.discount += total * 0.05;
        }

        if($scope.promo === "SAVE20" && total >= 8000){
            $scope.discount += total * 0.20;
        }

        if($scope.promo === "FRESH5"){
            let count = $scope.cart.reduce((s,c)=> s + c.qty,0);
            if(count > 5){
                $scope.discount += 200;
            }
        }
    };

    // ✅ FINAL
    $scope.finalAmount = function(){
        return $scope.subtotal() - $scope.discount;
    };

});