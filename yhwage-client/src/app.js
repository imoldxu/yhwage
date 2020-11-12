import { message } from 'antd';
import { history, connect } from 'umi'

export const dva = {
  config: {
    onError(e) {
      if(e.errCode === 15){
        history.push({pathname:'/login', state: {}})
      }
      message.error(e.message, 5);
    },
  },
};