import { VUE_WP_INSTANCE } from "@/api/helpers.js";

const instance = VUE_WP_INSTANCE().state.productsTermsSizes;
export default {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: instance.params,
    },
    requests: instance.requests,

    items: instance.items,
  }),
};
