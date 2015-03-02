var socket =io();
$('#signUpForm').submit(function(){
  socket.emit('startChat', $('#email').val(), $('#dob').val(), $('#name').val());
  return false;  
});

socket.on('chatStarted', function(hasStarted){
  if(hasStarted){
    $('#signUp').hide();
    $('#messageWindow').show();
    //show messageWindow
  }
});

socket.on('update', function(status){
  $('#status').val(status);
});



// ---- don't need below
socket.on('chat message', function(msg){
    appendMessage(msg);
});

function appendMessage(msg){
  $('#messages').append($('<li>').text(msg));
}

ar socket =io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      appendMessage($('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
        appendMessage(msg);
    });

    function appendMessage(msg){
      $('#messages').append($('<li>').text(msg));
    }