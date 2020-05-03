//
//  LibrarySegue.swift
//  nasvideo
//
//  Created by Huang Yaoming on 2020/5/3.
//  Copyright © 2020 ischool. All rights reserved.
//

import Foundation

class Download: UIStoryboardSegue {
    override func perform() {
        
        let dest = destination as! PlayerViewController
        
        dest.src = "download"
        
        source.present(destination, animated: true, completion: nil)
    }
}

class BigT: UIStoryboardSegue {
    override func perform() {
        
        let dest = destination as! PlayerViewController
        
        dest.src = "8T"
        
        source.present(destination, animated: true, completion: nil)
    }
}

class Video: UIStoryboardSegue {
    override func perform() {
        
        let dest = destination as! PlayerViewController
        
        dest.src = "video"
        
        source.present(destination, animated: true, completion: nil)
    }
}
