import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchUser } from "@/api";
import type { User } from "@/types/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: ref<User>(null),
  }),
  actions: {
    async fetchUser(user_tg_id: number) {
      const response = await fetchUser(user_tg_id);
      this.user = response.data.user;
      this.user.bonuses = response.data.bonuses;
    },
  },
});
