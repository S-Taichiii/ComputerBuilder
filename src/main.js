const config = {
  url: "https://api.recursionist.io/builder/computers?type=",
};

// selectの中を初期化
function initializeSelect(id) {
  let select = document.getElementById(id);
  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "-";
  defaultOption.textContent = "-";
  select.appendChild(defaultOption);
}

function addOption(item, placeToAdd, selectName) {
  const option = document.createElement("option");

  if (selectName === "Brand") {
    option.value = item.Brand;
    option.textContent = item.Brand;
  } else {
    option.value = item.Model;
    option.textContent = item.Model;
  }
  placeToAdd.appendChild(option);
}

function createCpuAndGpuSelect(partsName) {
  let endpoint = config.url + partsName;
  let brandId = partsName + "Brand";
  let modelId = partsName + "Model";
  let brand = document.getElementById(brandId);
  let model = document.getElementById(modelId);

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
            addOption(item, brand, "Brand");
          }
        });

        // Brandのvalueによってmodelのオプションを変更
        brand.addEventListener("change", (e) => {
          initializeSelect(modelId);

          data.forEach((item) => {
            if (e.target.value === item.Brand) {
              addOption(item, model, "Model");
            }
          });
        });
      });
  });
}

function validateMemory(modelName, value) {
  let modelString = modelName.split(" ");
  let modelSize = modelString[modelString.length - 1];

  return modelSize[0] === value;
}

function createMemorySelect() {
  let endpoint = config.url + "ram";
  let brandId = "ramBrand";
  let modelId = "ramModel";
  let number = document.getElementById("howMany");
  let brand = document.getElementById(brandId);
  let model = document.getElementById(modelId);

  number.addEventListener("change", (numberEvent) => {
    initializeSelect(brandId);
    initializeSelect(modelId);

    brand.addEventListener("focus", () => {
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          // brand名がoptionにあるか確認、なければoptionを追加
          data.forEach((item) => {
            let isBrand = false;
            for (let i = 0; i < brand.options.length; i++) {
              if (brand.options[i].value === item.Brand) {
                isBrand = true;
                break;
              }
            }

            if (!isBrand) {
              addOption(item, brand, "Brand");
            }
          });

          // Brandのvalueによってmodelのオプションを変更
          brand.addEventListener("change", (e) => {
            initializeSelect(modelId);

            data.forEach((item) => {
              if (
                e.target.value === item.Brand &&
                validateMemory(item.Model, numberEvent.target.value)
              ) {
                addOption(item, model, "Model");
              }
            });
          });
        });
    });
  });
}

createCpuAndGpuSelect("cpu");
createCpuAndGpuSelect("gpu");

createMemorySelect();
