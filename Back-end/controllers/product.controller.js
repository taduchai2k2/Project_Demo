const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
  try {
    // simple filter/pagination
    const { page = 1, limit = 20, q, category } = req.query;
    const query = {};
    if (q) query.name = { $regex: q, $options: 'i' };
    if (category) query.category = category;

    const products = await Product.find(query)
      .skip((page-1)*limit)
      .limit(Number(limit));
    const total = await Product.countDocuments(query);
    res.json({ data: products, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // nếu upload file, req.file có filename
    let img = req.body.image || '';
    if (req.file) img = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const { name, description, price, category, stock, brand, images } = req.body;
    const product = new Product({
      name, description, price, category, stock: stock || 0, brand, image: img, images: images ? JSON.parse(images) : []
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    if (req.file) p.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const fields = ['name','description','price','category','stock','brand','discount','tags'];
    fields.forEach(f => { if (req.body[f] !== undefined) p[f] = req.body[f]; });
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa sản phẩm' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
