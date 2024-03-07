import './cards.js';
import './constants.js';
import '../components/card.js';
import '../components/modal.js';
import '../pages/index.css';
import { createCard, deleteCard, activeLike } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { placeList, buttonEditProfile, buttonEditNewCard, popups, popupEditProfile, popupNewCard, popupCardImage, popupImage, popupCaption, nameCard, linkImage, formElement, nameInput, jobInput, profileName, profileDescription, popupEditImageProfile, buttonEditImageProfile } from './constants.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getCreateCards, getInitialCards, getNameAndDescriptionProfile, getNameAndLinkCards, getImageProfile, getIdUsers } from '../components/api.js';
import { checkResponse } from '../utils/checkingapi.js';

let userId;

getIdUsers(checkResponse)
    .then((result) => {
        userId = result._id
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
getCreateCards(checkResponse)
    .then((data) => {
        data.forEach(element => {
            placeList.append(createCard(element.name, element.link, deleteCard, activeLike, addNewCardPopupOpen));
        });
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

getInitialCards(checkResponse)
    .then((data) => {
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

popups.forEach(function(elem) {
    elem.classList.add('popup_is-animated');
});

function editProfilePopupOpen() {
    const buttonLoading = popupEditProfile.querySelector('.popup__button');
    const nameValue = profileName.textContent;
    const jobValue = profileDescription.textContent;
    nameInput.value = nameValue;
    jobInput.value = jobValue;
    const button = popupEditProfile.querySelector('.popup__button');
    button.classList.remove('button_inactive');
    openModal(popupEditProfile);
};

function openPopupNewCard() {
    const buttonLoading = popupNewCard.querySelector('.popup__button');
    openModal(popupNewCard);
}

function openPopupImageProfile() {
    const buttonLoading = popupEditImageProfile.querySelector('.popup__button');
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
            getInitialCards(checkResponse)
                .then((data) => {
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