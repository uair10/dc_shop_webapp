import axios from "axios";
import type { BotSettings } from "@/types/bot_settings";
import { generateRandomKey } from "@/helpers/keygen";

const baseURL = "https://8ec4-194-110-8-164.ngrok-free.app";

const api = axios.create({
  baseURL,
});

api.defaults.headers.common["ngrok-skip-browser-warning"] = "1";

api.interceptors.request.use(
  (config) => {
    config.headers["X-Key"] = generateRandomKey();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fetchUser = (user_tg_id: number) =>
  api.get("/users/", { params: { user_tg_id } });

export const getProducts = (user_tg_id: number) =>
  api.get("/products/", { params: { user_tg_id } });

export const getProduct = (user_tg_id: number, productId: number) => {
  return api
    .get(`/products/${productId}`, { params: { user_tg_id } })
    .then((response) => {
      return response.data;
    });
};

export const getDiscountedCartItems = (cart_data, user_tg_id) => {
  return api
    .post(
      "/products/calculate_discount/",
      { ...cart_data },
      {
        params: { user_tg_id },
      },
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export const sendCart = (cart_data, user_tg_id) => {
  api.post("/cart/create", { ...cart_data }, { params: { user_tg_id } });
};

export const checkPromoCode = async (promoCode, user_tg_id) => {
  const formData = new FormData();
  formData.append("promocode_name", promoCode);
  formData.append("user_tg_id", user_tg_id);

  return api.post("/promocode/check", formData).then((response) => {
    return response.data;
  });
};

export const fetchBotSettings = async () => {
  return api.get("/bot_settings").then((response) => {
    return response.data as BotSettings;
  });
};
