import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import process from 'process';

interface IRegisterUser {
    name: string;
    email: string;
    password: string;
}

interface ILoginUser {
    email: string;
    password: string;
}

export const test = async (req: Request, res: Response) => {
    process.exit(1);
    res.send('This data test is working 02!');
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as IRegisterUser;

        if (!name) {
            return res.status(400).send('Please enter your name.');
        }

        if (!email) {
            return res.status(400).send('Please provide correct email.');
        }

        if (!password || password.length < 4) {
            return res
                .status(400)
                .send('Please provide password with minimum 4 characters.');
        }

        const emailExist = await UserModel.findOne({ email });
        if (emailExist) {
            return res.status(409).send('User with this email already exist.');
        }

        const user = await UserModel.create({
            name,
            email,
            password,
        });

        return res.send(user);
    } catch (err) {
        res.status(500).send('Something went wrong with registration.');
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as ILoginUser;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).send('No user found.');
        }
        const match = password === user.password;
        if (!match) {
            return res.status(401).send('Password do not match.');
        }

        jwt.sign(
            { name: user.name, email: user.email },
            process.env.JWT_SECRET || '',
            { expiresIn: 5 },
            (err, token) => {
                if (err) throw err;
                if (token) {
                    //create token to cookie
                    // res.cookie('token', token).send({user, token})

                    //create token to Authorization Bearer
                    // res.setHeader('Authorization', `Bearer ${token}`).send({user, token})
                    res.send({ user, token });
                } else {
                    res.status(500).send('Token generator failed');
                }
            },
        );
    } catch (err) {
        res.status(500).send('Something went wrong with registration.');
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization'];
        // console.log('TOKEN: ', req.headers)

        if (token) {
            const formatToken = token.split(' ')[1];

            jwt.verify(
                formatToken,
                process.env.JWT_SECRET || '',
                {},
                (err, response) => {
                    if (err) throw err;

                    res.send(response);
                },
            );
        } else {
            res.send(null);
        }
    } catch (err) {
        // res.status(500).send('Autehntification failed or token expired.')
        res.status(401).send(err);
    }
};
