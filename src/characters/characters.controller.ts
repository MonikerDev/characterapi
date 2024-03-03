import { Request, RequestHandler, Response } from "express";
import { Character } from "./characters.model";
import * as characterDao from './characters.dao';
import { OkPacket } from "mysql";

export const readCharacters : RequestHandler = async (req: Request, res: Response) => {
    try{
        let characters;
        let characterid = parseInt(req.params.characterId as string);

        if(Number.isNaN(characterid)){
            characters = await characterDao.readCharacters();
        }
        else{
            characters = await characterDao.readCharacterById(characterid);
        }
        
        res.status(200).json(characters);
    }
    catch (error){
        console.error('[characters.controller][readcharacters][Error]', error);
        res.status(500).json({
            message: 'There was an error fetching characters'
        });
    }
};

export const addCharacter : RequestHandler = async (req : Request, res : Response) => {
    try{
        
        console.log('req.body', req.body);
        const okPacket : OkPacket = await characterDao.addCharacter(req.body);
        console.log('album', okPacket);

        res.status(200).json({
            okPacket
        });
    }
    catch (error){
        console.error('[characters.controller][createCharacter][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when writing characters'
                });
    }
};

export const editCharacter : RequestHandler = async (req : Request, res : Response) => {
    try{
        const okPacket : OkPacket = await characterDao.editCharacter(req.body);

        res.status(200).json({
            okPacket
        });
    }
    catch (error){
        console.error('[characters.controller][editCharacter][Error] ', error);
        res.status(500).json({
            message: 'There was an error when upating characters'
        });
    }
};

export const removeCharacter : RequestHandler = async (req : Request, res : Response) => {
    try{
        console.log(req.params.characterId as string);

        let characterId = parseInt(req.params.characterId as string);

        console.log(characterId);

        if(!Number.isNaN(characterId)){
            const response = await characterDao.removeCharacter(characterId);
        }
        else{
            throw new Error("Integer expected for character id");
        }
    }
    catch (error){
        console.error('[characterss.controller][removeCharacter][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting characters'
        });
    }
};

