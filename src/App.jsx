/* eslint-disable react/prop-types */
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { useEffect } from 'react';

const Navigation = ({ children }) => {
    const navigate = useNavigate();
    let currentLocation = useLocation().pathname.split('/')[1];

    console.log(location);
    return (
        <>
            <div
                style={{
                    textAlign: 'center',
                    padding: '16px 0px',
                    background: '#eee',
                    marginBottom: 32,
                }}
            >
                <Space>
                    <Button
                        type={
                            currentLocation === 'url-shortener'
                                ? 'primary'
                                : 'link'
                        }
                        onClick={() => navigate('url-shortener')}
                    >
                        Url Shortener
                    </Button>
                    <Button
                        type={
                            currentLocation === 'monotonic' ? 'primary' : 'link'
                        }
                        onClick={() => navigate('monotonic')}
                    >
                        Monotonic
                    </Button>
                </Space>
            </div>

            {children}
        </>
    );
};

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('url-shortener');
    }, []);

    return (
        <>
            <Navigation>
                <Outlet />
            </Navigation>
        </>
    );
}

export default App;
