import { Router } from "express";
import { getUser, getUserById, putUser, userDelete } from "../controllers/users.controller.js";
import { updatePremium } from "../controllers/premium.controller.js";
import { uploadDocuments } from "../controllers/documents.controller.js";

const userRouter = Router()

userRouter.get('/', getUser)

userRouter.get('/:id', getUserById)

userRouter.put('/:id', putUser)

userRouter.delete('/:id',userDelete )

userRouter.post('/:uid/documents', uploadDocuments);

userRouter.put('/:uid/premium', updatePremium);


export default userRouter
