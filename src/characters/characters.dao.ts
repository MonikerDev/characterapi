import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Character } from "./characters.model";
import { characterQueries } from "./characters.queries";

export const readCharacters = async () => {
    return execute<Character[]>(characterQueries.readCharacters, []);
};

export const readCharacterById = async (characterId: number) => {
    return execute<Character[]>(characterQueries.readCharacterById, [characterId]);
};

export const addCharacter = async (character : Character) => {
    return execute<OkPacket>(characterQueries.addCharacter, 
        [character.name, character.playerName, character.height, 
        character.weight, character.backstory, character.race, character.class,
        character.level, character.strength, character.dexterity,
        character.constitution, character.intelligence, character.wisdom, character.charisma,
        character.profficiencyBonus, character.armorClass]);
};

export const editCharacter = async (character: Character) => {
    return execute<OkPacket>(characterQueries.editCharacter, 
        [character.name, character.playerName, character.height, 
        character.weight, character.backstory, character.race, character.class,
        character.level, character.strength, character.dexterity,
        character.constitution, character.intelligence, character.wisdom, character.charisma,
        character.profficiencyBonus, character.armorClass, character.characterId])
}

export const removeCharacter = async (characterId : number) => {
    return execute<OkPacket>(characterQueries.removeCharacter, [characterId]); 
};