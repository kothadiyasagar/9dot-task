import express from 'express';
import { getCustomers, addCustomer, editCustomer, removeCustomer } from '../controllers/customerController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getCustomers);
router.post('/', protect, addCustomer);
router.put('/:id', protect, editCustomer);
router.delete('/:id', protect, removeCustomer);

export default router;
