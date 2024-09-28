import { TuserUpdateSchema, TUserRegisterSchema } from './../types/zod';
import { db } from '../utils/db.server';
import { TloginRead, TloginRequest, TregisterEmailCheck, TUserRegisterWrite } from '../types/general';


export const createUser = async (data: TUserRegisterSchema): Promise<TUserRegisterWrite> => {
    const { username, fullName, email, password } = data;

    return db.user.create({
        data: {
            username,
            fullName,
            email,
            password
        },
    });
}

export const getUserByUsername = async (username: string): Promise<TloginRead | null> => {
    return db.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            password: true,
        },
    });
};

export const getUserByID = async (id: string): Promise<TloginRequest | null> => {
    return db.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
        },
    });
};

export const getUserByEmail = async (email: string): Promise<TregisterEmailCheck | null> => {
    return db.user.findUnique({
        where: {
            email
        }
    });
};

export const updateUserByID = async (
    id: string,
    data: TuserUpdateSchema
): Promise<Omit<TloginRequest, 'id'> | null> => {
    return db.user.update({
        where: {
            id: id,
        },
        data: data,
        select: {
            fullName: true,
            username: true,
            email: true,
        },
    });
};