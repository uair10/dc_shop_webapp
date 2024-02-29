import { ref } from "vue";

const locales = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "ru",
    name: "Russian",
  },
];

const messages = {
  en: {
    add_to_cart: "Add",
    go_to_cart: "Go to cart",
    cart: "Cart",
    cart_is_empty: "Cart is empty",
    enter_promocode: "Enter promocode",
    use_bonuses: "Use bonuses: ",
    submit: "Submit",
    delete_promocode: "Delete promocode",
    confirm_order: "Confirm order",
    bot_is_disabled:
      "The bot only works for pre-orders. We will let you know as soon as the service becomes available",
    delivery_is_unavailable:
      "Delivery will be available tomorrow from 09:00 am (Bangkok time). You can create an order, but we will only deliver it tomorrow morning",
  },
  ru: {
    add_to_cart: "Добавить",
    go_to_cart: "Корзина",
    cart: "Корзина",
    cart_is_empty: "Корзина пуста",
    enter_promocode: "Ввести промокод",
    use_bonuses: "Списать бонусы: ",
    submit: "Отправить",
    delete_promocode: "Удалить промокод",
    confirm_order: "Оформить заказ",
    bot_is_disabled:
      "Бот работает только для предварительных заказов. Мы сообщим вам, как только сервис станет доступен.",
    delivery_is_unavailable:
      "Доставка будет доступна завтра с 09:00 утра (время Бангкока). Вы можете создать заказ, но мы доставим его только завтра утром.",
  },
};

const locale = ref();
export const { t } = useI18n();

export function useI18n() {
  function initI18n(code) {
    setLocale(code);
  }

  async function setLocale(code) {
    if (locale.value !== code) {
      locale.value = locales.find((l) => l.code === code);
    }
  }

  function t(message, parameter = null) {
    let value = message
      .split(".")
      .reduce((value, part) => value[part], messages[locale.value.code]);
    if (parameter) {
      value = value.replace("{0}", parameter);
    }
    return value;
  }

  return {
    t,
    locale,
    locales,
    initI18n,
    setLocale,
  };
}
