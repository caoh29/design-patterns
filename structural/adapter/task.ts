// 1. Interfaz PaymentProcessor
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// 2. Clases de Servicios de Pago Externos
// Estas clases simulan los servicios externos de PayPal, Stripe y MercadoPago

class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Procesando pago de $${amount} con PayPal`);
  }
}

class StripeService {
  makeCharge(amount: number): void {
    console.log(`Procesando pago de $${amount} con Stripe`);
  }
}

class MercadoPagoService {
  pay(amount: number): void {
    console.log(`Procesando pago de $${amount} con MercadoPago`);
  }
}

// 3. Clases Adaptadoras

// Adaptador para PayPal
class PayPalAdapter implements PaymentProcessor {

  private readonly paypalService: PayPalService;

  constructor(service: PayPalService) {
    this.paypalService = service;
  }

  processPayment(amount: number): void {
    this.paypalService.sendPayment(amount);
  }
}

// Adaptador para Stripe
class StripeAdapter implements PaymentProcessor {

  private readonly stripeService: StripeService;

  constructor(service: StripeService) {
    this.stripeService = service;
  }

  processPayment(amount: number): void {
    this.stripeService.makeCharge(amount);
  }
}

// Adaptador para MercadoPago
class MercadoPagoAdapter implements PaymentProcessor {
  private readonly mercadopagoService: MercadoPagoService;

  constructor(service: MercadoPagoService) {
    this.mercadopagoService = service;
  }

  processPayment(amount: number): void {
    this.mercadopagoService.pay(amount);
  }
}

// 4. Código Cliente para probar el Adapter

function main() {
  const paymentAmount = 100;

  // TODO: Agregar los adaptadores para los servicios de pago
  const paypalProcessor: PaymentProcessor = new PayPalAdapter(new PayPalService());
  const stripeProcessor: PaymentProcessor = new StripeAdapter(new StripeService());
  const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter(new MercadoPagoService());

  // Procesar pagos con los diferentes servicios
  // Los 3 procesadores de pago trabajan exactamente igual después de adaptaros
  console.log('Usando PayPal:');
  paypalProcessor.processPayment(paymentAmount);

  console.log('\nUsando Stripe:');
  stripeProcessor.processPayment(paymentAmount);

  console.log('\nUsando MercadoPago:');
  mercadoPagoProcessor.processPayment(paymentAmount);
}

main();