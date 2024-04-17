'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast } from "react-toastify";
import { OctagonX } from 'lucide-react';
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    })

    const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                toast.error(e.message)
            })
    }

    return (
        
        <div className="h-screen w-screen  bg-[#E9F6FF] dark:bg-[#0B1437] flex">
            <div className="flex-1 flex items-center justify-center">
                <div className="w-96 flex flex-col gap-y-6">
                    <h1 className="text-4xl dark:text-white font-bold">Sign In</h1>
                    <p>Enter your email and password to sign in!</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Your email address"
                                    { ...register('email') }
                                />
                                {errors?.email && (
                                    <p className="text-sm text-red-500 rounded-md px-2 py-1 flex gap-2 items-center border border-solid border-red-500 transition-all ease-in"> 
                                        <OctagonX className="w-4 h-4 inline-block" />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                
                                <Label htmlFor="password">Password</Label>
                                    
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Your password"
                                    { ...register('password') }
                                />
                                {errors?.password && (
                                    <p className="text-sm text-red-500 rounded-md px-2 py-1 flex gap-2 items-center border border-solid border-red-500 transition-all ease-in"> 
                                        <OctagonX className="w-4 h-4 inline-block" />
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex">
                                <div className="flex gap-x-2 items-center">
                                    <Checkbox id="keep_logged_in" />
                                    <Label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Keep me logged in
                                    </Label>
                                </div>
                                <Link href="#" className="ml-auto inline-block text-sm underline">Forgot password?</Link>
                            </div>
                            <Button type="submit" className="w-full bg-primary">Sign In</Button>
                            <div className="flex items-center">
                                <p className="text-sm">Don&apos;t have an account?</p>
                                <Link href="/sign-up" className="ml-2 text-sm font-semibold">Create an Account</Link>
                            </div>
                        </div>


                    </form>
                    
                </div>
            </div>
            <div className="flex-1 bg-gradient-to-tl from-[#1679AB] to-[#074173] rounded-bl-[200px] flex items-center justify-center">
                <Image src="/images/mychef-logo-darker.svg" alt="Logo" width={400} height={300} />
            </div>
        </div>

    );
};
export default SignInPage;