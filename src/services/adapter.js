import uuid from 'uuid'
import AWS from 'aws-sdk'

const URI = 'http://localhost:3500/api/v1'
var creds = new AWS.Credentials(process.env.REACT_APP_AWS_ACCESS_KEY_ID, process.env.REACT_APP_AWS_SECRET_ACCESS_KEY);

AWS.config.update({
  region: 'us-east-2',
  credentials: creds
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: process.env.S3_BUCKET}
});

const postUsers = (userObj) => fetch(`${URI}/users`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({user: userObj})
}).then(resp => resp.json()).then(json => {
  localStorage.setItem("token", json.token)
  localStorage.setItem("id", json.id)
  localStorage.setItem("username", json.username)
})

const login = (userObj) => fetch(`${URI}/sessions`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({user: userObj})
}).then(resp => resp.json()).then(json => {
  localStorage.setItem("token", json.token)
  localStorage.setItem("id", json.id)
  localStorage.setItem("username", json.username)
})

const createRecording = (id) => fetch(`${URI}/recordings`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({user_id: localStorage.getItem("id"), path: id, name: "untitled"})
})
  .then(resp => resp.json())
  .then(json => {
    localStorage.setItem("rec_path", json.path);
    localStorage.setItem("rec_id", json.id)})


const postRecord = (audioBlob) => {
      let keyid= uuid()
      var params = {
              Bucket: process.env.REACT_APP_S3_BUCKET,
              Body: audioBlob,
              Key: keyid,
              ContentType: 'audio/webm;codecs=opus',
            };
      return new Promise(function(resolve, reject) {
        s3.putObject(params, function(err, data) {
          if(err) {
            console.log(err);
            return reject(err);
          } else {
            return resolve(data);
          }
        });
      })
      .then(data => {
        createRecording(keyid)
      })
}

const getRecs = (id) => {
  return fetch(`${URI}/users/${id}`)
    .then(resp => resp.json())
}

const patchRecordingName = (name, id) => {
  return fetch(`${URI}/recordings/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name})
  }).then(resp => resp.json())

}

const deleteRecording = (id) => {
  fetch(`${URI}/recordings/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id})
  }).then(resp => resp.json())
}

export default {postUsers, login, createRecording, postRecord, getRecs, patchRecordingName, deleteRecording};
