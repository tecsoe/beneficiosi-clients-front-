const isAllRated = (products, productsRateds) => {
    for (let index = 0; index < products.length; index++) {
        const product = products[index];
        if (!productsRateds.includes(product.productId)) {
            return false;
        }
        return true;
    }
}

export default isAllRated;