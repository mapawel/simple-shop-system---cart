import { Product } from './Product/Product.class.js';
import { Basket } from './Basket/Basket.class.js';
import { productCategories } from './Product/productCategories.enum.js';
import { ShopSystem } from './ShopSystem/ShopSystem.class.js';
import { ShopSystemOffer } from './ShopSystem/services/ShopSystemOffer.class.js';
import { ShopSystemCoupons } from './ShopSystem/services/ShopSystemCoupons.class.js';

// // CREATE EXAMPLE PRODUCTS INSTANCES
const p1 = new Product({
  name: 'Nice Jacket',
  category: productCategories.JACKET,
  basePrice: 350.333333333,
});

const p2 = new Product({
  name: 'Nice Trousers',
  category: productCategories.TROUSERS,
  basePrice: 250,
  discount: 0.2,
});

const p3 = new Product({
  name: 'Nice Shoes',
  category: productCategories.SHOES,
  basePrice: 200,
  discount: 0.2,
});

const p4 = new Product({
  name: 'Nice Belt',
  category: productCategories.BELT,
  basePrice: 100,
});

const p5 = new Product({
  name: 'Nice Socks',
  category: productCategories.SOCKS,
  basePrice: 30,
});

// ADD SOME PRODUCTS TO BASKET
const b1 = new Basket({ discount: 0.5 });

b1.addProduct(p1);
b1.addProduct(p2);
b1.addProduct(p2);
b1.addProduct(p2);

console.log('basket after adding products----> ', b1.basketList);

// REMOVE A PRODUCT FROM BASKET
b1.removeProduct(p2);

console.log('basket after removing product----> ', b1.basketList);

// INITIALIZE SHOP INSTANCE WITH NECESSARY SERVICES
const shopSystemOffer = new ShopSystemOffer();
const shopSystemCoupons = new ShopSystemCoupons();
const shop = new ShopSystem(shopSystemOffer, shopSystemCoupons);

// // ADD PRODUCTS TO STOCK TO SHOP INSTANCE AND STOCK MANIPULATION
[
  {
    product: p1,
    qty: 11,
  },
  {
    product: p2,
    qty: 22,
  },
  {
    product: p3,
    qty: 33,
  },
  {
    product: p4,
    qty: 44,
  },
  {
    product: p5,
    qty: 55,
  },
].forEach(({ product, qty }) => shop.addOrUpdateShopProduct(product, qty));

console.log('SHOP PRODUCTS AFTER ADDING PRODUCTS----> ', shop.shopProducts);

// REMOVE SOME PRODUCTS FROM SHOP OR CHANGE THE QTY
shop.removeShopProduct(p5);
shop.removeShopProduct(p1);

shop.addOrUpdateShopProduct(p1, 1);
shop.addOrUpdateShopProduct(p3, 333);

console.log('SHOP PRODUCTS AFTER ADDING PRODUCTS----> ', shop.shopProducts);

// ADD COUPONS TO SHOP INSTANCE AND COUPONS MANIPULATION
shop.addShopCoupon('QWE');
shop.addShopCoupon('ASD');
shop.addShopCoupon('ZXC');
shop.addShopCoupon('ASD');

console.log('SHOP UNUSED COUPONS ----> ', shop.showShopCoupons);

// REMOVE SOME COUPONS
shop.removeShopCoupon('ASD');
shop.removeShopCoupon('QWE');

console.log('SHOP UNUSED COUPONS AFTER REMOVING----> ', shop.showShopCoupons);

b1.getFinalBasketValue();

// CHECKOUT WITH BASKET EARLIER CREATED
console.log('shop system checkout response: ', shop.checkout(b1));

// CHECK STOP STATUS
console.log('SHOP PRODUCTS AFTER CHECKOUT ----> ', shop.shopProducts);
console.log('SHOP CLOSED BASKETS ----> ', shop.closedBaskets);
