/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

class Computer {
  public cpu: string = "not defined";
  public storage: string = "not defined";
  public ram: string = "not defined";
  public gpu?: string;

  displayConfig() {
    console.log(`CPU: ${this.cpu}, Storage: ${this.storage}, RAM: ${this.ram}, GPU: ${this.gpu}`);
  }
}


class ComputerBuilder {
  private readonly computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string) {
    this.computer.cpu = cpu;
    return this;
  }

  setStorage(storage: string) {
    this.computer.storage = storage;
    return this;
  }

  setRAM(ram: string) {
    this.computer.ram = ram;
    return this;
  }

  setGPU(gpu: string) {
    this.computer.gpu = gpu;
    return this;
  }

  build() {
    return this.computer;
  }
}


function mainBuilder() {
  const computer = new ComputerBuilder()
    .setCPU("Intel i7")
    .setStorage("1TB SSD")
    .setRAM("16GB")
    .setGPU("NVIDIA RTX 3080")
    .build();

  computer.displayConfig();
}

mainBuilder();