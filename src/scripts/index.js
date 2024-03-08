import './cards.js';
import './constants.js';
import '../components/card.js';
import '../components/modal.js';
import '../pages/index.css';
import { createCard, deleteCard, activeLike } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { placeList, buttonEditProfile, buttonEditNewCard, popups, popupEditProfile, popupNewCard, popupCardImage, popupImage, popupCaption, nameCard, linkImage, formElement, nameInput, jobInput, profileName, profileDescription, popupEditImageProfile, buttonEditImageProfile } from './constants.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getCreateCards, getNameAndDescriptionProfile, getNameAndLinkCards, getImageProfile, getIdUsers } from '../components/api.js';
import { checkResponse } from '../utils/checkingapi.js';

let userId;

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inactiveButton: '.button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

enableValidation(validationSettings);

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

// @todo: Вывести карточки на страницу
Promise.all([getIdUsers(checkResponse), getCreateCards(checkResponse)])
    .then(([userData, cards]) => {
        userId = userData._id
        cards.forEach(element => {
            placeList.append(createCard(element.name, element.link, deleteCard, activeLike, addNewCardPopupOpen, userId));
        });
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

popups.forEach(function(elem) {
    elem.classList.add('popup_is-animated');
});

function editProfilePopupOpen() {
    const nameValue = profileName.textContent;
    const jobValue = profileDescription.textContent;
    nameInput.value = nameValue;
    jobInput.value = jobValue;
    clearValidation(formElement, validationSettings);
    openModal(popupEditProfile);
};

function openPopupNewCard() {
    clearValidation(document.forms['new-place'], validationSettings);
    openModal(popupNewCard);
}

function openPopupImageProfile() {
    clearValidation(document.forms['edit-image-profile'], validationSettings);
    openModal(popupEditImageProfile);
}
buttonEditProfile.addEventListener('click', editProfilePopupOpen);
buttonEditNewCard.addEventListener('click', openPopupNewCard);
buttonEditImageProfile.addEventListener('click', openPopupImageProfile);

popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
            closeModal(popup, enableValidation);
        }
    });
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, evt.submitter);
    getNameAndDescriptionProfile(nameInput.value, jobInput.value, checkResponse)
        .then((result) => {
            profileName.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            closeModal(popupEditProfile);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, evt.submitter);
        });
}
formElement.addEventListener('submit', handleProfileFormSubmit);

function handleFormSubmitCard(evt) {
    evt.preventDefault();
    renderLoading(true, evt.submitter);
    getNameAndLinkCards(nameCard.value, linkImage.value, checkResponse)
        .then((result) => {
            placeList.prepend(createCard(nameCard.value, linkImage.value, deleteCard, activeLike, addNewCardPopupOpen));
            closeModal(popupNewCard);
            formElement.reset();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, evt.submitter);
        });
}
document.forms['new-place'].addEventListener('submit', handleFormSubmitCard);

function handleImageProfileFormSubmit(evt) {
    evt.preventDefault();
    const inputLinkImageProfile = evt.target.querySelector('.popup__input_type_url_image');
    const imageProfile = document.querySelector('.profile__image');
    renderLoading(true, evt.submitter);
    getImageProfile(evt, checkResponse, inputLinkImageProfile.value)
        .then((result) => {
            imageProfile.style.backgroundImage = 'url(' + inputLinkImageProfile.value + ')';
            closeModal(popupEditImageProfile);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, evt.submitter);
        });
}
document.forms['edit-image-profile'].addEventListener('submit', handleImageProfileFormSubmit);

////////////////////////////////////////////////////////////////////////////////////