function keydownPopupHandler(evt) {
    const popupOpened = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closeModal(popupOpened);
    }
}

function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', keydownPopupHandler);
}

function closeModal(modal, enableValidation) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keydownPopupHandler);
}

export { openModal, closeModal };