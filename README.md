# mptqr 1.3
<h3>Client Extension App for M-Files Desktop and M-Files Web Versions 20.12 - 22.x.</h3>

QR-Mobilelink Generator for M-Files

<h3>What does it do?</h3>
This app generates quick response (QR) codes from selected M-Files objects and views, to swiftly access the same items inside M-Files mobile app. That's just about all, small, neat and practically!<br/>
<h3>What you might need this app to ...</h3>
<ul>
  <li><b>Rapid step</b> to open your customer record from the mobile<br/><b>&#8680;</b> scan the QR and instantly call your contact from the smartphone!<br/><br/></li>
  <li><b>Share objects, views and documents</b> through your screen or projector with your peers <br/><b>&#8680;</b> synchronizes everyone in the room. It also eliminates the need of creating paper printouts for meetings when mobiles are used<br/><br/></li>
  <li><b>Save vault connection</b> Urls onto your mobile without typing hassles <br/><b>&#8680;</b> don't ever type those vault connection Url again!<br/><br/></li>
  <li><b>Quickly add files</b> from your mobile to M-Files objects <br/><b>&#8680;</b> attach photo- and document captures to the QR-selected object at the drop of a hat<br/><br/></li>
  <li><b>Connect the physical world</b> with M-Files through QR-Code stickers <br/><b>&#8680;</b> stick those to any item (i.e. machines in a factory) for quick access to M-Files metacard, manuals and other key information</li>
</ul>
<h3>Now how do i use it?</h3>
Just select the desired object in M-Files Desktop or Web Client, right click it and choose the "Get QR-Mobilelink..." function from the context menu. That will automatically generate the QR-Code to bring that content onto your mobile device, whether it is a tablet or a smartphone. Of course M-Files mobile app needs to be installed beforehand, but it is not necessary to have it open while scanning the code - any capable QR-Code reading app will do. It is especially easy with iOS, which standard camera app now has an integrated QR-interpreter. Please note that the QR-Code is printable, if you prefer to have a physical copy of the M-Files object somewhere in reach, reusable at your fingertips.

<h3>Install the app</h3>
M-Files administrator rights are required to install the app. Use M-Files Management Console to install one of the "Mobile_Connect_App_for_MF" app variants. To do this, first navigate to the desired vault that is to receive the function and select the "Applications" command from the context menu (right-click). The overview of the apps that have already been installed appears on the screen. Click on "Install..." and select the desired mfappx file for installation. The M-Files Client extension will become active for the respective user after the next login and logout procedure. 

<h3>App updates</h3>
There is no separate update routine. Simply proceed as described in the section "Installing the App". It is not necessary to uninstall the app first.
						
<h3>How to de-Install the app</h3>
The un-installation is done from the same dialog (see above "Install the App"). The administrator may un-install the app at anytime from the vaults applications listing. The QR-Link-Feature will be gone the next time that the user logs off their M-Files Client.
						
<h3>How can we configure it?</h3>
Well there is not much to configure, since the app will do its job straightaway.<br/>But if you'd like to hide some of the elements and functions of the app (like this help- or the about page), you'll need to export the app from M-Files management console, unzip it and edit the "QS_config.js" file that is part of this client extension package. The config file itself is pretty self-explaining and if you read the remarks you can easily configure it to suit your needs. Now save it and zip it again to reimport it into M-Files management console. Once M-Files clients do a logoff-logon, they'll experience the new configuration!<br/> 

<h3>MIT License</h3>
<p>
M-Power TOOLS QR-Mobile Linkage - Client Extension for M-Files Desktop and Web<br/> 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br/>
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</p>
<p>						
Components from the following third-party libraries are distributed with and used by this client extension under the MIT License: jQuery.qrcode copyright by Lars Jung, jQuery Page copyright by Ralf S. Engelschall, jsPDF copyright by James Hall, jQuery and jQueryUI copyright by the JS Foundation and other contributors.
</p>
