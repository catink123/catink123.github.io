let activateButton = document.querySelector("#activate");
let cardCarousel = document.querySelector("#cardCarousel");

activateButton.addEventListener("click", () => {
    activateButton.classList.add("anim");
    cardCarousel.classList.add("anim");
});

function makeCard(caption, image) {
    let card = document.createElement("div");
        card.className = "card";
    let img = document.createElement("img");
        img.src = image;
    let captionP = document.createElement("p");
        captionP.innerHTML = caption;
    card.appendChild(img);
    card.appendChild(captionP);
    return card;
}

const cards = [
    {
        image: 'assets/IMG_20200328_164938.jpg',
        caption: 'Перестань париться о пустяках, ты лучший.'
    },
    {
        image: 'assets/IMG_20191030_162943.jpg',
        caption: 'Никто и ничто не смеет портить тебе жизнь.'
    },
    {
        image: 'assets/IMG_20200507_194523.jpg',
        caption: 'Просто отвлекись, подумай о хороших вещах, которые существуют, могут быть или были.'
    },
    {
        image: 'assets/IMG_20200618_122414.jpg',
        caption: 'Не волнуйся, не бойся, в твоей жизни всё хорошо, просто забудь о плохих вещах.'
    }
];

function preloadImages() {
    for (const index in cards) {
        let img = new Image();
        img.src = cards[index].image;
    }
}

preloadImages()

let currentPos = 0;

let currentPosP = document.querySelector("#currentPosition");

currentPosP.innerHTML = (currentPos + 1) + " / " + cards.length;

for (const index in cards) {
    let cardContainer = document.createElement("div");
        cardContainer.className = "cardContainer";
    cardContainer.appendChild(makeCard(cards[index].caption, cards[index].image));
    cardCarousel.appendChild(cardContainer);
}

let nextButton = document.querySelector("#next");
let prevButton = document.querySelector("#prev");
prevButton.disabled = true;

function moveCarousel(isNegative) {
    if (isNegative) currentPos--;
    else currentPos++;
    if (currentPos === 0) prevButton.disabled = true;
    else prevButton.disabled = false;
    if (currentPos === cards.length - 1) nextButton.disabled = true;
    else nextButton.disabled = false;
    currentPosP.innerHTML = (currentPos + 1) + " / " + cards.length;
    document.querySelectorAll(".cardContainer").forEach(e => {
        e.style.transform = `translateX(-${currentPos}00%)`;
    });
}

nextButton.addEventListener("click", () => moveCarousel());
prevButton.addEventListener("click", () => moveCarousel(true));