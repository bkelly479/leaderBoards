

window.onload = function(){

  fetch('/getUserData')
    .then((response) => {
      return response.json()
    })
    .then((userData) =>{
      console.log(userData);

      document.getElementById('navbarDropdownMenuLink').innerHTML = userData.displayName;

      localStorage.setItem("userData", JSON.stringify(userData));
    })

  fetch('/api/checkUser')
    .then((response) =>{
      return response.json();
    })
    .then((userExists) =>{
      if(userExists){
        alert('user exists');
      }else{
        fetch('/api/newUser');
      }
    })

}

function removeStorage(){
  localStorage.removeItem('userData');
}
