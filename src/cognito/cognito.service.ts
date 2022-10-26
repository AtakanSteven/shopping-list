import { Injectable } from '@nestjs/common';
import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

import { Types } from 'mongoose';

@Injectable()
export class CognitoService {
  private readonly userPool: CognitoUserPool;
  public readonly verifier: CognitoJwtVerifierSingleUserPool<any>;
  private readonly cognitoServerUser: CognitoUser;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });
    this.cognitoServerUser = new CognitoUser({ Pool: this.userPool, Username: 'server' });
  }

  /**
   * Save user to the cognito.
   *
   * Note: Account status and phone number verification is done
   * automatically with a Pre sign-up lambda trigger.
   *
   *
   * @param registerRequest
   */
  async registerUser(registerRequest: { username: string }) {
    const profileId = new Types.ObjectId().toJSON();
    const { username } = registerRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(username, process.env.USER_PASSWORD, [new CognitoUserAttribute({ Name: 'profile', Value: profileId })], null, (error, result) => {
        if (!result) {
          reject(error);
        } else {
          resolve(result.user);
        }
      });
    });
  }

  /**
   * Authenticate user on cognito side.
   *
   * Note: The code in the validation data is checked by a
   * cognito pre authentication lambda trigger.
   *
   * @param username
   * @param code
   */
  async authenticateUser(username: string, code: string) {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: process.env.USER_PASSWORD,
      ValidationData: { code },
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      newUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result: CognitoUserSession) {
          const profileId = result.getIdToken().payload['profile'];
          const id_token = result.getIdToken().getJwtToken();
          resolve({ profileId, id_token });
        },
        onFailure: function (err) {
          reject(err);
        },
      });
    });
  }
}
