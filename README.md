# DevCon Yangon 2015 Hybrid App Source Code

This app use Material Design Lite (<a href="http://getmdl.io/">MDL</a>) for layout and component, jQuery for DOM manipulation, Underscore for template and Swiper for touch swipe effet.

<a href="https://play.google.com/store/apps/details?id=org.devconmyanmar.ygn">App on Google Play Store</a>

## How to run

Install <a href="https://cordova.apache.org/">Cordova</a> and run these:

<pre>
$ cordova create devcon15 org.devconmyanmar.ygn "DevCon Yangon 2015"
$ cordova platform add android
</pre> 

Then replace content of <code>www</code> directory with this source code. Then, connect your Android device to your computer, turn on USB Debugging, and then use this to test run the app on your device:

<pre>
$ cordova run android
</pre>

To build release version, use this:

<pre>
$ cordova build android --release
</pre>

<b>(OR)</b>

Simply open <code>index.html</code> in web browser.

## Contact
Find contact information on <a href="http://eimaung.com/">eimaung.com</a>
