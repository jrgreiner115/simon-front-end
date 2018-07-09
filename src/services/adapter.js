import uuid from 'uuid'
import AWS from 'aws-sdk'

const URI = 'http://localhost:3500/api/v1'
var creds = new AWS.Credentials(process.env.REACT_APP_AWS_ACCESS_KEY_ID, process.env.REACT_APP_AWS_SECRET_ACCESS_KEY);
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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
  localStorage.setItem("recordings", json.recordings)
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

const createRecording = (uri) => fetch(`${URI}/recordings`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({user_id: localStorage.getItem("id"), path: uri})
}).then(resp => resp.json()).then(json => localStorage.setItem("rec_path", json.path))


const postRecord = (audioBlob) => {
      // debugger
      let keyid= uuid()
      var params = {
              Bucket: process.env.REACT_APP_S3_BUCKET,
              Body: audioBlob,
              Key: keyid,
              ContentType: 'audio/webm;codecs=opus',
            };
      var getParams = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: keyid,
      }
      return new Promise(function(resolve, reject) {
        s3.putObject(params, function(err, data) {
          if(err) {
            console.log(err);
            return reject(err);
          } else {
            console.log(data);
            return resolve(data);
          }
        });
      })
      .then(data => {
            console.log("DID IT!", `${process.env.REACT_APP_AWS_URL}/${keyid}`, data);
        createRecording(keyid)
      })
 //      .then(data => s3.getObject(getParams, function(err, data) {
 //   if (err) console.log(err, err.stack); // an error occurred
 //   else {
 //     // debugger
 //     console.log(data);
 //     audioCtx.decodeAudioData(data.Body.buffer, function(buffer) {
 //        console.log("Success", buffer);
 //        let  newFile = new File(buffer, "foo.mpeg",
 //          { type: 'audio/webm;codecs=opus; charset=UTF-8' });
 //        let objectURL = URL.createObjectURL(newFile);
 //      console.log("blob", newFile);
 //      console.log("URL", objectURL);
 //      },
 //      function(e){ console.log("Error with decoding audio data" + e.err); });
 //
 //  }
 //          // successful response
 // }));
}

const getRecs = (id) => {
  fetch(`${URI}/users/${id}`)
    .then(resp => resp.json())
}

const patchRecordingName = (name, id) => {
  fetch(`${URI}/recordings/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_id: localStorage.getItem("id"), path: uri})
  }).then(resp => resp.json()).then(json => localStorage.setItem("rec_path", json.path))
}

export default {postUsers, login, createRecording, postRecord, getRecs};
