export type BotSettings = {
  is_bot_enabled: boolean;
  days_before_using_bonus: number;
  maximum_bonus_for_order_percent: number;
  maximum_bonus_discount_percent: number;
  bot_disabled_until?: Date;
};
