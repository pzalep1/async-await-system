import { Request } from 'express';
import { IdeaService } from './ideas.service';
export declare class IdeaController {
    private readonly ideaService;
    private readonly request;
    constructor(ideaService: IdeaService, request: Request);
    createIdea(routeParameterDTO: any, ideaWriteDTO: any): any;
    updateIdea(routeParameterDTO: any, ideaWriteDTO: any): any;
    getIdea(routeParameterDTO: any): any;
    changeState(routeParameterDTO: any, ideaWriteDTO: any): any;
    deleteIdea(routeParameterDTO: any): any;
    getComments(routeParameterDTO: any): any;
}
