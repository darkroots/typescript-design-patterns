// wrapper members
class BluerayPlayer{
    public on(){
        console.log("Blueray Player is on");
    }

    public play(){
        console.log("Blueray Player is playing");
    }

    public turnOff(){
        console.log("Blueray is turning off");
    }
}

class Amplifier{
    public on(){
        console.log('Amplifier is on!!!');
    }

    public setVolume(volume){
        console.log('Amplifier volume is set at '  + volume);
    }

    public setSource(source){
        console.log(source + " is set for your amplifier");
    }

    public turnOff(){
        console.log("Amplifier is turning off");
    }
}

class Lights{
    public dim(){
        console.log('lights are dimming');
    }
}

class TV{
    public turnOn(){
        console.log('TV is turning on');
    }

    public turnOff(){
        console.log("TV is turning off");
    }
}

class PopcornMaker{
    public turnOn(){
        console.log('popcorn maker turning on');
    }

    public pop(){
        console.log('pop corn maker is poping');
    }

    public turnOff(){
        console.log("pop corn maker is turning off");
    }
}

// wrapper class
class HomeTheaterFacade{
    private blueray: BluerayPlayer;
    private amp: Amplifier;
    private lights: Lights;
    private tv: TV;
    private popcornMaker: PopcornMaker;

    constructor(amp: Amplifier, blueray: BluerayPlayer, lights: Lights, tv: TV, popcornMaker: PopcornMaker){
        this.amp = amp;
        this.blueray = blueray;
        this.lights = lights;
        this.tv = tv;
        this.popcornMaker = popcornMaker;
    }

    public watchMovie(){
        this.popcornMaker.turnOn();
        this.popcornMaker.pop();
    
        this.lights.dim();
    
        this.tv.turnOn();
    
        this.amp.on();
        this.amp.setSource('blueray');
        this.amp.setVolume(11);
    
        this.blueray.on();
        this.blueray.play();
    }

    public endMovie(){
        this.popcornMaker.turnOff();
        this.amp.turnOff();
        this.tv.turnOff();
        this.blueray.turnOff();
    }
}

let blueray = new BluerayPlayer();
let amp = new Amplifier();
let lights = new Lights();
let tv = new TV();
let popcornMaker = new PopcornMaker();

let hometheater = new HomeTheaterFacade(amp, blueray, lights, tv, popcornMaker);
hometheater.watchMovie();

// A facade is an object that provides a simplified interface to a larger body of code, such as class library.
// Often used for very complex or diffcult to understand system structures.