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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const Person_1 = require("./model/Person");
const ProductList_1 = require("./ProductList");
let Customer = class Customer extends Person_1.Person {
    productList;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.OneToOne)(() => ProductList_1.ProductList, productList => productList.customer),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ProductList_1.ProductList)
], Customer.prototype, "productList", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
Customer = __decorate([
    (0, typeorm_1.Entity)('customer')
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map