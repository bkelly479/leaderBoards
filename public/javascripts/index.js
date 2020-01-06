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

}


function removeStorage(){
  localStorage.removeItem('userData');
}
