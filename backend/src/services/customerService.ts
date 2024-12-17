import { Customer, ICustomer } from '../models/customerModel';


export const getAllCustomers = async (page: number, limit: number) => {
  const customers = await Customer.find()
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await Customer.countDocuments();

      
 
  const totalCustomers = await Customer.countDocuments();


  const totalPages = Math.ceil(totalCustomers / limit);
  return { customers, total, 
    totalPages,
  
    totalCustomers, };
};


export const createCustomer = async (customerData: ICustomer) => {
  const newCustomer = new Customer(customerData);
  await newCustomer.save();
  return newCustomer;
};


export const updateCustomer = async (id: any, customerData: Partial<ICustomer>) => {
  return await Customer.findByIdAndUpdate(id, customerData, { new: true });
};


export const deleteCustomer = async (id: string) => {
  return await Customer.findByIdAndDelete(id);
};
