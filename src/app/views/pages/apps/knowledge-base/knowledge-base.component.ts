import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';

import { KnowledgeBaseService } from './knowledge-base.service';

@Component({
    selector: 'app-knowledge-base',
    templateUrl: './knowledge-base.component.html',
    styleUrls: ['./knowledge-base.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class KnowledgeBaseComponent implements OnInit, OnDestroy {

    @ViewChild("leftSidebar")
    leftSidebar: MatSidenav;

    knowledgeBase: any;
    selectedCategory: any;
    activeArticle: any;

    sidebar_hide_breakpoint: string = 'gt-sm';

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _knowledgeBaseService: KnowledgeBaseService,
        private _observableMedia: MediaObserver,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this._knowledgeBaseService.onKnowledgeBaseChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                this.knowledgeBase = response;
            });

        this._observableMedia.asObservable()
            .subscribe(() => {
                this.setSidebarMode();
            });
    }

    /**
     * Read category
     */
    readCategory(article): void
    {        
        this.selectedCategory = this.knowledgeBase.find(category => {
            return category.articles.indexOf(article) !== -1;
        });
        this.activeArticle = article;
        this.setSidebarMode();
    }

    /**
     * Deselect category: go to main list
     */
    deselectCategory()
    {
        this.selectedCategory = null;
        this.activeArticle = null;
    }

    /**
     * Read article
     */
    readArticle(article): void
    {
        this.activeArticle = article;
    }

    /**
     * Hide or show sidebar
     */
    setSidebarMode(): void
    {
        if(this.leftSidebar) {
            if ( this._observableMedia.isActive( this.sidebar_hide_breakpoint ) ) {
                this.leftSidebar.mode = 'side';
                this.leftSidebar.toggle(true);
            } else {
                this.leftSidebar.mode = 'over';
                this.leftSidebar.toggle(false);
            }
        }
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
