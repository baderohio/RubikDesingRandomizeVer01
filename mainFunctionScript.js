/*
* Programmer : Dr.-Ing. Bader Juma
* Date       : June 27, 2019
* File       : mainFunctionScript.js
* Purpose    : Create GUI and rotation function
*/

 // declare global variables and arrays
 var matrixDimension, chooseMatrix;
 var cL = ["ba", "ri","fr","le","to","bo"]; // cell id
 var fL = ["back", "rightside","front","leftside", "top", "bottom"]; // table id
 var colorFace = ["Green", "Tan", "RoyalBlue", "DarkRed", "Yellow", "White"]; // faces color
 //var colorFace = ["#08960A", "#CD9834", "#3364FB", "#BC0B00", "#FFFB03", "#FFFDFF"];
 var colorCode=["0", "1", "2", "3", "4", "5"]; // code number for color faces
 var backArr =[], rightsideArr =[], frontArr =[], leftsideArr =[], topArr =[], bottomArr =[], tempArr =[]; 
 
//initialization disable Display button   
$("#btnRun").attr("disabled", true);
// validate input data
function dataVaidateFunction(){
     // Get the value of the input field with id="numb"
      matrixDimension = parseInt(document.getElementById("numb").value); 
      document.getElementById("demo").innerHTML = checkInputFunction(matrixDimension);	  
	  if(checkInputFunction(matrixDimension)=="Input OK")
	       $("#btnRun").attr("disabled", false);
       else {
		   $("#btnRun").attr("disabled", true);
	   window.alert(checkInputFunction(matrixDimension));}
}
// Create GUI for face
function guiFunction() { 
  // put row and columns to table choose by id save in fL(face label)
  createFaceFunction(matrixDimension, cL, fL);
  // color the cells
  colorCellsFunction(matrixDimension, cL, colorFace);
  // choose cell location for rotation
  chooseCellLocationFunction(matrixDimension);
} 
//initialize matrix code color function for faces
function initializeFunction() {
	
	
initializeMatrixFunction(backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, matrixDimension, colorCode)
	 document.getElementById("demo1").innerHTML = "Successful matrix initilization";
                               }

  // rotation around Axis X, Y, Z
function rotationFunction() { 
 //Read data
 var axisVar = $( "#axisRotation" ).val();       //choose axis
 var directionRot = $( "#typeRotation" ).val(); // direction of rotation ClockWise always in this code
 var numStepRot = parseInt($( "#stepRotation" ).val());    // number step of rotation
 var cellLocation = parseInt($( "#cellRotation" ).val());  // cell location on faces to rotate

  //rotation around X-axis
  if ( axisVar == "x" ) {
	// rotate matrix around X axis for selected cell in the middle not edge
	matrixXaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension,  rightsideArr, bottomArr, leftsideArr, topArr);
   // rotate front matrix edges 
   if (cellLocation == 1) {
	if (directionRot == "cw")  
    clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, frontArr, 2);	
    else 
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, frontArr, 2);	
	}	
   if (cellLocation == matrixDimension) {
    if (directionRot == "cw") 
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, backArr, 0);
    else 
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, backArr, 0);
	} 
	}

  // rotation around Y-axis
 if ( axisVar == "y" ) { 
    //rotate matrix around Y axis for selected cell in the middle not edge
    matrixYaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, topArr, frontArr, bottomArr, backArr);	
	// rotate rightside matrix edges 
   if (cellLocation == 1) {	
    if (directionRot == "cw")  
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, rightsideArr, 1);
    else 
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, rightsideArr, 1);	
	}
   // rotate leftside matrix edges 
   if (cellLocation == matrixDimension) {
	if (directionRot == "cw")  
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, leftsideArr, 3);
    else 
    antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, leftsideArr, 3);
	} 
	}
 
   //rotation around Z-axis
 if ( axisVar == "z" ) {
   //rotate matrix around Z axis for selected cell in the middle not edge
   matrixZaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr);
   //rotate top matrix edges 
   if (cellLocation == 1) {
	if (directionRot == "cw")  
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, topArr, 4);
    else 
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, topArr, 4);
	} 
   if (cellLocation == matrixDimension) {
    if (directionRot == "cw")  	   
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, bottomArr, 5);
    else
    clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, bottomArr, 5);
	}
    }
 
	// give cells faces color
	cellColorXYZaxisRotationFunction(cL, cellLocation, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, colorFace);	
                             }

 function scrambleFunction() {
	 //Random data
 var numSequence, axisVar, directionRot, numStepRot, cellLocation;
 numSequence = parseInt($( "#numScramble" ).val());    // number step of rotation
 console.log("start");
 for(i=0; i<numSequence; i++) {
 ///////////////////////////////////////////////

 axisVar = getRndAxis();       // get random axis x, y, z
 directionRot = getRndRotDirection();  // direction of rotation ClockWise or AntiClockWise
 numStepRot = getRndInteger(1,3);     // number step of rotation
 cellLocation = getRndInteger(1,matrixDimension);    // cell location on faces to rotate 
  //rotation around X-axis
  if ( axisVar == "x" ) {
	// rotate matrix around X axis for selected cell in the middle not edge
	matrixXaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension,  rightsideArr, bottomArr, leftsideArr, topArr);
   // rotate front matrix edges 
   if (cellLocation == 1) {
	if (directionRot == "cw")  
    clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, frontArr, 2);	
    else 
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, frontArr, 2);	
	}	
   if (cellLocation == matrixDimension) {
    if (directionRot == "cw") 
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, backArr, 0);
    else 
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, backArr, 0);
	} 
	}

  // rotation around Y-axis
 if ( axisVar == "y" ) { 
    //rotate matrix around Y axis for selected cell in the middle not edge
    matrixYaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, topArr, frontArr, bottomArr, backArr);	
	// rotate rightside matrix edges 
   if (cellLocation == 1) {	
    if (directionRot == "cw")  
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, rightsideArr, 1);
    else 
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, rightsideArr, 1);	
	}
   // rotate leftside matrix edges 
   if (cellLocation == matrixDimension) {
	if (directionRot == "cw")  
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, leftsideArr, 3);
    else 
    antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, leftsideArr, 3);
	} 
	}
 
   //rotation around Z-axis
 if ( axisVar == "z" ) {
   //rotate matrix around Z axis for selected cell in the middle not edge
   matrixZaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr);
   //rotate top matrix edges 
   if (cellLocation == 1) {
	if (directionRot == "cw")  
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, topArr, 4);
    else 
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, topArr, 4);
	} 
   if (cellLocation == matrixDimension) {
    if (directionRot == "cw")  	   
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, bottomArr, 5);
    else
    clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, bottomArr, 5);
	}
    }
	

	// give cells faces color
	cellColorXYZaxisRotationFunction(cL, cellLocation, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, colorFace);	
  }
 console.log("end");
 ///////////////////////////////////////////////

 }                                

