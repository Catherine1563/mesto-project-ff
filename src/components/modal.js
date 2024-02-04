import { popups, popupEditProfile, popupNewCard, profileName, profileDescription, nameInput, jobInput, popupCardImage, popupImage, popupCaption } from "../scripts/index.js";

function openModal(evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        popupEditProfile.classList.add('popup_is-opened');
        let nameValue = profileName.textContent;
        let jobValue = profileDescription.textContent;
        nameInput.value = nameValue;
        jobInput.value = jobValue;
    } else if (evt.target.classList.contains('profile__add-button')) {
        popupNewCard.classList.add('popup_is-opened');
    } else if (evt.target.classList.contains('card__image')) {
        popupCardImage.classList.add('popup_is-opened');
        popupImage.src = evt.target.src;
        const placeItem = evt.target.parentElement;
        const cardTitle = placeItem.querySelector('.card__title');
        popupCaption.textContent = cardTitle.textContent;
    }
}

function closeModal(evt) {
    popups.forEach(function(elem) {
        if (elem.classList.contains('popup_is-opened')) {
            const popupContent = elem.querySelector('.popup__content');
            if (evt.target !== popupContent) {
                evt.target.classList.remove('popup_is-opened');
            }
            if (evt.key === 'Escape') {
                elem.classList.remove('popup_is-opened');
            }
            if (evt.target.classList.contains('popup__close')) {
                elem.classList.remove('popup_is-opened');
            }
        }
    });
}

export { openModal, closeModal };