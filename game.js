// == INITIALIZE ==
// ================

var screenID=1;

var keyPressNumber=0;

var setScreenTitle='';
var oldScreenTitle='';
var screenTitle='';

var screenTitleTimerLimit=2;
var screenTitleTimer=0;

var isEnterDown=false;

function init(){
	C().init();
	A().load();
	
	window.addEventListener('keydown',function(e){
		if(screenID==0) window.keyPressNumber++;
		
		if(e.keyCode==13) window.isEnterDown=true;
	});
	
	window.addEventListener('keyup',function(e){
		if(e.keyCode==13) window.isEnterDown=false;
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
				setScreenTitle=doBreak ? 'Start typing your code!' : 'Great, now hit Enter!';
				
				if(!doBreak && window.isEnterDown) screenID=1;
			break;
			// == END MONITOR LEVEL ==
			// =======================
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// == PAINT THE MOBO ==
			// ====================
			case 1:
				setScreenTitle='Nite Shadow Makes A Game!';
			break;
			// == END PAINT THE MOBO ==
			// ========================
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