---
layout: post
title: Hashcat Nvidia GeForce GTX 1070 Benchmark🚄, No bottlenecking🍾 (Updated!)
categories: [Hacking, Benchmarks]
---

Nvidia GeForce GTX 1070 is a beast in gaming and how is it going to do it in GPU Computing and i mean cracking hashes.Ofcourse it is better than cpu but how many times.See it with your own eyes and believe the advancements in GPU has took us from gaming to all the way the to scientific computing,Data Science,A.I,studying black holes..etc.

Benchmarking with a GPU will be pretty tricky when it comes to avoiding bottlenecking.I have faced the bottleneck when i ran the benchmark with a hdd instead of an SSD (This is my experience).So, as hdd are slow and my linux was installed on a old hdd it even slowed the hashcat to generate enough hashes to feed to my GPU and not only in benchmarking but it has effected my realtime cracking speed as it cannot read enough data but my GPU can perform it twenty time faster than the present speed.As soon as i upraded to Samsung 850 Evo SSD everything seem to be working fine.My GPU is at 97% utilisation and for the record it has 1920 cuda cores.The numbers in the benchmark are promising too.Now lets get to benchmarking….

### TEST BENCH SPECS:
- PROCESSOR : I7-7700K clocked at 4.7Ghz(Ofcourse i overclocked it..)
- RAM: 16GB clocked at 2993Mhz.
- GPU: EVGA GTX 1070 8GB
- SSD: 250GB.

### BENCHMARK RESULT NVIDIA GTX 1070:

