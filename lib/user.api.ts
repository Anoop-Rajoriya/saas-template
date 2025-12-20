import api from "./axios";

type Plan = "pro" | "enterprise";

export default {
  async upgradePlan(plan: Plan) {},
  async cancelPlan() {},
};
