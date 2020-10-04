---
layout: post
title: Vulnerability Assessment Writeup📄🕵️‍♀️☠️ --Reverse Engineering AP Fibernet IPTV (Watch Free TV)
categories: [Hacking, Benchmarks]
---
If you are here for the URL's go all the way to the bottom, you can find them there and also the instructions to play noooob!.
This is an assessment writeup so, it will be *LONG* and in-depth. These writeups are written only after a patch has been released or some of the information is not disclosed to you and only use it for educational purpose.

Before we get into details, there are few things to consider:
0. No permanent damage is done to the platform code or to the servers.
1. This vulnerability is already patched or it doesn't revealed here.
2. This is not a DDOS attack and i recommend you not to do it too.
3. This writeup doesn’t provide a step by step by instruction to hack anything but gives you the basic idea behind the approach.
4. Last but not least this is only for educational purpose.


### Approach
This time, the approach would be different because it's the first time i've encountered a Generic STB(Set-Top Box) powered by android. Now let's see what we can do!
My initial plan(This may change):
- Play with the built-in settings and collect any dev(it means technical) info which can be useful to do some naughty stuff😎.
- It's basically Android, How i know? Because of the U.I and what do you think they are going develop a new O.S like L.G WebOS, it's **BS!**. So, let's find a way to extract the apk's from the STB. Hmm! possible i think.
- It's also an IPTV and obviously it uses IP address to stream through TCP(If they are dumb!) or UDP. If we can get the Channel specific URL's you can watch free T.V from anywhere and from any device. We have to somehow capture the data without disassembling🔧 the STB(Because my mom warned me not to😁).
*<u><br>Tech fact⚒</u>: Typically live video-streaming appliances are not designed with TCP streaming in mind. If you use TCP, the OS must buffer the unacknowledged segments for every client. This is undesirable, particularly in the case of live events; presumably, your list of simultaneous clients is long due to the singularity of the event. Pre-recorded video-casts typically don't have as much of a problem with this because viewers stagger their replay activity; therefore TCP is more appropriate for replaying a video-on-demand.*
- My another epic ☠️ idea is to backup the whole android .img and decompile it in my MAC and analyze the hex code and reverse engineer it and then re-flash it. I know it's pretty time consuming and analyzing the code will definitely be a challenge for me. We have to ready for it as the last resort.
- There is a less complicated method, which is to connect the STB to my MAC using TYPE-A to TYPE-A cable. I don't know whether i can get any data from it but if there is a failsafe mode for the STB to enable debugging. If we choose this path we have to find the method to put it in the failsafe or recovery mode. Obviously, a recovery mode will be present because any device would have one, otherwise, it is made by a dumb🤓 person.
- If none of the above will work then we will think for more approaches. Until then let's start executing.


### Analysis
1. I was able to jump in the advance settings menu and successfully opened the ANDROID SETTINGS app. From there you know, i was able to enable the developer options and soon i find out that there is no adb over wireless and there is no USB debugging option. So bascially it means data extraction using TYPE-A cable is not possible. **FIRST BLOW-UP🤯** let's move on!
   - Digging in the settings app, I opened the Applications section and find some interesting system installed apps there. It's the APSFL app, yes this app acts as the default launcher and basically it's what makes the IPTV as AP Fibertv. So, finally we got a lead👨‍💻.
2. <u>Extracting the apk from stb</u>: I can't connect the STB to the MAC so i cannot backup the apk. But what if i can use the android itself to help me backup the apk. Let me explain!
   - Fortunately, our beloved manufacturer i.e Dasan Networks has installed a chrome browser to let the users browse the Internet but we can use it to download the apps too.
   - I've downloaded the ESfileExplorer(Obviously!) apk from the apkpure.com and i opened it, the android helped because it's the android default behavior to launch package installer if any app is downloaded without opening any file manager to browse the app(which is not possible in our case). Thanks Android🤝!
   - Created a Backup of the APSFL.apk and connected a pendrive to the USB port and copied the file to the pendrive with the help of ES Explorer(Another Thanks to EsFileExplorer🤝).
