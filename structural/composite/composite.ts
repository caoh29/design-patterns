/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

// 1. Interfaz MenuComponent
// Define el método `showDetails`, que implementarán los ítems y categorías de menú.
interface MenuComponent {
  showDetails(indent?: string): void;
}

// 2. Clase MenuItem
// Representa un ítem individual del menú, como un platillo o una bebida.
class MenuItem implements MenuComponent {
  private readonly name: string;
  private readonly price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  showDetails(indent: string = ''): void {
    console.log(
      `${indent}- ${this.name}: $${this.price.toFixed(2)}`
    );
  }
}

// 3. Clase MenuCategory
// Representa una categoría de menú que puede contener otros ítems o subcategorías.
class MenuCategory implements MenuComponent {
  private readonly name: string;
  private readonly items: MenuComponent[];

  constructor(name: string) {
    this.name = name;
    this.items = [];
  }
  add(item: MenuComponent | MenuComponent[]): void {
    if (Array.isArray(item)) {
      // item.forEach(element => this.add(element));
      item.forEach(element => this.items.push(element));
    } else {
      this.items.push(item);
    }
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}+ ${this.name}`);
    this.items.forEach(item => {
      item.showDetails(indent + ' ');
    })
  }
}

// 4. Código Cliente para Probar el Composite
function main() {
  // Crear ítems individuales
  const salad = new MenuItem('Ensalada', 5.99);
  const soup = new MenuItem('Sopa de tomate', 4.99);
  const steak = new MenuItem('Bistec', 15.99);
  const soda = new MenuItem('Refresco', 2.5);
  const dessert = new MenuItem('Pastel de chocolate', 6.5);
  const coffee = new MenuItem('Café', 1.99);

  const aguardiante = new MenuItem('guaro', 12.99);
  const tequila = new MenuItem('tequila', 41.99);

  const IPA = new MenuItem('IPA', 100.99);
  const Lager = new MenuItem('Lager', 20.99);

  // Crear categorías de menú y añadir ítems
  const appetizers = new MenuCategory('Entradas');
  appetizers.add(salad);
  appetizers.add(soup);

  const mainCourse = new MenuCategory('Plato Principal');
  mainCourse.add(steak);

  const beverages = new MenuCategory('Bebidas');
  // beverages.add(soda);
  // beverages.add(coffee);

  const cocktails = new MenuCategory('Coctels');
  cocktails.add([aguardiante, tequila])

  const beers = new MenuCategory('Cervezas');
  beers.add([IPA, Lager])

  const alcoholicBeverages = new MenuCategory('Bebidas Alcohólicas');
  alcoholicBeverages.add([cocktails, beers]); // Nesting: Category → Subcategory

  const nonAlcoholicBeverages = new MenuCategory('Bebidas Sin Alcohol');
  nonAlcoholicBeverages.add([soda, coffee]);

  const desserts = new MenuCategory('Postres');
  desserts.add(dessert);

  // Crear un menú principal que contiene todas las categorías
  const mainMenu = new MenuCategory('Menú Principal');
  mainMenu.add([appetizers, beverages, desserts, mainCourse]);
  // mainMenu.add(mainCourse);
  // mainMenu.add(beverages);
  // mainMenu.add(desserts);

  // Mostrar la estructura completa del menú
  console.log('Menú del Restaurante:');
  mainMenu.showDetails();
}

main();