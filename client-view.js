ZoomMtg.setZoomJSLib('https://source.zoom.us/2.7.0/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

// setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js

var signatureEndpoint = 'http://localhost:4000'
var sdkKey = 'gREfnZ6ZblFNBypg9KQrxw45jyiUS2r5MxmQ'
var meetingNumber = 78912878100
var role = 0
var leaveUrl = 'http://localhost:5500/schedule.html'
var userName = ''
var userEmail = ''
var passWord = ''
var registrantToken = ''

//Use this password - T7JhQS
function getSignature() {  
  var userInput = document.getElementById('inp').value;
  var username = document.getElementById('name').value;
  console.log(userInput+" "+username)
  passWord = `${userInput}`
  userName = `${username}`
  fetch(signatureEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
  	console.log(error)
  })
}

function startMeeting(signature) {

  document.getElementById('zmmtg-root').style.display = 'block'

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    success: (success) => {
      console.log(success)      
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        userName: userName,
        userEmail: userEmail,
        passWord: passWord,
        tk: registrantToken,
        success: (success) => {
          console.log(success)
        },
        error: (error) => {
          console.log(error)
        },
      })
    },
    error: (error) => {
      console.log(error)
    }
  })
}
