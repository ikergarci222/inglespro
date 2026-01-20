const dialogflow = require('@google-cloud/dialogflow');

const sessionClient = new dialogflow.SessionsClient();

const sessionId = 'inglespro-session';
const projectId = 'inglespro-12345';

const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: '',
      languageCode: 'es-ES',
    },
  },
};

function sendMessage(message) {
  request.queryInput.text.text = message;
  sessionClient.detectIntent(request).then(responses => {
    const response = responses[0].queryResult;
    const reply = response.fulfillmentText;
    document.getElementById('chatbot').innerHTML += `<p>${reply}</p>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const chatbotDiv = document.getElementById('chatbot');
  const input = document.createElement('input');
  const button = document.createElement('button');
  button.textContent = 'Enviar';
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(input.value);
      input.value = '';
    }
  });
  button.addEventListener('click', () => {
    sendMessage(input.value);
    input.value = '';
  });
  chatbotDiv.appendChild(input);
  chatbotDiv.appendChild(button);
});
