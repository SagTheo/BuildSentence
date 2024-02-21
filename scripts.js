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
    classToAdd, 
    startingContainer, 
    targetContainer
) => {
    wordBlock.addEventListener('click', () => {

        let div = document.createElement('div')
        div.innerHTML = wordBlock.innerHTML
        div.classList.add(classToAdd)

        startingContainer.removeChild(wordBlock)

        targetContainer.append(div)
    })
}

const sentenceToMatch = ['Build', 'a', 'sentence']
const wordBlocks = Array.from(document.getElementsByClassName('wordBlock'))
const buildSentence = document.querySelector('.buildSentence')
const wordBlocksContainer = document.querySelector('.wordBlocks')
const reset = document.querySelector('.reset')
const submit = document.querySelector('.submit')
const test = document.querySelector('#test')


test.addEventListener('click', () => {
    // let div = document.createElement('div')
    // div.innerHTML = 'Test'

    // wordBlocksContainer.removeChild(test)

    // buildSentence.append(div)

    // div.addEventListener('click', () => {
    //     let div2 = document.createElement('div')
    //     div2.innerHTML = 'Test'

    //     buildSentence.removeChild(div)

    //     wordBlocksContainer.append(div2)
    // })

    wordBlocksContainer.removeChild(test)
    buildSentence.append(test)

    test.addEventListener('click', () => {
        // creates DOMException because outer click event on test is called as well,
        // but test is no longer a child of wordBlocksContainer at this point
        buildSentence.removeChild(test)
        wordBlocksContainer.append(test)
    })
})

for (let i = 0; i < wordBlocks.length; i++) {
    addEventToWordBlock(wordBlocks[i], 'wordBlockClicked', wordBlocksContainer, buildSentence)
}

reset.addEventListener('click', () => {
    removeChildren(wordBlocksContainer)
    removeChildren(buildSentence)

    for (let i = 0; i < wordBlocks.length; i++) {
        let div = document.createElement('div')
        div.innerHTML = wordBlocks[i].innerHTML
        div.classList.add(wordBlocks[i].className)

        wordBlocksContainer.append(div)

        addEventToWordBlock(div, 'wordBlockClicked', wordBlocksContainer, buildSentence)
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