config = {
  parent: document.getElementById("app"),
  url: "https://api.recursionist.io/builder/computers?type=",
  cpu: {
    brand: "#cpuBrand",
    model: "#cpuModel",
  },
  gpu: {
    brand: "#gpuBrand",
    model: "#gpuModel",
  },
  ram: {
    num: "#ramNum",
    brand: "#ramBrand",
    model: "#ramModel",
  },
  storage: {
    type: "#storageType",
    size: "#storageSize",
    brand: "#storageBrand",
    model: "#storageModel",
  },
};

class PC {
  constructor() {
    this.cpuBrand = null;
    this.cpuModel = null;
    this.cpuBenchmark = null;
    this.gpuBrand = null;
    this.gpuModel = null;
    this.gpuBenchmark = null;
    this.ramBrand = null;
    this.ramModel = null;
    this.ramBenchmark = null;
    this.storageType = null;
    this.storageSize = null;
    this.storageBrand = null;
    this.storageModel = null;
    this.storageBenchmark = null;
  }

  static addBrandData(parts, selectedBrand, pc) {
    switch (parts) {
      case "cpu":
        pc.cpuBrand = selectedBrand;
        break;
      case "gpu":
        pc.gpuBrand = selectedBrand;
        break;
      case "ram":
        pc.ramBrand = selectedBrand;
        break;
      case "hdd":
        pc.storageBrand = selectedBrand;
        break;
      case "ssd":
        pc.storageBrand = selectedBrand;
        break;
    }
  }

  static addModelData(parts, selectedModel, pc) {
    switch (parts) {
      case "cpu":
        pc.cpuModel = selectedModel;
        break;
      case "gpu":
        pc.gpuModel = selectedModel;
        break;
      case "ram":
        pc.ramModel = selectedModel;
        break;
      case "hdd":
        pc.storageModel = selectedModel;
        break;
      case "ssd":
        pc.storageModel = selectedModel;
        break;
    }
  }

  static addBenchmarkData(parts, benchmark, pc) {
    switch (parts) {
      case "cpu":
        pc.cpuBenchmark = benchmark;
        break;
      case "gpu":
        pc.gpuBenchmark = benchmark;
        break;
      case "ram":
        pc.ramBenchmark = benchmark;
        break;
      case "hdd":
        pc.storageBenchmark = benchmark;
        break;
      case "ssd":
        pc.storageBenchmark = benchmark;
        break;
    }
  }

  static addStorageSizeData(size, pc) {
    pc.storageSize = size;
  }

  static getGamingBenchmark(pc) {
    let cpuScore = parseInt(pc.cpuBenchmark * 0.25);
    let gpuScore = parseInt(pc.gpuBenchmark * 0.6);
    let ramScore = parseInt(pc.ramBenchmark * 0.125);
    let storageScore = (this.storageType = "SSD"
      ? parseInt(pc.storageBenchmark * 0.1)
      : parseInt(pc.storageBenchmark * 0.025));
    return cpuScore + gpuScore + ramScore + storageScore;
  }

  static getWorkBenchmark(pc) {
    let cpuScore = parseInt(pc.cpuBenchmark * 0.6);
    let gpuScore = parseInt(pc.gpuBenchmark * 0.25);
    let ramScore = parseInt(pc.ramBenchmark * 0.1);
    let storageScore = parseInt(pc.storageBenchmark * 0.05);
    return cpuScore + gpuScore + ramScore + storageScore;
  }
}

class View {
  static createInitialPage(pc) {
    const parent = config.parent;
    let container = document.createElement("div");
    container.classList.add("bg-white");
    container.innerHTML = `
      <div class="bg-dark col-12 d-flex justify-content-center align-items-center">
          <h1 class="text-white text-center">Build Your Own Computer</h1>
      </div>
      <div class="m-2 pt-3">
          <h4>step1: Select Your CPU</h4>
      </div>
      <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
          <h5>Brand</h5>
          <select class="mx-3 col-9 col-sm-3 custom-select" id="cpuBrand">
              <option>-</option>
          </select>
          <h5>Model</h5>
          <select class="mx-3 col-9 col-sm-3 custom-select" id="cpuModel">
              <option>-</option>
          </select>        
      </div>
      <div class="m-2 pt-3">
          <h4>step2: Select Your GPU</h4>
      </div>
      <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
          <h5>Brand</h5>
          <select class="mx-3 col-9 col-sm-3 custom-select" id="gpuBrand">
              <option>-</option>
          </select>
          <h5>Model</h5>
          <select class="mx-3 col-9 col-sm-3 custom-select" id="gpuModel">
              <option>-</option>
          </select>        
      </div>
      <div class="m-2 pt-3">
          <h4>step3: Select Your Memory Card</h4>
      </div>
      <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
          <h5>How many?</h5>
          <select class="mx-3 col-9 col-sm-1 custom-select" id="ramNum">
              <option>-</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
          </select>
          <h5>Brand</h5>
          <select class="mx-3 col-9 col-sm-3 custom-select" id="ramBrand">
              <option>-</option>
          </select>
          <h5>Model</h5>
          <select class="mx-3 col-9 col-sm-3 custom-select" id="ramModel">
              <option>-</option>
          </select>        
      </div>
      <div class="m-2 pt-3">
          <h4>step4: Select Your Storage</h4>
      </div>
      <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
          <h5>HDD or SSD</h5>
          <select class="mx-3 col-9 col-sm-2 custom-select" id="storageType">
              <option>-</option>
              <option>HDD</option>
              <option>SSD</option>
          </select>
          <h5>Storage</h5>
          <select class="mx-3 col-9 col-sm-2 custom-select" id="storageSize">
              <option>-</option>
          </select>
          <h5>Brand</h5>
          <select class="mx-3 col-9 col-sm-2 custom-select" id="storageBrand">
              <option>-</option>
          </select>
          <h5>Model</h5>
          <select class="mx-3 col-9 col-sm-2 custom-select" id="storageModel">
              <option>-</option>
          </select>        
      </div>
      <div>
          <button type="submit" class="my-3 ml-3 btn btn-primary col-2" id="addPc">Add PC</button>
      </div>
      <div id="displayPC">
      </div>
        `;
    parent.append(container);

    const addPcBtn = document.querySelectorAll("#addPc")[0];
    addPcBtn.addEventListener("click", function () {
      Controller.clickAddPc(pc);
    });

    return parent;
  }

  static createbuiltPcPage(pc, gamingScore, workScore, count) {
    const container = document.querySelectorAll("#displayPC")[0];
    let div = document.createElement("div");
    div.classList.add("bg-primary", "text-white", "m-2", "col-12");
    div.innerHTML = `
        <div class="m-2 pt-3 d-flex justify-content-center">
            <h1>Your PC${count}</h1>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>CPU</h1>
            <h5>Brand: ${pc.cpuBrand}</h5>
            <h5>Model: ${pc.cpuModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>GPU</h1>
            <h5>Brand: ${pc.gpuBrand}</h5>
            <h5>Model: ${pc.gpuModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>RAM</h1>
            <h5>Brand: ${pc.ramBrand}</h5>
            <h5>Model: ${pc.ramModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>Storage</h1>
            <h5>Disk: ${pc.storageType}</h5>
            <h5>Storage: ${pc.storageSize}</h5>
            <h5>Brand: ${pc.storageBrand}</h5>
            <h5>Model: ${pc.storageModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex justify-content-around align-items-center">
            <h1>Gaming: ${gamingScore}%</h1>
            <h1>Work: ${workScore}%</h1>
        </div>
        `;
    container.append(div);
    return container;
  }
}
