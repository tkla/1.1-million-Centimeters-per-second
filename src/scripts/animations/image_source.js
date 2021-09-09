//Image loading

const bulletImage = new Image();
bulletImage.src = 'src/images/projectiles/player_bullet.png';

const defaultShip = new Image();
defaultShip.src = 'src/images/Ship6.png';

const playerShip = new Image();
playerShip.src = 'src/images/Ship2.png';

const meleeSwing = new Image();
meleeSwing.src = 'src/images/swing.png'

const crosshair = new Image(); 
crosshair.src = 'src/images/crosshair.png'

const axe = new Image(); 
axe.src = 'src/images/axe.png'

const background = new Image(); 
background.src = 'src/images/Background.png'

const explosion = new Image(); 
explosion.src = 'src/images/explosion.png'

const hit = new Image(); 
hit.src = 'src/images/hit.png'

const doctor = new Audio("src/images/doctor.mp3"); 
doctor.volume = 0.2;
export const Images = {
    bulletImage: bulletImage,
    defaultShip: defaultShip,
    playerShip: playerShip,
    meleeSwing: meleeSwing,
    crosshair: crosshair,
    axe: axe,
    background: background,
    explosion: explosion,
    hit: hit,
    doctor: doctor
}