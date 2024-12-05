function createApp() {
  let app = document.createElement(`div`);
  app.classList.add("bg-white");

  let titleString = `
      <div class="col-12 d-flex justify-content-center bg-dark text-white">
        <h1 class="p-3">Computer Builder</h1>
      </div>
    `;

  app.innerHTML = titleString;
  app.append(addInputCPU());
  return app;
}

function addInputCPU() {
  let cpuBox = document.createElement("div");

  let cpuInput = `
    <div class="m-2 pt-3">
      <h2><b>Step1</b>: Select your CPU</h2>
    </div>
    <div class="mx-2 pt-1 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start aligin-items-sm-center">
      <h3>Brand</h3>
      <select id="cpuBrand" class="mx-3 col-9 col-sm-3 custom-select">
        <option>-</option>
        <option>ccc</option>
        <option>ddd</option>
      </select>
      <h3>Model</h3>
      <select id="cpuModel" class="col-9 mx-3 col-sm-3 custom-select">
        <option>-</option>
        <option>ccc</option>
        <option>ddd</option>
      </select>
    </div>
  `;
  cpuBox.innerHTML = cpuInput;
  return cpuBox;
}

let parent = document.getElementById("target");
parent.append(createApp());
