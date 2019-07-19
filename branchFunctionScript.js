/*
* Programmer : Dr.-Ing. Bader Juma
* Date       : July 18, 2019
* File       : branchFunctionScript.js
* Purpose    : contain all functions that used by main function
*/

//Validate input data
function checkInputFunction(matrixDimension,max){
	//declare variables
	var text;
	  // If matrixDimension is Not a Number or less than one or greater than 100
  if (isNaN(matrixDimension) || matrixDimension < 1 || matrixDimension > max) 
      {
    text = "Input not valid";
       } else {
    text = "Input OK";
               }
			   return text;		   
}

// create the table cells
function createFaceFunction(matrixDimension, cL, fL) {	  
 //Define variables and array
  var i, j, k, text;
  var arr =[];
  
  for (k=0; k< 6; k++) {
  // put class and id arribute for each faces cell
   for (j = 0; j < matrixDimension; j++) {
    text = "<tr>";
    for (i = 0; i < matrixDimension; i++) {
	  text += "<td class="+"back"+" id="+cL[k]+((j+1)*10+(i+1))+">"+" "+"</td>";
	  }
      text  += "</tr>";
      arr[j] = text;}
    
	 // create cells in face (table) choose by id attributes
	 document.getElementById(fL[k]).innerHTML = arr[0];
     for (j = 1; j < matrixDimension; j++){
     $("#"+fL[k]).append(arr[j]);        }
                        }	
}

// create selector for cell location for rotation
function chooseCellLocationFunction(matrixDimension) {	  
 //Define variables and array
  var i, j, k, text;
  var arr =[];
  //removes the child elements of the selected element(s).
   $("#cellRotation").empty(); 
   for (i = 1; i < matrixDimension+1; i++) {
	 text += "<option value="+i+">"+i+"</option>" ;
	 }        
    $("#cellRotation").append(text); 
}

//color each cells separatelly
function colorCellsFunction(matrixDimension, cL, colorFace) {	
 //Define variables and array
  var i, j, k, temp;
  
for (k=0; k< 6; k++) {	
    // put color for each cell j is row and i is cols of matrix first cell is 0,0
   for (j = 0; j < matrixDimension; j++) {
      for (i = 0; i < matrixDimension; i++) {
        temp = (j+1)*10+(i+1);
					 $("#"+cL[k]+temp).css("background-color", colorFace[k]); 
                                            } 
                                        }									
                         }	
}

// give code for each color create virtual matrix that keep track to 
// the color on each cells because the color cells are not readable
function initializeMatrixFunction(backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, matrixDimension, colorCode){
	// declare variable
	var i;
	// initialize matrix face with color code
    for (i = 0; i < matrixDimension*matrixDimension; i++) {
         backArr[i]= colorCode[0];
         rightsideArr[i] = colorCode[1];
         frontArr[i] = colorCode[2];
         leftsideArr[i] = colorCode[3];
         topArr[i] = colorCode[4];
         bottomArr[i] = colorCode[5];
                                                          }
                                                            }
															
 // rotate matrix x,y,z with edges anti and clock wise direction
function rotationMatrixFunction(axisVar, directionRot, numStepRot, cellLocation) {
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

                                                                              }
 
 //rotate matrix around X-axis for cell in middle not edge give color
 // k repsent step rotation in middle in clock wise dircetion
 // axisVar = X, numStepRot = 1, 2, 3, cellLocation = middle;
function matrixXaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, rightsideArr, bottomArr, leftsideArr, topArr) {
 // define variables
   var j, i, k, ii, jj, temp;
   var squDimension = matrixDimension*matrixDimension-1;
  for(k=0; k < numStepRot; k++){
	j = 0;  	  
   for (i=matrixDimension-cellLocation; i < matrixDimension*matrixDimension; i=i+matrixDimension) {	
   
    ii = j+matrixDimension*(cellLocation-1);	
	 if (directionRot == "cw") {
	temp = rightsideArr[i];
	rightsideArr[i] = bottomArr[ii];
	bottomArr[ii] = leftsideArr[matrixDimension*(matrixDimension-1)-j*matrixDimension+(cellLocation-1)];
	leftsideArr[matrixDimension*(matrixDimension-1)-j*matrixDimension+(cellLocation-1)] = topArr[squDimension-ii];
	topArr[squDimension-ii] = temp;
	}
	else {
		
	temp = leftsideArr[(cellLocation-1)+j*matrixDimension];
	leftsideArr[(cellLocation-1)+j*matrixDimension] = bottomArr[cellLocation*matrixDimension-1-j];
	bottomArr[cellLocation*matrixDimension-1-j] = rightsideArr[matrixDimension*matrixDimension-cellLocation-j*matrixDimension];
	rightsideArr[matrixDimension*matrixDimension-cellLocation-j*matrixDimension] = topArr[matrixDimension*(matrixDimension-cellLocation)+j];
	topArr[matrixDimension*(matrixDimension-cellLocation)+j] = temp;
	
	}
	j++;
                                                                     }
                             }						             
			   }

  //rotate matrix around Y-axis for cell in middle not edge give color
  // k repsent step rotation in middle in clock wise dircetion
  // axisVar = Y, numStepRot = 1,2,3, cellLocation = middle; 
 function matrixYaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, topArr, frontArr, bottomArr, backArr) {
   // define variables
   var i, k, temp;
   //console.log(topArr);
  for(k=0; k < numStepRot; k++){  	  
   for (i =(cellLocation-1); i< (matrixDimension*matrixDimension); i=i+matrixDimension) {	 
	 if (directionRot == "cw") {	
	 temp=topArr[i];
	 topArr[i] = frontArr[i];
	 frontArr[i] = bottomArr[i];
	 bottomArr[i] = backArr[matrixDimension*matrixDimension-1-i];
	 backArr[matrixDimension*matrixDimension-1-i] = temp; } 
	 else {
	 temp = bottomArr[i];
	 bottomArr[i] = frontArr[i];
	 frontArr[i] = topArr[i];
	 topArr[i] = backArr[matrixDimension*matrixDimension-1-i];
	 backArr[matrixDimension*matrixDimension-1-i] = temp; 
	 
	 }	 
                                                                     }
                             }						 
}

 //rotate matrix around Z-axis for cell in middle not edge give color
 // k repsent step rotation in middle in clock wise dircetion
 // axisVar = Z, numStepRot = 1,2,3, cellLocation = middle;
function matrixZaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr) {
 // define variables
 var i, k, temp; 
 for(k=0; k < numStepRot; k++){	 
   for (i = (cellLocation-1)*matrixDimension; i<(matrixDimension+matrixDimension*(cellLocation-1)); i++) {
    if (directionRot == "cw") {		
	 temp=backArr[i];
	 backArr[i] = rightsideArr[i];
	 rightsideArr[i] = frontArr[i];
	 frontArr[i] = leftsideArr[i];
	 leftsideArr[i] = temp;	 } 
	 else {
	 temp = leftsideArr[i];
	 leftsideArr[i]= frontArr[i];
	 frontArr[i] = rightsideArr[i];
	 rightsideArr[i] = backArr[i];
	 backArr[i] = temp; }
	 
                                                                                                          }
                             }
			   }

// ClockWise 
// rotation of front matrix when cell location = 1, leftside matrix when cell location = matrix dimension
// top martix when cell location = 1
function clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, tempArr, chooseMatrix) { 
   
   	// define variables
    var i, j, k, index;	
	var arr = [];
	for(k=0; k < numStepRot; k++){	
	// create temperory matrix to save data for swaping edges
	for (i = 0; i < matrixDimension*matrixDimension; i++) 
	    arr[i] = tempArr[i];
	
	index=0;	
	for ( j = 0; j < matrixDimension ; j++ ) {		
		for (i = 0; i < matrixDimension; i++) {
		 
		  tempArr[index] = arr[matrixDimension*(matrixDimension-1)+j-i*matrixDimension];	
		  index++;
		}
		}
	}
   
	
	if (chooseMatrix == 2)
		for (i = 0; i < matrixDimension*matrixDimension; i++) frontArr[i] = tempArr[i];
	else if (chooseMatrix == 3)
		for (i = 0; i < matrixDimension*matrixDimension; i++) leftsideArr[i] = tempArr[i];
	else if (chooseMatrix == 4)
		for (i = 0; i < matrixDimension*matrixDimension; i++) topArr[i] = tempArr[i];
	else if (chooseMatrix == 5)
		for (i = 0; i < matrixDimension*matrixDimension; i++) bottomArr[i] = tempArr[i];
	else if (chooseMatrix == 1)
		for (i = 0; i < matrixDimension*matrixDimension; i++) rightsideArr[i] = tempArr[i];
	else if (chooseMatrix == 0)
		for (i = 0; i < matrixDimension*matrixDimension; i++) backArr[i] = tempArr[i];	
	else
		window.alert("No or wrong number have been choosen for chooseMatrix");

}

