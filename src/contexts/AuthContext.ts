import { createContext } from 'react';
type AuthProp = {
    key: string;
}

export const AuthContext = createContext<AuthProp>({
    key: import.meta.env.VITE_AUTHKEY || ''
})