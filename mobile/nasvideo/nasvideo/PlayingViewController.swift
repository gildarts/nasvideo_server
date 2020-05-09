//
//  PlayingViewController.swift
//  nasvideo
//
//  Created by Huang Yaoming on 2020/5/2.
//  Copyright © 2020 ischool. All rights reserved.
//

import UIKit

class PlayingViewController: UIViewController {

    var videoUrl: String = ""

    let mediaPlayer: VLCMediaPlayer = VLCMediaPlayer()

    @IBOutlet weak var start: UILabel!
    @IBOutlet weak var end: UILabel!
    @IBOutlet weak var playArea: UIView!
    @IBOutlet weak var slider: UISlider!
    @IBOutlet weak var slowslider: UISlider!

    var adjust: VLCTime? = nil
    
    var sliding = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.playVideo(self.videoUrl)
    }

    fileprivate func playVideo(_ urlString: String) {
        let url = URL(string: urlString)
        let media = VLCMedia(url: url!)
        
        // Set media options
        // https://wiki.videolan.org/VLC_command-line_help
        media.addOptions([
            "network-caching": 3000,
        ])
        media.delegate = self
        mediaPlayer.audio.volume = 0
        mediaPlayer.media = media
        mediaPlayer.delegate = self
        mediaPlayer.drawable = self.playArea
        // mediaPlayer.fastForward(atRate: 1) // 播放速度。
        mediaPlayer.play()

    }
    
    @IBAction func stopVideo(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func slideStart(_ sender: Any) {
        sliding = true
        
        if mediaPlayer.isPlaying {
            mediaPlayer.pause()
        }
    }
    
    @IBAction func slideEnd(_ sender: Any) {
        sliding = false
        
        if !mediaPlayer.isPlaying {
            mediaPlayer.play()
        }

    }
    
    @IBAction func forward(_ sender: Any) {
//        mediaPlayer.extraShortJumpForward()
        mediaPlayer.shortJumpForward()
    }
    
    @IBAction func backward(_ sender: Any) {
//        mediaPlayer.extraShortJumpBackward()
        mediaPlayer.shortJumpForward()
    }
    
    @IBAction func rePosition(_ sender: Any) {
        mediaPlayer.position = slider.value
    }
    
    @IBAction func adjStart(_ sender: Any) {
        if mediaPlayer.isPlaying {
            mediaPlayer.pause()
            adjust = mediaPlayer.time
            slowslider.isHidden = false
            slowslider.value = 15000
        } else {
            mediaPlayer.play()
            slowslider.isHidden = true
        }
        
    }
        
    @IBAction func slowReposition(_ sender: Any) {
        let add = slowslider.value >= 15000 ? slowslider.value - 15000 : -(15000 - slowslider.value)

        if let adj = adjust {
            let new = VLCTime(number: NSNumber(floatLiteral: Double(adj.value.floatValue + add)))
            mediaPlayer.time = new
            mediaPlayer.gotoNextFrame()
            slider.value = mediaPlayer.position
        }
    }
}

extension PlayingViewController: VLCMediaDelegate {
    
    func mediaMetaDataDidChange(_ aMedia: VLCMedia) {
//        print("mediaMetaDataDidChange")
    }
    
    func mediaDidFinishParsing(_ aMedia: VLCMedia) {
//        print("mediaDidFinishParsing")
    }

}

extension PlayingViewController: VLCMediaPlayerDelegate {
    func mediaPlayerStateChanged(_ aNotification: Notification!) {
        
        switch mediaPlayer.state {
        case .stopped:
            print("stoped")
            self.playVideo(self.videoUrl)
        case .buffering:
            print("buffering")
        case .ended:
            print("ended")
        case .error:
            print("error")
        case .opening:
            print("opening")
        case .esAdded:
            print("esAdded")
        case .playing:
            print("playing")
            slowslider.isHidden = true
        case .paused:
            print("paused")
        default:
            print("unsupport")
        }
        
        if self.mediaPlayer.state == .error {
            print("Error")
        }
    }

    func mediaPlayerTimeChanged(_ aNotification: Notification!) {
        self.start.text = "\(self.mediaPlayer.time!)"
        self.end.text = "\(mediaPlayer.remainingTime!)"

        if !sliding {
            slider.value = mediaPlayer.position
        }
    }
}
