import { CustomerResponseType } from "@/utils/prerequest";

 type ErrorInfo = {
    success: boolean;
    msg?: string;
 }
 
 class BaseController {
  protected validateStatus(res: CustomerResponseType[]): ErrorInfo {
    // const {status, errorMsg} = res;
    // if (status! >= 200 && status! < 300) {
    //   return {
    //     success: true,
    //     msg: errorMsg
    //   }
    // } else if (status === 401) {
    //   return {
    //     success: false,
    //     msg: errorMsg
    //   }
    // }
    return {
      success: false,
      msg: ''
    }
  }
 }

 export default BaseController;