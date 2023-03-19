import Head from "next/head";
import React from "react";

function index() {
  async function handleSubscribe() {
    const subscribe = await fetch("/api/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 500 }),
    });
    const res = await subscribe.json();
    console.log(res.order.id);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      amount: res.order.amount,
      currency: "INR",
      name: "Nirmal Ambasana",
      description: "Test Transaction",
      order_id: res.order.id,
      callback_url: `${
        process.env.NEXT_PUBLIC_URL
      }/api/verifypayment?access=${localStorage.getItem("access")}`,
      theme: {
        color: "#0b0b0b",
      },
      overlay: false,
    };

    const rpay = new window.Razorpay(options);
    rpay.open();
  }
  return (
    <div>
      <Head>
        <title>PDFviewer</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <div className="w-full h-screen bg-gray-700 flex flex-col justify-center items-center">
        <button
          className="btn btn-outline rounded-lg"
          onClick={() => handleSubscribe()}
        >
          Click to pay
        </button>
        <div className="mt-4 w-1/4">
          <p className="text-xl text-center text-gray-50">
            When I click on this button, gray backgroud should be there, If I
            remove the plugin <i>plugins: [require("daisyui")],</i> from
            tailwind.config.js, it will give the required result.
          </p>
        </div>
      </div>
    </div>
  );
}

export default index;
