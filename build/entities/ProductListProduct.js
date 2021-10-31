"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListProduct = void 0;
const typeorm_1 = require("typeorm");
const ProductList_1 = require("./ProductList");
const Product_1 = require("./Product");
let ProductListProduct = class ProductListProduct extends typeorm_1.BaseEntity {
    id;
    quantity;
    unitPrice;
    productId;
    product;
    productListId;
    productList;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductListProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductListProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductListProduct.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ProductListProduct.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Product_1.Product, product => product.productListProducts, { primary: true }),
    __metadata("design:type", Product_1.Product)
], ProductListProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ProductListProduct.prototype, "productListId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => ProductList_1.ProductList, productList => productList.productListProduct, { primary: true }),
    __metadata("design:type", ProductList_1.ProductList)
], ProductListProduct.prototype, "productList", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductListProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductListProduct.prototype, "updatedAt", void 0);
ProductListProduct = __decorate([
    (0, typeorm_1.Entity)('productlistProducts')
], ProductListProduct);
exports.ProductListProduct = ProductListProduct;
//# sourceMappingURL=ProductListProduct.js.map