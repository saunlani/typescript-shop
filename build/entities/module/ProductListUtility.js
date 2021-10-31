"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListUtility = void 0;
const ProductListProduct_1 = require("../ProductListProduct");
var ProductListUtility;
(function (ProductListUtility) {
    async function totalPrices(cart) {
        const cartProducts = await ProductListProduct_1.ProductListProduct.find({
            where: { productList: cart },
            relations: ['product'],
        });
        let prices = [];
        for (var i in cartProducts) {
            let price;
            if (cartProducts[i]['quantity'] > 0) {
                price = Number(cartProducts[i]['quantity']) * Number(cartProducts[i]['unitPrice']);
            }
            prices.push(price);
        }
        function total(array) {
            if (!Array.isArray(array))
                return;
            let totalNumber = 0;
            for (let i = 0, l = array.length; i < l; i++) {
                totalNumber += array[i];
            }
            return totalNumber;
        }
        return total(prices);
    }
    ProductListUtility.totalPrices = totalPrices;
})(ProductListUtility = exports.ProductListUtility || (exports.ProductListUtility = {}));
//# sourceMappingURL=ProductListUtility.js.map