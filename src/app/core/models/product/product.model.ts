import {Category} from '../category/category.model';
import {Constants} from '../../../config';
import {Tag} from './tag.model';
import {KeyFeature} from './key-features.model';
import {ProductImage} from './product-image.model';
import {Specification} from './specification.model';

export class Product {
  constructor(obj: any) {
    this._category = obj.category ? obj.category : '';
    this._code = obj.code ? obj.code : '';
    this._createdDate =  obj.createdDate ? obj.createdDate : '';
    this._description = obj.description ? obj.description : '';
    this._id = obj.id ? obj.id : '';
    this._imageUrl = obj.imageUrl ? obj.imageUrl : '';
    this._name =  obj.name ? obj.name : '';
    this._status =  obj.status ? obj.status : '';
    this._discount = obj.discount;
    this._hasDiscount = obj.hasDiscount;
    this._hasQty = obj.hasQty;
    this._hasVat = obj.hasVat;
    this._images =  obj.images ? obj.images : '';
    this._isEnabled = obj.isEnabled;
    this._isFeaturedProduct = obj.isFeaturedProduct;
    this._keyFeatures = obj.keyFeatures ? obj.keyFeatures : [];
    this._price = obj.price;
    this._qty = obj.qty ? obj.qty : '';
    this._slug = obj.slug ? obj.slug : '';
    this._specifications = obj.specifications ? obj.specifications : [];
    this._tags = obj.tags ? obj.tags : '';
    this._updatedDate = obj.updatedDate ? obj.updatedDate : '';
    this._vat = obj.vat;
  }

  get category(): Category {
    return this._category;
  }

  set category(value: Category) {
    this._category = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  set createdDate(value: Date) {
    this._createdDate = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get imageUrl(): string {
    return  this._imageUrl ? Constants.serviceUrl + this._imageUrl : null;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }

  get discount(): number {
    return this._discount;
  }

  set discount(value: number) {
    this._discount = value;
  }

  get hasDiscount(): number {
    return this._hasDiscount;
  }

  set hasDiscount(value: number) {
    this._hasDiscount = value;
  }

  get hasQty(): number {
    return this._hasQty;
  }

  set hasQty(value: number) {
    this._hasQty = value;
  }

  get hasVat(): number {
    return this._hasVat;
  }

  set hasVat(value: number) {
    this._hasVat = value;
  }

  get images(): ProductImage[] {
    return this._images;
  }

  set images(value: ProductImage[]) {
    this._images = value;
  }

  get isEnabled(): number {
    return this._isEnabled;
  }

  set isEnabled(value: number) {
    this._isEnabled = value;
  }

  get isFeaturedProduct(): number {
    return this._isFeaturedProduct;
  }

  set isFeaturedProduct(value: number) {
    this._isFeaturedProduct = value;
  }

  get keyFeatures(): KeyFeature[] {
    return this._keyFeatures;
  }

  set keyFeatures(value: KeyFeature[]) {
    this._keyFeatures = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get qty(): number {
    return this._qty;
  }

  set qty(value: number) {
    this._qty = value;
  }

  get slug(): string {
    return this._slug;
  }

  set slug(value: string) {
    this._slug = value;
  }

  get specifications(): Specification[] {
    return this._specifications;
  }

  set specifications(value: Specification[]) {
    this._specifications = value;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  set tags(value: Tag[]) {
    this._tags = value;
  }

  get updatedDate(): Date {
    return this._updatedDate;
  }

  set updatedDate(value: Date) {
    this._updatedDate = value;
  }

  get vat(): number {
    return this._vat;
  }

  set vat(value: number) {
    this._vat = value;
  }

    private _category:          Category;
    private _code:              string;
    private _createdDate:       Date;
    private _description:       string;
    private _id:                number;
    private _imageUrl:          string;
    private _name:              string;
    private _status:            boolean;
    private _discount:          number;
    private _hasDiscount:       number;
    private _hasQty:            number;
    private _hasVat:            number;
    private _images:            ProductImage[];
    private _isEnabled:         number;
    private _isFeaturedProduct: number;
    private _keyFeatures:       KeyFeature[];
    private _price:             number;
    private _qty:               number;
    private _slug:              string;
    private _specifications:    Specification[];
    private _tags:              Tag[];
    private _updatedDate:       Date;
    private _vat:               number;
}
