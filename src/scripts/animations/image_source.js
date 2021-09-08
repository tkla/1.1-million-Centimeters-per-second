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

export const Images = {
    bulletImage: bulletImage,
    defaultShip: defaultShip,
    playerShip: playerShip,
    meleeSwing: meleeSwing,
    crosshair: crosshair,
    axe: axe
}