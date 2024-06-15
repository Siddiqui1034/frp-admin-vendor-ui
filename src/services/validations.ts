

const regExpValidations:any = {
    "REQUIRED":{
        pattern:/./,
        error: "Input Required"
    },
    "EMAIL": {
        pattern:/^[a-z0-9]{3}[a-zA-Z0-9_$]{0,}@[a-z]{3,7}\.[a-z]{2,3}$/,
        error: "Must be in a valid email address "
    },
    "MIN5CHARS":{
        pattern:/.{5}/,
        error: "Atleast 5 Chars!!!"
    },
    "PHONE_NUMBER":{
        pattern: /^[0-9]{10}$/,
        error: "Must be in 10 digit"
    }
}

function validate(inputControlObj:any, inputControls:any){
    const {criteria, value, compare} = inputControlObj;
    inputControlObj.error=""
    for(let text of criteria){
        if(text === "COMPARE"){
          const compareObj1 = inputControls.find((obj:any) => obj.name === compare[0])
          const compareObj2 = inputControls.find((obj:any) => obj.name === compare[1])
            if(compareObj1.value && compareObj2.value && compareObj1.value !== compareObj2.value){
             inputControlObj.error = "Password Mismatch"; 
             break;  
            }
        }else{
            const {pattern, error} = regExpValidations[text]
            if(!pattern.test(value)){
                inputControlObj.error = error;
                break;
            }
        }

      
    } 
}

export function formValidation(formControls:any, setFromControls: any){
//    let isFormValid = true
    const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
    const dataObj:any = { } 
    clonedFormControl.forEach( (obj:any)=>{
        dataObj[obj.name] = obj.value;
        validate(obj)
        // if(!obj.value){
        //     isFormValid = false;
        //     obj.error = "Please Enter Input Fields"
        // }
    })
    const isFormValid = !clonedFormControl.some((obj:any)=>obj.error)
    setFromControls(clonedFormControl)

    return [isFormValid,dataObj]
}

export function fieldValidation(eve:any, formControls:any, setFromControls: any){
    const {name, value} = eve.target
    const clonedFormControl:any = JSON.parse(JSON.stringify(formControls))
    const inputControlObj:any = clonedFormControl.find( (obj:any) =>{
        return obj.name === name
    })
    inputControlObj.value =value
    // inputControlObj.error=" "
    // if(!inputControlObj.value){
    //     inputControlObj.error = "Please Enter Value"
    // }
    validate(inputControlObj, clonedFormControl)
    setFromControls(clonedFormControl)
}

export function setValuesToForm(formControls:any, setFormControls:any, data:any){
    const clonedFormControl:any = JSON.parse(JSON.stringify(formControls))
    clonedFormControl.forEach((obj:any)=>{
        obj.value = data[obj.name]
    })
    setFormControls(clonedFormControl);
}

export function clearValuesFromForm(formControls:any, setFormControls:any){
    const clonedFormControl:any = JSON.parse(JSON.stringify(formControls))
    clonedFormControl.forEach((obj:any)=>{
        obj.value = ""
    })
    setFormControls(clonedFormControl);
}