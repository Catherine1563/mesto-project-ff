const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
        authorization: 'c304b8c8-5801-40ad-8a7c-7577a1a44342',
        'Content-Type': 'application/json'
    }
}

const getIdUsers = (checkResponse) => {
    return fetch(config.baseUrl + "/users/me", {
            method: 'GET',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(checkResponse)
}

const getCreateCards = (checkResponse) => {
    return fetch(config.baseUrl + "/cards", {
            method: 'GET',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(checkResponse)
}

const getInitialCards = (checkResponse) => {
    return fetch(config.baseUrl + "/cards", {
            method: 'GET',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(checkResponse)
}

const getNameAndDescriptionProfile = (nameProfile, jobProfile, checkResponse) => {
    return fetch(config.baseUrl + "/users/me", {
            method: 'PATCH',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                name: nameProfile,
                about: jobProfile
            })
        })
        .then(checkResponse)
}

const getNameAndLinkCards = (nameCards, linkImageCard, checkResponse) => {
    return fetch(config.baseUrl + "/cards", {
            method: 'POST',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                name: nameCards,
                link: linkImageCard
            })
        })
        .then(checkResponse)
}

const getDeleteCards = (evt, checkResponse) => {
    return fetch(config.baseUrl + '/cards/' + evt.target.parentElement.id, {
            method: 'DELETE',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(checkResponse)
}

const getLikeCards = (evt, checkResponse) => {
    return fetch(config.baseUrl + '/cards/likes/' + evt.target.parentElement.parentElement.parentElement.id, {
            method: 'PUT',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(checkResponse)
}

const getUnlikeCards = (evt, checkResponse) => {
    return fetch(config.baseUrl + '/cards/likes/' + evt.target.parentElement.parentElement.parentElement.id, {
            method: 'DELETE',
            headers: {
                authorization: config.headers.authorization
            }
        })
        .then(checkResponse)
}

const getImageProfile = (evt, checkResponse, linkProfile) => {
    return fetch(config.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                avatar: linkProfile
            })
        })
        .then(checkResponse)
}

export { getCreateCards, getInitialCards, getNameAndDescriptionProfile, getNameAndLinkCards, getDeleteCards, getLikeCards, getUnlikeCards, getImageProfile, getIdUsers };