// * Import Standard Repositories
import authRepository from "@/repositories/authRepository";
import categoryRepository from "@/repositories/categoryRepository";

// * Import Custom Repositories
import { customProductRepository } from "@/repositories/custom/index";

export default defineNuxtPlugin((nuxtApp) => {

  const modules = {
    // * Standard Repository
    auth: authRepository,
    category: categoryRepository,

    // * Custom Repository
    customProduct: customProductRepository
  };

  return {
    provide: {
      apiFetcher: modules,
    },
  };
});