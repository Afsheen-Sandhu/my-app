"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/index";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (productData: Omit<Product, "id" | "rating">) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const initialFormData = {
  title: "",
  price: 0,
  description: "",
  image: "",
  category: "",
};

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold mb-2 text-white"
          >
            Product Title *
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold mb-2 text-white"
          >
            Category *
          </label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-semibold mb-2 text-white"
          >
            Price *
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-semibold mb-2 text-white"
          >
            Image URL *
          </label>
          <Input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        {formData.image && (
          <div className="flex justify-center pt-2">
            <Image
              src={formData.image}
              alt="Preview"
              width={200}
              height={192}
              className="max-w-xs max-h-48 object-contain rounded-lg border border-base-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-2 text-white"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 text-base-content text-sm font-normal placeholder:text-base-content/40 outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-base-200">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full sm:w-auto bg-secondary text-primary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};
