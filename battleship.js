$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    // Here you have to add your code for building a random battleground.
    reset();
    generateBattleground();
    // Tip: The next line of code demonstrates how you can select a table cell
    // using coordinates, remove CSS classes and add CSS classes. 
    $('td[data-r="1"][data-c="1"]').removeClass('water').addClass('ship');
    $('td[data-r="2"][data-c="1"]').removeClass('water').addClass('ship');
    $('td[data-r="3"][data-c="1"]').removeClass('water').addClass('ship');
  });
});
class ship{
  constructor(shipLength, posX, posY, direction){
    this.shipLength=shipLength;
    this.posX=posX;
    this.posY=posY;
    this.direction=direction;
    //directon 0 = von Links nach Rechts
    //direction 1 = von unten nach oben
  }
  canPlace(){
    var i;
    let returnValue = true;
    if (this.direction === 1 && this.shipLength + this.posY > 9) {
      return false;
    } else if (this.direction === 0 && this.shipLength + this.posX > 9) {
      return false;
    } else {
      if (this.direction === 1) {
        for (i = 0; i < this.shipLength; i++) {
          if ($('td[data-r="' + (i+this.posY) + '"][data-c="' + this.posX + '"').hasClass("ship")|| $('td[data-r="' + (i+this.posY) + '"][data-c="' + (this.posX+1) + '"').hasClass("ship") || $('td[data-r="' + (i+this.posY) + '"][data-c="' + (this.posX-1) + '"').hasClass("ship")) {
            //console.log("blocked!");
            returnValue = false;
            break;
          }
        }
        if($('td[data-r="' + (this.posY-1) + '"][data-c="' + this.posX + '"').hasClass("ship") || $('td[data-r="' + (i+this.posY+1) + '"][data-c="' + this.posX + '"').hasClass("ship")){
          returnValue=false;
        }
      } else {
        for (i = 0; i < this.shipLength; i++) {
          if ($('td[data-r="' + this.posY + '"][data-c="' + (i+this.posX)+ '"').hasClass("ship")|| $('td[data-r="' + (this.posY+1) + '"][data-c="' + (i+this.posX)+ '"').hasClass("ship") || $('td[data-r="' + (this.posY-1) + '"][data-c="' + (i+this.posX)+ '"').hasClass("ship")) {
            //console.log("blocked!");
            returnValue = false;
            break;
          }
        }
        if($('td[data-r="' + this.posY + '"][data-c="' + (this.posX-1)+ '"').hasClass("ship")||$('td[data-r="' + this.posY + '"][data-c="' + (i+this.posX+1)+ '"').hasClass("ship")){
          returnValue=false;
        }
      }
  
    }
    return returnValue;
  }
  placeShip() {
    var i;
    if (this.direction === 0) {
      for (i = 0; i < this.shipLength; i++) {
        $('td[data-r="' + this.posY + '"][data-c="' + (i+this.posX) + '"').removeClass("water").addClass("ship");
      }
    } else {
      for (i = 0; i < this.shipLength; i++) {
        $('td[data-r="' + (i+this.posX) + '"][data-c="' + this.posX + '"').removeClass("water").addClass("ship");
      }
    }
  }
  toString(){
    return "ship : ["+this.shipLength+","+this.posX+","+this.posY+","+this.direction+"]";
  }
}

function getAllPositions(shipSize){
  var arr = new Array();
  var currentShip;
  var i,j,k;
  for(i=0;i<10;i++){
    for(j=0;j<10;j++){
      for(k=0;k<2;k++){
        currentShip=new ship(shipSize,i,j,k);
        if(currentShip.canPlace()){
          arr.push(currentShip);
        }
      }
    }
  }
  return arr;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function selectRandomPosition(shipSize){
  var allPositions = getAllPositions(shipSize);
  allPositions[getRandomInt(0,allPositions.length)].placeShip();
  if(allPositions.length<=0){
    throw "nothingFound";
  }
}
function generateBattleground(){
  try{
    selectRandomPosition(5);
    selectRandomPosition(4);
    selectRandomPosition(3);
    selectRandomPosition(3);
    selectRandomPosition(2);
  }catch(ex){
    reset();
    generateBattleground();
  }
}
function reset(){
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      $('td[data-r="' + j + '"][data-c="' + i + '"').removeClass("ship").addClass("water");
      console.log("reseted");
    }
  }
}
