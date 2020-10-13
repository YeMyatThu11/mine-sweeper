var cellStorage //used to show white space and distance from mine
var userMoveAndMine;//used to store mine
var row;
var mineNo;


/**
 * call this function when user click play button
 * it will fill two array with white space, generate mine and ask for user input with alert box
 * @return {void}
 */
function startGame() {
  askUserForRowAndMine();
  if(row>1){
    create_two_dimensional_arrays();
    add_space_to_cellStorage();
    mineGenerator();
    getUserInputXandY();
  }
}
/**
 *Ask for user input and validate user input
 @return {void}
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
    if(x <=row && x>0 && y>0 && y<=row){
      checkDistantFromMine(parseInt(x,10)-1,parseInt(y,10)-1);
        if(isWin()){
            console.log("############You Win#############");
            showBoard();
        }
        else{
            showBoard();
        }
      }
    else{
      alert("Please enter num between 1 and "+row);
    }
  }
}
/**
 * create a mine sweeper game table board with console.log.
 * Everytime it complete creating the board it will call  getUserInputXandY function for user input.
 * These two function wil keep calling each other untill user win or click cancel button
 * @return {void}
 */
function askUserForRowAndMine(){
  row = parseInt(prompt("Enter number of row:"),10) ;
  if(row<2){
    alert('Please enter no greater than 1');
    location.reload;
  } 
  else{
    mineNo=parseInt(prompt("Enter number of mine:"),10);
  }
}
/**
 * Create a two dismensional array based on the number of row that user enter
 * @return {void}
 */
function create_two_dimensional_arrays(){
  cellStorage=new Array(row);
  userMoveAndMine=new Array(row);
  for(var c=0;c<row;c++){
    //create two dimensional array
    cellStorage[c]=new Array(row); 
    userMoveAndMine[c]=new Array(row);
  }
}
/**
 * Draw a boundry line  of game board 
 * @return {string} return the game board's base line in string format.
 */
function drawBaseLine(){
  return cellStorage.map(c=> "-----+").join("");
}
/**
 * generate mine with math.random and store it in @var userMoveAndMine array
 * @return {void}
 */
function mineGenerator(){
    for(var i=0;i<mineNo;i++){
      var minePositionX= parseInt(Math.floor( Math.random()*(row-1)+1));
      var minePositionY=parseInt(Math.floor(Math.random()*(row-1)+1));
      userMoveAndMine[minePositionX][minePositionY]="M";
      console.log("Mine No are "+(minePositionX+1)+" "+(minePositionY+1));
    }
}
/**
 * This will add space to @var cellStorage array and will add * to @var userMoveAndMine array
 * @return {void}
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
 * @return {void}
 */
function checkDistantFromMine(x,y){
    var mine=0;
        if(userMoveAndMine[x][y]==="*"){
            if(x!==0){
              if(userMoveAndMine[x-1][y]=="M"){
                mine++;
              }
              if(y!==row-1){
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
            
            if(x!==row-1){
              if(userMoveAndMine[x+1][y]=="M"){
                mine++;
              }
              if(y!==row-1){
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
            if(y!==row-1){
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
    if(space<=mineNo){
      return true;
    }
    else{
      return false;
    }
}
/**
 * Show Game borad in console and ask for user input again by calling @function getUserInputXandY.
 * These two function will keep calling each other untill user click cancel or game end
 * @return {void}
 */
function showBoard() {
  var column="";
  line="+";
  line+=drawBaseLine();
 
  console.log(line);
  cellStorage.forEach(function(cell){
    column="";
    cell.forEach(function(c,i){
      column+="+"+c;
      if(i==cell.length-1){
        column+="+";
      }
    });
    console.log(column);
    console.log(line);
  });
  getUserInputXandY();
}