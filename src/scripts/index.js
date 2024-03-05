import './cards.js';
import './constants.js';
import '../components/card.js';
import '../components/modal.js';
import '../pages/index.css';
import { createCard, deleteCard, activeLike } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { placeList, buttonEditProfile, buttonEditNewCard, popups, popupEditProfile, popupNewCard, popupCardImage, popupImage, popupCaption, nameCard, linkImage, formElement, nameInput, jobInput, profileName, profileDescription, popupEditImageProfile, buttonEditImageProfile } from './constants.js';
import { enableValidation } from '../components/validation.js';
import { getCreateCards, getNameAndDescriptionProfile, getNameAndLinkCards, getImageProfile } from '../components/api.js';

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

const renderLoading = (isLoading, popupButtonSave) => {
    if (isLoading) {
        popupButtonSave.textContent = 'Сохранить...';
    } else {
        popupButtonSave.textContent = 'Сохранить';
    }
}

function addNewCardPopupOpen(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    const placeItem = evt.target.parentElement;
    const cardTitle = placeItem.querySelector('.card__title');
    popupCaption.textContent = cardTitle.textContent;
    openModal(popupCardImage);
}

export { addNewCardPopupOpen };

// @todo: Вывести карточки на страницу
getCreateCards();

popups.forEach(function(elem) {
    elem.classList.add('popup_is-animated');
});

function editProfilePopupOpen() {
    const buttonLoading = popupEditProfile.querySelector('.popup__button');
    renderLoading(false, buttonLoading);
    let nameValue = profileName.textContent;
    let jobValue = profileDescription.textContent;
    nameInput.value = nameValue;
    jobInput.value = jobValue;
    const button = popupEditProfile.querySelector('.popup__button');
    button.classList.remove('button_inactive');
    openModal(popupEditProfile);
};

function openPopupNewCard() {
    const buttonLoading = popupNewCard.querySelector('.popup__button');
    renderLoading(false, buttonLoading);
    openModal(popupNewCard);
}

function openPopupImageProfile() {
    const buttonLoading = popupEditImageProfile.querySelector('.popup__button');
    renderLoading(false, buttonLoading);
    openModal(popupEditImageProfile);
}
buttonEditProfile.addEventListener('click', editProfilePopupOpen);
buttonEditNewCard.addEventListener('click', openPopupNewCard);
buttonEditImageProfile.addEventListener('click', openPopupImageProfile);

function clearValidation(popupProfile, enableValidation) {
    const errorMessangers = popupProfile.querySelectorAll('.form__input-error');
    const inputPopupProfile = popupProfile.querySelectorAll('.popup__input');
    errorMessangers.forEach((item) => {
        item.textContent = '';
        item.classList.remove('form__input-error_active');
    });
    inputPopupProfile.forEach((item) => {
        item.classList.remove('form__input_type_error');
    });
}

popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
            closeModal(popup);
            if (evt.target.classList.contains('popup_type_edit')) {
                clearValidation(evt.target, enableValidation);
            } else if (evt.target.classList.contains('popup_type_new-card')) {
                clearValidation(evt.target, enableValidation);
            }
        }
    });
});

function keydownPopupHandler(evt) {
    const popupOpened = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closeModal(popupOpened);
        if (popupOpened.classList.contains('popup_type_edit')) {
            clearValidation(popupOpened, editProfilePopupOpen);
        } else if (popupOpened.classList.contains('popup_type_new-card')) {
            clearValidation(popupOpened, editProfilePopupOpen);
        }
    }
}

export { keydownPopupHandler };

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const buttonLoading = evt.target.querySelector('.popup__button');
    renderLoading(true, buttonLoading);
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    getNameAndDescriptionProfile();
    closeModal(popupEditProfile);
}
formElement.addEventListener('submit', handleProfileFormSubmit);

function handleFormSubmitCard(evt) {
    evt.preventDefault();
    const buttonLoading = evt.target.querySelector('.popup__button');
    renderLoading(true, buttonLoading);
    placeList.prepend(createCard(nameCard.value, linkImage.value, deleteCard, activeLike, addNewCardPopupOpen));
    getNameAndLinkCards();
    closeModal(popupNewCard);
    formElement.reset();
}
document.forms['new-place'].addEventListener('submit', handleFormSubmitCard);

function handleImageProfileFormSubmit(evt) {
    evt.preventDefault();
    const buttonLoading = evt.target.querySelector('.popup__button');
    renderLoading(true, buttonLoading);
    const inputLinkImageProfile = evt.target.querySelector('.popup__input_type_url_image');
    getImageProfile(evt);
    const imageProfile = document.querySelector('.profile__image');
    imageProfile.style.backgroundImage = 'url(' + inputLinkImageProfile.value + ')';
    closeModal(popupEditImageProfile);
}
document.forms['edit-image-profile'].addEventListener('submit', handleImageProfileFormSubmit);

////////////////////////////////////////////////////////////////////////////////////