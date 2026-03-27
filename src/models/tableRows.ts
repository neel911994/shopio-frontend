import type { OrderStatus } from "@/services/orders.service";

export type StockLabel = "In Stock" | "Low Stock" | "Out of Stock";

export type ProductRow = {
  id:           string;
  name:         string;
  categoryName: string;
  price:        number;
  stock:        number;
  stockLabel:   StockLabel;
  isActive:     boolean;
};

export type OrderRow = {
  orderId:      string;
  shortId:      string;
  customerName: string;
  status:       OrderStatus;
  totalAmount:  number;
  itemCount:    number;
  createdAt:    string;
};

export type CustomerRow = {
  id:          string;
  name:        string;
  email:       string;
  phone:       string;
  totalOrders: number;
  joined:      string;
};

export type CategoryRow = {
  id:           string;
  name:         string;
  productCount: number;
};
