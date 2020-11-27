import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth/google')
export class AuthGoogleController {

    @Get("/")
    @UseGuards(AuthGuard('google'))
    login() { }

    @Get('/callback')
    @UseGuards(AuthGuard('google'))
    loginCallback(@Req() req: Request, @Res() res: Response) {
        console.log(req.user)
        res.redirect('http://localhost:3000');
    }
}
