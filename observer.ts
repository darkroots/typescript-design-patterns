// list of dependents
interface Subject{
    // notify the observer automatically of state changes by calling their method.
    registerObserver(o: Observer);
    removeObserver(o: Observer);
    notifyObservers();
}

// So that when a subject changes state, all registered observers are notified and updated automatically
interface Observer{
    update(temperature: number);
}

class WeatherStation implements Subject{

    private temperature: number;
    private observers: Observer[] = [];

    setTemperature(temp: number){
        console.log('WeatherStation: new temperature measurement: ' + temp);
        this.temperature = temp;
        this.notifyObservers();
    }

    public registerObserver(o: Observer){
        // add the observer to observer array
        this.observers.push(o);
    }

    public removeObserver(o: Observer){
        // identify the position within the observer array
        let index = this.observers.indexOf(o);
        // remove the observer from it current position.
        this.observers.splice(index, 1);
    }

    public notifyObservers(){
        for(let observer of this.observers){
            // call update method to add the new temperature.
            observer.update(this.temperature);
        }
    }
}

class TemperatureDisplay implements Observer{
    // Access Subject so you can update Observers.
    private subject: Subject;

    constructor(weatherStation: Subject){
        // keep track of the subject
        this.subject = weatherStation;
        // register the observer that include with weatherStation
        weatherStation.registerObserver(this);
    }

    public update(temperature: number){
        console.log('TemperatureDisplay: I need to update my display');
        // Logic would go here.
    }
}

class Fan implements Observer{
    private subject: Subject;

    constructor(weatherStation: Subject){
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }

    public update(temperature: number){
        if(temperature > 25){
            console.log('Fan: its hot here, turning myself on..');
        }else {
            console.log('Fan: its nice and cool, turning myself off...');
        }
    }
}

let weatherStation = new WeatherStation();
let tempDisplay = new TemperatureDisplay(weatherStation);
let fan = new Fan(weatherStation);

weatherStation.setTemperature(20);
weatherStation.setTemperature(30);

// observer pattern resolves 
// 
// 1. one-to-many dependency between objects should be defined 
// without making the objects tightly coupled.
// 
// 2. It should be ensured that when one object changes state an open-ended number of 
// dependent objects are updated automatically.
// 
// 3. It should be possibel that one object can notify an open-ended number of other object.

// draw-back to observer pattern
//
// The observer pattern can cause memory leaks, knowns as the lapsed listener problem, 
// because in basic implementation it requires both explicit registeration and explicit
// deregistration as in the dispose pattern, because the subject holds strong references to
// the observers, keeping them alive. This can be prevented by the subject holding weak 
// references to the observers.
//
// A weak reference ins't strong enough to force an object to remain in memory. Especially,
// if the language compiler runs out of memory.