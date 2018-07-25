# Simon - A simple Audio Workstation
Simon is an audio manipulator, based on the idea that anyone should be able to make a quick recording of their newest song idea. As the project progressed, the focus became to make it easy enough for kids to record their songs, have character interactions, and learn a bit about audio works along the way.

## How it Works
I used React and Redux to manage the User Interface and client actions. Using a JWT token, I pass user information from a Rails REST API (link [here](https://github.com/jrgreiner115/simon-back-end)) to the browser. Audio is stored in an S3 bucket.

## Live Demo
[Heroku Demo](https://simon-daw.herokuapp.com/)


## Notable Features
The core functionality of this application is a combination of Pizzicato.js, a Javascript library that sits upon the Web Audio API, React-Mic, a React Component that handles recording and creating a blob with the audio data, and an Amazon S3 bucket that persists the audio data.

* [Pizzicato.js](https://alemangui.github.io/pizzicato/) - *A javascript Library for Live Audio.*
* [Amazon Web Services S3 Bucket](https://aws.amazon.com/s3/) - *Object storage built to store and retrieve any amount of data from anywhere.*
* [React Mic](https://www.npmjs.com/package/react-mic) - *Record a user's voice and display as an osscilation.*.
* [Rails API](https://github.com/jrgreiner115/simon-back-end) - *a RESTful back-end that handles user and recording reference as well as user validation*.

------------

![Recording Audio](https://media.giphy.com/media/6G8lDLEvjbRHM1OgZo/giphy.gif)

*audio being recording*

![Listing To Audio](https://media.giphy.com/media/NTSP4lVW3nttY41E1K/giphy.gif)

*playback of audio with character interactions*

![Adding a Reverb Effect to Audio](https://media.giphy.com/media/1isc6JtLDvhKKSO9CA/giphy.gif)

*adding an effect to the audio clip*

------------

## Local Installation
As Simon uses an AWS S3 Server, any local installation of the application will require you to create your own S3 bucket & create `env` vars. I'll be as descriptive as I can about the process as I can, but feel free to shoot me any questions you might have as you work to install.

Front-End:
1. Clone down this repo to your computer.
2. Install any dependencies with `npm install`
3. Start the local server with `npm start`

Back-End:

1. Clone down the [API repo](https://github.com/jrgreiner115/simon-back-end).
2. Install any depencies with  `bundle install`
3. Start the local server with `rails s -p 3500`

AWS Config:
* After you've created your S3 server, you'll need to give it a Public Bucket Policy. The only actions you'll need are: `s3:GetObject` and `s3:GetObjectAcl`. You may also need to give the bucket a CORS configuration.
* Once you have your credentials, create an `env` file with variables appropriately named as they are referenced in [this file](https://github.com/jrgreiner115/simon-front-end/blob/master/src/services/adapter.js).

**Please remember to gitignore any AWS keys if you decide to commit your local version of this application.**

### Further Plans

I'd like to implement a stricter Auth system, as well as create a functioning export option. I would also like to allow users to add effects along a timeline of their audio, as well as allow the stacking of audio clips to create more complex songs. As an exploration into React Native, I'd like to create a version of Simon that is tablet-friendly.
