//
//  InterfaceController.h
//  Ti 5.0.0 WatchApp Extension
//
//  Created by not specified on 8/26/2015.
//  not specified. All rights reserved.
//

#import <WatchKit/WatchKit.h>
#import <Foundation/Foundation.h>

// Import the lib to connect with the Titanium app
#import <WatchConnectivity/WatchConnectivity.h>

// Add <WCSessionDelegate>
@interface InterfaceController : WKInterfaceController <WCSessionDelegate> {
    WCSession *watchSession;
    
    // Variables to persist our state
    NSString *lastLog;
    NSData *lastImage;
}

// UI outlets we use
@property (strong, nonatomic) IBOutlet WKInterfaceLabel *logText;
@property (strong, nonatomic) IBOutlet WKInterfaceImage *logImage;

// Public methods
-(IBAction)sendMessage:(id)sender;
-(IBAction)transferFile:(id)sender;
-(IBAction)transferUserInfo:(id)sender;
-(IBAction)updateApplicationContext:(id)sender;

@end
