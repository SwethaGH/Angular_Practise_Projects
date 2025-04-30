import { Component, OnInit } from '@angular/core';
import { VideoDetailComponent } from '../video-detail/video-detail.component';
import { VideoListComponent } from '../video-list/video-list.component';
import { Video } from '../video';
import { CommonModule } from '@angular/common';
import { VideoService } from '../video.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-center',
  standalone: true,
  imports: [VideoDetailComponent, VideoListComponent, CommonModule, FormsModule],
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers:[VideoService]
})
export class VideoCenterComponent implements OnInit {
  selectedVideo?: Video;
  videos!: Array<Video>;
  public hidenewVideo: boolean = true;
  // testing
  // videos: Video[] = [
  //   {
  //     _id: '1',
  //     title: 'Sample Video 1',
  //     url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //     description: 'Description for video 1'
  //   },
  //   {
  //     _id: '2',
  //     title: 'Sample Video 2',
  //     url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //     description: 'Description for video 2'
  //   },
  //   {
  //     _id: '3',
  //     title: 'Sample Video 3',
  //     url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //     description: 'Description for video 3'
  //   },
  //   {
  //     _id: '4',
  //     title: 'Sample Video 4',
  //     url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //     description: 'Description for video 4'
  //   }
  // ];

  constructor(private _videoService : VideoService) {}

  ngOnInit() {
    this._videoService.getVideos().subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video: Video) {
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log('Selected video:', this.selectedVideo); // This is working
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video)
    .subscribe(resNewVideo => {
      this.videos.push(resNewVideo);
      this.hidenewVideo = true;
      this.selectedVideo = resNewVideo;
  });
  }
  newVideo(){
    this.hidenewVideo = false;
  }
  onUpdateVideoEvent(video: any){
    this._videoService.updateVideo(video)
    .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = undefined;
  }
  onDeleteVideoEvent(video: any){
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
    .subscribe(resDeletedVideo =>{
      for(let i=0; i< videoArray.length; i++)
        {
        if(videoArray[i]._id == video._id){
          videoArray.splice(i,1);
        }
      }
    });
    this.selectedVideo = undefined;
  };
}