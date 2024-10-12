function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class PaymentManager {
  static bankBalance = 232_232_123_321;

  static async withdraw(amount, iban) {
    await sleep(1000);
    if (amount < bankBalance) {
      bankBalance -= amount;
      return true;
    } else {
      return false;
    }
  }

  static async checkPaymentStatus(transferId) {
    await sleep(1000);
    return { done: true, amount: Math.floor(Math.random() * (100 - 10) + 10) };
  }
}

export default PaymentManager;
