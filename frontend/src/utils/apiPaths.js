export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/users/login",
    REGISTER: "/api/users/register",
  },
  ORDER: {
    CREATE_ORDER: "/api/orders",
    USER_ORDERS: "/api/orders/user",
    GET_ORDER_BY_ID: (id) => `/api/orders/${id}`,
    GET_ALL_ORDERS: "/api/orders",
    UPDATE_ORDER_STATUS: (id) => `/api/orders/${id}/status`,
  },
  PRODUCTS: {
    GET_ALL: "/api/products",
    CREATE: "/api/products",
    UPDATE: (id) => `/api/products/${id}`,
    DELETE: (id) => `/api/products/${id}`,
  },
  USERS: {
    GET_ALL: "/api/users",
    DELETE: (id) => `/api/users/${id}`,
    UPDATE: (id) => `/api/users/${id}`,
  },
};
