function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class PaymentManager {
  static bankBalance = 232_232_123_321;

  static async withdraw(money, iban) {
    await sleep(1000);
    if (money < bankBalance) {
      bankBalance -= money;
      return true;
    } else {
      return false;
    }
  }

  static async checkPaymentStatus(transferId) {
    await sleep(1000);
    return true;
  }
}

export default PaymentManager;
