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
- Play with the built-in settings and collect any dev(it means technical) info which can be usefull to do some naughty stuff😎.
- It's basically Android, How i know? Because of the U.I and what do you think they are going develop a new O.S like L.G webos, it's **BS!**. So, let's find a way to extract the apk's from the STB. Hmm! possible i think.
- It's also an IPTV and obviously it uses IP address to stream through TCP(If they are dumb!) or UDP. If we can get the Channel specific URL's you can watch free T.V from anywhere and from any device. We have to some how capture the data without disassembling🔧 the STB(Because my mom warned me not to😁).
*<u><br>Tech fact⚒</u>: Typically live video-streaming appliances are not designed with TCP streaming in mind. If you use TCP, the OS must buffer the unacknowledged segments for every client. This is undesirable, particularly in the case of live events; presumably your list of simultaneous clients is long due to the singularity of the event. Pre-recorded video-casts typically don't have as much of a problem with this because viewers stagger their replay activity; therefore TCP is more appropriate for replaying a video-on-demand.*
- My another epic ☠️ idea is to backup the whole android .img and decompile it in my MAC and analyse the hex code and reverse engineer it and then re-flash it. I know it's pretty time consuming and analysing the code will definitely be a challenge for me. We have to ready for it as the last resort.
- Their is a less complicated method, which is to connect the STB to my MAC using TYPE-A to TYPE-A cable. I don't know whether i can get any data from it but if their is a failsafe mode for the STB to enable debugging. If we choose this path we have to find the method to put it in the failsafe or recovery mode. Obviously a recovery mode will be present because any device would have one, otherwise it is made by a dumb🤓 person.
- If none of the above will work then we will think for more approaches. Untill then let's start excuting.


### Analysis
1. I was able to jump in the advance settings menu and successfully opened the ANDROID SETTINGS app. From there you know, i was able to enable the developer options and soon i find out that their is no adb over wireless and their is no USB debugging option. So bascially it means data extraction using TYPE-A cable is not possible. **FIRST BLOW-UP🤯** Lets move on!
   - Digging in the settings app, I opened the Applications section and find some interesting system installed apps there. It's the APSFL app, yes this app acts as the default launcher and basically it's what make the IPTV as AP Fibertv. So, finally we got a lead👨‍💻.
2. <u>Extracting the apk from stb</u>: I can't connect the STB to the MAC so i cannot backup the apk. But what if i can use the android itself to help me backup the apk. Let me explain!
   - Fortunately our beloved manufacturer i.e Dasan Networks has installed a chrome browser to let the users browse the Internet but we can use it to download the apps too.
   - I've downloaded the ESfileExplorer(Obviously!) apk from the apkpure.com and i opened it, the android helped because it's the android default behaviour to launch package installer if any app is downloaded without opening any file manager to browse the app(which is not possible in our case). Thanks Android🤝!
   - Created a Backup of the APSFL.apk and connected a pendrive to the USB port and copied the file to the pendrive with the help of ES Explorer(Another Thanks to EsFileExplorer🤝).
