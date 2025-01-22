import ethers from "ethers";

export class Controller {
  addData = (req, res) => {
    try {
      const { seller, name, category, price } = req.body;

      if (!seller || !name || !category || !price) {
        throw Error("invalid data");
      }
      // DB에 저장만 하면 됨

      res.status(200).json({
        isSuccess: true,
        message: "success",
      });
    } catch (error) {
      res.state(400).json({
        isSuccess: false,
        message: error,
      });
    }
  };

  getAllData = () => {};
}
