import { Controller, Get, NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { UserFinder } from './domain/services/UserFinder';
import { UserId } from './domain/UserId';
import { GoogleLoginGuard } from './guards/google-login.guard';
@Controller('auth/google')
export class AuthGoogleController {

    private CLIENT_HOME_URL: string;

    constructor(private readonly configService: ConfigService, private readonly userFinder: UserFinder) {
        this.CLIENT_HOME_URL = this.configService.get('FRONTEND_URL')
    }

    @Get("/")
    @UseGuards(GoogleLoginGuard)
    login() { }

    @Get('/callback')
    @UseGuards(GoogleLoginGuard)
    loginCallback(@Req() req: Request, @Res() res: Response) {
        res.cookie('userID', req.user["_id"], { httpOnly: false, signed: false })
        res.redirect(this.CLIENT_HOME_URL);
    }

    @Get('/user')
    async user(@Req() req: Request) {
        if (!req.user) throw new NotFoundException();
        return await this.userFinder.run(new UserId(req.user["_id"]))
    }

    @Get('/logout')
    logout(@Req() req: Request, @Res() res: Response) {
        req.logout();
        req.session.destroy(() => {
            res.redirect(this.CLIENT_HOME_URL);
        });
    }

}
