/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/outline";

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card relative">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow object-cover h-64 w-full"
        />
      </Link>
      <div className="flex items-center justify-between p-5">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-lg">{product.name}</h2>
          </Link>
          <p className="font-semibold text-xl text-my-blue">${product.price}</p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          <ShoppingCartIcon className="w-5 text-white"></ShoppingCartIcon>
        </button>
      </div>
    </div>
  );
}
