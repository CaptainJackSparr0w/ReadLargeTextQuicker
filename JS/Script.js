var TextToRead = "";
var textColor = "#162727";//"darkslategray"; //"blanchedalmond";
var arr;
var timer;
var isPaused = false;
var allText = document.getElementById("AllText");
var pauseBtn = document.getElementById("PauseBtn");
var seekbar = document.getElementById("seekbar");
var slider = document.getElementById("slider");


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
    if(timer != undefined)
        clearInterval(timer);

    //String.prototype.replace()
    TextToRead = allText.value.replace(/\n/g, " ").replace("  "," ");
    arr = CreateArray(TextToRead);
    index = -1;
    var duration = document.getElementById("duration").value;
    if(duration == undefined || duration == NaN || duration == "")
    {
        duration = 1000;
    }
    timer = setInterval(myTimer, duration);
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
        clearInterval(timer);
    }
    ClearCanvas();
    DrawWord(word);
    progressSlider();
}

function DrawWord(word)
{
    ctx.font = "200px Segoe UI";
    ctx.fillStyle = textColor;
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

//seekbar code
function seek(e)
{
    slider.style.left = e.clientX - slider.offsetWidth / 2 + 'px';
    index = parseInt(arr.length * (e.clientX / seekbar.offsetWidth)) - 1; 
    console.log(arr.length);
    console.log(seekbar.offsetWidth);
    console.log(e.clientX);
    console.log(parseInt(arr.length * (e.clientX / seekbar.offsetWidth)) - 1);
}

function getStepLength()
{
    return seekbar.offsetWidth/arr.length;
}

function progressSlider()
{
    slider.style.left = slider.offsetLeft + getStepLength() +'px';
}

// setInterval(progressSlider, 1000);