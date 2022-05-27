import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';
import { ProfileModule } from "../profile/profile.module";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import {EmailModule} from "../mail/email.module";

@Module({
    imports: [EmailModule, ProfileModule, PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [AuthService, AuthConfig, JwtStrategy],
    exports:[AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
