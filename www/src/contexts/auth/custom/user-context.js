'use client';

import * as React from 'react';
import { logger } from '@/lib/default-logger';


export const UserContext = React.createContext(undefined);

export function UserProvider({ children }) {
    const [state, setState] = React.useState({
        user: null,
        error: null,
        isLoading: true,
    });

    // Hàm kiểm tra phiên làm việc
    const checkSession = React.useCallback(async () => {
        try {
           
            const token = sessionStorage.getItem('token');
            const role = sessionStorage.getItem('role');
    

          
            if(token){
                const user = {
                    id: token,
                    role,
                };
        
                setState({
                    user,
                    error: null,
                    isLoading: false,
                });
            }else{
                setState({
                    user:  null,
                    error: null,
                    isLoading: false,
                });
            }

            
        } catch (err) {
            logger.error(err);
            setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        }
    }, []);
   
    // Kiểm tra phiên khi component mount
    // biome-ignore lint/correctness/useExhaustiveDependencies: Expected
    React.useEffect(() => {
        logger.debug('Checking session...');
        checkSession().catch((err) => {
            logger.error(err);
            // noop
        });
       
    }, [checkSession]);
    const setUser = React.useCallback((user) => {
        console.log('Setting user:', user);
        setState((prev) => ({ ...prev, user, isLoading: false })); }, []);

   

    // Cung cấp giá trị context
    return (
        <UserContext.Provider value={{ ...state, checkSession, setUser }}>{children}</UserContext.Provider>
    );
}

export const UserConsumer = UserContext.Consumer;
