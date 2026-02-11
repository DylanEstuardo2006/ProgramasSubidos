document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("idDrink");

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {

      const drink = data.drinks[0];

      document.getElementById("drinkTitle").textContent = drink.strDrink;
      document.getElementById("drinkImage").src = drink.strDrinkThumb;
      document.getElementById("drinkCategory").textContent = drink.strCategory;
      document.getElementById("drinkAlcoholic").textContent = drink.strAlcoholic;
      document.getElementById("drinkGlass").textContent = drink.strGlass;
      document.getElementById("drinkInstructions").textContent = drink.strInstructions;

      // 👉 Ingredientes dinámicos
      const listaIngredientes = document.getElementById("drinkIngredients");
      listaIngredientes.innerHTML = "";

      for (let i = 1; i <= 15; i++) {
        const ingrediente = drink[`strIngredient${i}`];
        const medida = drink[`strMeasure${i}`];

        if (ingrediente && ingrediente.trim() !== "") {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = `${medida || ""} ${ingrediente}`;

          listaIngredientes.appendChild(li);
        }
      }

    });

});
