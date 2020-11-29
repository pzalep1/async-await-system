import { VotesService } from './votes.service';
import { Request } from 'express';
export declare class VotesController {
    private readonly voteService;
    private readonly request;
    constructor(voteService: VotesService, request: Request);
    getVotes(routeParameterDTO: any): any;
    addVote(routeParameterDTO: any, voteWriteDTO: any): any;
    deleteVote(routeParameterDTO: any): any;
    updateVote(routeParameterDTO: any, voteWriteDTO: any): any;
}
