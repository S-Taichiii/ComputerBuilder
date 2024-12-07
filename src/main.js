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

function createCpuAndGpuOption(partsName) {
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
            const option = document.createElement("option");

            option.value = item.Brand;
            option.textContent = item.Brand;
            brand.appendChild(option);
          }
        });

        // Brandのvalueによってmodelのオプションを変更
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

function validateMemory(modelName, value) {
  let modelString = modelName.split(" ");
  let modelSize = modelString[modelString.length - 1];

  console.log(modelSize[0] === value);
  return modelSize[0] === value;
}

function createMemoryOption() {
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

          // Brandのvalueによってmodelのオプションを変更
          brand.addEventListener("change", (e) => {
            initializeSelect(modelId);

            data.forEach((item) => {
              if (
                e.target.value === item.Brand &&
                validateMemory(item.Model, numberEvent.target.value)
              ) {
                const option = document.createElement("option");

                option.value = item.Model;
                option.textContent = item.Model;
                model.appendChild(option);
              }
            });
          });
        });
    });
  });
}

createCpuAndGpuOption("cpu");
createCpuAndGpuOption("gpu");

createMemoryOption();
