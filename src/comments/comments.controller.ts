import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comments.service';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getHello(): string {
    return this.commentService.getHello();
  }
}