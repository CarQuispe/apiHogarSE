import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface TokenPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class JwtService {
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET || 'your_access_secret_key_here_change_in_production';
  private readonly refreshSecret = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key_here_change_in_production';

  generateToken(payload: TokenPayload): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, this.refreshSecret, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  // Método adicional si necesitas solo access token
  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: '15m',
    });
  }

  verifyToken(token: string, isRefreshToken = false): TokenPayload {
    const secret = isRefreshToken ? this.refreshSecret : this.accessSecret;
    return jwt.verify(token, secret) as unknown as TokenPayload;
  }
}


