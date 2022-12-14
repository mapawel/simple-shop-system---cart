import { v4 as uuid4 } from 'uuid';
import { IshopSystemOffer } from './services/ShopSystemOffer.interface';
import { IshopSystemCoupons } from './services/ShopSystemCoupons.interface';
import { Basket } from '../Basket/Basket.class.js';
import { Product } from '../Product/Product.class.js';
import { ShopSystemOffer } from './services/ShopSystemOffer.class';
import { ShopSystemCoupons } from './services/ShopSystemCoupons.class';
import { ProductWhQty } from '../Product/ProductWhQty';
import { BasketWhDate } from '../Basket/BasketWhDate.type';

export class ShopSystem {
  readonly uuid: string;
  private shopOffer: ShopSystemOffer;
  private shopCoupons: ShopSystemCoupons;

  constructor(shopOffer: ShopSystemOffer, shopCoupons: ShopSystemCoupons) {
    this.uuid = uuid4();
    this.shopOffer = shopOffer;
    this.shopCoupons = shopCoupons;
  }

  get shopProducts(): Map<string, ProductWhQty> {
    return this.shopOffer.shopProducts;
  }

  get closedBaskets(): Map<string, BasketWhDate> {
    return this.shopOffer.closedBaskets;
  }

  get showShopCoupons(): Set<string> {
    return this.shopCoupons.validCoupons;
  }

  addOrUpdateShopProduct(product: Product, qty: number): boolean {
    return this.shopOffer.addOrUpdateShopProduct(product, qty);
  }
  // gdy miałem tu implementację podawania w argumentach obiektów to mogłem podawać całą tablicę obiekt-produkt + qty. ... ?

  removeShopProduct(product: Product): boolean {
    return this.shopOffer.removeShopProduct(product);
  }

  checkout(basket: Basket): number {
    return this.shopOffer.checkout(basket);
  }

  addShopCoupon(coupon: string): boolean {
    return this.shopCoupons.addShopCoupon(coupon);
  }
  removeShopCoupon(coupon: string): boolean {
    return this.shopCoupons.removeShopCoupon(coupon);
  }
  useShopCoupon(coupon: string): boolean {
    return this.shopCoupons.useShopCoupon(coupon);
  }
}
