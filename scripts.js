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

const removeClassNames = (block, classNames) => {
    classNames.forEach(className => {
        if (block.className.includes(className)) {
            block.classList.remove(className)
        }
    })
}

const addToggleToWordBlock = (
    wordBlock, 
    container1, 
    container2
) => {
    wordBlock.addEventListener('click', () => {
        if (wordBlock.classList.toggle('clicked')) {
            container1.removeChild(wordBlock)
            container2.append(wordBlock)
        } else {
            container2.removeChild(wordBlock)
            container1.append(wordBlock)

            removeClassNames(wordBlock, ['correct', 'incorrect'])
        }
    })
}

const sentenceToMatch = ['Build', 'a', 'sentence']
const wordBlocks = Array.from(document.getElementsByClassName('wordBlock'))
const buildSentence = document.querySelector('.buildSentence')
const wordBlocksContainer = document.querySelector('.wordBlocks')
const reset = document.querySelector('.reset')
const submit = document.querySelector('.submit')

for (let i = 0; i < wordBlocks.length; i++) {
    addToggleToWordBlock(wordBlocks[i], wordBlocksContainer, buildSentence)
}

reset.addEventListener('click', () => {
    removeChildren(wordBlocksContainer)
    removeChildren(buildSentence)

    for (let i = 0; i < wordBlocks.length; i++) {
        let div = document.createElement('div')
        div.innerHTML = wordBlocks[i].innerHTML
        div.classList.add('wordBlock')

        wordBlocksContainer.append(div)

        addToggleToWordBlock(div, wordBlocksContainer, buildSentence)
    }
})

submit.addEventListener('click', () => {
    const sentenceBuiltArr = Array.from(buildSentence.children)
    // const sentenceBuilt = sentenceBuiltArr.map(el => el.innerHTML)
    // let result = null

    if (sentenceBuiltArr.length === sentenceToMatch.length) {
        // Not needed, just to practice the use of reduce
        // result = sentenceBuilt.reduce((acc, curr) => acc + ' ' + curr)
        
        for (let i = 0; i < sentenceToMatch.length; i++) {
            removeClassNames(sentenceBuiltArr[i], ['correct', 'incorrect'])
            
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