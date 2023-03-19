import { instance } from "@/utils/instance";

const createorder = async (req, res) => {
  if (req.method === "POST") {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
    };
    try {
      const order = await instance.orders.create(options);
      res.status(200).json({ success: true, order });
    } catch (e) {
      res.status(400).json(e);
    }
  } else {
    res.status(400).json({ message: "only POST methods are allowed" });
  }
};

export default createorder;
