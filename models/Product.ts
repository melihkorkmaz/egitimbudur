import { ShopifyProductDTO, ShopifyProductType, ShopifyProductVariantDTO } from "../types/shopify";
import bolSchemas from "../schemas/bolSchemas.json";

interface IProduct {
  productType: ShopifyProductType;
  shopifyProduct: ShopifyProductDTO;
  shopifyVariant: ShopifyProductVariantDTO;
  productSpecs: {
    [spec:string]: string | string[]
  },
  ean: number;
  sku: string;
  getSchema: () => any;
}

export class Product implements IProduct{
  productType: ShopifyProductType;
  productSpecs: {
    [spec: string]: string | string[];
   } = {};
  shopifyProduct: ShopifyProductDTO;
  shopifyVariant: ShopifyProductVariantDTO;
  ean: number;
  sku: string;

  constructor(shopifyProduct: ShopifyProductDTO, shopifyVariant: ShopifyProductVariantDTO) {
    this.productType = shopifyProduct.product_type;
    this.shopifyProduct = shopifyProduct;
    this.shopifyVariant = shopifyVariant
    this.ean = shopifyVariant.barcode;
    this.sku = shopifyVariant.sku;
    this.build();
  }

  private build() {
    const schema = this.getSchema();

    for (const attr of schema.attributes) {
      if (attr.isVariantAttr) {
        this.productSpecs[attr.attribute] = this.shopifyVariant[attr.attribute];

        if(attr.attributeUnitId) {
          this.productSpecs[`${attr.attribute}_unit`] = this.shopifyVariant[attr.attributeUnitId];
        }

      } else if (attr.id === "Name") {
        this.productSpecs[attr.attribute] = this.getTitle();
      } else if (attr.id === "Colour") {
        this.productSpecs[attr.attribute] = this.getColor();
      } else if (attr.attribute === "image") {
        const imageId = this.shopifyVariant.image_id;
        const image  = this.shopifyProduct.images.find(i => i.id === imageId);
        this.productSpecs[attr.attribute] = image.src;
      } else if (attr.attribute === "images") {
        this.productSpecs[attr.attribute] = this.getImages();
      }
      else {
        const productValue = this.shopifyProduct[attr.attribute] || attr.defaultValue;
        const productValueUnit = this.shopifyProduct[`${attr.attribute}_unit`] || attr.defaultUnitId;

        this.productSpecs[attr.attribute] = productValue || "";

        if (productValueUnit) {
          this.productSpecs[`${attr.attribute}_unit`] = productValueUnit;
        }
      }
    }
  }

  private getColor() {
    const colorOption = this.shopifyProduct.options.find(o => o.name.includes("kleur") || o.name.includes("Color"));

    if (!colorOption) {
      return "";
    }

    return this.shopifyVariant[`option${colorOption.position}`];
  }

  getSchema() {
    return bolSchemas.find(s => s.name.toLowerCase() === "hamamdoek");
  }

  private getProductWidth() {
    const schema = this.getSchema();

    const widthAttribute = schema.attributes.find(a => a.attribute === "product_width");
    return widthAttribute.defaultValue;
  }

  private getProductWidthUnit() {
    const schema = this.getSchema();

    const widthAttribute = schema.attributes.find(a => a.attribute === "product_width");
    return widthAttribute.defaultUnitId;
  }

  private getProductLength() {
    const schema = this.getSchema();

    const widthAttribute = schema.attributes.find(a => a.attribute === "product_length");
    return widthAttribute.defaultValue;
  }

  private getProductLengthUnit() {
    const schema = this.getSchema();

    const widthAttribute = schema.attributes.find(a => a.attribute === "product_length");
    return widthAttribute.defaultUnitId;
  }

  private getTitle() {
    switch (this.productType) {
      case ShopifyProductType.Peshtemal:
        return `${this.shopifyProduct.title} - ${this.getColor()} - ${this.getProductWidth()}${this.getProductWidthUnit()} x ${this.getProductLength()}${this.getProductLengthUnit()} - Originele hamamdoek uit Turkije `
      default:
        return this.shopifyProduct.title;
    }
  }

  private getImages(): string[] {
    let addImagesFlag = false;
    const stillImageURL = [];
    for (const image of this.shopifyProduct.images) {
      if (image.id === this.shopifyVariant.image_id) {
        addImagesFlag = true;
        stillImageURL.push(image.src);
      } else if (image.variant_ids.length === 0 && addImagesFlag) {
        stillImageURL.push(image.src);
      } else {
        addImagesFlag = false;
      }
    }

    return stillImageURL;
  }
}
