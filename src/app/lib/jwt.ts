// Import the necessary module
import jwt from 'jsonwebtoken';

// signing jwt
export function signJwtToken(payload: string | object, options = {}): string {
  const secret = process.env.JWT_SECRET; // Retrieve JWT secret from environment variables
  const token = jwt.sign(payload, secret as string, options); // Sign the JWT token
  return token;
}

// verifying jwt
export function verifyJwtToken(token: any) {
  try {
    const secret = process.env.JWT_SECRET; // Retrieve JWT secret from environment variables
    const payload = jwt.verify(token, secret as string); // Verify and decode the JWT token
    return payload;
  } catch (error) {
    console.error(error); // Log any error that occurs during verification
    return null;
  }
}
