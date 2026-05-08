/**
 * @swagger
 * components:
 *   schemas:
 *     AuthCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: user123
 *     AuthToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT access token.
 *           example: eyJhbGci...
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 69fe1634c6261d1ab7f569ac
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 */
