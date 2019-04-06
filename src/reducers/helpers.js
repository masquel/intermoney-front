import { message } from 'antd';

export const ERROR = "app/ERROR";

export function processApiError(error){
  return function(dispatch){
    if(error.response && error.response.data){
      const { data } = error.response;
      message.error(data["error"]["message"]);
    }else{
      dispatch({type: ERROR, payload: error});
    }
  }
}