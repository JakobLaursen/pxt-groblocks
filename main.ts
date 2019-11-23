
/*
Sensors		         Actuators
Clock		           Controlled fan
Humidity		       IR Grow
Moisture		       UV Grow
Co2	               5 pumps

Sequence #
*/







enum actuList {
  //% block="Heater"
  heater,
  //% block="fan"
  fan,
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
    //% block="White light"
    whiteGrow,
    //% block="IR light"
    irGrow,
    //% block="UV light"
    uvGrow,
}


// groblocks graphics
//% weight=100 color=#0f9c11 icon="\f06c"
namespace groblocks {

function init(){
    basic.showString("OK")
    serial.redirect(
    SerialPin.P0,
    SerialPin.P1,
    BaudRate.BaudRate9600
    )

}

//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door|;
function readData(index) {
  let readIn = serial.readString();
  let readOut = readIn.split("|");
  let readDisp = Number(readOut[index]);

  serial.writeString(readDisp);
  return readDisp;

  }
//Indexing for readData
let seq = 1;
let hum = 2;
let water = 3;
let co2 = 4;
let temp = 5;
let door = 6;

// #####################   SENSORS   #################################
//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door| clock
  /**
  * Mock-up Clock
  */
  //% block
  export function Clock(): number {
      return 0;
  }

  /**
   * Luftfugtighedsmåler 0-100
   */
  //% block
  export function HumSensor(): number {
    let x = readData(hum);
    return x ;
  }
  /**
   * Vandstandsmåler 0-100
   */
  //% block
  export function waterSensor(): number {
    let x = readData(water);

    return x ;
}

/**
 * CO2-Måler
 */
//% block
export function co2Sensor(): number {
  let coIn = serial.readString();
  let coOut = coIn.split('|');
  let coDisp = Number(coOut[4]);
  serial.writeString(coOut[4]);
    return coDisp;
}


/**
 * Temperatursensor
 */
//% block
export function tempSensor(): number {
  let x = readData(temp);
  return x ;
}

export function doorSensor(): number {
  let x = readData(door);
  return x;
}

export function clockSensor(): number {
  let x = readData(clk);

  return x;
}

// ########################  Actuators  ############################

  /**
  * Mock-up Light block
  */
  //% blockId=mockUpLight block="Light %lightList, Brightness %brightness"
  export function setLights(lightType: lightList, lightBrigt: number){
    let lT = lightType.toString();
    let lB = lightBrigt.toString();
    let output = "Light" + lT + lB;

    serial.writeString(output);
  }

  /**
  * Mock-up pump block
  */
  //% blockId=mockUpFan block="Pump %pumpList| with speed %speed"
  export function setPump(type: pumpList, speed: number){
  }


  /**
  * Mock-up actuator block
  */
  //% blockId=mockUpActuator block="Choose actuator %actuList| intensity %randNum"
  export function setActuator(mode:actuList, randNum: number){

  }

  /**
  * Mock-up timer block
  */
  //% blockId=mockUpTimer block="fra klokken %fra| til klokken %til"
export function setClock(clockFra: number, clcokTil: number){

}

/**
* Mock-up timer block
*/
//% blockId=mockUpTimer block="Timer: %fra| timer %til| minutter"
export function setTimer(timerFra: number, timerTil: number){

}



  /**
  * Haps
  */
  //% block
  export function skalViHaveEnBoolean(number: number): boolean {
    return false;
  }


      /**
      * This is an event handler block
      */
      //% block="on event"
//      export function grostart(handler: () => void) {




  // }


   //%block="Klokken: fra %test| til %test2"
  //     export function randomBoolean(test: number, test2: number): boolean {
    //   }



  /**
  * Test loaded from comment
  */
  //% blockId=testActu block="Choose an actuator %mode"
  //% weight=99 blockGap=8
  //export function testActu(mode: actuList) : void {
  //  serial.writeString(mode);
  //}



    /**
    * prints string on LEDS and on serial port
    * @param testString string
    */
    //% weight=99 blockGap=8
    //% blockId=testSerialPrint block="Test Serial print: %testString"
    export function testSerialPrint(testString: string) : void {
      basic.showString(testString);
      serial.writeString(testString);
    }

    /**
    * Test loaded from comment
    */
    //% blockId=testActu block="Choose an actuator %mode"
    //% weight=99 blockGap=8
    //export function testActu(mode: actuList) : void {
    //  serial.writeString(mode);
    //}


  //% blockId=testShadow  block="Shadow test %msg"
  //% text.shadowOptions.toString=true
  //export function testShadow(text: string): void {
  //  serial.writeString(text);
  //}


init();


}
