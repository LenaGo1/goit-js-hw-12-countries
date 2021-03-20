// export default {
//     fetchCountries(searchQuery)
// }
import debounce from 'lodash.debounce';
import '../styles.css';
import countryCardTpl from '../templates/country-card.hbs';
import API from './api-service';
import raiseError from '../js/notifications.js'
import searchCardTpl from '../templates/search-list.hbs';

const refs = {
    searchInput : document.querySelector(".search-input"),
    resultContainer : document.querySelector(".js-response-container"),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 1500));

function onSearch(e) {
    // чтоб не перезагружалась страница
    e.preventDefault();
    
    // получаем значение инпута во время ввода запроса
    const searchQuery = e.target.value;
    console.log(e.target.value);

    clearContainer();

    // из объекта API беру только функцию fatchCountry
    API.fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.log(error))
}
function clearContainer() {
    refs.resultContainer.innerHTML = '';
}

function renderCountryCard(countries) {
    if (countries.length > 10) {
        raiseError()
    }
    else if (countries.length >= 2) {
        const markupList = searchCardTpl(countries);
        refs.resultContainer.innerHTML = markupList;
    }
    else {
        const markupCountry = countryCardTpl(countries[0]);
        refs.resultContainer.innerHTML = markupCountry;
    }
}



