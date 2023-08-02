import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { connectToDB} from '@/utils/database';
import User from '@/models/user';





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

            

            const newSession= {
                ...session,
                user:sessionUser
            }
    
            return newSession;
        }catch(error){
            console.log('Error retrieving user data', error);
            return session;
        }
        },
        async signIn({user}){
            try{
                await connectToDB();
                const userExists = await User.findOne({
                    email:user?.email
                });
    
                if(!userExists){
                    await User.create({
                        email: user?.email,
                        name: user?.name?.replace(" ","").toLowerCase() || "Anonymous",
                        image: user?.image || "/user-default.svg",
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


