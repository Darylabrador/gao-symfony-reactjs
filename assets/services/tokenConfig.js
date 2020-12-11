/**
 * Token config file
 */


/**
 * Set token value in localStorage
 * @param {*} token 
 */
exports.setToken = (token) => {
    localStorage.setItem('token', token);
}


/**
 * Get token information from localStorage
 */
exports.getToken = () => {
    return localStorage.getItem('token');
}


/**
 * Remove all items in localStorage
 */
exports.removeToken = () => {
    localStorage.clear();
}