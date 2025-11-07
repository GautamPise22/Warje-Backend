import jwt from 'jsonwebtoken';
import 'dotenv/config'; 

export function verifyToken(req, res, next) {
    // Accept token from header, body or query as a fallback so clients that cannot
    // set headers can still authenticate.
    // Express lower-cases header keys, so use req.headers.authorization
    let authSource = req.headers.authorization || req.body?.Authorization || req.body?.authorization || req.query?.Authorization || req.query?.authorization;

    if (!authSource) {
        return res.status(401).json({ 
            message: 'Authentication failed: No token provided.' 
        });
    }

    // authSource may be either "Bearer <token>" or just the token string.
    let token = null;
    if (typeof authSource === 'string' && authSource.startsWith('Bearer ')) {
        token = authSource.split(' ')[1];
    } else if (typeof authSource === 'string') {
        // If it looks like a JWT (starts with eyJ), accept as raw token; otherwise try to trim
        token = authSource.trim();
    }

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(403).json({ 
                message: 'Authentication failed: Invalid or expired token.' 
            });
        }

        req.user = decoded;
        req.token = token; 
        next();
    });
}

export default verifyToken;