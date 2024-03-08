import { cardTemplate, placeList } from "../scripts/constants.js";
import { getDeleteCards, getLikeCards, getUnlikeCards, getInitialCards } from '../components/api.js';
import { checkResponse } from '../utils/checkingapi.js';

function deleteCard(event) {
    getDeleteCards(event, checkResponse)
        .then((data) => {
            const parent = event.target.closest('li');
            parent.remove();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

function activeLike(evt) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        getUnlikeCards(evt, checkResponse)
            .then((data) => {
                evt.target.classList.toggle('card__like-button_is-active');
                const parent = evt.target.closest('li');
                const span_count = parent.querySelector('.card__count-like');
                span_count.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    } else {
        getLikeCards(evt, checkResponse)
            .then((data) => {
                evt.target.classList.add('card__like-button_is-active');
                const parent = evt.target.closest('li');
                const span_count = parent.querySelector('.card__count-like');
                span_count.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }
}

// @todo: Функция создания карточки
function createCard(cardName, cardLink, deleteCallback, like, popup, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    getInitialCards(checkResponse, userId, cardName, cardLink, deleteCallback, like, popup)
        .then((data) => {
            cardImage.src = cardLink;
            cardImage.alt = cardName;
            cardElement.querySelector('.card__title').textContent = cardName;
            cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
            cardElement.querySelector('.card__like-button').addEventListener('click', like);
            cardImage.addEventListener('click', popup);
            const span_count = placeList.querySelectorAll('.card__count-like');
            for (let i = 0; i < data.length; i++) {
                span_count[i].textContent = data[i].likes.length;
            }
            const button_delete = placeList.querySelectorAll('.card__delete-button');
            const button_like = placeList.querySelectorAll('.card__like-button');
            const item_card = placeList.querySelectorAll('.card');
            for (let i = 0; i < data.length; i++) {
                item_card[i].setAttribute('id', data[i]._id);
                if (data[i].owner._id === userId) {
                    button_delete[i].style.visibility = 'visible';
                } else {
                    button_delete[i].style.visibility = 'hidden';
                }
                for (let j = 0; j < data[i].likes.length; j++) {
                    if (data[i].likes[j]._id === userId) {
                        button_like[i].classList.add('card__like-button_is-active');
                    }
                }
            }
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    return cardElement;
}
// @todo: Функция удаления карточки

export { createCard, deleteCard, activeLike };