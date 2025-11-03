// controllers/exportController.js

const zlib = require('zlib');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const sendJson = require('../utils/sendJson');
const productsService = require('../services/productsService'); // ✅ نجيبو البيانات من service الأصلي

// Route principale GET /api/export.gz
async function getExport(req, res) {
  try {
    // 1️⃣ نجلب جميع المنتجات من service (نفس المصدر ديال /api/products)
    const products = await productsService.getAllProducts({}); // نمرّرو object فارغ لأننا ما بغيناش فلترة

    // 2️⃣ نحول المنتجات لـ JSON string
    const jsonData = JSON.stringify(products);

    // 3️⃣ نضغطها باستعمال zlib.gzip
    zlib.gzip(jsonData, (err, compressedData) => {
      if (err) {
        return sendJson(res, 500, { error: 'Erreur de compression' });
      }

      // 4️⃣ نوقّع البيانات بـ HMAC SHA256
      const signature = crypto
        .createHmac('sha256', process.env.SECRET_KEY)
        .update(jsonData)
        .digest('hex');

      // 5️⃣ نرسل الملف للعميل
      res.writeHead(200, {
        'Content-Type': 'application/gzip',
        'Content-Disposition': 'attachment; filename="products.json.gz"',
        'X-Signature': signature
      });

      res.end(compressedData);
    });
  } catch (error) {
    console.error('Erreur export:', error);
    sendJson(res, 500, { error: 'Erreur interne du serveur' });
  }
}

module.exports = { getExport };
