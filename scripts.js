/*

Using Array.from() because:

from --> https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection :

An HTMLCollection in the HTML DOM is live; 
it is automatically updated when the underlying document is changed. 
For this reason it is a good idea to make a copy (e.g., using Array.from) 
to iterate over if adding, moving, or removing nodes.

*/

const removeChildren = container => {
    if (container.childElementCount > 0) {
        Array.from(container.children).forEach(el => container.removeChild(el))
    }
}

const addEventToWordBlock = (wordBlock, wordBlocksContainer, buildSentence) => {
    wordBlock.addEventListener('click', () => {

        let div = document.createElement('div')
        div.innerHTML = wordBlock.innerHTML
        div.classList.add('wordBlockClicked')

        wordBlocksContainer.removeChild(wordBlock)

        buildSentence.append(div)
    })
}

const sentenceToMatch = 'Build a sentence'
const wordBlocks = Array.from(document.getElementsByClassName('wordBlock'))
const buildSentence = document.querySelector('.buildSentence')
const wordBlocksContainer = document.querySelector('.wordBlocks')
const reset = document.querySelector('.reset')
const submit = document.querySelector('.submit')

for (let i = 0; i < wordBlocks.length; i++) {
    addEventToWordBlock(wordBlocks[i], wordBlocksContainer, buildSentence)
}

reset.addEventListener('click', () => {
    removeChildren(wordBlocksContainer)
    removeChildren(buildSentence)

    for (let i = 0; i < wordBlocks.length; i++) {
        let div = document.createElement('div')
        div.innerHTML = wordBlocks[i].innerHTML
        div.classList.add(wordBlocks[i].className)

        wordBlocksContainer.append(div)

        addEventToWordBlock(div, wordBlocksContainer, buildSentence)
    }
})

submit.addEventListener('click', () => {
    const sentenceBuilt = Array.from(buildSentence.children).map(el => el.innerHTML)
    let result = null

    if (sentenceBuilt.length > 0) {
        result = sentenceBuilt.reduce((acc, curr) => acc + ' ' + curr) 
        
        if (result !== sentenceToMatch) {
            alert('Wrong answer')
        } else {
            alert('Correct answer')
        }
    } else {
        alert('No answer given')
    }
})