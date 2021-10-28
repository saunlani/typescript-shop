import { Customer } from '../entities/Customer';

export class CustomerService {

    public async findCustomer(customerId: string) : Promise<Customer> {
        let foundCustomer = await Customer.findOneOrFail(parseInt(customerId));
        return foundCustomer;
      }

    }