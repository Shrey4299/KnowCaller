import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { SiAmazonpay, SiPhonepe, SiPaytm, SiMobx } from "react-icons/si";
import Cookies from "js-cookie";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardValidity, setCardValidity] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [walletId, setWalletId] = useState("");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="absolute left-2/4 top-2/4 flex min-h-screen w-full -translate-x-2/4 -translate-y-2/4 items-center   justify-center   py-16">
        <div className="container mx-auto p-4">
          <div className="flex flex-col gap-8 sm:flex-row">
            {/* UPI / QR Card */}
            <div className="flex-1 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">
                UPI, Netbanking, And Cards
              </h2>
              <div className="grid-row-3 grid gap-4 text-sm text-gray-700">
                <h1
                  style={{
                    backgroundColor:
                      paymentMethod === "Card" ? "#f7fafc" : "transparent",
                    borderLeft:
                      paymentMethod === "Card"
                        ? "4px solid #f56565"
                        : "4px solid transparent",
                    color: paymentMethod === "Card" ? "black" : "inherit",
                  }}
                  className="rounded-md p-5 hover:border-l-4 hover:bg-white hover:text-black"
                  onClick={() => handlePaymentMethodChange("Card")}
                >
                  Credit/Debit Card
                </h1>
                <h1
                  style={{
                    backgroundColor:
                      paymentMethod === "UPI" ? "#f7fafc" : "transparent",
                    borderLeft:
                      paymentMethod === "UPI"
                        ? "4px solid #f56565"
                        : "4px solid transparent",
                    color: paymentMethod === "UPI" ? "black" : "inherit",
                  }}
                  className="rounded-md p-5 hover:border-l-4 hover:bg-white hover:text-black"
                  onClick={() => handlePaymentMethodChange("UPI")}
                >
                  UPI
                </h1>
                <h1
                  style={{
                    backgroundColor:
                      paymentMethod === "Wallet" ? "#f7fafc" : "transparent",
                    borderLeft:
                      paymentMethod === "Wallet"
                        ? "4px solid #f56565"
                        : "4px solid transparent",
                    color: paymentMethod === "Wallet" ? "black" : "inherit",
                  }}
                  className="rounded-md p-5 hover:border-l-4 hover:bg-white hover:text-black"
                  onClick={() => handlePaymentMethodChange("Wallet")}
                >
                  Wallet
                </h1>
              </div>
            </div>

            {/* Payment Details */}
            <div className="flex-2 rounded-lg bg-white p-6 shadow-lg">
              {paymentMethod === "Card" && (
                <>
                  <h2 className="mb-4 text-xl font-bold">Card Details</h2>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full rounded-md border border-gray-700 p-3 focus:outline-none focus:ring focus:ring-blue-200"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Valid Through (MM/YY)"
                      className="rounded-md border border-gray-700 p-3 focus:outline-none focus:ring focus:ring-blue-200"
                      value={cardValidity}
                      onChange={(e) => setCardValidity(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="rounded-md border border-gray-700 p-3 focus:outline-none focus:ring focus:ring-blue-200"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <label htmlFor="saveCard" className="text-sm text-gray-700">
                      Save this card for faster transactions
                    </label>
                  </div>
                </>
              )}
              {paymentMethod === "UPI" && (
                <>
                  <h2 className="mb-4 text-xl font-bold">UPI Details</h2>
                  <div className="mb-4 mt-10 grid w-full grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="UPI ID"
                      className="w- rounded-md border border-gray-700 p-3 focus:outline-none focus:ring focus:ring-blue-200"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <h1 className="text-sm text-gray-400">
                    A payment request will be sent this UPI ID{" "}
                  </h1>
                  <button className="mt-10 rounded-md bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600">
                    Verify
                  </button>
                </>
              )}
              {paymentMethod === "Wallet" && (
                <>
                  <h2 className="mb-4 text-xl font-bold">Wallet Details</h2>
                  <div className="mb-4 flex gap-4">
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: "#f7fafc",
                        border: "1px solid #cbd5e0",
                      }}
                      className="cursor-pointer rounded-md p-3 hover:shadow-md"
                      onClick={() => setWalletId("PhonePe")}
                    >
                      <SiPhonepe className="mx-auto mb-2 text-3xl text-green-500" />
                      <p className="text-center">PhonePe</p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: "#f7fafc",
                        border: "1px solid #cbd5e0",
                      }}
                      className="cursor-pointer rounded-md p-3 hover:shadow-md"
                      onClick={() => setWalletId("Paytm")}
                    >
                      <SiPaytm className="mx-auto mb-2 text-3xl text-blue-500" />
                      <p className="text-center">Paytm</p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: "#f7fafc",
                        border: "1px solid #cbd5e0",
                      }}
                      className="cursor-pointer rounded-md p-3 hover:shadow-md"
                      onClick={() => setWalletId("Amazon Pay")}
                    >
                      <SiAmazonpay className="mx-auto mb-2 text-3xl text-yellow-500" />
                      <p className="text-center">Amazon Pay</p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: "#f7fafc",
                        border: "1px solid #cbd5e0",
                      }}
                      className="cursor-pointer rounded-md p-3 hover:shadow-md"
                      onClick={() => setWalletId("MobiKwik")}
                    >
                      <SiMobx className="mx-auto mb-2 text-3xl text-purple-500" />
                      <p className="text-center">MobiKwik</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Payment Summary */}
            <div className="flex-1 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              {/* Order Summary content */}
              <div className="flex items-center justify-between border-b border-gray-200 py-2">
                <span className="text-gray-600">Basket Value</span>
                <span className="text-lg font-semibold">₹150.6</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-2">
                <span className="text-gray-600">Total Amount Payable</span>
                <span className="text-lg font-semibold">₹150.06</span>
              </div>
              <div className="flex items-center justify-between bg-green-50 p-2 py-2">
                <span className="text-green-700">Total Savings</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-green-700">
                    ₹98.08
                  </span>
                  <AiFillCaretDown className="text-green-700" />
                </div>
              </div>

              {/* Pay Now */}
              <div className="mt-8 text-center">
                <Link to="/home">
                  <button
                    className="rounded-md bg-green-500 px-6 py-3 font-semibold text-white transition-all hover:bg-green-600"
                    onClick={() => {
                      Cookies.set("premium", "true", { expires: 365 }); // Set the cookie with name "premium" and value "true" that expires after 365 days
                    }}
                  >
                    Pay Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
