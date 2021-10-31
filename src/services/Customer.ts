import { Customer } from '../entities/Customer';

// Check for an existing email associated with a customer.
export async function checkForExistingEmail(email: string): Promise<boolean> {

  const existingCustomer = await Customer.createQueryBuilder("Customer")
    .where("Customer.email = :email", { email: email })
    .getOne();

  if (existingCustomer) {
    return true;
  }
  else {
    return false;
  }
}

// Create a customer.
export async function createCustomer(firstName: string, lastName: string, email: string, cardNumber: string): Promise<Customer> {

  let existingEmail = await checkForExistingEmail(email);

  if (existingEmail) {
    throw Error("Customer not created. A customer with this email already exists.");
  }
  else {
    const customer = Customer.create({ firstName, lastName, email, active: true, cardNumber });
    await customer.save();
    return customer;
  }
}

// Find individual customer.
export async function findCustomer(customerId: number): Promise<Customer> {

  try {
    let foundCustomer = await Customer.findOneOrFail((customerId));
    return foundCustomer;
  }
  catch {
    throw Error('Customer not found')
  }
}

// Find all customers.
export async function getCustomers(): Promise<Customer[]> {
  const customers = await Customer.createQueryBuilder()
    .select('customer')
    .from(Customer, 'customer')
    .getMany()

  if (customers.length === 0) {
    throw Error('No products found.')
  }
  return customers;
}

// Updates customer.
export async function updateCustomer(id: number, active?: boolean, firstName?: string, lastName?: string, email?: string, cardNumber?: string): Promise<Customer> {

  // Email is a unique field, so first attempt to find an existing customer with the provided email first.
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
  }

  try {
    let customer = await Customer.preload(partialCustomer);
    if (customer) {
      await customer.save();
      return customer;
    }
    else {
      throw Error('Problem experienced while updating customer.')
    }
  }
  catch {
    throw Error('Problem experienced while updating customer.')
  }
}