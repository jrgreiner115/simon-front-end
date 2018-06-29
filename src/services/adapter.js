const URL = 'http://localhost:3500/api/v1'


const postUsers = (userObj) => fetch(`${URL}/users`, {
  method: "POST",
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({user: userObj})
}).then(resp => resp.json())
  .then(json => {localStorage.setItem("token", json.token)
  localStorage.setItem("id", json.id)
  localStorage.setItem("recordings", json.recordings)
  localStorage.setItem("username", json.username)})


const login = (userObj) => fetch(`${URL}/sessions`, {
  method: "POST",
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({user: userObj})
}).then(resp => resp.json())
  .then(json => {localStorage.setItem("token", json.token)
  localStorage.setItem("id", json.id)
  localStorage.setItem("recordings", json.recordings)
  localStorage.setItem("username", json.username)})







export default {postUsers, login};
