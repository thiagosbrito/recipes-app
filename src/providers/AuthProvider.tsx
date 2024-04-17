'use client';

import { auth } from "../config/firebase";
import Lottie from "lottie-react";
import { createContext, useContext, useEffect, useState } from "react";
import LoadingAnimation from "../../public/animations/recipes-app-loading.json";
const Context = createContext({});

type UserT = {
    user: any;
    isAuthenticated: boolean;
}

const AuthProvider = ({ children }: any) => {
    const [loading, isLoading] = useState<boolean>(true);
    const initialState: UserT = {
        user: null,
        isAuthenticated: false,
    };
    const [user, setUser] = useState<UserT>(initialState);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser({
                user,
                isAuthenticated: !!user,
            });
            isLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Context.Provider value={{ user, setUser }}>
            {loading && (
                <div className="flex h-screen w-full items-center justify-center">
                    <Lottie animationData={LoadingAnimation} />
                </div>
            )}
            {!loading && children}
        </Context.Provider>
    );
}

export const AuthContext = () => useContext(Context);
export default AuthProvider;