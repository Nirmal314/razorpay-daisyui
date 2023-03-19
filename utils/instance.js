import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
});