// Anti ClockWise 
// rotation of back matrix when cell location = matrix dimension, rightside matrix when cell location = 1
// bottom martix when cell location = matrix dimension
function antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, tempArr, chooseMatrix) { 
	
	// define variables
    var i, j, k, index;	
	var arr = [];
	for(k=0; k < numStepRot; k++){	
	// create temperory matrix to save data for swaping edges
	for (i = 0; i < matrixDimension*matrixDimension; i++) 
	    arr[i] = tempArr[i];
	
	index=0;	
	for ( j = 0; j < matrixDimension ; j++ ) {		
		for (i = 0; i < matrixDimension; i++) {
		
		tempArr[index] = arr[matrixDimension-1-j+i*matrixDimension];	
		index++;
		}
		}
	}
	
	
	if (chooseMatrix == 0)
		for (i = 0; i < matrixDimension*matrixDimension; i++) backArr[i] = tempArr[i];
	else if (chooseMatrix == 1)
		for (i = 0; i < matrixDimension*matrixDimension; i++) rightsideArr[i] = tempArr[i];
	else if (chooseMatrix == 5)
		for (i = 0; i < matrixDimension*matrixDimension; i++) bottomArr[i] = tempArr[i];
	else if (chooseMatrix == 4)
		for (i = 0; i < matrixDimension*matrixDimension; i++) topArr[i] = tempArr[i];
	else if (chooseMatrix == 3)
		for (i = 0; i < matrixDimension*matrixDimension; i++) leftsideArr[i] = tempArr[i];
	else if (chooseMatrix == 2)
		for (i = 0; i < matrixDimension*matrixDimension; i++) frontArr[i] = tempArr[i];
	else
		window.alert("No or wrong number have been choosen for chooseMatrix");
}

//rotation around x,y,z axis
function cellColorXYZaxisRotationFunction(cL, cellLocation, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, colorFace) {
  //Define variables
  // k represent the face
 var i, j, k, temp, tempVar,tempColor;	
 
 for (k=0; k< 6; k++) {	
    // put color for each cell j is row and i is cols of matrix first cell is 0,0
	tempVar = -1;
   for (j = 0; j < matrixDimension; j++) {
      for (i = 0; i < matrixDimension; i++) {
        temp = (j+1)*10+(i+1);
 
              tempVar++;	
                        if(k==0) tempColor= backArr[tempVar];
						 else if(k==1) tempColor= rightsideArr[tempVar];
						  else if(k==2) tempColor= frontArr[tempVar];
						   else if(k==3) tempColor = leftsideArr[tempVar];
						    else if(k==4) tempColor= topArr[tempVar];
							 else          tempColor =  bottomArr[tempVar];
 
    $("#"+cL[k]+temp).css("background-color", colorFace[tempColor]);				 
                                            }              										
                         }
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////function for Scramble cell////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

// returns integer a random number between min and max
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// get random axis "x", "y", "z"
function getRndAxis(){
	var temp, randVar;
	randVar = getRndInteger(1, 3);
	switch (randVar) {
  case 1:
    temp = "x";
    break;
  case 2:
    temp = "y";
    break;
  case 3:
    temp = "z";
                           }
  return temp;
                        }

// get random rotation clockwise or anti "cw", "anticw" 
function getRndRotDirection(){
	var temp, randVar;
	randVar = getRndInteger(1, 2);
	switch (randVar) {
  case 1:
    temp = "cw";
    break;
  case 2:
    temp = "anticw";
	                  }
	 return temp;
                                 }
								 
// create the table cells
function createDataTableFunction(arr1, arr2, arr3, arr4) {	  
 //Define variables and array
  var i, text;
  
  //removes the child elements of the selected element(s).
   $("#randData").empty(); 
   
   text = "<tr>";
   text += "<th>Sequence</th>";
   text += "<th>Axis</th>";
   text += "<th>ClockWise/AntiClockWise</th>";
   text += "<th>Step rotation</th>";
   text += "<th>Cell Location</th>";
   text += "</tr>";
   $("#randData").append(text); 
   
   for (i=0; i < arr1.length; i++) {
   text = "<tr>";
   text += "<td>"+(i+1)+"</td>" ;
   text += "<td>"+arr1[i]+"</td>" ;
   text += "<td>"+arr2[i]+"</td>" ;
   text += "<td>"+arr3[i]+"</td>" ;
   text += "<td>"+arr4[i]+"</td>" ;
   text += "</tr>";
     $("#randData").append(text); 
   }       
  
}
							 

								 
								 
						

