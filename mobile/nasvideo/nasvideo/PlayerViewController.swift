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
                                
    @IBOutlet weak var web: WKWebView!
    
    var src = "video"
   
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.web.navigationDelegate = self
        
//        let target = "http://speedfusion.synology.me:3000/service/acl/source?src=\(src)"
        let target = "http://192.168.100.65:4200/service/acl/source?src=\(src)"
        self.web.load(URLRequest(url: URL(string: target)!))
    }
}

extension PlayerViewController: WKNavigationDelegate {
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    
        if let url = navigationAction.request.url {
            print("NAVIGATION => \(url)")
            
            let components = URLComponents(string: url.absoluteString)!

            if components.path.starts(with: "/media") {
                print("NAVIGATION CANCELED => \(url)")
                decisionHandler(WKNavigationActionPolicy.cancel)
 
                let play = self.storyboard!.instantiateViewController(withIdentifier: "playing") as! PlayingViewController

                play.videoUrl = "\(url.absoluteString)?src=\(src)"
                play.modalPresentationStyle = .fullScreen
                
                self.present(play, animated: true, completion: nil)
                
            } else {
                decisionHandler(WKNavigationActionPolicy.allow)
            }
        } else {
            decisionHandler(WKNavigationActionPolicy.allow)
        }

    }
}
