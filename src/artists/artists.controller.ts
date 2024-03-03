import { Request, Response } from "express";
import * as ArtistDao from './artists.dao';
import { RequestHandler } from "express-serve-static-core";

export const readArtists: RequestHandler = async (req: Request, res: Response) => {
    try{
        const artists = await ArtistDao.readArtists();

        res.status(200).json(artists);
    }
    catch (error){
        console.error('[artists.controller][readArtists][Error] ', error);
        res.status(500).json({
            message: "There was an error reading all artists"
        });
    }
};