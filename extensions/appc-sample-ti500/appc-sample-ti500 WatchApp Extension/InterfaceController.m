//
//  InterfaceController.m
//  appc-sample-ti500 WatchApp Extension
//
//  Created by not specified on 8/26/2015.
//  not specified. All rights reserved.
//

#import "InterfaceController.h"


@interface InterfaceController()

@end


@implementation InterfaceController

- (void)awakeWithContext:(id)context {
    [super awakeWithContext:context];

    // Configure interface objects here.
}

- (void)willActivate {
    
    // This method is called when watch view controller is about to be visible to user
    [super willActivate];
    
    // Activate the connection to the Titanium app
    if ([WCSession isSupported] && watchSession == nil) {
        watchSession = [WCSession defaultSession];
        watchSession.delegate = self;
        [watchSession activateSession];
    }
    
    // No connection
    if (watchSession == nil) {
        return;
    }
    
    // Restore our previous (or data received while in background)
    [self showLog:lastLog withImage:lastImage andMode:@"restored"];
}

- (void)didDeactivate {
    
    // This method is called when watch view controller is no longer visible
    [super didDeactivate];
}

- (void)showLog:(NSString *)text withImage:(NSData *)data andMode:(NSString *)mode {
    
    if (text != nil) {
        _logText.text = [NSString stringWithFormat:@"(%@) %@", mode, text];
    }

    [_logImage setImageData:data];
    
    lastLog = text;
    lastImage = data;
    
    [self hideLog];
}

- (void)hideLog {
    dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * 5);
    dispatch_after(delay, dispatch_get_main_queue(), ^(void){
        _logText.text = NULL;
        [_logImage setImageData:NULL];
    });
}

#pragma mark watch methods
-(IBAction)sendMessage:(id)sender
{
    [watchSession sendMessage:[NSDictionary dictionaryWithObjectsAndKeys:@"bar",@"foo", nil] replyHandler:nil errorHandler:nil];
}

-(IBAction)transferFile:(id)sender
{
    NSURL *fileURL = [[NSBundle mainBundle] URLForResource:@"logo" withExtension:@"png"];
    [watchSession transferFile:fileURL metadata:[NSDictionary dictionaryWithObjectsAndKeys:@"bar",@"foo",nil]];
}

-(IBAction)transferUserInfo:(id)sender
{
    [watchSession transferUserInfo:[NSDictionary dictionaryWithObjectsAndKeys:@"bar",@"foo", nil]];
}

-(IBAction)updateApplicationContext:(id)sender
{
    // Only latest appContext is registered.
    [watchSession updateApplicationContext:[NSDictionary dictionaryWithObjectsAndKeys:@"bar",@"foo", nil] error:nil];
}

#pragma mark watch delegates
- (void)session:(nonnull WCSession *)session didReceiveMessage:(nonnull NSDictionary<NSString *,id> *)message
{
    [self showLog:[NSString stringWithFormat:@"didReceiveMessage %@", message] withImage:nil andMode:@"live"];
}

- (void)session:(nonnull WCSession *)session didReceiveUserInfo:(nonnull NSDictionary<NSString *,id> *)userInfo
{
    [self showLog:[NSString stringWithFormat:@"didReceiveUserInfo %@", userInfo] withImage:nil andMode:@"live"];
}

- (void)session:(nonnull WCSession *)session didFinishUserInfoTransfer:(nonnull WCSessionUserInfoTransfer *)userInfoTransfer error:(nullable NSError *)error
{
    [self showLog:[NSString stringWithFormat:@"didFinishUserInfoTransfer %@", userInfoTransfer] withImage:nil andMode:@"live"];
}

- (void)session:(nonnull WCSession *)session didReceiveFile:(nonnull WCSessionFile *)file
{
    NSURL *url = [file fileURL];
    
    [self showLog:[NSString stringWithFormat:@"didReceiveFile %@", file.description] withImage:[NSData dataWithContentsOfURL:url] andMode:@"live"];
}

- (void)session:(nonnull WCSession *)session didFinishFileTransfer:(nonnull WCSessionFileTransfer *)fileTransfer error:(nullable NSError *)error
{
    [self showLog:[NSString stringWithFormat:@"didFinishFileTransfer %@", fileTransfer.description] withImage:nil andMode:@"live"];
}

- (void)session:(nonnull WCSession *)session didReceiveApplicationContext:(nonnull NSDictionary<NSString *,id> *)applicationContext
{
    [self showLog:[NSString stringWithFormat:@"didReceiveApplicationContext %@", applicationContext] withImage:nil andMode:@"live"];
}

@end
