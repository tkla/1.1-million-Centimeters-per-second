-Background-

A scrolling shooter game with a top down perspective and a screen constantly moving forwards. You control a ship/character which can fire projectiles at your mouse location. 

Enemies will incrementally come in from the top and sides of the screen as the level progresses. They will either fire projectiles or attempt to collide with the player to inflict damage. The game will be completed if players can survive to the end of the level or alternatively a timer.

Players must either dodge or destroy these enemy ships in order to survive. Players will also have access to a parry attack that will hit a small area in front of the ship. If properly timed this will reflect certain projectiles back towards their mouse location. 

Points will be earned for enemies destroyed, projectiles reflected, and how close projectiles come within player's ship hitbox.

-Functionality & MVPs-

1 minute play time. Stage size will be determined by scroll speed and will correlate to the 1 minute total playtime.

A controllable ship with ability to fire projectiles and a parry attack to reflect projectiles.

Enemy ships coming in at predetermined intervals firing at player.

Scoring system.

Backend DB to store Username + UserScore. No actual user accounts.

Bonus: Implement a boss battle. Only if time permits."		"Friday: Game UI outline. Mockup of site layout. Core stack selected. Research implementation techniques.


-Wireframes-

![wireframe](https://user-images.githubusercontent.com/24663645/131952075-ce52c62a-bac5-457e-b4d6-d9043a4b04ba.png)

Technologies, Libraries, APIs
Html, Javascript, CSS, Canvas, webgl or three.js (maybe)

-Implementation Timeline-

Friday: Game UI outline. Mockup of site layout. Core stack selected. Research implementation techniques.

Saturday: Player and Enemy class created with projectiles and basic movement. Collision implemented. Very basic enemy AI, they will only move along on set paths firing bullets with either predetermined patterns or aimed at player.

Sun-Tues: Stage creation. Scrolling screen implemented. Parry attack implemented. Enemy spawning. 

Wednesday: Scoring system. Stage completion check. Music/sounds. Custom styling for player attacks. 
