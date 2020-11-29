import { CommentService } from './comments.service';
import { Request } from 'express';
export declare class CommentController {
    private readonly commentService;
    private readonly request;
    constructor(commentService: CommentService, request: Request);
    createComment(routeParameterDTO: any, commentWriteDTO: any): any;
    deleteComment(routeParameterDTO: any): any;
    updateComment(routeParameterDTO: any, commentWriteDTO: any): any;
    getComment(routeParameterDTO: any): any;
}
