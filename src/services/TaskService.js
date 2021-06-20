import axios from "axios";

const JSON_BIN_SECRET = import.meta.env.VITE_JSON_BIN_SECRET;

const instance = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/60ca16988a4cd025b79e5120',
    headers: { 'X-Master-Key': JSON_BIN_SECRET }
})

export async function getAll(){
     const res = await instance.get('/latest')
     return res.data.record 
}

export async function updateAll(newTask){
    const res = await instance.put('/', newTask)
}