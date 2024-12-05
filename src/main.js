const config = {
  url: "https://api.recursionist.io/builder/computers?type=",
};

async function fetchData(parts) {
  let endpoint = config.url + parts;

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function createOption(data, id, optionName) {
  let selector = document.getElementById(id);

  if (optionName == "Brand") {
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.Brand;
      option.textContent = item.Brand;
      selector.appendChild(option);
    });
  } else if (optionName == "Model") {
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.Model;
      option.textContent = item.Model;
      selector.appendChild(option);
    });
  }
}

fetchData("cpu")
  .then((data) => {
    createOption(data, "cpuBrand", "Brand");
  })
  .catch((error) => {
    console.log(error);
  });
