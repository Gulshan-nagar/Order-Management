export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://order-management-4pdd.onrender.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/users/login`,
    REGISTER: `${BASE_URL}/api/users/register`,
  },
  ORDER: {
    CREATE_ORDER: `${BASE_URL}/api/orders`,
    USER_ORDERS: `${BASE_URL}/api/orders/user`,
    GET_ORDER_BY_ID: (id) => `${BASE_URL}/api/orders/${id}`,
    GET_ALL_ORDERS: `${BASE_URL}/api/orders`,
    UPDATE_ORDER_STATUS: (id) => `${BASE_URL}/api/orders/${id}/status`,
  },
  PRODUCTS: {
    GET_ALL: `${BASE_URL}/api/products`,
    CREATE: `${BASE_URL}/api/products`,
    UPDATE: (id) => `${BASE_URL}/api/products/${id}`,
    DELETE: (id) => `${BASE_URL}/api/products/${id}`,
  },
  USERS: {
    GET_ALL: `${BASE_URL}/api/users`,
    DELETE: (id) => `${BASE_URL}/api/users/${id}`,
    UPDATE: (id) => `${BASE_URL}/api/users/${id}`,
  },
};
