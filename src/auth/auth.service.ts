import { AuthConfig } from './auth.config';
import {BadRequestException, forwardRef, Inject, Injectable} from '@nestjs/common';
import {
    AuthenticationDetails, CognitoUserAttribute,
    CognitoUser,
    CognitoUserPool, CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { Model, Types } from "mongoose";
import { EmailService } from "../mail/email.service";
import { AuthDto } from "./dto/auth.dto";
import { CodeDto } from "./dto/code.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Code, CodeDoc } from "./schema/code.schema";


@Injectable()
export class AuthService {
    private readonly userPool: CognitoUserPool;
    constructor(
        @Inject(forwardRef(() => AuthConfig))
        private readonly authConfig: AuthConfig,
        private readonly EmailService: EmailService,
        @InjectModel(Code.name)
        private readonly CodeModel: Model<CodeDoc>,
    ) {
        this.userPool = new CognitoUserPool({
            UserPoolId: this.authConfig.userPoolId,
            ClientId: this.authConfig.clientId,
        });
    }


    async registerUser(registerRequest: {
        name: string;
        password: string;
    }) {
        const profileId = new Types.ObjectId().toJSON()
        const { name, password } = registerRequest;
        return new Promise((resolve, reject) => {
            return this.userPool.signUp(
                name,
                password,
                [new CognitoUserAttribute({ Name: 'profile', Value: profileId })],
                null,
                (error, result) => {
                    if (!result) {
                        reject(error);
                    } else {
                        resolve(result.user);
                    }
                },
            );
        });
    }

    async sendVerificationCode(authDto: AuthDto) {
        const { name } = authDto;
        const code = this.generateRandomCode()
        try {
            await this.registerUser(authDto)
            await this.EmailService.sendCode(name, code)
            return this.saveCode(code, name)
        } catch (e) {
            if (e.name === "UsernameExistsException") {
                await this.EmailService.sendCode(name, code)
                return this.saveCode(code, name)
            }
        }

    }

    async login(codeDto: CodeDto) {
        const { name, password, code } = codeDto;
        try {
            console.log("login function1")
            return await this.authenticateUser(name, password, code);
        } catch (e) {
            if (e.message === "PreAuthentication failed with error INVALID_CODE."){
                throw new BadRequestException("INVALID_CODE");
            }
        }
    }

    async authenticateUser(name: string, password: string, code: string)  {
        const authenticationDetails = new AuthenticationDetails({
            Username: name,
            Password: password,
            ValidationData: { code }
        });
        const userData = {
            Username: name,
            Pool: this.userPool,
        };

        const newUser = new CognitoUser(userData);
        // newUser.setAuthenticationFlowType("USER_PASSWORD_AUTH")
        return new Promise((resolve, reject) => {
            newUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result: CognitoUserSession) {
                    const profileId = result.getIdToken().payload['profile']
                    const id_token = result.getIdToken().getJwtToken()
                    resolve({ profileId, id_token });
                },
                onFailure: function (err) {
                    reject(err);
                },
            });
        });
    }


    private generateRandomCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    private async saveCode(code: string, name: string) {
        return await new this.CodeModel({ code, name, createdAt: Date.now() }).save();
    }
}

