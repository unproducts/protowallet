export const EntityCreationException = (entityName: string) => new GeneralProtoException(`Failed to create ${entityName}`);
export const EntityUpdateException = (entityName: string) => new GeneralProtoException(`Failed to update ${entityName}`);
export const EntityNotValidException = (entityName: string, entityItself: any) => new GeneralProtoException(`${entityName} not valid. ${JSON.stringify(entityItself)}}`);
export const EntityNotFoundException = (entityName: string, entityId: number) => new GeneralProtoException(`${entityName} with id ${entityId} not found`);

export class GeneralProtoException extends Error {
    constructor(message: string) {
        super(message);
    }
}
