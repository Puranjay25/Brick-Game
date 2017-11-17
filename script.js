var canvas=document.getElementById('mycanvas');
var ctxt=canvas.getContext('2d');

var x=200;
var y=300;
var dx=2;
var dy=-2;
var brickwidth=75;
var brickheight=10;
var brickx=(canvas.width-brickwidth)/2;
var bricky=(canvas.height-brickheight);
var leftpressed=false;
var rightpressed=false;
var rownumber=3;
var columnnumber=5;
var blockheight=10;
var blockwidth=60;
var blockpadding=4;
var blocktopspace=5;
var blockleftspace=5;
var score=0;

block=[];
for(r=0;r<rownumber;r++)
{
	block[r]=[];
	for(c=0;c<columnnumber;c++)
	{
		block[r][c]={x:0,y:0,status:1}
	}
}

document.addEventListener("keydown",keypressed);
document.addEventListener("keyup",keynotpressed);

function keypressed(e)
{
	if(e.keyCode==37)
		leftkeypressed=true;
	else
		if(e.keyCode==39)
			rightpressed=true;
}
function keynotpressed(e)
{
	if(e.keyCode==37)
		leftkeypressed=false;
	else
		if(e.keyCode==39)
			rightpressed=false;
}
function detectcollision()
{
	for(r=0;r<rownumber;r++)
	{
		for(c=0;c<columnnumber;c++)
		{
			var b=block[r][c];
			if(b.status==1)
			{
				if(x>b.x&&x<b.x+blockwidth&&y>b.y&&y<b.y+blockheight)
				{	dy=-dy;
					b.status=0;
					score++;
					if(score==rownumber*columnnumber)
					{
						alert("YOU WIN with SCORE "+score);
						document.location.reload();
					}
				}
			}
		}
	}
}
function displayscore()
{
	ctxt.font="16px Arial";
	ctxt.fillStyle="blue";
	ctxt.fillText("Score: "+score,330,20);
}
function blocks()
{
	for(r=0;r<rownumber;r++)
	{
		for(c=0;c<columnnumber;c++)
		{
			if(block[r][c].status==1)
			{	var blockx=(c*(blockpadding+blockwidth))+blockleftspace;
				var blocky=(r*(blockpadding+blockheight))+blocktopspace;
				block[r][c].x=blockx;
				block[r][c].y=blocky;
				ctxt.beginPath();
				ctxt.rect(blockx,blocky,blockwidth,blockheight);
				ctxt.fillStyle="red";
				ctxt.fill();
				ctxt.closePath();
			}
		}
	}
}
function brick()
{
	ctxt.beginPath();
	ctxt.rect(brickx,bricky,brickwidth,brickheight);
	ctxt.fillStyle="red";
	ctxt.fill();
	ctxt.closePath();
}
function ball()
{
	ctxt.beginPath();
	ctxt.arc(x,y,10,0,Math.PI*2);
	ctxt.fillStyle="blue";
	ctxt.fill();
	ctxt.closePath();
}
function reappear()
{
	ctxt.clearRect(0,0,canvas.width,canvas.height);
	ball();
	brick();
	detectcollision();
	blocks();
	displayscore();
	x+=dx;
	y+=dy;
	if(y<10)
		dy=-dy;
	else
	{
		if(y>canvas.height-10)
		{
			if((x+10>brickx&&x+10<brickx+brickwidth)||(x-10>brickx&&x-10<brickx+brickwidth))
				dy=-dy;
			else
				if(y+10>bricky)
			{
				alert("GAME OVER with SCORE "+score);
				document.location.reload();
			}
		}
	}
	if(x<10||x>canvas.width-10)
		dx=-dx;
	if(leftkeypressed&&brickx>0)
		brickx-=5;
	else
		if(rightpressed&&brickx<canvas.width-brickwidth)
			brickx+=5;

}
setInterval(reappear,10);
