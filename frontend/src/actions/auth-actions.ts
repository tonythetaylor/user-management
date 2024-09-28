// 'use server'

// import { Prisma } from '@prisma/client'

// import * as bcrypt from 'bcrypt'

// import { prisma } from '@/lib/db'
// import { User } from '@/state/api'

export async function registerUser(user: any) {

}

import axios from 'axios';
import { redirect } from 'next/navigation';

export async function login(credentials: any): Promise<{ username: any; email: any; }> {
    try {
        const response = await axios.post("http://localhost:3005/api/auth/login", credentials).then((res: any) => {
            return res.data
        }).catch((error: any) => {
			if(error.response.status === 401) {
				return error.response
			}
		});

		if(response.status === 401) {
			return response
		}
		
		// console.log('[RESPONSE] - ', response)
		return {status: response.status, ...response}
    } catch (e: any) {
        throw new Error("Something went wrong.");
    }
}