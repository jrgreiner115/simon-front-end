# Simon - A simple Audio Workstation
Simon is an audio manipulator, based on the idea that anyone should be able to make a quick recording of their newest song idea. As the project progressed, the focus became to make it easy enough for kids to record their songs, have character interactions, and learn a bit about audio works along the way.

## How it Works
I used React and Redux to manage the User Interface and client actions. Using a JWT token, I pass user information from a Rails REST API to the browser. Audio is stored in an S3 bucket.

The core functionality of this application is a combination of Pizzicato.js, a Javascript library that sits upon the Web Audio API, React-Mic, a React Component that handles recording and creating a blob with the audio data, and an Amazon S3 bucket that persists the audio data.

![Recording Audio](https://media.giphy.com/media/6G8lDLEvjbRHM1OgZo/giphy.gif)

*audio being recording*

![Listing To Audio](https://media.giphy.com/media/NTSP4lVW3nttY41E1K/giphy.gif)

*playback of audio with character interactions*

![Adding a Reverb Effect to Audio](https://media.giphy.com/media/1isc6JtLDvhKKSO9CA/giphy.gif)

*adding an effect to the audio clip*





### Further Plans

------------


I'd like to implement a stricter Auth system, as well as create a functioning export option. I would also like to allow users to add effects along a timeline of their audio, as well as allow the stacking of audio clips to create more complex songs. As an exploration into React Native, I'd like to create a version of Simon that is tablet-friendly.
