export function getDeleiveryOption(optionId){
    let getDeleiveryFee;
    deliveryOptions.forEach(option=>{
        if(option.dID === optionId){
            getDeleiveryFee = option;
        }
    });
    return getDeleiveryFee;
}

export function getDeliveryDate(id){
    let date;
    deliveryOptions.forEach(option=>{
        if(option.dID === id){
            date = option;
        }
    });
    return date;
}


export const deliveryOptions = [
    {
        dID : 1,
        dDate : 7,
        dCharge : 0
    },
    {
        dID : 2,
        dDate : 4,
        dCharge : 99
    },
    {
        dID : 3,
        dDate : 1,
        dCharge : 249
    }
];