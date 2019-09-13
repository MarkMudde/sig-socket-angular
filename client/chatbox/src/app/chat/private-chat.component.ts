import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IPrivateChatHistoryMessage } from './../model/chat.model';
import { HandlerService } from '../services/handler.service';

@Component({
    selector: 'app-private-chat',
    templateUrl: './private-chat.component.html'
})
export class PrivateChatComponent {
  privateChatHistory: IPrivateChatHistoryMessage[] =[];

    constructor(
        private handlerService: HandlerService,
        public activeModal: NgbActiveModal
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }
  }

@Component({
    selector: 'app-private-chat-popup',
    template: ''
})
export class PrivateChatPopUpComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ activityOrProduct }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrivateChatComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.activityOrProduct = activityOrProduct;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
