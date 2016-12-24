// == INITIALIZE ==
// ================

var screenID=6;

var keyPressNumber=0;

var setScreenTitle='';
var oldScreenTitle='';
var screenTitle='';

var screenTitleTimerLimit=2;
var screenTitleTimer=0;

var nsImgYDir=false;
var nsImgY=0;

var isEnterDown=false;

var isClicking=false;

var coords=[];

var ram=null;
var ramStart=null;

var corners={
	bl:0,
	br:0,
	tl:0,
	tr:0
};

var ns={
	health:100,
	X:64,
	Y:128
};

var mouse={
	X:0,
	Y:0
};
function M(){return window.mouse;}

function init(){
	C().init();
	A().load();
	
	window.ramStart={
		X:(C().c.width - A().images[2].obj.width)/2,
		Y:375
	};
	window.ram={
		X:window.ramStart.X,
		Y:window.ramStart.Y,
		clickX:0,
		clickY:0,
		dragging:false,
		done:false
	};
	
	window.addEventListener('keydown',function(e){
		if(window.screenID==0) window.keyPressNumber++;
		
		if(e.keyCode==13){
			window.isEnterDown=true;
			setTimeout(function(){window.isEnterDown=false;},1000/60);
		}
	});
	
	window.addEventListener('keyup',function(e){
		if(e.keyCode==13) window.isEnterDown=false;
	});
	
	window.addEventListener('mousemove',function(e){
		window.mouse.X=e.clientX - parseInt(C().c.style.left);
		window.mouse.Y=e.clientY - parseInt(C().c.style.top);
		
		if(window.screenID==4){
			if(window.ram.dragging){
				window.ram.X=window.mouse.X - window.ram.clickX;
				window.ram.Y=window.mouse.Y - window.ram.clickY;
			}
		}
	});
	
	window.addEventListener('mousedown',function(){
		window.isClicking=true;
		
		if(window.screenID==4){
			if(
				window.ram.dragging==false &&
				window.mouse.X > window.ram.X && window.mouse.X < window.ram.X + A().images[2].obj.width &&
				window.mouse.Y > window.ram.Y && window.mouse.Y < window.ram.Y + A().images[2].obj.height
			){
				window.ram.dragging=true;
				window.ram.clickX=window.mouse.X - window.ram.X;
				window.ram.clickY=window.mouse.Y - window.ram.Y;
			}
		}
	});
	
	window.addEventListener('mouseup',function(){
		window.isClicking=false;
		window.ram.dragging=false;
	});
}










// == ASSETS ==
// ============
var Assets={
	// == FUNCTIONS ==
	// ===============
	
	load:function(){
		for(var i in A().images){
			var a=A().images[i];
			a.obj=new Image();
			a.obj.src=a.url;
		}
		
		for(var i in A().audio){
			var a=A().audio[i];
			a.obj=new Howl({src:[a.url]});
		}
	},
	
	
	
	
	
	// == VARIABLES ==
	// ===============
	
	images:[
		{
			url:'canvas.png',
			obj:null
		},
		{
			url:'pcb.png',
			obj:null
		},
		{
			url:'ram.png',
			obj:null
		},
		{
			url:'monitor.png',
			obj:null
		},
		{
			url:'ns.gif',
			obj:null
		},
		{
			url:'brush.png',
			obj:null
		},
		{
			url:'brush_hover.png',
			obj:null
		},
		{
			url:'pcb_outline.png',
			obj:null
		},
		{
			url:'phanto.png',
			obj:null
		},
		{
			url:'phanto_hurt.png',
			obj:null
		}
	],
	
	
	
	audio:[
		{
			url:'keysound.wav',
			obj:null
		}
	]
};
function A(){return window.Assets;}










