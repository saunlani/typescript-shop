"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomer = exports.getCustomers = exports.findCustomer = exports.createCustomer = exports.checkForExistingEmail = void 0;
const Customer_1 = require("../entities/Customer");
async function checkForExistingEmail(email) {
    const existingCustomer = await Customer_1.Customer.createQueryBuilder("Customer")
        .where("Customer.email = :email", { email: email })
        .getOne();
    if (existingCustomer) {
        return true;
    }
    else {
        return false;
    }
}
exports.checkForExistingEmail = checkForExistingEmail;
async function createCustomer(firstName, lastName, email, cardNumber) {
    let existingEmail = await checkForExistingEmail(email);
    if (existingEmail) {
        throw Error("Customer not created. A customer with this email already exists.");
    }
    else {
        const customer = Customer_1.Customer.create({ firstName, lastName, email, active: true, cardNumber });
        await customer.save();
        return customer;
    }
}
exports.createCustomer = createCustomer;
async function findCustomer(customerId) {
    try {
        let foundCustomer = await Customer_1.Customer.findOneOrFail((customerId));
        return foundCustomer;
    }
    catch {
        throw Error('Customer not found');
    }
}
exports.findCustomer = findCustomer;
async function getCustomers() {
    const customers = await Customer_1.Customer.createQueryBuilder()
        .select('customer')
        .from(Customer_1.Customer, 'customer')
        .getMany();
    if (customers.length === 0) {
        throw Error('No products found.');
    }
    return customers;
}
exports.getCustomers = getCustomers;
async function updateCustomer(id, active, firstName, lastName, email, cardNumber) {
    if (email) {
        let existingEmail = await checkForExistingEmail(email);
        if (existingEmail) {
            throw Error("Customer not updated: A customer with this email already exists.");
        }
    }
    const partialCustomer = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        active: active,
        email: email,
        cardNumber: cardNumber
    };
    try {
        let customer = await Customer_1.Customer.preload(partialCustomer);
        if (customer) {
            await customer.save();
            return customer;
        }
        else {
            throw Error('Problem experienced while updating customer.');
        }
    }
    catch {
        throw Error('Problem experienced while updating customer.');
    }
}
exports.updateCustomer = updateCustomer;
//# sourceMappingURL=Customer.js.map