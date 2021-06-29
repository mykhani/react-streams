# Project Description
This is a learning project to explore creating a webapp using React and Redux. The Google OAuth API is used to sign in
a user, json-server package is used to create a REST based API server, showing a list of available streams. A user can 
post and fetch the list of available streams from json-server using axios. Finally, RTMP server is established using 
node-media-server package. OBS software is used to upload the stream to the RTMP server which broadcasts it. Finally,
flv.js is used to play the broadcast-ed stream using HTML5 video element, when the user selects a stream.
