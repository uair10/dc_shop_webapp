import { defineStore } from "pinia";
import { checkPromoCode } from "@/api/promoApi";

export const usePromoStore = defineStore("promo", {
  state: () => ({
    isValid: false,
  }),
  actions: {
    async checkPromoCode(promoCode: string) {
      const response = await checkPromoCode(promoCode);
      this.isValid = response.data.isValid;
    },
  },
});
