export class Ajax{

    static async sendGetReq(url){
       return await  Ajax.sendReq(url, 'get')
    }
    static async sendPostReq(url,data){
       return await  Ajax.sendReq(url, 'post', data)
    }
    static async sendDeleteReq(url){
       return await  Ajax.sendReq(url, 'delete')
    }
    static async sendPutReq(url,data){
       return await  Ajax.sendReq(url, 'put', data)
    }
   

   static async sendReq(url,method,data){ 
    const response = await fetch(
        url,
        {
            method,
            body: data
        }
    )
   const result = await response.json()
   return result;
   }
}