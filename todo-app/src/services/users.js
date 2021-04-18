import axios from 'axios';

const baseUrl = '/api/users';

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res => res.data);
}; 

const update = (id, newUserObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newUserObject); 
    return req.then(res => res.data); 
}

const userService = { getAll, update }

export default userService;