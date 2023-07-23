import { createBrowserRouter } from 'react-router-dom';
import { Monotonic, UrlShortener } from './components';
import App from './App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'url-shortener',
                element: <UrlShortener />,
            },
            {
                path: 'monotonic',
                element: <Monotonic />,
            },
        ],
    },
]);