3. As the APSFL app acted as a launcher and controlled all the T.V operations such as Authentication, STB-menu, Streaming..etc. This is our gateway for everything.
   <p align="center"><img src="/images/apsfl/2.png" width="400" align="center"></p>
   - Installed the apk in the emulator and opened it, To my excitement the app has authentication and data is transmistted through the HTTPS protocol (It's encrypted!). Now checkout the below ~~vulnerability~~ vulnerabilities section👇🏻.

### Vulnerabilities💉
- **<u>Bypassing the encryption🛡</u>**: Basically to monitor the traffic data from the app to the server the data should be non-encrypted data. Installing a custom cert will do the trick but the android api should be 23 or below. Reinstalling the Emulator with android 6.0, Setting up a proxy server to listen to the traffic has been completed. See the below authentication data.

{% highlight json %}

GET /appserver/rest/0C:65:EE:6E:CE:68/login HTTP/1.1
Host: iptv.apsfl.co.in:8080
Proxy-Connection: keep-alive
Accept: application/json, text/javascript, */*; q=0.01
User-Agent: Mozilla/5.0 (Linux; Android 6.0; Samsung Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.119 Mobile Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: en-US
X-Requested-With: com.corpus.stb.apsfl


HTTP/1.1 200 
Date: Sun, 29 Mar 2020 12:33:42 GMT
Set-Cookie: 0C:65:EE:6E:CE:68=1585485222172
Vary: Accept-Charset, Accept-Encoding, Accept-Language, Accept
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Compressed: false
Server: Noelios-Restlet-Engine/1.1.6
Content-Type: text/plain;charset=ISO-8859-1
Content-Length: 83

{"responseStatus":{"statusCode":"803","statusMessage":"Device is Not Provisioned"}}
{% endhighlight %}

   - As you can see the authentication has done through the MAC address of the device which is pretty reasonable.
   - The response is in json format and if the authentication is successful we are served with some pretty useful data.

  <p align="center"><img src="/images/apsfl/3.png" width="400"></p>
- **<u>Spoofing🔎 the Mac Address</u>**: I have to get pass the authentication by spoofing my emulator MAC address which is **0C:65:EE:6E:CE:68**(You can see in the GET request above) with my stb MAC Id. I have changed my mac id thanks to the virtual box network interface. My initial thoughts were that once the authentication is bypassed i can play live tv from my android device🤷.
   - Ofcourse without hiccups how can hacking will be challenging. The problem i faced is a weird one which is the video which is streaming is not supported by the android emulator which i was using. And believe me it's pretty hard to find a emulator which has support for root, api 23, stable and for mac🤦‍♂️.
   <p align="center"><img src="/images/apsfl/4.png" width="400"></p>
   - I have experimented with various images with various architectures both arm64 and x86. By the way our STB runs on arm architecture. But i always landed in some kind of problems related to connection, mac spoofing, rooting ..etc. The problem here is that there are no required video codecs in the android img to playback the video. 
   - There are some things i have observed during this time: 
     - Why can't i capture the video stream URL's through proxy? My raw guess is that they are using UDP protocol for multicasting which is not supported by my tool. So, i have changed the tool to wireshark and started analyzing the complicated UDP packets and stitching them together(Believe me analysing UDP packets is difficult when filtering all the mac traffic too). Still, no luck **SECOND BLOW-UP🤯**.
- **<u>Decompiling the apk</u>**: Their is no other way but to reverse engineer the apk itself, started by decompiling the apk and converting the .smali resources to .java files using both fern flower and byte code decompilers at the same time. 
<p align="center"><img src="/images/apsfl/5.png" width="500"></p>
   - First thing i have done is to modify the ConnectionManager condition to true. I have already told you that i had faced connection issues in the app in ANDROID TV emulator which does have video codecs but didn't get pass through this connection issue. I think the problem is with android connection libraries present in the android tv image. I was sure if i can get past this i can stream the live tv there. Unfortunately there are two many connection checks and if i try to change all of the conditions it's gonna break at some point(i mean the app will crash, unfortunately stopped!).
   - My options are limited now, i was frustrated with the lag in emulators and rooting the tv image everytime i restart as the root is non-persistence(don't ask me why, they havn't found a way to keep persistence in default android emulator). I was going through the other stuff in decompiled apk and found the assets folder.
- **<u>Analysing the Assets📁</u>**: It looks interesting in the assets folder because there are html, js, css files and i have opened the index.html file in the browser and the whole APSFL layout opened in the browser💻,and checking the console logs which are huge. There is a gut feeling in me that we can crack it!
   - The working is simple, The authentication🛡 part is done by the android and the layouts, streaming are handled by the web part. They share data between them using some off-the-shelf library known as **TornadoApp**(weird name🧿).
   - So the operations are all handled by javascript file named as "ap_fiber_stb.min.js" which is freaking 1.5 mb in size and it is 41,000 lines long. Anyways i started analyzing the .js file, man! it's big. At last i have found out that it's deeply integrated with the android library and their is nothing i can do **THIRD BLOW-UP🤯**.
- **<u>Java Script Time</u>**: In the browser i have observed that the js file has console logs everywhere. Another idea strike my mind, I can monitor these logs in realtime in the emulator by using a simple app known as **lOGCAT**.
<p align="center"><img src="/images/apsfl/6.png" width="400"></p>
   - Basically app-specific logs are blocked in a production apk, but the javascript present in the app is handled by the android webview, which by default omits the console logs. I analyzed those logs and finally i managed to find a UDP url starting with *udp@//ipaddress*. I traced it back to the origin and found the file(json)[HAPPY ME😇] which has all the url's of every channel present in the APFIBER NET IPTV. **🤩JACKPOT🤩**

### Collecting the URL's
The json file has too much data and it makes sense, that it is 1mb(The file with 1mb size in terms of coding is considered huge). I have filter the json data to only show URL's and Channel names. Below is the code.

{% highlight python %}
import json
file = open("testfile.txt","w")
file.write("Channel Name \t\t ChannelUrl"+"\n")
with open('chan.json') as f:
  data = json.load(f)
for i in range(0,len(data["Channel"])):
      tmp=str(data["Channel"][i]["name"])
      tmp2=str("  :  ")
      tmp1=str(data["Channel"][i]["streamProfile"][0]["urltype"][0]["value"])
      tmp3=tmp+tmp2+tmp1
      file.write("\n"+tmp3+"\n")
file.close()

{% endhighlight %}

### Result
I can watch all the channels from my android device using **MX PLAYER** OR **VLC**.
1. Open VLC or MX PLAYER.
2. Select the network stream option.
3. Paste The Below URL's. (Only works when connected to the AP FIBER WiFi)

 ``` I DIDN'T REVEAL SOME VULNERABILITIES PRESENT IN THERE WEB PLATFORM BECAUSE I WAS WAITING FOR THEM TO FIX BEFORE I REVEAL ANYTHING. MAYBE IN FUTURE ASSESSMENT WRITEUP. THESE URL's I HAVE LEAKED ARE BASICALLY USELESS TO THE PEOPLE WHO ARE OUTSIDE THE NETWORK OF APSFL FIBERNET WIFI OR WIRED CONNECTION(YES THEY WORK LOCAL ONLY AND DON'T BLAME ME! THE DESIGN ITSELF IS LIKE THAT. IT'S EFFICIENT IN THIS WAY). I THINK IT'S LEGAL TO WATCH THESE ON YOUR MOBILE AS LONG AS YOU OWN APFIBER IPTV STB. ```

Finally, N̶0̶ S̶y̶5̶t̶3̶m̶ 1̶s̶ S̶@f̶3̶ dot!

📎📎POH's Attached below 

**Check out all the url's [Here](https://blog.govardhanchitrada.com/assets/apsfl/cb_web_iptv/)**

📄𝒩ℴ𝓉ℯ: Assessment of commercial companies requires a certification such as Certified Ethical Hacker(Not limited to CEH) but for personal tests not at all needed, go ahead. There are so many things i have not listed because the more you go the more it comes visible in this path. Find your own way and your own approach. Happy Hacking!!!!

### LINKS
APSFL 5.1 (.apk): [Download Here](/assets/apsfl/cb_apsfl.apk) Only for reverse engineering or experimenting not for usage. it doesn't work on your device.
<br>URL'S (.txt file) : [Download Here](/assets/apsfl/cb_channels.txt)
<img src="/images/apsfl/1.png" width="500">