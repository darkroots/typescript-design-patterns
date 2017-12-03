var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.setTemperature = function (temp) {
        console.log('WeatherStation: new temperature measurement: ' + temp);
        this.temperature = temp;
        this.notifyObservers();
    };
    WeatherStation.prototype.registerObserver = function (o) {
        // add the observer to observer array
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        // identify the position within the observer array
        var index = this.observers.indexOf(o);
        // remove the observer from it current position.
        this.observers.splice(index, 1);
    };
    WeatherStation.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            // call update method to add the new temperature.
            observer.update(this.temperature);
        }
    };
    return WeatherStation;
}());
var TemperatureDisplay = /** @class */ (function () {
    function TemperatureDisplay(weatherStation) {
        // keep track of the subject
        this.subject = weatherStation;
        // register the observer that include with weatherStation
        weatherStation.registerObserver(this);
    }
    TemperatureDisplay.prototype.update = function (temperature) {
        console.log('TemperatureDisplay: I need to update my display');
        // Logic would go here.
    };
    return TemperatureDisplay;
}());
var Fan = /** @class */ (function () {
    function Fan(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    Fan.prototype.update = function (temperature) {
        if (temperature > 25) {
            console.log('Fan: its hot here, turning myself on..');
        }
        else {
            console.log('Fan: its nice and cool, turning myself off...');
        }
    };
    return Fan;
}());
var weatherStation = new WeatherStation();
var tempDisplay = new TemperatureDisplay(weatherStation);
var fan = new Fan(weatherStation);
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
