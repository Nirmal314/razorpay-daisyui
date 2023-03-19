import crypto from "crypto";

const verifypayment = async (req, res) => {
  const access = req.query.access;
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", razorpay_signature);
  console.log("sig generated ", expectedSignature);

  const isSecure = razorpay_signature === expectedSignature;

  if (isSecure) {
    async function setIsPaid() {
      const db = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/auth/current/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
          body: JSON.stringify({
            profile: {
              is_paid: true,
            },
          }),
        }
      );
      console.log(await db.json());
    }

    // setIsPaid();

    res.redirect(
      `${process.env.NEXT_PUBLIC_URL}/paymentsuccess?ref=${razorpay_payment_id}`
    );
    res.status(200).json({
      success: true,
      info: {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      },
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

export default verifypayment;
