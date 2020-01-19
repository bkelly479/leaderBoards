

window.onload = function(){

  fetch('/getUserData')
    .then((response) => {
      return response.json()
    })
    .then((userData) =>{
      //console.log(userData);

      document.getElementById('navbarDropdownMenuLink').innerHTML = userData.nickname;

      document.getElementById('userName').innerHTML = userData.nickname;

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

  fetch('/api/getUserBoards')
    .then((response) =>{
      return response.json();
    })
    .then((userBoards) =>{
      //console.log(userBoards);

      var output = document.getElementById('boardArea');
      var numOfRows = userBoards.length / 4;
      console.log("NUM OF ROWS" + numOfRows);

      for( var i = 0; i < numOfRows; i++){
        //console.log(i);
        output.innerHTML = output.innerHTML + "<div class='card-deck' id='deck" + i + "''></div>"
      }

      var currentRow = 0;

      for(board in userBoards){
        //console.log("MOD: " + board / 4.0);

        if(board % 4.0 == 0 && board != 0){
          currentRow++;
        }
        //console.log(userBoards[board]);
        console.log("CURRENT ROW" + currentRow);

        var outputLoc = document.getElementById('deck' + currentRow);

        newCard(userBoards[board], outputLoc);

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

function newCard(data, loc){
  loc.innerHTML = loc.innerHTML +
                    "<div class='card my-2' style='width: 25%'>" +
                      "<div class='card-body'>" +
                        " <h5 class='card-title'>" + data.boardName + "</h5>" +
                        " <p class='card-subtitle'> " + data.boardPurpose + "</p>" +
                      " </div>" +
                    " </div>";
}
