const usuario = "DylanEstuardo2006";
const urlApiPerfil= 'https://api.github.com/users/' + usuario;
const urlApiRepos= 'https://api.github.com/users/' + usuario + '/repos?sort=updated&per_page=6&type=owner&direction=desc';
const urlApiFollowers =  'https://api.github.com/users/' + usuario + '/followers?per_page=5';
// PERFIL

fetch(urlApiPerfil)
.then(res => res.json())
.then(data => {
document.getElementById("avatar").src = data.avatar_url;
document.getElementById("nombre").textContent = data.name;
document.getElementById("bio").textContent = data.bio;
document.getElementById("ubicacion").textContent = data.location;
});

// REPOS
fetch(urlApiRepos)
.then(res => res.json())
.then(data => {
const contenedor = document.getElementById("listaRepos");
data.forEach(repo => {
  const card = document.createElement("div");
  card.classList.add("card");

  const enlace = document.createElement("a");
  enlace.href = repo.html_url;
  enlace.textContent = repo.name;
  enlace.target = "_blank";

  const descripcion = document.createElement("p");
  descripcion.textContent = repo.description || "Sin descripción";

  card.appendChild(enlace);
  card.appendChild(descripcion);
  contenedor.appendChild(card);
});
});

// FOLLOWERS
fetch(urlApiFollowers)
.then(res => res.json())
.then(data => {
const contenedor = document.getElementById("listaFollowers");

data.forEach(follower => {
  const img = document.createElement("img");
  img.src = follower.avatar_url;
  img.title = follower.login;
  contenedor.appendChild(img);
});
});