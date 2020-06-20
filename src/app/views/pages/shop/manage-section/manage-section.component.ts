import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SectionService} from '../../../../core/services/section/section.service';
import {Section} from '../../../../core/models/section/section.model';
import swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.scss', '../../../../core/custom-table.scss']
})

export class ManageSectionComponent implements OnInit {

  public itemsPerView = 5;
  page: number;
  sections = new Array<Section>();
  section: Section;
  pageSize: number;
  totalRecords: number;
  public sectionModal: NgbModalRef;
  state = {isLoading: false, isLoaded: false};
  isLoadingAction: boolean;
  public isEditingSection: boolean;
  public activeSection: Section;

  public sectionObj = {
    'name': null,
    'slug': null,
    'orderIndex': 1
  };

  @ViewChild(ManageSectionComponent) table: ManageSectionComponent;
  actionId: any;
  isDeletingAction = false;
  public isCreatingSection = false;

  constructor(private sectionService: SectionService, private router: Router, private modalService: NgbModal,
              private toaster: ToastrService, private route: ActivatedRoute) {
    this.totalRecords = 0;
    this.pageSize = 20;
    this.page = 1;
  }

  ngOnInit() {
    const res = this.route.snapshot.data['sections'];
    this.page = res;
    this.sections = res.map(section => new Section(section));
    console.log('this.sections', this.sections);
  }

  setPage(status = false) {
    console.log(status);
    this.state.isLoading = true;
    // this.page = p.page;
    this.sectionService.getSections().subscribe((res: any) => {
      this.state.isLoaded = true;
      this.state.isLoading = false;
      this.page = res.page;
      this.sections = res.map(section => new Section(section));
    });
  }

  gotoSection(id) {
    console.log('id = ', id);
    this.router.navigate(['/section/manage/' + id]);
  }

  deleteSection(section: Section) {
    (swal as any).fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete ' + section.name + ' Section',
      type: 'error',
      confirmButtonColor: '#ff6265',
      cancelButtonColor: '#cccccc',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      showCancelButton: true
    })
      .then((willDelete) => {
          if (willDelete.value) {
            this.actionId = section.id;
            this.isDeletingAction = true;
            this.sectionService.deleteSection(section.id).subscribe(data => {
                this.isDeletingAction = false;
                this.setPage();
                this.toaster.success('Section Deleted Successfully');
                this.actionId = null;
              },
              err => {
                this.isDeletingAction = false;
                this.toaster.error(err.error.message, 'Error');
              });
            // swal.fire('Success');
          }
        this.isDeletingAction = false;
        this.actionId = null;
        console.log(willDelete);
      });
  }

  openSectionModal(content, section: Section) {
    this.isEditingSection = false;
    if (section) {
      console.log(section);
      this.sectionObj.name = section.name;
      this.sectionObj.slug = section.slug;
      this.sectionObj.orderIndex = section.orderIndex;
      this.activeSection = section;
      this.isEditingSection = true;
    }
    else{
      this.sectionObj.name = '';
      this.sectionObj.orderIndex = null;
    }

    this.sectionModal = this.modalService.open(content, { size: 'lg', centered: true  });

    this.sectionModal.result.then(
        result => {
          // console.log(result);
        },
        reason => {

        }
    );
  }

  createSection(): void {
    this.isCreatingSection = true;
    this.sectionService.createSection(this.sectionObj).subscribe((res: any) => {
      this.toaster.success('', 'Created Successfully');
      this.isCreatingSection = false;
      this.sectionObj.name = null;
      this.sectionObj.orderIndex = null;
      this.setPage();
      this.sectionModal.close();
    }, err => {
      console.log(err);
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingSection = false;
    });
  }

  updateSection(): void {
    this.isCreatingSection = true;
    console.log('%%', this.sectionObj);

    this.sectionService.updateSection(this.sectionObj, this.activeSection.id).subscribe((res: any) => {
      this.toaster.success('', 'Updated Successfully');
      this.isCreatingSection = false;
      this.sectionModal.close();
      this.setPage();
    }, err => {
      this.toaster.error(err.error.message, 'Error');
      this.isCreatingSection = false;
    });
  }

}
