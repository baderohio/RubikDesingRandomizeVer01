/*
* Programmer : Dr.-Ing. Bader Juma
* Date       : July 1, 2019
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
 //var colorCode=["1", "7", "13", "21", "31", "43"]; // code number for color faces
 var backArr =[], rightsideArr =[], frontArr =[], leftsideArr =[], topArr =[], bottomArr =[], tempArr =[]; 
 
 //initialization disable Display button   
 $("#btnRun").attr("disabled", true);

 // validate input data
function dataVaidateFunction(){
   // Get the value of the input field with id="numb"
   matrixDimension = parseInt(document.getElementById("numb").value); 
   document.getElementById("demo").innerHTML = checkInputFunction(matrixDimension);	  
   if(checkInputFunction(matrixDimension,10)=="Input OK")
	   $("#btnRun").attr("disabled", false);
      else {
	   $("#btnRun").attr("disabled", true);
	   
	   window.alert(checkInputFunction(matrixDimension,10));}
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
   // intialize matrix with code number represent color		
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
   
    rotationMatrixFunction(axisVar, directionRot, numStepRot, cellLocation);
	// give cells faces color
	cellColorXYZaxisRotationFunction(cL, cellLocation, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, colorFace);	
                             }

 function scrambleFunction() {
	 // declare variable
     var numSequence, axisVar, directionRot, numStepRot, cellLocation;
	 var arr1 =[], arr2 =[], arr3 =[], arr4 =[];
   
	 // read input
	 numSequence = parseInt($( "#numScramble" ).val());    // number of sequence scramble
	    if(checkInputFunction(numSequence)!="Input OK")  
	   window.alert(checkInputFunction(numSequence,10000));
     
     console.log("start");
     for(i=0; i<numSequence; i++) {
       //Randomize variables
         axisVar = getRndAxis();       // get random axis x, y, z
         directionRot = getRndRotDirection();  // direction of rotation ClockWise or AntiClockWise
         numStepRot = getRndInteger(1,3);     // number step of rotation
         cellLocation = getRndInteger(1,matrixDimension);    // cell location on faces to rotate 
         
		 arr1.push(axisVar);
		 arr2.push(directionRot);
		 arr3.push(numStepRot);
		 arr4.push(cellLocation);
		 
		 // perform matrix rotation
	     rotationMatrixFunction(axisVar, directionRot, numStepRot, cellLocation);
        
	    
                                    }
      console.log("end");
	  // give cells faces color
	     cellColorXYZaxisRotationFunction(cL, cellLocation, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, colorFace);	
	  // create table for random data
	  if(checkInputFunction(numSequence)=="Input OK") 
	    createDataTableFunction(arr1, arr2, arr3, arr4);
	
	////////////////////////  
	  //fL = ["back", "rightside","front","leftside", "top", "bottom"]; // table id
      //colorCode=["0", "1", "2", "3", "4", "5"]; // code number for color faces  
	  var arrVal = [],  arrSum = [];
	  for (var i=0;i< 6; i++) {
	  arrVal[i] = colorCode[i]* matrixDimension*matrixDimension;
	  arrSum[i] = 0;
	  }
      console.log(arrVal);
	 
	  for (var i=0;i<matrixDimension*matrixDimension;i++) {
		  arrSum[0] = arrSum[0]+parseInt(backArr[i]);
	      arrSum[1] = arrSum[1]+parseInt(rightsideArr[i]);
		  arrSum[2] = arrSum[2]+parseInt(frontArr[i]);
		  arrSum[3] = arrSum[3]+parseInt(leftsideArr[i]);
		  arrSum[4] = arrSum[4]+parseInt(topArr[i]);
	      arrSum[5] = arrSum[5]+parseInt(bottomArr[i]);
		  }
		  
		  
		   console.log(arrSum);
		  
	//fitnessFunction = 
	////////////////////////
                                }                                

