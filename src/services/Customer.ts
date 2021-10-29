import { Customer } from '../entities/Customer';

export async function findCustomer(customerId: string): Promise<Customer> {
  let foundCustomer = await Customer.findOneOrFail(parseInt(customerId));
  return foundCustomer;
}