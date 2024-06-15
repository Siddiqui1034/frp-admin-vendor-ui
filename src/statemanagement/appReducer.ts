
// export const appReducer = (state, action)=>
//     {
//         switch(action.type){
//             case "LOGIN":
//                 return state;
//             default :
//             return state;
//         }
//     }

export const appReducer:any = (state:any, action:any)=>
    {
        switch(action?.type){
            case "LOGIN":
                return {
                    ...state, 
                    // isLoggedIn: action.payload
                    ...action.payload
                }
            case "LOADER":
                return {
                    ...state,
                    isShowLoader: action.payload
                } 
            case "TOASTER":
                return {
                    ...state,
                    ...action.payload
                }      
        }
        return state;
    }