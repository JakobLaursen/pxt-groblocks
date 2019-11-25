
/*
Sensors		         Actuators
Clock		           Controlled fan
Humidity		       IR Grow
Moisture		       UV Grow
Co2	               5 pumps

Sequence #
*/


/* Doesn't work, since maakecode wont allow getlenght
let text = ""
let restArg: number[]
function sendData(actuType: number, ...restArg: number[]){
  for (let i = 0; i < restArg.length; i++) {

    text += ", ";
    text += restArg[i].toString();

  }
  let output = actuType.toString() + "; " + text;
  serial.writeString(output);

}
*/


enum actuList {
  //% block="Varmelegeme"
  heater,
  //% block="Blæser"
  fan
}


enum pumpList {
  //% block="Air Circulation"
  airPump,
  //% block="Water circulation"
  waterPump,
  //% block="Airation"
  airationPump,
  //% block="External pump 1"
  fert1Pump,
  //% block="External pump 2"
  fert2Pump,
  //% block="External pump 1"
}

enum lightList {
    //% block="Hvidt Lys"
    whiteGrow,
    //% block="Infrarødt Lys"
    irGrow,
    //% block="Ultraviolet Lys"
    uvGrow,
}


// groblocks graphics
//% weight=100 color=#0f9c11 icon="\f06c"
//% groups="['Actuators', Sensors']"
namespace groblocks {

// ############################# Init #########################
function init(){
    basic.showString("OK")
    serial.redirect(
    SerialPin.P0,
    SerialPin.P1,
    BaudRate.BaudRate9600
    )

}

//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door|;


function readData(index: number): number {
  let readIn = serial.readString();
  let readOut = readIn.split("|");
  let readDisp = readOut[index];

  serial.writeString(readDisp);
  return parseInt(readDisp);
  }

//Indexing for readData
//let seq = 1;
let hum = 2;
let water = 3;
//let co2 = 4;
let temp = 5;
let door = 6;
let clk = 7;

function sendData(actuType: number, param1: number){
  let output = actuType.toString() + "; " + param1.toString();
  serial.writeString(output);

}

// #####################   SENSORS   #################################
//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door| clock


  /**
  * Luftfugtighedsmåler 0-100
  */
  //% block
  //% group="Sensors"
  export function Luftfugtighedsmåler(): number {
    let x = readData(hum);
  return x ;
  }
  /**
  * Vandstandsmåler 0-100
  */
  //% block
  //% group="Sensors"
  export function Vandstandsmåler(): number {
    let x = readData(water);
  return x ;
  }

  /**
  * CO2-Måler
  */
  //% block
  //% group="Sensors"
  export function co2Sensor(): number {
    let coIn = serial.readString();
    let coOut = coIn.split('|');
    let coDisp = parseInt(coOut[4]);
    serial.writeString(coOut[4]);
  return coDisp;
  }

  /**
 * Temperatursensor
 */
 //% block
 //% group="Sensors"
 export function tempSensor(): number {
   let x = readData(temp);
  return x ;
}

  /**
 * DoorSensor
 */
 //% block
 //% group="Sensors"
  export function doorSensor(): number {
    let x = readData(door);
  return x;
}

  /**
  * Temperatursensor
  */
  //% block
  //% group="Sensors"
  export function clockSensor(): number {
    let x = readData(clk);
  return x;
}

// ########################  Actuators  ############################

  /**
  * Mock-up Light block
  */
  //% blockId=mockUpLight block="%lightList, Brightness %brightness"
  //% group="Actuators"
  export function groLys(lightType: lightList, lightBrigt: number){
    let lT = lightType.toString();
    let lB = lightBrigt.toString();
    let output = "Light" + lT + lB;

    serial.writeString(output);
  }



  /**
  * Mock-up actuator block
  */
  //% blockId=mockUpActuator block="Choose actuator %actuList| intensity %randNum"
  //% group="Actuators"
  export function setActuator(actu:actuList, setting: number){
    sendData(actu,setting);
  }





  /**
  * Mock-up timer block
  /
  //% blockId=mockUpTimer block="fra klokken %fra| til klokken %til"
export function setClock(clockFra: number, clcokTil: number){

}






    /**
    * prints string on LEDS and on serial port
    * @param testString string
    */
    //% weight=101 blockGap=8
    //% blockId=testSerialPrint block="Test Serial print: %testString"
    export function testSerialPrint(testString: string) : void {
      basic.showString(testString);
      serial.writeString(testString);
    }


init();


}
