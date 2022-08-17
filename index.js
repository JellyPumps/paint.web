const textInp=document.getElementById('swiTextInput');
const rangeInp=document.getElementById('stroke-width');
const canvas=document.getElementById('drawing-area')
const toolbar=document.getElementById('toolbar')
const ctx=canvas.getContext('2d');
const canvasOffX=canvas.offsetLeft;
const canvasOffY=canvas.offsetTop;
//
canvas.width=window.innerWidth-canvasOffX;
canvas.height=window.innerHeight-canvasOffY;
//
let isPainting=false;
let strokeWidth=5;
let startX;
let startY;
//
function updateTextInput(value)
{
    textInp.value=value;
}
//
function updateRangeInput(value)
{
    rangeInp.value=value;
}
textInp.addEventListener("keyup",({key})=>
{
    if(key==="Enter")
    {
        updateRangeInput(textInp.value);
    }
});
//
toolbar.addEventListener('click',e=>
{
    if(e.target.id==='clear')
    {
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
});
toolbar.addEventListener('change',e=>
{
    if(e.target.id==='stroke-color')
    {
        ctx.strokeStyle=e.target.value;
    }
    if(e.target.id==='stroke-width')
    {
        strokeWidth=e.target.value;
    }
});
//
const draw=(e)=>
{
    if(!isPainting)
    {
        return;
    }
    ctx.lineWidth=strokeWidth;
    ctx.lineCap='round';
    ctx.lineTo(e.clientX-canvasOffX,e.clientY);
    ctx.stroke();
}
//
canvas.addEventListener('mousedown',e=>
{
    isPainting=true;
    startX=e.clientX;
    startY=e.clientY;
});
canvas.addEventListener('mouseup',e=>
{
    isPainting=false;
    ctx.stroke();
    ctx.beginPath();
});
canvas.addEventListener('mousemove',draw);