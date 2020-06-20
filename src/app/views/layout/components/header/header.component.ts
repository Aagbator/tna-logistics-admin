import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from 'src/app/core/services/translation-loader.service';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuickSidebarComponent } from '../quick-sidebar/quick-sidebar.component';
import { ComponenRegistryService } from 'src/app/core/services/component-registry.service';
import {UtilityService} from '../../../../core/services/utility.service';
import {User} from '../../../../core/models/user/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

    sideBar: any;
    quickSidebar: any;
    loggedInUser:User

    private _unsubscribeAll: Subject<any>;
    //public loggedInUser:User = (UtilityService.getUserData()) ? UtilityService.getUserData() :


  constructor(
        private modalService: NgbModal,
        private utilityService: UtilityService,
        private _translateService: TranslateService,
        public _translationLoaderService: TranslationLoaderService,
        private _componenRegistryService: ComponenRegistryService,
    ) {
        this._unsubscribeAll = new Subject();
         UtilityService.getUserData();
        // this.loggedInUser = new User(UtilityService.getUserData());
    }


    ngOnInit() {
        UtilityService.userData.subscribe(value => {
            console.log('$$', value);
                this.loggedInUser = new User(value);
        });


        this._componenRegistryService.onRegistryChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(registry => {
                this.sideBar = this._componenRegistryService.getComponent('sidenav');
                this.quickSidebar = this._componenRegistryService.getComponent('quick-sidebar');
            });
    }

    openSearchModal(content) {
        this.modalService.open(content, { size: 'lg' });
    }

    ngAfterViewInit() {}

    toggleSidebar(event): void {
	    event.preventDefault();
	    this.sideBar.sidebarToggleHandler();
    }

    toggleQuickSidebar(event): void {
        event.preventDefault();
        this.quickSidebar.toggleOpen();
    }

    setLanguage(lang): void {
        this._translationLoaderService.setLanguage(lang);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    logOut() {
      this.utilityService.logOutUser();
    }

}
