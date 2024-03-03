import { Request, Response, Router } from "express";
import * as ArtistController from "./artists.controller";

const router = Router();
router
    .route('/artists')
    .get(ArtistController.readArtists);

export default router;