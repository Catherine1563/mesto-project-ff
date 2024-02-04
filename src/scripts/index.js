import './cards.js';
import '../components/card.js';
import '../components/modal.js';
import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, activeLike } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placeList = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonEditNewCard = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');
const popupButtonClose = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const nameCard = document.forms[1].querySelector('.popup__input_type_card-name');
const linkImage = document.forms[1].querySelector('.popup__input_type_url');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

export { popups, popupEditProfile, cardTemplate, popupCardImage, profileName, profileDescription, nameInput, jobInput, popupNewCard, popupImage, popupCaption };

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placeList.append(createCard(item.name, item.link, deleteCard, activeLike, openModal));
});

popups.forEach(function(elem) {
    elem.classList.add('popup_is-animated');
});

buttonEditProfile.addEventListener('click', openModal);
buttonEditNewCard.addEventListener('click', openModal);
placeList.addEventListener('click', openModal);

document.addEventListener('keydown', closeModal);
popupButtonClose.forEach(function(item) {
    item.addEventListener('click', closeModal);
});
document.addEventListener('click', closeModal);

function handleFormSubmit(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;
}
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmitCard(evt) {
    evt.preventDefault();
    let nameValue = nameCard.value;
    let linkValue = linkImage.value;
    placeList.prepend(createCard(nameValue, linkValue, deleteCard, activeLike));
    popupNewCard.classList.remove('popup_is-opened');
    nameCard.value = '';
    linkImage.value = '';
}
document.forms[1].addEventListener('submit', handleFormSubmitCard);