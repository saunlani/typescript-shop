import { ProductListProduct } from "../ProductListProduct"
import { ProductList } from "../ProductList";

// This module is to be use/re-used for any redundant tasks related to processing ProductLists as carts and/or orders.

export module ProductListUtility {

    // Accept a ProductList and create a total/sum.

    export async function totalPrices(cart: ProductList) {

        const cartProducts = await ProductListProduct.find({
            where: { productList: cart },
            relations: ['product'],
        })

        // Instantiate prices array of the number type.
        let prices: number[] = [];

        // Push all product prices to the array.
        for (var i in cartProducts) {
            var price = Number(cartProducts[i]['quantity']) * Number(cartProducts[i]['unitPrice']);
            prices.push(price);
        }

        // POTENTIAL TO-DO: Could identify account country/state/origin and establish tax here; would just add the country/state/origin to the Customer entity.

        // Total all prices in prices array and return it.
        function total(array: number[]) {
            if (!Array.isArray(array)) return;
            let totalNumber = 0;
            for (let i = 0, l = array.length; i < l; i++) {
                totalNumber += array[i];
            }
            return totalNumber;
        }
        return total(prices);
    }
}




