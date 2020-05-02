//
//  PlayerViewController.swift
//  nasvideo
//
//  Created by Huang Yaoming on 2020/5/2.
//  Copyright © 2020 ischool. All rights reserved.
//

import UIKit
import WebKit

class PlayerViewController: UIViewController {
                         
    @IBOutlet weak var msg: UILabel!
    
    @IBOutlet weak var movieScreen: UIView!
        
    var mediaPlayer: VLCMediaPlayer = VLCMediaPlayer()

//    let videoUrl = "http://speedfusion.synology.me:3000/media/tvmv/[LG%20UHD%204K%2060FPS]%20T-ARA%20(%ED%8B%B0%EC%95%84%EB%9D%BC)%20-%20Number%20Nine%20(%EB%84%98%EB%B2%84%EB%82%98%EC%9D%B8)%20(high).mp4?src=video"
    
    let videoUrl = "http://speedfusion.synology.me:3000/media/tvmv/123/ace.mp4?src=video"
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func play(_ sender: Any) {
        
        let url = URL(string: self.videoUrl)
        let media = VLCMedia(url: url!)

        // Set media options
        // https://wiki.videolan.org/VLC_command-line_help
        media.addOptions([
            "network-caching": 0
            ])

        media.delegate = self
        mediaPlayer.media = media
        mediaPlayer.delegate = self
        mediaPlayer.drawable = self.movieScreen
//        mediaPlayer.fastForward(atRate: 1) // 播放速度。
        mediaPlayer.play()
    }

    @IBAction func backward(_ sender: Any) {
        self.mediaPlayer.shortJumpBackward()
    }
    
    @IBAction func forward(_ sender: Any) {
        self.mediaPlayer.shortJumpForward()
    }
    
    @IBAction func swipeGo(_ sender: Any) {
        mediaPlayer.mediumJumpForward()
    }
    @IBAction func tapGo(_ sender: Any) {
        mediaPlayer.shortJumpBackward()
    }
}

extension PlayerViewController: VLCMediaDelegate {
    func mediaDidFinishParsing(_ aMedia: VLCMedia) {
        print(aMedia)
    }

}

extension PlayerViewController: VLCMediaPlayerDelegate {
    func mediaPlayerStateChanged(_ aNotification: Notification!) {
        print(self.mediaPlayer.state.rawValue)
        if self.mediaPlayer.state == .error {
            print("Error")
        }
    }
    
    func mediaPlayerTimeChanged(_ aNotification: Notification!) {
        self.msg.text = "\(String(describing: self.mediaPlayer.time))"
    }
}
