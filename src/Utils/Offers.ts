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

 
  const cheese = cartItems.find((item) => item.name === "Cheese");
  if (cheese && cheese.quantity >= 2) {
    const freeCheese = Math.floor(cheese.quantity / 2);
    const cheeseSavings = freeCheese * cheese.price;
    offers.push({
      description: "Cheese Buy 1 Get 1 Free",
      savings: cheeseSavings,
    });
    totalSavings += cheeseSavings;
  }

  
  const bread = cartItems.find((item) => item.name === "Bread");
  const soup = cartItems.find((item) => item.name === "Soup"); 
  if (soup && bread) {
    const eligibleBread = Math.min(soup.quantity, bread.quantity);
    const breadSavings = Math.floor(eligibleBread * bread.price * 0.5);
    if (breadSavings > 0) {
      offers.push({
        description: "Soup Offer: Bread at Half Price",
        savings: breadSavings,
      });
      totalSavings += breadSavings;
    }
  }

  
  const butter = cartItems.find((item) => item.name === "Butter");
  if (butter && butter.quantity > 0) {
    const butterSavings = Math.floor(butter.price / 3) * butter.quantity;
    offers.push({
      description: "Butter 1/3 off",
      savings: butterSavings,
    });
    totalSavings += butterSavings;
  }

  const finalTotal = subtotal - totalSavings;

  return {
    offers,
    totalSavings,
    finalTotal,
  };
};
