import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { GoogleLoginGuard } from './guards/google-login.guard';
@Controller('auth/google')
export class AuthGoogleController {

    private CLIENT_HOME_URL: string;

    constructor(private readonly configService: ConfigService) {
        this.CLIENT_HOME_URL = this.configService.get('FRONTEND_URL')
    }

    @Get("/")
    @UseGuards(GoogleLoginGuard)
    login() { }

    @Get('/callback')
    @UseGuards(GoogleLoginGuard)
    loginCallback(@Req() req: Request, @Res() res: Response) {
        res.redirect(this.CLIENT_HOME_URL);
    }

    @Get('/user')
    user(@Req() req: Request) {
        return req.user
    }

    @Get('/logout')
    logout(@Req() req: Request, @Res() res: Response) {
        req.logout();
        req.session.destroy(() => {
            res.redirect(this.CLIENT_HOME_URL);
        });
    }

}
