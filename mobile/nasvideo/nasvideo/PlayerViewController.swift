//
//  PlayerViewController.swift
//  nasvideo
//
//  Created by Huang Yaoming on 2020/5/2.
//  Copyright © 2020 ischool. All rights reserved.
//

import UIKit
import WebKit
import Alamofire

class PlayerViewController: UIViewController {
    
    @IBOutlet weak var web: WKWebView!
    
    var src = "hq"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 不要存 cookie。
        web.configuration.websiteDataStore = WKWebsiteDataStore.nonPersistent()
        
        self.web.scrollView.bounces = false
        self.web.scrollView.alwaysBounceVertical = false
        
        
        self.web.navigationDelegate = self
        
        let target = "\(NAS)/service/acl/source?src=\(src)"
//        let target = "https://www.google.com.tw"
        self.web.load(URLRequest(url: URL(string: target)!))
    }
}

extension PlayerViewController: WKNavigationDelegate {
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        
        if let url = navigationAction.request.url {
            print("NAVIGATION => \(url)")
            
            let components = URLComponents(string: url.absoluteString)!
            
            if components.path.starts(with: "/mobilenative") {
                print("NAVIGATION CANCELED => \(url)")
                decisionHandler(WKNavigationActionPolicy.cancel)
                
                let avf = try! retrieveArgs(query: components.queryItems ?? [])
                let play = self.storyboard!.instantiateViewController(withIdentifier: "playing") as! PlayingViewController
                
                play.videoUrl = createUrl(avf.video, src)
                play.seconds = avf.seconds
                play.replySeconds = avf.replaySeconds
                play.modalPresentationStyle = .fullScreen
                
                self.present(play, animated: true, completion: nil)
                
            } else {
                decisionHandler(WKNavigationActionPolicy.allow)
            }
        } else {
            decisionHandler(WKNavigationActionPolicy.allow)
        }
        
    }
    
    func createUrl(_ videoPath: String, _ src: String) -> String {
        var urlcpn = URLComponents(string: NAS)!
        
        urlcpn.path = "/media/\(videoPath)" // 不需要再次 url encode。
        urlcpn.queryItems = [URLQueryItem(name: "src", value: src)]
        
        return urlcpn.url!.absoluteString
    }
    
    func retrieveArgs(query: [URLQueryItem]) throws -> AVFragment {
        let map = Dictionary(uniqueKeysWithValues: query.map { ($0.name, $0)})
        
        guard let video = map["video"]?.value else {
            throw AVError.Arguments("缺少 video 參數。")
        }
        
        let seconds = map["seconds"]?.value ?? "0"
        let replySeconds = map["reply_seconds"]?.value ?? "\(Int32.max / 1000)"
        
        return (video,  (seconds as NSString).intValue * 1000, (replySeconds as NSString).intValue * 1000)
    }
}


extension WKWebView {
    
    private var httpCookieStore: WKHTTPCookieStore  { return WKWebsiteDataStore.default().httpCookieStore }
    
    func getCookies(for domain: String? = nil, completion: @escaping ([String : Any])->())  {
        var cookieDict = [String : AnyObject]()
        httpCookieStore.getAllCookies { cookies in
            for cookie in cookies {
                if let domain = domain {
                    if cookie.domain.contains(domain) {
                        cookieDict[cookie.name] = cookie.properties as AnyObject?
                    }
                } else {
                    cookieDict[cookie.name] = cookie.properties as AnyObject?
                }
            }
            completion(cookieDict)
        }
    }
}
