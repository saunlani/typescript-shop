import { Product } from '../entities/Product'

// Find product -- can probably update this to replace the other "getProductsWith..." funnctions.
export async function findProduct(id?: number, title?: string, description?: string, photo?: string, price?: number): Promise<Product> {

    try {
        let foundProduct = await Product.findOneOrFail(id);
        return foundProduct;
    }
    catch {
        throw Error('Product not found')
    }
}

// Find product by ID.
export async function findProductById(id: number): Promise<Product> {

    try {
        let foundProduct = await Product.findOneOrFail(id);
        return foundProduct;
    }
    catch {
        throw Error('Product not found')
    }
}

// Get all products.
export async function getAllProducts(): Promise<Product[]> {

    let products = await Product.createQueryBuilder()
        .select('product')
        .from(Product, 'product')
        .getMany();

    return products;
}

// Get products with title.
export async function getProductsWithTitle(title: string): Promise<Product[]> {

    const foundProducts = await Product.createQueryBuilder()
        .select('product')
        .from(Product, 'product')
        .where('LOWER(product.title) like LOWER(:title)', { title: `%${title}%` })
        .getMany();

        return foundProducts;
}

// Get products with description
export async function getProductsWithDescription(description: string): Promise<Product[]> {

    const foundProducts = await Product.createQueryBuilder()
        .select('product')
        .from(Product, 'product')
        .where('LOWER(product.description) like LOWER(:description)', { description: `%${description}%` })
        .getMany();
        return foundProducts;
}

// Get products with description and title
export async function getProductsWithDescriptionAndTitle(description: string, title: string): Promise<Product[]> {

    const foundProducts = await Product.createQueryBuilder()
        .select('product')
        .from(Product, 'product')
        .where('LOWER(product.description) like LOWER(:description) AND LOWER(product.title) like LOWER(:title)', { description: `%${description}%`, title: `%${title}%` })
        .getMany();
        return foundProducts;
}

// Update product.
export async function updateProduct(id: number, title?: string, description?: string, photo?: string, price?: number): Promise<Product> {

    let productToUpdate: Product;
    try {
        productToUpdate = await Product.findOneOrFail(id);
    }
    catch (error) {
        throw Error('Product not found.')
    }
    if (title) {
        productToUpdate.title = title;
    }
    if (description) {
        productToUpdate.description = description;
    }
    if (photo) {
        productToUpdate.photo = photo;
    }
    if (price) {
        productToUpdate.price = price;
    }
    await productToUpdate.save();
    return productToUpdate
}

// Create product.
export async function createProduct(title: string, description: string, photo: string, price: number): Promise<Product> {
    try {
        const product = Product.create({ title, description, photo, price });
        await product.save();
        return product;
    }
    catch {
        throw Error('Problem creating product.')
    }
}
