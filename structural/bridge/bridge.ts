// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notificationx {
  protected channel: NotificationChannel;

  constructor(channel: NotificationChannel) {
    this.channel = channel;
  }

  public abstract notify(message: string): void;
  public abstract setChannel(channel: NotificationChannel): void;
}

// 4. Clases Concretas de Notificaciones

class AlertNotification extends Notificationx {
  notify(message: string): void {
    console.log('\nNotificación de Alerta:');
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

class ReminderNotification extends Notificationx {
  notify(message: string): void {
    console.log('\nNotificación de Recordatorio:');
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

class PushNotification extends Notificationx {
  override notify(message: string): void {
    console.log('\nNotificación de Push:');
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

// 5. Código Cliente para Probar el Bridge

function main() {
  // Crear una notificación de alerta usando el canal de correo electrónico
  const alert = new AlertNotification(new EmailChannel());

  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  // Cambiar el canal a SMS y volver a enviar la alerta
  alert.setChannel(new SMSChannel());
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  // Crear una notificación de recordatorio usando el canal de SMS
  const reminder = new ReminderNotification(new SMSChannel());
  reminder.notify(
    'Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.'
  );

  // Cambiar el canal de recordatorio a correo electrónico y enviar nuevamente
  reminder.setChannel(new PushNotificationChannel());
  reminder.notify(
    'Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.'
  );

  // Crear una notificación de push usando el canal de notificación push
  const push = new PushNotification(new PushNotificationChannel());
  push.notify('Nueva actualización disponible. Haz clic para instalar.');
}

main();