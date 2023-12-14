import express from 'express';
import {
    Create, 
    ReadOne, 
    ReadAll,
    CreateBike,
    CreateEst,
    ReadAllB
} from '../controller/BlogController.js';

const router = express.Router();

router.post('/create/',Create)
router.get('/select/:rut',ReadOne);
router.get('/select',ReadAll);
router.get('/selectB/:rut_e',ReadAllB);
//router.put('/update',Update);
//router.delete('/delete',Delete);
router.post('/createE/',CreateEst);
router.post('/createB/',CreateBike);


export default router