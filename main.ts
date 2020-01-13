enum airList {
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

  //#########################    INITILIZATION   #########################

function init(){
    serial.redirect(
    SerialPin.P0,
    SerialPin.P1,
    BaudRate.BaudRate9600
  );
  pins.digitalWritePin(DigitalPin.P2, 1);
  basic.showString("OK");
  }

function readData(index: number, listABC: string): number {
  let readIn = serial.readString();
  let readOut = readIn.split("|");
  let readDisp = readOut[index];
  if (readOut[0] == listABC){
    basic.showString("X") //Debugging ReadData with string on successful read
    return parseInt(readDisp);
  } else {
    return 0;
  }
}
/*
function sendData(actuCat: number, actuType: number, actuSet: number){
  let output = actuCat.toString() + ";" + actuType.toString() + "," + actuSet.toString();
  serial.writeString(output);
  basic.pause(100);
}
*/
//#########################    END INITILIZATION   #########################


//#########################    SENSORS    #########################

//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door| clock
//Indexing for readData
//A =0
let hum = 1;
let water = 2;
//B 1
//let co2 = 1;
let temp = 2;
//C 2
let door = 1;
let clk = 2;

  //% group="Sensore"
    /**
    * Luftfugtighedsmåler
    */
    //% block
  export function Luftfugtighedsmåler(): number {
    let x = readData(hum, "a");
  return x ;
  }

  /**
  * Vandstandsmåler 0-100
  */
  //% block
  //% group="Sensore"
  export function Vandstandsmåler(): number {
    let x = readData(water, "a");
  return x;
  }

  /**
  * CO2-Måler
  */
  //% block
  //% group="Sensore"
  export function co2Sensor(): number {
    let coIn = serial.readString();
    let coOut = coIn.split('|');
    let coDisp = parseInt(coOut[1]);
    if (coOut[0] == "b") {
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
   let x = readData(temp, "b");
  return x ;
}

  /**
 * DoorSensor
 */
 //% block
 //% group="Sensore"
  export function doorSensor(): number {
    let x = readData(door, "c");
  return x;
}

  /**
  * Klokken
  */
  //% block
  //% group="Sensore"
  export function clockSensor(): number {
    let x = readData(clk, "c");
  return x;
}
//#########################    END SENSORS    #########################

//#########################    ACTUATORS    #########################
/*Indexing actuators
a,white,
b,uv,
c,ir
d,fert
e,water
f,air
g,changeAIR
h,heater
i,fan
j,time
*/
  /**
  * Mock-up Light block
  */
  //% blockId=mockUpLight block="%lightList, Brightness %brightness"
  //% group="Aktuatore"
  export function groLys(lightType: lightList, lightBrigt: number){
    let lB = lightBrigt.toString();
    if (lightType == 0){
      let output = "a:" + lB + "|x";
      serial.writeString(output);
    } else if (lightType == 1){
      let output = "b:" + lB + "|x";
      serial.writeString(output);
    } else if (lightType == 2){
        let output = "c:" + lB + "|x";
        serial.writeString(output);
  }
}

/**
*Pumper.
*/
//% blockId=pumpeActu block="%actuList| intensitet %randNum"
//% group="Aktuatore"
export function setPump(actu:pumpList, setting: number){
  let set = setting.toString();
  if (actu == 0){
    let output = "d:" + set + "|x";
    serial.writeString(output);
  }
 else if (actu == 1){
    let output = "e:" + set + "|x";
    serial.writeString(output);
  }
  else if (actu == 2){
     let output = "f:" + set + "|x";
     serial.writeString(output);
   }
   else if (actu == 2) {
      let output = "g:" + set + "|x";
      serial.writeString(output);
    }
 }



  /**
  * Varmeboi.
  */
  //% blockId=airActu block="%actuList| intensitet %randNum"
  //% group="Aktuatore"
  export function setHeat(actu:airList, setting: number){
    let set = setting.toString();
    if (actu == 0){
      let output = "h:" + set + "|x";
      serial.writeString(output);
    }
   else if (actu == 1){
      let output = "i:" + set + "|x";
      serial.writeString(output);
    }
  }


  //#########################    END ACTUATORS    #########################


  //#########################    DEBUG FUNCTIONS    #########################
  /**
  *Display data buffer contents
  */
  //% block
  //% group="xDebug"
  export function dispDataBuffer(){

    basic.showString("A"); //First string from ardu
    basic.pause(1000);
    basic.showNumber(bufboi[0]); //Hum - Luftfugtighed
    basic.pause(1000);
    basic.showNumber(bufboi[1]); // Water level
    basic.pause(1000);

    basic.showString("B"); //Second string from ardu
    basic.pause(1000);
    basic.showNumber(bufboi[2]); //CO2
    basic.pause(1000);
    basic.showNumber(bufboi[3]); //Temp
    basic.pause(1000);

    basic.showString("C"); //Third string from ardu
    basic.pause(1000);
    basic.showNumber(bufboi[4]); //Door
    basic.pause(1000);
    basic.showNumber(bufboi[5]); //Clock
    basic.pause(1000);
  }

  /**
  * Varmeboi.
  */
  //% block
  //% group="xDebug"
  export function runActuators(){
    groLys(0,100);  //iterate lights. on 1 sec
    basic.pasue(1000);
    groLys(0,0);
    groLys(1,100);
    basic.pasue(1000);
    groLys(1,0);
    groLys(2,100);
    basic.pasue(1000);
    groLys(2,0);

    basic.pasue(1000);

    setPump(0,100);
    setPump(1,100);
    setPump(2,100);
    setPump(3,100);
    basic.delay(5000);
    setPump(0,0);
    setPump(1,0);
    setPump(2,0);
    setPump(3,0);

    setHeat(0,100);
    setHeat(1,1);
    basic.pause(10000);
    setHeat(0,0);
    setHeat(1,0);
  }
    /**
      *
      */
     //% block="0"
     //% group="xDebug"
    export function bb0():number {
      return bufboi[0];
    }
    /**
      *
      */
     //% block="1"
     //% group="xDebug"
    export function bb1():number {
      return bufboi[1];
    }
    /**
      *
      */
     //% block="2"
     //% group="xDebug"
    export function bb2():number {
      return bufboi[2];
    }
    /**
      *
      */
     //% block="3"
     //% group="xDebug"
    export function bb3():number {
      return bufboi[3];
    }
    /**
      *
      */
     //% block="4"
     //% group="xDebug"
    export function bb4():number {
      return bufboi[4];
    }
    /**
      *
      */
     //% block="5"
     //% group="xDebug"
    export function bb5():number {
      return bufboi[5];
    }

    /**
    * prints string on LEDS and on serial port
    * @param testString string
    */
    //% weight=101 blockGap=8
    //% blockId=testSerialPrint block="Test Serial print: %testString"
    //% group="xDebug"
    export function testSerialPrint(testString: string) : void {
      basic.showString(testString);
      serial.writeString(testString);
    }
  //#########################   END DEBUG FUNCTIONS    #########################

//Calls the initilization function to run on startup
init();

}//Ends namespce
/////////////////////////////////     END OF GROBLOCKS NAMESPACE      /////////////////////////////////

let bufboi = [0, 0, 0, 0, 0, 0]; //buffboi int atm

/////////////////////////////////     START OF INBACKGROUND NAMESPACE      /////////////////////////////////

control.inBackground(function () {

  function sensData(){
    let readIn = serial.readString();
    let inSplit = readIn.split('|');
    if (inSplit[0] == "a") {
      //basic.showString("A"); //Debugging ReadData with string on successful read
      //basic.pause(15);
      bufboi[0] = parseInt(inSplit[1]);
      bufboi[1] = parseInt(inSplit[2]);


    } else if (inSplit[0] == "b") {
      //basic.showString("B"); //Debugging ReadData with string on successful read
      //basic.pause(15);
      bufboi[2] = parseInt(inSplit[1]);
      bufboi[3] = parseInt(inSplit[2]);

    } else if (inSplit[0] == "c") {
      //basic.showString("C"); //Debugging ReadData with string on successful read
      //basic.pause(15);
      bufboi[4] = parseInt(inSplit[1]);
      bufboi[5] = parseInt(inSplit[2]);

    }
  }
   while (true) {
  sensData();
  basic.pause(100);
}

})
