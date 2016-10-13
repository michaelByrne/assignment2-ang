/**
 * Created by michaelbyrne on 10/11/16.
 */
(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .service('ShoppingListService',ShoppingListService);


    ToBuyShoppingController.$inject = ['ShoppingListService'];
    AlreadyBoughtShoppingController.$inject = ['ShoppingListService'];
    
    
    function AlreadyBoughtShoppingController(ShoppingListService) {
        var bought = this;
        bought.items = ShoppingListService.getBought();
        
    }
    function ToBuyShoppingController(ShoppingListService) {
        var toBuy = this;
        toBuy.message = "Keep shopping!";
        toBuy.items = ShoppingListService.getItems();
        toBuy.buyItem = function(dex){
            ShoppingListService.buyItem(dex);
            toBuy.setMessage();
        };
        toBuy.setMessage = function() {
            if (toBuy.items.length == 0){
                toBuy.message = "Everything is bought!";
            }
            else{
                toBuy.message = "Keep shopping!";
            }
        };
    }

    function ShoppingListService() {
        var service = this;

        // List of shopping items
        var items = [
            { name: "general fish", quantity: 100 },
            { name: "fish parts", quantity: 5},
            { name: "fish stix (sticks)", quantity: 5000 },
            { name: "fish legs (jk)", quantity: 10},
            { name: "fish puree", quantity: 1}
        ];
        
        var boughtItems = [];

        service.buyItem = function (itemIdex) {
            boughtItems.push(items[itemIdex]);
            items.splice(itemIdex, 1);
            
        };

        service.getItems = function () {
            console.log(items);
            return items;
        };
        
        service.getBought = function(){
            return boughtItems;
        }
    }

})();