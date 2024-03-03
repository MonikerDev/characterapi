import { Router } from "express";
import * as CharacterController from './characters.controller';

const router = Router();
router
    .route('/characters')
    .get(CharacterController.readCharacters);
router
    .route('/characters')
    .post(CharacterController.addCharacter)
router
    .route('/characters')
    .put(CharacterController.editCharacter);
router
    .route('/characters:characterId')
    .delete(CharacterController.removeCharacter);

export default router;