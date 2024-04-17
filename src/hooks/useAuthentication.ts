'use client';
import * as RoutesConstants from '@/constants/routes';
import { AuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const GUEST_ROUTES = [
    RoutesConstants.SIGNIN_ROUTE,
    RoutesConstants.SIGNUP_ROUTE,
    RoutesConstants.FORGET_PASSWORD_ROUTE,
    RoutesConstants.RESET_PASSWORD_ROUTE,
    RoutesConstants.VERIFY_EMAIL_ROUTE
];

const useAuthentication = () => {
    const { user }: any = AuthContext();
    const userInfo = user?.user || null;
    const router = useRouter();
    const currentRoute = window.location.pathname;

    useEffect(() => {
        if (!userInfo) {
            router.push(RoutesConstants.SIGNIN_ROUTE);
        }

        if (!userInfo && !GUEST_ROUTES.includes(currentRoute)) {
            router.push(RoutesConstants.SIGNIN_ROUTE);
        }

        if (userInfo && GUEST_ROUTES.includes(currentRoute)) {
            router.push(RoutesConstants.DASHBOARD_ROUTE);
        }

    }, [userInfo, currentRoute, router])
};
export default useAuthentication;