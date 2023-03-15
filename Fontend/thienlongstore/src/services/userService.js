import axios from 'axios';
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};
const handleSignUpApi = (firstName, lastName, email, password1, password2) => {
    return axios.post('/post-crud', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password1: password1,
        password2: password2,
    });
};

export { handleLoginApi, handleSignUpApi };
