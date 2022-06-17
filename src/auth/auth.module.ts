import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';
import { ProfileModule } from "../profile/profile.module";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import {EmailModule} from "../mail/email.module";
import { Code, CodeSchema } from "./schema/code.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [EmailModule, ProfileModule, PassportModule.register({ defaultStrategy: 'jwt' }), MongooseModule.forFeature([
        { name: Code.name, schema: CodeSchema },
    ]),],
    providers: [AuthService, AuthConfig, JwtStrategy],
    exports:[AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
