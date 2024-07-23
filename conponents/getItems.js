async function getItems() {
  const response = await fetch("https://api.petitpierre.net/api/sliders", {
    method: "GET",
  });

  let result = await response.json();
  //console.log(result);
}
getItems();
