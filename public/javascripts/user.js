

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

}

function removeStorage(){
  localStorage.removeItem('userData');
}
