import { cardTemplate } from "../scripts/index.js";

// @todo: Функция создания карточки
function createCard(cardName, cardLink, func, like, popup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__title').textContent = cardName;
    cardElement.querySelector('.card__delete-button').addEventListener('click', func);
    cardElement.querySelector('.card__like-button').addEventListener('click', like);
    cardElement.querySelector('.card__image').addEventListener('click', popup);
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.parentElement.remove();
}

function activeLike(evt) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        evt.target.classList.toggle('card__like-button_is-active');
    } else {
        evt.target.classList.add('card__like-button_is-active');
    }
}

export { createCard, deleteCard, activeLike };