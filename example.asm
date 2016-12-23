data segment use16
cnt 	db 0

hero_x 	dw 50
hero_y 	dw 50

shots	dw 100 DUP(0)
shots_cnt dw 0

ships_models	db 	'   xx   ';0  
db	'  xxxx  ';1
db	'   xx   ';2
db	'  xxxx  ';3 This is hero model
db	'x  xx  x';4
db	'x  xx  x';5
db	'x xxxx x';6
db	' xxxxxx ';7

db 	' xxxxxx ';0
db	'x  xx  x';1
db	'x  xx  x';2
db	'xxxxxxxx';3
db	'  xxxx  ';4
db	'  xxxx  ';5
db	' x    x ';6
db	'x      x';7

db 	'        ';0
db	'  x   x ';1
db	'   x x  ';2
db	' xxxxxx ';3
db	'xx xx xx';4
db	'xxxxxxxx';5
db	'x x  x x';6
db	'        ';7

db 	'   xx   ';0
db	'  xxxx  ';1
db	' xxxxxx ';2
db	'xxxxxxxx';3
db	'xx xx xx';4
db	'xxxxxxxx';5
db	' x xx x ';6
db	'x x  x x';7					
ships_models_len equ $-ships_models