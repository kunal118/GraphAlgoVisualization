const totalTiles = 1000;
const tilesPerRow = 50;
const tilesperColumn = totalTiles / tilesPerRow;
var speed = "";
var startPoint = [0, 0];
var endPoint = [4, 1];
var walls = [];
var changingStart = false;
var changingEnd = false;


for (var i = 0; i < totalTiles; i++) {
  walls.push(false);


}
$("#speedInp").on("keypress", function(e) {

  speed = $("#speedInp").val();

});

function resetBoard()
{
  $(".mybox").removeClass("areaSearch").removeClass("path");
  //queue = [];
}









//generates grid
for (var i = 0; i < totalTiles; i++) {
  var temp1 = document.createElement("div");
  temp1.classList.add("mybox");
  temp1.classList.add('box' + i);
  document.getElementById("main").appendChild(temp1);
}
///////////////////////////////////


$(".box"+conv(startPoint)).attr("id","start");
$(".box"+conv(endPoint)).attr("id","end");
////////////////////////////
//using live events///////////////////////////
// $("main").on("click","#search",function()
// {
//   var $popupTriggerElem = $(this);
//   changingStart = !changingStart;
//   if(changingStart)
//   {
//     $(".mybox").addClass("shiftpoint");
//   }
//
//   $(".mybox").on("click",function()
//   {
//     if(changingStart == true)
//     {
//
//       $(this).attr("id","start");
//       $popupTriggerElem.removeAttr("id");
//       changingStart = false;
//       $(".mybox").removeClass("shiftpoint");
//     }
//   });
// });
// $('#container').on('click', '.innerElement', function(){
//    /// Do stuff
// });


// $("#start").on("click",function()
// {
//   console.log("clicked");
//   $(this).removeAttr("id");
//   changingStart = true;
//   if(changingStart)
//   {
//     $(".mybox").addClass("shiftpoint");
//   }
//
//
//
// });

$(".mybox").on("click",function()
{

  if(this.id == "start" && changingStart == false)
  {
    $(this).removeAttr("id");
    $(".mybox").addClass("shiftpoint");
    changingStart = true;

  }
  else if (changingStart == true) {
    $(this).attr("id","start");
    startPoint = indexToPair(this.classList[1].slice(3));
    $(".mybox").removeClass("shiftpoint");
    changingStart = false;
    //var bg = "background: radial-gradient(at "+startPoint[1]/2+"% "+ startPoint[0]+"%, #b9fbc0 10px, #a3c4f3 30%, #f1c0e8 50%)";
    //document.getElementById("main").style.background = "background: radial-gradient(at "+startPoint[1]/2+"% "+ startPoint[0]+"%, #b9fbc0 10px, #a3c4f3 30%, #f1c0e8 50%)";
  }

  if(this.id == "end" && changingEnd == false)
  {
    $(this).removeAttr("id");
    $(".mybox").addClass("shiftpoint");
    changingEnd = true;
  }
  else if (changingEnd == true) {
    $(this).attr("id","end");
    endPoint = indexToPair(this.classList[1].slice(3));
    $(".mybox").removeClass("shiftpoint");
    changingEnd = false;
  }


});



//////////////////////////

var hoverEvent = false;
$(".mybox").hover(
  function() {
    if (hoverEvent) {
      $(this).addClass("wall");

      walls[parseInt(this.classList[1].slice(3))] = true;

      //  visited[parseInt(this.classList[1].slice(3))] = true;
    }
  }
);

$('body').on("keydown",function(event) {

  if(event.key == 'w')
  hoverEvent = true;
});
$('body').on("keyup",function(event) {

if(event.key == 'w')
  hoverEvent = false;
});
///////////////////////////////////////////////////////
//deleting walls
var dwallEvent =false;

$(".mybox").hover(
  function() {
    if (dwallEvent) {
      $(this).removeClass("wall");
    walls[parseInt(this.classList[1].slice(3))] = false;


}


    }

);
$('body').on("keydown",function(event) {

  if(event.key == 'q')
  dwallEvent = true;

});
$('body').on("keyup",function(event) {

  if(event.key == 'q')
  dwallEvent = false;
});

