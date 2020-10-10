var cellStorage=new Array(5); //used to show white space and distance from mine
var userMoveAndMine=new Array(5);//used to store mine
for(var c=0;c<5;c++){
    //create two dimensional array
    cellStorage[c]=new Array(5); 
    userMoveAndMine[c]=new Array(5);
}

/**
 * call this function when user click play button
 * it will fill two array with white space, generate mine and ask for user input with alert box
 */
function startGame() {
  add_space_to_cellStorage();
  mineGenerator();
  getUserInputXandY();
}
/**
 * create a mine sweeper game table board with console.log.
 * Everytime it complete creating the board it will call  getUserInputXandY function for user input.
 * These two function wil keep calling each other untill user win or click cancel button
 */
function showBoard() {
    var column="";
    console.log("Welcome Mine Sweeper!!!");
    
    console.log("+-----+-----+-----+-----+-----+");
    for(var i=0;i<cellStorage.length;i++){
        column="";
        for(var j=0;j<cellStorage[0].length;j++){
        
        column+="+"+cellStorage[i][j];
        if(j==cellStorage[0].length-1){
            column+="+";
        }
    }
        console.log(column);
        console.log("+-----+-----+-----+-----+-----+");
    }
    getUserInputXandY();
}

/**
 *Ask for user input and validate user input
 */
function getUserInputXandY() {
  var x = prompt("Enter x:");
  console.log("x : ", x);
  var y = prompt("Enter y:");
  console.log("y : ", y);
  if(x===null){
      
      location.reload();
  }
  else if(y===null){
      
      location.reload();
  }
  else{
    if(x <6 && x>0 && y>0 && y<6){
      checkDistantFromMine(parseInt(x,10)-1,parseInt(y,10)-1);
        if(isWin()){
            console.log("You Win");
        }
        else{
            showBoard();
        }
      }
    else{
      alert("Please enter num between 1 and 5");
    }
  }
}

/**
 * generate mine with math.random and store it in @var userMoveAndMine array
 */
function mineGenerator(){
    for(var i=0;i<3;i++){
      var minePositionX= parseInt(Math.floor( Math.random()*4+1));
      var minePositionY=parseInt(Math.floor(Math.random()*4+1));
      userMoveAndMine[minePositionX][minePositionY]="M";
      console.log("Mine No are "+(minePositionX+1)+" "+(minePositionY+1));
     
    }
}
/**
 * This will add space to @var cellStorage array and will add * to @var userMoveAndMine array
 */
function add_space_to_cellStorage(){ 
    for(var x=0;x<cellStorage.length;x++){
      for(var y=0;y<cellStorage[0].length;y++){
            cellStorage[x][y]="     ";
            userMoveAndMine[x][y]="*";
      } 
  }
}

/**
 *It will check distace from mine base on the cordinate of user input.
 *Count the total number of mine that exist in it's neighbourhood
 * @param {*} x is the cordinate of row in a game board that user want to apply as his next move
 * @param {*} y is the cordinate of column in a game board that user want to apply as his next move
 * 
 */
function checkDistantFromMine(x,y){
    var mine=0;
        
        if(userMoveAndMine[x][y]==="*"){
            if(x!==0){
              if(userMoveAndMine[x-1][y]=="M"){
                mine++;
              }
              if(y!==4){
                if(userMoveAndMine[x-1][y+1]=="M"){
                  mine++;
                }
              } 
              
              if(y!==0){
                if(userMoveAndMine[x-1][y-1]=="M"){
                  mine++;
                }
              }
             
            }
            
            if(x!==4){
              if(userMoveAndMine[x+1][y]=="M"){
                mine++;
              }
              if(y!==4){
                if(userMoveAndMine[x+1][y+1]=="M"){
                  mine++;
                }
              }
              if(y!==0){
                if(userMoveAndMine[x+1][y-1]=="M"){
                  mine++;
                }
              }
              
            }
            if(y!==4){
              if(userMoveAndMine[x][y+1]=="M"){
                mine++;
              }
            }
            if(y!==0){
              if(userMoveAndMine[x][y-1]=="M"){
                mine++;
              }
            }
            
            cellStorage[x][y]="  "+mine+"  ";
        }
        else if(userMoveAndMine[x][y]=="M"){
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXX  BOMB    BOMB   BOMB   BOMB   BOMB   BOMB   BOMB   BOMB   BOMB   BOMB   BOMB XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          cellStorage[x][y]=" bomb";
        }
    }

/**
 *check whether the celstorage has anymore whitespace or not
 * @return {boolean} return true if it has no more extra space 
 */
function isWin(){
    var space=0;
    for(var i=0;i<cellStorage.length;i++){
      for(var j=0;j<cellStorage[0].length;j++){
        if(cellStorage[i][j]==="     "){
         space++;
        }
      }
    }
    if(space<=3){
      return true;
    }
    else{
      return false;
    }
}