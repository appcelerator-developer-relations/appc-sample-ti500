//
//  InterfaceController.h
//  appc-sample-ti500 WatchApp Extension
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
    
    // Added properties to restore our state when the Watch App activates
    WCSession *watchSession;
    NSString *backgroundSavedString;
    NSData *imageData;
}

// Reference UI components to use in our logic
@property (strong, nonatomic) IBOutlet WKInterfaceLabel *titaniumLabel;
@property (strong, nonatomic) IBOutlet WKInterfaceButton *titaniumButton;
@property (strong, nonatomic) IBOutlet WKInterfaceImage *titaniumImage;

// Reference methods to execute when buttons are pressed
-(IBAction)sendMsgButtonPressed:(id)sender;
-(IBAction)sendUserInfoButtonPressed:(id)sender;
-(IBAction)sendFileButtonPressed:(id)sender;
-(IBAction)sendAppContextButtonPressed:(id)sender;

@end
