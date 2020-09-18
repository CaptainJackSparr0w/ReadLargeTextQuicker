var TextToRead = "";
var arr;
var isPaused = false;
var allText = document.getElementById("AllText");
var pauseBtn = document.getElementById("PauseBtn");

var index = -1;

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth * (4/5);
ctx.canvas.height = window.innerHeight * (4/5);

allText.style.width = window.innerWidth * (0.8/5);
allText.style.height = window.innerHeight * (4/5);

// DrawWord(word);
// ClearCanvas();

function Start()
{
    TextToRead = allText.value;
    arr = CreateArray(TextToRead);
    index = -1;
    var duration = document.getElementById("duration").value;
    if(duration == undefined || duration == NaN || duration == "")
    {
        duration = 1000;
    }
    setInterval(myTimer, duration);
}
function Pause()
{
    if(isPaused)
    {
        isPaused = false;
        pauseBtn.setAttribute("value", "Pause");
    }
    else if(!isPaused)
    {
        isPaused = true;
        pauseBtn.setAttribute("value", "Play");
    }
        
}


function CreateArray(str)
{
    return str.trim().split(" ");
}

function myTimer() 
{
    if(isPaused)
        return;

    var word = GetNextWord();
    if(word == undefined)
    {
        word = "~~~";
        DrawWord(word);
        clearInterval();
    }
    ClearCanvas();
    DrawWord(word);
      
}

function DrawWord(word)
{
    ctx.font = "200px Arial";
    // ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(word, canvas.width/2, canvas.height/2);

}

function ClearCanvas()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function GetNextWord()
{
    index++;
    return arr[index];
}