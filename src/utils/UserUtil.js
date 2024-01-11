const getUser = () => {
    return localStorage.getItem('loggedInUser');
}

export default getUser;