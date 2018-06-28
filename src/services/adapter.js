URL = 'http://localhost:3500/api/v1'


const postUsers = (name, username, pass) => fetch(`${URL}/users`, {
  method: "POST",
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({name: `${name}`,username:`${username}`, password: `${pass}`})
}).then(resp => resp.json())
  .then(json => console.log(json))


const checkAndAddToLocalStore






export default {postUsers};
