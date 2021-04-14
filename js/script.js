"use strict"
const keyboard = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const wordArray = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"]
document.onkeypress = function (e) {
    e = e || window.event;
    gussedWord(e)
};
const [wordContainer, keyboardContainer, gameContainer, gameOver, gameOverHeader, title, correctWord, counterSquare] = [document.querySelector(".wordContainer"), document.querySelector(".keyboard"), document.querySelector(".game-container"), document.querySelector(".game-over"), document.querySelector(".game-over-header"), document.querySelector(".title"), document.querySelector(".correct-word"), document.querySelector(".square0")]
let wordToGuess = wordArray[Math.floor(Math.random() * wordArray.length)].split("")
const finalWord = wordToGuess.join("")
const [originalWord, hint1,] = [wordToGuess.join(""), getHint()]
let [tempHint, deathCount] = [getHint(), 4]
while (tempHint) {
    if (tempHint != hint1) {
        break;
    } else {
        tempHint = getHint()
    }
}
const hint2 = tempHint
counterSquare.innerText = deathCount;
function getHint() {
    return wordToGuess[Math.floor(Math.random() * wordToGuess.length)]
}
wordToGuess.forEach((l, index) => {
    let spanElement = document.createElement("span")
    let span = wordContainer.appendChild(spanElement);
    span.classList.add("btn", "guessed-btn-box", "gussedLetter")
    span.textContent = "?"
    span.id = `letter${index + 1}`
})
if (hint1 && hint2) {
    populateGuessedWord(`#letter${wordToGuess.indexOf(hint1) + 1}`, hint1)
    populateGuessedWord(`#letter${wordToGuess.indexOf(hint2) + 1}`, hint2)
}

function populateGuessedWord(id, hintName) {
    let element = document.querySelector(id)
    element.innerHTML = hintName.toUpperCase()
    element.classList.remove('guessed-btn-box')
    element.classList.add('btn-success')
    wordToGuess[wordToGuess.indexOf(hintName)] = "0"
}

keyboard.forEach((letter, index) => {
    let spanElement = document.createElement("span")
    let breakElement = document.createElement("br")
    if (index === 10) {
        keyboardContainer.appendChild(breakElement);
    }
    if (index === 19) {
        keyboardContainer.appendChild(breakElement);
    }
    let span = keyboardContainer.appendChild(spanElement);
    span.classList.add("btn", "keyboard-btn")
    span.textContent = letter
    span.addEventListener("click", gussedWord)
})

function gussedWord(e) {
    let letter = null
    e.type == 'click' ? letter = e.target.innerHTML.toLowerCase() : letter = e.key
    if (deathCount >= 1) {
        if (wordToGuess.includes(letter)) {
            performSound("./assets/music/correct.mp3")
            populateGuessedWord(`#letter${wordToGuess.indexOf(letter) + 1}`, letter)
            if (wordToGuess.every((letter) => letter == "0")) {
                setGameOverBoard("none", "flex", "rgba(65, 117, 5, 0.45)", "You Won!!", "Hurray! You guessed correct:")
            }
        } else {
            performSound("./assets/music/wrong.mp3")
            deathCount--;
            updateDeathCount(deathCount)
        }
    } else {
        setGameOverBoard("none", "flex", "rgba(208, 2, 27, 0.45)", "You Lose!!", "Alas! correct word was:")
    }
}

function setGameOverBoard(gameContainerDisplay, gameOverDisplay, gameOverBg, gameOverHeaderText, titleText) {
    gameContainer.style.display = gameContainerDisplay
    gameOver.style.display = gameOverDisplay
    gameOver.style.background = gameOverBg
    gameOverHeader.innerText = gameOverHeaderText
    title.innerText = titleText
    correctWord.innerText = finalWord.toUpperCase()
}

function performSound(audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
}

function updateDeathCount(deathCount) {
    document.querySelector(".square0").innerText = deathCount;
    document.querySelectorAll(`.square${deathCount}`).forEach((elem) => {
        elem.style.backgroundColor = "red"
    });
}

document.querySelector(".reset").addEventListener("click", function () {
    window.location.reload()
})