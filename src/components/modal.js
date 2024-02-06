import { keydownPopupHandler } from '../scripts/index.js';

function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', keydownPopupHandler);
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keydownPopupHandler);
}

export { openModal, closeModal };