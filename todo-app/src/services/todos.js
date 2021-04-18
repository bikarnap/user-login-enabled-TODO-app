import axios from 'axios';
const baseUrl = '/api/todos';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res => res.data);
};

const create = async (todoObject, auth) => {
    setToken(auth);
    const config = {
        headers: { Authorization: token }
    };
    
    const res = await axios.post(baseUrl, todoObject, config);
    return res.data;
};

const update = (id, newTodoObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newTodoObject); 
    return req.then(res => res.data); 
  }

const remove = (id, auth) => {
    setToken(auth);
    const authoriz = { headers: { Authorization: token } };
    const req = axios.delete(`${baseUrl}/${id}`, authoriz)
    return req.then(res => res.data);
};

const todoService = {
    getAll, 
    create, 
    update,
    remove, 
    setToken
};

export default todoService;