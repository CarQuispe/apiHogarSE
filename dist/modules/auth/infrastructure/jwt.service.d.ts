interface TokenPayload {
    sub: number;
    email: string;
    role: string;
}
export declare class JwtService {
    private readonly accessSecret;
    private readonly refreshSecret;
    generateToken(payload: TokenPayload): {
        accessToken: string;
        refreshToken: string;
    };
    generateAccessToken(payload: TokenPayload): string;
    verifyToken(token: string, isRefreshToken?: boolean): TokenPayload;
}
export {};
