import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  address: string;
  phone: string;
 
}

const customerSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },

});

export const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
