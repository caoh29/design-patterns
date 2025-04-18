/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

// 1. Interfaz Document
interface Documentx {
  displayContent(user: User): void;
}

// 2. Clase que representa el Documento Confidencial - ConfidentialDocument
class ConfidentialDocument implements Documentx {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }
  displayContent(): void {
    console.log(`Contenido del documento: \n${this.content}\n`);
  }
}

// 3. Clase Proxy - DocumentProxy
class DocumentProxy implements Documentx {
  private document: ConfidentialDocument;

  // TODO: Implementar el constructor de la clase DocumentProxy
  constructor(document: ConfidentialDocument) {
    this.document = document;
  }

  displayContent(user: User): void {
    // TODO: Implementar la lógica para verificar si el usuario tiene permisos
    // Sólo si es admin puede ver el contenido
    // Caso contrario, mostrar un mensaje de acceso denegado:
    if (user.getRole() !== 'admin') {
      console.log(`Acceso denegado. ${user.getName()}, no tienes permisos suficientes para ver este documento.`);
    } else {
      this.document.displayContent();
    }
    // EJ: `%cAcceso denegado. ${user.getName()}, no tienes permisos suficientes para ver este documento.`,
  }
}

// 4. Clase que representa al Usuario - User
class User {
  private name: string;
  private role: 'admin' | 'user';

  constructor(name: string, role: 'admin' | 'user') {
    this.name = name;
    this.role = role;
  }

  getName(): string {
    return this.name;
  }

  getRole(): string {
    return this.role;
  }
}

// 5. Código Cliente para probar el Proxy

function main() {
  const confidentialDoc = new ConfidentialDocument(
    'Este es el contenido confidencial del documento.'
  );
  const proxy = new DocumentProxy(confidentialDoc);

  const user1 = new User('Juan', 'user');
  const user2 = new User('Ana', 'admin');

  console.log('Intento de acceso del usuario 1:');
  proxy.displayContent(user1); // Debería denegar el acceso

  console.log('\nIntento de acceso del usuario 2:');
  proxy.displayContent(user2); // Debería permitir el acceso
}

main();