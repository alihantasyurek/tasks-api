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
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 681c8f2e9b1f2a3c4d5e6f7g
 *         title:
 *           type: string
 *           example: Finish Swagger docs
 *         description:
 *           type: string
 *           example: Add documentation for task routes
 *         completed:
 *           type: boolean
 *           example: false
 *         user:
 *           type: string
 *           example: 69fe1634c6261d1ab7f569ac
 *     UpdatedTask:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 681c8f2e9b1f2a3c4d5e6f7g
 *         title:
 *           type: string
 *           example: Finish Swagger docs
 *         description:
 *           type: string
 *           example: Add documentation for EVERY route
 *         completed:
 *           type: boolean
 *           example: true
 *         user:
 *           type: string
 *           example: 69fe1634c6261d1ab7f569ac
 */
