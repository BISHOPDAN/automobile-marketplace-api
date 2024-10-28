import { Router } from 'express';
import carRoutes from './car.routes';
const router = Router();

router.use('/cars', carRoutes);

export default router;