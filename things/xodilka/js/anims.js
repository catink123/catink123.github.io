import Animation from './Animation.js';

let anims = [];
anims.push(
    new Animation(
        'stand', 
        './assets/stand.png', 
        40, 
        [50, 93]
    )
);
anims.push(
    new Animation(
        'walk', 
        './assets/walk.png', 
        40
    )
);
anims.push(
    new Animation(
        'appear', 
        './assets/appear.png', 
        21, 
        [0, 322],
        true
    )
);
anims.push(
    new Animation(
        'attack', 
        './assets/attack.png', 
        30,
        null,
        true
    )
);
anims.push(
    new Animation(
        'run', 
        './assets/run.png', 
        50,
    )
);

let cache = {}

export default anims;