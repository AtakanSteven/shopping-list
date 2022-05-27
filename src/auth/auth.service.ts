import { AuthConfig } from './auth.config';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
    AuthenticationDetails, CognitoUserAttribute,
    CognitoUser,
    CognitoUserPool, CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { Types } from "mongoose";
import { EmailService } from "../mail/email.service";
import { AuthDto } from "./dto/auth.dto";
import { CodeDto } from "./dto/code.dto";


@Injectable()
export class AuthService {
    private readonly userPool: CognitoUserPool;
    constructor(
        @Inject(forwardRef(() => AuthConfig))
        private readonly authConfig: AuthConfig,
        private readonly EmailService: EmailService,
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
        } catch (e) {
            if (e.name === "UsernameExistsException") {
                await this.EmailService.sendCode(name, code)
            }
        }

    }

    async login(codeDto: CodeDto) {
        const { name, password, code } = codeDto;
        return  this.authenticateUser(name, password, code);
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
}

