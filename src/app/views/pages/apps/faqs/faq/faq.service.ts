import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Faq, Category } from './models/faq.model'

@Injectable({
  providedIn: 'root'
})
export class FaqService implements Resolve<any> {

    faqs: Faq[];
    categories: Category[];
    activeCategory: any;

    onFaqsChanged: BehaviorSubject<Faq[]>;
    onCategoriesChanged: BehaviorSubject<Category[]>;
    onActiveCategoryChanged: BehaviorSubject<any>;

    constructor(
        private _http: HttpClient,
    ) {
        this.onFaqsChanged = new BehaviorSubject(null);
        this.onCategoriesChanged = new BehaviorSubject(null);
        this.onActiveCategoryChanged = new BehaviorSubject(null);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFaqs(),
                this.getCategories()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCategories(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {
            this._http.get<Category[]>('api/categories')
                .subscribe((data) => {
                    this.categories = data;
                    this.onCategoriesChanged.next(data);
                    resolve(this.categories);
                }, reject);
        });
    }

    getFaqs(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {
            this._http.get<Faq[]>('api/faq')
                .subscribe((data) => {
                    this.faqs = data;
                    this.onFaqsChanged.next(data);
                    resolve(this.faqs);
                }, reject);
        });
    }

    getFaqsByCategory(categoryId) //Observable<Faq[]> 
    {
        return new Promise((resolve, reject) => {
            this._http.get<Faq[]>('api/faq?category=' + categoryId)
                .subscribe((data) => {
                    this.faqs = data;
                    this.onFaqsChanged.next(data);
                    let activeCategory = this.getCategoryById(categoryId);
                    
                    this.activeCategory = activeCategory;
                    this.onActiveCategoryChanged.next(activeCategory);
                    resolve();
                }, reject);    
        });    
    }

    addFaq(faq)
    {
        this._http.post('api/faq', faq)
            .subscribe((response) => {
                this.activeCategory ? this.getFaqsByCategory(this.activeCategory.id) : this.getFaqs();
            });
    }

	getCategoryById(id)
	{
		return this.categories.find(category => {
			return category.id === id;
		});
	}

}
