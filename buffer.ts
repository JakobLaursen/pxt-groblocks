

namespace lol{

Sensor function
read string
update array
return value of array







function readData(index: number, listABC: string): number {
  let dataString = serial.readString();
  let  = readIn.split("|");
  let readDisp = readOut[index];
  if (readOut[0] != listABC){
    return parseInt(readDisp);
  } else {
    return 0;
  }
}


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
