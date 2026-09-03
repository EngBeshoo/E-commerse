'use client'
import {  FieldError, FieldLabel } from '@/components/ui/field'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { schema } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { SpinnerCustom } from '../_components/Spinner/Spinner'
import { useState } from 'react'
import { z } from 'zod'

export default function Login() {
  const [isLoading, setisLoading] = useState(false)
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(schema)
  })
 
 async function onSubmit(values:z.infer<typeof schema>){
  setisLoading(true)
console.log(values)
const response =await signIn('credentials',{
  email: values.email, 
  password: values.password,
  callbackUrl: "/",
  redirect: false
})
console.log(response)
if(response?.ok){
    toast.success('Successfully Login')
  window.location.href = response.url || '/'
}else{
  toast.error(response?.error ||"This didn't work.")

}
setisLoading(false)
 }

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white dark:bg-jet-black rounded-2xl border-2 border-border-gray dark:border-smoke-gray/20 shadow-lg">
      <h2 className="text-2xl font-bold text-primary-blue dark:text-off-white mb-6 text-center">
        Welcome Back 🎉
      </h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-13 m-0 text-primary-blue mx-auto bg-gray-200 rounded-full p-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        


        <Controller
          name="email"
          control={form.control}
          rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-dark-text dark:text-off-white" htmlFor="Email">
                Email : 
              </FieldLabel>
              <Input
                className="w-full bg-soft-gray dark:bg-zinc-800 border-border-gray dark:border-smoke-gray/20 rounded-lg focus:ring-2 focus:ring-primary-blue"
                {...field}
                id="Email"
                aria-invalid={fieldState.invalid}
                placeholder="Please enter your email"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          rules={{ required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-dark-text dark:text-off-white" htmlFor="Password">
                Password : 
              </FieldLabel>
              <Input
                type="password"
                className="w-full bg-soft-gray dark:bg-zinc-800 border-border-gray dark:border-smoke-gray/20 rounded-lg focus:ring-2 focus:ring-primary-blue"
                {...field}
                id="Password"
                aria-invalid={fieldState.invalid}
                placeholder="Please enter your password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button 
        disabled={isLoading}
          type="submit" 
          className="mt-2 w-full bg-primary-blue hover:bg-blue-700 text-white rounded-lg font-medium py-3 transition-colors"
        >
          {isLoading ? <SpinnerCustom/> : 'Login'}
        </Button>
        <div className='flex justify-center items-center gap-2 mt-4 text-sm text-dark-text dark:text-off-white'>
          <p>Do you have account??</p>
          <Link href="/register" className='text-primary-blue hover:text-blue-700'>Sign Up</Link>
        </div>
      </form>
    </div>
  )
}