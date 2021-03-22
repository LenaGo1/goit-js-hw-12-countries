import debounce from 'lodash.debounce';
import '../styles.css';
import API from './fetchCountries';
import countryCardTpl from '../templates/country-card.hbs';
import searchCardTpl from '../templates/search-list.hbs';
import raiseError from './notifications.js';
import raise_error from './notifications.js';

const refs = {
    searchInput : document.querySelector(".search-input"),
    resultContainer : document.querySelector(".js-response-container"),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 1500));

function onSearch(e) {
    // чтоб не перезагружалась страница
    e.preventDefault();
    
    // получаем значение инпута во время ввода запроса
    const searchQuery = e.target.value.trim();
    console.log(e.target.value);

    // очищаем контейнер
    clearContainer();

    // если введен пробел или очищен инпут - не делаем запрос
    if (searchQuery === "") {
        raise_error('Invalid request! Please try again!');
        return
    }

    // из объекта API беру только функцию fatchCountry
    API.fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.log(error))
}

    // очистка перед следующим запросом
function clearContainer() {
    refs.resultContainer.innerHTML = '';
}

    // рендер страницы
function renderCountryCard(countries) {
    if (countries.length > 10) {
        raiseError('Too many matches found. Please enter a more specific query!')
    }
    else if (countries.length >= 2) {
        const markupList = searchCardTpl(countries);
        refs.resultContainer.innerHTML = markupList;
    }
    else if (countries.status === 404) {
        refs.resultContainer.innerHTML = '';
        raise_error('Invalid request! Please try again!');
    }    
    else {
        const markupCountry = countryCardTpl(countries[0]);
        refs.resultContainer.innerHTML = markupCountry;
    }
}



