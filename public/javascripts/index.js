window.onload = function(){

  if(localStorage.getItem("userData")){
    var userData = JSON.parse(localStorage.getItem("userData"));


    document.getElementById('userDropdown').hidden = false;

    document.getElementById('navbarDropdownMenuLink').innerHTML = userData.displayName;

    console.log('logged in');

    document.getElementById('loginButton').hidden = true;
  }else{
    document.getElementById('userDropdown').hidden = true;
    console.log('not logged in');
    document.getElementById('loginButton').hidden = false;
  }

/*
  fetch('/getUserData')
    .then((response) => {
      return response.json()
    })
    .then((userData) =>{
      document.getElementById('userDropdown').hidden = false;

      console.log('logged in');
    })
    .catch(function(error){

      document.getElementById('userDropdown').hidden = true;
      console.log('not logged in');
    })

*/

}


function removeStorage(){
  localStorage.removeItem('userData');
}
