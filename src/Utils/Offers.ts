import type { CartItem } from "../features/Cart/Types";

export interface Offer {
  description: string;
  savings: number;
}

export const calculateOffers = (cartItems: CartItem[]) => {
  const offers: Offer[] = [];
  let totalSavings = 0;

  const itemSavings: Record<string, number> = {};

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

    itemSavings["Cheese"] = cheeseSavings;
    totalSavings += cheeseSavings;
  }

  
  const soup = cartItems.find((item) => item.name === "Soup");
  const bread = cartItems.find((item) => item.name === "Bread");

  if (soup && bread) {
    const eligibleBread = Math.min(soup.quantity, bread.quantity);
    const breadSavings = eligibleBread * bread.price * 0.5;

    if (breadSavings > 0) {
      offers.push({
        description: "Soup Offer: Bread at Half Price",
        savings: breadSavings,
      });

      itemSavings["Bread"] = breadSavings;
      totalSavings += breadSavings;
    }
  }

  
  const butter = cartItems.find((item) => item.name === "Butter");
  if (butter && butter.quantity > 0) {
    const butterSavings = (butter.price / 3) * butter.quantity;

    offers.push({
      description: "Butter 1/3 Off",
      savings: butterSavings,
    });

    itemSavings["Butter"] = butterSavings;
    totalSavings += butterSavings;
  }

  return {
    offers,
    itemSavings,
    totalSavings,
    finalTotal: subtotal - totalSavings,
  };
};
