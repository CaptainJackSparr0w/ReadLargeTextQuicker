var TextToRead = "";
var arr;
TextToRead = "Let me start with giving you my background. I am a professional, Government licenced Private Investigator. 20 years of active field operations. Trained to be highly analytical, hyper attention to detail and awareness. I am the the person to ask the right questions, analyze in highly stressful and emotionally impactful moments, to dig out the truth.";

var index = -1;

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth * (4/5);
ctx.canvas.height = window.innerHeight * (4/5);

// DrawWord(word);
// ClearCanvas();

function Start()
{
    arr = CreateArray(TextToRead);
    var duration = document.getElementById("duration").value;
    if(duration == undefined || duration == NaN)
    {
        duration = 1000;
    }
    setInterval(myTimer, duration);
}



function CreateArray(str)
{
    return str.trim().split(" ");
}

function myTimer() 
{
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