import { NextAuthOptions } from "next-auth";
import { getServerSession } from 'next-auth/next';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { connectToDB} from '@/utils/database';
import User from '@/models/user';
import { SessionInterface } from "@/interfaces";


export const authOptions:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    // jwt:{
    //     encode: ({secret, token})=>{

    //     },
    //     decode: ({secret, token})=>{

    //     }
    // },
    theme:{
        colorScheme:'light',
        
    },
    callbacks:{
        async session({session}){
            try{
                const sessionUser = await User.findOne({
                email: session?.user?.email
            });

            

            const newSession = {
                ...session,
                user:sessionUser
            }
            
    
            return newSession;
        }catch(error){
            console.log('Error retrieving user data', error);
            return session;
        }
        },
        async signIn({profile}){
            try{
                await connectToDB();
                const userExists = await User.findOne({
                    email:profile?.email
                });
    
                if(!userExists){
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ","").toLowerCase(),
                        image: profile?.image,
                        questions:[]
                    })
                }
    
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
        }
    }
};
