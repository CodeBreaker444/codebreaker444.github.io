---
layout: post
title: Vulnerability Assessment Writeup📄🕵️‍♀️☠️ -How i hacked heartynote for complete account takeover
categories: [Hacking, Writeups]
---
This is an assessment writeup so, it will be short and in-depth. These writeups are written only after a patch has been released and only use it for educational purpose.

Before we get into details, there are few things to consider:
0. No permanent damage is done to the platform code or to the servers.
1. This vulnerability is already patched and don’t waste your time in replicating it on heartynote.
2. This is not a DDOS attack and i recommend you not to do it too.
3. This writeup doesn’t provide a step by step by instruction to hack anything but gives you the basic idea behind the approach.
4. Last but not least this is only for educational purpose.


### Approach:
- Analysis (Mobile and Web platform which includes API’s).
- Finding a vulnerability (zero-day hack)
- Writing a payload (I have written a messy python script. It will be available in my github repo after cleaning the code a bit.)
- Optimize the payload and isolate it in a v-env (Ex: Use systemwide VPN, Force ip-spoof in the payload, I used threading for faster execution)
- Choosing a payload delivery method (I choose API endpoints to deliver the payload)
- Start the execution (BOOM!!!)

### Analysis
I started identifying the platform they using which includes next.js and backend API’s some are written in python and some are in other languages(which doesn’t matter excluding php). PHP is more vulnerable compared to these backend javascript frameworks such as express, next.js..etc. They are event based and are difficult to analyse and i did not choose the web platform because it is difficult to analyse the API’s there, so i went with the android platform. I used SSL-Unpinning to decrypt the json parameter and noted down the parameters and header names.

### Vulnerability
No IP-Ratelimiting and No implementation reset code counter and the password reset code is a 4 digit number from 0 to 9 with a total possibilities of 10000 (104 ) combinations which opens a way for bruteforceing but with a different approach because it’s not php .

### Payload
I was in a hurry and i don’t really like the pre-built tools because of the absence of multi-threading which drastically reduces the time. So, i started writing a messy python script with the support of prallel processing controlled by a semaphore.(Easyyy!!took 30mins because of the multiple json parameters.) Burpsuite is a pain in the a** when dealing mobile apps operating with SSL and From 7.0 nougat android doesn’t trust user installed C.A certificates.

### Optimising & Isolation
Find combinations recursively takes time. So,i have written a simple but elegant non-recursive algo and wrapped in a definition and forced IP-address to be 00:00:00:00:00:00, System wide VPN enabled!!.

### Delivery Method
API endpoints

### Execution
python3 bruteforcer.py (I am so lazy that i hardcoded the required parameters into the code itself.)

### Result
Within two minutes i have compromised the Heartynote Founders Account.

Finally, N̶0̶ S̶y̶5̶t̶3̶m̶ 1̶s̶ S̶@f̶3̶ dot!

📎📎POH's Attached below (#update: POH's removed due to privacy issues)

📄𝒩ℴ𝓉ℯ: Assessment of commercial companies requires a certification such as Certified Ethical Hacker(Not limited to CEH) but for personal tests not at all needed, go ahead. There are so many things i have not listed because the more you go the more it comes visible in this path. Find your own way and your own approach. Happy Hacking!!!!

MISSYOU TOOL: Github([link](https://github.com/CodeBreaker444/MissYou-A-tool-to-bruteforce-4-digit-pin-OTP-using-API-endpoints))

![](/images/2019-08-01-How-i-hacked-heartynote-1.png)