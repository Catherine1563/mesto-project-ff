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
                const spanCountLike = parent.querySelector('.card__count-like');
                spanCountLike.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    } else {
        getLikeCards(evt, checkResponse)
            .then((data) => {
                evt.target.classList.add('card__like-button_is-active');
                const parent = evt.target.closest('li');
                const spanCountLike = parent.querySelector('.card__count-like');
                spanCountLike.textContent = data.likes.length;
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
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    cardElement.querySelector('.card__like-button').addEventListener('click', like);
    cardImage.addEventListener('click', popup);
    getInitialCards(checkResponse, userId)
        .then((data) => {
            const spanCountLike = placeList.querySelectorAll('.card__count-like');
            for (let i = 0; i < data.length; i++) {
                spanCountLike[i].textContent = data[i].likes.length;
            }
            const buttonDelete = placeList.querySelectorAll('.card__delete-button');
            const buttonLike = placeList.querySelectorAll('.card__like-button');
            const itemCard = placeList.querySelectorAll('.card');
            for (let i = 0; i < data.length; i++) {
                itemCard[i].setAttribute('id', data[i]._id);
                if (data[i].owner._id === userId) {
                    buttonDelete[i].style.visibility = 'visible';
                } else {
                    buttonDelete[i].style.visibility = 'hidden';
                }
                for (let j = 0; j < data[i].likes.length; j++) {
                    if (data[i].likes[j]._id === userId) {
                        buttonLike[i].classList.add('card__like-button_is-active');
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