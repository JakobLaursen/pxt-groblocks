


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

// ############################# Init ########################################
//=============================================================================
//############################################################################

function init(){
    serial.redirect(
    SerialPin.P0,
    SerialPin.P1,
    BaudRate.BaudRate9600
  );
  pins.digitalWritePin(DigitalPin.P2, 1);
  basic.showString("OK");
  }


// actuCat index
let lightCat: number = 0;
let airCat: number = 1;
let pumpCat: number = 2;


function readData(index: number, listABC: string): number {
  let readIn = serial.readString();
  let readOut = readIn.split("|");
  let readDisp = readOut[index];
  if (readOut[0] != listABC){
    return parseInt(readDisp);
  } else {
    return 0;
  }
}
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////BUFFER/////////////////////
let bufboi = [];

function updateBuffer (){
  let updated = [0,0,0];
  while(updated !=[1,1,1]){

  let dataString = serial.readString().split("|")

  if (dataString[0] == "a") {
    bufboi[0] = parseInt(dataString[1]);
    bufboi[1] = parseInt(dataString[2]);
    updated[0]=1
  } else if (dataString[0] == "b") {
    bufboi[2] = parseInt(dataString[1]);
    bufboi[3] = parseInt(dataString[2]);
    updated[1]=1
  } else if (dataString[0] == "c") {
    bufboi[4] = parseInt(dataString[1]);
    bufboi[5] = parseInt(dataString[2]);
    updated[2]=1
  }
}
return;
}
/////////////////////////////////Buffer"////////////////////////////


function sendData(actuCat: number, actuType: number, actuSet: number){
  let output = actuCat.toString() + ";" + actuType.toString() + "," + actuSet.toString();
  serial.writeString(output);

}


// #####################   SENSORS   #################################
//=============================================================================
//############################################################################

//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door| clock
//Indexing for readData



//A =0
let hum = 1;
let water = 2;

//B 0
//let co2 = 1;
let temp = 2;

//C 0
let door = 1;
let clk = 2;


  /**
  * Luftfugtighedsmåler
  */
  //% block
  //% group="Sensore"

  export function testSensor(): number {
    updateBuffer();
  return bufboi[0];
  }



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
    let x = readData(door,"c" );
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

// ########################  Actuators  ######################################
//=============================================================================
//############################################################################

//Indexing actuators
/*A,white,
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
  * Varmeboi.
  */
  //% blockId=airActu block="%actuList| intensitet %randNum"
  //% group="Aktuatore"
  export function setActuator(actu:airList, setting: number){
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





  /**
  *Pumper.
  */
  //% blockId=pumpeActu block="%actuList| intensitet %randNum"
  //% group="Aktuatore"
  export function setPump(actu:pumpList, setting: number){
    let set = setting.toString();
    if (actu == 0){
      let output = "e:" + set + "|x";
      serial.writeString(output);
    }
   else if (actu == 1){
      let output = "f:" + set + "|x";
      serial.writeString(output);
    }
    else if (actu == 1){
       let output = "d:" + set + "|x";
       serial.writeString(output);
     }
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
