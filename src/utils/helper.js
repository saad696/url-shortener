import { message } from 'antd';

export const helperService = {
    copyToClipboard: (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                message.success('copied to clipboard!');
            })
            .catch((err) => {
                message.error('Failed to copy, Please try again!');
            });
    },
};
