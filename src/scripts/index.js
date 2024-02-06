import './cards.js';
import './constants.js';
import '../components/card.js';
import '../components/modal.js';
import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, activeLike } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { placeList, buttonEditProfile, buttonEditNewCard, popups, popupEditProfile, popupNewCard, popupCardImage, popupImage, popupCaption, nameCard, linkImage, formElement, nameInput, jobInput, profileName, profileDescription } from './constants.js';

function addNewCardPopupOpen(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    const placeItem = evt.target.parentElement;
    const cardTitle = placeItem.querySelector('.card__title');
    popupCaption.textContent = cardTitle.textContent;
    openModal(popupCardImage);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placeList.append(createCard(item.name, item.link, deleteCard, activeLike, addNewCardPopupOpen));
});

popups.forEach(function(elem) {
    elem.classList.add('popup_is-animated');
});

function editProfilePopupOpen() {
    let nameValue = profileName.textContent;
    let jobValue = profileDescription.textContent;
    nameInput.value = nameValue;
    jobInput.value = jobValue;
    openModal(popupEditProfile);
};

function openPopupNewCard() {
    openModal(popupNewCard);
}
buttonEditProfile.addEventListener('click', editProfilePopupOpen);
buttonEditNewCard.addEventListener('click', openPopupNewCard);

popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
            closeModal(popup);
        }
    });
});

function keydownPopupHandler(evt) {
    popups.forEach((popup) => {
        if (evt.key === 'Escape') {
            if (popup.classList.contains('popup_is-opened')) {
                closeModal(popup);
            }
        }
    });
}

export { keydownPopupHandler };

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closeModal(popupEditProfile);
}
formElement.addEventListener('submit', handleProfileFormSubmit);

function handleFormSubmitCard(evt) {
    evt.preventDefault();
    let nameValue = nameCard.value;
    let linkValue = linkImage.value;
    placeList.prepend(createCard(nameValue, linkValue, deleteCard, activeLike, addNewCardPopupOpen));
    closeModal(popupNewCard);
    formElement.reset();
}
document.forms['new-place'].addEventListener('submit', handleFormSubmitCard);