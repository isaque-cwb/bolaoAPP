import { ReactNode, createContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { AuthRequest, makeRedirectUri } from "expo-auth-session";


WebBrowser.maybeCompleteAuthSession()

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean
    signIn: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {

    const [isUserLoading, setIsUserLoading] = useState(false)
    const [user, setUser] = useState<UserProps>({} as UserProps)



    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '1037806603859-kpj07gir623un52u6tvlkucq6brhq0sv.apps.googleusercontent.com',
        redirectUri: 'https://auth.expo.io/@isaque-lourenco/mobiless',
        //redirectUri: makeRedirectUri({ scheme: 'mobiless' }),
        scopes: ['profile', 'email'],
    })



    async function signIn() {

        try {
            setIsUserLoading(true)
            await promptAsync()
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInWithGoogle(access_token: string) {
        console.log('Token de Autenticação: ', access_token)
    }

    useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken)
        }
    }, [response])


    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user,
        }} >
            {children}
        </AuthContext.Provider>
    )
}
