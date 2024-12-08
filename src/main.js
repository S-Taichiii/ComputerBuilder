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

function addOption(item, placeToAdd) {
  const option = document.createElement("option");

  option.value = item;
  option.textContent = item;
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
            addOption(item.Brand, brand);
          }
        });

        // Brandのvalueによってmodelのオプションを変更
        brand.addEventListener("change", (e) => {
          initializeSelect(modelId);

          data.forEach((item) => {
            if (e.target.value === item.Brand) {
              addOption(item.Model, model);
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

  number.addEventListener("change", () => {
    initializeSelect(brandId);
    initializeSelect(modelId);
  });

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
            addOption(item.Brand, brand);
          }
        });

        // Brandのvalueによってmodelのオプションを変更
        brand.addEventListener("change", (e) => {
          initializeSelect(modelId);

          data.forEach((item) => {
            if (
              e.target.value === item.Brand &&
              validateMemory(item.Model, number.value)
            ) {
              addOption(item.Model, model);
            }
          });
        });
      });
  });
}

function createStorageSelect() {
  let endpoint = config.url;
  let brandId = "storageBrand";
  let modelId = "storageModel";
  let storageSizeId = "storageSize";
  let storageTypeId = "storageType";
  let brand = document.getElementById(brandId);
  let model = document.getElementById(modelId);
  let storageType = document.getElementById(storageTypeId);
  let storageSize = document.getElementById(storageSizeId);

  storageType.addEventListener("change", (e) => {
    let type = e.target.value;

    initializeSelect(storageSizeId);
    initializeSelect(brandId);
    initializeSelect(modelId);

    if (type === "ssd") endpoint = config.url + "ssd";
    else if (type === "hdd") endpoint = config.url + "hdd";

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          let isSize = false;
          for (let i = 0; i < storageSize.options.length; i++) {
            if (storageSize.options[i].value === getStorageSize(item.Model)) {
              isSize = true;
              break;
            }
          }

          if (!isSize) {
            let size = getStorageSize(item.Model);
            if (size !== "") addOption(size, storageSize);
          }
        });
      });

    storageSize.addEventListener("change", () => {
      initializeSelect(brandId);
      initializeSelect(modelId);
    });

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
              addOption(item.Brand, brand);
            }
          });

          // Brandのvalueによってmodelのオプションを変更
          brand.addEventListener("change", (e) => {
            initializeSelect(modelId);

            data.forEach((item) => {
              if (
                e.target.value === item.Brand &&
                validateStorage(item.Model, storageSize.value)
              ) {
                addOption(item.Model, model);
              }
            });
          });
        });
    });
  });
}

function validateStorage(model, value) {
  return getStorageSize(model) === value;
}

function getStorageSize(model) {
  let modelString = model.split(" ");

  for (let i = 0; i < modelString.length; i++) {
    let unit = modelString[i].substring(modelString[i].length - 2);
    if (unit === "GB" || unit === "TB") return modelString[i];
  }

  return "";
}

createCpuAndGpuSelect("cpu");
createCpuAndGpuSelect("gpu");
createMemorySelect();
createStorageSelect();
