// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placeList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardName, cardLink, func) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__title').textContent = cardName;
    cardElement.querySelector('.card__delete-button').addEventListener('click', func);
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.parentElement.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placeList.append(createCard(item.name, item.link, deleteCard));
});