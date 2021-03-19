// export default {
//     fetchCountries(searchQuery)
// }
import '../styles.css';
import countryCardTpl from '../templates/country-card.hbs'
import API from './api-service';

const refs = {
    searchInput : document.querySelector(".search-input"),
    cardContainer : document.querySelector('.js-card-container'),
};

refs.searchInput.addEventListener('input', onSearch);

function onSearch(e) {
    // чтоб не перезагружалась страница
    e.preventDefault();
    
    // const form = e.currentTarget;
    // console.log(e.currentTarget);
    
    // получаем значение инпута во время ввода запроса
    const searchQuery = e.currentTarget.value;
    console.log(e.currentTarget.value);
    // const searchQuery = form.elements.query.value;
    // console.log(form.elements);

    // из объекта API беру только функцию fatchCountry
    API.fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.log(error));
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.cardContainerinnerHTML = markup;
}