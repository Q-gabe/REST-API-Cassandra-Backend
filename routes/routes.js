import express from 'express';
import petController from '../controllers/pets'

const router = express.Router();

router.route('/')
    .get(petController.list)
    .post(petController.create);

router.route('/:name')
    .get(petController.show)
    .put(petController.update)
    .delete(petController.remove);

export default router;