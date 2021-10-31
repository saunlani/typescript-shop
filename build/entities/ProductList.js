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
exports.ProductList = void 0;
const typeorm_1 = require("typeorm");
const ProductListProduct_1 = require("./ProductListProduct");
const Customer_1 = require("./Customer");
let ProductList = class ProductList extends typeorm_1.BaseEntity {
    id;
    type;
    customerId;
    cardNumber;
    customer;
    productListProduct;
    total;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductList.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], ProductList.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProductList.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, customer => customer.productList),
    __metadata("design:type", Customer_1.Customer)
], ProductList.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => ProductListProduct_1.ProductListProduct, productListProduct => productListProduct.productList),
    __metadata("design:type", Array)
], ProductList.prototype, "productListProduct", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ProductList.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductList.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductList.prototype, "updatedAt", void 0);
ProductList = __decorate([
    (0, typeorm_1.Entity)('productList')
], ProductList);
exports.ProductList = ProductList;
//# sourceMappingURL=ProductList.js.map