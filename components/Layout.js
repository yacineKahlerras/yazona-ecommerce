import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import DropdownLink from "./DropdownLink";
import { useRouter } from "next/router";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import Image from "next/image";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  const [query, setQuery] = useState("");

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - Yazona" : "Yazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-6 pt-5 mb-8 justify-between">
            {/* logo */}
            <Link
              href="/"
              className="md:text-xl lg:text-2xl font-bold uppercase"
            >
              yazona
            </Link>

            {/* search form */}
            <form
              onSubmit={submitHandler}
              className="mx-auto  hidden justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-my-blue p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5 text-white"></SearchIcon>
              </button>
            </form>

            {/* side menu */}
            <div className="flex gap-3 items-center">
              <Link href="/cart" className="p-2 flex items-center relative">
                <ShoppingCartIcon className="w-6 md:w-8"></ShoppingCartIcon>
                {cartItemsCount > 0 ? (
                  <span
                    className={`aspect-square w-4 md:w-5 rounded-full bg-red-600 text-[.55rem] md:text-[.6rem] 
                      font-bold text-white grid place-items-center absolute top-[-.1rem] right-[-.1rem]
                      md:top-[-.2rem] md:right-[-.2rem]`}
                  >
                    {cartItemsCount}
                  </span>
                ) : (
                  ""
                )}
              </Link>

              {/* profile menu */}
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600 flex items-center max-w-[2rem] md:max-w-[2.6rem]">
                    <Image
                      src={session.user.image}
                      width="50"
                      height="50"
                      objectFit="contain"
                      className="rounded-full"
                      alt="user profile"
                    />
                  </Menu.Button>
                  <Menu.Items className="absolute z-10 right-0 top-14 w-56 origin-top-right bg-white shadow-lg rounded-lg overflow-hidden">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/api/auth/signin" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}
