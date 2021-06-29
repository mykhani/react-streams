# Project Description
This is a learning project to explore creating a webapp using React and Redux. The Google OAuth API is used to sign in
a user, json-server package is used to create a REST based API server, showing a list of available streams. A user can 
post and fetch the list of available streams from json-server using axios. Finally, RTMP server is established using 
node-media-server package. OBS software is used to upload the stream to the RTMP server which broadcasts it. Finally,
flv.js is used to play the broadcast-ed stream using HTML5 video element, when the user selects a stream.

# Instructions
1. First install all the required npm packages.
```console
$ pushd client && npm install && popd
$ pushd api && npm install && popd
$ pushd rtmpserver && npm install && popd
```
2. Edit client/src/components/GoogleAuth.js and put your Google OAuth Key id. Read
https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow for instructions on
getting Google OAuth key.
```js
class GoogleAuth extends React.Component {
  componentDidMount() {
    // callback invoked once load finishes
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        clientId:
          "your-google-oauth-key",
        scope: "email",
      });

```

3. Launch the api server in a new terminal.
```console
$ cd api
$ npm start
```

4. Launch the rtmp server in a separare terminal.
```console
$ cd rtmpserver
$ npm start
```

5. Launch the client side app in separate terminal using React development server. This should launch
the app in a browser window automatically. If not, you can manually launch the browser and go to
http://localhost:3000
```console
$ cd client
$ npm start
```

6. Click sign-in button to login with user gmail credentials.

7. Click the "Create Stream" button to open the stream creation page. Enter title and description.
For now there is a little bit of limitation as the newly created stream gets an id starting from 1 and
onwards. This id is important as it needs to be used for actually broadcasting the stream.

8. Download and install the OBS studio from https://obsproject.com/. These instructions are for Linux install.

9. Launch the OBS studio. Click the "+" button towards the bottom left to add a new scene. A scene refers to a broadcast
configuration. In this example, I would be streaming a video file from my computer. In the sources panel, click "+" to
select a source. Select "Media Source" and pick any video files from the computer using file browser dialog. Check the
loop option to keep playing the video in a loop.

10. Go to settings -> stream and select these options:
```
Service: custom
Server: rtmp://localhost/live
Stream Key: <id of the video e.g 1 for the first created stream>
```

11. Click on start streaming.

12. Open the client app browser screen and click on title of the stream. This should open a stream player screen. Press play
icon to play the stream.
