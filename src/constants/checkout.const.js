export const PAYMENTS_METHOD = [
  {
    value: 1,
    label: "Thanh toán qua thẻ thanh toán, ứng dụng ngân hàng VNPAY",
    url_icon:
      "https://bizweb.dktcdn.net/assets/themes_support/payment_icon_vnpay.png",
  },
  {
    value: 2,
    label: "Thanh toán qua mã QR - VNPAY",
    url_icon:
      "https://bizweb.dktcdn.net/assets/themes_support/vnpayqr-icon.png",
  },
  {
    value: 3,
    label: "Thanh toán khi nhận hàng (COD)",
    url_icon:
      "https://png.pngtree.com/png-clipart/20200224/original/pngtree-pack-cash-icon-cartoon-style-png-image_5208194.jpg",
  },
];

export const SHIPPING_PRICE = [
  {
    value: 0,
    label: {
      name: "Miễn phí vận chuyển cho đơn hàng từ 499K",
      price: "Miễn phí",
    },
  },
  {
    value: 30000,
    label: {
      name: "Phí vận chuyển",
      price: "30.000đ",
    },
  },
];
