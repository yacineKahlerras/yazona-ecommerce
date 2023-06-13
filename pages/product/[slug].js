import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  const star = <StarIcon className="w-5 text-yellow-400"></StarIcon>;

  const productInfo = [
    ["Category : ", product.category],
    ["Brand : ", product.brand],
    ["Description : ", product.description],
    [product.rating, `(${product.numReviews} reviews)`],
  ];

  return (
    <Layout title={product.name}>
      <div className="max-w-md md:max-w-4xl mx-auto">
        <div className="flex justify-start mb-6">
          <Link
            href="/"
            className="bg-my-blue text-white hover:text-blue-300 p-2 px-3 flex items-center gap-2 rounded-md ease-in-out duration-300"
          >
            <ArrowLeftIcon className="w-4 md:w-5"></ArrowLeftIcon>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 md:gap-3">
          <div className="md:col-span-2 mb-2 md:mb-0">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              className="rounded-md"
            ></Image>
          </div>
          <div className="pl-2 md:pl-0 mb-5 md:mb-0">
            <h1 className="text-xl md:text-3xl font-semibold mb-2 md:mb-5">
              {product.name}
            </h1>
            <ul className="mb-10">
              {productInfo.map((inf, idx) => {
                return (
                  <li key={inf[1]} className="flex gap-2 items-start">
                    <span className="flex items-center whitespace-nowrap font-semibold text-my-blue">
                      {inf[0]} {idx == 3 ? star : ""}
                    </span>
                    {inf[1]}
                  </li>
                );
              })}
            </ul>

            <div>
              <div className="card p-5 max-w-xs mx-auto">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>${product.price}</div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? "In stock" : "Unavailable"}
                  </div>
                </div>
                <button
                  className="primary-button w-full"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
