import { Injectable } from 'idea-service/node_modules/@nestjs/common';
import { AuthGuard } from 'idea-service/node_modules/@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}