3. As the APSFL app acted as a launcher and controlled all the T.V operations such as Authentication, STB-menu, Streaming..etc. This is our gateway for everything.
   <p align="center"><img src="/images/apsfl/2.png" width="400" align="center"></p>
   - Installed the apk in the emulator and opened it, To my excitement the app has authentication and data is transmistted through the HTTPS protocol (It's encrypted!). Now checkout the below ~~vulnerability~~ vulnerabilities section👇🏻.

### Vulnerabilities💉
- **<u>Bypassing the encryption🛡</u>**: Basically to monitor the traffic data from the app to the server the data shoulde be non-ecrypted data. Installing a custom cert will do the trick but the android api should be 23 or below. Reinstalling the Emulator with android 6.0, Setting up a proxy server to listen to the traffic has been completed. See the below authentication data.

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
   - The response is in json format and if the authentication is successfull we are served with some pretty useful data.

  <p align="center"><img src="/images/apsfl/3.png" width="400"></p>
- **<u>Spoofing🔎 the Mac Address</u>**: I have to get pass the authentication by spoofing my emulator MAC address which is **0C:65:EE:6E:CE:68**(You can see in the GET request above) with my stb MAC Id. I have changed my mac id thanks to the virtual box network interface. My initial thoughts were that once the authentication is bypassed i can play live tv from my android device🤷.
   - Ofcourse without hiccups how can hacking will be challenging. The problem i faced is a weird one which is the video which is streaming is not supported by the android emulator which i was using. And believe me it's pretty hard to find a emulator which has support for root, api 23, stable and for mac🤦‍♂️.
   <p align="center"><img src="/images/apsfl/4.png" width="400"></p>
   - I have experimented with various images with various architectures both arm64 and x86. By the way our STB runs on arm architecture. But i always landed in some kind of problems related to connection, mac spoofing, rooting ..etc. The problem here is that there are no required video codecs in the android img to playback the video. 
   - There are some things i have observed during this time: 
     - Why can't i capture the video stream URL's through proxy? My raw guess is that they are using UDP protocol for multicasting which is not supported by my tool. So, i have changed the tool to wireshark and started analysing the complicated UDP packets and stitching them together(Believe me analysing UDP packets is difficult when filtering all the mac traffic too). Still, no luck **SECOND BLOW-UP🤯**.
- **<u>Decompiling the apk</u>**: Their is no other way but to reverse engineer the apk itself, started by decompiling the apk and converting the .smali resources to .java files using both fern flower and byte code decompilers at the same time. 
<p align="center"><img src="/images/apsfl/5.png" width="500"></p>
   - First thing i have done is to modify the ConnectionManager condition to true. I have already told you that i had faced connection issues in the app in ANDROID TV emulator which does have video codecs but didn't get pass through this connection issue. I think the problem is with android connection libraries present in the android tv image. I was sure if i can get past this i can stream the live tv there. Unfortunately there are two many connection checks and if i try to change all of the conditions it's gonna break at some point(i mean the app will crash, unfortunately stopped!).
   - My options are limited now, i was frustrated with the lag in emulators and rooting the tv image everytime i restart as the root is non-persistance(don't ask me why, they havn't found a way to keep persistance in default android emulator). I was going through the other stuff in decompiled apk and found the assets folder.
- **<u>Analysing the Assets📁</u>**: It looks interesting in the assets folder because there are html, js, css files and i have opened the index.html file in the browser and the whole APSFL layout opened in the browser💻,and checking the console logs which are huge. There is a gut feeling in me that we can crack it!
   - The working is simple, The authentication🛡 part is done by the android and the layouts, streaming are handled by the web part. They share data between them using some off-the-shelf library known as **TornadoApp**(weird name🧿).
   - So the operation are all handled by javascript file named as "ap_fiber_stb.min.js" which is freaking 1.5 mb in size and it is 41,000 lines long. Anyways i started analysing the .js file, man! it's big. At last i have found out that it's deeply integrated with the android library and their is nothing i can do **THIRD BLOW-UP🤯**.
- **<u>Java Script Time</u>**: In the browser i have observed that the js file has console logs everywhere. Another idea strike my mind, I can monitors these logs in realtime in the emulator by using a simple app known as **lOGCAT**.
<p align="center"><img src="/images/apsfl/6.png" width="400"></p>
   - Basically app specific logs are blocked in a production apk, but the javascript present in the app is handled by the android webview, which by default omits the console logs. I analysed those logs and finally i managed to find a UDP url starting with *udp@//ipaddress*. I traced it back to the origin and found the file(json)[HAPPY ME😇] which has all the url's of every channel present in the APFIBER NET IPTV. **🤩JACKPOT🤩**

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
3. Paste The Below URL's.

 ``` I DIDN'T REVEAL SOME VULNERABILITIES PRESENT IN THERE WEB PLATFORM BECAUSE I WAS WAITING FOR THEM TO FIX BEFORE I REVEAL ANYTHING. MAY BE IN FUTURE ASSESSMENT WRITEUP. THESE URL's I HAVE LEAKED ARE BASICALLY USELESS TO THE PEOPLE WHO ARE OUTSIDE THE NETWORK OF APSFL FIBERNET WIFI OR WIRED CONNECTION(YES THEY WORK LOCAL ONLY AND DON'T BLAME ME! THE DESIGN ITSELF IS LIKE THAT. IT'S EFFICIENT IN THIS WAY). I THINK IT'S LEGAL TO WATCH THESE ON YOUR MOBILE AS LONG AS YOU OWN APFIBER IPTV STB. ```

Finally, N̶0̶ S̶y̶5̶t̶3̶m̶ 1̶s̶ S̶@f̶3̶ dot!

📎📎POH's Attached below 
```
📺Channel Name📺         📺ChannelUrl📺
AP fiber  :  udp://@239.255.1.184:1234
ETV Telugu  :  udp://@239.255.1.108:1234
Gemini TV  SD  :  udp://@239.255.1.76:1234
ETV HD  :  udp://@239.255.1.229:1234
Maa TV HD  :  udp://@239.255.1.199:1234
Zee Telugu  :  udp://@239.255.1.145:1234
ETV Plus HD  :  udp://@239.255.1.119:1234
Gemini Comedy  :  udp://@239.255.1.79:1234
Gemini Life  :  udp://@239.255.1.22:1234
Tollywood  :  udp://@239.255.1.169:1234
ETV  Abhiruchi HD  :  udp://@239.255.1.158:1234
DD Saptagiri  :  udp://@239.255.1.167:1234
DD Yadagiri  :  udp://@239.255.1.127:1234
Vhm Tv HD  :  udp://@239.255.2.15:1234
Vinodam HD  :  udp://@239.255.2.66:1234
GEE TV  :  udp://@239.255.2.169:1234
Vihari Tv  :  udp://@239.255.2.12:1234
My Tv Movies HD  :  udp://@239.255.2.16:1234
Every  :  udp://@239.255.2.14:1234
111 tv  :  udp://@239.255.2.82:1234
Anu Tv HD  :  udp://@239.255.2.13:1234
Shreyas Tv  :  udp://@239.255.2.81:1234
Vkshanam  :  udp://@239.255.2.10:1234
Metro News Telugu  :  udp://@239.255.1.73:1234
A1 TV Telugu News  :  udp://@239.255.2.11:1234
19 News  :  udp://@239.255.2.75:1234
GEMINI MOVIES  :  udp://@239.255.1.80:1234
ETV Cinema HD  :  udp://@239.255.1.113:1234
Zee Cinemalu  :  udp://@239.255.1.242:1234
YTV  :  udp://@239.255.1.98:1234
Maa Movies  :  udp://@239.255.1.231:1234
Star Maa Gold  :  udp://@239.255.1.163:1234
SAKSHI TV  :  udp://@239.255.1.174:1234
ETV AP  :  udp://@239.255.1.109:1234
TV9 Telugu  :  udp://@239.255.2.198:1234
NTV  :  udp://@239.255.1.92:1234
AP 24x7 Telugu News  :  udp://@239.255.1.105:1234
MAHAA News  :  udp://@239.255.2.197:1234
ABN Andhra Jyothi  :  udp://@239.255.1.86:1234
TV5 NEWS  :  udp://@239.255.1.116:1234
ETV Telangana  :  udp://@239.255.1.111:1234
Raj News Telugu  :  udp://@239.255.1.233:1234
99 PERCENT  :  udp://@239.255.2.199:1234
Mojo Tv  :  udp://@239.255.2.9:1234
Prime 9 News  :  udp://@239.255.1.181:1234
10TV  :  udp://@239.255.1.90:1234
BHAARAT TODAY  :  udp://@239.255.2.168:1234
CVR NEWS  :  udp://@239.255.1.88:1234
HMTV  :  udp://@239.255.1.82:1234
I News  :  udp://@239.255.1.144:1234
6 Tv telangana  :  udp://@239.255.1.46:1234
TV 1  :  udp://@239.255.2.202:1234
V6 NEWS  :  udp://@239.255.1.87:1234
T NEWS  :  udp://@239.255.1.110:1234
1TV News Telugu  :  udp://@239.255.1.60:1234
Gemini Music  :  udp://@239.255.1.84:1234
Maa Music  :  udp://@239.255.1.155:1234
Raj Music Telugu  :  udp://@239.255.1.232:1234
Star Sports 1 Telugu  :  udp://@239.255.1.211:1234
STAR C3  :  udp://@239.255.2.73:1234
Grace tv  :  udp://@239.255.2.8:1234
Bhakthi TV  :  udp://@239.255.1.95:1234
SVBC Telugu  :  udp://@239.255.1.48:1234
CVR SPIRITUAL  :  udp://@239.255.1.99:1234
Hare Krishna Tv  :  udp://@239.255.1.125:1234
Hindu Dharmam  :  udp://@239.255.1.208:1234
Neerikshana  :  udp://@239.255.1.72:1234
Divyavani TV  :  udp://@239.255.1.244:1234
ARADANA  :  udp://@239.255.1.81:1234
SUBHAVAARTHA  :  udp://@239.255.1.152:1234
Calvary TV  :  udp://@239.255.1.85:1234
Rakshana TV  :  udp://@239.255.1.83:1234
RUJUMARGAM TV  :  udp://@239.255.1.240:1234
Nick  :  udp://@239.255.1.14:1234
Discovery Kids  :  udp://@239.255.1.252:1234
KUSHI TV  :  udp://@239.255.1.43:1234
Disney Channel  :  udp://@239.255.1.246:1234
SONY Yay!  :  udp://@239.255.1.77:1234
Discovery HD World Telugu  :  udp://@239.255.1.27:1234
History HD  :  udp://@239.255.1.44:1234
ETV Life HD  :  udp://@239.255.1.138:1234
Jai kisan  :  udp://@239.255.1.226:1234
Vanitha TV  :  udp://@239.255.1.18:1234
Fyi Tv18 H D  :  udp://@239.255.1.239:1234
STUDIO One+  :  udp://@239.255.2.204:1234
Discovery Telugu  :  udp://@239.255.1.50:1234
AP Prime Tv  :  udp://@239.255.1.179:1234
Mana TV  :  udp://@239.255.1.180:1234
BBC Earth HD  :  udp://@239.255.1.16:1234
CVR  HEALTH  :  udp://@239.255.1.89:1234
Shopping Zone  :  udp://@239.255.1.94:1234
naaptol Telugu  :  udp://@239.255.2.19:1234
Vissa  :  udp://@239.255.1.234:1234
Test Signal  :  udp://@239.255.1.12:1234
Sun Tv  :  udp://@239.255.1.192:1234
Zee Tamil  :  udp://@239.255.1.55:1234
Star Vijay  :  udp://@239.255.1.143:1234
KALAIGNAR ISAI ARUVI  :  udp://@239.255.1.136:1234
KALAIGNAR SIRIPPOLI  :  udp://@239.255.1.107:1234
KALAIGNAR  :  udp://@239.255.1.135:1234
Colors Tamil HD  :  udp://@239.255.1.59:1234
Asianet  :  udp://@239.255.1.117:1234
DD PODHIGAI  :  udp://@239.255.1.128:1234
MK TV  :  udp://@239.255.1.186:1234
Vendhar TV  :  udp://@239.255.1.101:1234
POLIMER TV  :  udp://@239.255.1.165:1234
WE  :  udp://@239.255.1.183:1234
CAPTAIN TV  :  udp://@239.255.1.190:1234
KTV  :  udp://@239.255.1.255:1234
Mk SIX  :  udp://@239.255.1.224:1234
Asianet Movies  :  udp://@239.255.1.207:1234
THANTHI TV  :  udp://@239.255.1.202:1234
NEWS 7 Tamil  :  udp://@239.255.1.23:1234
LOTUS NEWS  :  udp://@239.255.2.212:1234
VASANTH TV  :  udp://@239.255.1.254:1234
MANGALAM  :  udp://@239.255.1.161:1234
PUTHIYA THALAIMURAI  :  udp://@239.255.1.114:1234
CAPTAIN NEWS  :  udp://@239.255.1.189:1234
Polimer News  :  udp://@239.255.1.112:1234
Sathiyam TV  :  udp://@239.255.2.55:1234
Malaimurasu Seithigal  :  udp://@239.255.1.162:1234
Win TV  :  udp://@239.255.1.177:1234
News J  :  udp://@239.255.1.132:1234
MK TUNES  :  udp://@239.255.1.147:1234
7S MUSIC  :  udp://@239.255.1.168:1234
SVBC 2  :  udp://@239.255.1.24:1234
Sai TV  :  udp://@239.255.1.203:1234
MADHA TV  :  udp://@239.255.1.227:1234
Angel TV  :  udp://@239.255.1.120:1234
Nambikkai TV  :  udp://@239.255.1.149:1234
Discovery ID  :  udp://@239.255.1.2:1234
Discovery Tamil  :  udp://@239.255.2.45:1234
PUTHUYUGAM  :  udp://@239.255.1.188:1234
Asianet PLUS  :  udp://@239.255.1.49:1234
Tamil Naaptol  :  udp://@239.255.1.9:1234
Makkal TV  :  udp://@239.255.1.148:1234
Moon TV  :  udp://@239.255.1.133:1234
Colors HD  :  udp://@239.255.1.71:1234
Star Plus  :  udp://@239.255.1.30:1234
Zee TV  :  udp://@239.255.1.245:1234
SONY ENTERTAINMENT  :  udp://@239.255.1.134:1234
Colors Rishtey  :  udp://@239.255.1.241:1234
SONY SAB  :  udp://@239.255.1.139:1234
MANORANJAN TV  :  udp://@239.255.2.101:1234
DD NATIONAL HD  :  udp://@239.255.1.103:1234
SONY PIX  :  udp://@239.255.1.141:1234
Sony Pal  :  udp://@239.255.1.150:1234
SAHARA  One  :  udp://@239.255.1.200:1234
Dhamaal  :  udp://@239.255.2.123:1234
UTV Bindass  :  udp://@239.255.1.61:1234
Dangal  :  udp://@239.255.2.100:1234
Zee Action  :  udp://@239.255.1.20:1234
Enter 10  :  udp://@239.255.2.102:1234
B4U KADAK  :  udp://@239.255.2.126:1234
Wow Cinema  :  udp://@239.255.2.109:1234
CINEMA  TV  :  udp://@239.255.1.58:1234
Zee Cinema  :  udp://@239.255.1.248:1234
B4U Movies  :  udp://@239.255.1.37:1234
SONY MAX2  :  udp://@239.255.1.206:1234
SONY MAX  :  udp://@239.255.1.41:1234
MANORANJAN Movies  :  udp://@239.255.2.104:1234
HOUSEFULL MOVIES  :  udp://@239.255.1.253:1234
UTV ACTION  :  udp://@239.255.1.228:1234
OSCAR MOVIES Bhojpuri  :  udp://@239.255.2.17:1234
KHUSHBOO Tv  :  udp://@239.255.2.112:1234
UTV MOVIES  :  udp://@239.255.1.62:1234
MM MULTIPLEX  :  udp://@239.255.1.166:1234
Utv HD  :  udp://@239.255.1.178:1234
Colors CINEPLEX  :  udp://@239.255.1.63:1234
Colors Cineplex Hd  :  udp://@239.255.1.218:1234
Zee News  :  udp://@239.255.2.205:1234
RAJYA SABHA  :  udp://@239.255.1.215:1234
Lok Sabha TV  :  udp://@239.255.1.238:1234
DD NEWS  :  udp://@239.255.1.104:1234
Dd India  :  udp://@239.255.1.126:1234
Zee Hindustan  :  udp://@239.255.1.223:1234
Samay  :  udp://@239.255.1.74:1234
CNBC Awaz  :  udp://@239.255.1.32:1234
India 24x7 News  :  udp://@239.255.1.142:1234
DD Bangla  :  udp://@239.255.1.159:1234
DD Bharati  :  udp://@239.255.1.106:1234
NATIONAL VOICE  :  udp://@239.255.2.216:1234
TV100 NEWS  :  udp://@239.255.2.206:1234
NEWS NATION  :  udp://@239.255.2.182:1234
News World India  :  udp://@239.255.2.183:1234
TV9 bhartvarsh  :  udp://@239.255.2.185:1234
APN News  :  udp://@239.255.2.186:1234
News State MP CG  :  udp://@239.255.2.188:1234
News 11 Bharat  :  udp://@239.255.2.189:1234
News 1 India  :  udp://@239.255.2.191:1234
HNN 24x7  :  udp://@239.255.2.195:1234
Hindi Khabar  :  udp://@239.255.2.193:1234
Bharath Samachar  :  udp://@239.255.2.194:1234
Khabrain Abhi Tak  :  udp://@239.255.2.196:1234
Swaraj Express SMBC  :  udp://@239.255.2.192:1234
Total TV  :  udp://@239.255.2.184:1234
M Tunes+  :  udp://@239.255.1.17:1234
MASTII  :  udp://@239.255.2.121:1234
Zoom  :  udp://@239.255.1.196:1234
B4U Music  :  udp://@239.255.1.13:1234
9x JALWA  :  udp://@239.255.2.125:1234
Music India  :  udp://@239.255.2.118:1234
Mtv Beats  :  udp://@239.255.1.197:1234
ZEE ETC MUSIC  :  udp://@239.255.1.237:1234
Vh1 Hd  :  udp://@239.255.1.21:1234
Mh1 Music  :  udp://@239.255.1.53:1234
9 Xo  :  udp://@239.255.2.124:1234
SONY MIX  :  udp://@239.255.1.222:1234
Mtv HD Plus  :  udp://@239.255.1.1:1234
Aaho Music  :  udp://@239.255.2.40:1234
Showbox  :  udp://@239.255.2.93:1234
Peace Of Mind  :  udp://@239.255.1.243:1234
SRI SankaraTv  :  udp://@239.255.1.102:1234
Aastha Bhajan  :  udp://@239.255.2.217:1234
Vedic  :  udp://@239.255.2.218:1234
Divya  :  udp://@239.255.2.47:1234
Lord Buddha TV  :  udp://@239.255.1.153:1234
Jinvani Channel  :  udp://@239.255.2.43:1234
Ishwar /bhakti TV  :  udp://@239.255.1.217:1234
Sarthi TV  :  udp://@239.255.2.45:1234
Subharti TV  :  udp://@239.255.2.46:1234
SHUBHASANDESH  :  udp://@239.255.2.211:1234
Sharadha  :  udp://@239.255.1.26:1234
STAR SPORTS FIRST  :  udp://@239.255.1.115:1234
Sonic  :  udp://@239.255.1.35:1234
Nick Junior  :  udp://@239.255.1.15:1234
Hungama  :  udp://@239.255.1.45:1234
Pogo  :  udp://@239.255.1.7:1234
Nick HD+  :  udp://@239.255.1.194:1234
Marvel HQ  :  udp://@239.255.1.160:1234
Disney Junior  :  udp://@239.255.1.250:1234
ANIMAL PLANET HD  :  udp://@239.255.1.33:1234
TLC HD WORLD  :  udp://@239.255.1.70:1234
DISCOVERY SCIENCE  :  udp://@239.255.1.214:1234
Living Foodz  :  udp://@239.255.2.68:1234
Care WORLD  :  udp://@239.255.2.209:1234
Dillagi  :  udp://@239.255.2.103:1234
DD Kisan  :  udp://@239.255.1.213:1234
DD SPORTS  :  udp://@239.255.1.210:1234
DISNEY INTERNATIONAL HD  :  udp://@239.255.1.249:1234
COMEDY CENTRAL HD  :  udp://@239.255.1.137:1234
MN+ HD  :  udp://@239.255.1.65:1234
MOVIES NOW HD  :  udp://@239.255.1.67:1234
MNX HD  :  udp://@239.255.1.66:1234
Romedy Now HD  :  udp://@239.255.1.39:1234
HBO HD  :  udp://@239.255.1.164:1234
STAR MOVIES  :  udp://@239.255.1.51:1234
WB  :  udp://@239.255.1.5:1234
AXN  :  udp://@239.255.1.54:1234
CNN NEWS  :  udp://@239.255.1.29:1234
TIMES NOW HD  :  udp://@239.255.1.3:1234
BBC World News  :  udp://@239.255.1.201:1234
ET NOW  :  udp://@239.255.1.42:1234
REPUBLIC TV  :  udp://@239.255.2.207:1234
Cnbc TV 18  :  udp://@239.255.1.31:1234
MIRROR NOW  :  udp://@239.255.1.40:1234
Wion  :  udp://@239.255.1.93:1234
Russia Today  :  udp://@239.255.1.124:1234
NEWS9  :  udp://@239.255.2.208:1234
India Ahead  :  udp://@239.255.2.210:1234
CVR ENGLISH NEWS  :  udp://@239.255.1.97:1234
TRT WORLD HD  :  udp://@239.255.2.117:1234
DW  :  udp://@239.255.2.113:1234
CNN World  :  udp://@239.255.1.6:1234
ALJAZEERA HD  :  udp://@239.255.2.115:1234
CNBC PRIME HD  :  udp://@239.255.1.64:1234
Cartoon Network  :  udp://@239.255.1.10:1234
TV5 Monde  :  udp://@239.255.1.140:1234
DISCOVERY Turbo  :  udp://@239.255.1.221:1234
NHK WORLD TV  :  udp://@239.255.2.114:1234
NATIONAL GEOGRAPHIC  :  udp://@239.255.1.118:1234
NAT GEO WILD  :  udp://@239.255.1.8:1234
Colors INFINITY  HD  :  udp://@239.255.1.170:1234
ANIMAL  PLANET  :  udp://@239.255.1.100:1234
Food Food  :  udp://@239.255.2.39:1234
STAR SPORTS 1 HD  :  udp://@239.255.1.19:1234
SONY SIX  :  udp://@239.255.1.34:1234
SONY TEN1 HD  :  udp://@239.255.1.251:1234
SONY  TEN3 HD  :  udp://@239.255.1.219:1234
SONY ESPN  :  udp://@239.255.1.75:1234
SONY TEN2 HD  :  udp://@239.255.1.38:1234
STAR SPORTS 3  :  udp://@239.255.1.209:1234
STAR SPORTS 2  :  udp://@239.255.1.4:1234
EuroSport HD  :  udp://@239.255.1.130:1234
COLORS KANNADA  :  udp://@239.255.1.156:1234
Tv9 Kannada  :  udp://@239.255.2.203:1234
Zee Kannada  :  udp://@239.255.1.195:1234
Colors SUPER  :  udp://@239.255.1.36:1234
KASTHURI  :  udp://@239.255.2.108:1234
PRAJAA TV  :  udp://@239.255.2.116:1234
DD CHANDANA  :  udp://@239.255.1.56:1234
Dighvijay 24x7 News  :  udp://@239.255.2.41:1234
PUBLIC MUSIC  :  udp://@239.255.1.187:1234
Star Suvarna  :  udp://@239.255.1.235:1234
Kannada Naaptol  :  udp://@239.255.1.176:1234
Ayush TV  :  udp://@239.255.1.151:1234
UDAYA TV  :  udp://@239.255.1.78:1234
Colors Oriya  :  udp://@239.255.2.61:1234
Odisha TV  :  udp://@239.255.2.201:1234
Zee Sarthak  :  udp://@239.255.1.91:1234
KALINGA TV  :  udp://@239.255.2.106:1234
PRAMEYA NEWS 7  :  udp://@239.255.2.111:1234
Naxatra News  :  udp://@239.255.1.171:1234
MBC TV  :  udp://@239.255.1.28:1234
NEWS 18 Oriya  :  udp://@239.255.2.62:1234
Mazhavil Manorama HD  :  udp://@239.255.1.57:1234
Zee Kerelam  :  udp://@239.255.2.63:1234
DD MALAYALAM  :  udp://@239.255.1.191:1234
PEOPLE TV  :  udp://@239.255.1.182:1234
Kairali TV  :  udp://@239.255.1.146:1234
Kappa TV  :  udp://@239.255.2.99:1234
Safari TV  :  udp://@239.255.2.171:1234
Kaumudy  :  udp://@239.255.2.175:1234
Mathrubhumi news  :  udp://@239.255.2.90:1234
Media One TV  :  udp://@239.255.2.172:1234
janam  :  udp://@239.255.1.230:1234
SHALOM TV  :  udp://@239.255.2.174:1234
ATE TV  :  udp://@239.255.2.176:1234
4 TV News  :  udp://@239.255.2.213:1234
News 18 Urdu  :  udp://@239.255.1.25:1234
SANGEET BHOJPURI  :  udp://@239.255.2.119:1234
9x JHAKAAS  :  udp://@239.255.2.120:1234
Tv9 Marathi  :  udp://@239.255.2.215:1234
DD URDU  :  udp://@239.255.1.131:1234
MUSIC F  :  udp://@239.255.1.220:1234
Tv9 Gujarati  :  udp://@239.255.2.214:1234
COLORS BANGLA  :  udp://@239.255.1.205:1234
PTC NEWS  :  udp://@239.255.2.177:1234
PTC PUNJABI  :  udp://@239.255.2.178:1234
PTC Chak De  :  udp://@239.255.2.179:1234
Pitaara TV  :  udp://@239.255.2.180:1234
NEPAL 1  :  udp://@239.255.2.181:1234
Aalami Samay  :  udp://@239.255.1.198:1234
SP-01 (CEC-UGC)  :  udp://@239.255.2.1:1234
SP-02 (CEC-UGC)  :  udp://@239.255.2.2:1234
SP-03 (CEC-UGC)  :  udp://@239.255.2.3:1234
SP-04 (CEC-UGC)  :  udp://@239.255.2.4:1234
SP-05 (CEC-UGC)  :  udp://@239.255.2.5:1234
SP-06 (CEC-UGC)  :  udp://@239.255.2.6:1234
SP-07 ( CEC-UGC)  :  udp://@239.255.2.7:1234
SP-08 ( CEC-UGC)  :  udp://@239.255.2.:1234
SP-09 (CEC-UGC)  :  udp://@239.255.2.:1234
SP-10 (CEC-UGC)  :  udp://@239.255.2.:1234
SP-11 (NPTEL)  :  udp://@239.255.2.:1234
SP-12 (NPTEL)  :  udp://@239.255.2.:1234
SP-13 (NPTEL)  :  udp://@239.255.2.:1234
SP-14 (NPTEL)  :  udp://@239.255.2.:1234
SP-15 (NPTEL)  :  udp://@239.255.2:1234
SP-16 (NPTEL)  :  udp://@239.255.2.:1234
SP-17 (NPTEL)  :  udp://@239.255.2.:1234
SP-18 (NPTEL)  :  udp://@239.255.2.18:1234
SP-19 (IIT PAL)  :  udp://@239.255.2.:1234
SP-20 (IIT PAL)  :  udp://@239.255.2.20:1234
SP-21 (IIT PAL)  :  udp://@239.255.2.21:1234
SP-22 (IIT PAL)  :  udp://@239.255.2.22:1234
SP-23 (IGNOU)  :  udp://@239.255.2.23:1234
SP-24 (IGNOU)  :  udp://@239.255.2.24:1234
SP-25 (IGNOU)  :  udp://@239.255.2.25:1234
SP-26 (IGNOU)  :  udp://@239.255.2.:1234
SP-27 (NIOS)  :  udp://@239.255.2.27:1234
SP-28 (NIOS)  :  udp://@239.255.2.28:1234
SP-29 (QEEE)  :  udp://@239.255.2.29:1234
SP-30 (NPTEL)  :  udp://@239.255.2.30:1234
SP-31 (NCERT)  :  udp://@239.255.2.31:1234
SP-32 (IGNOU & NIOS)  :  udp://@239.255.2.32:1234
SP-33 (CEC-UGC)  :  udp://@239.255.2.33:1234
DIGI SHALA  :  udp://@239.255.2.34:1234
Air Vijayawada  :  udp://@239.255.2.35:1234
Air Telugu  :  udp://@239.255.2.36:1234
AIR Vividh Bharati  :  udp://@239.255.2.27:1234
Swara Sagar  :  udp://@239.255.1.244:1234

```
📄𝒩ℴ𝓉ℯ: Assessment of commercial companies requires a certification such as Certified Ethical Hacker(Not limited to CEH) but for personal tests not at all needed, go ahead. There are so many things i have not listed because the more you go the more it comes visible in this path. Find your own way and your own approach. Happy Hacking!!!!

### LINKS
APSFL 5.1 (.apk): [Download Here](/assets/apsfl/cb_apsfl.apk)
<br>URL'S (.txt file) : [Download Here](/assets/apsfl/cb_channels.txt)
<img src="/images/apsfl/1.png" width="500">