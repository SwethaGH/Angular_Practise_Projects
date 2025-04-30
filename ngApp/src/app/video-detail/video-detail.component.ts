import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../video';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  outputs :['updateVideoEvent','deleteVideoEvent']
})
export class VideoDetailComponent implements OnChanges {
  @Input() video: Video = {
    _id: '',
    title: '',
    url: '',
    description: ''
  };

  safeUrl?: SafeResourceUrl;
  public editTitle: boolean = false;
  public updateVideoEvent = new EventEmitter();
  public deleteVideoEvent = new EventEmitter();
  constructor(private sanitizer: DomSanitizer) {}

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;

    if (this.video?.url) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
    }
  }
  updateVideo(){
    this.updateVideoEvent.emit(this.video);
  }
  deleteVideo(){
    this.deleteVideoEvent.emit(this.video);
  }
}
