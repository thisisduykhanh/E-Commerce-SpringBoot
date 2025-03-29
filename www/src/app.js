import { UserProvider } from '@/contexts/auth/custom/user-context';

// ...existing code...

function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default App;
