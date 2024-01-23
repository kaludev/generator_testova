import '@styles/globals.css';

import Provider from '@components/Provider';
import Footer from '@components/Footer/Footer';
import ToastProvider from '@components/ToastProvider';
import Navigation from '@components/Navigation/Navigation';

export const metadata = {
    title: 'Generator Testova',
    description: 'Upiši svoje pitanje odmah!'
};
const RootLayout = ({ children }) => {
  return (
        <html lang="en">
            <body>
                <Provider>
                    <ToastProvider>
                        <main className='app'>
                            <Navigation />
                            {children}
                        </main>
                    </ToastProvider>
                </Provider>
                
            </body>
        </html>
  )
}

export default RootLayout