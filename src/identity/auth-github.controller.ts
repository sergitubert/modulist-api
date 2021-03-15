import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth/github')
export class AuthGithubController {

    @Get("/")
    @UseGuards(AuthGuard('github'))
    login() { }

    @Get('/callback')
    @UseGuards(AuthGuard('github'))
    loginCallback(@Req() req: Request, @Res() res: Response) {
        res.redirect('http://localhost:3000')
    }
}