////////////////////////////////
$('body').on("keydown",function(event) {

  if(event.key == 'w')
  hoverEvent = true;
});
$('body').on("keyup",function(event) {


  hoverEvent = false;
});
///////////////////////////////////////////////////////




function conve(a, b) {
  var ans = a * tilesPerRow + b;
  return ans;
}

function conv(a) {
  var ans = a[0] * tilesPerRow + a[1];
  return ans;
}

function indexToPair(a)
{
  var dump = [0,0];
   dump[0] =  Math.floor(a/tilesPerRow);
   dump[1] =(a)%tilesPerRow;
   return dump;
}

function bfs(startPoint, endPoint) {

  var queue = [];
  var visited = [];
  var head = [];
  var endReached = false;

  //just initializing arrays
  for (var i = 0; i < totalTiles; i++) {
    visited.push(false);
    head.push(-1);

  }
  for (var i = 0; i < totalTiles; i++) {
    visited[i] = walls[i];

  }
/////////////////////////////////////


  /////////////////////////////////////////////
  var start = [0, 0];
  var end = [0, 0];
  start[0] = startPoint[0];
  start[1] = startPoint[1];
  end[0] = endPoint[0];
  end[1] = endPoint[1];
  /////////////////////////////////
  // document.getElementsByClassName("box" + conv(start))[0].style.background = "yellow";
  // document.getElementsByClassName("box" + conv(end))[0].style.background = "yellow";
  queue.push(start);

  visited[conve(start[0], start[1])] = true;



  function comp() {
    if (endReached == true) return;
    if (queue.length == 0) return;
    var popped = queue.shift();
    //console.log("popped element is " + popped);
    start[0] = popped[0];
    start[1] = popped[1];




    if (start[0] == end[0] && start[1] == end[1]) {
      end = conv(end);
      endReached = true;
      return pathf();
    }
    // document.getElementsByClassName("box" + conv(start))[0].style.background = "red";

    $(".box" + conv(start)).addClass("areaSearch");

    if (start[1] + 1 < tilesPerRow && visited[conve(start[0], start[1] + 1)] == false) {
      var temp = [0, 0];
      temp[0] = start[0];
      temp[1] = start[1] + 1;

      queue.push(temp);
      head[conv(temp)] = conv(start);
      visited[conve(start[0], start[1] + 1)] = true;


    }

    if (start[1] - 1 >= 0 && visited[conve(start[0], start[1] - 1)] == false) {
      var temp = [0, 0];
      temp[0] = start[0];
      temp[1] = start[1] - 1;

      queue.push(temp);
      head[conv(temp)] = conv(start);
      visited[conve(start[0], start[1] - 1)] = true;
    }

    if (start[0] + 1 < tilesperColumn && visited[conve(start[0] + 1, start[1])] == false) {
      var temp = [0, 0];
      temp[0] = start[0] + 1;
      temp[1] = start[1];

      queue.push(temp);
      head[conv(temp)] = conv(start);
      visited[conve(start[0] + 1, start[1])] = true;
    }

    if (start[0] - 1 >= 0 && visited[conve(start[0] - 1, start[1])] == false) {
      var temp = [0, 0];
      temp[0] = start[0] - 1;
      temp[1] = start[1];

      queue.push(temp);
      head[conv(temp)] = conv(start);
      visited[conve(start[0] - 1, start[1])] = true;
    }
    setTimeout(function() {

      //comp();
      comp();

    }, speed);
//comp();
  }



  function pathf() {
    if (end == -1) {
      return;
    }
  $(".box" + end).removeClass("areaSearch").addClass("path");
    end = head[end];
  //  console.log(end);
    setTimeout(function() {

      pathf();
    }, 50);
    // pathf();
  }


  comp();


}
$(".button1").on("click", () => {
  bfs(startPoint, endPoint);
});
$(".button2").on("click", () => {
  resetBoard();
});
