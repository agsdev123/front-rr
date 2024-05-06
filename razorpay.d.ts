import 'razorpay';

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}