import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { CodeDto } from './dto/code.dto';
import { Code, CodeDoc } from './schema/code.schema';
import { CognitoService } from '../cognito/cognito.service';
import { Profile, ProfileDocument } from '../profile/schema/profile.schema';
import { EmailService } from '../mail/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Code.name)
    private readonly CodeModel: Model<CodeDoc>,
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
    private readonly configService: ConfigService,
    private readonly cognitoService: CognitoService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Send verification code to the user.
   *
   * If user already is existing in cognito, only send the code to their phone number.
   *
   * If user is not existing in cognito, first save the user then send the code.
   *
   * @param authDto
   */
  async sendVerificationCode(authDto: AuthDto) {
    const { username } = authDto;
    const code = this.generateRandomCode();
    try {
      await this.cognitoService.registerUser(authDto);
      await this.emailService.sendCode(username, code);
      await this.saveCode(code, username);
    } catch (e) {
      if (e.name === 'UsernameExistsException') {
        await this.emailService.sendCode(username, code);
        await this.saveCode(code, username);
      }
    }
  }

  /**
   * Login to the system by entering username(phone number) and the code that
   * has been sent to their phone.
   *
   * Code is stored in our database.
   *
   * Note: Entering a wrong code results in an error message
   * of 'INVALID_CODE' which is done in AWS Cognito Lambda trigger.
   *
   * @param codeDto
   */
  async login(codeDto: CodeDto) {
    const { username, code } = codeDto;
    try {
      return await this.cognitoService.authenticateUser(username, code);
    } catch (e) {
      if (e.message === 'PreAuthentication failed with error INVALID_CODE.') {
        throw new BadRequestException('INVALID_CODE');
      }
    }
  }

  /**
   * Saves the 6 digit email code to the database.
   *
   * @param code
   * @param username
   * @private
   */
  private async saveCode(code: string, username: string) {
    return await this.CodeModel.create({ code, username, createdAt: Date.now() });
  }

  /**
   * Generates 6 digits code to be sent by email.
   *
   * @private
   */
  private generateRandomCode(): string {
    if (process.env.NODE_ENV === 'dev') {
      return '947215';
    } else {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  }
}
