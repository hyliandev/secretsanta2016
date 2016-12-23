// == INITIALIZE ==
// ================

var keyPressNumber=0;

function init(){
	C().init();
	A().load();
	
	window.addEventListener('keydown',function(){
		window.keyPressNumber++;
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
			C().draw();
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
		// Nothing yet
	},
	
	draw:function(){
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
				
		C().d.drawImage(
			A().images[3].obj,
			0,
			0
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
		for(var i in code){
			C().d.fillText(
				code[i],
				200,
				(i * 16) + 96
			);
		}
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