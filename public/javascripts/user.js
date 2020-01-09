

window.onload = function(){

  fetch('/getUserData')
    .then((response) => {
      return response.json()
    })
    .then((userData) =>{
      //console.log(userData);

      document.getElementById('navbarDropdownMenuLink').innerHTML = userData.nickname;

      localStorage.setItem("userData", JSON.stringify(userData));
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
    console.log($('#form2').val());
      $.ajax({
          url: '/api/newBoard',
          type: 'POST',
          data: {
              boardName: $('#form2').val(),
              boardPurpose: $('#form3').val()
          },
          success: function(msg) {
              console.log('new board data sent to back end');
          },
          error: function(xhr, textStatus, errorThrown){
                alert('request failed->'+textStatus);
          }
      });
  });

}

function removeStorage(){
  localStorage.removeItem('userData');
}
