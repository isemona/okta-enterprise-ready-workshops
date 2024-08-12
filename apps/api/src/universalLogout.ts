import { Router } from 'express';
export const universalLogoutRoute = Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface IRequestSchema {
  'sub_id': {format:string; email: string};
}
universalLogoutRoute.post('/global-token-revocation', async (req, res) => {
    // 204 When the request is successful

    const httpStatus = 204;


    // 400 If the request is malformed
    if (!req.body) {
      res.status(400);
    }
    console.log(req.body)

    // Find the user by email linked to the org id associated with the API key provided

    const newRequest:IRequestSchema = req.body;
    const { email } = newRequest.sub_id;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // 404 User not found
    if (!user) {
      res.sendStatus(404);
    }

    console.log("user found!")
    return res.sendStatus(httpStatus);
})
