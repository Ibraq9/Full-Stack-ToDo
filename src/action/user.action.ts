"use server"

import { stackServerApp } from "../stack";


export async function getUserId() {
    const user = await stackServerApp.getUser();
    
    if (!user) {
        return null;
    }
    
    return user.id; // or whatever property you need
}