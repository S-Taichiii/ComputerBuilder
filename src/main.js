const config = {
  url: "https://api.recursionist.io/builder/computers?type=",
};

function initializeSelect(id) {
  let select = document.getElementById(id);
  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "-";
  defaultOption.textContent = "-";
  select.appendChild(defaultOption);
}

function createOption(partsName) {
  let brandId = partsName + "Brand";
  let modelId = partsName + "Model";
  let brand = document.getElementById(brandId);
  let model = document.getElementById(modelId);
  let endpoint = config.url + partsName;

  brand.addEventListener("focus", () => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          // brand名がoptionにあるか確認、なければoptionを追加
          let isBrand = false;
          for (let i = 0; i < brand.options.length; i++) {
            if (brand.options[i].value === item.Brand) {
              isBrand = true;
              break;
            }
          }

          if (!isBrand) {
            const option = document.createElement("option");

            option.value = item.Brand;
            option.textContent = item.Brand;
            brand.appendChild(option);
          }
        });

        brand.addEventListener("change", (e) => {
          initializeSelect(modelId);

          data.forEach((item) => {
            if (e.target.value === item.Brand) {
              const option = document.createElement("option");

              option.value = item.Model;
              option.textContent = item.Model;
              model.appendChild(option);
            }
          });
        });
      });
  });
}

createOption("cpu");
createOption("gpu");
createOption("ram");
