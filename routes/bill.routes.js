import express from 'express';
import BillController from '../controllers/bill.controller.js';

const router = express.Router();

router.route('/').get(BillController.bootstrap);
router.route('/subscriptions').get(BillController.bootstrap);
router.route('/call-charges').get(BillController.bootstrap);
router.route('/sky-store').get(BillController.bootstrap);


export default router;