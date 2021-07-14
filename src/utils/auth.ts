const TokenKey = 'vue3_template_token';

export function getToken() {
    return localStorage.getItem(TokenKey);
}

export function setToken(token: any) {
    return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
    return localStorage.removeItem(TokenKey);
}
