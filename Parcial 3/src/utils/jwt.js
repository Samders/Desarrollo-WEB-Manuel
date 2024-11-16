import jwt from 'jsonwebtoken';

export class JwtUtil {
    static generateToken(payload, expiresIn) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return null; // Devuelve null si el token es inválido o ha expirado
        }
    }
}
