// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placeList = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonEditNewCard = document.querySelector('.profile__add-button');
const buttonEditImageProfile = document.querySelector('.profile__image');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditImageProfile = document.querySelector('.popup_type_edit_image_profile');
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const nameCard = document.forms['new-place'].querySelector('.popup__input_type_card-name');
const linkImage = document.forms['new-place'].querySelector('.popup__input_type_url');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

export { cardTemplate, placeList, buttonEditProfile, buttonEditNewCard, popups, popupEditProfile, popupNewCard, popupCardImage, popupImage, popupCaption, nameCard, linkImage, formElement, nameInput, jobInput, profileName, profileDescription, popupEditImageProfile, buttonEditImageProfile };