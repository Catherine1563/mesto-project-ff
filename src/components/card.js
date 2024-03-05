import { cardTemplate } from "../scripts/constants.js";
import { getDeleteCards, getLikeCards, getUnlikeCards } from '../components/api.js';

function deleteCard(event) {
    event.target.parentElement.remove();
    getDeleteCards(event);
}

function activeLike(evt) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        evt.target.classList.toggle('card__like-button_is-active');
        getUnlikeCards(evt);
    } else {
        evt.target.classList.add('card__like-button_is-active');
        getLikeCards(evt);
    }
}

// @todo: Функция создания карточки
function createCard(cardName, cardLink, deleteCallback, like, popup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    cardElement.querySelector('.card__like-button').addEventListener('click', like);
    cardImage.addEventListener('click', popup);
    return cardElement;
}
// @todo: Функция удаления карточки

export { createCard, deleteCard, activeLike };