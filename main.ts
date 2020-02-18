enum airList {
  //% block="Varmelegeme"
  heater,
  //% block="Blæser"
  fan
  //%block="Ventilation"
}

enum pumpList {
  //% block="Airation"
  airationPump,
  //% block="External pump 1"
  fert1Pump,
  //% block="External pump 2"
  fert2Pump,
  //% block="Water circulation"
  waterPump,
}

enum lightList {
    //% block="Hvidt Lys"
    whiteGrow,
    //% block="Infrarødt Lys"
    irGrow,
    //% block="Ultraviolet Lys"
    uvGrow,
}

let bufboi = [0, 0, 0, 0, 0, 0]; //buffboi int atm
// groblocks graphics
//% weight=100 color=#0f9c11 icon="\uf06c"
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
let hum = 0;
let water = 1;
let co2 = 2;
let temp = 3;
let door = 4;
let clk = 5;

  //% group="Sensore"
    /**
    * Luftfugtighedsmåler
    */
    //% block
  export function Luftfugtighedsmåler(): number {
    return bufboi[hum];
  }

  /**
  * Vandstandsmåler 0-100
  */
  //% block
  //% group="Sensore"
  export function Vandstandsmåler(): number {
    return bufboi[water];
  }

  /**
  * CO2-Måler
  */
  //% block
  //% group="Sensore"
  export function co2Sensor(): number {
    return bufboi[co2];
  }
  /**
 * Temperatursensor
 */
 //% block
 //% group="Sensore"
 export function tempSensor(): number {
  return bufboi[temp];
}

  /**
 * DoorSensor
 */
 //% block
 //% group="Sensore"
  export function doorSensor(): number {
    return bufboi[door]
}

  /**
  * Klokken
  */
  //% block
  //% group="Sensore"
  export function clockSensor(): number {
    return bufboi[clk];
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
   else if (actu == 3) {
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
let timeString = "N/A";
let fakeTime = 0801;
let fakeTimeString = "0801";
/**
*Display data buffer contents
*/
//% block
//% group="xDebug"
//% advanced=true
  export function fakeTimeFunction(): number{
    return fakeTime;
  }

  /**
  *Display data buffer contents
  */
  //% block
  //% group="xDebug"
  //% advanced=true
  export function fakeTimeParsedAsInt(): number{
    return parseInt(fakeTimeString);
  }
  /**
  *Display data buffer contents
  */
  //% block
  //% group="xDebug"
  //% advanced=true
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
  * Runs all actuators as a test
  */
  //% block
  //% group="xDebug"
  //% advanced=true
  export function runActuators(){

    groLys(0,100);  //White light
    basic.pause(2000);
    groLys(0,0);
    basic.pause(500);
    groLys(1,100); //IR Light
    basic.pause(2000);
    groLys(1,0);
    basic.pause(500);
    groLys(2,100);  //UV Light
    basic.pause(2000);
    groLys(2,0);

    basic.pause(1000);

    //basic.showString("P"); // Pumps not checked
    setPump(0,500); //Water pump
    basic.pause(2000);
    setPump(1,500); //airationPump
    basic.pause(2000);
    setPump(2,500); //External pump 1
    basic.pause(2000);
    setPump(3,500); // External pump 2
    basic.pause(2000);
    setPump(0,0);
    basic.pause(2000);
    setPump(1,0);
    basic.pause(2000);
    setPump(2,0);
    basic.pause(2000);
    setPump(3,0);
    //basic.showString("H");
    setHeat(0,100);
    basic.pause(2000);

    setHeat(0,0);
    basic.pause(1000);
    //setHeat(0,0);
    //setHeat(1,0);
  }

  /**
  * Displays time as a string
  */
  //% block
  //% group="xDebug"
  //% advanced=true
  export function timeAsString(){
    let readIn = serial.readString();
    let inSplit = readIn.split('|');
    if (inSplit[0] == "c") {
      timeString = inSplit[2];
    }
    basic.showString(timeString);
  }


    /**
    * prints string on LEDS and on serial port
    * @param testString string
    */
    //% weight=101 blockGap=8
    //% blockId=testSerialPrint block="Test Serial print: %testString"
    //% group="xDebug"
    //% advanced=true
    export function testSerialPrint(testString: string) : void {
      basic.showString(testString);
      serial.writeString(testString);
    }
  //#########################   END DEBUG FUNCTIONS    #########################

//Calls the initilization function to run on startup
init();

}//Ends namespce
/////////////////////////////////     END OF GROBLOCKS NAMESPACE      /////////////////////////////////



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
while(true){
  sensData();
  basic.pause(500);
}

})
