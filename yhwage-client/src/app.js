import { message } from 'antd';

export const dva = {
  config: {
    onError(e) {
      message.error(e.message, 3);
    },
  },
};