import express, { Request, Response } from 'express';
import cors from 'cors';
import { loginUser, registerUser, test, getProfile } from '../controllers/authControler';

const router = express();


//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3001'
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/', test)

export default router;