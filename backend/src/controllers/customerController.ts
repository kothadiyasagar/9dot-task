import { Request, Response } from 'express';
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';
import mongoose from 'mongoose';

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await getAllCustomers(page, limit);

    res.json({...data,  currentPage: page});
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || 'Something went wrong' });
  }
};

  
export const addCustomer = async (req: Request, res: Response) => {
  try {
  
    const newCustomerData = {
      ...req.body,
    };

   
    const newCustomer = await createCustomer(newCustomerData);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message || 'Failed to create customer',
    });
  }
};

export const editCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;

    // Validate and convert to ObjectId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: 'Invalid customer ID' });
    }
    const objectId = new mongoose.Types.ObjectId(customerId);
    const updatedCustomer = await updateCustomer(objectId, req.body);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || 'Failed to update customer' });
  }
};

export const removeCustomer = async (req: Request, res: Response) => {
  try {
    await deleteCustomer(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || 'Failed to delete customer' });
  }
};
