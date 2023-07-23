/* eslint-disable react/prop-types */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { useEffect } from 'react';
import { Footer } from 'antd/es/layout/layout';
import { GithubFilled } from '@ant-design/icons';

const Navigation = ({ children }) => {
    const navigate = useNavigate();
    let currentLocation = useLocation().pathname.split('/')[1];
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

            <div style={{ marginBottom: 150 }}>{children}</div>

            <Footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        href='https://github.com/saad696/url-shortener_client'
                        target='_blank'
                        rel='noreferrer'
                        type='link'
                        icon={<GithubFilled />}
                    >
                        Frontend Source Code
                    </Button>
                    <span>|</span>
                    <Button
                        href='https://github.com/saad696/url-shortener_server'
                        target='_blank'
                        rel='noreferrer'
                        type='link'
                        icon={<GithubFilled />}
                    >
                        Backend Source Code
                    </Button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p>
                        Made with 🧠 by{' '}
                        <a
                            href='https://saadshaikh.netlify.app'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Saad Shaikh
                        </a>
                    </p>
                </div>
            </Footer>
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
