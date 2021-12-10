const Http = new XMLHttpRequest();
const url='https://micro-okta.herokuapp.com/Auth';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  const obj = JSON.parse(Http.responseText);
  if (obj.key==0)
  {
     window.location.replace("/login");
  }
}
