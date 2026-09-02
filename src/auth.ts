import Credentials from 'next-auth/providers/credentials';
import { NextAuthOptions } from "next-auth";
import { errorLogin, successLogin } from './type/authInterface';

export const authOptions: NextAuthOptions ={
    pages:{
        signIn:'/login'
    },
    providers:[
        Credentials({
            name:'credentials',
            credentials:{
                email:{},
                password:{}
            } , 
            authorize:async (credentials)=>{
                //call api
                const req = await fetch(`${process.env.API}/auth/signin`,{
                    method:'POST',
                    body:JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password
                    }) , 
                    headers:{
                        "Content-Type":"application/json"
                    }
                })

                const payload:errorLogin | successLogin = await req.json()
                console.log(payload)

                if('token' in payload){
                    return{
                        id:payload.user?._id || 1,
                        user:payload.user,
                        token:payload.token
                    }
                }else{
                    throw new Error('Invalid email or password')
                }
                
            },
            
        })
    ],
    callbacks:{
        jwt:({token ,user})=>{
            if(user){
                token.user = user.user
                token.token = user.token
            }
            return token

        },
        session:({session , token})=>{
            session.user = token.user
            return session

        }
    }
}