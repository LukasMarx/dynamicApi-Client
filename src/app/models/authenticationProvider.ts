import { Type } from './type';

export enum CloudAuthenticationProvider {
  GOOGLE,
  TWITTER,
  FACEBOOK,
  GITHUB
}

export class AuthenticationProvider {
  public id: string;
  public name: string;
  public cloudProvider: CloudAuthenticationProvider;
  public targetType: Type;
  public mappings: AuthenticationMapping;
  public projectId: string;
}

export class AuthenticationMapping {
  userId: String;
  cloudProvider: String;
  name: String;
  pictureUrl: String;
}
