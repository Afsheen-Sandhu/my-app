"use client";

import React from "react";
import { Product } from "@/types/index";
import { Modal } from "@/components/ui/modal/Modal";
import { ProductDetailsModal } from "@/components/ui/ProductDetailsModal";
import { ProductForm } from "@/components/ui/product/ProductForm";

type ProductModalMode = "view" | "add" | "edit";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  mode?: ProductModalMode;
  onSubmit?: (productData: Omit<Product, "id" | "rating">) => void;
  isLoading?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  mode = "view",
  onSubmit,
  isLoading = false,
}) => {
  if (mode === "view" && product) {
    return (
      <ProductDetailsModal
        product={product}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  }

  if ((mode === "add" || mode === "edit") && onSubmit) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={mode === "add" ? "Add New Product" : "Edit Product"}
        maxWidth="2xl"
      >
        <ProductForm
          product={mode === "edit" ? product : null}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </Modal>
    );
  }

  return null;
};

