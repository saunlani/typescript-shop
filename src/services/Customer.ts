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
export async function createCustomer(firstName: string, lastName: string, email: string, cardNumber: number): Promise<Customer> {

  let existingEmail = await checkForExistingEmail(email);

  if (existingEmail) {
    throw Error("Customer not created: A customer with this email already exists.");
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
  return customers;
}

// Updates customer.
export async function updateCustomer(customerId: string, active?: boolean, firstName?: string, lastName?: string, email?: string, cardNumber?: number): Promise<Customer> {

  let customerToUpdate = await Customer.findOneOrFail(parseInt(customerId));

  //  If customer valid, make necessary updates.
  if (customerToUpdate) {

    if (email) {

      // Email is a unique field, so attempt to find an existing customer with the provided email first.
      let existingEmail = await checkForExistingEmail(email);

      if (existingEmail) {
        throw Error("Customer not updated: A customer with this email already exists.");
      }
      else {
        customerToUpdate.email = email;
      }
    }
    if (active) {
      customerToUpdate.active = active;
    }
    if (firstName) {
      customerToUpdate.firstName = firstName;
    }
    if (lastName) {
      customerToUpdate.lastName = lastName;
    }
    if (cardNumber) {
      customerToUpdate.cardNumber = cardNumber;
    }

    await customerToUpdate.save();
    return customerToUpdate
  }
  else {
    throw Error('Customer not found.')
  }
}