```
hashcat (pull/1273/head) starting in benchmark mode…

* Device #1: WARNING! Kernel exec timeout is not disabled.
This may cause “CL_OUT_OF_RESOURCES” or related errors.
To disable the timeout, see: https://hashcat.net/q/timeoutpatch
* Device #2: Not a native Intel OpenCL runtime. Expect massive speed loss.
You can use –force to override, but do not report related errors.
OpenCL Platform #1: NVIDIA Corporation
======================================
* Device #1: GeForce GTX 1070, 2027/8110 MB allocatable, 15MCU

OpenCL Platform #2: The pocl project
====================================
* Device #2: pthread-Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz, skipped.

Hashtype: MD4

 

 

Speed.Dev.#1…..: 33425.2 MH/s (60.21ms)

Hashtype: MD5

 

Speed.Dev.#1…..: 18284.5 MH/s (55.04ms)

Hashtype: Half MD5

 

Speed.Dev.#1…..: 11303.5 MH/s (89.04ms)

Hashtype: SHA1

 

 

Speed.Dev.#1…..: 5993.1 MH/s (83.97ms)

Hashtype: SHA-256

 

Speed.Dev.#1…..: 2350.1 MH/s (53.32ms)

Hashtype: SHA-384

 

Speed.Dev.#1…..: 750.9 MH/s (83.77ms)

Hashtype: SHA-512

 

Speed.Dev.#1…..: 789.1 MH/s (79.72ms)

Hashtype: SHA-3 (Keccak)

 

Speed.Dev.#1…..: 614.0 MH/s (51.17ms)

Hashtype: SipHash

 

Speed.Dev.#1…..: 21262.6 MH/s (94.67ms)

Hashtype: Skip32 (PT = $salt, key = $pass)

 

Speed.Dev.#1…..: 4039.3 MH/s (8.29ms)

Hashtype: RIPEMD-160

 

Speed.Dev.#1…..: 3448.0 MH/s (72.96ms)

Hashtype: Whirlpool

 

Speed.Dev.#1…..: 179.9 MH/s (174.71ms)

Hashtype: GOST R 34.11-94

 

Speed.Dev.#1…..: 180.2 MH/s (87.26ms)

Hashtype: GOST R 34.11-2012 (Streebog) 256-bit

 

Speed.Dev.#1…..: 37570.8 kH/s (206.85ms)

Hashtype: GOST R 34.11-2012 (Streebog) 512-bit

 

Speed.Dev.#1…..: 37685.6 kH/s (206.22ms)

Hashtype: DES (PT = $salt, key = $pass)

 

Speed.Dev.#1…..: 13962.4 MH/s (72.06ms)

Hashtype: 3DES (PT = $salt, key = $pass)

 

Speed.Dev.#1…..: 441.7 MH/s (71.21ms)

Hashtype: phpass, WordPress (MD5), phpBB3 (MD5), Joomla (MD5)

 

 

Speed.Dev.#1…..: 5029.9 kH/s (96.65ms)

Hashtype: scrypt

 

Speed.Dev.#1…..: 513.7 kH/s (117.47ms)

Hashtype: PBKDF2-HMAC-MD5

 

Speed.Dev.#1…..: 5416.3 kH/s (59.31ms)

Hashtype: PBKDF2-HMAC-SHA1

 

Speed.Dev.#1…..: 2343.7 kH/s (86.55ms)

Hashtype: PBKDF2-HMAC-SHA256

 

Speed.Dev.#1…..: 886.2 kH/s (60.09ms)

Hashtype: PBKDF2-HMAC-SHA512

 

Speed.Dev.#1…..: 318.8 kH/s (87.90ms)

Hashtype: Skype

 

Speed.Dev.#1…..: 9658.9 MH/s (52.09ms)

Hashtype: WPA/WPA2

 

Speed.Dev.#1…..: 291.4 kH/s (52.49ms)

Hashtype: IKE-PSK MD5

 

Speed.Dev.#1…..: 1307.4 MH/s (95.85ms)

Hashtype: IKE-PSK SHA1

 

Speed.Dev.#1…..: 544.6 MH/s (57.68ms)

Hashtype: NetNTLMv1 / NetNTLMv1+ESS

 

Speed.Dev.#1…..: 14973.9 MH/s (67.20ms)

Hashtype: NetNTLMv2

 

Speed.Dev.#1…..: 1225.4 MH/s (51.32ms)

Hashtype: IPMI2 RAKP HMAC-SHA1

 

Speed.Dev.#1…..: 1235.0 MH/s (50.93ms)

Hashtype: Kerberos 5 AS-REQ Pre-Auth etype 23

 

Speed.Dev.#1…..: 214.5 MH/s (73.30ms)

Hashtype: Kerberos 5 TGS-REP etype 23

 

Speed.Dev.#1…..: 220.5 MH/s (71.31ms)

Hashtype: DNSSEC (NSEC3)

 

Speed.Dev.#1…..: 2505.9 MH/s (50.00ms)

Hashtype: PostgreSQL CRAM (MD5)

 

Speed.Dev.#1…..: 4938.6 MH/s (50.94ms)

Hashtype: MySQL CRAM (SHA1)

 

Speed.Dev.#1…..: 1699.8 MH/s (73.72ms)

Hashtype: SIP digest authentication (MD5)

 

Speed.Dev.#1…..: 1507.4 MH/s (83.13ms)

Hashtype: SMF (Simple Machines Forum) > v1.1

 

Speed.Dev.#1…..: 5129.0 MH/s (49.05ms)

Hashtype: vBulletin < v3.8.5

 

Speed.Dev.#1…..: 5121.4 MH/s (98.26ms)

Hashtype: vBulletin >= v3.8.5

 

Speed.Dev.#1…..: 3560.8 MH/s (70.66ms)

Hashtype: IPB2+ (Invision Power Board), MyBB 1.2+

 

Speed.Dev.#1…..: 3441.9 MH/s (73.09ms)

Hashtype: WBB3 (Woltlab Burning Board)

 

Speed.Dev.#1…..: 948.0 MH/s (66.35ms)

Hashtype: OpenCart

 

Speed.Dev.#1…..: 1502.4 MH/s (83.41ms)

Hashtype: Joomla < 2.5.18

 

Speed.Dev.#1…..: 17537.8 MH/s (57.37ms)

Hashtype: PHPS

Speed.Dev.#1…..: 5132.6 MH/s (49.01ms)

Hashtype: Drupal7

 

Speed.Dev.#1…..: 41224 H/s (92.89ms)

Hashtype: osCommerce, xt:Commerce

Speed.Dev.#1…..: 9538.8 MH/s (52.74ms)

Hashtype: PrestaShop

 

Speed.Dev.#1…..: 5956.6 MH/s (84.44ms)

Hashtype: Django (SHA-1)

Speed.Dev.#1…..: 5027.2 MH/s (50.01ms)

Hashtype: Django (PBKDF2-SHA256)

Speed.Dev.#1…..: 43144 H/s (72.70ms)

Hashtype: MediaWiki B type

 

Speed.Dev.#1…..: 4623.6 MH/s (54.34ms)

Hashtype: Redmine

 

Speed.Dev.#1…..: 1941.8 MH/s (64.45ms)

Hashtype: PunBB

Speed.Dev.#1…..: 1926.6 MH/s (64.95ms)

Hashtype: PostgreSQL

Speed.Dev.#1…..: 17166.3 MH/s (58.55ms)

Hashtype: MSSQL (2000)

 

Speed.Dev.#1…..: 6055.9 MH/s (83.05ms)

Hashtype: MSSQL (2005)

Speed.Dev.#1…..: 5806.4 MH/s (86.58ms)

Hashtype: MSSQL (2012, 2014)

 

Speed.Dev.#1…..: 760.5 MH/s (82.68ms)

Hashtype: MySQL323

 

Speed.Dev.#1…..: 39339.3 MH/s (51.14ms)

Hashtype: MySQL4.1/MySQL5

 

Speed.Dev.#1…..: 2608.1 MH/s (96.39ms)

Hashtype: Oracle H: Type (Oracle 7+)

 

Speed.Dev.#1…..: 667.2 MH/s (94.19ms)

Hashtype: Oracle S: Type (Oracle 11+)

 

Speed.Dev.#1…..: 5673.9 MH/s (88.61ms)

Hashtype: Oracle T: Type (Oracle 12+)

 

Speed.Dev.#1…..: 78161 H/s (98.01ms)

Hashtype: Sybase ASE

 

Speed.Dev.#1…..: 214.5 MH/s (73.27ms)

Hashtype: Episerver 6.x < .NET 4

 

Speed.Dev.#1…..: 4833.4 MH/s (51.98ms)

Hashtype: Episerver 6.x >= .NET 4

 

Speed.Dev.#1…..: 2033.9 MH/s (61.58ms)

Hashtype: Apache $apr1$ MD5, md5apr1, MD5 (APR)

 

Speed.Dev.#1…..: 7595.1 kH/s (63.71ms)

Hashtype: ColdFusion 10+

 

Speed.Dev.#1…..: 1313.0 MH/s (95.41ms)

Hashtype: hMailServer

 

Speed.Dev.#1…..: 2089.7 MH/s (59.94ms)

Hashtype: nsldap, SHA-1(Base64), Netscape LDAP SHA

Speed.Dev.#1…..: 5985.7 MH/s (84.04ms)

Hashtype: nsldaps, SSHA-1(Base64), Netscape LDAP SSHA

Speed.Dev.#1…..: 5981.6 MH/s (84.10ms)

Hashtype: SSHA-256(Base64), LDAP {SSHA256}

 

Speed.Dev.#1…..: 2351.4 MH/s (53.27ms)

Hashtype: SSHA-512(Base64), LDAP {SSHA512}

 

Speed.Dev.#1…..: 781.9 MH/s (80.40ms)

Hashtype: LM

 

Speed.Dev.#1…..: 13828.1 MH/s (72.73ms)

Hashtype: NTLM

 

Speed.Dev.#1…..: 29425.1 MH/s (68.37ms)

Hashtype: Domain Cached Credentials (DCC), MS Cache

 

Speed.Dev.#1…..: 8559.1 MH/s (58.77ms)

Hashtype: Domain Cached Credentials 2 (DCC2), MS Cache 2

 

Speed.Dev.#1…..: 239.1 kH/s (102.23ms)

Hashtype: DPAPI masterkey file v1 and v2

 

Speed.Dev.#1…..: 50727 H/s (51.50ms)

Hashtype: MS-AzureSync PBKDF2-HMAC-SHA256

 

Speed.Dev.#1…..: 7634.4 kH/s (52.65ms)

Hashtype: descrypt, DES (Unix), Traditional DES

 

Speed.Dev.#1…..: 638.1 MH/s (98.34ms)

Hashtype: BSDi Crypt, Extended DES

 

Speed.Dev.#1…..: 1081.3 kH/s (75.24ms)

Hashtype: md5crypt, MD5 (Unix), Cisco-IOS $1$ (MD5)

 

Speed.Dev.#1…..: 7136.4 kH/s (67.72ms)

Hashtype: bcrypt $2*$, Blowfish (Unix)

 

Speed.Dev.#1…..: 10979 H/s (39.78ms)

Hashtype: sha256crypt $5$, SHA256 (Unix)

 

Speed.Dev.#1…..: 281.4 kH/s (86.56ms)

Hashtype: sha512crypt $6$, SHA512 (Unix)

 

Speed.Dev.#1…..: 113.6 kH/s (54.59ms)

Hashtype: OSX v10.4, OSX v10.5, OSX v10.6

Speed.Dev.#1…..: 5068.1 MH/s (49.62ms)

Hashtype: OSX v10.7

 

Speed.Dev.#1…..: 700.0 MH/s (89.83ms)

Hashtype: OSX v10.8+ (PBKDF2-SHA512)

Speed.Dev.#1…..: 9228 H/s (96.97ms)

Hashtype: AIX {smd5}

 

Speed.Dev.#1…..: 7540.0 kH/s (64.19ms)

Hashtype: AIX {ssha1}

 

Speed.Dev.#1…..: 32986.3 kH/s (52.51ms)

Hashtype: AIX {ssha256}

 

Speed.Dev.#1…..: 12732.7 kH/s (72.29ms)

Hashtype: AIX {ssha512}

 

Speed.Dev.#1…..: 4847.2 kH/s (95.63ms)

Hashtype: Cisco-PIX MD5

 

Speed.Dev.#1…..: 12032.9 MH/s (83.62ms)

Hashtype: Cisco-ASA MD5

 

Speed.Dev.#1…..: 12834.8 MH/s (78.39ms)

Hashtype: Cisco-IOS type 4 (SHA256)

Speed.Dev.#1…..: 2332.5 MH/s (53.70ms)

Hashtype: Cisco-IOS $8$ (PBKDF2-SHA256)

Speed.Dev.#1…..: 44015 H/s (71.31ms)

Hashtype: Cisco-IOS $9$ (scrypt)

 

clEnqueueNDRangeKernel(): CL_MEM_OBJECT_ALLOCATION_FAILURE

Speed.Dev.#1…..: 0 H/s (0.00ms)

Hashtype: Juniper NetScreen/SSG (ScreenOS)

Speed.Dev.#1…..: 9505.7 MH/s (52.92ms)

Hashtype: Juniper IVE

Speed.Dev.#1…..: 7571.6 kH/s (63.92ms)

Hashtype: Samsung Android Password/PIN

 

Speed.Dev.#1…..: 4015.3 kH/s (60.68ms)

Hashtype: Citrix NetScaler

 

Speed.Dev.#1…..: 5410.6 MH/s (92.98ms)

Hashtype: RACF

 

Speed.Dev.#1…..: 1938.0 MH/s (64.89ms)

Hashtype: GRUB 2

Speed.Dev.#1…..: 32343 H/s (96.97ms)

Hashtype: Radmin2

 

Speed.Dev.#1…..: 6187.7 MH/s (81.31ms)

Hashtype: SAP CODVN B (BCODE)

 

Speed.Dev.#1…..: 1767.5 MH/s (70.88ms)

Hashtype: SAP CODVN F/G (PASSCODE)

 

Speed.Dev.#1…..: 770.6 MH/s (81.61ms)

Hashtype: SAP CODVN H (PWDSALTEDHASH) iSSHA-1

 

Speed.Dev.#1…..: 4442.9 kH/s (54.73ms)

Hashtype: Lotus Notes/Domino 5

 

Speed.Dev.#1…..: 160.4 MH/s (97.99ms)

Hashtype: Lotus Notes/Domino 6

 

Speed.Dev.#1…..: 54212.0 kH/s (72.50ms)

Hashtype: Lotus Notes/Domino 8

 

Speed.Dev.#1…..: 487.2 kH/s (100.03ms)

Hashtype: PeopleSoft

Speed.Dev.#1…..: 6122.6 MH/s (82.17ms)

Hashtype: PeopleSoft PS_TOKEN

 

Speed.Dev.#1…..: 2402.4 MH/s (52.14ms)

Hashtype: 7-Zip

 

Speed.Dev.#1…..: 7035 H/s (67.92ms)

Hashtype: WinZip

 

Speed.Dev.#1…..: 804.6 kH/s (66.20ms)

Hashtype: RAR3-hp

 

Speed.Dev.#1…..: 24198 H/s (79.27ms)

Hashtype: RAR5

 

Speed.Dev.#1…..: 27291 H/s (70.24ms)

Hashtype: AxCrypt

 

Speed.Dev.#1…..: 87439 H/s (143.21ms)

Hashtype: AxCrypt in-memory SHA1

 

Speed.Dev.#1…..: 5693.6 MH/s (88.37ms)

Hashtype: TrueCrypt PBKDF2-HMAC-RIPEMD160 + XTS 512 bit

 

Speed.Dev.#1…..: 203.4 kH/s (71.63ms)

Hashtype: TrueCrypt PBKDF2-HMAC-SHA512 + XTS 512 bit

 

Speed.Dev.#1…..: 303.4 kH/s (85.69ms)

Hashtype: TrueCrypt PBKDF2-HMAC-Whirlpool + XTS 512 bit

 

Speed.Dev.#1…..: 27941 H/s (271.39ms)

Hashtype: TrueCrypt PBKDF2-HMAC-RIPEMD160 + XTS 512 bit + boot-mode

Speed.Dev.#1…..: 383.9 kH/s (66.13ms)

Hashtype: VeraCrypt PBKDF2-HMAC-RIPEMD160 + XTS 512 bit

Speed.Dev.#1…..: 618 H/s (73.87ms)

Hashtype: VeraCrypt PBKDF2-HMAC-SHA512 + XTS 512 bit

Speed.Dev.#1…..: 648 H/s (96.34ms)

Hashtype: VeraCrypt PBKDF2-HMAC-Whirlpool + XTS 512 bit

Speed.Dev.#1…..: 30 H/s (140.80ms)

Hashtype: VeraCrypt PBKDF2-HMAC-RIPEMD160 + XTS 512 bit + boot-mode

Speed.Dev.#1…..: 1267 H/s (73.85ms)

Hashtype: VeraCrypt PBKDF2-HMAC-SHA256 + XTS 512 bit

 

Speed.Dev.#1…..: 840 H/s (73.40ms)

Hashtype: VeraCrypt PBKDF2-HMAC-SHA256 + XTS 512 bit + boot-mode

Speed.Dev.#1…..: 2113 H/s (73.46ms)

Hashtype: Android FDE <= 4.3

 

Speed.Dev.#1…..: 599.9 kH/s (50.68ms)

Hashtype: Android FDE (Samsung DEK)

 

Speed.Dev.#1…..: 217.9 kH/s (70.29ms)

Hashtype: eCryptfs

 

Speed.Dev.#1…..: 9897 H/s (96.78ms)

Hashtype: MS Office <= 2003 $0/$1, MD5 + RC4

 

Speed.Dev.#1…..: 173.4 MH/s (90.68ms)

Hashtype: MS Office <= 2003 $0/$1, MD5 + RC4, collider #1

 

Speed.Dev.#1…..: 245.8 MH/s (63.96ms)

Hashtype: MS Office <= 2003 $3/$4, SHA1 + RC4

 

Speed.Dev.#1…..: 224.4 MH/s (70.06ms)

Hashtype: MS Office <= 2003 $3, SHA1 + RC4, collider #1

 

Speed.Dev.#1…..: 250.6 MH/s (62.72ms)

Hashtype: MS Office 2007

 

Speed.Dev.#1…..: 96808 H/s (51.94ms)

Hashtype: MS Office 2010

 

Speed.Dev.#1…..: 48416 H/s (51.92ms)

Hashtype: MS Office 2013

 

Speed.Dev.#1…..: 6495 H/s (96.64ms)

Hashtype: PDF 1.1 – 1.3 (Acrobat 2 – 4)

 

Speed.Dev.#1…..: 256.8 MH/s (61.21ms)

Hashtype: PDF 1.1 – 1.3 (Acrobat 2 – 4), collider #1

 

Speed.Dev.#1…..: 279.8 MH/s (112.37ms)

Hashtype: PDF 1.4 – 1.6 (Acrobat 5 – 8)

 

Speed.Dev.#1…..: 12686.7 kH/s (37.47ms)

Hashtype: PDF 1.7 Level 3 (Acrobat 9)

Speed.Dev.#1…..: 2340.0 MH/s (53.54ms)

Hashtype: PDF 1.7 Level 8 (Acrobat 10 – 11)

 

Speed.Dev.#1…..: 24155 H/s (264.88ms)

Hashtype: Password Safe v2

 

Speed.Dev.#1…..: 237.3 kH/s (41.39ms)

Hashtype: Password Safe v3

 

Speed.Dev.#1…..: 903.8 kH/s (61.63ms)

Hashtype: LastPass + LastPass sniffed

 

Speed.Dev.#1…..: 1755.7 kH/s (51.65ms)

Hashtype: 1Password, agilekeychain

 

Speed.Dev.#1…..: 2423.6 kH/s (100.02ms)

Hashtype: 1Password, cloudkeychain

 

Speed.Dev.#1…..: 8092 H/s (96.63ms)

Hashtype: Bitcoin/Litecoin wallet.dat

 

Speed.Dev.#1…..: 3228 H/s (96.77ms)

Hashtype: Blockchain, My Wallet

 

Speed.Dev.#1…..: 53380.4 kH/s (18.04ms)

Hashtype: Blockchain, My Wallet, V2

Speed.Dev.#1…..: 241.6 kH/s (50.72ms)

Hashtype: KeePass 1 (AES/Twofish) and KeePass 2 (AES)

 

Speed.Dev.#1…..: 103.4 kH/s (201.97ms)

Hashtype: JKS Java Key Store Private Keys (SHA1)

 

Speed.Dev.#1…..: 5777.3 MH/s (87.09ms)

Hashtype: Ethereum Wallet, PBKDF2-HMAC-SHA256

 

Speed.Dev.#1…..: 3331 H/s (71.41ms)

Hashtype: ArubaOS

Speed.Dev.#1…..: 4865.4 MH/s (51.69ms)

Hashtype: ChaCha20

 

Speed.Dev.#1…..: 3188.2 MH/s (78.90ms)
```