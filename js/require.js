const ipc = require('electron').ipcRenderer;
            
var emojifyButton = document.getElementById('emojify_button');

emojifyButton.addEventListener('click', function() {
    ipc.once('emojifyResponse', function(event, response) {
        document.getElementById('emojify_output').value = response;
    })
    ipc.send('emojifyAction', document.getElementById('emojify_text').value);
});