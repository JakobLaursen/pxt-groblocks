

  //% block="Varmelegeme"
  heater,
  //% block="Blæser"
  fan
  //%block="Ventilation"
}


enum pumpList {
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
//% groups="['Aktuatore', Sensore']"
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


// actuCat index
let lightCat: number = 0;
let airCat: number = 1;
let pumpCat: number = 2;

enum airList {
//function readData(index: number): number {
//  let readIn = serial.readString();
//  let readOut = readIn.split("|");
//  let readDisp = readOut[index];

//  serial.writeString(readDisp);
//  basic.showString(readDisp);
//  return parseInt(readDisp);
//  }



function sendData(actuCat: number, actuType: number, actuSet: number){
  let output = actuCat.toString() + ";" + actuType.toString() + "," + actuSet.toString();
  serial.writeString(output);

}


// #####################   SENSORS   #################################
//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door| clock
//Indexing for readData
//a 1 = gorID 2, = seq
//let seq = 1;
//a =0
let hum = 1;
let water = 2;
//B 0
//let co2 = 1;
let temp = 2;
//C 0
let door = 1;
let clk = 2;

  /**
  * Luftfugtighedsmåler 0-100
  */
  //% block
  //% group="Sensore"

  /**
  * Vandstandsmåler 0-100
  */
  //% block
  //% group="Sensore"
  export function Vandstandsmåler(): number {
    let x = readData(water);
  return x ;
  }

  /**
  * CO2-Måler
  */
  //% block
  //% group="Sensore"
  export function co2Sensor(): number {
    let coIn = serial.readString();
    let coOut = coIn.split('|');
    if (coIn[0] == "a") {
      var coDisp = parseInt(coOut[1]);
      serial.writeString(coOut[1]);

    }
    return coDisp;
  }

  /**
 * Temperatursensor
 */
 //% block
 //% group="Sensore"
 export function tempSensor(): number {
   let x = readData(temp);
  return x ;
}

export function Luftfugtighedsmåler(): number {
  let x = readData(hum);
return x ;
}

  /**
 * DoorSensor
 */
 //% block
 //% group="Sensore"
  export function doorSensor(): number {
    let x = readData(door);
  return x;
}

  /**
  * Temperatursensor
  */
  //% block
  //% group="Sensore"
  export function clockSensor(): number {
    let x = readData(clk);
  return x;
}

// ########################  Actuators  ############################
//Indexing actuators
let whiteLight = 1;
let uvLight = 2;
let irLight = 3;
let waterPump = 4;
let airationpump = 5;
let fert1pump = 6;
let fert2Pump = 7;
let heater = 8;
let fan = 9;

  /**
  * Mock-up Light block
  */
  //% blockId=mockUpLight block="%lightList, Brightness %brightness"
  //% group="Aktuatore"
  export function groLys(lightType: lightList, lightBrigt: number){
    let lT = lightType.toString();
    let lB = lightBrigt.toString();
    let output = "Light" + lT + lB;
    serial.writeString(output);
  }



  /**
  * Aktuatore der håndterer luften i grobotten. Varmelegemet styrer temperaturen osv.
  */
  //% blockId=mockUpActuator block="%actuList| intensitet %randNum"
  //% group="Aktuatore"
  export function setActuator(actu:airList, setting: number){
    sendData(airCat, actu, setting);
  }


  /**
  * Aktuatore der håndterer luften i grobotten. Varmelegemet styrer temperaturen osv.
  */
  //% blockId=mockUpActuator block="%actuList| intensitet %randNum"
  //% group="Aktuatore"
  export function setPump(actu:pumpList, setting: number){
    sendData(pumpCat, actu, setting);
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
