//
//  PlayingViewController.swift
//  nasvideo
//
//  Created by Huang Yaoming on 2020/5/2.
//  Copyright © 2020 ischool. All rights reserved.
//

import UIKit

let JumpMilliSeconds: Int32 = 1000 * 60

class PlayingViewController: UIViewController {

    var videoUrl: String = ""

    let mediaPlayer: VLCMediaPlayer = VLCMediaPlayer()

    @IBOutlet weak var start: UILabel!
    @IBOutlet weak var end: UILabel!
    @IBOutlet weak var playArea: UIView!
    @IBOutlet weak var slider: UISlider!
    @IBOutlet weak var slowslider: UISlider!
    @IBOutlet weak var adjustTime: UILabel! // 調整中的時間。
    @IBOutlet weak var slowStack: UIStackView!
    
    var adjustMiddle: VLCTime? = nil
    var duration: VLCTime?
    
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
            "network-caching": 3500,
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
    
    @IBAction func rePosition(_ sender: Any) {
        
    }
    
    @IBAction func slideEnd(_ sender: Any) {
        sliding = false
        syncTime()
        if !mediaPlayer.isPlaying {
            mediaPlayer.play()
        }

    }
    
    @IBAction func forward(_ sender: Any) {
        mediaPlayer.mediumJumpForward()
        adjustSlider(milliSeconds: JumpMilliSeconds)
        slowAdjStop()
    }
    
    @IBAction func backward(_ sender: Any) {
        mediaPlayer.mediumJumpBackward()
        adjustSlider(milliSeconds: -JumpMilliSeconds)
        slowAdjStop()
    }
    
    @IBAction func adjStart(_ sender: Any) {
        if mediaPlayer.isPlaying {
            slowAdjStart()
        } else {
            slowAdjStop()
        }
        
    }

    @IBAction func slowReposition(_ sender: Any) {
        let add = slowslider.value >= 15000 ? slowslider.value - 15000 : -(15000 - slowslider.value)

        if let adj = adjustMiddle {
            
            let new = VLCTime(int: Int32(adj.value.floatValue + add))
            mediaPlayer.time = new
            syncAdjustLabel(new?.intValue)
            syncSlider(new?.intValue)
        }
    }
    
    func syncSlider(_ absMilliSeconds: Int32? = nil) {
        
        if let abs = absMilliSeconds {
            slider.value = Float(abs)
        } else {
            slider.value = Float(mediaPlayer.time.intValue)
        }
    }
    
    func syncTime() {
        mediaPlayer.time = VLCTime(int: Int32(slider.value))
    }
    
    func adjustSlider(milliSeconds: Int32) {
        slider.value = slider.value + Float(milliSeconds)
        syncTime()
    }
    
    func adjustTime(milliSeconds: Int32) {
        let current = mediaPlayer.time.intValue
        let target = VLCTime(int: current + milliSeconds)
        mediaPlayer.time = target
        syncSlider(target?.intValue)
    }
    
    func slowAdjStart() {
        mediaPlayer.pause()
        adjustMiddle = mediaPlayer.time
        slowslider.value = 15000
        slowStack.isHidden = false
        syncAdjustLabel()
    }
    
    func slowAdjStop() {
        mediaPlayer.play()
        slowStack.isHidden = true
    }
    
    func syncAdjustLabel(_ absMilliSeconds: Int32? = nil) {
        if let abs = absMilliSeconds {
            adjustTime.text = "\(VLCTime(int: abs) ?? VLCTime())"
        } else {
            adjustTime.text = "\(mediaPlayer.time ?? VLCTime())"
        }
    }
}

extension PlayingViewController: VLCMediaPlayerDelegate {
    
    func mediaPlayerTimeChanged(_ aNotification: Notification!) {
        self.start.text = "\(self.mediaPlayer.time!)"
        self.end.text = "\(mediaPlayer.remainingTime!)"

        duration = mediaPlayer.media.length
        slider.maximumValue = Float(duration!.intValue)

        if !sliding {
            slider.value = Float(mediaPlayer.time.intValue)
        }
    }
    
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
            slowAdjStop()
        case .paused:
            print("paused")
        default:
            print("unsupport")
        }
        
        if self.mediaPlayer.state == .error {
            print("Error")
        }
    }
}

extension PlayingViewController: VLCMediaDelegate {
    
    func mediaMetaDataDidChange(_ aMedia: VLCMedia) {
    }
    
    func mediaDidFinishParsing(_ aMedia: VLCMedia) {
    }

}
