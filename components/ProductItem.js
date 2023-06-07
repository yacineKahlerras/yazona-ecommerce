/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/outline";

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card relative">
      {/* <p className="mb-2 absolute top-2 left-2 bg-my-blue text-white p-[.25em] px-[.75em] rounded-md text-xs">
        {product.brand}
      </p> */}
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-64 w-full"
          />
        </a>
      </Link>
      <div className="flex items-center justify-between p-5">
        <div>
          <Link href={`/product/${product.slug}`}>
            <a>
              <h2 className="text-lg">{product.name}</h2>
            </a>
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
