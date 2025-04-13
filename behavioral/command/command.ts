/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 */

// 1. Interfaz Command
interface Command {
  execute(): void;
}

// 2. Clase Receptor - TextEditor

class TextEditor {
  private text: string = '';
  private clipboard: string = '';
  private history: string[] = [];

  // Agregar texto al editor
  type(text: string): void {
    this.history.push(this.text); // Guardar estado antes de cambiarlo
    this.text += text;
  }

  // Copiar el texto actual
  copy(): void {
    this.clipboard = this.text;
    console.log(
      `Texto copiado al portapapeles: \n"${this.clipboard}"`
    );
  }

  // Pegar el texto del portapapeles
  paste(): void {
    this.history.push(this.text); // Guardar estado antes de pegar
    this.text += this.clipboard;
    console.log(`Texto después de pegar: \n"${this.text}"`);
  }

  // Deshacer la última acción
  undo(): void {
    if (this.history.length > 0) {
      this.text = this.history.pop()!;
      console.log(`Texto después de deshacer: \n"${this.text}"`);
      return;
    }

    console.log('No hay nada para deshacer.');
  }

  // Mostrar el texto actual
  getText(): string {
    return this.text;
  }
}

// 3. Clases de Comandos Concretos
class CopyCommand implements Command {
  private editor: TextEditor;

  // TODO: Inyectar el editor en el constructor y el método execute con la acción respectiva
  constructor(editor: TextEditor) {
    this.editor = editor;
  }
  execute(): void {
    this.editor.copy();
  }
}

class PasteCommand implements Command {
  private editor: TextEditor;

  // TODO: Inyectar el editor en el constructor y el método execute con la acción respectiva
  constructor(editor: TextEditor) {
    this.editor = editor;
  }
  execute(): void {
    this.editor.paste();
  }
}

class UndoCommand implements Command {
  private editor: TextEditor;

  // TODO: Inyectar el editor en el constructor y el método execute con la acción respectiva
  constructor(editor: TextEditor) {
    this.editor = editor;
  }
  execute(): void {
    this.editor.undo();
  }
}

// 4. Clase Cliente - Toolbar

class Toolbar {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    // TODO: Asignar el comando al botón correspondiente
    this.commands[button] = command;
  }

  clickButton(button: string): void {
    //TODO: Ejecutar el comando correspondiente al botón
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }
    // TODO: Manejar el caso en que no haya un comando asignado al botón
    console.error(`No hay un comando asignado al botón "${button}"`);
  }
}

// 5. Código Cliente para probar el patrón Command
// !Nada del código main debe ser modificado
function main() {
  const editor = new TextEditor();
  const toolbar = new Toolbar();

  // Crear comandos para el editor
  const copyCommand = new CopyCommand(editor);
  const pasteCommand = new PasteCommand(editor);
  const undoCommand = new UndoCommand(editor);

  // Asignar comandos a los botones de la barra de herramientas
  toolbar.setCommand('copy', copyCommand);
  toolbar.setCommand('paste', pasteCommand);
  toolbar.setCommand('undo', undoCommand);

  // Simulación de edición de texto
  editor.type('H');
  editor.type('o');
  editor.type('l');
  editor.type('a');
  editor.type(' ');
  editor.type('M');
  editor.type('u');
  editor.type('n');
  editor.type('d');
  editor.type('o');
  editor.type('!');
  console.log(`Texto actual: "${editor.getText()}"`);

  // Usar la barra de herramientas
  console.log('\nCopiando texto:');
  toolbar.clickButton('copy');

  console.log('\nPegando texto:');
  toolbar.clickButton('paste');

  console.log('\nDeshaciendo la última acción:');
  toolbar.clickButton('undo');

  console.log('\nDeshaciendo de nuevo:');
  toolbar.clickButton('undo');

  console.log(`\nTexto final: "${editor.getText()}"`);
}

main();