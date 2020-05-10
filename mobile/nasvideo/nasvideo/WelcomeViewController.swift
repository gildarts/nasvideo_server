//
//  WelcomeViewController.swift
//  nasvideo
//
//  Created by Huang Yaoming on 2020/5/10.
//  Copyright © 2020 ischool. All rights reserved.
//

import UIKit

class WelcomeViewController: UIViewController {

    let defaultUrl = NAS
    
    @IBOutlet weak var nasMode: UISwitch!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func modeChange(_ sender: Any) {
        if nasMode.isOn {
            NAS = "http://speedfusion.synology.me:3000"
        } else {
            NAS = defaultUrl
        }
    }
}
