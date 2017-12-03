// adaptee 1
interface IPhone {
    useLightning();
}

// adaptee 2
interface Android{
    useMicroUSB();
}

// adapter 1
class iPhone7 implements IPhone{
    useLightning(){
        console.log("Using lighting port...");
    }
}

// adapter 2
class GooglePixel implements Android{
    useMicroUSB(){
        console.log('Using micro USB...');
    }
}


// wrapper handle all the changes from the adapter/ adaptees
class LightingToMicroUSBAdapter implements Android{
    iphoneDevice: IPhone;

    constructor(iphone: IPhone){
        this.iphoneDevice = iphone;
    }
    
    public useMicroUSB(){
        console.log('Want to use micro USB, converting to lighting...');
        this.iphoneDevice.useLightning();
    }
}

let iphone = new iPhone7();
let chargerAdapter = new LightingToMicroUSBAdapter(iphone);

chargerAdapter.useMicroUSB();

// Uses for adapter design pattern:
//
// 1. when interfaces are not compatible need to work together
// 2. when you want to reuse a class, however doesn't possess the 
//    interfaces that client application requires.