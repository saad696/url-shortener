import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Typography,
    message,
} from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { apiService } from '../utils/apiService';
import { useState } from 'react';
import { helperService } from '../utils/helper';

const { Title } = Typography;

const UrlShortner = () => {
    const [urlForm] = Form.useForm();

    const [shortUrlResponse, setShortUrlResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (value) => {
        setLoading(true);
        try {
            const data = await apiService.shortenUrl(value);
            setShortUrlResponse(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error(
                error.response.data.message || 'Something went wrong'
            );
        }
    };

    const onClear = () => {
        setShortUrlResponse(null);
        urlForm.resetFields();
    };
    return (
        <div style={{padding: 32}}>
            <Title style={{ textAlign: 'center' }}>
                URL Shortener
            </Title>
            <Divider />
            <Row justify={'center'} align={'middle'}>
                <Col xs={24} md={12}>
                    <Form
                        form={urlForm}
                        name='shortenUrlForm'
                        onFinish={onSubmit}
                        autoComplete='off'
                        layout='vertical'
                    >
                        <Form.Item
                            name='originalUrl'
                            rules={[
                                { required: true, message: 'URL is required' },
                                {
                                    type: 'url',
                                    warningOnly: true,
                                    message: 'Invalid URL',
                                },
                                {
                                    type: 'string',
                                    min: 6,
                                    message:
                                        'URL length should be greater than 6 characters',
                                },
                            ]}
                        >
                            <Input
                                disabled={loading}
                                addonBefore={<LinkOutlined />}
                                placeholder='Paste your URL here'
                            />
                        </Form.Item>
                        <Button
                            disabled={loading}
                            loading={loading}
                            type='primary'
                            htmlType='submit'
                            style={{ marginTop: 8 }}
                        >
                            Shorten
                        </Button>
                        <Button
                            type='primary'
                            style={{ marginTop: 8, marginLeft: 8 }}
                            onClick={onClear}
                        >
                            Clear
                        </Button>
                    </Form>
                </Col>
            </Row>
            {shortUrlResponse && (
                <Row
                    justify={'center'}
                    align={'middle'}
                    style={{ marginTop: 32 }}
                >
                    <Col xs={24} md={12}>
                        <Input
                            size='large'
                            value={shortUrlResponse.shortURL}
                            disabled
                        />
                        <Button
                            type='primary'
                            style={{ marginTop: 16 }}
                            onClick={() =>
                                helperService.copyToClipboard(
                                    shortUrlResponse.shortURL
                                )
                            }
                        >
                            Copy URL
                        </Button>
                        <Button
                            type='primary'
                            style={{ marginTop: 16, marginLeft: 8 }}
                            href={shortUrlResponse.shortURL}
                            target='_blank'
                        >
                            Visit URL
                        </Button>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default UrlShortner;
