import type { CartItem } from "../features/Cart/Types";

export interface Offer {
  description: string;
  savings: number;
}

export const calculateOffers = (cartItems: CartItem[]) => {
  const offers: Offer[] = [];
  let totalSavings = 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity >= 2) {
    offers.push({
      description: "Buy 2 products offer",
      savings: 100,
    });
    totalSavings += 100;
  }

  if (subtotal >= 500) {
    const discount = Math.floor(subtotal * 0.1);
    offers.push({
      description: "10% off on orders above ₹500",
      savings: discount,
    });
    totalSavings += discount;
  }

  return {
    offers,
    totalSavings,
    finalTotal: subtotal - totalSavings,
  };
};
