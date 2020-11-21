---
layout: post
title:  How I managed💪🏻 to bypass safe exam browser security🛡 restrictions [Exam.net as Exam platform]
categories: [Hacking, Writeups]
---
This is a short write-up and don't use it to cheat in exams. If you do that you may find yourself in a position that you cannot go back and correct. Of course, this is meant only for educational purposes. And I only did it to satisfy my ego because people say that it is impenetrable(As I say nothing is 100% secure).


## Analysis🤯
First things first, Let's playback the security restrictions:
### Complete 🔒Lockdown
- SEB locks everything by taking control of the whole U.I and there is nothing you can do there. We can modify the opensource seb code but the signature of the code will be invalidated and you cannot enter the exam.

- SEB generates a browser exam key and validates it by sending it to the LMS(Learning management system) such as moodle, ilias, .etc.

- You cannot change the SEB configuration file because the hash signature is verified with the exam server by sending it through the header of GET request

- These are the header fields of SEB browser.

```
POST /api/exams/start/AHS12q HTTP/1.1
Host: exam.net
Connection: close
Content-Length: 109
Accept: application/json, text/javascript, */*; q=0.01
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Cookie: locale=en; _ga=GA1.2.108649575.1605877286; _gid=GA1.2.1874194135.1605877286; _gat_gtag_UA_106050498_1=1; XSRF-TOKEN=dummy; 
laravel_session=dummy; ebEU7euNC97NPEaiTdzcfjWCvC4vOSrqfU4tKRMk=dummy;
User-Agent: Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 SEB/3.1.0 (x64) EXAM_#MK#_NET_HARD
X-CSRF-TOKEN: oMm1LkHxohU6cLZHU4iua7u6YRocH0jpqmFYlWFo
X-Requested-With: XMLHttpRequest
X-SafeExamBrowser-ConfigKeyHash: 
X-SafeExamBrowser-RequestHash: 
Origin: https://exam.net
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://exam.net/init
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9
```
- We can change the hash signature by MITM by changing every request but we need a streamlined solution, not some over-complicated solution.

- I started playing with the parameters and found out that exam.net is just verifying the `User-Agent`(header value) and `X-SafeExamBrowser-RequestHash` (header field name) but not the hash itself. As of writing this writeup, exam.net doesn't support browser exam key verification. So, we can change the headers by using simple browser extensions and make exam.net think that we are in high-security mode. But it will not work with LMS such as moodle because they have plugin support to enable browser key verification. Check out the diagram i have created(It's not the official one but a projection of my understanding).

<p align="center"><img src="/images/2020-11-21-Bypass-Safe-Exam-Browser-Restrictions.svg" width="400" alt="Bypass-Safe-Exam-Browser-Restrictions"></p>

### 🕵️‍♀️Virtual Machine Detection

- SEB detects almost all the Virtual machine software (vmware, virutalbox, parallels desktop, ..etc). It refuses to start in virtual machine at all.

- With SEB 2.0 the architecture is more robust and does more security checks for VM detection.

- But bypassing the detection will make it as a universal solution independent of the Operating System.

## 🅱️ypassing Virtual Machine Detection

### Pre-requisites

We need to change the virtual machine configuration file .vmx located at your configured virtual machine files (Mostly in documents folder in windows).
1. Windows - VMware workstation, vmware player.
2. Mac -  VMware Fusion (Parallels does not have a config file to modify).
3. Linux - VMware workstation.

Note- I haven't tested with virutalbox but I recommend using only vmware products.

### Let's begin⌲

- Install windows in vmware and remember the virtual machine files location.

> **IMPORTANT**: Do not install vmware tools. SEB detects the vmware tools process and does not allow you to write the test.

- Let's change the .vmx configuration file and add the below line.
```
SMBIOS.reflectHost = "TRUE"
```
`This setting will make VM look like the host machine.`

- Now you can open the exam irrespective of the LMS because the code signature and hash verification never fail.

<p align="center"><img src="/images/2020-11-21-Bypass-Safe-Exam-Browser-Restrictions-1.png" width="400" alt="Bypass-Safe-Exam-Browser-Restrictions"></p>


## Some More things📕

### <u>MOODLE & ILIAS</u>
- Bypassing virtual machine detection will enable you to minimize the virtual machine and browse your computer as a normal pc.

- As I told you that changing `User-Agent` and `X-SafeExamBrowser-RequestHash` will allow you to write the exam in the same browser. But it will not work with MOODLE and ILIAS Lms has they have the capability to implement browser-exam-key security.
Anyways Bypassing the VM detection will do the trick.


### <u>EXAM .net</u>
- Exam.net has more liberal security integration with a safe exam browser. It provides the .seb config file to the browser and triggers the SEB to load the configuration and then it totally depends on the SEB security protocols and verify neither the integrity of the SEB code nor the Configuration file integrity.

- However, SEB allowed me to install VMware tools but when starting the exam inside the SEB, Exam.net blocked me by saying you cannot use this device.It is due to the fact the presence of VMware Tools. So, As mentioned above do not install VMware tools.

- There is another way to get past the VMware tools installation is by selecting `Launch Take a Test (WIN10)` which will allow you to get past the VMwaretools restriction and Virtual Machine Detection as it is not SEB (Take a Test is a Microsoft product).

<p align="center"><img src="/images/2020-11-21-Bypass-Safe-Exam-Browser-Restrictions-2.png" width="400" alt="Bypass-Safe-Exam-Browser-Restrictions"></p>

- Without the Virtual Machine you can modify the headers to make exam.net think that you are using SEB.
1. Download `Simple Modify Header Extension` (Available for Firfox and Chrome)
2. Download my Config file from [here](/assets/seb-bypass/cb-headers.conf) and import it to the extenstion and save.


<p align="center"><img src="/images/2020-11-21-Bypass-Safe-Exam-Browser-Restrictions-3.png" width="400" alt="Bypass-Safe-Exam-Browser-Restrictions"></p>

> Manually you can configure the extension as below and start the extension

>Add HeaderField Name and Value:
`X-SafeExamBrowser-RequestHash` : `Anything`

>Modify HeaderFIeld Name and Value:
`User-Agent` : `Mozilla/5.0 SEB EXAM_#MK#_NET_HARD`

`Note: EXAM_#MK#_NET_HARD keyword is hardcoded and it may be changed in the future by exam.net. If so I will try to update the keyword in the blog.`

These are handcrafted requests because exam.net is using regex to check the User-Agent values. Those are mandatory and you can add anything in between the Mozilla and SEB.

- Now you can directly open the exam.net and it thinks that you are in High-Security Mode and allows you to write the exam without any cheat prevention measures(Copy and Paste are blocked).







  