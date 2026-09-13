export interface PaymentRequest {
  bookingId?: string;
  amount: number;
  method: 'upi' | 'card' | 'netbanking' | 'demo';
  upiId?: string;
  cardDetails?: {
    cardNumber?: string;
    cardHolder?: string;
    expiry?: string;
  };
  bankName?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  paymentId: string;
  amount: number;
  timestamp: string;
  message: string;
}

export const paymentService = {
  async processSimulatedPayment(request: PaymentRequest): Promise<PaymentResult> {
    // Simulate real gateway network latency
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const transactionId = `TXN-QC-${Math.floor(100000 + Math.random() * 900000)}`;
    const paymentId = `pay_sim_${Date.now()}`;

    return {
      success: true,
      transactionId,
      paymentId,
      amount: request.amount,
      timestamp: new Date().toISOString(),
      message: 'Payment verified and slot confirmed successfully.',
    };
  }
};
