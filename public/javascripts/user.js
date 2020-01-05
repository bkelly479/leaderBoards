

window.onload = function(){

  fetch('/getUserData')
    .then((response) => {
      return response.json()
    })
    .then((userData) =>{
      console.log(userData);

      document.getElementById('userName').innerHTML = userData.displayName;

      localStorage.setItem("userData", userData);
    })

}

function removeStorage(){
  localStorage.removeItem('userData');
}
