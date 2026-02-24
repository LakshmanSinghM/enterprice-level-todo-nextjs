export interface JwtPayload {
  sub: string;
  roles?: string[];
  permissions?: string[];
  exp?: number;
  iat?: number;
}