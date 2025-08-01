import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  LoadedImage,
} from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-image-editor',
  templateUrl: './profile-image-editor.component.html',
  imports: [CommonModule, ImageCropperComponent],
})
export class ProfileImageEditorComponent implements OnInit, OnDestroy {
  @Output() closeEditor: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription[] = [];

  user: User;

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  cropImgPreview: any = '';

  constructor(
    private apiService: ApiService,
    private domSanitizer: DomSanitizer,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.userService.getCurrentUser().subscribe((user) => {
        this.user = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  saveImage() {
    const croppedImg: File = this.dataURLtoFile(this.croppedImage, 'hello.png');
    this.subscriptions.push(
      this.apiService.uploadImage(croppedImg).subscribe((res) => {
        if (res.status === "OK") {
          this.parentCloseEditor();
          this.toastr.success("Avatar geändert")
        } else {
          this.toastr.error("Ein Fehler ist aufgetreten")
        }
      })
    );
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event)
    this.croppedImage = event.base64
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  dataURLtoFile(dataurl, filename) {
    console.log(dataurl)
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  parentCloseEditor() {
    this.closeEditor.emit();
  }
}
