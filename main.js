class HtmlRenderer {
    getCardHeaderFlexContainerHtml(word) {
        if (word.phonetic == undefined) {
            word.phonetic = '';
        }
        return `<div class="card-header-box">
                    <h1>${word.word}</h1>
                    <p>${word.phonetic}</p>
                </div>
                <img src="https://dictionary-web-app.vercel.app/icons/play-light.svg" alt=""
                    class="audio-button" />
                <audio id="audio-player" src="${word.phonetics[0].audio}"></audio>`;
    }

    getCardDefinitionHtml(word, i, x) {
        return `<div class="box-1">
                    <h3><em>${word.meanings[i].partOfSpeech}</em></h3>
                    <hr class="h-line-1">
                </div>
                <div class="box-2">
                        <span class="highlight">Meaning</span>
                </div>
                <div class="box-3">
                        <ul class=padding">
                            ${x}
                        </ul>
                </div>`;
    }

    getPartOfSpeechDefinitions(word, i) {
        var s = '';

        // meaning | definitions
        word.meanings[i].definitions.forEach(definition => {
            if (definition.example == undefined) {
                s += `<li>${definition.definition}</li>`
            } else {
                s += `<li>${definition.definition} <span class="highlight">${definition.example}</span></li>`
            }
        });

        // synonyms
        if (word.meanings[i].synonyms.length != 0) {
            var synonyms = '<div class="synonym-div"><span class="highlight p-large">Synonyms</span> ';
            word.meanings[i].synonyms.forEach(synonym => {
                synonyms += ` <span class="highlight-2" onclick="searchWord('${synonym}')">${synonym},</span>`;
            });
            s += synonyms.substring(0, synonyms.length - 8);
            s += '</span></div>';
        }

        // antonyms
        if (word.meanings[i].antonyms.length != 0) {
            var antonyms = '<div class="antonym-div"><span class="highlight p-large">Antonyms</span> ';
            word.meanings[i].antonyms.forEach(antonym => {
                antonyms += ` <span class="highlight-2" onclick="searchWord('${antonym}')">${antonym},</span>`;
            });
            s += antonyms.substring(0, antonyms.length - 8);
            s += '</span></div>';
        }

        return s;
    }

    renderWord(word) {
        cardHeaderFlexContainer.innerHTML += this.getCardHeaderFlexContainerHtml(word);
        for (let i = 0; i < word.meanings.length; i++) {
            var x = this.getPartOfSpeechDefinitions(word, i);
            definition.innerHTML += this.getCardDefinitionHtml(word, i, x);
        }

        const audioBtn = document.querySelector('.audio-button');
        const audioPlayer = document.querySelector('#audio-player');

        if (word.phonetics[0].audio == undefined ||
            word.phonetics[0].audio == '') {
            audioBtn.classList.add('hide');
        }

        audioBtn.addEventListener('click', function () {
            audioPlayer.play();
        });
    }

    renderNoDefinitionsFound(response) {
        notFoundArea.innerHTML += ` 
        <span class="emoji">😕</span>
        <h2>${response.title}</h2>
        <p>${response.message}</p>
        <p>${response.resolution}</p>`;
    }
}


class HttpService {
    getWordDefinition(word) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(response => {
                if (Array.isArray(response)) {
                    console.log(response[0]);
                    htmlRendererService.renderWord(response[0]);
                } else {
                    console.log(response);
                    htmlRendererService.renderNoDefinitionsFound(response)
                }
            })
    }
}

const httpService = new HttpService();
const htmlRendererService = new HtmlRenderer();
const cardHeaderFlexContainer = document.querySelector('.card-header-flex-container');
const definition = document.querySelector('.definition');
const notFoundArea = document.querySelector('.not-found');
const searchInp = document.querySelector('#search-bar');
const searchBtn = document.querySelector('.loop-img');
const bookBtn = document.querySelector('.book');
const themeBtn = document.querySelector('#check');


searchBtn.addEventListener('click', function () {
    var line = document.querySelector('.h-line');
    line.classList.add('hide');
    cardHeaderFlexContainer.innerHTML = '';
    definition.innerHTML = '';
    httpService.getWordDefinition(searchInp.value);
    searchInp.value = '';
    notFoundArea.innerHTML = '';
});

searchInp.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        var line = document.querySelector('.h-line');
        line.classList.add('hide');
        cardHeaderFlexContainer.innerHTML = '';
        definition.innerHTML = '';
        httpService.getWordDefinition(searchInp.value);
        searchInp.value = '';
        notFoundArea.innerHTML = '';
    }
});

bookBtn.addEventListener('click', function () {
    cardHeaderFlexContainer.innerHTML = '';
    definition.innerHTML = '';
    var line = document.querySelector('.h-line');
    line.classList.remove('hide');
    searchInp.value = '';
});

themeBtn.addEventListener('click', function () {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');

    const lightTheme = document.querySelector('.light-theme');
    lightTheme.classList.toggle('hide');
    const darkTheme = document.querySelector('.dark-theme');
    darkTheme.classList.toggle('hide');

});

function searchWord(word) {
    cardHeaderFlexContainer.innerHTML = '';
    definition.innerHTML = '';
    httpService.getWordDefinition(word);
    notFoundArea.innerHTML = '';
}