import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Typography,
    message,
} from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { helperService } from '../utils/helper';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { apiService } from '../utils/apiService';

const code = `
    isArrayMonotonic(numsArray) {
        let increasing = true;
        let decreasing = true;

        for (let i = 1; i < numsArray.length; i++) {
            if (numsArray[i] > numsArray[i - 1]) {
                decreasing = false;
            } else if (numsArray[i] < numsArray[i - 1]) {
                increasing = false;
            }

            // If both increasing and decreasing are false, the array is not monotonic
            if (!increasing && !decreasing) {
                return false;
            }
        }

        return true;
    }
`;
const Monotonic = () => {
    const [loading, setLoading] = useState(false);
    const [isMonotonic, setIsMonotonic] = useState(0);

    const onSubmit = async (value) => {
        const numsArray = value.numsArray.split(',');
        setLoading(true);
        try {
            const { isArrayMonotonic } = await apiService.isArrayMonotonic({
                numsArray,
            });
            console.log(isArrayMonotonic)
            setIsMonotonic(isArrayMonotonic);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error(
                error.response.data.message || 'Something went wrong'
            );
        }
    };

    return (
        <div style={{padding: 32}}>
            <Typography.Title style={{ textAlign: 'center' }}>
                Find Is Array Monotonic
            </Typography.Title>
            <Divider />
            <Row gutter={32} align={'top'}>
                <Col xs={24} md={12}>
                    <Form
                        name='shortenUrlForm'
                        onFinish={onSubmit}
                        autoComplete='off'
                        layout='vertical'
                    >
                        <Form.Item
                            name='numsArray'
                            label={'Monotonic Array'}
                            tooltip={{
                                title: "Enter numbers seprated by comma'(s). Example: 1,2,3,4",
                                icon: <InfoCircleOutlined />,
                            }}
                            rules={[
                                { required: true, message: 'Required' },
                                {
                                    pattern: /^[0-9,]+$/,
                                    message:
                                        'Only numbers sperated with comma is allowed',
                                },
                            ]}
                        >
                            <Input placeholder='Example: 1,2,3...' />
                        </Form.Item>
                        <Button
                            disabled={loading}
                            loading={loading}
                            htmlType='submit'
                            type='primary'
                            style={{ width: '100%' }}
                        >
                            Validate
                        </Button>
                    </Form>
                    <Card style={{ marginTop: 8, marginBottom: 8 }}>
                        <b>
                            Is Array Montonic:
                            <span style={{ marginLeft: 8 }}>{isMonotonic.toString()}</span>
                        </b>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card
                        title={'Code: Is Array Monotonic - (Javascript)'}
                        actions={[
                            <Button
                                type='text'
                                key='copy-btn'
                                onClick={() =>
                                    helperService.copyToClipboard(code)
                                }
                            >
                                Copy
                            </Button>,
                        ]}
                        bodyStyle={{ padding: 0 }}
                    >
                        <SyntaxHighlighter
                            language='javascript'
                            style={tomorrow}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Monotonic;
