import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "./error-handler";

const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];

export function verifyGatewayRequest(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers?.gatewaytoken) {
        throw new NotAuthorizedError(
            'Invalid gateway token',
            'verifyGatewayRequest() Request not coming from api gateway'
        );
    }

    const token: string = req.headers.gatewaytoken as string;

    if (!token) {
        throw new NotAuthorizedError(
            'Invalid gateway token',
            'verifyGatewayRequest() Invalid token provided'
        );
    }

    try {
        const payload: { id: string; iat: number } = Jwt.verify(
            token,
            process.env.GATEWAY_JWT_TOKEN!
        ) as { id: string; iat: number };

        if (!tokens.includes(payload.id)) {
            throw new NotAuthorizedError(
                'Invalid gateway token',
                'verifyGatewayRequest() method: Request payload is invalid'
            );
        }
    } catch (error) {
        throw new NotAuthorizedError(
            'Invalid gateway token',
            'verifyGatewayRequest() Invalid token provided'
        );
    }

    next();
}