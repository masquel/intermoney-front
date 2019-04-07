import { message } from 'antd';

export const ERROR = "app/ERROR";

const DEFAULT_ERROR = "Something went wrong";

export function processApiError(error){
  return function(dispatch){
    if(error.response && error.response.data){
      const { data } = error.response;
      if(data.error){
      	if(data.error.message){
      		message.error(data.error.message || DEFAULT_ERROR);
      	}else{
      		message.error(data.error || DEFAULT_ERROR);
      	}
      }else{
      	message.error(data || DEFAULT_ERROR);
      }
    }else{
      dispatch({type: ERROR, payload: error});
    }
  }
}