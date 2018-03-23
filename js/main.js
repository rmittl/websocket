
const websocket = new WebSocket('ws://localhost:3333')
const timeline = document.querySelector('.timeline')
const chatContainer = document.querySelector('.chat__container')
const chatButton = chatContainer.querySelector('button')
const personalContainer = document.querySelector('.personal__container')
const personalButton = personalContainer.querySelector('button')
const fragment = document.createDocumentFragment()

personalButton.addEventListener('click', e => {
  // catch the value of the input field

  const nameField = document.querySelector('#name')
  const nameFieldValue = nameField.value
  const personalName = nameFieldValue
  const paragraphPersonal = document.createElement('p')

  paragraphPersonal.innerHTML = `Your name is ${personalName}`
  fragment.appendChild(paragraphPersonal)
  personalContainer.appendChild(fragment)
  nameField.parentNode.removeChild(nameField)
  personalButton.parentNode.removeChild(personalButton)
  sock.send(JSON.stringify({
    type: 'name',
    data: personalName
  }))
})

websocket.onopen = e => {
  // alert('Connection WebSocket Success')
  // setTimeout(_ => websocket.send('Hello'), 1000)
  // websocket.onmessage = e => console.log(e)

}

websocket.onmessage = e => {
  console.log(e)
  const fragment = document.createDocumentFragment()
  const paragraphTimeline = document.createElement('p')

  paragraphTimeline.innerHTML = 'you: ' + e.data
  fragment.appendChild(paragraphTimeline)
  timeline.appendChild(fragment)
}

chatButton.addEventListener('click', _ => {
  const textMessageField = document.querySelector('#text').value

  websocket.send(textMessageField)
  sock.send(JSON.stringify({
    type: 'message',
    data: textMessageField
  }))
})
