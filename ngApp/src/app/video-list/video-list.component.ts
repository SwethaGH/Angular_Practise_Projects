import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../video';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'video-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input() videos: Video[] = [];
  @Output() selectVideo = new EventEmitter<Video>();

  select(video: Video) {
    this.selectVideo.emit(video); // Emit the Video object
  }
}