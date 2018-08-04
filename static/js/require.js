const ipc = require('electron').ipcRenderer;
            
var emojifyButton = document.getElementById('emojify_button');
var input = document.getElementById('input_field');


input.addEventListener("keydown", function(e) {
    if(e.keyCode === 13) {
        emojify();
    }
});

emojifyButton.addEventListener('click', emojify);

function emojify() {
    ipc.once('emojifyResponse', function(event, response) {
        document.getElementById("emojify_output").value = response;
    });
    ipc.send('emojifyAction', input.value);
}

