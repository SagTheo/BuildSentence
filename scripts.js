/*

Using Array.from() because:

from --> https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection :

An HTMLCollection in the HTML DOM is live; 
it is automatically updated when the underlying document is changed. 
For this reason it is a good idea to make a copy (e.g., using Array.from) 
to iterate over if adding, moving, or removing nodes.

*/

const wordBlocks = Array.from(document.getElementsByClassName('wordBlock'))
const buildSentence = document.querySelector('.buildSentence')
const wordBlocksContainer = document.querySelector('.wordBlocks')

for (let i = 0; i < wordBlocks.length; i++) {
    wordBlocks[i].addEventListener('click', () => {

        let div = document.createElement('div')
        div.innerHTML = wordBlocks[i].innerHTML
        div.classList.add('wordBlockClicked')

        wordBlocksContainer.removeChild(wordBlocks[i])

        buildSentence.append(div)
    })
}

