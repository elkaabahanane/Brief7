// Recuperer les informations dans la localStorage de navigateur
var image = localStorage.getItem('image');
var nom = localStorage.getItem('nom');
var prenom = localStorage.getItem('prenom');
var email = localStorage.getItem('email');
var telephone = localStorage.getItem('telephone');
var dateNaiss = localStorage.getItem('dateNaiss');
var dateD = localStorage.getItem('dateD');
var dateA = localStorage.getItem('dateA');
var personnes = localStorage.getItem('personnes');
var age = (new Date()).getTime() - (new Date(dateNaiss)).getTime();
age = Math.floor(age / (1000 * 3600 * 24 * 365));

var dd = new Date(dateD);
var da = new Date(dateA);
var tempsDiff = da.getTime() - dd.getTime();
var jours = tempsDiff / (1000 * 3600 * 24);

document.getElementById('image').setAttribute('src', image);
document.getElementById('nom-place').innerText = nom;
document.getElementById('prenom-place').innerText = prenom;
document.getElementById('email-place').innerText = email;
document.getElementById('age-place').innerText = age;
document.getElementById('date-place').innerText = jours;
document.getElementById('personnes-place').innerText = personnes;