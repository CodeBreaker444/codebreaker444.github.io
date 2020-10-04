---
layout: post
title:  My Remote Dev. Setup👨‍💻 = IPAD📱 + Raspberrypi🥧 + VScode + Ngrok + Telegram BOT🤖
categories: [Networking, Raspberrypi]
---
The problem started when trying to figure out a way to code on my IPAD📱 while traveling light or in my class. As you know iPad runs on much appreciated IPAD OS which is a major improvement when compared to previous-gen operating systems. But for developers like us, we need a native Linux environment for running our code. Let's dig into the solution


The things I've tried:
### ⌛︎Emulation
- The obvious thing anyone would do is emulate the Linux environment on IPAD. But the problem is these IPA's(Apps) are not available in Appstore (You know how apple rules with restrictions). So, I have to sideload the IPA's and it's not that easy. Let me explain, My iPad 6th gen has an A10 Fusion chip inside which does not support untethered jailbreak but instead it supports semi-untethered jailbreak.

- So, the jailbreaking is a never-ending process because every night my iPad's charge will drain and it automatically shuts down and I have to do the jailbreak again with checkra1n (it uses checkmate bootrom hardware exploit). And of course, no software updates which are needed recently more than ever because of apple drastic feature updates.

- Let's dig into the more legal and less worrisome process. To sideload IPA by using Xcode debugging feature. Apple developer free program only allows 7 days expiry time for each of your applications and after that, you have to re-sign your IPA by connecting it to your mac🙅🏻‍♂️. Luckily, to automate this process we have altstore which does this process automatically by running an altserver on MacBook and re-signs IPA over wifi(cool right!).

- The application we will be using is [UTM](https://getutm.app). I have installed it through altstore and used it a few days but the filesystem is not integrated into the iPad filesystem and there are too many bugs in the emulation application (Not reliable for my work). Moreover, altstore needs to turn on your mac every 7 days to resign your IPA's and the apple free developer program only allow 10 App ID's most, and they can be only removed or replaced after 7 days.

- I even tried iSH (Available as a testflight app) which is an alternative to termux on android. It's cool to use alphine package manager but there is no networking support. So, you can't run webapps (I use nodejs, flask, django for most projects).

So, no to emulation no matter what the application offers. IPAD os is still not mature enough to support native linux emulation, may not be in future too.

## 〄Visual Studio Code + IPAD📱 + Raspberry PI🥧 = Production grade dev👨‍💻 environment
<p align="center"><img src="/images/vscode/1.jpg" width="400"></p>

Visual Studio Code is built using web technologies on top of Github's Electron. Electron is an app runtime for writing native apps that uses Chromium (which Google Chrome is built on) for rendering the interface and node. So, what I'm saying is visual studio code is a web app (I said in a simpler way).

Basically we can run vscode server on raspberrypi on access it through the browser on ipad we can do all our work on rpi and just use ipad as client (It's the best way I can think of).
This thought came from a service called [gitpod](https://gitpod.io)
which offers a development environment on cloud (Stumbled upon a random ad and it lead to this). 

To support our thought, their is an opensource repo [code-server](https://github.com/cdr/code-server) which does exactly what we intended to(mostly). But their is always a catch, and yes they did not have binary compiled for armv7l architecture (RPI B+). They thought pi could not handle cpu intensive code-server and they are right but it's not attended for large code-base, just big enough to get through the day. They also have the code-server available as node package which opens a path.

Installing the right node version >= 10 and then installing all the dependencies of code-server is some time consuming task. My advice is to install nodejs through binary release from official site and then install code-server.

- **Manually** install these dependencies through npm
```
@coder/logger: 1.1.16        
http-proxy: ^1.18.0          
limiter: ^1.1.5              
safe-buffer: ^5.1.1          
tar-fs: ^2.0.0               
xdg-basedir: ^4.0.0
env-paths: ^2.2.0            
httpolyglot: ^0.1.2          
pem: ^1.14.2                 
safe-compare: ^1.1.4         
tar: ^6.0.1                  
yarn: ^1.22.4
fs-extra: ^9.0.1             
js-yaml: ^3.13.1             
rotating-file-stream: ^2.1.1 
semver: ^7.1.3               
ws: ^7.2.0 
```
then install code-server
``` npm install -g code-server ```

I have changed some settings in  ``` ~/.config/code-server/config.yaml``` like
```
bind-addr: 0.0.0.0:8080
auth: password
password: yourpass
```
You can simple run code server by typing *code-server* in terminal hoping the path is set correctly. Now we can access vs code through ipad by typing the rpi ip followed by port. In my case ```192.168.1.210:8080```.

### ⌛︎<u>Accessing VS code remotely</u>
<p align="center"><img src="/images/vscode/2.jpg" width="400"></p>

- To access VS code remotely we need a static IP which is not provided by my ISP(premium feature) and moreover, we are behind a CGNAT-Carrier-Grade NAT (greedy ISP want more to put more clients under single static public IP). So, No port-forwarding.
- Next plan is try to use reverse SSH tunneling and forward the HTTP traffic🚦 to our localhost 8080. But for this we need a server to act as a tunnel but there are some freely available services such as [localhost.run](https://localhost.run). Which does work great until I decided to automate this process.
- See, localhost.run requires you to generate a public,private key pair and them to ssh-agent and then you can tunnel your traffic and it's secure (this is how ssh works too) but the problem is I was not able to start ssh-agent at boot for automation (it's a safety feature). I did not use ngrok because it generates new random subdomain(free plan) everytime I start the process and if I have to call somebody and make them turn on pi which is at home I have to know the url of the ngrok to access pi code-server. localhost.run generates the same subdomain every time based on our public key.
- Next, [localtunnel.me](https://theboroer.github.io/localtunnel-www/) you can install it through npm and it's pretty straightforward (I did know of these services beforehand but I don't want another un-necessary process if it can be achieved without external packages). We can request our subdomain here for free and it assigns it, if it is available. After setting up, I noticed that I cannot open VS Code U.I on browser and after some debugging, it is due to the fact localtunnel only supports HTTP protocol but VS code switches it's protocol to WebSocket for http handshake and further real-time communications.
- Ngrok, father of all introspected tunneling services. It has is limitations such as number of sessions, number of simultaneous connections..etc but for personal use, it does it's job (It supports 101 protocol switching).

But the problem with ngrok free service is, it always generates new subdomain (It's not static at least for free plan). We have to figure that out.

### ⌛︎<u>Telegram BOT🤖</u>
The solution looks like making things complicated but bear with me it's one of the best, if not "The best" solution for our use case. 

What it does is, when ngrok is launched successfully the script ```reverse_ssh_notify.sh``` which I have written sends me the URL of the ngrok tunnel service using Telegram BOT api Which is received by my telegram bot instantaneously as a normal telegram message.

### ⌛︎<u>Let's put everything together👍</u>

To make it as startup service, I created two service files and script for telegram bot api request which uses curl to send POST request.
1. code-server.service
2. reverse-ssh.service
3. reverse_ssh_notify.ssh
4. setup.sh (for automating the configuration)

These files are available [here](https://github.com/CodeBreaker444/raspberrypi-projects/tree/master/vscoding-server). You can directly run the setup.sh after installing the dependencies and it places all the necessary files in their locations and starts the services automatically.




  