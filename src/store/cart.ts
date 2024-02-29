import { defineStore } from "pinia";
import { toRaw } from "vue";
import { getDiscountedCartItems } from "@/api";
import type { CartItem, Cart } from "@/types/cart";

const getCartKey = () => `cart`;

export const useCartStore = defineStore("cart", {
  state: (): Cart => ({
    items: [] as CartItem[],
    promocode: "",
    promocodeDiscount: 0,
    totalAmount: 0,
    bonusesAmount: 0,
  }),

  actions: {
    init() {
      this.loadCartFromLocalStorage();
    },

    loadCartFromLocalStorage() {
      const existingCart = localStorage.getItem(getCartKey());
      if (existingCart) {
        Object.assign(this, JSON.parse(existingCart));
      } else {
        this.saveCartToLocalStorage();
      }
    },

    getItem(productId: number) {
      return this.items.find((item) => item.id === productId);
    },

    async addItem(user_tg_id: number, product: CartItem) {
      this.items.push(product);
      await this.updateCartAndTotalAmount(user_tg_id);
      this.saveCartToLocalStorage();
    },

    async removeItem(productId: number, user_tg_id: number) {
      const cartItemIndex = this.items.findIndex(
        (item) => item.id === productId,
      );
      if (cartItemIndex !== -1) {
        this.items.splice(cartItemIndex, 1);
        await this.updateCartAndTotalAmount(user_tg_id);
        this.saveCartToLocalStorage();
      }
    },

    async increaseItemQuantity(user_tg_id: number, productId: number) {
      const cartItem = this.getItem(productId);
      if (cartItem) {
        cartItem.quantity += 1;
        await this.updateCartAndTotalAmount(user_tg_id);
        this.saveCartToLocalStorage();
      }
    },

    async decreaseItemQuantity(user_tg_id: number, productId: number) {
      const cartItem = this.getItem(productId);
      if (cartItem) {
        if (cartItem.quantity === 1) {
          await this.removeItem(productId, user_tg_id);
          return false;
        }

        cartItem.quantity -= 1;

        await this.updateCartAndTotalAmount(user_tg_id);
        this.saveCartToLocalStorage();
      }
    },

    async applyPromoCodeToCart(
      promoCodeName: string,
      discountValue: number,
      user_tg_id: number,
    ) {
      this.promocodeDiscount = discountValue;
      this.promocode = promoCodeName;

      await this.updateCartAndTotalAmount(user_tg_id);
      this.saveCartToLocalStorage();
    },

    async removePromocode(user_tg_id: number) {
      this.promocode = "";
      this.promocodeDiscount = 0;

      await this.updateCartAndTotalAmount(user_tg_id);
      this.saveCartToLocalStorage();
    },

    async applyBonusesToCart(bonuses: number, user_tg_id: number) {
      this.bonusesAmount = bonuses;

      await this.updateCartAndTotalAmount(user_tg_id);
      this.saveCartToLocalStorage();
    },

    async removeBonusesFromCart(user_tg_id: number) {
      this.bonusesAmount = 0;

      await this.updateCartAndTotalAmount(user_tg_id);
      this.saveCartToLocalStorage();
    },

    clearCart() {
      this.items = [];
      this.promocode = "";
      this.promocodeDiscount = 0;
      this.totalAmount = 0;
      this.saveCartToLocalStorage();
    },

    async updateCartAndTotalAmount(user_tg_id: number) {
      this.updateTotalAmount();
      await this.fetchDiscountedCart(user_tg_id);
      this.updateTotalAmount();
      this.saveCartToLocalStorage();
    },

    async fetchDiscountedCart(user_tg_id: number) {
      this.items = await getDiscountedCartItems(this.toDict(), user_tg_id);
    },

    updateTotalAmount() {
      this.totalAmount = this.items.reduce(
        (total, item) => total + item.discounted_price * item.quantity,
        0,
      );

      this.saveCartToLocalStorage();
    },

    saveCartToLocalStorage() {
      localStorage.setItem(getCartKey(), this.parseCart());
    },

    parseCart() {
      return JSON.stringify(this.$state);
    },

    toDict() {
      return toRaw(this.$state);
    },
  },
});
