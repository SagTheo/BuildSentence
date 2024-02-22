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

const addEventToWordBlock = (
    wordBlock, 
    container1, 
    container2
) => {
    wordBlock.addEventListener('click', () => {
        toggleBlock(wordBlock, container1, container2)
    })
}

/*

Needs more work: if one block has been toggled to buildSentence, 
                 and switchIt is now set to false, 
                 the other blocks won't be able to be toggled (because else statement
                 will be fired directly, hence the DOMException fired)

*/
const toggleBlock = (block, container1, container2) => {
    if (switchIt) {
        container1.removeChild(block)
        container2.append(block)

        switchIt = !switchIt
    } else {
        container2.removeChild(block)
        container1.append(block)

        switchIt = !switchIt
    }
}

const sentenceToMatch = ['Build', 'a', 'sentence']
const wordBlocks = Array.from(document.getElementsByClassName('wordBlock'))
const buildSentence = document.querySelector('.buildSentence')
const wordBlocksContainer = document.querySelector('.wordBlocks')
const reset = document.querySelector('.reset')
const submit = document.querySelector('.submit')
let switchIt = true

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
    const sentenceBuiltArr = Array.from(buildSentence.children)
    // const sentenceBuilt = sentenceBuiltArr.map(el => el.innerHTML)
    let result = null

    if (sentenceBuiltArr.length === sentenceToMatch.length) {
        // Not needed, just to practice the use of reduce
        // result = sentenceBuilt.reduce((acc, curr) => acc + ' ' + curr)
        
        for (let i = 0; i < sentenceToMatch.length; i++) {
            if (sentenceToMatch[i] === sentenceBuiltArr[i].innerHTML) {
                sentenceBuiltArr[i].classList.add('correct')
            } else {
                sentenceBuiltArr[i].classList.add('incorrect')
            }
        }
    } else {
        sentenceBuiltArr.forEach(el => {
            el.classList.add('incorrect')
        })
    }
})