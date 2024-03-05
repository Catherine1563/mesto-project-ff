import { createCard, deleteCard, activeLike } from '../components/card.js';
import { placeList, nameInput, jobInput, nameCard, linkImage } from '../scripts/constants.js';
import { addNewCardPopupOpen } from '../scripts/index.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
        authorization: 'c304b8c8-5801-40ad-8a7c-7577a1a44342',
        'Content-Type': 'application/json'
    }
}

const getCreateCards = () => {
    return fetch(config.baseUrl + "/cards", {
            method: 'GET',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
        .then((data) => {
            data.forEach(element => {
                placeList.append(createCard(element.name, element.link, deleteCard, activeLike, addNewCardPopupOpen));
            });
            getInitialCards();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

const getInitialCards = () => {
    return fetch(config.baseUrl + "/cards", {
            method: 'GET',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
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
                if (data[i].owner._id === "9b82ff17313d5386beb2923b") {
                    button_delete[i].style.visibility = 'visible';
                } else {
                    button_delete[i].style.visibility = 'hidden';
                }
                for (let j = 0; j < data[i].likes.length; j++) {
                    if (data[i].likes[j]._id === "9b82ff17313d5386beb2923b") {
                        button_like[i].classList.add('card__like-button_is-active');
                    }
                }
            }
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

const getNameAndDescriptionProfile = () => {
    return fetch(config.baseUrl + "/users/me", {
            method: 'PATCH',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                name: nameInput.value,
                about: jobInput.value
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
        .then((result) => {
            getInitialCards();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

const getNameAndLinkCards = () => {
    return fetch(config.baseUrl + "/cards", {
            method: 'POST',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                name: nameCard.value,
                link: linkImage.value
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

const getDeleteCards = (evt) => {
    return fetch(config.baseUrl + '/cards/' + evt.target.parentElement.id, {
            method: 'DELETE',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
        .then((data) => {})
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

const getLikeCards = (evt) => {
    return fetch(config.baseUrl + '/cards/likes/' + evt.target.parentElement.parentElement.parentElement.id, {
            method: 'PUT',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
        .then((data) => { console.log(data); })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

const getUnlikeCards = (evt) => {
    return fetch(config.baseUrl + '/cards/likes/' + evt.target.parentElement.parentElement.parentElement.id, {
            method: 'DELETE',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

const getImageProfile = (evt) => {
    const linkImageProfile = evt.target.querySelector('.popup__input_type_url_image');
    return fetch(config.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                avatar: linkImageProfile.value
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

export { getCreateCards, getInitialCards, getNameAndDescriptionProfile, getNameAndLinkCards, getDeleteCards, getLikeCards, getUnlikeCards, getImageProfile };