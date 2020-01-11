

window.onload = function(){

  fetch('/getUserData')
    .then((response) => {
      return response.json()
    })
    .then((userData) =>{
      //console.log(userData);

      document.getElementById('navbarDropdownMenuLink').innerHTML = userData.nickname;

      localStorage.setItem("userData", JSON.stringify(userData));

      return;
    })



  fetch('/api/checkUser')
    .then((response) =>{
      return response.json();
    })
    .then((userExists) =>{
      if(userExists){
        console.log('userExists')
      }else{
        fetch('/api/newUser');
      }
    })

  $('#createBoard').click(function() {
    console.log('button clicked');


      $.ajax({
          url: '/api/newBoard',
          type: 'POST',
          data: {
              boardName: $('#boardName').val(),
              boardPurpose: $('#boardPurpose').val(),
              boardUsers: $('#usersSelect').val(),
              boardTask: $('#task').val(),
              boardPublic: $('#public').is(':checked')
          },
          success: function(msg) {
              console.log('new board data sent to back end');
          },
          error: function(xhr, textStatus, errorThrown){
                alert('request failed->'+textStatus);
          }
      });
  });

  $('.js-example-basic-multiple').select2();

  $('#newBoard').click(function(){
    populateAllUsers();
  });






}

function removeStorage(){
  localStorage.removeItem('userData');
}

function populateAllUsers(){
  fetch('/api/getAllUsers')
    .then((response) =>{
      console.log('somethign happened here');
      return response.json();
    })
    .then((allUsers) =>{

      var usersSelect = document.getElementById('usersSelect');

      for(var i = 0; i < allUsers.length; i++){
        var option = document.createElement("option");
        option.text = allUsers[i].userData.nickname;
        option.value = allUsers[i].userID;

        usersSelect.add(option);
        //console.log(allUsers[i].userData.nickname);
      }

      return;
    })
}
