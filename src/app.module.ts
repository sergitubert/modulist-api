import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './identity/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['env/.env']
        }),
        // MongooseModule.forRootAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => ({ uri: configService.get('MONGODB_URL') })
        // }),
        // MongooseModule.forFeature([
        //     {
        //         name: User.name,
        //         schema: UserSchema
        //     },
        // ]),
        AuthModule,
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
