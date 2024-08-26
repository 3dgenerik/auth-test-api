import express from 'express';
import dotenv from 'dotenv';
import router from './routes/authRoutes';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

interface IProduct {
    name: string;
    count: number;
}

type ProductKeys = keyof IProduct;

const collect = <T extends keyof U, U extends Object>(key: T, arr: U[]) => {
    return arr.map((item: U) => item[key]);
};

const coll = collect<ProductKeys, IProduct>('count', [
    { name: 'banana', count: 3 },
    { name: 'orange', count: 8 },
    { name: 'apple', count: 2 },
]);

console.log(coll);

const app = express();
dotenv.config();

//dastabase connection
mongoose
    .connect(process.env.MONGO_URL || '')
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database not connected ', err));

//midd
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`...listening port ${PORT}`);
});
