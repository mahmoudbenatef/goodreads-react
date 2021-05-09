import {API} from "./Constants"
export const ApiServices = {
    register(user) {
        return fetch(API.register(), {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    },

    signin(user) {
        return fetch(API.signin(), {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

}