// == CANVAS ==
// ============
var Canvas={
	// == FUNCTIONS ==
	// ===============
	
	init:function(){
		// Set the canvas-related variables
		C().c=document.getElementById('c');
		C().d=C().c.getContext('2d');
		C().loop=setInterval(function(){
			if(C().paused) return;
			C().step();
		},1000/60);
		C().sizeAndPosition();
		window.addEventListener('resize',function(){C().sizeAndPosition()});
		
		// Make the game's code all pause when you aren't focused on this screen
		window.addEventListener('blur',function(){
			C().paused=true;
		});
		window.addEventListener('focus',function(){
			C().paused=false;
		});
	},
	
	step:function(){
		C().d.clearRect(
			0,
			0,
			C().c.width,
			C().c.height
		);
		
		for(var i=0;i<2;i++){ for(var j=0;j<2;j++){
			C().d.drawImage(
				A().images[0].obj,
				A().images[0].obj.width * j,
				A().images[0].obj.height * i
			);
		} }
		
		// When you want to change it, change setScreenTitle
		// It will compare setScreenTitle to oldScreenTitle
		// - If they're different, it will do this:
		// - - if screenTitle isn't the same as setScreenTitle, it'll assume it's still typing it out, and add another character to the end
		// - - if they're the same, then set oldScreenTitle to the same value as setScreenTitle
		var setScreenTitle=window.setScreenTitle;
		var oldScreenTitle=window.oldScreenTitle;
		var screenTitle=window.screenTitle;
		
		var screenTitleTimerLimit=window.screenTitleTimerLimit;
		var screenTitleTimer=window.screenTitleTimer;
		
		
		
		
		
		
		
		
		
		
		// == SCREENS ==
		// =============
		switch(window.screenID){
			// == MONITOR LEVEL ==
			// ===================
			case 0:
				C().d.drawImage(
					A().images[3].obj,
					0,
					64
				);
				
				var code=[
					'data segment use16',
					'cnt 	db 0',
					'hero_x 	dw 50',
					'hero_y 	dw 50',
					'shots	dw 100 DUP(0)',
					'shots_cnt dw 0',
					'ships_models_len equ',
					"db	'  xxxx  '",
					"db	'   xx   '",
					"db	'  xxxx  '",
					"db	'x  xx  x'",
					"db	'x  xx  x'",
					"db	'x xxxx x'",
				];
				
				C().d.fillStyle='#0F0';
				C().d.font='16px Courier';
				C().d.textAlign='left';
				var charsDrawn=0;
				for(var i in code){
					var doBreak=false;
					var str=code[i];
					if((charsDrawn=charsDrawn+str.length) > window.keyPressNumber){
						str=str.substr(0,
							window.keyPressNumber - (charsDrawn-str.length)
						);
						doBreak=true;
					}
					C().d.fillText(
						str,
						200,
						(i * 16) + 160
					);
					if(doBreak) break;
				}
				C().d.fillRect(
					200 + (str.length * 10),
					(i * 16) + 150,
					12,
					12
				);
				setScreenTitle=doBreak ? 'Start typing your code!' : 'Great, now hit Enter!';
				
				if(!doBreak && window.isEnterDown) screenID=5;
			break;
			// == END MONITOR LEVEL ==
			// =======================
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// == TITLE SCREEN ==
			// ====================
			case 1:
				setScreenTitle='Nite Shadow Makes A Game!';
				
				var nsimg=A().images[4].obj;
				
				if(Math.abs(window.nsImgY) >= (n=12)) window.nsImgYDir=!window.nsImgYDir;
				
				window.nsImgY+=(
				(window.nsImgYDir ? 1 : -1)
				);
				
				C().d.drawImage(
					nsimg,
					(C().c.width - nsimg.width) / 2,
					((C().c.height - nsimg.height) / 2) + window.nsImgY
				);
				
				if(window.oldScreenTitle==window.setScreenTitle){
					C().d.textAlign='center';
					C().d.fillText(
						'Press Enter',
						C().c.width/2,
						400
					);
				}
				
				if(window.isEnterDown) screenID=2;
			break;
			// == END TITLE SCREEN ==
			// ========================
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// == GRAB BRUSH ==
			// ===============
			case 2:
				setScreenTitle='First, grab your brush!';
				
				var imgID=5;
				
				var bX=(C().c.width - A().images[5].obj.width) / 2;
				var bY=(C().c.height - A().images[5].obj.height) / 2;
				
				if(
					window.mouse.X >= bX && window.mouse.X < bX + A().images[imgID].obj.width &&
					window.mouse.Y >= bY && window.mouse.Y < bY + A().images[imgID].obj.height
				) imgID=6;
				
				C().d.drawImage(
					A().images[imgID].obj,
					bX,
					bY
				);
				
				if(imgID==6 && window.isClicking) screenID=3;
			break;
			// == END GRAB BRUSH ==
			// ===================
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// == PAINT MOBO ==
			// ================
			case 3:
				setScreenTitle='Now, paint the motherboard';
				
				var oimg=A().images[7].obj;
				var oimgX=(C().c.width - oimg.width) / 2;
				var oimgY=(C().c.height - oimg.height) / 2;
				
				var img=A().images[1].obj;
				
				var coords=window.coords;
				
				var corners=window.corners;
				
				var theNumber=20;
				
				if(!(done=corners.br > theNumber && corners.bl > theNumber && corners.tl > theNumber && corners.br > theNumber)){
					if(window.isClicking){
						var addMe=[window.mouse.X,window.mouse.Y];
						
						if(addMe[0] < oimgX + (oimg.width / 2))
							if(addMe[1] > oimgY + (oimg.height / 2))
								corners.bl++;
							else
								corners.tl++;
						else
							if(addMe[1] > oimgY + (oimg.height / 2))
								corners.br++;
							else
								corners.tr++;
						
						window.corners=corners;
						
						coords.push(addMe);
					}
					
					for(var i in coords){
						var c=coords[i];
						
						if(c[0] >= oimgX && c[0] < oimgX + oimg.width && c[1] >= oimgY && c[1] < oimgY + oimg.height){
							C().d.fillStyle='#393';
							C().d.beginPath();
							C().d.arc(c[0],c[1],28,2*Math.PI,false);
							C().d.fill();
						}
					}
				}
				
				C().d.drawImage(
					oimg,
					oimgX,
					oimgY
				);
				
				if(done){
					C().d.drawImage(
						img,
						(C().c.width - img.width) / 2,
						(C().c.height - img.height) / 2
					);
					setScreenTitle='Awesome!';
					C().d.textAlign='center';
					C().d.fillText(
						'Press Enter',
						C().c.width/2,
						425
					);
					if(window.isEnterDown) window.screenID=4;
				}
			break;
			// == END PAINT MOBO ==
			// ====================
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// == INSTALL RAM ==
			// =================
			case 4:
				setScreenTitle='Install the RAM';
				
				var rimg=A().images[2].obj;
				var img=A().images[1].obj;
				
				var imgX=(C().c.width - img.width) / 2;
				var imgY=(C().c.height - img.height) / 2;
				
				if(
					!window.ram.dragging &&
					window.ram.X > imgX && window.ram.X < imgX + rimg.width &&
					window.ram.Y > imgY - 64 && window.ram.Y < imgY - 32
				){
					window.ram.done=true;
				}
				
				if(!window.ram.dragging && !window.ram.done){
					window.ram.X=window.ramStart.X;
					window.ram.Y=window.ramStart.Y;
				}
				
				C().d.drawImage(
					img,
					imgX,
					imgY
				);
				
				C().d.drawImage(
					rimg,
					window.ram.X,
					window.ram.Y
				);
				
				if(window.ram.done){
					setScreenTitle='Awesome!';
					C().d.textAlign='center';
					C().d.fillText(
						'Press Enter',
						C().c.width/2,
						425
					);
					if(window.isEnterDown) window.screenID=0;
				}
			break;
			// == END INSTALL RAM ==
			// =====================
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// == GAME IS READY ==
			// ===================
			case 5:
				setScreenTitle='Your game is ready!';
				
				C().d.drawImage(
					A().images[3].obj,
					0,
					64
				);
				
				if(setScreenTitle==screenTitle){
					C().d.textAlign='center';
					C().d.fillText(
						'Press Enter',
						C().c.width/2,
						425
					);
					if(window.isEnterDown) window.screenID=6;
				}
			break;
			// == END GAME IS READY ==
			// =======================
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// == THE GAME ==
			// ==============
			case 6:
				// phanto: 8
				// phanto_hurt: 9
				C().d.fillStyle='#0055FF';
				C().d.fillRect(
					0,
					0,
					C().c.width,
					C().c.height
				);
				
				C().d.drawImage(
					A().images[4].obj,
					window.ns.X,
					window.ns.Y
				);
			break;
		}
		
		// Do screenTitle
		if(setScreenTitle!=oldScreenTitle){
			if(screenTitle==setScreenTitle)
				oldScreenTitle=setScreenTitle;
			else{
				if(screenTitle.length>=setScreenTitle.length || (screenTitle==oldScreenTitle && oldScreenTitle!='')) screenTitle='';
				
				if(--screenTitleTimer <= 0){
					screenTitleTimer=screenTitleTimerLimit;
					screenTitle+=setScreenTitle.substr(screenTitle.length,1);
					if(screenTitle.length % 3 == 0) A().audio[0].obj.play();
				}
			}
		}
		
		C().d.fillStyle='#333';
		C().d.font='48px sans-serif';
		C().d.textAlign='center';
		C().d.fillText(
			screenTitle,
			C().c.width / 2,
			64
		);
		
		window.oldScreenTitle=oldScreenTitle;
		window.setScreenTitle=setScreenTitle;
		window.screenTitle=screenTitle;
		
		window.screenTitleTimerLimit=screenTitleTimerLimit;
		window.screenTitleTimer=screenTitleTimer;
	},
	
	sizeAndPosition:function(){
		C().c.width=C().size.width;
		C().c.height=C().size.height;
		C().c.style.position='relative';
		C().c.style.left=(window.innerWidth - C().c.width) / 2 + 'px';
		C().c.style.top=(window.innerHeight - C().c.height) / 2 + 'px';
	},
	
	
	
	
	
	// == VARIABLES ==
	// ===============
	
	// The canvas element
	c:null,
	// The canvas context, used for drawing
	d:null,
	// The game loop
	loop:null,
	// Whether or not the game window is paused. This makes the game do not code; this is not like a pause button
	paused:false,
	// The virtual size of the screen
	size:{
		width:640,
		height:480
	}
};
function C(){return window.Canvas;}