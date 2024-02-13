const wordBlocks = document.getElementsByClassName('wordBlock')
const buildSentence = document.querySelector('.buildSentence')

// needs more work
for (let i = 0; i < wordBlocks.length; i++) {
    wordBlocks[i].addEventListener('click', () => {
        let div = document.createElement('div')
        div.innerHTML = wordBlocks[i].innerHTML
        div.classList.add('wordBlock')

        wordBlocks[i].classList.add('hide')

        buildSentence.append(div)
    })
}