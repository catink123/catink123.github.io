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
anims.push(
    new Animation(
        'enemyWalk',
        './assets/enemyWalk.png',
        64,
        [0, 151]
    )
)
anims.push(
    new Animation(
        'enemyHit1',
        './assets/enemyHit1.png',
        39,
        [0, 150],
        true
    )
)
anims.push(
    new Animation(
        'enemyHit2',
        './assets/enemyHit2.png',
        39,
        [0, 150],
        true
    )
)

anims.push(
    new Animation(
        'blank',
        './assets/blank.png',
        0
    )
)

anims.push(
    new Animation(
        'ahegao',
        './assets/ahegao.png',
        50,
        [0, -100]
    )
)

export default anims;