---
layout: docs
title: VBus Packets
---



## Table of Contents

- [Broadcast (0x0000) <= WMZ #0 (0x4010), command 0x0100](#0000_4010_0100)
- [Broadcast (0x0000) <= HKM1 #0 (0x4420), command 0x0100](#0000_4420_0100)
- [Broadcast (0x0000) <= HKM2 (0x6510), command 0x0100](#0000_6510_0100)
- [Broadcast (0x0000) <= MSR65 #0 (0x6520), command 0x0100](#0000_6520_0100)
- [Broadcast (0x0000) <= EM #0 (0x6650), command 0x0100](#0000_6650_0100)
- [DFA (0x0010) <= DL3 (0x0053), command 0x0100](#0010_0053_0100)
- [DFA (0x0010) <= DeltaSol SLT \[Regler\] (0x1001), command 0x0100](#0010_1001_0100)
- [DFA (0x0010) <= DeltaSol SLT \[WMZ #0\] (0x1010), command 0x0100](#0010_1010_0100)
- [DFA (0x0010) <= DeltaSol E V2 HK 1 Estrichtrockung \[Modul 1\] (0x1040), command 0x0100](#0010_1040_0100)
- [DFA (0x0010) <= DeltaSol E V2 \[Regler\] (0x1050), command 0x0100](#0010_1050_0100)
- [DFA (0x0010) <= DeltaSol E V2 \[WMZ\] (0x1051), command 0x0100](#0010_1051_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[Regler\] (0x1052), command 0x0100](#0010_1052_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[Module\] (0x1053), command 0x0100](#0010_1053_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[Heizkreis 1\] (0x1054), command 0x0100](#0010_1054_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[Heizkreis 2\] (0x1055), command 0x0100](#0010_1055_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[WMZ 1\] (0x1056), command 0x0100](#0010_1056_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[WMZ 2\] (0x1057), command 0x0100](#0010_1057_0100)
- [DFA (0x0010) <= Caleffi Biomassa (0x1058), command 0x0100](#0010_1058_0100)
- [DFA (0x0010) <= Vitosolic 200 \[Regler\] (0x1060), command 0x0100](#0010_1060_0100)
- [DFA (0x0010) <= Unknown device (0x1064), command 0x0100](#0010_1064_0100)
- [DFA (0x0010) <= DeltaSol AL-E (0x1120), command 0x0100](#0010_1120_0100)
- [DFA (0x0010) <= DeltaSol CS Plus (0x2211), command 0x0100](#0010_2211_0100)
- [DFA (0x0010) <= Oranier HK \[Regler\] (0x2231), command 0x0100](#0010_2231_0100)
- [DFA (0x0010) <= Oranier HK \[WMZ1\] (0x2232), command 0x0100](#0010_2232_0100)
- [DFA (0x0010) <= DeltaSol SL \[Regler\] (0x2251), command 0x0100](#0010_2251_0100)
- [DFA (0x0010) <= DeltaSol SL \[WMZ1\] (0x2252), command 0x0100](#0010_2252_0100)
- [DFA (0x0010) <= DeltaSol SLL \[Regler\] (0x2271), command 0x0100](#0010_2271_0100)
- [DFA (0x0010) <= DeltaSol SLL \[WMZ1\] (0x2272), command 0x0100](#0010_2272_0100)
- [DFA (0x0010) <= WMZ-L10 (0x3011), command 0x0100](#0010_3011_0100)
- [DFA (0x0010) <= EL1 (0x3211), command 0x0100](#0010_3211_0100)
- [DFA (0x0010) <= DeltaSol Pro (0x3221), command 0x0100](#0010_3221_0100)
- [DFA (0x0010) <= DeltaSol B (0x3231), command 0x0100](#0010_3231_0100)
- [DFA (0x0010) <= DT4 \(B\) (0x3241), command 0x0100](#0010_3241_0100)
- [DFA (0x0010) <= DeltaSol BS (0x3251), command 0x0100](#0010_3251_0100)
- [DFA (0x0010) <= ConergyDT5 (0x3271), command 0x0100](#0010_3271_0100)
- [DFA (0x0010) <= Diemasol C (0x3311), command 0x0100](#0010_3311_0100)
- [DFA (0x0010) <= DeltaSol AL (0x4111), command 0x0100](#0010_4111_0100)
- [DFA (0x0010) <= SKSC1/2 (0x4211), command 0x0100](#0010_4211_0100)
- [DFA (0x0010) <= DeltaSol C (0x4212), command 0x0100](#0010_4212_0100)
- [DFA (0x0010) <= SKSC2 HE (0x4213), command 0x0100](#0010_4213_0100)
- [DFA (0x0010) <= SKSC2 HE (0x4214), command 0x0100](#0010_4214_0100)
- [DFA (0x0010) <= DeltaSol BS Plus (0x4221), command 0x0100](#0010_4221_0100)
- [DFA (0x0010) <= DeltaSol BS Plus BTU (0x4223), command 0x0100](#0010_4223_0100)
- [DFA (0x0010) <= CS2.2 (0x4224), command 0x0100](#0010_4224_0100)
- [DFA (0x0010) <= Frista (0x4231), command 0x0100](#0010_4231_0100)
- [DFA (0x0010) <= Huber - REGLOfresh / Felix \[Regler\] (0x4241), command 0x0100](#0010_4241_0100)
- [DFA (0x0010) <= DSPlus UMSYS \[Regler\] (0x4251), command 0x0100](#0010_4251_0100)
- [DFA (0x0010) <= BS Solex US (0x4252), command 0x0100](#0010_4252_0100)
- [DFA (0x0010) <= Aton DeltaSol BS (0x4265), command 0x0100](#0010_4265_0100)
- [DFA (0x0010) <= DeltaSol BS/DrainBack (0x4278), command 0x0100](#0010_4278_0100)
- [DFA (0x0010) <= DeltaSol BS/DrainBack \(Fahrenheit\) (0x4279), command 0x0100](#0010_4279_0100)
- [DFA (0x0010) <= DeltaSol BS 2009 (0x427B), command 0x0100](#0010_427B_0100)
- [DFA (0x0010) <= Drainback DeDietrich (0x4311), command 0x0100](#0010_4311_0100)
- [DFA (0x0010) <= DeltaSol MiniPool (0x4321), command 0x0100](#0010_4321_0100)
- [DFA (0x0010) <= DeltaSol D (0x5111), command 0x0100](#0010_5111_0100)
- [DFA (0x0010) <= Speicherofenregler (0x5112), command 0x0100](#0010_5112_0100)
- [DFA (0x0010) <= FriwaMini (0x5121), command 0x0100](#0010_5121_0100)
- [DFA (0x0010) <= Tuxhorn PKE (0x5141), command 0x0100](#0010_5141_0100)
- [DFA (0x0010) <= DeltaSol Plus (0x5210), command 0x0100](#0010_5210_0100)
- [DFA (0x0010) <= DT4 \(MS\) (0x5221), command 0x0100](#0010_5221_0100)
- [DFA (0x0010) <= nemux (0x5231), command 0x0100](#0010_5231_0100)
- [DFA (0x0010) <= Frischwasserregler (0x5251), command 0x0100](#0010_5251_0100)
- [DFA (0x0010) <= X-Control (0x5311), command 0x0100](#0010_5311_0100)
- [DFA (0x0010) <= DeltaTherm HC \[Regler\] (0x5400), command 0x0100](#0010_5400_0100)
- [DFA (0x0010) <= DeltaTherm HC \[Heizkreis #0\] (0x5410), command 0x0100](#0010_5410_0100)
- [DFA (0x0010) <= DeltaTherm HC \[WMZ #0\] (0x5420), command 0x0100](#0010_5420_0100)
- [DFA (0x0010) <= EL2/3 (0x5510), command 0x0100](#0010_5510_0100)
- [DFA (0x0010) <= DeltaTherm FK (0x5611), command 0x0100](#0010_5611_0100)
- [DFA (0x0010) <= Midi Pro (0x6610), command 0x0100](#0010_6610_0100)
- [DFA (0x0010) <= SunGo XL (0x6620), command 0x0100](#0010_6620_0100)
- [DFA (0x0010) <= DeltaSol BX WMZ (0x7101), command 0x0100](#0010_7101_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[Regler\] (0x7112), command 0x0100](#0010_7112_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[Module\] (0x7113), command 0x0100](#0010_7113_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[Heizkreis #0\] (0x7120), command 0x0100](#0010_7120_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[WMZ #0\] (0x7130), command 0x0100](#0010_7130_0100)
- [DFA (0x0010) <= DeltaSol BX Pro\[Regler\] (0x7140), command 0x0100](#0010_7140_0100)
- [DFA (0x0010) <= DeltaSol BX Pro\[WMZ #0\] (0x7150), command 0x0100](#0010_7150_0100)
- [DFA (0x0010) <= SKSC3HE (0x7160), command 0x0100](#0010_7160_0100)
- [DFA (0x0010) <= SKSC3HE \[HK1\] (0x7161), command 0x0100](#0010_7161_0100)
- [DFA (0x0010) <= SKSC3HE \[HK2\] (0x7162), command 0x0100](#0010_7162_0100)
- [DFA (0x0010) <= SKSC3HE \[HK3\] (0x7163), command 0x0100](#0010_7163_0100)
- [DFA (0x0010) <= SKSR 1/2/3 (0x7210), command 0x0100](#0010_7210_0100)
- [DFA (0x0010) <= SKSC3 \[HK1\] (0x7211), command 0x0100](#0010_7211_0100)
- [DFA (0x0010) <= SKSC3 \[HK2\] (0x7212), command 0x0100](#0010_7212_0100)
- [DFA (0x0010) <= SKSC3 \[HK3\] (0x7213), command 0x0100](#0010_7213_0100)
- [DFA (0x0010) <= DrainBloC (0x7221), command 0x0100](#0010_7221_0100)
- [DFA (0x0010) <= SC25 (0x7231), command 0x0100](#0010_7231_0100)
- [DFA (0x0010) <= DeltaSol M \[Regler\] (0x7311), command 0x0100](#0010_7311_0100)
- [DFA (0x0010) <= DeltaSol M \[HK1\] (0x7312), command 0x0100](#0010_7312_0100)
- [DFA (0x0010) <= DeltaSol M \[Volumen\] (0x7315), command 0x0100](#0010_7315_0100)
- [DFA (0x0010) <= DeltaSol M \[WMZ1\] (0x7316), command 0x0100](#0010_7316_0100)
- [DFA (0x0010) <= Vitosolic 200 \[Regler\] (0x7321), command 0x0100](#0010_7321_0100)
- [DFA (0x0010) <= Vitosolic 200 \[WMZ1\] (0x7326), command 0x0100](#0010_7326_0100)
- [DFA (0x0010) <= SLR (0x7331), command 0x0100](#0010_7331_0100)
- [DFA (0x0010) <= SLR-Erweiterungsmodul #01 (0x7332), command 0x0100](#0010_7332_0100)
- [DFA (0x0010) <= SLR-Erweiterungsmodul #02 (0x7333), command 0x0100](#0010_7333_0100)
- [DFA (0x0010) <= SLR-Erweiterungsmodul #03 (0x7334), command 0x0100](#0010_7334_0100)
- [DFA (0x0010) <= SLR-Erweiterungsmodul #04 (0x7335), command 0x0100](#0010_7335_0100)
- [DFA (0x0010) <= SLR XT (0x7341), command 0x0100](#0010_7341_0100)
- [DFA (0x0010) <= SLR XT-Erweiterungsmodul 1 (0x7342), command 0x0100](#0010_7342_0100)
- [DFA (0x0010) <= SLR XT-Erweiterungsmodul 2 (0x7343), command 0x0100](#0010_7343_0100)
- [DFA (0x0010) <= SLR XT-Erweiterungsmodul 3 (0x7344), command 0x0100](#0010_7344_0100)
- [DFA (0x0010) <= SLR XT-Erweiterungsmodul 4 (0x7345), command 0x0100](#0010_7345_0100)
- [DFA (0x0010) <= SLR XT-Erweiterungsmodul 5 (0x7346), command 0x0100](#0010_7346_0100)
- [DFA (0x0010) <= DeltaSol ES (0x7411), command 0x0100](#0010_7411_0100)
- [DFA (0x0010) <= DeltaSol BX (0x7421), command 0x0100](#0010_7421_0100)
- [DFA (0x0010) <= DeltaSol BXL (0x7428), command 0x0100](#0010_7428_0100)
- [DFA (0x0010) <= ZEN DT6 \[Regler\] (0x7441), command 0x0100](#0010_7441_0100)
- [DFA (0x0010) <= ZEN DT6 \[WMZ1\] (0x7442), command 0x0100](#0010_7442_0100)
- [DFA (0x0010) <= SOLTEX-Regler \[Teil 1\] (0x7511), command 0x0100](#0010_7511_0100)
- [DFA (0x0010) <= SOLTEX-Regler \[Teil 2\] (0x7512), command 0x0100](#0010_7512_0100)
- [DFA (0x0010) <= Regtronic RQ-B (0x7521), command 0x0100](#0010_7521_0100)
- [DFA (0x0010) <= Regtronic RX-B \[Regler\] (0x7522), command 0x0100](#0010_7522_0100)
- [DFA (0x0010) <= Regtronic RX-B \[Module\] (0x7523), command 0x0100](#0010_7523_0100)
- [DFA (0x0010) <= Regtronic RX-B \[WMZ #0\] (0x7530), command 0x0100](#0010_7530_0100)
- [DFA (0x0010) <= Friwa (0x7611), command 0x0100](#0010_7611_0100)
- [DFA (0x0010) <= SOLEX \[Regler\] (0x7621), command 0x0100](#0010_7621_0100)
- [DFA (0x0010) <= SOLEX \[WMZ\] (0x7622), command 0x0100](#0010_7622_0100)
- [DFA (0x0010) <= FriWa Kaskadenmaster Version 1 (0x7651), command 0x0100](#0010_7651_0100)
- [DFA (0x0010) <= Multitronic \[Regler\] (0x7711), command 0x0100](#0010_7711_0100)
- [DFA (0x0010) <= Multitronic \[WMZ\] (0x7712), command 0x0100](#0010_7712_0100)
- [DFA (0x0010) <= DeltaSol E \[Regler\] (0x7721), command 0x0100](#0010_7721_0100)
- [DFA (0x0010) <= DeltaSol E \[WMZ\] (0x7722), command 0x0100](#0010_7722_0100)
- [DFA (0x0010) <= DeltaSol E Fahrenheit \[Regler\] (0x7729), command 0x0100](#0010_7729_0100)
- [DFA (0x0010) <= DeltaSol E Fahrenheit \[WMZ\] (0x772A), command 0x0100](#0010_772A_0100)
- [DFA (0x0010) <= SOLTOP DeltaSol S2/S3 (0x7731), command 0x0100](#0010_7731_0100)
- [DFA (0x0010) <= DeDietrich Diemasol C v2007 (0x7751), command 0x0100](#0010_7751_0100)
- [DFA (0x0010) <= DeltaSol Pool (0x7761), command 0x0100](#0010_7761_0100)
- [DFA (0x0010) <= DeltaSol Pool \[WMZ\] (0x7762), command 0x0100](#0010_7762_0100)
- [DFA (0x0010) <= EMZ/CME (0x7774), command 0x0100](#0010_7774_0100)
- [DFA (0x0010) <= COSMO Multi \[Regler\] (0x7821), command 0x0100](#0010_7821_0100)
- [DFA (0x0010) <= COSMO Multi \[WMZ\] (0x7822), command 0x0100](#0010_7822_0100)
- [DFA (0x0010) <= Unknown device (0x7830), command 0x0100](#0010_7830_0100)
- [DFA (0x0010) <= PAW SOLEX SC5.14 \[Regler\] (0x7910), command 0x0100](#0010_7910_0100)
- [DFA (0x0010) <= PAW SOLEX SC5.14 \[Module\] (0x7911), command 0x0100](#0010_7911_0100)
- [DFA (0x0010) <= PAW SOLEX SC5.14 \[Heizkreis #0\] (0x7920), command 0x0100](#0010_7920_0100)
- [DFA (0x0010) <= PAW SOLEX SC5.14 \[WMZ #0\] (0x7930), command 0x0100](#0010_7930_0100)
- [DFA (0x0010) <= FRISTA-mix (0x7D04), command 0x0100](#0010_7D04_0100)
- [DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0100](#0010_7E11_0100)
- [DFA (0x0010) <= DeltaSol MX \[Module\] (0x7E12), command 0x0100](#0010_7E12_0100)
- [DFA (0x0010) <= DeltaSol MX \[Heizkreis #0\] (0x7E20), command 0x0100](#0010_7E20_0100)
- [DFA (0x0010) <= DeltaSol MX \[WMZ #0\] (0x7E30), command 0x0100](#0010_7E30_0100)
- [DFA (0x0010) <= IOC-Modul \[Messwerte\] (0x7F61), command 0x0100](#0010_7F61_0100)
- [DFA (0x0010) <= IOC-Modul \[Tagesbilanz\] (0x7F62), command 0x0100](#0010_7F62_0100)
- [DFA (0x0010) <= IOC-Modul \[Entnahmekreis\] (0x7F63), command 0x0100](#0010_7F63_0100)
- [DFA (0x0010) <= IOC-Modul \[Debug-Werte\] (0x7F64), command 0x0100](#0010_7F64_0100)
- [DFA (0x0010) <= IOC-Modul \[Messwerte_1s\] (0x7F65), command 0x0100](#0010_7F65_0100)
- [DFA (0x0010) <= DeltaSol FCS (0x7F71), command 0x0100](#0010_7F71_0100)
- [HKM1 #0 (0x4420) <= Broadcast (0x0000), command 0x0200](#4420_0000_0200)
- [HKM2 (0x6510) <= Broadcast (0x0000), command 0x0200](#6510_0000_0200)
- [MSR65 #0 (0x6520) <= Broadcast (0x0000), command 0x0200](#6520_0000_0200)
- [EM #0 (0x6650) <= Broadcast (0x0000), command 0x0200](#6650_0000_0200)



## Known device addresses

| Address | Mask | Name |
|:-:|:-:|:--|
| 0x1001 | 0xFFFF | DeltaSol SLT \[Regler\] |
| 0x1010 | 0xFFF0 | DeltaSol SLT \[WMZ #\] |
| 0x1040 | 0xFFFF | DeltaSol E V2 HK 1 Estrichtrockung \[Modul 1\] |
| 0x1041 | 0xFFFF | DeltaSol E V2 HK 2 Estrichtrockung \[Modul 2\] |
| 0x1042 | 0xFFFF | DeltaSol E V2 HK 3 Estrichtrockung \[Modul 3\] |
| 0x1043 | 0xFFFF | DeltaSol E V2 HK Estrichtrockung \[Lokal\] |
| 0x1050 | 0xFFFF | DeltaSol E V2 \[Regler\] |
| 0x1051 | 0xFFFF | DeltaSol E V2 \[WMZ\] |
| 0x1052 | 0xFFFF | Kioto BX Plus V2 \[Regler\] |
| 0x1053 | 0xFFFF | Kioto BX Plus V2 \[Module\] |
| 0x1054 | 0xFFFF | Kioto BX Plus V2 \[Heizkreis 1\] |
| 0x1055 | 0xFFFF | Kioto BX Plus V2 \[Heizkreis 2\] |
| 0x1056 | 0xFFFF | Kioto BX Plus V2 \[WMZ 1\] |
| 0x1057 | 0xFFFF | Kioto BX Plus V2 \[WMZ 2\] |
| 0x1058 | 0xFFFF | Caleffi Biomassa |
| 0x1060 | 0xFFFF | Vitosolic 200 \[Regler\] |
| 0x1065 | 0xFFFF | Vitosolic 200 \[WMZ 1\] |
| 0x1066 | 0xFFFF | Vitosolic 200 \[WMZ 2\] |
| 0x1111 | 0xFFFF | EC1 |
| 0x1120 | 0xFFFF | DeltaSol AL-E |
| 0x2000 | 0xFF00 | Digital Sensor # |
| 0x2111 | 0xFFFF | TLR2 |
| 0x2211 | 0xFFFF | DeltaSol CS Plus |
| 0x2231 | 0xFFFF | Oranier HK \[Regler\] |
| 0x2232 | 0xFFFF | Oranier HK \[WMZ1\] |
| 0x2251 | 0xFFFF | DeltaSol SL \[Regler\] |
| 0x2252 | 0xFFFF | DeltaSol SL \[WMZ1\] |
| 0x2271 | 0xFFFF | DeltaSol SLL \[Regler\] |
| 0x2272 | 0xFFFF | DeltaSol SLL \[WMZ1\] |
| 0x3011 | 0xFFFF | WMZ-L10 |
| 0x3112 | 0xFFFF | Diemasol A |
| 0x3211 | 0xFFFF | EL1 |
| 0x3221 | 0xFFFF | DeltaSol Pro |
| 0x3231 | 0xFFFF | DeltaSol B |
| 0x3241 | 0xFFFF | DT4 \(B\) |
| 0x3251 | 0xFFFF | DeltaSol BS |
| 0x3261 | 0xFFFF | DeltaSol BS \(DT4\) |
| 0x3271 | 0xFFFF | ConergyDT5 |
| 0x3311 | 0xFFFF | Diemasol C |
| 0x4010 | 0xFFF0 | WMZ # |
| 0x4021 | 0xFFFF | GF-Display |
| 0x4111 | 0xFFFF | DeltaSol AL |
| 0x4211 | 0xFFFF | SKSC1/2 |
| 0x4212 | 0xFFFF | DeltaSol C |
| 0x4213 | 0xFFFF | SKSC2 HE |
| 0x4214 | 0xFFFF | SKSC2 HE |
| 0x4221 | 0xFFFF | DeltaSol BS Plus |
| 0x4223 | 0xFFFF | DeltaSol BS Plus BTU |
| 0x4224 | 0xFFFF | CS2.2 |
| 0x4225 | 0xFFFF | CS1.2 |
| 0x4231 | 0xFFFF | Frista |
| 0x4241 | 0xFFFF | Huber - REGLOfresh / Felix \[Regler\] |
| 0x4251 | 0xFFFF | DSPlus UMSYS \[Regler\] |
| 0x4252 | 0xFFFF | BS Solex US |
| 0x4258 | 0xFFFF | SolarNor Drainback |
| 0x4265 | 0xFFFF | Aton DeltaSol BS |
| 0x4278 | 0xFFFF | DeltaSol BS/DrainBack |
| 0x4279 | 0xFFFF | DeltaSol BS/DrainBack \(Fahrenheit\) |
| 0x4311 | 0xFFFF | Drainback DeDietrich |
| 0x4312 | 0xFFFF | DeDietrich Drainback \(Control\) |
| 0x4321 | 0xFFFF | DeltaSol MiniPool |
| 0x4410 | 0xFFF0 | MSR44 # |
| 0x4420 | 0xFFF0 | HKM1 # |
| 0x5111 | 0xFFFF | DeltaSol D |
| 0x5112 | 0xFFFF | Speicherofenregler |
| 0x5121 | 0xFFFF | FriwaMini |
| 0x5141 | 0xFFFF | Tuxhorn PKE |
| 0x5210 | 0xFFFF | DeltaSol Plus |
| 0x5221 | 0xFFFF | DT4 \(MS\) |
| 0x5231 | 0xFFFF | nemux |
| 0x5251 | 0xFFFF | Frischwasserregler |
| 0x5311 | 0xFFFF | X-Control |
| 0x5400 | 0xFFFF | DeltaTherm HC \[Regler\] |
| 0x5410 | 0xFFF0 | DeltaTherm HC \[Heizkreis #\] |
| 0x5420 | 0xFFF0 | DeltaTherm HC \[WMZ #\] |
| 0x5510 | 0xFFFF | EL2/3 |
| 0x5611 | 0xFFFF | DeltaTherm FK |
| 0x6510 | 0xFFFF | HKM2 |
| 0x6520 | 0xFFF0 | MSR65 # |
| 0x6610 | 0xFFFF | Midi Pro |
| 0x6620 | 0xFFFF | SunGo XL |
| 0x6650 | 0xFFF0 | EM # |
| 0x7101 | 0xFFFF | DeltaSol BX WMZ |
| 0x7112 | 0xFFFF | DeltaSol BX Plus \[Regler\] |
| 0x7113 | 0xFFFF | DeltaSol BX Plus \[Module\] |
| 0x7120 | 0xFFF0 | DeltaSol BX Plus \[Heizkreis #\] |
| 0x7130 | 0xFFF0 | DeltaSol BX Plus \[WMZ #\] |
| 0x7140 | 0xFFFF | DeltaSol BX Pro\[Regler\] |
| 0x7150 | 0xFFF0 | DeltaSol BX Pro\[WMZ #\] |
| 0x7160 | 0xFFFF | SKSC3HE |
| 0x7161 | 0xFFFF | SKSC3HE \[HK1\] |
| 0x7162 | 0xFFFF | SKSC3HE \[HK2\] |
| 0x7163 | 0xFFFF | SKSC3HE \[HK3\] |
| 0x7210 | 0xFFFF | SKSR 1/2/3 |
| 0x7211 | 0xFFFF | SKSC3 \[HK1\] |
| 0x7212 | 0xFFFF | SKSC3 \[HK2\] |
| 0x7213 | 0xFFFF | SKSC3 \[HK3\] |
| 0x7221 | 0xFFFF | DrainBloC |
| 0x7231 | 0xFFFF | SC25 |
| 0x7311 | 0xFFFF | DeltaSol M \[Regler\] |
| 0x7312 | 0xFFFF | DeltaSol M \[HK1\] |
| 0x7313 | 0xFFFF | DeltaSol M \[HK2\] |
| 0x7315 | 0xFFFF | DeltaSol M \[Volumen\] |
| 0x7316 | 0xFFFF | DeltaSol M \[WMZ1\] |
| 0x7317 | 0xFFFF | DeltaSol M \[WMZ2\] |
| 0x7321 | 0xFFFF | Vitosolic 200 \[Regler\] |
| 0x7326 | 0xFFFF | Vitosolic 200 \[WMZ1\] |
| 0x7327 | 0xFFFF | Vitosolic 200 \[WMZ2\] |
| 0x7331 | 0xFFFF | SLR |
| 0x7332 | 0xFFFF | SLR-Erweiterungsmodul #1 |
| 0x7333 | 0xFFFF | SLR-Erweiterungsmodul #2 |
| 0x7334 | 0xFFFF | SLR-Erweiterungsmodul #3 |
| 0x7335 | 0xFFFF | SLR-Erweiterungsmodul #4 |
| 0x7341 | 0xFFFF | SLR XT |
| 0x7342 | 0xFFFF | SLR XT-Erweiterungsmodul 1 |
| 0x7343 | 0xFFFF | SLR XT-Erweiterungsmodul 2 |
| 0x7344 | 0xFFFF | SLR XT-Erweiterungsmodul 3 |
| 0x7345 | 0xFFFF | SLR XT-Erweiterungsmodul 4 |
| 0x7346 | 0xFFFF | SLR XT-Erweiterungsmodul 5 |
| 0x7411 | 0xFFFF | DeltaSol ES |
| 0x7421 | 0xFFFF | DeltaSol BX |
| 0x7422 | 0xFFFF | IZEN DTi2 |
| 0x7428 | 0xFFFF | DeltaSol BXL |
| 0x7441 | 0xFFFF | ZEN DT6 \[Regler\] |
| 0x7442 | 0xFFFF | ZEN DT6 \[WMZ1\] |
| 0x7451 | 0xFFFF | Kioto SLM |
| 0x7511 | 0xFFFF | SOLTEX-Regler \[Teil 1\] |
| 0x7512 | 0xFFFF | SOLTEX-Regler \[Teil 2\] |
| 0x7521 | 0xFFFF | Regtronic RQ-B |
| 0x7522 | 0xFFFF | Regtronic RX-B \[Regler\] |
| 0x7523 | 0xFFFF | Regtronic RX-B \[Module\] |
| 0x7530 | 0xFFF0 | Regtronic RX-B \[WMZ #\] |
| 0x7611 | 0xFFFF | Friwa |
| 0x7621 | 0xFFFF | SOLEX \[Regler\] |
| 0x7622 | 0xFFFF | SOLEX \[WMZ\] |
| 0x7651 | 0xFFFF | FriWa Kaskadenmaster Version 1 |
| 0x7711 | 0xFFFF | Multitronic \[Regler\] |
| 0x7712 | 0xFFFF | Multitronic \[WMZ\] |
| 0x7721 | 0xFFFF | DeltaSol E \[Regler\] |
| 0x7722 | 0xFFFF | DeltaSol E \[WMZ\] |
| 0x7729 | 0xFFFF | DeltaSol E Fahrenheit \[Regler\] |
| 0x7731 | 0xFFFF | SOLTOP DeltaSol S2/S3 |
| 0x7751 | 0xFFFF | DeDietrich Diemasol C v2007 |
| 0x7761 | 0xFFFF | DeltaSol Pool |
| 0x7762 | 0xFFFF | DeltaSol Pool \[WMZ\] |
| 0x7771 | 0xFFFF | DDS-Crawler |
| 0x7772 | 0xFFFF | RPT-Testsoftware |
| 0x7773 | 0xFFFF | RPT-Steuerbox |
| 0x7774 | 0xFFFF | EMZ/CME |
| 0x7821 | 0xFFFF | COSMO Multi \[Regler\] |
| 0x7822 | 0xFFFF | COSMO Multi \[WMZ\] |
| 0x7831 | 0xFFFF | COSMO Multi HK 1 Estrichtrockung \[Modul 1\] |
| 0x7832 | 0xFFFF | COSMO Multi HK 2 Estrichtrockung \[Modul 2\] |
| 0x7833 | 0xFFFF | COSMO Multi HK 3 Estrichtrockung \[Modul 3\] |
| 0x7834 | 0xFFFF | COSMO Multi HK Estrichtrockung \[Lokal\] |
| 0x7900 | 0xFFFF | R-Wandler |
| 0x7910 | 0xFFFF | PAW SOLEX SC5.14 \[Regler\] |
| 0x7911 | 0xFFFF | PAW SOLEX SC5.14 \[Module\] |
| 0x7920 | 0xFFF0 | PAW SOLEX SC5.14 \[Heizkreis #\] |
| 0x7930 | 0xFFF0 | PAW SOLEX SC5.14 \[WMZ #\] |
| 0x0000 | 0xFFFF | Broadcast |
| 0x0010 | 0xFFFF | DFA |
| 0x0015 | 0xFFFF | Standard-Infos |
| 0x0020 | 0xFFFF | Computer |
| 0x0040 | 0xFFFF | SD3 / GAx |
| 0x0050 | 0xFFFF | DL2 |
| 0x0053 | 0xFFFF | DL3 |
| 0x427A | 0xFFFF | DeltaSol BS/DrainBack \(Fahrenheit/BTU\) |
| 0x427B | 0xFFFF | DeltaSol BS 2009 |
| 0x772A | 0xFFFF | DeltaSol E Fahrenheit \[WMZ\] |
| 0x7D04 | 0xFFFF | FRISTA-mix |
| 0x7E11 | 0xFFFF | DeltaSol MX \[Regler\] |
| 0x7E12 | 0xFFFF | DeltaSol MX \[Module\] |
| 0x7E20 | 0xFFF0 | DeltaSol MX \[Heizkreis #\] |
| 0x7E30 | 0xFFF0 | DeltaSol MX \[WMZ #\] |
| 0x7E71 | 0xFFFF | EMV-Software |
| 0x7F61 | 0xFFFF | IOC-Modul \[Messwerte\] |
| 0x7F62 | 0xFFFF | IOC-Modul \[Tagesbilanz\] |
| 0x7F63 | 0xFFFF | IOC-Modul \[Entnahmekreis\] |
| 0x7F64 | 0xFFFF | IOC-Modul \[Debug-Werte\] |
| 0x7F65 | 0xFFFF | IOC-Modul \[Messwerte_1s\] |
| 0x7F71 | 0xFFFF | DeltaSol FCS |



## Known packets (VBus Protocol Version 1.0)

### <a name="0000_4010_0100"></a>Broadcast (0x0000) <= WMZ #0 (0x4010), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärme | 1000 |  Wh |
| 1 |  | Wärme | 256000 |  Wh |
| 2 |  | Wärme | 1 |  Wh |
| 3 |  | Wärme | 256 |  Wh |
| 4 |  | Volumenstrom | 0.01 |  m³/h |
| 5 |  | Volumenstrom | 2.56 |  m³/h |
| 6 |  | Leistung | 10 |  W |
| 8 |  | Vorlauftemperatur | 0.1 |  °C |
| 9 |  | Vorlauftemperatur | 25.6 |  °C |
| 10 |  | Rücklauftemperatur | 0.1 |  °C |
| 11 |  | Rücklauftemperatur | 25.6 |  °C |
| 12 |  | Wärme | 1000000 |  Wh |
| 13 |  | Wärme | 256000000 |  Wh |
| 14 |  | Leistung | 2560 |  W |
| 15 |  | Glykol | 1 |  |
| 16 |  | Druck | 0.01 |  bar |
| 17 |  | Druck | 2.56 |  bar |



### <a name="0000_4420_0100"></a>Broadcast (0x0000) <= HKM1 #0 (0x4420), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Fehlerstatus | 1 |  |
| 1 |  | Modulstatus | 1 |  |
| 2 |  | Modulstatus | 256 |  |
| 3 |  | Relaisstatus | 1 |  |
| 4 |  | Fehler-Info | 1 |  |
| 5 |  | Fehler-Info | 256 |  |
| 8 |  | Vorlauftemperatur | 0.1 |  °C |
| 9 |  | Vorlauftemperatur | 25.6 |  °C |
| 10 |  | Fernversteller | 0.1 |  °C |
| 11 |  | Fernversteller | 25.6 |  °C |
| 12 |  | Aussentemperatur | 0.1 |  °C |
| 13 |  | Aussentemperatur | 25.6 |  °C |
| 16 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 17 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 18 |  | Modulversion | 1 |  |
| 19 |  | Modulversion | 256 |  |



### <a name="0000_6510_0100"></a>Broadcast (0x0000) <= HKM2 (0x6510), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Fehlerstatus | 1 |  |
| 1 |  | Modulstatus | 1 |  |
| 2 |  | Modulstatus | 256 |  |
| 3 | 0x01 | Relais 1 | 1 |  |
| 3 | 0x02 | Relais 2 | 1 |  |
| 3 | 0x04 | Relais 3 | 1 |  |
| 3 | 0x08 | Relais 4 | 1 |  |
| 3 | 0x10 | Relais 5 | 1 |  |
| 3 | 0x20 | Relais 6 | 1 |  |
| 3 |  | Relaisstatus | 1 |  |
| 4 |  | Fehler-Info | 1 |  |
| 5 |  | Fehler-Info | 256 |  |
| 8 |  | Vorlauftemperatur | 0.1 |  °C |
| 9 |  | Vorlauftemperatur | 25.6 |  °C |
| 10 |  | Fernversteller | 0.1 |  °C |
| 11 |  | Fernversteller | 25.6 |  °C |
| 12 |  | Aussentemperatur | 0.1 |  °C |
| 13 |  | Aussentemperatur | 25.6 |  °C |
| 14 |  | Speichertemperatur 1 | 0.1 |  °C |
| 15 |  | Speichertemperatur 1 | 25.6 |  °C |
| 16 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 17 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 18 |  | Modulversion | 1 |  |
| 19 |  | Modulversion | 256 |  |
| 20 |  | Speichertemperatur 2 | 0.1 |  °C |
| 21 |  | Speichertemperatur 2 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 6 | 25.6 |  °C |



### <a name="0000_6520_0100"></a>Broadcast (0x0000) <= MSR65 #0 (0x6520), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |



### <a name="0000_6650_0100"></a>Broadcast (0x0000) <= EM #0 (0x6650), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Resistor 1 | 0.001 |  Ω |
| 1 |  | Resistor 1 | 0.256 |  Ω |
| 2 |  | Resistor 1 | 65.536 |  Ω |
| 3 |  | Resistor 1 | 16777.216 |  Ω |
| 4 |  | Resistor 2 | 0.001 |  Ω |
| 5 |  | Resistor 2 | 0.256 |  Ω |
| 6 |  | Resistor 2 | 65.536 |  Ω |
| 7 |  | Resistor 2 | 16777.216 |  Ω |
| 8 |  | Resistor 3 | 0.001 |  Ω |
| 9 |  | Resistor 3 | 0.256 |  Ω |
| 10 |  | Resistor 3 | 65.536 |  Ω |
| 11 |  | Resistor 3 | 16777.216 |  Ω |
| 12 |  | Resistor 4 | 0.001 |  Ω |
| 13 |  | Resistor 4 | 0.256 |  Ω |
| 14 |  | Resistor 4 | 65.536 |  Ω |
| 15 |  | Resistor 4 | 16777.216 |  Ω |
| 16 |  | Resistor 5 | 0.001 |  Ω |
| 17 |  | Resistor 5 | 0.256 |  Ω |
| 18 |  | Resistor 5 | 65.536 |  Ω |
| 19 |  | Resistor 5 | 16777.216 |  Ω |
| 20 |  | Resistor 6 | 0.001 |  Ω |
| 21 |  | Resistor 6 | 0.256 |  Ω |
| 22 |  | Resistor 6 | 65.536 |  Ω |
| 23 |  | Resistor 6 | 16777.216 |  Ω |



### <a name="0010_0053_0100"></a>DFA (0x0010) <= DL3 (0x0053), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Resistor Sensor 1 | 0.001 |  Ω |
| 1 |  | Resistor Sensor 1 | 0.256 |  Ω |
| 2 |  | Resistor Sensor 1 | 65.536 |  Ω |
| 3 |  | Resistor Sensor 1 | 16777.216 |  Ω |
| 4 |  | Resistor Sensor 2 | 0.001 |  Ω |
| 5 |  | Resistor Sensor 2 | 0.256 |  Ω |
| 6 |  | Resistor Sensor 2 | 65.536 |  Ω |
| 7 |  | Resistor Sensor 2 | 16777.216 |  Ω |
| 8 |  | Resistor Sensor 3 | 0.001 |  Ω |
| 9 |  | Resistor Sensor 3 | 0.256 |  Ω |
| 10 |  | Resistor Sensor 3 | 65.536 |  Ω |
| 11 |  | Resistor Sensor 3 | 16777.216 |  Ω |
| 12 |  | Current Sensor 4 | 0.001 |  mA |
| 13 |  | Current Sensor 4 | 0.256 |  mA |
| 14 |  | Current Sensor 4 | 65.536 |  mA |
| 15 |  | Current Sensor 4 | 16777.216 |  mA |
| 16 |  | Impulse Counter Sensor 1 | 1 |  |
| 17 |  | Impulse Counter Sensor 1 | 256 |  |
| 18 |  | Impulse Counter Sensor 1 | 65536 |  |
| 19 |  | Impulse Counter Sensor 1 | 16777216 |  |
| 20 |  | Impulse Counter Sensor 2 | 1 |  |
| 21 |  | Impulse Counter Sensor 2 | 256 |  |
| 22 |  | Impulse Counter Sensor 2 | 65536 |  |
| 23 |  | Impulse Counter Sensor 2 | 16777216 |  |
| 24 |  | Impulse Counter Sensor 3 | 1 |  |
| 25 |  | Impulse Counter Sensor 3 | 256 |  |
| 26 |  | Impulse Counter Sensor 3 | 65536 |  |
| 27 |  | Impulse Counter Sensor 3 | 16777216 |  |
| 34 |  | Temperature Sensor 1 | 0.1 |  °C |
| 35 |  | Temperature Sensor 1 | 25.6 |  °C |
| 36 |  | Temperature Sensor 2 | 0.1 |  °C |
| 37 |  | Temperature Sensor 2 | 25.6 |  °C |
| 38 |  | Temperature Sensor 3 | 0.1 |  °C |
| 39 |  | Temperature Sensor 3 | 25.6 |  °C |
| 40 |  | Irradiation Sensor 4 | 1 |  W/m² |
| 41 |  | Irradiation Sensor 4 | 256 |  W/m² |



### <a name="0010_1001_0100"></a>DFA (0x0010) <= DeltaSol SLT \[Regler\] (0x1001), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Systemdatum | 1 |  |
| 1 |  | Systemdatum | 256 |  |
| 2 |  | Systemdatum | 65536 |  |
| 3 |  | Systemdatum | 16777216 |  |
| 4 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 14 |  | Temperatur VFS/RPS \(S6\) | 0.1 |  °C |
| 15 |  | Temperatur VFS/RPS \(S6\) | 25.6 |  °C |
| 16 |  | Volumenstrom V40 | 1 |  l/h |
| 17 |  | Volumenstrom V40 | 256 |  l/h |
| 18 |  | Volumenstrom V40 | 65536 |  l/h |
| 19 |  | Volumenstrom V40 | 16777216 |  l/h |
| 20 |  | Volumenstrom VFS \(S6\) | 1 |  l/h |
| 21 |  | Volumenstrom VFS \(S6\) | 256 |  l/h |
| 22 |  | Volumenstrom VFS \(S6\) | 65536 |  l/h |
| 23 |  | Volumenstrom VFS \(S6\) | 16777216 |  l/h |
| 24 |  | Volumenstrom Flowrotor \(S7\) | 1 |  l/h |
| 25 |  | Volumenstrom Flowrotor \(S7\) | 256 |  l/h |
| 26 |  | Volumenstrom Flowrotor \(S7\) | 65536 |  l/h |
| 27 |  | Volumenstrom Flowrotor \(S7\) | 16777216 |  l/h |
| 28 |  | Druck RPS \(S6\) | 0.01 |  bar |
| 29 |  | Druck RPS \(S6\) | 2.56 |  bar |
| 30 |  | Drehzahl Relais 1 | 1 | % |
| 31 |  | Drehzahl Relais 2 | 1 | % |
| 32 |  | Drehzahl Relais 3 | 1 | % |
| 33 |  | Drehzahl Relais 4 | 1 | % |
| 34 |  | PWM A | 1 | % |
| 35 |  | PWM B | 1 | % |
| 36 |  | Fehlermaske | 1 |  |
| 37 |  | Fehlermaske | 256 |  |
| 38 |  | Fehlermaske | 65536 |  |
| 39 |  | Fehlermaske | 16777216 |  |
| 40 |  | Warnmaske | 1 |  |
| 41 |  | Warnmaske | 256 |  |
| 42 |  | Warnmaske | 65536 |  |
| 43 |  | Warnmaske | 16777216 |  |



### <a name="0010_1010_0100"></a>DFA (0x0010) <= DeltaSol SLT \[WMZ #0\] (0x1010), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärme Gesamt | 1 |  Wh |
| 1 |  | Wärme Gesamt | 256 |  Wh |
| 2 |  | Wärme Gesamt | 65536 |  Wh |
| 3 |  | Wärme Gesamt | 16777216 |  Wh |
| 4 |  | Wärme Heute | 1 |  Wh |
| 5 |  | Wärme Heute | 256 |  Wh |
| 6 |  | Wärme Heute | 65536 |  Wh |
| 7 |  | Wärme Heute | 16777216 |  Wh |
| 8 |  | Wärme Gestern | 1 |  Wh |
| 9 |  | Wärme Gestern | 256 |  Wh |
| 10 |  | Wärme Gestern | 65536 |  Wh |
| 11 |  | Wärme Gestern | 16777216 |  Wh |
| 12 |  | Wärme Woche | 1 |  Wh |
| 13 |  | Wärme Woche | 256 |  Wh |
| 14 |  | Wärme Woche | 65536 |  Wh |
| 15 |  | Wärme Woche | 16777216 |  Wh |
| 16 |  | Wärme Vorwoche | 1 |  Wh |
| 17 |  | Wärme Vorwoche | 256 |  Wh |
| 18 |  | Wärme Vorwoche | 65536 |  Wh |
| 19 |  | Wärme Vorwoche | 16777216 |  Wh |
| 20 |  | Wärme Monat | 1 |  Wh |
| 21 |  | Wärme Monat | 256 |  Wh |
| 22 |  | Wärme Monat | 65536 |  Wh |
| 23 |  | Wärme Monat | 16777216 |  Wh |
| 24 |  | Wärme Vormonat | 1 |  Wh |
| 25 |  | Wärme Vormonat | 256 |  Wh |
| 26 |  | Wärme Vormonat | 65536 |  Wh |
| 27 |  | Wärme Vormonat | 16777216 |  Wh |
| 28 |  | Wärme Jahr | 1 |  Wh |
| 29 |  | Wärme Jahr | 256 |  Wh |
| 30 |  | Wärme Jahr | 65536 |  Wh |
| 31 |  | Wärme Jahr | 16777216 |  Wh |
| 32 |  | Wärme Vorjahr | 1 |  Wh |
| 33 |  | Wärme Vorjahr | 256 |  Wh |
| 34 |  | Wärme Vorjahr | 65536 |  Wh |
| 35 |  | Wärme Vorjahr | 16777216 |  Wh |
| 36 |  | Volumen gesamt | 1 |  l/h |
| 37 |  | Volumen gesamt | 256 |  l/h |
| 38 |  | Volumen gesamt | 65536 |  l/h |
| 39 |  | Volumen gesamt | 16777216 |  l/h |
| 40 |  | Volumen Heute | 1 |  l/h |
| 41 |  | Volumen Heute | 256 |  l/h |
| 42 |  | Volumen Heute | 65536 |  l/h |
| 43 |  | Volumen Heute | 16777216 |  l/h |
| 44 |  | Volumen Gestern | 1 |  l/h |
| 45 |  | Volumen Gestern | 256 |  l/h |
| 46 |  | Volumen Gestern | 65536 |  l/h |
| 47 |  | Volumen Gestern | 16777216 |  l/h |
| 48 |  | Volumen Woche | 1 |  l/h |
| 49 |  | Volumen Woche | 256 |  l/h |
| 50 |  | Volumen Woche | 65536 |  l/h |
| 51 |  | Volumen Woche | 16777216 |  l/h |
| 52 |  | Volumen Vorwoche | 1 |  l/h |
| 53 |  | Volumen Vorwoche | 256 |  l/h |
| 54 |  | Volumen Vorwoche | 65536 |  l/h |
| 55 |  | Volumen Vorwoche | 16777216 |  l/h |
| 56 |  | Volumen Monat | 1 |  l/h |
| 57 |  | Volumen Monat | 256 |  l/h |
| 58 |  | Volumen Monat | 65536 |  l/h |
| 59 |  | Volumen Monat | 16777216 |  l/h |
| 60 |  | Volumen Vormonat | 1 |  l/h |
| 61 |  | Volumen Vormonat | 256 |  l/h |
| 62 |  | Volumen Vormonat | 65536 |  l/h |
| 63 |  | Volumen Vormonat | 16777216 |  l/h |
| 64 |  | Volumen Jahr | 1 |  l/h |
| 65 |  | Volumen Jahr | 256 |  l/h |
| 66 |  | Volumen Jahr | 65536 |  l/h |
| 67 |  | Volumen Jahr | 16777216 |  l/h |
| 68 |  | Volumen Vorjahr | 1 |  l/h |
| 69 |  | Volumen Vorjahr | 256 |  l/h |
| 70 |  | Volumen Vorjahr | 65536 |  l/h |
| 71 |  | Volumen Vorjahr | 16777216 |  l/h |
| 72 |  | Leistung | 0.001 |  kW |
| 73 |  | Leistung | 0.256 |  kW |
| 74 |  | Leistung | 65.536 |  kW |
| 75 |  | Leistung | 16777.216 |  kW |



### <a name="0010_1040_0100"></a>DFA (0x0010) <= DeltaSol E V2 HK 1 Estrichtrockung \[Modul 1\] (0x1040), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Jahr | 1 |  |
| 1 |  | Jahr | 256 |  |
| 2 |  | Monat | 1 |  |
| 3 |  | Tag | 1 |  |
| 4 |  | Systemzeit | 1 |  |
| 5 |  | Systemzeit | 256 |  |
| 6 |  | Status | 1 |  |
| 7 |  | Fehlermeldung | 1 |  |
| 8 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 9 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 10 |  | Vorlauftemperatur | 0.1 |  °C |
| 11 |  | Vorlauftemperatur | 25.6 |  °C |
| 12 |  | Relais Pumpe | 1 | % |
| 13 |  | Relais Mischer Auf | 1 | % |
| 14 |  | Relais Mischer Zu | 1 | % |
| 15 |  | Handebetrieb Relais Pumpe | 1 |  |
| 16 |  | Handebetrieb Relais Mischer Auf | 1 |  |
| 17 |  | Handebetrieb Relais Mischer Zu | 1 |  |
| 18 |  | NH-Anforderung | 1 |  |
| 19 |  | Parameter Start | 1 |  |
| 20 |  | Parameter TStart | 0.1 |  °C |
| 21 |  | Parameter TStart | 25.6 |  °C |
| 22 |  | Parameter TMax | 0.1 |  °C |
| 23 |  | Parameter TMax | 25.6 |  °C |
| 24 |  | Parameter Anstieg | 0.1 |  °C |
| 25 |  | Parameter Anstieg | 25.6 |  °C |
| 26 |  | Parameter Anstiegszeit | 1 |  h |
| 27 |  | Parameter Haltezeit | 1 |  d |



### <a name="0010_1050_0100"></a>DFA (0x0010) <= DeltaSol E V2 \[Regler\] (0x1050), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Einstrahlung CS | 1 |  W/m² |
| 21 |  | Einstrahlung CS | 256 |  W/m² |
| 22 |  | Impulse 1 V40 | 1 |  |
| 23 |  | Impulse 1 V40 | 256 |  |
| 24 |  | Digital Input | 1 |  |
| 25 |  | Digital Input | 256 |  |
| 26 |  | Drehzahl Relais 1 | 1 | % |
| 27 |  | Drehzahl Relais 2 | 1 | % |
| 28 |  | Drehzahl Relais 3 | 1 | % |
| 29 |  | Drehzahl Relais 4 | 1 | % |
| 30 |  | Drehzahl Relais 5 | 1 | % |
| 31 |  | Drehzahl Relais 6 | 1 | % |
| 32 |  | Drehzahl Relais 7 | 1 | % |
| 36 |  | Fehlermaske | 1 |  |
| 37 |  | Fehlermaske | 256 |  |
| 38 |  | Meldungen | 1 |  |
| 39 |  | Meldungen | 256 |  |
| 40 |  | System | 1 |  |
| 42 |  | Schema | 1 |  |
| 43 |  | Schema | 256 |  |
| 44 |  | Vorlauf Soll HK1 Modul Sensor 18 | 0.1 |  °C |
| 45 |  | Vorlauf Soll HK1 Modul Sensor 18 | 25.6 |  °C |
| 46 |  | Status HK1 Modul | 1 |  |
| 47 |  | Status HK1 Modul | 256 |  |
| 48 |  | Vorlauf Soll HK2 Modul Sensor 25 | 0.1 |  °C |
| 49 |  | Vorlauf Soll HK2 Modul Sensor 25 | 25.6 |  °C |
| 50 |  | Status HK2 Modul | 1 |  |
| 51 |  | Status HK2 Modul | 256 |  |
| 52 |  | Vorlauf Soll HK3 Modul Sensor 32 | 0.1 |  °C |
| 53 |  | Vorlauf Soll HK3 Modul Sensor 32 | 25.6 |  °C |
| 54 |  | Status HK3 Modul | 1 |  |
| 55 |  | Status HK3 Modul | 256 |  |
| 56 |  | Vorlauf Soll Heizkreis Sensor 11 | 0.1 |  °C |
| 57 |  | Vorlauf Soll Heizkreis Sensor 11 | 25.6 |  °C |
| 58 |  | Status Heizkreis | 1 |  |
| 59 |  | Status Heizkreis | 256 |  |
| 60 |  | Version | 1.00 |  |
| 61 |  | Version | 0.01 |  |
| 62 |  | Systemzeit | 1 |  |
| 63 |  | Systemzeit | 256 |  |
| 64 |  | Jahr | 1 |  |
| 65 |  | Jahr | 256 |  |
| 66 |  | Monat | 1 |  |
| 67 |  | Tag | 1 |  |
| 68 |  | PWM 1 | 1 | % |
| 69 |  | PWM 2 | 1 | % |
| 70 |  | PWM 3 | 1 | % |



### <a name="0010_1051_0100"></a>DFA (0x0010) <= DeltaSol E V2 \[WMZ\] (0x1051), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Vorlauf | 0.1 |  °C |
| 1 |  | Temperatur Vorlauf | 25.6 |  °C |
| 2 |  | Temperatur Rücklauf | 0.1 |  °C |
| 3 |  | Temperatur Rücklauf | 25.6 |  °C |
| 4 |  | Durchfluss Sensor 8 | 1 |  l/h |
| 5 |  | Durchfluss Sensor 8 | 256 |  l/h |
| 6 |  | Wärmemenge | 1 |  Wh |
| 7 |  | Wärmemenge | 256 |  Wh |
| 8 |  | Wärmemenge | 1000 |  Wh |
| 9 |  | Wärmemenge | 256000 |  Wh |
| 10 |  | Wärmemenge | 1000000 |  Wh |
| 11 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_1052_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[Regler\] (0x1052), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Einstrahlung Sensor 10 | 1 |  W/m² |
| 19 |  | Einstrahlung Sensor 10 | 256 |  W/m² |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 12 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 12 | 25.6 |  °C |
| 24 |  | Volumenstrom Sensor 9 | 1 |  l/h |
| 25 |  | Volumenstrom Sensor 9 | 256 |  l/h |
| 26 |  | Volumenstrom Sensor 9 | 65536 |  l/h |
| 27 |  | Volumenstrom Sensor 9 | 16777216 |  l/h |
| 28 |  | Volumenstrom Sensor 11 | 1 |  l/h |
| 29 |  | Volumenstrom Sensor 11 | 256 |  l/h |
| 30 |  | Volumenstrom Sensor 11 | 65536 |  l/h |
| 31 |  | Volumenstrom Sensor 11 | 16777216 |  l/h |
| 32 |  | Volumenstrom Sensor 12 | 1 |  l/h |
| 33 |  | Volumenstrom Sensor 12 | 256 |  l/h |
| 34 |  | Volumenstrom Sensor 12 | 65536 |  l/h |
| 35 |  | Volumenstrom Sensor 12 | 16777216 |  l/h |
| 36 |  | Druck Sensor 11 | 0.01 |  bar |
| 37 |  | Druck Sensor 11 | 2.56 |  bar |
| 38 |  | Druck Sensor 12 | 0.01 |  bar |
| 39 |  | Druck Sensor 12 | 2.56 |  bar |
| 40 |  | Drehzahl Relais 1 | 1 | % |
| 41 |  | Drehzahl Relais 2 | 1 | % |
| 42 |  | Drehzahl Relais 3 | 1 | % |
| 43 |  | Drehzahl Relais 4 | 1 | % |
| 44 |  | Drehzahl Relais 5 | 1 | % |
| 48 |  | Systemdatum | 1 |  |
| 49 |  | Systemdatum | 256 |  |
| 50 |  | Systemdatum | 65536 |  |
| 51 |  | Systemdatum | 16777216 |  |
| 52 |  | Fehlermaske | 1 |  |
| 53 |  | Fehlermaske | 256 |  |
| 54 |  | Fehlermaske | 65536 |  |
| 55 |  | Fehlermaske | 16777216 |  |



### <a name="0010_1053_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[Module\] (0x1053), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Modul 1 Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Modul 1 Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Modul 1 Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Modul 1 Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Modul 1 Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Modul 1 Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 13 |  | Temperatur Modul 2 Sensor 1 | 25.6 |  °C |
| 14 |  | Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 15 |  | Temperatur Modul 2 Sensor 2 | 25.6 |  °C |
| 16 |  | Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 17 |  | Temperatur Modul 2 Sensor 3 | 25.6 |  °C |
| 18 |  | Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 19 |  | Temperatur Modul 2 Sensor 4 | 25.6 |  °C |
| 20 |  | Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 21 |  | Temperatur Modul 2 Sensor 5 | 25.6 |  °C |
| 22 |  | Temperatur Modul 2 Sensor 6 | 0.1 |  °C |
| 23 |  | Temperatur Modul 2 Sensor 6 | 25.6 |  °C |



### <a name="0010_1054_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[Heizkreis 1\] (0x1054), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_1055_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[Heizkreis 2\] (0x1055), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_1056_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[WMZ 1\] (0x1056), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 8 |  | Wärmemenge heute | 1 |  Wh |
| 9 |  | Wärmemenge heute | 256 |  Wh |
| 10 |  | Wärmemenge heute | 65536 |  Wh |
| 11 |  | Wärmemenge heute | 16777216 |  Wh |
| 12 |  | Wärmemenge Woche | 1 |  Wh |
| 13 |  | Wärmemenge Woche | 256 |  Wh |
| 14 |  | Wärmemenge Woche | 65536 |  Wh |
| 15 |  | Wärmemenge Woche | 16777216 |  Wh |



### <a name="0010_1057_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[WMZ 2\] (0x1057), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 8 |  | Wärmemenge heute | 1 |  Wh |
| 9 |  | Wärmemenge heute | 256 |  Wh |
| 10 |  | Wärmemenge heute | 65536 |  Wh |
| 11 |  | Wärmemenge heute | 16777216 |  Wh |
| 12 |  | Wärmemenge Woche | 1 |  Wh |
| 13 |  | Wärmemenge Woche | 256 |  Wh |
| 14 |  | Wärmemenge Woche | 65536 |  Wh |
| 15 |  | Wärmemenge Woche | 16777216 |  Wh |



### <a name="0010_1058_0100"></a>DFA (0x0010) <= Caleffi Biomassa (0x1058), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Sensor 3 Zustand \(FS\) | 1 |  |
| 7 |  | Sensor 4 Zustand \(TA\) | 1 |  |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 |  | Drehzahl Relais 3 | 1 | % |
| 11 |  | Drehzahl Relais 4 | 1 | % |
| 12 |  | Schema | 1 |  |
| 16 |  | Betriebssekunden Relais 1 | 1 |  s |
| 17 |  | Betriebssekunden Relais 1 | 256 |  s |
| 18 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 19 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 20 |  | Betriebssekunden Relais 2 | 1 |  s |
| 21 |  | Betriebssekunden Relais 2 | 256 |  s |
| 22 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 23 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 24 |  | Betriebssekunden Relais 3 | 1 |  s |
| 25 |  | Betriebssekunden Relais 3 | 256 |  s |
| 26 |  | Betriebssekunden Relais 3 | 65536 |  s |
| 27 |  | Betriebssekunden Relais 3 | 16777216 |  s |
| 28 |  | Betriebssekunden Relais 4 | 1 |  s |
| 29 |  | Betriebssekunden Relais 4 | 256 |  s |
| 30 |  | Betriebssekunden Relais 4 | 65536 |  s |
| 31 |  | Betriebssekunden Relais 4 | 16777216 |  s |
| 32 |  | Fehlermaske | 1 |  |
| 33 |  | Fehlermaske | 256 |  |
| 34 |  | Fehlermaske | 65536 |  |
| 35 |  | Fehlermaske | 16777216 |  |
| 36 |  | Meldungen | 1 |  |
| 37 |  | Meldungen | 256 |  |
| 38 |  | Meldungen | 65536 |  |
| 39 |  | Meldungen | 16777216 |  |



### <a name="0010_1060_0100"></a>DFA (0x0010) <= Vitosolic 200 \[Regler\] (0x1060), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 12 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 12 | 25.6 |  °C |
| 24 |  | SZ Einstrahlung | 1 |  W/m² |
| 25 |  | SZ Einstrahlung | 256 |  W/m² |
| 26 |  | SZ Spannung | 0.001 |  V |
| 27 |  | SZ Spannung | 0.256 |  V |
| 28 |  | Impulszähler 1 | 1 |  l/min |
| 29 |  | Impulszähler 1 | 256 |  l/min |
| 30 |  | Impulszähler 1 | 65536 |  l/min |
| 31 |  | Impulszähler 1 | 16777216 |  l/min |
| 32 |  | Impulszähler 2 | 1 |  l/min |
| 33 |  | Impulszähler 2 | 256 |  l/min |
| 34 |  | Impulszähler 2 | 65536 |  l/min |
| 35 |  | Impulszähler 2 | 16777216 |  l/min |
| 36 | 0x01 | Sensor Unterbrechung S1 | 1 |  |
| 36 | 0x02 | Sensor Unterbrechung S2 | 1 |  |
| 36 | 0x04 | Sensor Unterbrechung S3 | 1 |  |
| 36 | 0x08 | Sensor Unterbrechung S4 | 1 |  |
| 36 | 0x10 | Sensor Unterbrechung S5 | 1 |  |
| 36 | 0x20 | Sensor Unterbrechung S6 | 1 |  |
| 36 | 0x40 | Sensor Unterbrechung S7 | 1 |  |
| 36 | 0x80 | Sensor Unterbrechung S8 | 1 |  |
| 36 |  | Sensor Unterbrechung | 1 |  |
| 36 | 0x100 | Sensor Unterbrechung S9 | 1 |  |
| 36 | 0x200 | Sensor Unterbrechung S10 | 1 |  |
| 36 | 0x400 | Sensor Unterbrechung S11 | 1 |  |
| 36 | 0x800 | Sensor Unterbrechung S12 | 1 |  |
| 37 |  | Sensor Unterbrechung | 256 |  |
| 38 | 0x01 | Sensor Kurzschluss | 1 |  |
| 38 | 0x01 | Sensor Kurzschluss S1 | 1 |  |
| 38 | 0x02 | Sensor Kurzschluss S2 | 1 |  |
| 38 | 0x04 | Sensor Kurzschluss S3 | 1 |  |
| 38 | 0x08 | Sensor Kurzschluss S4 | 1 |  |
| 38 | 0x10 | Sensor Kurzschluss S5 | 1 |  |
| 38 | 0x20 | Sensor Kurzschluss S6 | 1 |  |
| 38 | 0x40 | Sensor Kurzschluss S7 | 1 |  |
| 38 | 0x80 | Sensor Kurzschluss S8 | 1 |  |
| 38 | 0x100 | Sensor Kurzschluss S9 | 1 |  |
| 38 | 0x200 | Sensor Kurzschluss S10 | 1 |  |
| 38 | 0x400 | Sensor Kurzschluss S11 | 1 |  |
| 38 | 0x800 | Sensor Kurzschluss S12 | 1 |  |
| 40 | 0x01 | Sensor 1 benutzt | 1 |  |
| 40 | 0x02 | Sensor 2 benutzt | 1 |  |
| 40 | 0x04 | Sensor 3 benutzt | 1 |  |
| 40 | 0x08 | Sensor 4 benutzt | 1 |  |
| 40 | 0x10 | Sensor 5 benutzt | 1 |  |
| 40 | 0x20 | Sensor 6 benutzt | 1 |  |
| 40 | 0x40 | Sensor 7 benutzt | 1 |  |
| 40 | 0x80 | Sensor 8 benutzt | 1 |  |
| 40 |  | Sensor benutzt | 1 |  |
| 40 | 0x100 | Sensor 9 benutzt | 1 |  |
| 40 | 0x200 | Sensor 10 benutzt | 1 |  |
| 40 | 0x400 | Sensor 11 benutzt | 1 |  |
| 40 | 0x800 | Sensor 12 benutzt | 1 |  |
| 44 |  | Drehzahl Relais 1 | 1 | % |
| 45 |  | Drehzahl Relais 2 | 1 | % |
| 46 |  | Drehzahl Relais 3 | 1 | % |
| 47 |  | Drehzahl Relais 4 | 1 | % |
| 48 |  | Drehzahl Relais 5 | 1 | % |
| 49 |  | Drehzahl Relais 6 | 1 | % |
| 50 |  | Drehzahl Relais 7 | 1 | % |
| 56 | 0x01 | Lasterkennung R1 | 1 |  |
| 56 | 0x02 | Lasterkennung R2 | 1 |  |
| 56 | 0x04 | Lasterkennung R3 | 1 |  |
| 56 | 0x08 | Lasterkennung R4 | 1 |  |
| 56 |  | Lasterkennung Relais | 1 |  |
| 57 | 0x01 | Fehler Lasterkennung R1 | 1 |  |
| 57 | 0x02 | Fehler Lasterkennung R2 | 1 |  |
| 57 | 0x04 | Fehler Lasterkennung R3 | 1 |  |
| 57 | 0x08 | Fehler Lasterkennung R4 | 1 |  |
| 57 |  | Fehler Lasterkennung Relais | 1 |  |
| 58 | 0x01 | Relais 1 benutzt | 1 |  |
| 58 | 0x02 | Relais 2 benutzt | 1 |  |
| 58 | 0x04 | Relais 3 benutzt | 1 |  |
| 58 | 0x08 | Relais 4 benutzt | 1 |  |
| 58 | 0x10 | Relais 5 benutzt | 1 |  |
| 58 | 0x20 | Relais 6 benutzt | 1 |  |
| 58 | 0x40 | Relais 7 benutzt | 1 |  |
| 58 |  | Relaisbenutzungsmaske | 1 |  |
| 59 |  | Relaisbenutzungsmaske | 256 |  |
| 60 |  | Fehlermaske | 1 |  |
| 61 |  | Fehlermaske | 256 |  |
| 62 |  | Warnmaske | 1 |  |
| 63 |  | Warnmaske | 256 |  |
| 64 |  | SW-Version | 0.1 |  |
| 65 |  | Minorversion | 1 |  |
| 66 |  | Systemzeit | 1 |  |
| 67 |  | Systemzeit | 256 |  |
| 72 |  | Fehler Solarzelle | 1 |  |



### <a name="0010_1064_0100"></a>DFA (0x0010) <= Unknown device (0x1064), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauftemperatur | 0.1 |  °C |
| 1 |  | Vorlauftemperatur | 25.6 |  °C |
| 2 |  | Rücklauftemperatur | 0.1 |  °C |
| 3 |  | Rücklauftemperatur | 25.6 |  °C |
| 4 |  | Volumenstrom | 1 |  l/h |
| 5 |  | Volumenstrom | 256 |  l/h |
| 6 |  | Wärme Wh | 1 |  Wh |
| 6 |  | Wärme | 1 |  Wh |
| 7 |  | Wärme | 256 |  Wh |
| 7 |  | Wärme Wh | 256 |  Wh |
| 8 |  | Wärme | 1000 |  Wh |
| 8 |  | Wärme kWh | 1 |  kWh |
| 9 |  | Wärme | 256000 |  Wh |
| 9 |  | Wärme kWh | 256 |  kWh |
| 10 |  | Wärme MWh | 1 |  MWh |
| 10 |  | Wärme | 1000000 |  Wh |
| 11 |  | Wärme MWh | 256 |  MWh |
| 11 |  | Wärme | 256000000 |  Wh |



### <a name="0010_1120_0100"></a>DFA (0x0010) <= DeltaSol AL-E (0x1120), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Drehzahl Relais 1 | 1 | % |
| 7 |  | Drehzahl Relais 2 | 1 | % |
| 8 |  | Anzeige-Status | 1 |  |
| 9 |  | Anzeige-Status | 256 |  |
| 10 |  | Uhrzeit | 1 |  |
| 11 |  | Uhrzeit | 256 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 65536 |  Wh |
| 19 |  | Wärmemenge | 16777216 |  Wh |



### <a name="0010_2211_0100"></a>DFA (0x0010) <= DeltaSol CS Plus (0x2211), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 10 |  | Betriebsstunden Relais 1 | 1 |  h |
| 11 |  | Betriebsstunden Relais 1 | 256 |  h |
| 12 |  | Drehzahl Relais 2 | 1 | % |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | UnitType | 1 |  |
| 17 |  | System | 1 |  |
| 20 | 0x01 | Sensor 1 defekt | 1 |  |
| 20 | 0x02 | Sensor 2 defekt | 1 |  |
| 20 | 0x04 | Sensor 3 defekt | 1 |  |
| 20 | 0x08 | Sensor 4 defekt | 1 |  |
| 20 |  | ErrorMask | 1 |  |
| 21 |  | ErrorMask | 256 |  |
| 22 |  | Systemzeit | 1 |  |
| 23 |  | Systemzeit | 256 |  |
| 24 |  | Statusmask | 1 |  |
| 25 |  | Statusmask | 256 |  |
| 26 |  | Statusmask | 65536 |  |
| 27 |  | Statusmask | 16777216 |  |
| 28 |  | Wärmemenge | 1 |  Wh |
| 29 |  | Wärmemenge | 256 |  Wh |
| 30 |  | Wärmemenge | 65536 |  Wh |
| 31 |  | Wärmemenge | 16777216 |  Wh |
| 32 |  | SW-Version | 0.01 |  |
| 33 |  | SW-Version | 2.56 |  |



### <a name="0010_2231_0100"></a>DFA (0x0010) <= Oranier HK \[Regler\] (0x2231), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Kollektor | 0.1 |  °C |
| 1 |  | Kollektor | 25.6 |  °C |
| 2 |  | Speicher Solar | 0.1 |  °C |
| 3 |  | Speicher Solar | 25.6 |  °C |
| 4 |  | Ofen Kesseltemp | 0.1 |  °C |
| 5 |  | Ofen Kesseltemp | 25.6 |  °C |
| 6 |  | Speicher unten | 0.1 |  °C |
| 7 |  | Speicher unten | 25.6 |  °C |
| 8 |  | Rücklauf Heizkreis | 0.1 |  °C |
| 9 |  | Rücklauf Heizkreis | 25.6 |  °C |
| 10 |  | Speicher Entnahme | 0.1 |  °C |
| 11 |  | Speicher Entnahme | 25.6 |  °C |
| 12 |  | Brauchwasserspeicher | 0.1 |  °C |
| 13 |  | Brauchwasserspeicher | 25.6 |  °C |
| 14 |  | Zirkulation-Fühler | 0.1 |  °C |
| 15 |  | Zirkulation-Fühler | 25.6 |  °C |
| 16 |  | Sensor 9 | 0.1 |  °C |
| 17 |  | Sensor 9 | 25.6 |  °C |
| 18 |  | Sensor 10 | 0.1 |  °C |
| 19 |  | Sensor 10 | 25.6 |  °C |
| 20 |  | Sensor 11 | 0.1 |  °C |
| 21 |  | Sensor 11 | 25.6 |  °C |
| 22 |  | Sensor 12 | 0.1 |  °C |
| 23 |  | Sensor 12 | 25.6 |  °C |
| 24 |  | Sensor 13 | 0.1 |  °C |
| 25 |  | Sensor 13 | 25.6 |  °C |
| 26 |  | Vorlauftemperatur HK1 | 0.1 |  °C |
| 27 |  | Vorlauftemperatur HK1 | 25.6 |  °C |
| 28 |  | Aussentemperatur | 0.1 |  °C |
| 29 |  | Aussentemperatur | 25.6 |  °C |
| 30 |  | Abgastemperatur | 0.1 |  °C |
| 31 |  | Abgastemperatur | 25.6 |  °C |
| 36 |  | Einstrahlung | 1 |  W/m² |
| 37 |  | Einstrahlung | 256 |  W/m² |
| 38 |  | Impulseingang 1 | 1 |  |
| 39 |  | Impulseingang 1 | 256 |  |
| 40 |  | Impulseingang 1 | 65536 |  |
| 40 |  | Impulseingang 2 | 1 |  |
| 41 |  | Impulseingang 1 | 16777216 |  |
| 41 |  | Impulseingang 2 | 256 |  |
| 42 |  | Impulseingang 2 | 65536 |  |
| 42 |  | Pumpe Solar | 1 | % |
| 43 |  | Impulseingang 2 | 16777216 |  |
| 43 |  | Pumpe Ofen | 1 | % |
| 44 |  | Umschaltventil Kessel | 1 | % |
| 45 |  | BW Ladepumpe | 1 | % |
| 46 |  | Zirkulationspumpe | 1 | % |
| 47 |  | Relais 6 | 1 | % |
| 48 |  | Relais 7 | 1 | % |
| 49 |  | Relais 8 | 1 | % |
| 50 |  | Brennersperre 2 | 1 | % |
| 51 |  | Mischer Auf | 1 | % |
| 52 |  | Mischer Zu | 1 | % |
| 53 |  | HK - Pumpe | 1 | % |
| 54 |  | Gas/ÖL/Pelletofen | 1 | % |
| 56 |  | Fehlermaske | 1 |  |
| 57 |  | Fehlermaske | 256 |  |
| 58 |  | Warnungsmaske | 1 |  |
| 59 |  | Warnungsmaske | 256 |  |
| 72 |  | Reglerversion | 1 |  |
| 73 |  | Reglerversion | 256 |  |
| 74 |  | Systemzeit | 1 |  |
| 75 |  | Systemzeit | 256 |  |
| 80 |  | Sensorbenutzungs-Maske | 1 |  |
| 81 |  | Sensorbenutzungs-Maske | 256 |  |
| 82 |  | Sensorbenutzungs-Maske | 65536 |  |
| 83 |  | Sensorbenutzungs-Maske | 16777216 |  |
| 84 |  | Relaisbenutzungsmaske | 1 |  |
| 85 |  | Relaisbenutzungsmaske | 256 |  |
| 86 |  | Relaisbenutzungsmaske | 65536 |  |
| 87 |  | Relaisbenutzungsmaske | 16777216 |  |
| 88 |  | Sensorbruch-Maske | 1 |  |
| 89 |  | Sensorbruch-Maske | 256 |  |
| 90 |  | Sensorkurzschluss-Maske | 1 |  |
| 91 |  | Sensorkurzschluss-Maske | 256 |  |



### <a name="0010_2232_0100"></a>DFA (0x0010) <= Oranier HK \[WMZ1\] (0x2232), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauftemperatur | 0.1 |  °C |
| 1 |  | Vorlauftemperatur | 25.6 |  °C |
| 2 |  | Rücklauftemperatur | 0.1 |  °C |
| 3 |  | Rücklauftemperatur | 25.6 |  °C |
| 4 |  | Volumenstrom | 1 |  l/h |
| 5 |  | Volumenstrom | 256 |  l/h |
| 6 |  | Wärme | 1 |  Wh |
| 7 |  | Wärme | 256 |  Wh |
| 8 |  | Wärme | 1 |  kWh |
| 9 |  | Wärme | 256 |  kWh |
| 10 |  | Wärme | 1 |  MWh |
| 11 |  | Wärme | 256 |  MWh |



### <a name="0010_2251_0100"></a>DFA (0x0010) <= DeltaSol SL \[Regler\] (0x2251), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Systemdatum | 1 |  |
| 1 |  | Systemdatum | 256 |  |
| 2 |  | Systemdatum | 65536 |  |
| 3 |  | Systemdatum | 16777216 |  |
| 4 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 14 |  | Temperatur VFS/RPS \(S6\) | 0.1 |  °C |
| 15 |  | Temperatur VFS/RPS \(S6\) | 25.6 |  °C |
| 20 |  | Volumenstrom V40 | 1 |  l/h |
| 21 |  | Volumenstrom V40 | 256 |  l/h |
| 22 |  | Volumenstrom V40 | 65536 |  l/h |
| 23 |  | Volumenstrom V40 | 16777216 |  l/h |
| 24 |  | Volumenstrom VFS \(S6\) | 1 |  l/h |
| 25 |  | Volumenstrom VFS \(S6\) | 256 |  l/h |
| 26 |  | Volumenstrom VFS \(S6\) | 65536 |  l/h |
| 27 |  | Volumenstrom VFS \(S6\) | 16777216 |  l/h |
| 28 |  | Volumenstrom Flowrotor \(S7\) | 1 |  l/h |
| 29 |  | Volumenstrom Flowrotor \(S7\) | 256 |  l/h |
| 30 |  | Volumenstrom Flowrotor \(S7\) | 65536 |  l/h |
| 31 |  | Volumenstrom Flowrotor \(S7\) | 16777216 |  l/h |
| 32 |  | Druck RPS \(S6\) | 0.01 |  bar |
| 33 |  | Druck RPS \(S6\) | 2.56 |  bar |
| 34 |  | Drehzahl Relais 1 | 1 | % |
| 35 |  | Drehzahl Relais 2 | 1 | % |
| 36 |  | Drehzahl Relais 3 | 1 | % |
| 37 |  | Drehzahl Relais 4 | 1 | % |
| 38 |  | PWM A | 1 | % |
| 39 |  | PWM B | 1 | % |
| 40 |  | Wärmemenge | 1 |  Wh |
| 41 |  | Wärmemenge | 256 |  Wh |
| 42 |  | Wärmemenge | 65536 |  Wh |
| 43 |  | Wärmemenge | 16777216 |  Wh |
| 44 | 0x01 | SW-Version | 1 |  |
| 48 |  | Betriebssekunden Relais 1 | 1 |  s |
| 49 |  | Betriebssekunden Relais 1 | 256 |  s |
| 50 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 51 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 52 |  | Betriebssekunden Relais 2 | 1 |  s |
| 53 |  | Betriebssekunden Relais 2 | 256 |  s |
| 54 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 55 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 56 |  | Betriebssekunden Relais 3 | 1 |  s |
| 57 |  | Betriebssekunden Relais 3 | 256 |  s |
| 58 |  | Betriebssekunden Relais 3 | 65536 |  s |
| 59 |  | Betriebssekunden Relais 3 | 16777216 |  s |
| 60 |  | Betriebssekunden Relais 4 | 1 |  s |
| 61 |  | Betriebssekunden Relais 4 | 256 |  s |
| 62 |  | Betriebssekunden Relais 4 | 65536 |  s |
| 63 |  | Betriebssekunden Relais 4 | 16777216 |  s |
| 64 | 0x01 | Urlaubsfunktion | 1 |  |
| 65 |  | Blockierschutz 1 | 1 | % |
| 66 |  | Blockierschutz 2 | 1 | % |
| 67 |  | Blockierschutz 3 | 1 | % |
| 68 |  | Initalisieren | 1 |  |
| 69 |  | Initalisieren | 256 |  |
| 70 |  | Initalisieren | 65536 |  |
| 71 |  | Initalisieren | 16777216 |  |
| 72 |  | Befüllung | 1 |  |
| 73 |  | Befüllung | 256 |  |
| 74 |  | Befüllung | 65536 |  |
| 75 |  | Befüllung | 16777216 |  |
| 76 |  | Stabilisieren | 1 |  |
| 77 |  | Stabilisieren | 256 |  |
| 78 |  | Stabilisieren | 65536 |  |
| 79 |  | Stabilisieren | 16777216 |  |
| 80 |  | Pumpenverzögerung | 1 |  |
| 81 | 0x01 | Überwärmeabfuhr | 1 |  |
| 82 |  | Nachlauf | 1 |  |
| 83 |  | Thermische Desinfektion | 1 |  |
| 84 | 0x01 | Speicherkühlung | 1 |  |
| 85 | 0x01 | Systemkühlung | 1 |  |
| 86 |  | Spreizung | 1 |  |
| 87 |  | Frostschutz | 1 |  |
| 88 | 0x01 | Kollektorkühlung | 1 |  |
| 89 | 0x01 | Einheit Temperatur | 1 |  |
| 90 | 0x01 | Einheit Durchfluss | 1 |  |
| 91 | 0x01 | Einheit Druck | 1 |  |
| 93 | 0x01 | Einheit Energie | 1 |  |
| 94 | 0x01 | Speichermaximaltemperatur | 1 |  |
| 95 | 0x01 | Neustarts | 1 |  |
| 96 |  | Fehlermaske | 1 |  |
| 97 |  | Fehlermaske | 256 |  |
| 98 |  | Fehlermaske | 65536 |  |
| 99 |  | Fehlermaske | 16777216 |  |



### <a name="0010_2252_0100"></a>DFA (0x0010) <= DeltaSol SL \[WMZ1\] (0x2252), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wmz1_Wert_Wh | 1 |  Wh |
| 1 |  | Wmz1_Wert_Wh | 256 |  Wh |
| 2 |  | Wmz1_Wert_Wh | 65536 |  Wh |
| 3 |  | Wmz1_Wert_Wh | 16777216 |  Wh |
| 4 |  | Wmz1_Leistung_W | 1 |  W |
| 5 |  | Wmz1_Leistung_W | 256 |  W |
| 6 |  | Wmz1_Leistung_W | 65536 |  W |
| 7 |  | Wmz1_Leistung_W | 16777216 |  W |
| 8 |  | Wmz1_WertHeute_Wh | 1 |  Wh |
| 9 |  | Wmz1_WertHeute_Wh | 256 |  Wh |
| 10 |  | Wmz1_WertHeute_Wh | 65536 |  Wh |
| 11 |  | Wmz1_WertHeute_Wh | 16777216 |  Wh |
| 12 |  | Wmz1_WertWoche_Wh | 1 |  Wh |
| 13 |  | Wmz1_WertWoche_Wh | 256 |  Wh |
| 14 |  | Wmz1_WertWoche_Wh | 65536 |  Wh |
| 15 |  | Wmz1_WertWoche_Wh | 16777216 |  Wh |



### <a name="0010_2271_0100"></a>DFA (0x0010) <= DeltaSol SLL \[Regler\] (0x2271), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Systemdatum | 1 |  |
| 1 |  | Systemdatum | 256 |  |
| 2 |  | Systemdatum | 65536 |  |
| 3 |  | Systemdatum | 16777216 |  |
| 4 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 12 |  | TAGE | 1 |  |
| 13 |  | TAGE | 256 |  |
| 16 |  | Volumenstrom V40 | 1 |  l/h |
| 17 |  | Volumenstrom V40 | 256 |  l/h |
| 18 |  | Volumenstrom V40 | 65536 |  l/h |
| 19 |  | Volumenstrom V40 | 16777216 |  l/h |
| 20 |  | Drehzahl Relais 1 | 1 | % |
| 21 |  | Drehzahl Relais 2 | 1 | % |
| 22 |  | Drehzahl Relais 4 | 1 | % |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 65536 |  Wh |
| 27 |  | Wärmemenge | 16777216 |  Wh |
| 28 |  | SW-Version | 0.01 |  |
| 29 |  | SW-Version | 2.56 |  |
| 32 |  | Betriebsstunden Relais 1 | 1 |  h |
| 33 |  | Betriebsstunden Relais 1 | 256 |  h |
| 34 |  | Betriebsstunden Relais 1 | 65536 |  h |
| 35 |  | Betriebsstunden Relais 1 | 16777216 |  h |
| 36 |  | Betriebsstunden Relais 2 | 1 |  h |
| 37 |  | Betriebsstunden Relais 2 | 256 |  h |
| 38 |  | Betriebsstunden Relais 2 | 65536 |  h |
| 39 |  | Betriebsstunden Relais 2 | 16777216 |  h |
| 40 |  | Betriebsstunden Relais 3 | 1 |  h |
| 41 |  | Betriebsstunden Relais 3 | 256 |  h |
| 42 |  | Betriebsstunden Relais 3 | 65536 |  h |
| 43 |  | Betriebsstunden Relais 3 | 16777216 |  h |
| 44 | 0x01 | Urlaubsfunktion | 1 |  |
| 45 |  | Blockierschutz 1 | 1 | % |
| 46 |  | Blockierschutz 2 | 1 | % |
| 47 |  | Blockierschutz 3 | 1 | % |
| 48 |  | Initalisieren | 1 |  |
| 49 |  | Initalisieren | 256 |  |
| 50 |  | Initalisieren | 65536 |  |
| 51 |  | Initalisieren | 16777216 |  |
| 52 |  | Befüllung | 1 |  |
| 53 |  | Befüllung | 256 |  |
| 54 |  | Befüllung | 65536 |  |
| 54 |  | Stabilisieren | 1 |  |
| 55 |  | Befüllung | 16777216 |  |
| 55 |  | Stabilisieren | 256 |  |
| 56 |  | Stabilisieren | 65536 |  |
| 57 |  | Stabilisieren | 16777216 |  |
| 60 |  | Pumpenverzögerung | 1 |  |
| 61 | 0x01 | Überwärmeabfuhr | 1 |  |
| 62 |  | Nachlauf | 1 |  |
| 63 |  | Thermische Desinfektion | 1 |  |
| 64 | 0x01 | Speicherkühlung | 1 |  |
| 65 | 0x01 | Systemkühlung | 1 |  |
| 66 |  | Spreizung | 1 |  |
| 67 |  | Frostschutz | 1 |  |
| 68 | 0x01 | Kollektorkühlung | 1 |  |
| 69 | 0x01 | Speichermaximaltemperatur | 1 |  |
| 70 | 0x01 | Neustarts | 1 |  |
| 72 |  | Fehlermaske | 1 |  |
| 73 |  | Fehlermaske | 256 |  |
| 74 |  | Fehlermaske | 65536 |  |
| 75 |  | Fehlermaske | 16777216 |  |



### <a name="0010_2272_0100"></a>DFA (0x0010) <= DeltaSol SLL \[WMZ1\] (0x2272), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wert | 1 |  Wh |
| 1 |  | Wert | 256 |  Wh |
| 2 |  | Wert | 65536 |  Wh |
| 3 |  | Wert | 16777216 |  Wh |
| 4 |  | Leistung | 1 |  W |
| 5 |  | Leistung | 256 |  W |
| 6 |  | Leistung | 65536 |  W |
| 7 |  | Leistung | 16777216 |  W |
| 8 |  | Wert heute | 1 |  Wh |
| 9 |  | Wert heute | 256 |  Wh |
| 10 |  | Wert heute | 65536 |  Wh |
| 11 |  | Wert heute | 16777216 |  Wh |
| 12 |  | Wert Woche | 1 |  Wh |
| 13 |  | Wert Woche | 256 |  Wh |
| 14 |  | Wert Woche | 65536 |  Wh |
| 15 |  | Wert Woche | 16777216 |  Wh |



### <a name="0010_3011_0100"></a>DFA (0x0010) <= WMZ-L10 (0x3011), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauftemperatur | 0.1 |  °C |
| 1 |  | Vorlauftemperatur | 25.6 |  °C |
| 2 |  | Rücklauftemperatur | 0.1 |  °C |
| 3 |  | Rücklauftemperatur | 25.6 |  °C |
| 4 |  | Strömungsgeschwindigkeit | 0.01 |  m/s |
| 5 |  | Strömungsgeschwindigkeit | 2.56 |  m/s |
| 6 |  | Betriebstage | 1 |  |
| 7 |  | Betriebstage | 256 |  |
| 10 |  | Luftkanal-Querschnitt | 0.01 |  m² |
| 11 |  | Luftkanal-Querschnitt | 2.56 |  m² |
| 12 |  | Luftstrom-Volumen | 1 |  m³/h |
| 13 |  | Luftstrom-Volumen | 256 |  m³/h |
| 14 |  | Luftstrom-Volumen | 65536 |  m³/h |
| 15 |  | Luftstrom-Volumen | 16777216 |  m³/h |
| 16 |  | Luftstrom-Masse | 1 |  kg/h |
| 17 |  | Luftstrom-Masse | 256 |  kg/h |
| 18 |  | Luftstrom-Masse | 65536 |  kg/h |
| 19 |  | Luftstrom-Masse | 16777216 |  kg/h |
| 20 |  | Luftdichte | 0.0001 |  kg/m³ |
| 21 |  | Luftdichte | 0.0256 |  kg/m³ |
| 22 |  | Leistung | 0.1 |  kW |
| 23 |  | Leistung | 25.6 |  kW |
| 24 |  | Luftdruck | 1 |  hPa |
| 25 |  | Luftdruck | 256 |  hPa |
| 28 |  | Wärmemenge kWh | 1 |  kWh |
| 29 |  | Wärmemenge kWh | 256 |  kWh |
| 30 |  | Wärmemenge MWh | 1 |  kWh |
| 31 |  | Wärmemenge MWh | 256 |  kWh |



### <a name="0010_3211_0100"></a>DFA (0x0010) <= EL1 (0x3211), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Drehzahl R1 | 1 | % |
| 7 |  | Fehlercode | 1 |  |
| 8 |  | Pumpenlaufzeit R1 | 1 |  h |
| 9 |  | Pumpenlaufzeit R1 | 256 |  h |
| 10 |  | Ladestatus | 1 |  |
| 11 |  | Flags | 1 |  |



### <a name="0010_3221_0100"></a>DFA (0x0010) <= DeltaSol Pro (0x3221), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Drehzahl Relais 1 | 1 | % |
| 7 |  | Drehzahl Relais 2 | 1 | % |
| 8 |  | Regelflags | 1 |  |
| 9 |  | Regelflags | 256 |  |
| 10 |  | Fehlermaske | 1 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |



### <a name="0010_3231_0100"></a>DFA (0x0010) <= DeltaSol B (0x3231), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Drehzahl Relais 1 | 1 | % |
| 7 |  | Fehlermaske | 1 |  |
| 8 |  | Betriebsstunden Relais 1 | 1 |  h |
| 9 |  | Betriebsstunden Relais 1 | 256 |  h |
| 10 | 0x01 | Relaisstatus Relais 1 | 1 |  |
| 10 | 0x02 | Relaisstatus Relais 2 | 1 |  |
| 10 |  | Relaismaske | 1 |  |



### <a name="0010_3241_0100"></a>DFA (0x0010) <= DT4 \(B\) (0x3241), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Drehzahl Relais 1 | 1 | % |
| 7 |  | Fehlermaske | 1 |  |
| 10 |  | Relaismaske | 1 |  |



### <a name="0010_3251_0100"></a>DFA (0x0010) <= DeltaSol BS (0x3251), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Drehzahl Relais 1 | 1 | % |
| 7 |  | Fehlermaske | 1 |  |
| 8 |  | Betriebsstunden Relais 1 | 1 |  h |
| 9 |  | Betriebsstunden Relais 1 | 256 |  h |



### <a name="0010_3271_0100"></a>DFA (0x0010) <= ConergyDT5 (0x3271), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Pumpe 1 | 1 | % |
| 9 |  | Drehzahl Pumpe 2 | 1 | % |
| 10 |  | Relaismaske | 1 |  |
| 11 |  | Fehlermaske | 1 |  |
| 12 |  | Systemzeit | 1 |  |
| 13 |  | Systemzeit | 256 |  |
| 14 |  | Schema | 1 |  |
| 15 | 0x01 | Option PostPulse | 1 |  |
| 15 | 0x02 | Option Thermostat | 1 |  |
| 15 | 0x04 | Option WMZ | 1 |  |
| 16 |  | Betriebsstunden Relais 1 | 1 |  |
| 17 |  | Betriebsstunden Relais 1 | 256 |  |
| 18 |  | Betriebsstunden Relais 2 | 1 |  |
| 19 |  | Betriebsstunden Relais 2 | 256 |  |
| 20 |  | Wärmemenge | 1 |  Wh |
| 21 |  | Wärmemenge | 256 |  Wh |
| 22 |  | Wärmemenge | 1000 |  Wh |
| 23 |  | Wärmemenge | 256000 |  Wh |
| 24 |  | Wärmemenge | 1000000 |  Wh |
| 25 |  | Wärmemenge | 256000000 |  Wh |
| 26 |  | Version | 0.01 |  |
| 27 |  | Version | 2.56 |  |



### <a name="0010_3311_0100"></a>DFA (0x0010) <= Diemasol C (0x3311), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Wärmemenge \(<= v1_01\) | 1 |  kWh |
| 6 |  | Temperatur Sensor 4 \(>= v1_02\) | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 \(>= v1_02\) | 25.6 |  °C |
| 7 |  | Wärmemenge \(<= v1_01\) | 256 |  kWh |
| 8 |  | Drehzahl Relais 1 \(>= v1_02\) | 1 | % |
| 8 |  | Drehzahl Relais 1 \(<= v1_01\) | 0.1 | % |
| 9 |  | Drehzahl Relais 1 \(<= v1_01\) | 25.6 | % |
| 9 |  | Drehzahl Relais 2 \(>= v1_02\) | 1 | % |
| 10 |  | Fehlermaske \(>= v1_02\) | 1 |  |
| 10 |  | Drehzahl Relais 2 \(<= v1_01\) | 0.1 | % |
| 11 |  | Relaismaske \(>= v1_02\) | 1 |  |
| 11 |  | Drehzahl Relais 2 \(<= v1_01\) | 25.6 | % |
| 12 |  | Wärmemenge \(>= v1_02\) | 1 |  kWh |
| 13 |  | Wärmemenge \(>= v1_02\) | 256 |  kWh |



### <a name="0010_4111_0100"></a>DFA (0x0010) <= DeltaSol AL (0x4111), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 10 |  | Anzeige-Status | 1 |  |
| 11 |  | Anzeige-Status | 256 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 65536 |  Wh |
| 19 |  | Wärmemenge | 16777216 |  Wh |



### <a name="0010_4211_0100"></a>DFA (0x0010) <= SKSC1/2 (0x4211), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur S1 | 0.1 |  °C |
| 1 |  | Temperatur S1 | 25.6 |  °C |
| 2 |  | Temperatur S2 | 0.1 |  °C |
| 3 |  | Temperatur S2 | 25.6 |  °C |
| 4 |  | Temperatur S3 | 0.1 |  °C |
| 5 |  | Temperatur S3 | 25.6 |  °C |
| 6 |  | Temperatur S4 | 0.1 |  °C |
| 7 |  | Temperatur S4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 |  | Fehlermaske | 1 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 1000 |  Wh |
| 19 |  | Wärmemenge | 256000 |  Wh |
| 20 |  | Wärmemenge | 1000000 |  Wh |
| 21 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_4212_0100"></a>DFA (0x0010) <= DeltaSol C (0x4212), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur S1 | 0.1 |  °C |
| 1 |  | Temperatur S1 | 25.6 |  °C |
| 2 |  | Temperatur S2 | 0.1 |  °C |
| 3 |  | Temperatur S2 | 25.6 |  °C |
| 4 |  | Temperatur S3 | 0.1 |  °C |
| 5 |  | Temperatur S3 | 25.6 |  °C |
| 6 |  | Temperatur S4 | 0.1 |  °C |
| 7 |  | Temperatur S4 | 25.6 |  °C |
| 8 |  | Drehzahl R1 | 1 | % |
| 9 |  | Drehzahl R2 | 1 | % |
| 10 |  | Fehlermaske | 1 |  |
| 11 |  | Variante | 1 |  |
| 12 |  | Betriebsstunden R1 | 1 |  h |
| 13 |  | Betriebsstunden R1 | 256 |  h |
| 14 |  | Betriebsstunden R2 | 1 |  h |
| 15 |  | Betriebsstunden R2 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 1000 |  Wh |
| 19 |  | Wärmemenge | 256000 |  Wh |
| 20 |  | Wärmemenge | 1000000 |  Wh |
| 21 |  | Wärmemenge | 256000000 |  Wh |
| 22 |  | Systemzeit | 1 |  |
| 23 |  | Systemzeit | 256 |  |



### <a name="0010_4213_0100"></a>DFA (0x0010) <= SKSC2 HE (0x4213), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur S1 | 0.1 |  °C |
| 1 |  | Temperatur S1 | 25.6 |  °C |
| 2 |  | Temperatur S2 | 0.1 |  °C |
| 3 |  | Temperatur S2 | 25.6 |  °C |
| 4 |  | Temperatur S3 | 0.1 |  °C |
| 5 |  | Temperatur S3 | 25.6 |  °C |
| 6 |  | Temperatur S4 | 0.1 |  °C |
| 7 |  | Temperatur S4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 |  | Fehlermaske | 1 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 1000 |  Wh |
| 19 |  | Wärmemenge | 256000 |  Wh |
| 20 |  | Wärmemenge | 1000000 |  Wh |
| 21 |  | Wärmemenge | 256000000 |  Wh |
| 24 |  | Temperatur VFD1 | 0.1 |  °C |
| 25 |  | Temperatur VFD1 | 25.6 |  °C |
| 26 |  | Volumenstrom VFD1 | 1 |  l/h |
| 27 |  | Volumenstrom VFD1 | 256 |  l/h |
| 32 |  | Spannung 10V | 0.1 |  V |



### <a name="0010_4214_0100"></a>DFA (0x0010) <= SKSC2 HE (0x4214), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur S1 | 0.1 |  °C |
| 1 |  | Temperatur S1 | 25.6 |  °C |
| 2 |  | Temperatur S2 | 0.1 |  °C |
| 3 |  | Temperatur S2 | 25.6 |  °C |
| 4 |  | Temperatur S3 | 0.1 |  °C |
| 5 |  | Temperatur S3 | 25.6 |  °C |
| 6 |  | Temperatur S4 | 0.1 |  °C |
| 7 |  | Temperatur S4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 |  | Fehlermaske | 1 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 1000 |  Wh |
| 19 |  | Wärmemenge | 256000 |  Wh |
| 20 |  | Wärmemenge | 1000000 |  Wh |
| 21 |  | Wärmemenge | 256000000 |  Wh |
| 24 |  | Temperatur VFD1 | 0.1 |  °C |
| 25 |  | Temperatur VFD1 | 25.6 |  °C |
| 26 |  | Volumenstrom VFD1 | 1 |  l/h |
| 27 |  | Volumenstrom VFD1 | 256 |  l/h |
| 32 |  | Spannung 10V | 0.1 |  V |



### <a name="0010_4221_0100"></a>DFA (0x0010) <= DeltaSol BS Plus (0x4221), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Pumpe 1 | 1 | % |
| 9 |  | Drehzahl Pumpe 2 | 1 | % |
| 10 |  | Relaismaske | 1 |  |
| 11 |  | Fehlermaske | 1 |  |
| 12 |  | Systemzeit | 1 |  |
| 13 |  | Systemzeit | 256 |  |
| 14 |  | Schema | 1 |  |
| 15 | 0x01 | Option Kollektor Max_ | 1 |  |
| 15 | 0x02 | Option Kollektor Min_ | 1 |  |
| 15 | 0x04 | Option Kollektor Frost | 1 |  |
| 15 | 0x08 | Option Röhrenkollektor | 1 |  |
| 15 | 0x10 | Option Rückkühlung | 1 |  |
| 15 | 0x20 | Option WMZ | 1 |  |
| 16 |  | Betriebsstunden Relais 1 | 1 |  |
| 17 |  | Betriebsstunden Relais 1 | 256 |  |
| 18 |  | Betriebsstunden Relais 2 | 1 |  |
| 19 |  | Betriebsstunden Relais 2 | 256 |  |
| 20 |  | Wärmemenge | 1 |  Wh |
| 21 |  | Wärmemenge | 256 |  Wh |
| 22 |  | Wärmemenge | 1000 |  Wh |
| 23 |  | Wärmemenge | 256000 |  Wh |
| 24 |  | Wärmemenge | 1000000 |  Wh |
| 25 |  | Wärmemenge | 256000000 |  Wh |
| 26 |  | Version | 0.01 |  |
| 27 |  | Version | 2.56 |  |



### <a name="0010_4223_0100"></a>DFA (0x0010) <= DeltaSol BS Plus BTU (0x4223), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °F |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °F |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °F |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °F |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °F |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °F |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °F |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °F |
| 8 |  | Drehzahl Pumpe 1 | 1 | % |
| 9 |  | Drehzahl Pumpe 2 | 1 | % |
| 10 |  | Relaismaske | 1 |  |
| 11 |  | Fehlermaske | 1 |  |
| 12 |  | Systemzeit | 1 |  |
| 13 |  | Systemzeit | 256 |  |
| 14 |  | Schema | 1 |  |
| 15 | 0x01 | Option Kollektor Max_ | 1 |  |
| 15 | 0x02 | Option Kollektor Min_ | 1 |  |
| 15 | 0x04 | Option Kollektor Frost | 1 |  |
| 15 | 0x08 | Option Röhrenkollektor | 1 |  |
| 15 | 0x10 | Option Rückkühlung | 1 |  |
| 15 | 0x20 | Option WMZ | 1 |  |
| 16 |  | Betriebsstunden Relais 1 | 1 |  |
| 17 |  | Betriebsstunden Relais 1 | 256 |  |
| 18 |  | Betriebsstunden Relais 2 | 1 |  |
| 19 |  | Betriebsstunden Relais 2 | 256 |  |
| 20 |  | Wärmemenge | 1 |  BTU |
| 21 |  | Wärmemenge | 256 |  BTU |
| 22 |  | Wärmemenge | 1000 |  BTU |
| 23 |  | Wärmemenge | 256000 |  BTU |
| 24 |  | Wärmemenge | 1000000 |  BTU |
| 25 |  | Wärmemenge | 256000000 |  BTU |
| 26 |  | Version | 0.01 |  |
| 27 |  | Version | 2.56 |  |



### <a name="0010_4224_0100"></a>DFA (0x0010) <= CS2.2 (0x4224), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Pumpe 1 | 1 | % |
| 9 |  | Drehzahl Pumpe 2 | 1 | % |
| 10 |  | Relaismaske | 1 |  |
| 11 |  | Fehlermaske | 1 |  |
| 12 |  | Systemzeit | 1 |  |
| 13 |  | Systemzeit | 256 |  |
| 14 |  | Schema | 1 |  |
| 15 | 0x01 | Option Kollektor Max_ | 1 |  |
| 15 | 0x02 | Option Kollektor Min_ | 1 |  |
| 15 | 0x04 | Option Kollektor Frost | 1 |  |
| 15 | 0x08 | Option Röhrenkollektor | 1 |  |
| 15 | 0x10 | Option Rückkühlung | 1 |  |
| 15 | 0x20 | Option WMZ | 1 |  |
| 16 |  | Betriebsstunden Relais 1 | 1 |  |
| 17 |  | Betriebsstunden Relais 1 | 256 |  |
| 18 |  | Betriebsstunden Relais 2 | 1 |  |
| 19 |  | Betriebsstunden Relais 2 | 256 |  |
| 20 |  | Wärmemenge | 1 |  Wh |
| 21 |  | Wärmemenge | 256 |  Wh |
| 22 |  | Wärmemenge | 1000 |  Wh |
| 23 |  | Wärmemenge | 256000 |  Wh |
| 24 |  | Wärmemenge | 1000000 |  Wh |
| 25 |  | Wärmemenge | 256000000 |  Wh |
| 26 |  | Version | 0.01 |  |
| 27 |  | Version | 2.56 |  |



### <a name="0010_4231_0100"></a>DFA (0x0010) <= Frista (0x4231), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Warmwasser | 0.1 |  °C |
| 1 |  | Temperatur Warmwasser | 25.6 |  °C |
| 2 |  | Temperatur Kaltwasser | 0.1 |  °C |
| 3 |  | Temperatur Kaltwasser | 25.6 |  °C |
| 4 |  | Temperatur Zirkulation | 0.1 |  °C |
| 5 |  | Temperatur Zirkulation | 25.6 |  °C |
| 6 |  | Volumenstrom | 0.1 |  l/min |
| 7 |  | Volumenstrom | 25.6 |  l/min |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 |  | Systemzeit | 1 |  |
| 11 |  | Systemzeit | 256 |  |
| 12 |  | Optionen | 1 |  |
| 13 |  | Status | 1 |  |
| 14 |  | Relaisstatus | 1 |  |
| 15 |  | SensorDefekt | 1 |  |
| 16 |  | Temperatur WW-Soll | 1 |  °C |
| 17 |  | Temperatur Quelle | 1 |  °C |
| 19 |  | verbl_ Zapfung | 1 |  min |
| 20 |  | Schaltspiele | 1 |  |
| 21 |  | Schaltspiele | 256 |  |
| 22 |  | Schaltspiele | 65536 |  |
| 23 |  | Schaltspiele | 16777216 |  |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 1000 |  Wh |
| 27 |  | Wärmemenge | 256000 |  Wh |
| 28 |  | Wärmemenge | 1000000 |  Wh |
| 29 |  | Wärmemenge | 256000000 |  Wh |
| 30 |  | Version | 1 |  |
| 31 |  | Version | 0 |  |
| 32 |  | max_ Temperatur Kaltwasser | 0.1 |  °C |
| 33 |  | max_ Temperatur Kaltwasser | 25.6 |  °C |
| 34 |  | min_ Temperatur Kaltwasser | 0.1 |  °C |
| 35 |  | min_ Temperatur Kaltwasser | 25.6 |  °C |
| 36 |  | max_ Volumenstrom | 1 |  l/h |
| 37 |  | max_ Volumenstrom | 256 |  l/h |
| 38 |  | Zapfmenge | 0.1 |  m³ |
| 39 |  | Zapfmenge | 25.6 |  m³ |



### <a name="0010_4241_0100"></a>DFA (0x0010) <= Huber - REGLOfresh / Felix \[Regler\] (0x4241), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Warmwasser \(Anzeige\) | 0.1 |  °C |
| 1 |  | Temperatur Warmwasser \(Anzeige\) | 25.6 |  °C |
| 2 |  | Temperatur Kaltwasser | 0.1 |  °C |
| 3 |  | Temperatur Kaltwasser | 25.6 |  °C |
| 4 |  | Temperatur Puffer | 0.1 |  °C |
| 5 |  | Temperatur Puffer | 25.6 |  °C |
| 6 |  | Volumenstrom | 0.01 |  l/h |
| 7 |  | Volumenstrom | 2.56 |  l/h |
| 8 |  | Drehzahl1 | 1 | % |
| 9 |  | Drehzahl2 | 1 | % |
| 10 |  | Systemzeit | 1 |  |
| 11 |  | Systemzeit | 256 |  |
| 12 | 0x01 | Option Zirkulation aktiv | 1 |  |
| 12 | 0x02 | Option Notbetrieb aktiv | 1 |  |
| 13 | 0x01 | Zapfung aktiv | 1 |  |
| 13 | 0x02 | Frischwasserbereitung aktiv | 1 |  |
| 13 | 0x04 | Handbetrieb aktiv | 1 |  |
| 13 | 0x08 | Notbetrieb aktiv | 1 |  |
| 13 | 0x10 | Blockierschutz aktiv | 1 |  |
| 13 | 0x20 | Zirkulation aktiv | 1 |  |
| 13 | 0x40 | Überhitzung aktiv | 1 |  |
| 13 | 0x80 | Zapfungsimpuls aktiv | 1 |  |
| 14 | 0x01 | Relais 1 | 1 |  |
| 14 | 0x02 | Relais 2 | 1 |  |
| 15 | 0x01 | Sensor 1 defekt | 1 |  |
| 15 | 0x02 | Sensor 2 defekt | 1 |  |
| 15 | 0x04 | Sensor 3 defekt | 1 |  |
| 15 | 0x08 | Sensor 4 defekt | 1 |  |
| 16 |  | Warmwassersolltemperatur | 1 |  °C |
| 17 |  | Temperatur Mischer | 1 |  °C |
| 18 |  | dT Puffer | 0.1 |  K |
| 19 |  | Verbleibende Zirkulationsdauer | 1 |  min |
| 20 |  | Anzahl Schaltspiele | 1 |  |
| 21 |  | Anzahl Schaltspiele | 256 |  |
| 22 |  | Anzahl Schaltspiele | 65536 |  |
| 23 |  | Anzahl Schaltspiele | 16777216 |  |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 1000 |  Wh |
| 27 |  | Wärmemenge | 256000 |  Wh |
| 28 |  | Wärmemenge | 1000000 |  Wh |
| 29 |  | Wärmemenge | 256000000 |  Wh |
| 30 |  | Softwareversion major | 1 |  |
| 31 |  | Softwareversion minor | 1 |  |
| 32 |  | Temperatur max_ Kaltwasser | 0.1 |  °C |
| 33 |  | Temperatur max_ Kaltwasser | 25.6 |  °C |
| 34 |  | Temperatur min_ Kaltwasser | 0.1 |  °C |
| 35 |  | Temperatur min_ Kaltwasser | 25.6 |  °C |
| 36 |  | Volumenstrom max_ | 1 |  l/h |
| 37 |  | Volumenstrom max_ | 256 |  l/h |
| 38 |  | Zapfmenge max_ | 1 |  m³ |
| 39 |  | Zapfmenge max_ | 256 |  m³ |
| 40 |  | Temperatur Warmwasser \(Regel\) | 0.1 |  °C |
| 41 |  | Temperatur Warmwasser \(Regel\) | 25.6 |  °C |
| 42 |  | Temperatur Quelle \(Regel\) | 0.1 |  °C |
| 43 |  | Temperatur Quelle \(Regel\) | 25.6 |  °C |
| 44 |  | Interner Wert | 1 |  |
| 45 |  | Interner Wert | 1 |  |
| 46 |  | Interner Wert | 1 |  |
| 47 |  | Interner Wert | 1 |  |
| 48 |  | Interner Wert | 1 |  |
| 49 |  | Interner Wert | 256 |  |
| 50 |  | Interner Wert | 1 |  |
| 51 |  | Interner Wert | 256 |  |



### <a name="0010_4251_0100"></a>DFA (0x0010) <= DSPlus UMSYS \[Regler\] (0x4251), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Absorbertemperatur \(S1\) | 0.1 |  °C |
| 1 |  | Absorbertemperatur \(S1\) | 25.6 |  °C |
| 2 |  | Temperatur hinter Wärmepumpe \(S2\) | 0.1 |  °C |
| 3 |  | Temperatur hinter Wärmepumpe \(S2\) | 25.6 |  °C |
| 4 |  | Temperatur hinter Erdspeicher \(S3\) | 0.1 |  °C |
| 5 |  | Temperatur hinter Erdspeicher \(S3\) | 25.6 |  °C |
| 6 |  | Ann_ Temperatur Erdspeicher | 0.1 |  °C |
| 7 |  | Ann_ Temperatur Erdspeicher | 25.6 |  °C |
| 8 |  | Temperatur hinter Pumpe 1 \(S4\) | 0.1 |  °C |
| 9 |  | Temperatur hinter Pumpe 1 \(S4\) | 25.6 |  °C |
| 10 |  | Systemzeit | 1 |  |
| 11 |  | Systemzeit | 256 |  |
| 12 |  | Einschalttemperaturdifferenz | 0.1 |  K |
| 13 |  | Einschalttemperaturdifferenz | 25.6 |  K |
| 14 |  | Ausschalttemperaturdifferenz | 0.1 |  K |
| 15 |  | Ausschalttemperaturdifferenz | 25.6 |  K |
| 16 |  | dT Wärmepumpe an | 0.1 |  K |
| 17 |  | dT Wärmepumpe an | 25.6 |  K |
| 18 |  | dT Wärmepumpe aus | 0.1 |  K |
| 19 |  | dT Wärmepumpe aus | 25.6 |  K |
| 20 |  | Erdspeicher Maximaltemperatur | 0.1 |  °C |
| 21 |  | Erdspeicher Maximaltemperatur | 25.6 |  °C |
| 22 | 0x01 | S1 defekt | 1 |  |
| 22 | 0x02 | S2 defekt | 1 |  |
| 22 | 0x04 | S3 defekt | 1 |  |
| 22 | 0x08 | S4 defekt | 1 |  |
| 22 | 0x10 | dT ausreichend | 1 |  |
| 22 | 0x20 | Wärmepumpe an | 1 |  |
| 22 | 0x40 | Erdspeicher voll | 1 |  |
| 22 | 0x80 | Relais 1 an | 1 |  |
| 22 | 0x100 | Relais 2 an | 1 |  |
| 24 |  | Version | 0.01 |  |
| 25 |  | Version | 2.56 |  |



### <a name="0010_4252_0100"></a>DFA (0x0010) <= BS Solex US (0x4252), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Einheit | 1 |  |
| 10 |  | Drehzahl Relais 1 | 1 | % |
| 11 |  | Drehzahl Relais 2 | 1 | % |
| 12 |  | Betriebssekunden Relais 1 | 1 |  s |
| 13 |  | Betriebssekunden Relais 1 | 256 |  s |
| 14 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 15 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 16 |  | Betriebssekunden Relais 2 | 1 |  s |
| 17 |  | Betriebssekunden Relais 2 | 256 |  s |
| 18 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 19 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 20 | 0x01 | Sensor 1 defekt | 1 |  |
| 20 | 0x02 | Sensor 2 defekt | 1 |  |
| 20 | 0x04 | Sensor 3 defekt | 1 |  |
| 20 | 0x08 | Sensor 4 defekt | 1 |  |
| 22 | 0x01 | Kollektor Nottemperatur | 1 |  |
| 22 | 0x02 | Kollektor Minimaltemperatur | 1 |  |
| 22 | 0x04 | Wärmetauscher Nottemperatur | 1 |  |
| 22 | 0x08 | Speichernottemperatur | 1 |  |
| 22 | 0x10 | Speicher leer | 1 |  |
| 22 | 0x20 | Speichermaximaltemperatur | 1 |  |
| 22 | 0x40 | Kollektor Frostschutz | 1 |  |
| 22 | 0x80 | Wärmetauscher Frostschutz | 1 |  |
| 23 | 0x01 | Röhrenkollektor | 1 |  |
| 23 | 0x02 | Beladung | 1 |  |
| 23 | 0x04 | R1 - Handbetrieb | 1 |  |
| 23 | 0x08 | R2 - Handbetrieb | 1 |  |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 65536 |  Wh |
| 27 |  | Wärmemenge | 16777216 |  Wh |
| 28 |  | Uhrzeit | 1 |  |
| 29 |  | Uhrzeit | 256 |  |
| 30 |  | Version | 0.01 |  |
| 31 |  | Version | 2.56 |  |



### <a name="0010_4265_0100"></a>DFA (0x0010) <= Aton DeltaSol BS (0x4265), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 | 0x01 | Sensor 1 defekt | 1 |  |
| 10 | 0x02 | Sensor 2 defekt | 1 |  |
| 10 | 0x04 | Sensor 3 defekt | 1 |  |
| 10 | 0x08 | Sensor 4 defekt | 1 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 1000 |  Wh |
| 19 |  | Wärmemenge | 256000 |  Wh |
| 20 |  | Wärmemenge | 1000000 |  Wh |
| 21 |  | Wärmemenge | 256000000 |  Wh |
| 24 |  | Version | 0.01 |  |
| 25 |  | Version | 2.56 |  |



### <a name="0010_4278_0100"></a>DFA (0x0010) <= DeltaSol BS/DrainBack (0x4278), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 | 0x01 | Sensor 1 defekt | 1 |  |
| 10 | 0x02 | Sensor 2 defekt | 1 |  |
| 10 | 0x04 | Sensor 3 defekt | 1 |  |
| 10 | 0x08 | Sensor 4 defekt | 1 |  |
| 10 | 0x10 | Speichernottemperatur | 1 |  |
| 10 | 0x20 | Kollektor Nottemperatur | 1 |  |
| 11 | 0x01 | R1 - Handbetrieb | 1 |  |
| 11 | 0x02 | R2 - Handbetrieb | 1 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 1000 |  Wh |
| 19 |  | Wärmemenge | 256000 |  Wh |
| 20 |  | Wärmemenge | 1000000 |  Wh |
| 21 |  | Wärmemenge | 256000000 |  Wh |
| 22 |  | Status | 1 |  |
| 23 |  | Programm | 1 |  |
| 24 |  | Version | 0.01 |  |
| 25 |  | Version | 2.56 |  |



### <a name="0010_4279_0100"></a>DFA (0x0010) <= DeltaSol BS/DrainBack \(Fahrenheit\) (0x4279), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °F |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °F |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °F |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °F |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °F |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °F |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °F |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °F |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 | 0x01 | Sensor 1 defekt | 1 |  |
| 10 | 0x02 | Sensor 2 defekt | 1 |  |
| 10 | 0x04 | Sensor 3 defekt | 1 |  |
| 10 | 0x08 | Sensor 4 defekt | 1 |  |
| 10 | 0x10 | Speichernottemperatur | 1 |  |
| 10 | 0x20 | Kollektor Nottemperatur | 1 |  |
| 11 | 0x01 | R1 - Handbetrieb | 1 |  |
| 11 | 0x02 | R2 - Handbetrieb | 1 |  |
| 12 |  | Betriebsstunden Relais 1 | 1 |  h |
| 13 |  | Betriebsstunden Relais 1 | 256 |  h |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 1000 |  Wh |
| 19 |  | Wärmemenge | 256000 |  Wh |
| 20 |  | Wärmemenge | 1000000 |  Wh |
| 21 |  | Wärmemenge | 256000000 |  Wh |
| 22 |  | Status | 1 |  |
| 23 |  | Programm | 1 |  |
| 24 |  | Version | 0.01 |  |
| 25 |  | Version | 2.56 |  |



### <a name="0010_427B_0100"></a>DFA (0x0010) <= DeltaSol BS 2009 (0x427B), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 10 |  | Betriebsstunden Relais 1 | 1 |  h |
| 11 |  | Betriebsstunden Relais 1 | 256 |  h |
| 12 |  | Drehzahl Relais 2 | 1 | % |
| 14 |  | Betriebsstunden Relais 2 | 1 |  h |
| 15 |  | Betriebsstunden Relais 2 | 256 |  h |
| 16 |  | UnitType | 1 |  |
| 17 |  | System | 1 |  |
| 20 | 0x01 | Sensor 1 defekt | 1 |  |
| 20 | 0x02 | Sensor 2 defekt | 1 |  |
| 20 | 0x04 | Sensor 3 defekt | 1 |  |
| 20 | 0x08 | Sensor 4 defekt | 1 |  |
| 20 |  | ErrorMask | 1 |  |
| 21 |  | ErrorMask | 256 |  |
| 22 |  | Systemzeit | 1 |  |
| 23 |  | Systemzeit | 256 |  |
| 24 |  | Statusmask | 1 |  |
| 25 |  | Statusmask | 256 |  |
| 26 |  | Statusmask | 65536 |  |
| 27 |  | Statusmask | 16777216 |  |
| 28 |  | Wärmemenge | 1 |  Wh |
| 29 |  | Wärmemenge | 256 |  Wh |
| 30 |  | Wärmemenge | 65536 |  Wh |
| 31 |  | Wärmemenge | 16777216 |  Wh |
| 32 |  | SW-Version | 0.01 |  |
| 33 |  | SW-Version | 2.56 |  |
| 34 |  | Variante | 1 |  |
| 35 |  | Variante | 256 |  |



### <a name="0010_4311_0100"></a>DFA (0x0010) <= Drainback DeDietrich (0x4311), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | TC | 0.1 |  °C |
| 1 |  | TC | 25.6 |  °C |
| 2 |  | CD | 0.1 |  °C |
| 3 |  | CD | 25.6 |  °C |
| 4 |  | CU | 0.1 |  °C |
| 5 |  | CU | 25.6 |  °C |
| 6 |  | P1 | 1 | % |
| 7 |  | P2 | 1 | % |
| 10 |  | LS | 0.1 |  |
| 11 |  | LS | 25.6 |  |
| 12 |  | Ph | 1 |  |
| 13 |  | P1S | 1 |  |
| 16 |  | KWH | 0.1 |  kWh |
| 17 |  | KWH | 25.6 |  kWh |
| 18 |  | KWH | 6553.6 |  kWh |
| 19 |  | KWH | 1677721.6 |  kWh |



### <a name="0010_4321_0100"></a>DFA (0x0010) <= DeltaSol MiniPool (0x4321), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 |  | Systemzeit | 1 |  |
| 11 |  | Systemzeit | 256 |  |
| 12 |  | Status-Info 1 | 1 |  |
| 13 |  | Status-Info 2 | 1 |  |
| 14 |  | Status-Restlaufzeit | 1 |  |
| 15 |  | Status-Restlaufzeit | 256 |  |
| 16 |  | Filterlaufzeit heute | 1 |  s |
| 17 |  | Filterlaufzeit heute | 256 |  s |
| 18 |  | Filterlaufzeit heute | 65536 |  s |
| 19 |  | Regelstatus | 1 |  |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 65536 |  Wh |
| 27 |  | Wärmemenge | 16777216 |  Wh |



### <a name="0010_5111_0100"></a>DFA (0x0010) <= DeltaSol D (0x5111), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Systemdruck | 0.1 |  bar |
| 11 |  | Systemdruck | 25.6 |  bar |
| 12 |  | Volumenstrom | 1 |  l/h |
| 13 |  | Volumenstrom | 256 |  l/h |
| 14 |  | Drehzahl Relais 1 | 1 | % |
| 15 |  | Systemmeldung | 1 |  |
| 20 |  | Wärmemenge | 1 |  Wh |
| 21 |  | Wärmemenge | 256 |  Wh |
| 22 |  | Wärmemenge | 65536 |  Wh |
| 23 |  | Wärmemenge | 16777216 |  Wh |
| 24 |  | Datum | 1 |  |
| 25 |  | Datum | 256 |  |
| 26 |  | Datum | 65536 |  |
| 27 |  | Datum | 16777216 |  |
| 28 |  | Uhrzeit | 1 |  |
| 29 |  | Uhrzeit | 256 |  |



### <a name="0010_5112_0100"></a>DFA (0x0010) <= Speicherofenregler (0x5112), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Volumenstrom | 1 |  l/h |
| 9 |  | Volumenstrom | 256 |  l/h |
| 10 |  | Drehzahl Relais 1 | 1 | % |
| 11 |  | Systemmeldung | 1 |  |
| 12 |  | Leistung | 0.001 |  kW |
| 13 |  | Leistung | 0.256 |  kW |
| 14 |  | Leistung | 65.536 |  kW |
| 15 |  | Leistung | 16777.216 |  kW |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 65536 |  Wh |
| 19 |  | Wärmemenge | 16777216 |  Wh |
| 20 |  | Datum | 1 |  |
| 21 |  | Datum | 256 |  |
| 22 |  | Datum | 65536 |  |
| 23 |  | Datum | 16777216 |  |
| 24 |  | Uhrzeit | 1 |  |
| 25 |  | Uhrzeit | 256 |  |



### <a name="0010_5121_0100"></a>DFA (0x0010) <= FriwaMini (0x5121), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Kaltwassertemperatur | 0.1 |  °C |
| 1 |  | Kaltwassertemperatur | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Sollwert | 0.01 |  °C |
| 7 |  | Sollwert | 2.56 |  °C |
| 8 |  | Ladetemperatur | 0.01 |  °C |
| 9 |  | Ladetemperatur | 2.56 |  °C |
| 10 |  | Ladevolumenstrom | 0.01 |  l/min |
| 11 |  | Ladevolumenstrom | 2.56 |  l/min |
| 12 |  | Warmwassertemperatur | 0.01 |  °C |
| 13 |  | Warmwassertemperatur | 2.56 |  °C |
| 14 |  | Zapfvolumenstrom | 0.01 |  l/min |
| 15 |  | Zapfvolumenstrom | 2.56 |  l/min |
| 16 |  | PWM1 | 1 | % |
| 17 |  | Relais 1 | 1 | % |
| 18 |  | Status | 1 |  |
| 19 |  | Zapfung | 1 |  |
| 20 |  | Fehlermaske | 1 |  |
| 21 |  | Fehlermaske | 256 |  |
| 22 |  | Fehlermaske | 65536 |  |
| 23 |  | Fehlermaske | 16777216 |  |
| 24 |  | Warnungsmaske | 1 |  |
| 25 |  | Warnungsmaske | 256 |  |
| 26 |  | Warnungsmaske | 65536 |  |
| 27 |  | Warnungsmaske | 16777216 |  |
| 28 |  | Wärmemenge | 1 |  Wh |
| 29 |  | Wärmemenge | 256 |  Wh |
| 30 |  | Wärmemenge | 1000 |  Wh |
| 31 |  | Wärmemenge | 256000 |  Wh |
| 32 |  | Wärmemenge | 1000000 |  Wh |
| 33 |  | Wärmemenge | 256000000 |  Wh |
| 36 |  | Zapfmenge | 0.1 |  |
| 37 |  | Zapfmenge | 25.6 |  |
| 38 |  | Zapfmenge | 6553.6 |  |
| 39 |  | Zapfmenge | 1677721.6 |  |
| 40 |  | Datum | 1 |  |
| 41 |  | Datum | 256 |  |
| 42 |  | Datum | 65536 |  |
| 43 |  | Datum | 16777216 |  |
| 44 |  | Systemzeit | 1 |  |
| 45 |  | Systemzeit | 256 |  |
| 46 |  | Version | 0.01 |  |
| 47 |  | Version | 2.56 |  |



### <a name="0010_5141_0100"></a>DFA (0x0010) <= Tuxhorn PKE (0x5141), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Drehzahl Relais 1 | 1 | % |
| 7 |  | Drehzahl Relais 2 | 1 | % |
| 8 |  | Systemmeldung | 1 |  |
| 10 |  | Fehlermaske | 1 |  |
| 11 |  | Fehlermaske | 256 |  |
| 12 |  | Datum | 1 |  |
| 13 |  | Datum | 256 |  |
| 14 |  | Datum | 65536 |  |
| 15 |  | Datum | 16777216 |  |
| 16 |  | Uhrzeit | 1 |  |
| 17 |  | Uhrzeit | 256 |  |



### <a name="0010_5210_0100"></a>DFA (0x0010) <= DeltaSol Plus (0x5210), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Drehzahl Relais 1 | 1 | % |
| 11 |  | Drehzahl Relais 2 | 1 | % |
| 12 |  | Volumenstrom | 1 |  l/h |
| 13 |  | Volumenstrom | 256 |  l/h |
| 14 |  | Frostschutzgehalt | 1 | % |
| 15 |  | Frostschutzart | 1 |  |
| 16 |  | Wärme | 1 |  Wh |
| 17 |  | Wärme | 256 |  Wh |
| 18 |  | Wärme | 1000 |  Wh |
| 19 |  | Wärme | 256000 |  Wh |
| 20 |  | Wärme | 1000000 |  Wh |
| 21 |  | Wärme | 256000000 |  Wh |
| 22 |  | Hardware | 1 |  |
| 23 |  | Software | 1 |  |
| 24 |  | Fehlermaske | 1 |  |
| 25 |  | Fehler-Info 1 | 1 |  |
| 26 |  | Fehler-Info 2 | 1 |  |
| 27 |  | Relaismaske | 1 |  |
| 28 |  | Systemzeit | 1 |  |
| 29 |  | Systemzeit | 256 |  |



### <a name="0010_5221_0100"></a>DFA (0x0010) <= DT4 \(MS\) (0x5221), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Drehzahl Relais 1 | 1 | % |
| 7 |  | Fehlermaske | 1 |  |
| 10 |  | Relaismaske | 1 |  |
| 12 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 16 |  | Volumenstrom | 0.1 |  l/min |
| 17 |  | Volumenstrom | 25.6 |  l/min |
| 18 |  | Wärmemenge | 1 |  Wh |
| 19 |  | Wärmemenge | 256 |  Wh |
| 20 |  | Wärmemenge | 1000 |  Wh |
| 21 |  | Wärmemenge | 256000 |  Wh |
| 22 |  | Wärmemenge | 1000000 |  Wh |
| 23 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_5231_0100"></a>DFA (0x0010) <= nemux (0x5231), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Durchfluss Sensor 5 | 0.1 |  l/min |
| 9 |  | Durchfluss Sensor 5 | 25.6 |  l/min |
| 10 |  | Drehzahl 1 | 0.1 | % |
| 11 |  | Drehzahl 1 | 25.6 | % |
| 12 |  | Drehzahl 2 | 1 | % |
| 13 |  | Fehlermaske | 1 |  |
| 14 |  | Warnungsmaske | 1 |  |
| 15 |  | Statusmaske | 1 |  |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 65536 |  Wh |
| 19 |  | Wärmemenge | 16777216 |  Wh |
| 20 |  | Betriebssekunden Relais 1 | 1 |  s |
| 21 |  | Betriebssekunden Relais 1 | 256 |  s |
| 22 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 23 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 24 |  | Betriebssekunden Relais 2 | 1 |  s |
| 25 |  | Betriebssekunden Relais 2 | 256 |  s |
| 26 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 27 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 28 |  | Zapfmenge | 0.001 |  m³ |
| 29 |  | Zapfmenge | 0.256 |  m³ |
| 30 |  | Zapfmenge | 65.536 |  m³ |
| 31 |  | Zapfmenge | 16777.216 |  m³ |
| 32 |  | Datum | 1 |  |
| 33 |  | Datum | 256 |  |
| 34 |  | Datum | 65536 |  |
| 35 |  | Datum | 16777216 |  |
| 36 |  | Systemzeit | 1 |  |
| 37 |  | Systemzeit | 256 |  |
| 38 |  | Version | 0.01 |  |
| 39 |  | Version | 2.56 |  |



### <a name="0010_5251_0100"></a>DFA (0x0010) <= Frischwasserregler (0x5251), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 22 |  | Temperatur VFS | 0.1 |  °C |
| 23 |  | Temperatur VFS | 25.6 |  °C |
| 36 |  | Volumenstrom VFS / FlowSonic | 1 |  l/h |
| 37 |  | Volumenstrom VFS / FlowSonic | 256 |  l/h |
| 38 |  | Volumenstrom VFS / FlowSonic | 65536 |  l/h |
| 39 |  | Volumenstrom VFS / FlowSonic | 16777216 |  l/h |
| 49 |  | Drehzahl Relais 1 | 1 | % |
| 50 |  | Drehzahl Relais 2 | 1 | % |
| 51 |  | Drehzahl Relais 3 | 1 | % |
| 52 |  | Drehzahl Relais 4 | 1 | % |
| 56 |  | Drehzahl Ausgang PWM 1 | 1 | % |
| 57 |  | Drehzahl Ausgang PWM 2 | 1 | % |
| 112 |  | Systemdatum | 1 |  |
| 113 |  | Systemdatum | 256 |  |
| 114 |  | Systemdatum | 65536 |  |
| 115 |  | Systemdatum | 16777216 |  |



### <a name="0010_5311_0100"></a>DFA (0x0010) <= X-Control (0x5311), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Einstrahlung Sensor 5 | 1 |  W/m² |
| 9 |  | Einstrahlung Sensor 5 | 256 |  W/m² |
| 10 |  | Drehzahl R1 | 1 | % |
| 11 |  | Drehzahl R2 | 1 | % |
| 12 |  | Drehzahl R3 | 1 | % |
| 13 |  | Relais-Maske | 1 |  |
| 14 |  | Wärmemenge | 1 |  Wh |
| 15 |  | Wärmemenge | 256 |  Wh |
| 16 |  | Wärmemenge | 1000 |  Wh |
| 17 |  | Wärmemenge | 256000 |  Wh |
| 18 |  | Wärmemenge | 1000000 |  Wh |
| 19 |  | Wärmemenge | 256000000 |  Wh |
| 21 |  | System | 1 |  |
| 22 | 0x01 | Optionen: Frostschutz | 1 |  |
| 22 | 0x04 | Optionen: Röhrenkollektor | 1 |  |
| 22 | 0x08 | Optionen: Rückkühlung | 1 |  |
| 22 | 0x10 | Optionen: Kollektorkühlung | 1 |  |
| 22 | 0x20 | Optionen: Externer WT | 1 |  |
| 22 | 0x40 | Optionen: Nachheizung | 1 |  |
| 22 | 0x80 | Optionen: Rücklaufanhebung | 1 |  |
| 22 | 0x100 | Optionen: Ventil | 1 |  |
| 22 | 0x200 | Optionen: Minimal | 1 |  |
| 22 | 0x400 | Optionen: WMZ | 1 |  |
| 22 | 0x800 | Optionen: Boilerladung | 1 |  |
| 22 | 0x1000 | Optionen: Solarzelle | 1 |  |
| 22 | 0x2000 | Optionen: 2_ Kollektor-Ventil | 1 |  |
| 24 |  | Fehlermaske | 1 |  |
| 25 |  | Sensorbruch-Maske | 1 |  |
| 26 |  | Sensorkurzschluss-Maske | 1 |  |
| 28 |  | Systemzeit | 1 |  |
| 29 |  | Systemzeit | 256 |  |



### <a name="0010_5400_0100"></a>DFA (0x0010) <= DeltaTherm HC \[Regler\] (0x5400), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Einstrahlung Sensor | 1 |  W/m² |
| 19 |  | Einstrahlung Sensor | 256 |  W/m² |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 12 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 12 | 25.6 |  °C |
| 24 |  | Volumenstrom Sensor 1 | 1 |  l/h |
| 25 |  | Volumenstrom Sensor 1 | 256 |  l/h |
| 26 |  | Volumenstrom Sensor 1 | 65536 |  l/h |
| 27 |  | Volumenstrom Sensor 1 | 16777216 |  l/h |
| 28 |  | Volumenstrom Sensor 2 | 1 |  l/h |
| 29 |  | Volumenstrom Sensor 2 | 256 |  l/h |
| 30 |  | Volumenstrom Sensor 2 | 65536 |  l/h |
| 31 |  | Volumenstrom Sensor 2 | 16777216 |  l/h |
| 32 |  | Volumenstrom Sensor 3 | 1 |  l/h |
| 33 |  | Volumenstrom Sensor 3 | 256 |  l/h |
| 34 |  | Volumenstrom Sensor 3 | 65536 |  l/h |
| 35 |  | Volumenstrom Sensor 3 | 16777216 |  l/h |
| 36 |  | Druck Sensor 11 | 0.01 |  bar |
| 37 |  | Druck Sensor 11 | 2.56 |  bar |
| 38 |  | Druck Sensor 12 | 0.01 |  bar |
| 39 |  | Druck Sensor 12 | 2.56 |  bar |
| 40 |  | Drehzahl Relais 1 | 1 | % |
| 41 |  | Drehzahl Relais 2 | 1 | % |
| 42 |  | Drehzahl Relais 3 | 1 | % |
| 43 |  | Drehzahl Relais 4 | 1 | % |
| 44 |  | Drehzahl Relais 5 | 1 | % |
| 45 |  | Regler Ausgang 1 | 1 | % |
| 46 |  | Regler Ausgang 2 | 1 | % |
| 48 |  | Systemdatum | 1 |  |
| 49 |  | Systemdatum | 256 |  |
| 50 |  | Systemdatum | 65536 |  |
| 51 |  | Systemdatum | 16777216 |  |
| 52 |  | Fehlermaske | 1 |  |
| 53 |  | Fehlermaske | 256 |  |
| 54 |  | Fehlermaske | 65536 |  |
| 55 |  | Fehlermaske | 16777216 |  |
| 56 |  | Warnungmaske | 1 |  |
| 57 |  | Warnungmaske | 256 |  |
| 58 |  | Warnungmaske | 65536 |  |
| 59 |  | Warnungmaske | 16777216 |  |



### <a name="0010_5410_0100"></a>DFA (0x0010) <= DeltaTherm HC \[Heizkreis #0\] (0x5410), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | TVorlaufSoll | 0.1 |  °C |
| 1 |  | TVorlaufSoll | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |
| 3 |  | Betriebsart | 1 |  |
| 4 |  | Brennerstarts | 1 |  |
| 5 |  | Brennerstarts | 256 |  |
| 6 |  | Brennerstarts | 65536 |  |
| 7 |  | Brennerstarts | 16777216 |  |



### <a name="0010_5420_0100"></a>DFA (0x0010) <= DeltaTherm HC \[WMZ #0\] (0x5420), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wert | 1 |  kWh |
| 1 |  | Wert | 256 |  kWh |
| 2 |  | Wert | 65536 |  kWh |
| 3 |  | Wert | 16777216 |  kWh |
| 4 |  | Leistung | 1 |  W |
| 5 |  | Leistung | 256 |  W |
| 6 |  | Leistung | 65536 |  W |
| 7 |  | Leistung | 16777216 |  W |
| 8 |  | WertHeute | 1 |  kWh |
| 9 |  | WertHeute | 256 |  kWh |
| 10 |  | WertHeute | 65536 |  kWh |
| 11 |  | WertHeute | 16777216 |  kWh |
| 12 |  | WertWoche | 1 |  kWh |
| 13 |  | WertWoche | 256 |  kWh |
| 14 |  | WertWoche | 65536 |  kWh |
| 15 |  | WertWoche | 16777216 |  kWh |



### <a name="0010_5510_0100"></a>DFA (0x0010) <= EL2/3 (0x5510), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Betriebsstunden | 1 |  h |
| 9 |  | Betriebsstunden | 256 |  h |
| 10 |  | Drehzahl Relais 1 | 1 | % |
| 11 |  | Regelstatus | 1 |  |
| 12 |  | Fehlermaske | 1 |  |



### <a name="0010_5611_0100"></a>DFA (0x0010) <= DeltaTherm FK (0x5611), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 |  | Mischer auf | 1 | % |
| 11 |  | Mischer zu | 1 | % |
| 12 |  | Datum | 1 |  |
| 13 |  | Datum | 256 |  |
| 14 |  | Datum | 65536 |  |
| 15 |  | Datum | 16777216 |  |
| 16 |  | Uhrzeit | 1 |  |
| 17 |  | Uhrzeit | 256 |  |
| 18 |  | Systemmeldung | 1 |  |



### <a name="0010_6610_0100"></a>DFA (0x0010) <= Midi Pro (0x6610), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 | 0x01 | Relaisstatus 1 | 1 |  |
| 12 | 0x02 | Relaisstatus 2 | 1 |  |
| 12 | 0x04 | Relaisstatus 3 | 1 |  |
| 12 | 0x08 | Relaisstatus 4 | 1 |  |
| 12 | 0x10 | Relaisstatus 5 | 1 |  |
| 12 | 0x20 | Relaisstatus 6 | 1 |  |
| 13 |  | Drehzahl 1 | 1 | % |
| 15 |  | Fehlernummer | 1 |  |
| 16 |  | Fehlermaske | 1 |  |
| 17 |  | Fehlermaske | 256 |  |
| 18 |  | Fehler-Info 1 | 1 |  |
| 19 |  | Fehler-Info 2 | 1 |  |
| 20 |  | Fehler-Info 3 | 1 |  |
| 21 |  | Fehler-Info 4 | 1 |  |
| 22 |  | Anlagenoptionen 1 | 1 |  |
| 23 |  | Anlagenoptionen 1 | 256 |  |
| 24 |  | System | 1 |  |
| 25 |  | Version | 1 |  |
| 26 |  | Version | 256 |  |
| 27 |  | Modulstatus | 1 |  |
| 28 |  | Systemzeit | 1 |  |
| 29 |  | Systemzeit | 256 |  |
| 30 |  | Drehzahl 2 | 1 | % |
| 31 |  | Drehzahl 3 | 1 | % |
| 32 |  | Anlagenoptionen 2 | 1 |  |
| 33 |  | Einstrahlung | 1 |  W/m² |
| 34 |  | Einstrahlung | 256 |  W/m² |
| 35 |  | Betriebsstunden-Flag | 1 |  |



### <a name="0010_6620_0100"></a>DFA (0x0010) <= SunGo XL (0x6620), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 | 0x01 | Relaisstatus 1 | 1 |  |
| 12 | 0x02 | Relaisstatus 2 | 1 |  |
| 12 | 0x04 | Relaisstatus 3 | 1 |  |
| 12 | 0x08 | Relaisstatus 4 | 1 |  |
| 12 | 0x10 | Relaisstatus 5 | 1 |  |
| 12 | 0x20 | Relaisstatus 6 | 1 |  |
| 13 |  | Drehzahl 1 | 1 | % |
| 15 |  | Fehlernummer | 1 |  |
| 16 |  | Fehlermaske | 1 |  |
| 17 |  | Fehlermaske | 256 |  |
| 18 |  | Fehler-Info 1 | 1 |  |
| 19 |  | Fehler-Info 2 | 1 |  |
| 20 |  | Fehler-Info 3 | 1 |  |
| 21 |  | Fehler-Info 4 | 1 |  |
| 22 |  | Anlagenoptionen 1 | 1 |  |
| 23 |  | Anlagenoptionen 1 | 256 |  |
| 24 |  | System | 1 |  |
| 25 |  | Version | 1 |  |
| 26 |  | Version | 256 |  |
| 27 |  | Modulstatus | 1 |  |
| 28 |  | Systemzeit | 1 |  |
| 29 |  | Systemzeit | 256 |  |
| 30 |  | Drehzahl 2 | 1 | % |
| 31 |  | Drehzahl 3 | 1 | % |



### <a name="0010_7101_0100"></a>DFA (0x0010) <= DeltaSol BX WMZ (0x7101), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur RPS | 0.1 |  °C |
| 11 |  | Temperatur RPS | 25.6 |  °C |
| 12 |  | Druck RPS | 0.1 |  bar |
| 13 |  | Druck RPS | 25.6 |  bar |
| 14 |  | Temperatur VFS | 0.1 |  °C |
| 15 |  | Temperatur VFS | 25.6 |  °C |
| 16 |  | Durchfluss VFS | 1 |  l/h |
| 16 |  | Durchfluss VFS | 1 |  l/h |
| 17 |  | Durchfluss VFS | 256 |  l/h |
| 17 |  | Durchfluss VFS | 256 |  l/h |
| 18 |  | Durchfluss V40 | 1 |  l/h |
| 19 |  | Durchfluss V40 | 256 |  l/h |
| 20 |  | Einheit | 1 |  |
| 22 |  | PWM 1 | 1 | % |
| 23 |  | PWM 2 | 1 | % |
| 24 |  | Drehzahl Relais 1 | 1 | % |
| 25 |  | Drehzahl Relais 2 | 1 | % |
| 26 |  | Drehzahl Relais 3 | 1 | % |
| 27 |  | Drehzahl Relais 4 | 1 | % |
| 28 |  | Betriebssekunden Relais 1 | 1 |  s |
| 29 |  | Betriebssekunden Relais 1 | 256 |  s |
| 30 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 31 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 32 |  | Betriebssekunden Relais 2 | 1 |  s |
| 33 |  | Betriebssekunden Relais 2 | 256 |  s |
| 34 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 35 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 36 |  | Betriebssekunden Relais 3 | 1 |  s |
| 37 |  | Betriebssekunden Relais 3 | 256 |  s |
| 38 |  | Betriebssekunden Relais 3 | 65536 |  s |
| 39 |  | Betriebssekunden Relais 3 | 16777216 |  s |
| 40 |  | Betriebssekunden Relais 4 | 1 |  s |
| 41 |  | Betriebssekunden Relais 4 | 256 |  s |
| 42 |  | Betriebssekunden Relais 4 | 65536 |  s |
| 43 |  | Betriebssekunden Relais 4 | 16777216 |  s |
| 44 | 0x01 | Fehler S1 | 1 |  |
| 44 | 0x02 | Fehler S2 | 1 |  |
| 44 | 0x04 | Fehler S3 | 1 |  |
| 44 | 0x08 | Fehler S4 | 1 |  |
| 44 | 0x10 | Fehler S5 | 1 |  |
| 44 | 0x20 | Fehler S6 | 1 |  |
| 44 | 0x40 | Fehler S7 | 1 |  |
| 44 | 0x80 | Fehler S8 | 1 |  |
| 44 |  | Fehler | 1 |  |
| 45 | 0x01 | Fehler S9 | 1 |  |
| 45 | 0x02 | Fehler V40 | 1 |  |
| 45 | 0x04 | Leckage | 1 |  |
| 45 | 0x08 | Überdruck | 1 |  |
| 45 | 0x10 | Durchflussfehler | 1 |  |
| 45 |  | Fehler | 256 |  |
| 46 | 0x01 | Blockierschutz 1 | 1 |  |
| 46 | 0x02 | Blockierschutz 2 | 1 |  |
| 46 | 0x04 | Blockierschutz 3 | 1 |  |
| 46 | 0x08 | Blockierschutz 4 | 1 |  |
| 46 | 0x10 | Initialisierung | 1 |  |
| 46 | 0x20 | Befüllung | 1 |  |
| 46 | 0x40 | Stabilisierung | 1 |  |
| 46 | 0x80 | Pumpenverzögerung | 1 |  |
| 46 |  | Status | 1 |  |
| 47 | 0x01 | Überwärmeabfuhr | 1 |  |
| 47 | 0x02 | Nachlauf | 1 |  |
| 47 | 0x04 | Thermische Desinfektion | 1 |  |
| 47 | 0x08 | Systemkühlung | 1 |  |
| 47 | 0x10 | Speicherkühlung | 1 |  |
| 47 | 0x20 | Spreizung | 1 |  |
| 47 | 0x40 | Frostschutz | 1 |  |
| 47 | 0x80 | Kollektorkühlung | 1 |  |
| 47 |  | Status | 256 |  |
| 48 |  | Wärmemenge | 1 |  Wh |
| 49 |  | Wärmemenge | 256 |  Wh |
| 50 |  | Wärmemenge | 65536 |  Wh |
| 51 |  | Wärmemenge | 16777216 |  Wh |
| 52 |  | Version | 0.01 |  |
| 53 |  | Version | 2.56 |  |
| 54 |  | Systemzeit | 1 |  |
| 55 |  | Systemzeit | 256 |  |
| 56 |  | Datum | 1 |  |
| 57 |  | Datum | 256 |  |
| 58 |  | Datum | 65536 |  |
| 59 |  | Datum | 16777216 |  |
| 60 |  | Durchfluss FlowRotor | 1 |  l/h |
| 61 |  | Durchfluss FlowRotor | 256 |  l/h |



### <a name="0010_7112_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Regler\] (0x7112), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Einstrahlung Sensor 10 | 1 |  W/m² |
| 19 |  | Einstrahlung Sensor 10 | 256 |  W/m² |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 12 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 12 | 25.6 |  °C |
| 24 |  | Volumenstrom Sensor 9 | 1 |  l/h |
| 25 |  | Volumenstrom Sensor 9 | 256 |  l/h |
| 26 |  | Volumenstrom Sensor 9 | 65536 |  l/h |
| 27 |  | Volumenstrom Sensor 9 | 16777216 |  l/h |
| 28 |  | Volumenstrom Sensor 11 | 1 |  l/h |
| 29 |  | Volumenstrom Sensor 11 | 256 |  l/h |
| 30 |  | Volumenstrom Sensor 11 | 65536 |  l/h |
| 31 |  | Volumenstrom Sensor 11 | 16777216 |  l/h |
| 32 |  | Volumenstrom Sensor 12 | 1 |  l/h |
| 33 |  | Volumenstrom Sensor 12 | 256 |  l/h |
| 34 |  | Volumenstrom Sensor 12 | 65536 |  l/h |
| 35 |  | Volumenstrom Sensor 12 | 16777216 |  l/h |
| 36 |  | Druck Sensor 11 | 0.01 |  bar |
| 37 |  | Druck Sensor 11 | 2.56 |  bar |
| 38 |  | Druck Sensor 12 | 0.01 |  bar |
| 39 |  | Druck Sensor 12 | 2.56 |  bar |
| 40 |  | Relais 1 | 1 | % |
| 41 |  | Relais 2 | 1 | % |
| 42 |  | Relais 3 | 1 | % |
| 43 |  | Relais 4 | 1 | % |
| 44 |  | Relais 5 | 1 | % |
| 48 |  | Systemdatum | 1 |  |
| 49 |  | Systemdatum | 256 |  |
| 50 |  | Systemdatum | 65536 |  |
| 51 |  | Systemdatum | 16777216 |  |
| 52 |  | Fehlermaske | 1 |  |
| 53 |  | Fehlermaske | 256 |  |
| 54 |  | Fehlermaske | 65536 |  |
| 55 |  | Fehlermaske | 16777216 |  |
| 64 |  | PWM/0-10V A | 1 | % |
| 65 |  | PWM/0-10V B | 1 | % |



### <a name="0010_7113_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Module\] (0x7113), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Modul 1 Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Modul 1 Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Modul 1 Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Modul 1 Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Modul 1 Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Modul 1 Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 13 |  | Temperatur Modul 2 Sensor 1 | 25.6 |  °C |
| 14 |  | Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 15 |  | Temperatur Modul 2 Sensor 2 | 25.6 |  °C |
| 16 |  | Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 17 |  | Temperatur Modul 2 Sensor 3 | 25.6 |  °C |
| 18 |  | Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 19 |  | Temperatur Modul 2 Sensor 4 | 25.6 |  °C |
| 20 |  | Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 21 |  | Temperatur Modul 2 Sensor 5 | 25.6 |  °C |
| 22 |  | Temperatur Modul 2 Sensor 6 | 0.1 |  °C |
| 23 |  | Temperatur Modul 2 Sensor 6 | 25.6 |  °C |



### <a name="0010_7120_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Heizkreis #0\] (0x7120), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_7130_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[WMZ #0\] (0x7130), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 8 |  | Wärmemenge heute | 1 |  Wh |
| 9 |  | Wärmemenge heute | 256 |  Wh |
| 10 |  | Wärmemenge heute | 65536 |  Wh |
| 11 |  | Wärmemenge heute | 16777216 |  Wh |
| 12 |  | Wärmemenge Woche | 1 |  Wh |
| 13 |  | Wärmemenge Woche | 256 |  Wh |
| 14 |  | Wärmemenge Woche | 65536 |  Wh |
| 15 |  | Wärmemenge Woche | 16777216 |  Wh |
| 16 |  | Gesamtvolumen | 1 |  l |
| 17 |  | Gesamtvolumen | 256 |  l |
| 18 |  | Gesamtvolumen | 65536 |  l |
| 19 |  | Gesamtvolumen | 16777216 |  l |



### <a name="0010_7140_0100"></a>DFA (0x0010) <= DeltaSol BX Pro\[Regler\] (0x7140), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Einstrahlung Sensor 10 | 1 |  W/m² |
| 19 |  | Einstrahlung Sensor 10 | 256 |  W/m² |
| 20 |  | Volumenstrom Sensor 10 | 1 |  l/h |
| 21 |  | Volumenstrom Sensor 10 | 256 |  l/h |
| 22 |  | Volumenstrom Sensor 10 | 65536 |  l/h |
| 23 |  | Volumenstrom Sensor 10 | 16777216 |  l/h |
| 24 |  | Drehzahl Relais 1 | 1 | % |
| 25 |  | Drehzahl Relais 2 | 1 | % |
| 26 |  | Drehzahl Relais 3 | 1 | % |
| 28 |  | Systemdatum | 1 |  |
| 29 |  | Systemdatum | 256 |  |
| 30 |  | Systemdatum | 65536 |  |
| 31 |  | Systemdatum | 16777216 |  |
| 32 |  | Fehlermaske | 1 |  |
| 33 |  | Fehlermaske | 256 |  |
| 34 |  | Fehlermaske | 65536 |  |
| 35 |  | Fehlermaske | 16777216 |  |



### <a name="0010_7150_0100"></a>DFA (0x0010) <= DeltaSol BX Pro\[WMZ #0\] (0x7150), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 8 |  | Wärmemenge heute | 1 |  Wh |
| 9 |  | Wärmemenge heute | 256 |  Wh |
| 10 |  | Wärmemenge heute | 65536 |  Wh |
| 11 |  | Wärmemenge heute | 16777216 |  Wh |
| 12 |  | Wärmemenge Woche | 1 |  Wh |
| 13 |  | Wärmemenge Woche | 256 |  Wh |
| 14 |  | Wärmemenge Woche | 65536 |  Wh |
| 15 |  | Wärmemenge Woche | 16777216 |  Wh |



### <a name="0010_7160_0100"></a>DFA (0x0010) <= SKSC3HE (0x7160), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Einstrahlung | 1 |  W/m² |
| 17 |  | Einstrahlung | 256 |  W/m² |
| 18 |  | Volumenstrom | 1 |  l/h |
| 19 |  | Volumenstrom | 256 |  l/h |
| 20 |  | Drehzahl A1 | 1 | % |
| 21 |  | Drehzahl A2 | 1 | % |
| 22 |  | Drehzahl A3 | 1 | % |
| 23 |  | Drehzahl A | 1 | % |
| 24 |  | Wärme | 1 |  Wh |
| 25 |  | Wärme | 256 |  Wh |
| 26 |  | Wärme | 1000 |  Wh |
| 27 |  | Wärme | 256000 |  Wh |
| 28 |  | Wärme | 1000000 |  Wh |
| 29 |  | Wärme | 256000000 |  Wh |
| 30 |  | Wärme | 1000000000 |  Wh |
| 31 |  | Wärme | 256000000000 |  Wh |
| 32 |  | Fehlermaske | 1 |  |
| 33 |  | Sensorbruch-Nummer | 1 |  |
| 34 |  | Sensorkurzschluss-Nummer | 1 |  |
| 36 |  | Temperatur GFD1 | 0.1 |  °C |
| 37 |  | Temperatur GFD1 | 25.6 |  °C |
| 38 |  | Temperatur GFD2 | 0.1 |  °C |
| 39 |  | Temperatur GFD2 | 25.6 |  °C |
| 42 |  | Systemzeit2 | 1 |  |
| 42 |  | Systemzeit | 1 |  |
| 43 |  | Systemzeit | 256 |  |
| 43 |  | Systemzeit2 | 256 |  |
| 44 |  | Volumenstrom 2 | 1 |  l/h |
| 45 |  | Volumenstrom 2 | 256 |  l/h |
| 46 |  | Volumenstrom 2 | 65536 |  l/h |
| 47 |  | Volumenstrom 2 | 16777216 |  l/h |
| 48 |  | Volumenstrom 3 | 1 |  l/h |
| 49 |  | Volumenstrom 3 | 256 |  l/h |
| 50 |  | Volumenstrom 3 | 65536 |  l/h |
| 51 |  | Volumenstrom 3 | 16777216 |  l/h |
| 52 |  | Leistung 2 | 0.001 |  kW |
| 53 |  | Leistung 2 | 0.256 |  kW |
| 54 |  | Leistung 2 | 65.536 |  kW |
| 55 |  | Leistung 2 | 16777.216 |  kW |
| 56 |  | Leistung 3 | 0.001 |  kW |
| 57 |  | Leistung 3 | 0.256 |  kW |
| 58 |  | Leistung 3 | 65.536 |  kW |
| 59 |  | Leistung 3 | 16777.216 |  kW |
| 60 |  | Wärme 2 | 1 |  Wh |
| 61 |  | Wärme 2 | 256 |  Wh |
| 62 |  | Wärme 2 | 1000 |  Wh |
| 63 |  | Wärme 2 | 256000 |  Wh |
| 64 |  | Wärme 2 | 1000000 |  Wh |
| 65 |  | Wärme 2 | 256000000 |  Wh |
| 66 |  | Wärme 2 | 1000000000 |  Wh |
| 67 |  | Wärme 2 | 256000000000 |  Wh |
| 68 |  | Wärme 3 | 1 |  Wh |
| 69 |  | Wärme 3 | 256 |  Wh |
| 70 |  | Wärme 3 | 1000 |  Wh |
| 71 |  | Wärme 3 | 256000 |  Wh |
| 72 |  | Wärme 3 | 1000000 |  Wh |
| 73 |  | Wärme 3 | 256000000 |  Wh |
| 74 |  | Wärme 3 | 1000000000 |  Wh |
| 75 |  | Wärme 3 | 256000000000 |  Wh |



### <a name="0010_7161_0100"></a>DFA (0x0010) <= SKSC3HE \[HK1\] (0x7161), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 1 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 2 |  | Mischerlaufzeit | 1 |  s |
| 3 |  | Mischerpausenzeit | 1 |  s |
| 4 |  | HK-Status | 1 |  |
| 5 |  | HK-Status | 256 |  |



### <a name="0010_7162_0100"></a>DFA (0x0010) <= SKSC3HE \[HK2\] (0x7162), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 1 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 2 |  | Mischerlaufzeit | 1 |  s |
| 3 |  | Mischerpausenzeit | 1 |  s |
| 4 |  | HK-Status | 1 |  |
| 5 |  | HK-Status | 256 |  |



### <a name="0010_7163_0100"></a>DFA (0x0010) <= SKSC3HE \[HK3\] (0x7163), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 1 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 2 |  | Mischerlaufzeit | 1 |  s |
| 3 |  | Mischerpausenzeit | 1 |  s |
| 4 |  | HK-Status | 1 |  |
| 5 |  | HK-Status | 256 |  |



### <a name="0010_7210_0100"></a>DFA (0x0010) <= SKSR 1/2/3 (0x7210), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Einstrahlung | 1 |  W/m² |
| 17 |  | Einstrahlung | 256 |  W/m² |
| 18 |  | Volumenstrom | 1 |  l/h |
| 19 |  | Volumenstrom | 256 |  l/h |
| 20 |  | Drehzahl A1 | 1 | % |
| 21 |  | Drehzahl A2 | 1 | % |
| 22 |  | Drehzahl A3 | 1 | % |
| 23 |  | Drehzahl A | 1 | % |
| 24 |  | Wärme | 1 |  Wh |
| 25 |  | Wärme | 256 |  Wh |
| 26 |  | Wärme | 1000 |  Wh |
| 27 |  | Wärme | 256000 |  Wh |
| 28 |  | Wärme | 1000000 |  Wh |
| 29 |  | Wärme | 256000000 |  Wh |
| 30 |  | Wärme | 1000000000 |  Wh |
| 31 |  | Wärme | 256000000000 |  Wh |
| 32 |  | Fehlermaske | 1 |  |
| 33 |  | Sensorbruch-Nummer | 1 |  |
| 34 |  | Sensorkurzschluss-Nummer | 1 |  |
| 42 |  | Systemzeit | 1 |  |
| 42 |  | Systemzeit2 | 1 |  |
| 43 |  | Systemzeit | 256 |  |
| 43 |  | Systemzeit2 | 256 |  |



### <a name="0010_7211_0100"></a>DFA (0x0010) <= SKSC3 \[HK1\] (0x7211), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 1 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 2 |  | Mischerlaufzeit | 1 |  s |
| 3 |  | Mischerpausenzeit | 1 |  s |
| 4 |  | HK-Status | 1 |  |
| 5 |  | HK-Status | 256 |  |



### <a name="0010_7212_0100"></a>DFA (0x0010) <= SKSC3 \[HK2\] (0x7212), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 1 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 2 |  | Mischerlaufzeit | 1 |  s |
| 3 |  | Mischerpausenzeit | 1 |  s |
| 4 |  | HK-Status | 1 |  |
| 5 |  | HK-Status | 256 |  |



### <a name="0010_7213_0100"></a>DFA (0x0010) <= SKSC3 \[HK3\] (0x7213), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 1 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 2 |  | Mischerlaufzeit | 1 |  s |
| 3 |  | Mischerpausenzeit | 1 |  s |
| 4 |  | HK-Status | 1 |  |
| 5 |  | HK-Status | 256 |  |



### <a name="0010_7221_0100"></a>DFA (0x0010) <= DrainBloC (0x7221), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Volumenstrom | 1 |  l/h |
| 11 |  | Volumenstrom | 256 |  l/h |
| 12 |  | Systemdruck | 0.1 |  bar |
| 13 |  | Systemdruck | 25.6 |  bar |
| 14 |  | Ansteuerung 1 | 1 | % |
| 15 |  | Ansteuerung 2 | 1 | % |
| 16 |  | Drehzahl Relais 1 | 1 | % |
| 17 |  | PWM 1 | 1 | % |
| 18 |  | Drehzahl Relais 2 | 1 | % |
| 19 |  | PWM 2 | 1 | % |
| 20 |  | Wärmemenge | 1 |  Wh |
| 21 |  | Wärmemenge | 256 |  Wh |
| 22 |  | Wärmemenge | 65536 |  Wh |
| 23 |  | Wärmemenge | 16777216 |  Wh |
| 36 |  | Version | 0.01 |  |
| 38 |  | Uhrzeit | 1 |  |
| 39 |  | Uhrzeit | 256 |  |
| 40 |  | Datum | 1 |  |
| 41 |  | Datum | 256 |  |
| 42 |  | Datum | 65536 |  |
| 43 |  | Datum | 16777216 |  |



### <a name="0010_7231_0100"></a>DFA (0x0010) <= SC25 (0x7231), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Volumenstrom | 1 |  l/h |
| 11 |  | Volumenstrom | 256 |  l/h |
| 12 |  | Systemdruck | 0.1 |  bar |
| 13 |  | Systemdruck | 25.6 |  bar |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Ansteuerung 1 | 1 | % |
| 17 |  | Ansteuerung 2 | 1 | % |
| 18 |  | Drehzahl Relais 1 | 1 | % |
| 19 |  | PWM 1 | 1 | % |
| 20 |  | Drehzahl Relais 2 | 1 | % |
| 21 |  | PWM 2 | 1 | % |
| 22 | 0x01 | Handbetrieb 1 | 1 |  |
| 22 | 0x02 | Handbetrieb 2 | 1 |  |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 65536 |  Wh |
| 27 |  | Wärmemenge | 16777216 |  Wh |
| 28 | 0x01 | ΔT Kollektor-Speicher | 1 |  |
| 28 | 0x02 | ΔT Vorlauf-Rücklauf | 1 |  |
| 28 | 0x04 | Pendelpause | 1 |  |
| 28 | 0x08 | Kollektorkühlung | 1 |  |
| 28 | 0x10 | Rückkühlung | 1 |  |
| 28 | 0x20 | Frostschutz | 1 |  |
| 28 | 0x40 | Röhrenkollektor | 1 |  |
| 28 | 0x80 | ΔT3 | 1 |  |
| 29 | 0x01 | Thermostat 1 | 1 |  |
| 29 | 0x02 | Blockierschutz 1 | 1 |  |
| 29 | 0x04 | Blockierschutz 2 | 1 |  |
| 29 | 0x08 | Stabilisierung | 1 |  |
| 32 | 0x01 | Überdruck | 1 |  |
| 32 | 0x02 | Nachtumwälzung | 1 |  |
| 32 | 0x04 | ΔT zu hoch | 1 |  |
| 36 | 0x01 | S1 defekt | 1 |  |
| 36 | 0x02 | S2 defekt | 1 |  |
| 36 | 0x04 | S3 defekt | 1 |  |
| 36 | 0x08 | S-Vorlauf defekt | 1 |  |
| 36 | 0x10 | S-Rücklauf defekt | 1 |  |
| 36 | 0x20 | Druck\(S6\) defekt | 1 |  |
| 36 | 0x40 | Volumenstrom\(S7\) defekt | 1 |  |
| 36 | 0x80 | Durchfluss | 1 |  |
| 37 | 0x01 | Leckage | 1 |  |
| 40 |  | Version | 0.01 |  |
| 41 |  | Version | 2.56 |  |
| 42 |  | Uhrzeit | 1 |  |
| 43 |  | Uhrzeit | 256 |  |
| 44 |  | Datum | 1 |  |
| 45 |  | Datum | 256 |  |
| 46 |  | Datum | 65536 |  |
| 47 |  | Datum | 16777216 |  |



### <a name="0010_7311_0100"></a>DFA (0x0010) <= DeltaSol M \[Regler\] (0x7311), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 12 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 12 | 25.6 |  °C |
| 24 |  | Einstrahlung | 1 |  W/m² |
| 25 |  | Einstrahlung | 256 |  W/m² |
| 28 |  | Impulseingang 1 | 1 |  |
| 29 |  | Impulseingang 1 | 256 |  |
| 30 |  | Impulseingang 1 | 65536 |  |
| 31 |  | Impulseingang 1 | 16777216 |  |
| 32 |  | Impulseingang 2 | 1 |  |
| 33 |  | Impulseingang 2 | 256 |  |
| 34 |  | Impulseingang 2 | 65536 |  |
| 35 |  | Impulseingang 2 | 16777216 |  |
| 36 |  | Sensorbruch-Maske | 1 |  |
| 37 |  | Sensorbruch-Maske | 256 |  |
| 38 |  | Sensorkurzschluss-Maske | 1 |  |
| 39 |  | Sensorkurzschluss-Maske | 256 |  |
| 40 |  | Sensorbenutzungs-Maske | 1 |  |
| 41 |  | Sensorbenutzungs-Maske | 256 |  |
| 44 |  | Drehzahl Relais 1 | 1 | % |
| 45 |  | Drehzahl Relais 2 | 1 | % |
| 46 |  | Drehzahl Relais 3 | 1 | % |
| 47 |  | Drehzahl Relais 4 | 1 | % |
| 48 |  | Drehzahl Relais 5 | 1 | % |
| 49 |  | Drehzahl Relais 6 | 1 | % |
| 50 |  | Drehzahl Relais 7 | 1 | % |
| 51 |  | Drehzahl Relais 8 | 1 | % |
| 52 |  | Drehzahl Relais 9 | 1 | % |
| 58 |  | Relaisbenutzungsmaske | 1 |  |
| 59 |  | Relaisbenutzungsmaske | 256 |  |
| 60 |  | Fehlermaske | 1 |  |
| 61 |  | Fehlermaske | 256 |  |
| 62 |  | Warnungsmaske | 1 |  |
| 63 |  | Warnungsmaske | 256 |  |
| 64 |  | Reglerversion | 1 |  |
| 65 |  | Reglerversion | 256 |  |
| 66 |  | Systemzeit | 1 |  |
| 67 |  | Systemzeit | 256 |  |



### <a name="0010_7312_0100"></a>DFA (0x0010) <= DeltaSol M \[HK1\] (0x7312), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauftemperatur | 0.1 |  °C |
| 1 |  | Vorlauftemperatur | 25.6 |  °C |
| 2 |  | Fernversteller | 0.1 |  K |
| 3 |  | Fernversteller | 25.6 |  K |
| 4 |  | Aussentemperatur | 0.1 |  °C |
| 5 |  | Aussentemperatur | 25.6 |  °C |
| 6 |  | Speichertemperatur | 0.1 |  °C |
| 7 |  | Speichertemperatur | 25.6 |  °C |
| 8 |  | Vorlaufsolltemperatur | 0.1 |  °C |
| 9 |  | Vorlaufsolltemperatur | 25.6 |  °C |
| 10 |  | Relaismaske | 1 |  |



### <a name="0010_7315_0100"></a>DFA (0x0010) <= DeltaSol M \[Volumen\] (0x7315), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Betriebssekunden R1 | 1 |  s |
| 1 |  | Betriebssekunden R1 | 256 |  s |
| 2 |  | Betriebssekunden R1 | 65536 |  s |
| 3 |  | Betriebssekunden R1 | 16777216 |  s |
| 4 |  | Betriebssekunden R2 | 1 |  s |
| 5 |  | Betriebssekunden R2 | 256 |  s |
| 6 |  | Betriebssekunden R2 | 65536 |  s |
| 7 |  | Betriebssekunden R2 | 16777216 |  s |
| 8 |  | Betriebssekunden R3 | 1 |  s |
| 9 |  | Betriebssekunden R3 | 256 |  s |
| 10 |  | Betriebssekunden R3 | 65536 |  s |
| 11 |  | Betriebssekunden R3 | 16777216 |  s |
| 12 |  | Betriebssekunden R4 | 1 |  s |
| 13 |  | Betriebssekunden R4 | 256 |  s |
| 14 |  | Betriebssekunden R4 | 65536 |  s |
| 15 |  | Betriebssekunden R4 | 16777216 |  s |
| 16 |  | Betriebssekunden R5 | 1 |  s |
| 17 |  | Betriebssekunden R5 | 256 |  s |
| 18 |  | Betriebssekunden R5 | 65536 |  s |
| 19 |  | Betriebssekunden R5 | 16777216 |  s |
| 20 |  | Betriebssekunden R6 | 1 |  s |
| 21 |  | Betriebssekunden R6 | 256 |  s |
| 22 |  | Betriebssekunden R6 | 65536 |  s |
| 23 |  | Betriebssekunden R6 | 16777216 |  s |
| 24 |  | Betriebssekunden R7 | 1 |  s |
| 25 |  | Betriebssekunden R7 | 256 |  s |
| 26 |  | Betriebssekunden R7 | 65536 |  s |
| 27 |  | Betriebssekunden R7 | 16777216 |  s |
| 28 |  | Betriebssekunden R8 | 1 |  s |
| 29 |  | Betriebssekunden R8 | 256 |  s |
| 30 |  | Betriebssekunden R8 | 65536 |  s |
| 31 |  | Betriebssekunden R8 | 16777216 |  s |
| 32 |  | Betriebssekunden R9 | 1 |  s |
| 33 |  | Betriebssekunden R9 | 256 |  s |
| 34 |  | Betriebssekunden R9 | 65536 |  s |
| 35 |  | Betriebssekunden R9 | 16777216 |  s |
| 36 |  | Volumen 1 | 0.1 |  l |
| 37 |  | Volumen 1 | 25.6 |  l |
| 38 |  | Volumen 1 | 6553.6 |  l |
| 39 |  | Volumen 1 | 1677721.6 |  l |
| 40 |  | Volumen 2 | 0.1 |  l |
| 41 |  | Volumen 2 | 25.6 |  l |
| 42 |  | Volumen 2 | 6553.6 |  l |
| 43 |  | Volumen 2 | 1677721.6 |  l |



### <a name="0010_7316_0100"></a>DFA (0x0010) <= DeltaSol M \[WMZ1\] (0x7316), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauftemperatur | 0.1 |  °C |
| 1 |  | Vorlauftemperatur | 25.6 |  °C |
| 2 |  | Rücklauftemperatur | 0.1 |  °C |
| 3 |  | Rücklauftemperatur | 25.6 |  °C |
| 4 |  | Volumenstrom | 1 |  l/h |
| 5 |  | Volumenstrom | 256 |  l/h |
| 6 |  | Wärme | 1 |  Wh |
| 7 |  | Wärme | 256 |  Wh |
| 8 |  | Wärme | 1000 |  Wh |
| 9 |  | Wärme | 256000 |  Wh |
| 10 |  | Wärme | 1000000 |  Wh |
| 11 |  | Wärme | 256000000 |  Wh |



### <a name="0010_7321_0100"></a>DFA (0x0010) <= Vitosolic 200 \[Regler\] (0x7321), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 12 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 12 | 25.6 |  °C |
| 24 |  | Einstrahlung | 1 |  W/m² |
| 25 |  | Einstrahlung | 256 |  W/m² |
| 28 |  | Impulseingang 1 | 1 |  |
| 29 |  | Impulseingang 1 | 256 |  |
| 30 |  | Impulseingang 1 | 65536 |  |
| 31 |  | Impulseingang 1 | 16777216 |  |
| 32 |  | Impulseingang 2 | 1 |  |
| 33 |  | Impulseingang 2 | 256 |  |
| 34 |  | Impulseingang 2 | 65536 |  |
| 35 |  | Impulseingang 2 | 16777216 |  |
| 36 |  | Sensorbruch-Maske | 1 |  |
| 37 |  | Sensorbruch-Maske | 256 |  |
| 38 |  | Sensorkurzschluss-Maske | 1 |  |
| 39 |  | Sensorkurzschluss-Maske | 256 |  |
| 40 |  | Sensorbenutzungs-Maske | 1 |  |
| 41 |  | Sensorbenutzungs-Maske | 256 |  |
| 44 |  | Drehzahl Relais 1 | 1 | % |
| 45 |  | Drehzahl Relais 2 | 1 | % |
| 46 |  | Drehzahl Relais 3 | 1 | % |
| 47 |  | Drehzahl Relais 4 | 1 | % |
| 48 |  | Drehzahl Relais 5 | 1 | % |
| 49 |  | Drehzahl Relais 6 | 1 | % |
| 50 |  | Drehzahl Relais 7 | 1 | % |
| 51 |  | Drehzahl Relais 8 | 1 | % |
| 52 |  | Drehzahl Relais 9 | 1 | % |
| 58 |  | Relaisbenutzungsmaske | 1 |  |
| 59 |  | Relaisbenutzungsmaske | 256 |  |
| 60 |  | Fehlermaske | 1 |  |
| 61 |  | Fehlermaske | 256 |  |
| 62 |  | Warnungsmaske | 1 |  |
| 63 |  | Warnungsmaske | 256 |  |
| 64 |  | Reglerversion | 1 |  |
| 65 |  | Reglerversion | 256 |  |
| 66 |  | Systemzeit | 1 |  |
| 67 |  | Systemzeit | 256 |  |



### <a name="0010_7326_0100"></a>DFA (0x0010) <= Vitosolic 200 \[WMZ1\] (0x7326), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauftemperatur | 0.1 |  °C |
| 1 |  | Vorlauftemperatur | 25.6 |  °C |
| 2 |  | Rücklauftemperatur | 0.1 |  °C |
| 3 |  | Rücklauftemperatur | 25.6 |  °C |
| 4 |  | Volumenstrom | 1 |  l/h |
| 5 |  | Volumenstrom | 256 |  l/h |
| 6 |  | Wärme | 1 |  Wh |
| 7 |  | Wärme | 256 |  Wh |
| 8 |  | Wärme | 1000 |  Wh |
| 9 |  | Wärme | 256000 |  Wh |
| 10 |  | Wärme | 1000000 |  Wh |
| 11 |  | Wärme | 256000000 |  Wh |



### <a name="0010_7331_0100"></a>DFA (0x0010) <= SLR (0x7331), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 12 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 12 | 25.6 |  °C |
| 24 |  | Temperatur Sensor 13 | 0.1 |  °C |
| 25 |  | Temperatur Sensor 13 | 25.6 |  °C |
| 26 |  | Temperatur Sensor 14 | 0.1 |  °C |
| 27 |  | Temperatur Sensor 14 | 25.6 |  °C |
| 28 |  | Temperatur Sensor 15 | 0.1 |  °C |
| 29 |  | Temperatur Sensor 15 | 25.6 |  °C |
| 30 |  | Temperatur Sensor 16 | 0.1 |  °C |
| 31 |  | Temperatur Sensor 16 | 25.6 |  °C |
| 32 |  | Temperatur Sensor 17 | 0.1 |  °C |
| 33 |  | Temperatur Sensor 17 | 25.6 |  °C |
| 34 |  | Temperatur Sensor 18 | 0.1 |  °C |
| 35 |  | Temperatur Sensor 18 | 25.6 |  °C |
| 36 |  | Temperatur Sensor 19 | 0.1 |  °C |
| 37 |  | Temperatur Sensor 19 | 25.6 |  °C |
| 38 |  | Temperatur Sensor 20 | 0.1 |  °C |
| 39 |  | Temperatur Sensor 20 | 25.6 |  °C |
| 40 |  | Temperatur Sensor 21 | 0.1 |  °C |
| 41 |  | Temperatur Sensor 21 | 25.6 |  °C |
| 42 |  | Temperatur Sensor 22 | 0.1 |  °C |
| 43 |  | Temperatur Sensor 22 | 25.6 |  °C |
| 44 |  | Drehzahl R1 | 1 | % |
| 45 |  | Drehzahl R2 | 1 | % |
| 46 |  | Drehzahl R3 | 1 | % |
| 47 |  | Drehzahl R4 | 1 | % |
| 48 |  | Drehzahl R5 | 1 | % |
| 49 |  | Drehzahl R6 | 1 | % |
| 50 |  | Drehzahl R7 | 1 | % |
| 51 |  | Drehzahl R8 | 1 | % |
| 52 |  | Drehzahl R9 | 1 | % |
| 53 |  | Drehzahl R10 | 1 | % |
| 54 |  | Drehzahl R11 | 1 | % |
| 55 |  | Drehzahl R12 | 1 | % |
| 56 |  | Drehzahl R13 | 1 | % |
| 57 |  | Drehzahl R14 | 1 | % |
| 58 |  | Drehzahl R15 | 1 | % |
| 59 |  | Drehzahl R16 | 1 | % |
| 60 |  | Drehzahl R17 | 1 | % |
| 61 |  | Drehzahl R18 | 1 | % |
| 64 |  | Sensorbenutzungs-Maske #1 | 1 |  |
| 65 |  | Sensorbenutzungs-Maske #1 | 256 |  |
| 66 |  | Sensorbenutzungs-Maske #1 | 65536 |  |
| 67 |  | Sensorbenutzungs-Maske #1 | 16777216 |  |
| 68 |  | Sensorbenutzungs-Maske #2 | 1 |  |
| 69 |  | Sensorbenutzungs-Maske #2 | 256 |  |
| 70 |  | Sensorbenutzungs-Maske #2 | 65536 |  |
| 71 |  | Sensorbenutzungs-Maske #2 | 16777216 |  |
| 72 |  | Fehler-Maske | 1 |  |
| 73 |  | Fehler-Maske | 256 |  |
| 74 |  | Warnungen-Maske | 1 |  |
| 75 |  | Warnungen-Maske | 256 |  |
| 76 |  | Version | 1 |  |
| 77 |  | Version | 256 |  |
| 78 |  | Systemzeit | 1 |  |
| 79 |  | Systemzeit | 256 |  |
| 80 |  | Variante | 1 |  |



### <a name="0010_7332_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul #01 (0x7332), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 17 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 17 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 18 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 18 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 19 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 19 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 20 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 20 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 21 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 21 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 22 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 22 | 25.6 |  °C |
| 12 |  | Drehzahl R14 | 1 | % |
| 13 |  | Drehzahl R15 | 1 | % |
| 14 |  | Drehzahl R16 | 1 | % |
| 15 |  | Drehzahl R17 | 1 | % |
| 16 |  | Drehzahl R18 | 1 | % |



### <a name="0010_7333_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul #02 (0x7333), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 23 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 23 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 24 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 24 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 25 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 25 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 26 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 26 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 27 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 27 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 28 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 28 | 25.6 |  °C |
| 12 |  | Drehzahl R19 | 1 | % |
| 13 |  | Drehzahl R20 | 1 | % |
| 14 |  | Drehzahl R21 | 1 | % |
| 15 |  | Drehzahl R22 | 1 | % |
| 16 |  | Drehzahl R23 | 1 | % |



### <a name="0010_7334_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul #03 (0x7334), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 29 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 29 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 30 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 30 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 31 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 31 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 32 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 32 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 33 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 33 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 34 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 34 | 25.6 |  °C |
| 12 |  | Drehzahl R24 | 1 | % |
| 13 |  | Drehzahl R25 | 1 | % |
| 14 |  | Drehzahl R26 | 1 | % |
| 15 |  | Drehzahl R27 | 1 | % |
| 16 |  | Drehzahl R28 | 1 | % |



### <a name="0010_7335_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul #04 (0x7335), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 35 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 35 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 36 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 36 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 37 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 37 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 38 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 38 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 39 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 39 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 40 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 40 | 25.6 |  °C |
| 12 |  | Drehzahl R29 | 1 | % |
| 13 |  | Drehzahl R30 | 1 | % |
| 14 |  | Drehzahl R31 | 1 | % |
| 15 |  | Drehzahl R32 | 1 | % |
| 16 |  | Drehzahl R33 | 1 | % |



### <a name="0010_7341_0100"></a>DFA (0x0010) <= SLR XT (0x7341), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | S1-SF-K | 0.1 |  °C |
| 1 |  | S1-SF-K | 25.6 |  °C |
| 2 |  | S2-SF-1 | 0.1 |  °C |
| 3 |  | S2-SF-1 | 25.6 |  °C |
| 4 |  | S3-SF-2 | 0.1 |  °C |
| 5 |  | S3-SF-2 | 25.6 |  °C |
| 6 |  | S4-SF-3/WT/F-RLA1/RLU1 | 0.1 |  °C |
| 7 |  | S4-SF-3/WT/F-RLA1/RLU1 | 25.6 |  °C |
| 8 |  | S5-FN-HK/F-RLA2 | 0.1 |  °C |
| 9 |  | S5-FN-HK/F-RLA2 | 25.6 |  °C |
| 10 |  | S6-FN-WW/BF/SF-WT | 0.1 |  °C |
| 11 |  | S6-FN-WW/BF/SF-WT | 25.6 |  °C |
| 12 |  | S7-FN-K2 | 0.1 |  °C |
| 13 |  | S7-FN-K2 | 25.6 |  °C |
| 14 |  | S8-FZ | 0.1 |  °C |
| 15 |  | S8-FZ | 25.6 |  °C |
| 16 |  | S9-AF | 0.1 |  °C |
| 17 |  | S9-AF | 25.6 |  °C |
| 18 |  | S10-VL-F1 | 0.1 |  °C |
| 19 |  | S10-VL-F1 | 25.6 |  °C |
| 20 |  | S11-FV-1 | 0.1 |  °C |
| 21 |  | S11-FV-1 | 25.6 |  °C |
| 22 |  | S12-VL-F2/WA-1/SF-4/F-RLU1 | 0.1 |  °C |
| 23 |  | S12-VL-F2/WA-1/SF-4/F-RLU1 | 25.6 |  °C |
| 24 |  | S13-FV-2/WA-2/SF-WT | 0.1 |  °C |
| 25 |  | S13-FV-2/WA-2/SF-WT | 25.6 |  °C |
| 26 |  | S14-KF-1/KF-NH | 0.1 |  °C |
| 27 |  | S14-KF-1/KF-NH | 25.6 |  °C |
| 28 |  | S15-KF-2/SF-K2 | 0.1 |  °C |
| 29 |  | S15-KF-2/SF-K2 | 25.6 |  °C |
| 30 |  | S16-BF/BF-1/F-RLU2 | 0.1 |  °C |
| 31 |  | S16-BF/BF-1/F-RLU2 | 25.6 |  °C |
| 32 |  | SensorVolumenstrom_Regler_GAS1_TotalWert_L | 1 |  l |
| 33 |  | SensorVolumenstrom_Regler_GAS1_TotalWert_L | 256 |  l |
| 34 |  | SensorVolumenstrom_Regler_GAS1_TotalWert_L | 65536 |  l |
| 35 |  | SensorVolumenstrom_Regler_GAS1_TotalWert_L | 16777216 |  l |
| 36 |  | SensorVolumenstrom_Regler_GAS2_TotalWert_L | 1 |  l |
| 37 |  | SensorVolumenstrom_Regler_GAS2_TotalWert_L | 256 |  l |
| 38 |  | SensorVolumenstrom_Regler_GAS2_TotalWert_L | 65536 |  l |
| 39 |  | SensorVolumenstrom_Regler_GAS2_TotalWert_L | 16777216 |  l |
| 40 |  | SensorVolumenstrom_Regler_GDS1_TotalWert_L | 1 |  l |
| 41 |  | SensorVolumenstrom_Regler_GDS1_TotalWert_L | 256 |  l |
| 42 |  | SensorVolumenstrom_Regler_GDS1_TotalWert_L | 65536 |  l |
| 43 |  | SensorVolumenstrom_Regler_GDS1_TotalWert_L | 16777216 |  l |
| 44 |  | SensorVolumenstrom_Regler_GDS2_TotalWert_L | 1 |  l |
| 45 |  | SensorVolumenstrom_Regler_GDS2_TotalWert_L | 256 |  l |
| 46 |  | SensorVolumenstrom_Regler_GDS2_TotalWert_L | 65536 |  l |
| 47 |  | SensorVolumenstrom_Regler_GDS2_TotalWert_L | 16777216 |  l |
| 48 |  | Sensor_Regler_Druck_GAS1_Wert_Bar | 0.01 |  bar |
| 49 |  | Sensor_Regler_Druck_GAS1_Wert_Bar | 2.56 |  bar |
| 50 |  | Sensor_Regler_Druck_GAS2_Wert_Bar | 0.01 |  bar |
| 51 |  | Sensor_Regler_Druck_GAS2_Wert_Bar | 2.56 |  bar |
| 52 |  | Sensor_Regler_Druck_GDS1_Wert_Bar | 0.01 |  bar |
| 53 |  | Sensor_Regler_Druck_GDS1_Wert_Bar | 2.56 |  bar |
| 54 |  | Sensor_Regler_Druck_GDS2_Wert_Bar | 0.01 |  bar |
| 55 |  | Sensor_Regler_Druck_GDS2_Wert_Bar | 2.56 |  bar |
| 56 |  | R1-SP-1 | 1 | % |
| 57 |  | R2-SP-2 | 1 | % |
| 58 |  | R3-BLP/1 | 1 | % |
| 59 |  | R4-SV1/V-RLU | 1 | % |
| 60 |  | R5-HKP1 | 1 | % |
| 61 |  | R6-MV-1 auf | 1 | % |
| 62 |  | R7-MV-1 zu | 1 | % |
| 63 |  | R8-KLP-1/HKP-2 | 1 | % |
| 64 |  | R9-KLP-2/SP-3 | 1 | % |
| 65 |  | R10-SV-2/HKP-2/V-RL | 1 | % |
| 66 |  | R11-MV-2 auf/BLP-2/SV-3 | 1 | % |
| 67 |  | R12-MV-2 zu/SV-3/V-RLU | 1 | % |
| 68 |  | R13-ZP | 1 | % |
| 69 |  | R14-RP | 1 | % |
| 72 |  | Hk1_T_VorlSoll | 0.1 |  °C |
| 73 |  | Hk1_T_VorlSoll | 25.6 |  °C |
| 74 |  | Hk2_T_VorlSoll | 0.1 |  °C |
| 75 |  | Hk2_T_VorlSoll | 25.6 |  °C |
| 76 |  | Hk3_T_VorlSoll | 0.1 |  °C |
| 77 |  | Hk3_T_VorlSoll | 25.6 |  °C |
| 78 |  | Hk4_T_VorlSoll | 0.1 |  °C |
| 79 |  | Hk4_T_VorlSoll | 25.6 |  °C |
| 80 |  | Hk5_T_VorlSoll | 0.1 |  °C |
| 81 |  | Hk5_T_VorlSoll | 25.6 |  °C |
| 82 |  | SW_VL_Soll | 0.1 |  °C |
| 83 |  | SW_VL_Soll | 25.6 |  °C |
| 84 |  | Wmz1_Wert_Wh | 1 |  Wh |
| 85 |  | Wmz1_Wert_Wh | 256 |  Wh |
| 86 |  | Wmz1_Wert_Wh | 65536 |  Wh |
| 87 |  | Wmz1_Wert_Wh | 16777216 |  Wh |
| 88 |  | Wmz2_Wert_Wh | 1 |  Wh |
| 89 |  | Wmz2_Wert_Wh | 256 |  Wh |
| 90 |  | Wmz2_Wert_Wh | 65536 |  Wh |
| 91 |  | Wmz2_Wert_Wh | 16777216 |  Wh |
| 92 |  | Systemdatum | 1 |  |
| 93 |  | Systemdatum | 256 |  |
| 94 |  | Systemdatum | 65536 |  |
| 95 |  | Systemdatum | 16777216 |  |
| 96 |  | SensorBenutzt bit 0__31 | 1 |  |
| 97 |  | SensorBenutzt bit 0__31 | 256 |  |
| 98 |  | SensorBenutzt bit 0__31 | 65536 |  |
| 99 |  | SensorBenutzt bit 0__31 | 16777216 |  |
| 100 |  | SensorBenutzt bit 31__63 | 1 |  |
| 101 |  | SensorBenutzt bit 31__63 | 256 |  |
| 102 |  | SensorBenutzt bit 31__63 | 65536 |  |
| 103 |  | SensorBenutzt bit 31__63 | 16777216 |  |
| 104 |  | Error SensorBruch bit 0__31 | 1 |  |
| 105 |  | Error SensorBruch bit 0__31 | 256 |  |
| 106 |  | Error SensorBruch bit 0__31 | 65536 |  |
| 107 |  | Error SensorBruch bit 0__31 | 16777216 |  |
| 108 |  | Error SensorBruch bit 31__63 | 1 |  |
| 109 |  | Error SensorBruch bit 31__63 | 256 |  |
| 110 |  | Error SensorBruch bit 31__63 | 65536 |  |
| 111 |  | Error SensorBruch bit 31__63 | 16777216 |  |
| 112 |  | Error SensorKurzschluss bit 0__31 | 1 |  |
| 113 |  | Error SensorKurzschluss bit 0__31 | 256 |  |
| 114 |  | Error SensorKurzschluss bit 0__31 | 65536 |  |
| 115 |  | Error SensorKurzschluss bit 0__31 | 16777216 |  |
| 116 |  | Error SensorKurzschluss bit 31__63 | 1 |  |
| 117 |  | Error SensorKurzschluss bit 31__63 | 256 |  |
| 118 |  | Error SensorKurzschluss bit 31__63 | 65536 |  |
| 119 |  | Error SensorKurzschluss bit 31__63 | 16777216 |  |
| 120 |  | Errormask | 1 |  |
| 121 |  | Errormask | 256 |  |
| 122 |  | Warningmask | 1 |  |
| 123 |  | Warningmask | 256 |  |
| 124 |  | Systemflow_Parameteraenderungen | 1 |  |
| 125 |  | Systemflow_Parameteraenderungen | 256 |  |



### <a name="0010_7342_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 1 (0x7342), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Drehzahl R1 | 1 | % |
| 13 |  | Drehzahl R2 | 1 | % |
| 14 |  | Drehzahl R3 | 1 | % |
| 15 |  | Drehzahl R4 | 1 | % |
| 16 |  | Drehzahl R5 | 1 | % |



### <a name="0010_7343_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 2 (0x7343), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Drehzahl R1 | 1 | % |
| 13 |  | Drehzahl R2 | 1 | % |
| 14 |  | Drehzahl R3 | 1 | % |
| 15 |  | Drehzahl R4 | 1 | % |
| 16 |  | Drehzahl R5 | 1 | % |



### <a name="0010_7344_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 3 (0x7344), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Drehzahl R1 | 1 | % |
| 13 |  | Drehzahl R2 | 1 | % |
| 14 |  | Drehzahl R3 | 1 | % |
| 15 |  | Drehzahl R4 | 1 | % |
| 16 |  | Drehzahl R5 | 1 | % |



### <a name="0010_7345_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 4 (0x7345), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Drehzahl R1 | 1 | % |
| 13 |  | Drehzahl R2 | 1 | % |
| 14 |  | Drehzahl R3 | 1 | % |
| 15 |  | Drehzahl R4 | 1 | % |
| 16 |  | Drehzahl R5 | 1 | % |



### <a name="0010_7346_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 5 (0x7346), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Drehzahl R1 | 1 | % |
| 13 |  | Drehzahl R2 | 1 | % |
| 14 |  | Drehzahl R3 | 1 | % |
| 15 |  | Drehzahl R4 | 1 | % |
| 16 |  | Drehzahl R5 | 1 | % |



### <a name="0010_7411_0100"></a>DFA (0x0010) <= DeltaSol ES (0x7411), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Volumenstrom | 0.01 |  m³/h |
| 17 |  | Volumenstrom | 2.56 |  m³/h |
| 18 |  | Einstrahlung | 1 |  W/m² |
| 19 |  | Einstrahlung | 256 |  W/m² |
| 20 | 0x08 | Relais 4 | 1 |  |
| 20 | 0x10 | Relais 5 | 1 |  |
| 20 | 0x20 | Relais 6 | 1 |  |
| 21 |  | Drehzahl 1 | 1 | % |
| 22 |  | Drehzahl 2 | 1 | % |
| 23 |  | Drehzahl 3 | 1 | % |
| 24 |  | Systemzeit | 1 |  |
| 25 |  | Systemzeit | 256 |  |
| 26 |  | Schema | 1 |  |
| 27 | 0x01 | Option: Kollektorkühlung | 1 |  |
| 27 | 0x02 | Option: Kollektorminimalbegrenzung | 1 |  |
| 27 | 0x04 | Option: Frostschutzfunktion | 1 |  |
| 27 | 0x08 | Option: Röhrenkollektorfunktion | 1 |  |
| 27 | 0x10 | Option: Rückkühlung | 1 |  |
| 27 | 0x20 | Option: Wärmemengenzählung | 1 |  |
| 28 |  | Betriebsstunden 1 | 1 |  h |
| 29 |  | Betriebsstunden 1 | 256 |  h |
| 30 |  | Betriebsstunden 2 | 1 |  h |
| 31 |  | Betriebsstunden 2 | 256 |  h |
| 32 |  | Betriebsstunden 3 | 1 |  h |
| 33 |  | Betriebsstunden 3 | 256 |  h |
| 34 |  | Betriebsstunden 4 | 1 |  h |
| 35 |  | Betriebsstunden 4 | 256 |  h |
| 36 |  | Betriebsstunden 5 | 1 |  h |
| 37 |  | Betriebsstunden 5 | 256 |  h |
| 38 |  | Betriebsstunden 6 | 1 |  h |
| 39 |  | Betriebsstunden 6 | 256 |  h |
| 40 |  | Wärmemenge | 1 |  Wh |
| 41 |  | Wärmemenge | 256 |  Wh |
| 42 |  | Wärmemenge | 1000 |  Wh |
| 43 |  | Wärmemenge | 256000 |  Wh |
| 44 |  | Wärmemenge | 1000000 |  Wh |
| 45 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_7421_0100"></a>DFA (0x0010) <= DeltaSol BX (0x7421), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur RPS | 0.1 |  °C |
| 11 |  | Temperatur RPS | 25.6 |  °C |
| 12 |  | Druck RPS | 0.1 |  bar |
| 13 |  | Druck RPS | 25.6 |  bar |
| 14 |  | Temperatur VFS | 0.1 |  °C |
| 15 |  | Temperatur VFS | 25.6 |  °C |
| 16 |  | Durchfluss VFS | 1 |  l/h |
| 16 |  | Durchfluss VFS | 1 |  l/h |
| 17 |  | Durchfluss VFS | 256 |  l/h |
| 17 |  | Durchfluss VFS | 256 |  l/h |
| 18 |  | Durchfluss V40 | 1 |  l/h |
| 19 |  | Durchfluss V40 | 256 |  l/h |
| 20 |  | Einheit | 1 |  |
| 22 |  | PWM 1 | 1 | % |
| 23 |  | PWM 2 | 1 | % |
| 24 |  | Drehzahl Relais 1 | 1 | % |
| 25 |  | Drehzahl Relais 2 | 1 | % |
| 26 |  | Drehzahl Relais 3 | 1 | % |
| 27 |  | Drehzahl Relais 4 | 1 | % |
| 28 |  | Betriebssekunden Relais 1 | 1 |  s |
| 29 |  | Betriebssekunden Relais 1 | 256 |  s |
| 30 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 31 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 32 |  | Betriebssekunden Relais 2 | 1 |  s |
| 33 |  | Betriebssekunden Relais 2 | 256 |  s |
| 34 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 35 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 36 |  | Betriebssekunden Relais 3 | 1 |  s |
| 37 |  | Betriebssekunden Relais 3 | 256 |  s |
| 38 |  | Betriebssekunden Relais 3 | 65536 |  s |
| 39 |  | Betriebssekunden Relais 3 | 16777216 |  s |
| 40 |  | Betriebssekunden Relais 4 | 1 |  s |
| 41 |  | Betriebssekunden Relais 4 | 256 |  s |
| 42 |  | Betriebssekunden Relais 4 | 65536 |  s |
| 43 |  | Betriebssekunden Relais 4 | 16777216 |  s |
| 44 | 0x01 | Fehler S1 | 1 |  |
| 44 | 0x02 | Fehler S2 | 1 |  |
| 44 | 0x04 | Fehler S3 | 1 |  |
| 44 | 0x08 | Fehler S4 | 1 |  |
| 44 | 0x10 | Fehler S5 | 1 |  |
| 44 | 0x20 | Fehler S6 | 1 |  |
| 44 | 0x40 | Fehler S7 | 1 |  |
| 44 | 0x80 | Fehler S8 | 1 |  |
| 44 |  | Fehler | 1 |  |
| 45 | 0x01 | Fehler S9 | 1 |  |
| 45 | 0x02 | Fehler V40 | 1 |  |
| 45 | 0x04 | Leckage | 1 |  |
| 45 | 0x08 | Überdruck | 1 |  |
| 45 | 0x10 | Durchflussfehler | 1 |  |
| 45 |  | Fehler | 256 |  |
| 46 | 0x01 | Blockierschutz 1 | 1 |  |
| 46 | 0x02 | Blockierschutz 2 | 1 |  |
| 46 | 0x04 | Blockierschutz 3 | 1 |  |
| 46 | 0x08 | Blockierschutz 4 | 1 |  |
| 46 | 0x10 | Initialisierung | 1 |  |
| 46 | 0x20 | Befüllung | 1 |  |
| 46 | 0x40 | Stabilisierung | 1 |  |
| 46 | 0x80 | Pumpenverzögerung | 1 |  |
| 46 |  | Status | 1 |  |
| 47 | 0x01 | Überwärmeabfuhr | 1 |  |
| 47 | 0x02 | Nachlauf | 1 |  |
| 47 | 0x04 | Thermische Desinfektion | 1 |  |
| 47 | 0x08 | Systemkühlung | 1 |  |
| 47 | 0x10 | Speicherkühlung | 1 |  |
| 47 | 0x20 | Spreizung | 1 |  |
| 47 | 0x40 | Frostschutz | 1 |  |
| 47 | 0x80 | Kollektorkühlung | 1 |  |
| 47 |  | Status | 256 |  |
| 48 |  | Wärmemenge | 1 |  Wh |
| 49 |  | Wärmemenge | 256 |  Wh |
| 50 |  | Wärmemenge | 65536 |  Wh |
| 51 |  | Wärmemenge | 16777216 |  Wh |
| 52 |  | Version | 0.01 |  |
| 53 |  | Version | 2.56 |  |
| 54 |  | Systemzeit | 1 |  |
| 55 |  | Systemzeit | 256 |  |
| 56 |  | Datum | 1 |  |
| 57 |  | Datum | 256 |  |
| 58 |  | Datum | 65536 |  |
| 59 |  | Datum | 16777216 |  |



### <a name="0010_7428_0100"></a>DFA (0x0010) <= DeltaSol BXL (0x7428), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | S1 | 0.1 |  °C |
| 1 |  | S1 | 25.6 |  °C |
| 2 |  | S2 | 0.1 |  °C |
| 3 |  | S2 | 25.6 |  °C |
| 4 |  | S3 | 0.1 |  °C |
| 5 |  | S3 | 25.6 |  °C |
| 6 |  | S4 | 0.1 |  °C |
| 7 |  | S4 | 25.6 |  °C |
| 8 |  | S5 | 0.1 |  °C |
| 9 |  | S5 | 25.6 |  °C |
| 18 |  | Flow V40 | 1 |  l/h |
| 19 |  | Flow V40 | 256 |  l/h |
| 20 |  | Einheit | 1 |  |
| 24 |  | DR 1 | 1 | % |
| 25 |  | DR 2 | 1 | % |
| 26 |  | DR 3 | 1 | % |
| 27 |  | DR 4 | 1 | % |
| 28 |  | BSR 1 | 1 |  s |
| 29 |  | BSR 1 | 256 |  s |
| 30 |  | BSR 1 | 65536 |  s |
| 31 |  | BSR 1 | 16777216 |  s |
| 32 |  | BSR 2 | 1 |  s |
| 33 |  | BSR 2 | 256 |  s |
| 34 |  | BSR 2 | 65536 |  s |
| 35 |  | BSR 2 | 16777216 |  s |
| 36 |  | BSR 3 | 1 |  s |
| 37 |  | BSR 3 | 256 |  s |
| 38 |  | BSR 3 | 65536 |  s |
| 39 |  | BSR 3 | 16777216 |  s |
| 40 |  | BSR 4 | 1 |  s |
| 41 |  | BSR 4 | 256 |  s |
| 42 |  | BSR 4 | 65536 |  s |
| 43 |  | BSR 4 | 16777216 |  s |
| 44 | 0x01 | Fehler S1 | 1 |  |
| 44 | 0x02 | Fehler S2 | 1 |  |
| 44 | 0x04 | Fehler S3 | 1 |  |
| 44 | 0x08 | Fehler S4 | 1 |  |
| 44 | 0x10 | Fehler S5 | 1 |  |
| 44 |  | Fehler | 1 |  |
| 45 | 0x02 | Fehler V40 | 1 |  |
| 45 |  | Fehler | 256 |  |
| 46 | 0x01 | BLSC 1 | 1 |  |
| 46 | 0x02 | BLSC 2 | 1 |  |
| 46 | 0x04 | BLSC 3 | 1 |  |
| 46 | 0x08 | BLSC 4 | 1 |  |
| 46 | 0x20 | DeltaT-FKT | 1 |  |
| 46 | 0x40 | Thermostat | 1 |  |
| 46 | 0x80 | Pumpenverzögerung | 1 |  |
| 46 |  | Regelstatus | 1 |  |
| 47 | 0x01 | Überwärmeabfuhr | 1 |  |
| 47 | 0x04 | Thermische Desinfektion | 1 |  |
| 47 | 0x08 | Systemkühlung | 1 |  |
| 47 | 0x10 | Speicherkühlung | 1 |  |
| 47 | 0x20 | Spreizung | 1 |  |
| 47 | 0x40 | Frostschutz | 1 |  |
| 47 | 0x80 | Kollektorkühlung | 1 |  |
| 47 |  | Regelstatus | 256 |  |
| 48 |  | Wärme | 1 |  Wh |
| 49 |  | Wärme | 256 |  Wh |
| 50 |  | Wärme | 65536 |  Wh |
| 51 |  | Wärme | 16777216 |  Wh |
| 52 |  | Version | 0.01 |  |
| 53 |  | Version | 2.56 |  |
| 54 |  | Zeit | 1 |  |
| 55 |  | Zeit | 256 |  |
| 56 |  | Datum | 1 |  |
| 57 |  | Datum | 256 |  |
| 58 |  | Datum | 65536 |  |
| 59 |  | Datum | 16777216 |  |



### <a name="0010_7441_0100"></a>DFA (0x0010) <= ZEN DT6 \[Regler\] (0x7441), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 12 |  | Drehzahl Relais 1 | 1 | % |
| 13 |  | Drehzahl Relais 2 | 1 | % |
| 14 |  | Regler Ausgang 1 | 1 | % |
| 16 |  | Wmz1_Wert_Wh | 1 |  Wh |
| 17 |  | Wmz1_Wert_Wh | 256 |  Wh |
| 18 |  | Wmz1_Wert_Wh | 65536 |  Wh |
| 19 |  | Wmz1_Wert_Wh | 16777216 |  Wh |
| 20 |  | SW-Version | 1 |  |
| 21 |  | SW-Version | 256 |  |
| 22 |  | SW-Version | 65536 |  |
| 23 |  | SW-Version | 16777216 |  |
| 24 |  | Betriebssekunden Relais 1 | 1 |  s |
| 25 |  | Betriebssekunden Relais 1 | 256 |  s |
| 26 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 27 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 28 |  | Betriebssekunden Relais 2 | 1 |  s |
| 29 |  | Betriebssekunden Relais 2 | 256 |  s |
| 30 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 31 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 32 |  | Initalisieren | 1 |  |
| 33 |  | Initalisieren | 256 |  |
| 34 |  | Initalisieren | 65536 |  |
| 35 |  | Initalisieren | 16777216 |  |
| 36 |  | Befüllung | 1 |  |
| 37 |  | Befüllung | 256 |  |
| 38 |  | Befüllung | 65536 |  |
| 39 |  | Befüllung | 16777216 |  |
| 40 |  | Stabilisieren | 1 |  |
| 41 |  | Stabilisieren | 256 |  |
| 42 |  | Stabilisieren | 65536 |  |
| 43 |  | Stabilisieren | 16777216 |  |
| 44 |  | Frostschutz | 1 |  |
| 45 | 0x01 | Einheit Temperatur | 1 |  |
| 46 | 0x01 | Einheit Durchfluss | 1 |  |
| 47 | 0x01 | Einheit Druck | 1 |  |
| 48 | 0x01 | Einheit Leistung | 1 |  |
| 49 | 0x01 | Einheit Energie | 1 |  |
| 50 | 0x01 | VDI dT zu hoch | 1 |  |
| 52 |  | Fehlermaske | 1 |  |
| 53 |  | Fehlermaske | 256 |  |
| 54 |  | Fehlermaske | 65536 |  |
| 55 |  | Fehlermaske | 16777216 |  |



### <a name="0010_7442_0100"></a>DFA (0x0010) <= ZEN DT6 \[WMZ1\] (0x7442), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wmz1_Wert_Wh | 1 |  Wh |
| 1 |  | Wmz1_Wert_Wh | 256 |  Wh |
| 2 |  | Wmz1_Wert_Wh | 65536 |  Wh |
| 3 |  | Wmz1_Wert_Wh | 16777216 |  Wh |
| 4 |  | Wmz1_Leistung_W | 1 |  W |
| 5 |  | Wmz1_Leistung_W | 256 |  W |
| 6 |  | Wmz1_Leistung_W | 65536 |  W |
| 7 |  | Wmz1_Leistung_W | 16777216 |  W |
| 8 |  | Wmz1_WertHeute_Wh | 1 |  Wh |
| 9 |  | Wmz1_WertHeute_Wh | 256 |  Wh |
| 10 |  | Wmz1_WertHeute_Wh | 65536 |  Wh |
| 11 |  | Wmz1_WertHeute_Wh | 16777216 |  Wh |
| 12 |  | Wmz1_WertWoche_Wh | 1 |  Wh |
| 13 |  | Wmz1_WertWoche_Wh | 256 |  Wh |
| 14 |  | Wmz1_WertWoche_Wh | 65536 |  Wh |
| 15 |  | Wmz1_WertWoche_Wh | 16777216 |  Wh |



### <a name="0010_7511_0100"></a>DFA (0x0010) <= SOLTEX-Regler \[Teil 1\] (0x7511), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Kollektoren | 0.1 |  °C |
| 1 |  | Temperatur Kollektoren | 25.6 |  °C |
| 2 |  | Temperatur S,p | 0.1 |  °C |
| 3 |  | Temperatur S,p | 25.6 |  °C |
| 4 |  | Temperatur S,s | 0.1 |  °C |
| 5 |  | Temperatur S,s | 25.6 |  °C |
| 6 |  | Temperatur WP-VL | 0.1 |  °C |
| 7 |  | Temperatur WP-VL | 25.6 |  °C |
| 8 |  | Temperatur WP-RL | 0.1 |  °C |
| 9 |  | Temperatur WP-RL | 25.6 |  °C |
| 10 |  | Temperatur Verdampf | 0.1 |  °C |
| 11 |  | Temperatur Verdampf | 25.6 |  °C |
| 12 |  | Temperatur Erde | 0.1 |  °C |
| 13 |  | Temperatur Erde | 25.6 |  °C |
| 14 |  | Volumenstrom Ko | 0.1 |  l/min |
| 15 |  | Volumenstrom Ko | 25.6 |  l/min |
| 16 | 0x04 | Relais P,H | 1 |  |
| 16 | 0x08 | Relais WP | 1 |  |
| 16 | 0x10 | Ventil WP | 1 |  |
| 16 | 0x20 | Ventil SW | 1 |  |
| 16 | 0x40 | Ventil Ko | 1 |  |
| 16 | 0x80 | Ventil So | 1 |  |
| 17 | 0x01 | Ventil SP | 1 |  |
| 18 |  | Leistung P,Ko | 1 | % |
| 19 |  | Leistung P,S | 1 | % |
| 20 |  | Fehlermaske | 1 |  |
| 21 |  | Fehlermaske | 256 |  |
| 22 |  | Fehlermaske | 65536 |  |
| 23 |  | Fehlermaske | 16777216 |  |
| 25 |  | P,Ko Nennleistung | 1 | % |
| 26 |  | T_Wabs | 0.1 |  °C |
| 27 |  | T_Wabs | 25.6 |  °C |
| 28 |  | Wärmemenge S,p | 0.1 |  kWh |
| 29 |  | Wärmemenge S,p | 25.6 |  kWh |
| 30 |  | Wärmemenge S,p | 6553.6 |  kWh |
| 31 |  | Wärmemenge S,p | 1677721.6 |  kWh |
| 32 |  | Wärmemenge S,s | 0.1 |  kWh |
| 33 |  | Wärmemenge S,s | 25.6 |  kWh |
| 34 |  | Wärmemenge S,s | 6553.6 |  kWh |
| 35 |  | Wärmemenge S,s | 1677721.6 |  kWh |
| 36 |  | Diff_ TUmg/24h | 0.1 |  K |
| 37 |  | Diff_ TUmg/24h | 25.6 |  K |
| 38 |  | Diff_ TSs/8h | 0.1 |  K |
| 39 |  | Diff_ TSs/8h | 25.6 |  K |
| 40 |  | Diff_ TSs/1h | 0.1 |  K |
| 41 |  | Diff_ TSs/1h | 25.6 |  K |
| 42 |  | Betriebssekunden WP | 1 |  s |
| 43 |  | Betriebssekunden WP | 256 |  s |
| 44 |  | Zeitraum WP / 24h | 1 |  s |
| 45 |  | Zeitraum WP / 24h | 256 |  s |
| 46 |  | Zeitraum WP / 24h | 65536 |  s |
| 47 |  | Zeitraum WP / 24h | 16777216 |  s |
| 48 |  | Laufzeit WP / 24h | 1 |  s |
| 49 |  | Laufzeit WP / 24h | 256 |  s |
| 50 |  | Laufzeit WP / 24h | 65536 |  s |
| 51 |  | Laufzeit WP / 24h | 16777216 |  s |
| 56 |  | Temperatur T,H | 0.1 |  °C |
| 57 |  | Temperatur T,H | 25.6 |  °C |
| 58 |  | Systemzeit | 1 |  |
| 59 |  | Systemzeit | 256 |  |



### <a name="0010_7512_0100"></a>DFA (0x0010) <= SOLTEX-Regler \[Teil 2\] (0x7512), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | t-Sp | 1 |  s |
| 1 |  | t-Sp | 256 |  s |
| 2 |  | t-Sp | 65536 |  s |
| 3 |  | t-Sp | 16777216 |  s |
| 4 |  | t-Ss | 1 |  s |
| 5 |  | t-Ss | 256 |  s |
| 6 |  | t-Ss | 65536 |  s |
| 7 |  | t-Ss | 16777216 |  s |
| 8 |  | Laufzeit WP | 1 |  s |
| 9 |  | Laufzeit WP | 256 |  s |
| 10 |  | Laufzeit WP | 65536 |  s |
| 11 |  | Laufzeit WP | 16777216 |  s |
| 12 |  | Anzahl WP-Starts | 1 |  |
| 13 |  | Anzahl WP-Starts | 256 |  |
| 14 |  | Anzahl WP-Starts | 65536 |  |
| 15 |  | Anzahl WP-Starts | 16777216 |  |
| 16 |  | t-WP-Ss | 1 |  s |
| 17 |  | t-WP-Ss | 256 |  s |
| 18 |  | t-WP-Ss | 65536 |  s |
| 19 |  | t-WP-Ss | 16777216 |  s |
| 20 |  | t-Ps | 1 |  s |
| 21 |  | t-Ps | 256 |  s |
| 22 |  | t-Ps | 65536 |  s |
| 23 |  | t-Ps | 16777216 |  s |
| 24 |  | Temperatur T-x | 0.1 |  °C |
| 25 |  | Temperatur T-x | 25.6 |  °C |
| 26 |  | Temperatur T-xx | 0.1 |  °C |
| 27 |  | Temperatur T-xx | 25.6 |  °C |
| 28 |  | C1 | 0.01 |  |
| 29 |  | C1 | 2.56 |  |
| 30 |  | Version | 0.01 |  |
| 31 |  | Version | 2.56 |  |



### <a name="0010_7521_0100"></a>DFA (0x0010) <= Regtronic RQ-B (0x7521), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Durchfluss Sensor 10 | 0.1 |  l/min |
| 19 |  | Durchfluss Sensor 10 | 25.6 |  l/min |
| 20 |  | Drehzahl Relais 1 | 1 | % |
| 21 |  | Drehzahl Relais 2 | 1 | % |
| 22 |  | Drehzahl Relais 3 | 1 | % |
| 23 |  | Drehzahl Relais 5 | 1 | % |
| 24 |  | Drehzahl Relais 4 | 0.1 | % |
| 25 |  | Drehzahl Relais 4 | 25.6 | % |
| 26 | 0x01 | Fehler | 1 |  |
| 27 |  | Desinf_ Phase | 1 |  |
| 28 |  | Betriebssekunden Relais 1 | 1 |  s |
| 29 |  | Betriebssekunden Relais 1 | 256 |  s |
| 30 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 31 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 32 |  | Betriebssekunden Relais 2 | 1 |  s |
| 33 |  | Betriebssekunden Relais 2 | 256 |  s |
| 34 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 35 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 36 |  | Betriebssekunden Relais 3 | 1 |  s |
| 37 |  | Betriebssekunden Relais 3 | 256 |  s |
| 38 |  | Betriebssekunden Relais 3 | 65536 |  s |
| 39 |  | Betriebssekunden Relais 3 | 16777216 |  s |
| 40 |  | Betriebssekunden Relais 4 | 1 |  s |
| 41 |  | Betriebssekunden Relais 4 | 256 |  s |
| 42 |  | Betriebssekunden Relais 4 | 65536 |  s |
| 43 |  | Betriebssekunden Relais 4 | 16777216 |  s |
| 44 |  | Betriebssekunden Relais 5 | 1 |  s |
| 45 |  | Betriebssekunden Relais 5 | 256 |  s |
| 46 |  | Betriebssekunden Relais 5 | 65536 |  s |
| 47 |  | Betriebssekunden Relais 5 | 16777216 |  s |
| 48 | 0x01 | WW-Bereitung | 1 |  |
| 48 | 0x02 | Blockierschutz R4 | 1 |  |
| 48 | 0x04 | Blockierschutz R2 | 1 |  |
| 48 | 0x08 | Kaltwasser | 1 |  |
| 48 | 0x10 | Zirkulationserfassung | 1 |  |
| 48 | 0x20 | Warmstart | 1 |  |
| 48 | 0x40 | Dauerzirkulation | 1 |  |
| 48 | 0x80 | Thermische Zirkulation | 1 |  |
| 48 |  | Funktionen | 1 |  |
| 49 | 0x01 | Anforderungszirkulation | 1 |  |
| 49 | 0x02 | Nachheizung | 1 |  |
| 49 | 0x04 | Desinfektionsnachheizung | 1 |  |
| 49 | 0x08 | Desinfektionszirkulation | 1 |  |
| 49 | 0x10 | Desinfektionsspülung | 1 |  |
| 49 | 0x20 | Fehlerrelais | 1 |  |
| 49 | 0x40 | Rücklaufeinschichtung | 1 |  |
| 49 | 0x80 | Funktionsblock 1 | 1 |  |
| 49 |  | Funktionen | 256 |  |
| 50 | 0x01 | Funktionsblock 2 | 1 |  |
| 51 | 0x01 | Kaltstart | 1 |  |
| 51 | 0x02 | Wärmepumpe | 1 |  |
| 51 | 0x04 | Sollwertanpassung | 1 |  |
| 52 |  | Wärmemenge | 1 |  Wh |
| 53 |  | Wärmemenge | 256 |  Wh |
| 54 |  | Wärmemenge | 65536 |  Wh |
| 55 |  | Wärmemenge | 16777216 |  Wh |
| 56 |  | Version | 0.01 |  |
| 57 |  | Version | 2.56 |  |
| 58 |  | Systemzeit | 1 |  |
| 59 |  | Systemzeit | 256 |  |
| 60 |  | Datum | 1 |  |
| 61 |  | Datum | 256 |  |
| 62 |  | Datum | 65536 |  |
| 63 |  | Datum | 16777216 |  |



### <a name="0010_7522_0100"></a>DFA (0x0010) <= Regtronic RX-B \[Regler\] (0x7522), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Einstrahlung Sensor | 1 |  W/m² |
| 19 |  | Einstrahlung Sensor | 256 |  W/m² |
| 20 |  | Temperatur Sensor Gds1 | 0.1 |  °C |
| 21 |  | Temperatur Sensor Gds1 | 25.6 |  °C |
| 22 |  | Temperatur Sensor Gds2 | 0.1 |  °C |
| 23 |  | Temperatur Sensor Gds2 | 25.6 |  °C |
| 24 |  | Volumenstrom Sensor V40 | 1 |  l/h |
| 25 |  | Volumenstrom Sensor V40 | 256 |  l/h |
| 26 |  | Volumenstrom Sensor V40 | 65536 |  l/h |
| 27 |  | Volumenstrom Sensor V40 | 16777216 |  l/h |
| 28 |  | Volumenstrom Sensor Gds1 | 1 |  l/h |
| 29 |  | Volumenstrom Sensor Gds1 | 256 |  l/h |
| 30 |  | Volumenstrom Sensor Gds1 | 65536 |  l/h |
| 31 |  | Volumenstrom Sensor Gds1 | 16777216 |  l/h |
| 32 |  | Volumenstrom Sensor Gds2 | 1 |  l/h |
| 33 |  | Volumenstrom Sensor Gds2 | 256 |  l/h |
| 34 |  | Volumenstrom Sensor Gds2 | 65536 |  l/h |
| 35 |  | Volumenstrom Sensor Gds2 | 16777216 |  l/h |
| 36 |  | Druck Sensor Gds1 | 0.01 |  bar |
| 37 |  | Druck Sensor Gds1 | 2.56 |  bar |
| 38 |  | Druck Sensor Gds2 | 0.01 |  bar |
| 39 |  | Druck Sensor Gds2 | 2.56 |  bar |
| 40 |  | Drehzahl Relais 1 | 1 | % |
| 41 |  | Drehzahl Relais 2 | 1 | % |
| 42 |  | Drehzahl Relais 3 | 1 | % |
| 43 |  | Drehzahl Relais 4 | 1 | % |
| 44 |  | Drehzahl Relais 5 | 1 | % |
| 48 |  | Systemdatum | 1 |  |
| 49 |  | Systemdatum | 256 |  |
| 50 |  | Systemdatum | 65536 |  |
| 51 |  | Systemdatum | 16777216 |  |
| 52 |  | Fehlermaske | 1 |  |
| 53 |  | Fehlermaske | 256 |  |
| 54 |  | Fehlermaske | 65536 |  |
| 55 |  | Fehlermaske | 16777216 |  |



### <a name="0010_7523_0100"></a>DFA (0x0010) <= Regtronic RX-B \[Module\] (0x7523), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Modul 1 Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Modul 1 Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Modul 1 Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Modul 1 Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Modul 1 Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Modul 1 Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 13 |  | Temperatur Modul 2 Sensor 1 | 25.6 |  °C |
| 14 |  | Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 15 |  | Temperatur Modul 2 Sensor 2 | 25.6 |  °C |
| 16 |  | Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 17 |  | Temperatur Modul 2 Sensor 3 | 25.6 |  °C |
| 18 |  | Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 19 |  | Temperatur Modul 2 Sensor 4 | 25.6 |  °C |
| 20 |  | Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 21 |  | Temperatur Modul 2 Sensor 5 | 25.6 |  °C |
| 22 |  | Temperatur Modul 2 Sensor 6 | 0.1 |  °C |
| 23 |  | Temperatur Modul 2 Sensor 6 | 25.6 |  °C |
| 24 |  | Temperatur Modul 3 Sensor 1 | 0.1 |  °C |
| 25 |  | Temperatur Modul 3 Sensor 1 | 25.6 |  °C |
| 26 |  | Temperatur Modul 3 Sensor 2 | 0.1 |  °C |
| 27 |  | Temperatur Modul 3 Sensor 2 | 25.6 |  °C |
| 28 |  | Temperatur Modul 3 Sensor 3 | 0.1 |  °C |
| 29 |  | Temperatur Modul 3 Sensor 3 | 25.6 |  °C |
| 30 |  | Temperatur Modul 3 Sensor 4 | 0.1 |  °C |
| 31 |  | Temperatur Modul 3 Sensor 4 | 25.6 |  °C |
| 32 |  | Temperatur Modul 3 Sensor 5 | 0.1 |  °C |
| 33 |  | Temperatur Modul 3 Sensor 5 | 25.6 |  °C |
| 34 |  | Temperatur Modul 3 Sensor 6 | 0.1 |  °C |
| 35 |  | Temperatur Modul 3 Sensor 6 | 25.6 |  °C |
| 36 |  | Temperatur Modul 4 Sensor 1 | 0.1 |  °C |
| 37 |  | Temperatur Modul 4 Sensor 1 | 25.6 |  °C |
| 38 |  | Temperatur Modul 4 Sensor 2 | 0.1 |  °C |
| 39 |  | Temperatur Modul 4 Sensor 2 | 25.6 |  °C |
| 40 |  | Temperatur Modul 4 Sensor 3 | 0.1 |  °C |
| 41 |  | Temperatur Modul 4 Sensor 3 | 25.6 |  °C |
| 42 |  | Temperatur Modul 4 Sensor 4 | 0.1 |  °C |
| 43 |  | Temperatur Modul 4 Sensor 4 | 25.6 |  °C |
| 44 |  | Temperatur Modul 4 Sensor 5 | 0.1 |  °C |
| 45 |  | Temperatur Modul 4 Sensor 5 | 25.6 |  °C |
| 46 |  | Temperatur Modul 4 Sensor 6 | 0.1 |  °C |
| 47 |  | Temperatur Modul 4 Sensor 6 | 25.6 |  °C |
| 48 |  | Temperatur Modul 5 Sensor 1 | 0.1 |  °C |
| 49 |  | Temperatur Modul 5 Sensor 1 | 25.6 |  °C |
| 50 |  | Temperatur Modul 5 Sensor 2 | 0.1 |  °C |
| 51 |  | Temperatur Modul 5 Sensor 2 | 25.6 |  °C |
| 52 |  | Temperatur Modul 5 Sensor 3 | 0.1 |  °C |
| 53 |  | Temperatur Modul 5 Sensor 3 | 25.6 |  °C |
| 54 |  | Temperatur Modul 5 Sensor 4 | 0.1 |  °C |
| 55 |  | Temperatur Modul 5 Sensor 4 | 25.6 |  °C |
| 56 |  | Temperatur Modul 5 Sensor 5 | 0.1 |  °C |
| 57 |  | Temperatur Modul 5 Sensor 5 | 25.6 |  °C |
| 58 |  | Temperatur Modul 5 Sensor 6 | 0.1 |  °C |
| 59 |  | Temperatur Modul 5 Sensor 6 | 25.6 |  °C |



### <a name="0010_7530_0100"></a>DFA (0x0010) <= Regtronic RX-B \[WMZ #0\] (0x7530), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 8 |  | Wärmemenge heute | 1 |  Wh |
| 9 |  | Wärmemenge heute | 256 |  Wh |
| 10 |  | Wärmemenge heute | 65536 |  Wh |
| 11 |  | Wärmemenge heute | 16777216 |  Wh |
| 12 |  | Wärmemenge Woche | 1 |  Wh |
| 13 |  | Wärmemenge Woche | 256 |  Wh |
| 14 |  | Wärmemenge Woche | 65536 |  Wh |
| 15 |  | Wärmemenge Woche | 16777216 |  Wh |



### <a name="0010_7611_0100"></a>DFA (0x0010) <= Friwa (0x7611), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Systemzeit | 1 |  |
| 19 |  | Systemzeit | 256 |  |
| 20 |  | Drehzahl Relais 1 | 1 | % |
| 21 |  | Drehzahl Relais 2 | 1 | % |
| 22 | 0x04 | Status Relais 3 | 1 |  |
| 22 | 0x08 | Status Relais 4 | 1 |  |
| 23 |  | Sensordefekt-Maske | 1 |  |
| 24 |  | Warmwassersolltemperatur | 1 |  °C |
| 25 |  | Optionen | 1 |  |
| 26 |  | Status | 1 |  |
| 28 |  | Wärmemenge | 1 |  Wh |
| 29 |  | Wärmemenge | 256 |  Wh |
| 30 |  | Wärmemenge | 1000 |  Wh |
| 31 |  | Wärmemenge | 256000 |  Wh |
| 32 |  | Wärmemenge | 1000000 |  Wh |
| 33 |  | Wärmemenge | 256000000 |  Wh |
| 34 |  | Version | 1 |  |
| 35 |  | Version | 0 |  |



### <a name="0010_7621_0100"></a>DFA (0x0010) <= SOLEX \[Regler\] (0x7621), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Durchfluss Sensor 8 | 1 |  l/h |
| 15 |  | Durchfluss Sensor 8 | 256 |  l/h |
| 16 |  | Einstrahlung Sensor 9 | 1 |  W/m² |
| 17 |  | Einstrahlung Sensor 9 | 256 |  W/m² |
| 18 |  | Systemzeit | 1 |  |
| 19 |  | Systemzeit | 256 |  |
| 20 |  | Drehzahl Relais 1 | 1 | % |
| 21 |  | Drehzahl Relais 2 | 1 | % |
| 22 |  | Drehzahl Relais 3 | 1 | % |
| 23 |  | Drehzahl Relais 4 | 1 | % |
| 24 |  | Drehzahl Relais 5 | 1 | % |
| 25 |  | Fehlermaske | 1 |  |
| 26 |  | Fehlermaske | 256 |  |
| 28 |  | Meldungen | 1 |  |
| 29 |  | Meldungen | 256 |  |
| 30 |  | Version | 1.00 |  |
| 31 |  | Version | 0.01 |  |



### <a name="0010_7622_0100"></a>DFA (0x0010) <= SOLEX \[WMZ\] (0x7622), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Vorlauf | 0.1 |  °C |
| 1 |  | Temperatur Vorlauf | 25.6 |  °C |
| 2 |  | Temperatur Rücklauf | 0.1 |  °C |
| 3 |  | Temperatur Rücklauf | 25.6 |  °C |
| 4 |  | Durchfluss Sensor 8 | 1 |  l/h |
| 5 |  | Durchfluss Sensor 8 | 256 |  l/h |
| 6 |  | Wärmemenge | 1 |  Wh |
| 7 |  | Wärmemenge | 256 |  Wh |
| 8 |  | Wärmemenge | 1000 |  Wh |
| 9 |  | Wärmemenge | 256000 |  Wh |
| 10 |  | Wärmemenge | 1000000 |  Wh |
| 11 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_7651_0100"></a>DFA (0x0010) <= FriWa Kaskadenmaster Version 1 (0x7651), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Volumenstrom Sensor 8 | 0.1 |  l/min |
| 15 |  | Volumenstrom Sensor 8 | 25.6 |  l/min |
| 16 |  | Digitaler Eingang 9 | 1 |  |
| 17 |  | Status Relais 1 | 1 | % |
| 18 |  | Status Relais 2 | 1 | % |
| 19 |  | Status Relais 3 | 1 | % |
| 20 |  | Status Relais 4 | 1 | % |
| 21 |  | Status Relais 5 | 1 | % |
| 22 | 0x01 | T-Sensor Fehler | 1 |  |
| 22 | 0x02 | V-Sensor Fehler | 1 |  |
| 22 | 0x04 | EEPROM Fehler | 1 |  |
| 22 | 0x08 | S1 Fehler | 1 |  |
| 22 | 0x10 | S2 Fehler | 1 |  |
| 24 |  | Version | 0.01 |  |
| 25 |  | Version | 2.56 |  |
| 26 |  | Systemzeit | 1 |  |
| 27 |  | Systemzeit | 256 |  |



### <a name="0010_7711_0100"></a>DFA (0x0010) <= Multitronic \[Regler\] (0x7711), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Einstrahlung | 1 |  W/m² |
| 21 |  | Einstrahlung | 256 |  W/m² |
| 22 |  | Impulseingang 1 | 1 |  |
| 23 |  | Impulseingang 1 | 256 |  |
| 24 |  | Impulseingang 2 | 1 |  |
| 25 |  | Impulseingang 2 | 256 |  |
| 26 |  | Drehzahl Relais 1 | 1 | % |
| 27 |  | Drehzahl Relais 2 | 1 | % |
| 28 |  | Drehzahl Relais 3 | 1 | % |
| 29 |  | Drehzahl Relais 4 | 1 | % |
| 30 |  | Drehzahl Relais 5 | 1 | % |
| 31 |  | Drehzahl Relais 6 | 1 | % |
| 32 |  | Drehzahl Relais 7 | 1 | % |
| 34 |  | Systemzeit | 1 |  |
| 35 |  | Systemzeit | 256 |  |
| 36 |  | Fehlermaske | 1 |  |
| 37 |  | Fehlermaske | 256 |  |
| 38 |  | Warnungsmaske | 1 |  |
| 39 |  | Warnungsmaske | 256 |  |
| 40 |  | Reglerversion | 1 |  |
| 41 |  | Reglerversion | 256 |  |
| 42 |  | System | 1 |  |
| 43 |  | Schema | 1 |  |
| 44 |  | HK1-VL-Soll | 0.1 |  °C |
| 45 |  | HK1-VL-Soll | 25.6 |  °C |
| 46 |  | HK1-Betriebsstatus | 1 |  |
| 47 |  | HK1-Status | 1 |  |
| 48 |  | HK2-VL-Soll | 0.1 |  °C |
| 49 |  | HK2-VL-Soll | 25.6 |  °C |
| 50 |  | HK2-Betriebsstatus | 1 |  |
| 51 |  | HK2-Status | 1 |  |
| 52 |  | HK3-VL-Soll | 0.1 |  °C |
| 53 |  | HK3-VL-Soll | 25.6 |  °C |
| 54 |  | HK3-Betriebsstatus | 1 |  |
| 55 |  | HK3-Status | 1 |  |
| 56 |  | Sensorbenutzungs-Maske | 1 |  |
| 57 |  | Sensorbenutzungs-Maske | 256 |  |
| 58 |  | Sensorbenutzungs-Maske | 65536 |  |
| 59 |  | Sensorbenutzungs-Maske | 16777216 |  |
| 60 |  | Relaisbenutzungsmaske | 1 |  |
| 61 |  | Relaisbenutzungsmaske | 256 |  |
| 62 |  | Relaisbenutzungsmaske | 65536 |  |
| 63 |  | Relaisbenutzungsmaske | 16777216 |  |



### <a name="0010_7712_0100"></a>DFA (0x0010) <= Multitronic \[WMZ\] (0x7712), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauftemperatur | 0.1 |  °C |
| 1 |  | Vorlauftemperatur | 25.6 |  °C |
| 2 |  | Rücklauftemperatur | 0.1 |  °C |
| 3 |  | Rücklauftemperatur | 25.6 |  °C |
| 4 |  | Volumenstrom | 1 |  l/h |
| 5 |  | Volumenstrom | 256 |  l/h |
| 6 |  | Wärme | 1 |  Wh |
| 7 |  | Wärme | 256 |  Wh |
| 8 |  | Wärme | 1000 |  Wh |
| 9 |  | Wärme | 256000 |  Wh |
| 10 |  | Wärme | 1000000 |  Wh |
| 11 |  | Wärme | 256000000 |  Wh |



### <a name="0010_7721_0100"></a>DFA (0x0010) <= DeltaSol E \[Regler\] (0x7721), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Einstrahlung CS | 1 |  W/m² |
| 21 |  | Einstrahlung CS | 256 |  W/m² |
| 22 |  | Impulse 1 V40 | 1 |  |
| 23 |  | Impulse 1 V40 | 256 |  |
| 24 |  | Digital Input | 1 |  |
| 25 |  | Digital Input | 256 |  |
| 26 |  | Drehzahl Relais 1 | 1 | % |
| 27 |  | Drehzahl Relais 2 | 1 | % |
| 28 |  | Drehzahl Relais 3 | 1 | % |
| 29 |  | Drehzahl Relais 4 | 1 | % |
| 30 |  | Drehzahl Relais 5 | 1 | % |
| 31 |  | Drehzahl Relais 6 | 1 | % |
| 32 |  | Drehzahl Relais 7 | 1 | % |
| 36 |  | Fehlermaske | 1 |  |
| 37 |  | Fehlermaske | 256 |  |
| 38 |  | Meldungen | 1 |  |
| 39 |  | Meldungen | 256 |  |
| 40 |  | System | 1 |  |
| 42 |  | Schema | 1 |  |
| 43 |  | Schema | 256 |  |
| 44 |  | Vorlauf Soll HK1 Modul Sensor 18 | 0.1 |  °C |
| 45 |  | Vorlauf Soll HK1 Modul Sensor 18 | 25.6 |  °C |
| 46 |  | Status HK1 Modul | 1 |  |
| 47 |  | Status HK1 Modul | 256 |  |
| 48 |  | Vorlauf Soll HK2 Modul Sensor 25 | 0.1 |  °C |
| 49 |  | Vorlauf Soll HK2 Modul Sensor 25 | 25.6 |  °C |
| 50 |  | Status HK2 Modul | 1 |  |
| 51 |  | Status HK2 Modul | 256 |  |
| 52 |  | Vorlauf Soll HK3 Modul Sensor 32 | 0.1 |  °C |
| 53 |  | Vorlauf Soll HK3 Modul Sensor 32 | 25.6 |  °C |
| 54 |  | Status HK3 Modul | 1 |  |
| 55 |  | Status HK3 Modul | 256 |  |
| 56 |  | Vorlauf Soll Heizkreis Sensor 11 | 0.1 |  °C |
| 57 |  | Vorlauf Soll Heizkreis Sensor 11 | 25.6 |  °C |
| 58 |  | Status Heizkreis | 1 |  |
| 59 |  | Status Heizkreis | 256 |  |
| 60 |  | Version | 1.00 |  |
| 61 |  | Version | 0.01 |  |
| 62 |  | Systemzeit | 1 |  |
| 63 |  | Systemzeit | 256 |  |
| 64 |  | Jahr | 1 |  |
| 65 |  | Jahr | 256 |  |
| 66 |  | Monat | 1 |  |
| 67 |  | Tag | 1 |  |



### <a name="0010_7722_0100"></a>DFA (0x0010) <= DeltaSol E \[WMZ\] (0x7722), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Vorlauf | 0.1 |  °C |
| 1 |  | Temperatur Vorlauf | 25.6 |  °C |
| 2 |  | Temperatur Rücklauf | 0.1 |  °C |
| 3 |  | Temperatur Rücklauf | 25.6 |  °C |
| 4 |  | Durchfluss Sensor 8 | 1 |  l/h |
| 5 |  | Durchfluss Sensor 8 | 256 |  l/h |
| 6 |  | Wärmemenge | 1 |  Wh |
| 7 |  | Wärmemenge | 256 |  Wh |
| 8 |  | Wärmemenge | 1000 |  Wh |
| 9 |  | Wärmemenge | 256000 |  Wh |
| 10 |  | Wärmemenge | 1000000 |  Wh |
| 11 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_7729_0100"></a>DFA (0x0010) <= DeltaSol E Fahrenheit \[Regler\] (0x7729), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °F |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °F |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °F |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °F |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °F |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °F |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °F |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °F |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °F |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °F |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °F |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °F |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °F |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °F |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °F |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °F |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °F |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °F |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °F |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °F |
| 20 |  | Einstrahlung CS | 1 |  W/m² |
| 21 |  | Einstrahlung CS | 256 |  W/m² |
| 22 |  | Impulse 1 V40 | 1 |  |
| 23 |  | Impulse 1 V40 | 256 |  |
| 24 |  | Digital Input | 1 |  |
| 25 |  | Digital Input | 256 |  |
| 26 |  | Drehzahl Relais 1 | 1 | % |
| 27 |  | Drehzahl Relais 2 | 1 | % |
| 28 |  | Drehzahl Relais 3 | 1 | % |
| 29 |  | Drehzahl Relais 4 | 1 | % |
| 30 |  | Drehzahl Relais 5 | 1 | % |
| 31 |  | Drehzahl Relais 6 | 1 | % |
| 32 |  | Drehzahl Relais 7 | 1 | % |
| 36 |  | Fehlermaske | 1 |  |
| 37 |  | Fehlermaske | 256 |  |
| 38 |  | Meldungen | 1 |  |
| 39 |  | Meldungen | 256 |  |
| 40 |  | System | 1 |  |
| 42 |  | Schema | 1 |  |
| 43 |  | Schema | 256 |  |
| 44 |  | Vorlauf Soll HK1 Modul Sensor 18 | 0.1 |  °F |
| 45 |  | Vorlauf Soll HK1 Modul Sensor 18 | 25.6 |  °F |
| 46 |  | Status HK1 Modul | 1 |  |
| 47 |  | Status HK1 Modul | 256 |  |
| 48 |  | Vorlauf Soll HK2 Modul Sensor 25 | 0.1 |  °F |
| 49 |  | Vorlauf Soll HK2 Modul Sensor 25 | 25.6 |  °F |
| 50 |  | Status HK2 Modul | 1 |  |
| 51 |  | Status HK2 Modul | 256 |  |
| 52 |  | Vorlauf Soll HK3 Modul Sensor 32 | 0.1 |  °F |
| 53 |  | Vorlauf Soll HK3 Modul Sensor 32 | 25.6 |  °F |
| 54 |  | Status HK3 Modul | 1 |  |
| 55 |  | Status HK3 Modul | 256 |  |
| 56 |  | Vorlauf Soll Heizkreis Sensor 11 | 0.1 |  °F |
| 57 |  | Vorlauf Soll Heizkreis Sensor 11 | 25.6 |  °F |
| 58 |  | Status Heizkreis | 1 |  |
| 59 |  | Status Heizkreis | 256 |  |
| 60 |  | Version | 1.00 |  |
| 61 |  | Version | 0.01 |  |
| 62 |  | Systemzeit | 1 |  |
| 63 |  | Systemzeit | 256 |  |
| 64 |  | Jahr | 1 |  |
| 65 |  | Jahr | 256 |  |
| 66 |  | Monat | 1 |  |
| 67 |  | Tag | 1 |  |



### <a name="0010_772A_0100"></a>DFA (0x0010) <= DeltaSol E Fahrenheit \[WMZ\] (0x772A), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Vorlauf | 0.1 |  °F |
| 1 |  | Temperatur Vorlauf | 25.6 |  °F |
| 2 |  | Temperatur Rücklauf | 0.1 |  °F |
| 3 |  | Temperatur Rücklauf | 25.6 |  °F |
| 4 |  | Durchfluss Sensor 8 | 1 |  l/h |
| 5 |  | Durchfluss Sensor 8 | 256 |  l/h |
| 6 |  | Wärmemenge | 1 |  Wh |
| 7 |  | Wärmemenge | 256 |  Wh |
| 8 |  | Wärmemenge | 1000 |  Wh |
| 9 |  | Wärmemenge | 256000 |  Wh |
| 10 |  | Wärmemenge | 1000000 |  Wh |
| 11 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_7731_0100"></a>DFA (0x0010) <= SOLTOP DeltaSol S2/S3 (0x7731), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Drehzahl R1 | 1 | % |
| 17 |  | Drehzahl R2 | 1 | % |
| 18 |  | Drehzahl R3 | 1 | % |
| 19 |  | Relaisbyte | 1 |  |
| 20 |  | Wärme | 1 |  Wh |
| 21 |  | Wärme | 256 |  Wh |
| 22 |  | Wärme | 1000 |  Wh |
| 23 |  | Wärme | 256000 |  Wh |
| 24 |  | Wärme | 1000000 |  Wh |
| 25 |  | Wärme | 256000000 |  Wh |
| 26 |  | Schema | 1 |  |



### <a name="0010_7751_0100"></a>DFA (0x0010) <= DeDietrich Diemasol C v2007 (0x7751), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Volumenstrom | 0.1 |  l/min |
| 23 |  | Volumenstrom | 25.6 |  l/min |
| 24 |  | Drehzahl R1 | 1 | % |
| 25 |  | Drehzahl R2 | 1 | % |
| 26 |  | Drehzahl R3 | 1 | % |
| 27 | 0x01 | Relaisstatus R4 | 1 |  |
| 27 | 0x02 | Relaisstatus R5 | 1 |  |
| 27 | 0x04 | Relaisstatus R6 | 1 |  |
| 27 | 0x08 | Relaisstatus R7 | 1 |  |
| 27 | 0x10 | Relaisstatus R8 | 1 |  |
| 27 | 0x20 | Relaisstatus R9 | 1 |  |
| 28 |  | Wärmemenge | 1 |  Wh |
| 29 |  | Wärmemenge | 256 |  Wh |
| 30 |  | Wärmemenge | 65536 |  Wh |
| 31 |  | Wärmemenge | 16777216 |  Wh |
| 32 |  | Systemdatum | 1 |  |
| 33 |  | Systemdatum | 256 |  |
| 34 |  | Systemdatum | 65536 |  |
| 35 |  | Systemdatum | 16777216 |  |
| 36 |  | Systemzeit | 1 |  |
| 37 |  | Systemzeit | 256 |  |
| 39 |  | Variante | 1 |  |



### <a name="0010_7761_0100"></a>DFA (0x0010) <= DeltaSol Pool (0x7761), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Einstrahlung CS | 1 |  W/m² |
| 21 |  | Einstrahlung CS | 256 |  W/m² |
| 22 |  | Impulse 1 V40 | 1 |  |
| 23 |  | Impulse 1 V40 | 256 |  |
| 24 |  | Digital Input | 1 |  |
| 25 |  | Digital Input | 256 |  |
| 26 |  | Drehzahl Relais 1 | 1 | % |
| 27 |  | Drehzahl Relais 2 | 1 | % |
| 28 |  | Drehzahl Relais 3 | 1 | % |
| 29 |  | Drehzahl Relais 4 | 1 | % |
| 30 |  | Drehzahl Relais 5 | 1 | % |
| 31 |  | Drehzahl Relais 6 | 1 | % |
| 32 |  | Drehzahl Relais 7 | 1 | % |
| 33 |  | Fehlermaske | 1 |  |
| 34 |  | Fehlermaske | 256 |  |
| 36 | 0x01 | Solar dTein | 1 |  |
| 36 | 0x02 | CS ein | 1 |  |
| 36 | 0x04 | Solar Mindestein | 1 |  |
| 36 | 0x08 | Solar Mindestaus | 1 |  |
| 36 | 0x10 | Beckenmax_ | 1 |  |
| 36 | 0x20 | Filtermin_ | 1 |  |
| 36 | 0x40 | Nachheizung | 1 |  |
| 36 | 0x80 | Solar Nachheizung | 1 |  |
| 36 |  | Meldungen | 1 |  |
| 36 | 0x100 | dT Solar Nachheizung | 1 |  |
| 36 | 0x200 | Umwälzung | 1 |  |
| 36 | 0x400 | Kollektorabschaltung | 1 |  |
| 36 | 0x800 | Kollektorminimal | 1 |  |
| 36 | 0x1000 | dT Beckenkühlfkt aus | 1 |  |
| 36 | 0x2000 | Vorlaufbegrenzung | 1 |  |
| 36 | 0x4000 | Extra Filterlaufzeit | 1 |  |
| 36 | 0x8000 | Externe Reglerfreigabe | 1 |  |
| 36 | 0x10000 | Fehlerrelais | 1 |  |
| 36 | 0x40000 | T Beckenkühlfkt | 1 |  |
| 36 | 0x80000 | dT Beckenkühlfkt ein | 1 |  |
| 36 | 0x80000 | Solarkreis ein | 1 |  |
| 36 | 0x100000 | Filter eingeschaltet | 1 |  |
| 36 | 0x200000 | Nachhzg normal | 1 |  |
| 36 | 0x400000 | Solarkreis aktiv | 1 |  |
| 36 | 0x800000 | Betriebsrelais ein | 1 |  |
| 36 | 0x1000000 | Pumpencheck | 1 |  |
| 36 | 0x4000000 | Solar dTaus | 1 |  |
| 37 |  | Meldungen | 256 |  |
| 38 |  | Meldungen | 65536 |  |
| 39 |  | Meldungen | 16777216 |  |
| 40 |  | Filterlaufzeit | 1 |  min |
| 41 |  | Filterlaufzeit | 256 |  min |
| 44 |  | Solarphase | 1 |  |
| 44 |  | Version | 1.00 |  |
| 45 |  | Version | 0.01 |  |
| 46 |  | Systemzeit | 1 |  |
| 47 |  | Systemzeit | 256 |  |
| 48 |  | Jahr | 1 |  |
| 49 |  | Jahr | 256 |  |
| 50 |  | Monat | 1 |  |
| 51 |  | Tag | 1 |  |
| 52 |  | Umwaelzzeitzähler | 1 |  s |
| 53 |  | Umwaelzzeitzähler | 256 |  s |
| 54 |  | Umwaelzzeitzähler | 65536 |  s |
| 55 |  | Umwaelzzeitzähler | 16777216 |  s |
| 56 |  | Extra-Filterzeit | 1 |  s |
| 57 |  | Extra-Filterzeit | 256 |  s |
| 58 |  | Extra-Filterzeit | 65536 |  s |
| 59 |  | Extra-Filterzeit | 16777216 |  s |
| 60 |  | Pumpenüberwachung | 1 |  s |
| 61 |  | Pumpenüberwachung | 256 |  s |
| 62 |  | Pumpenüberwachung | 65536 |  s |
| 63 |  | Pumpenüberwachung | 16777216 |  s |
| 64 |  | Solar Min_ Ein/Aus | 1 |  s |
| 65 |  | Solar Min_ Ein/Aus | 256 |  s |
| 66 |  | Solar Min_ Ein/Aus | 65536 |  s |
| 67 |  | Solar Min_ Ein/Aus | 16777216 |  s |
| 68 |  | Sim5 | 1 |  |
| 69 |  | Sim5 | 256 |  |
| 70 |  | Sim5 | 65536 |  |
| 71 |  | Sim5 | 16777216 |  |
| 72 |  | Dauer Regelungsblock | 1 |  ms |
| 73 |  | Dauer Regelungsblock | 256 |  ms |
| 74 |  | Dauer Regelungsblock | 65536 |  ms |
| 75 |  | Dauer Regelungsblock | 16777216 |  ms |



### <a name="0010_7762_0100"></a>DFA (0x0010) <= DeltaSol Pool \[WMZ\] (0x7762), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Vorlauf | 0.1 |  °C |
| 1 |  | Temperatur Vorlauf | 25.6 |  °C |
| 2 |  | Temperatur Rücklauf | 0.1 |  °C |
| 3 |  | Temperatur Rücklauf | 25.6 |  °C |
| 4 |  | Durchfluss Sensor 8 | 1 |  l/h |
| 5 |  | Durchfluss Sensor 8 | 256 |  l/h |
| 6 |  | Wärmemenge | 1 |  Wh |
| 7 |  | Wärmemenge | 256 |  Wh |
| 8 |  | Wärmemenge | 1000 |  Wh |
| 9 |  | Wärmemenge | 256000 |  Wh |
| 10 |  | Wärmemenge | 1000000 |  Wh |
| 11 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_7774_0100"></a>DFA (0x0010) <= EMZ/CME (0x7774), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Datum | 1 |  |
| 1 |  | Datum | 256 |  |
| 2 |  | Datum | 65536 |  |
| 3 |  | Datum | 16777216 |  |
| 4 |  | Uhrzeit | 1 |  |
| 5 |  | Uhrzeit | 256 |  |
| 8 |  | TSS | 0.1 |  °C |
| 9 |  | TSS | 25.6 |  °C |
| 10 |  | TEF | 0.1 |  °C |
| 11 |  | TEF | 25.6 |  °C |
| 12 |  | Wärme | 1 |  Wh |
| 13 |  | Wärme | 256 |  Wh |
| 14 |  | Wärme | 1000 |  Wh |
| 15 |  | Wärme | 256000 |  Wh |
| 16 |  | Wärme | 1000000 |  Wh |
| 17 |  | Wärme | 256000000 |  Wh |
| 18 |  | Volumenstrom | 1 |  l/h |
| 19 |  | Volumenstrom | 256 |  l/h |
| 20 |  | Volumen | 0.01 |  m³ |
| 21 |  | Volumen | 2.56 |  m³ |
| 22 |  | Volumen | 655.36 |  m³ |
| 23 |  | Volumen | 167772.16 |  m³ |
| 24 |  | TSS | 0.1 |  °C |
| 25 |  | TSS | 25.6 |  °C |
| 26 |  | TSA | 0.1 |  °C |
| 27 |  | TSA | 25.6 |  °C |
| 28 |  | Wärme2 | 1 |  Wh |
| 29 |  | Wärme2 | 256 |  Wh |
| 30 |  | Wärme2 | 1000 |  Wh |
| 31 |  | Wärme2 | 256000 |  Wh |
| 32 |  | Wärme2 | 1000000 |  Wh |
| 33 |  | Wärme2 | 256000000 |  Wh |
| 34 |  | Volumenstrom2 | 1 |  l/h |
| 35 |  | Volumenstrom2 | 256 |  l/h |
| 36 |  | TAC | 0.1 |  °C |
| 37 |  | TAC | 25.6 |  °C |
| 38 |  | TAF | 0.1 |  °C |
| 39 |  | TAF | 25.6 |  °C |
| 40 |  | Wärme3 | 1 |  Wh |
| 41 |  | Wärme3 | 256 |  Wh |
| 42 |  | Wärme3 | 1000 |  Wh |
| 43 |  | Wärme3 | 256000 |  Wh |
| 44 |  | Wärme3 | 1000000 |  Wh |
| 45 |  | Wärme3 | 256000000 |  Wh |
| 46 |  | Volumenstrom3 | 1 |  l/h |
| 47 |  | Volumenstrom3 | 256 |  l/h |
| 48 |  | TBC | 0.1 |  °C |
| 49 |  | TBC | 25.6 |  °C |
| 50 |  | TBF | 0.1 |  °C |
| 51 |  | TBF | 25.6 |  °C |
| 52 |  | Wärme4 | 1 |  Wh |
| 53 |  | Wärme4 | 256 |  Wh |
| 54 |  | Wärme4 | 1000 |  Wh |
| 55 |  | Wärme4 | 256000 |  Wh |
| 56 |  | Wärme4 | 1000000 |  Wh |
| 57 |  | Wärme4 | 256000000 |  Wh |
| 58 |  | Volumenstrom4 | 1 |  l/h |
| 59 |  | Volumenstrom4 | 256 |  l/h |
| 60 |  | TSC | 0.1 |  °C |
| 61 |  | TSC | 25.6 |  °C |
| 62 |  | TSF | 0.1 |  °C |
| 63 |  | TSF | 25.6 |  °C |
| 64 |  | Wärme5 | 1 |  Wh |
| 65 |  | Wärme5 | 256 |  Wh |
| 66 |  | Wärme5 | 1000 |  Wh |
| 67 |  | Wärme5 | 256000 |  Wh |
| 68 |  | Wärme5 | 1000000 |  Wh |
| 69 |  | Wärme5 | 256000000 |  Wh |
| 70 |  | Volumenstrom5 | 1 |  l/h |
| 71 |  | Volumenstrom5 | 256 |  l/h |
| 72 |  | Strom1 | 1 |  Wh |
| 73 |  | Strom1 | 256 |  Wh |
| 74 |  | Strom1 | 65536 |  Wh |
| 75 |  | Strom1 | 16777216 |  Wh |
| 76 |  | Strom1 | 1 |  kWh |
| 77 |  | Strom1 | 256 |  kWh |
| 78 |  | Strom1 | 65536 |  kWh |
| 79 |  | Strom1 | 16777216 |  kWh |
| 80 |  | Strom2 | 1 |  kWh |
| 81 |  | Strom2 | 256 |  kWh |
| 82 |  | Strom2 | 65536 |  kWh |
| 83 |  | Strom2 | 16777216 |  kWh |
| 84 |  | Gas1 | 0.01 |  m³ |
| 85 |  | Gas1 | 2.56 |  m³ |
| 86 |  | Gas1 | 655.36 |  m³ |
| 87 |  | Gas1 | 167772.16 |  m³ |
| 88 |  | Therm_ Energie1 | 1 |  kWh |
| 89 |  | Therm_ Energie1 | 256 |  kWh |
| 90 |  | Therm_ Energie1 | 65536 |  kWh |
| 91 |  | Therm_ Energie1 | 16777216 |  kWh |
| 92 |  | Therm_ Energie2 | 1 |  kWh |
| 93 |  | Therm_ Energie2 | 256 |  kWh |
| 94 |  | Therm_ Energie2 | 65536 |  kWh |
| 95 |  | Therm_ Energie2 | 16777216 |  kWh |
| 96 |  | Impulse | 1 |  |
| 96 |  | Impulse | 1 |  |
| 96 |  | Impulszähler 1 \(Volumen 1/2\) | 1 |  |
| 97 |  | Impulse | 256 |  |
| 97 |  | Impulszähler 1 \(Volumen 1/2\) | 256 |  |
| 97 |  | Impulse | 256 |  |
| 98 |  | Impulse | 65536 |  |
| 98 |  | Impulse | 65536 |  |
| 98 |  | Impulszähler 1 \(Volumen 1/2\) | 65536 |  |
| 99 |  | Impulszähler 1 \(Volumen 1/2\) | 16777216 |  |
| 99 |  | Impulse | 16777216 |  |
| 99 |  | Impulse | 16777216 |  |
| 100 |  | Impulse | 1 |  |
| 100 |  | Impulszähler 2 \(Volumen 3\) | 1 |  |
| 101 |  | Impulse | 256 |  |
| 101 |  | Impulszähler 2 \(Volumen 3\) | 256 |  |
| 102 |  | Impulse | 65536 |  |
| 102 |  | Impulszähler 2 \(Volumen 3\) | 65536 |  |
| 103 |  | Impulszähler 2 \(Volumen 3\) | 16777216 |  |
| 103 |  | Impulse | 16777216 |  |
| 104 |  | Impulszähler 3 \(Volumen 4\) | 1 |  |
| 104 |  | Impulse | 1 |  |
| 105 |  | Impulszähler 3 \(Volumen 4\) | 256 |  |
| 105 |  | Impulse | 256 |  |
| 106 |  | Impulszähler 3 \(Volumen 4\) | 65536 |  |
| 106 |  | Impulse | 65536 |  |
| 107 |  | Impulszähler 3 \(Volumen 4\) | 16777216 |  |
| 107 |  | Impulse | 16777216 |  |
| 108 |  | Impulszähler 4 \(Volumen 5\) | 1 |  |
| 108 |  | Impulse | 1 |  |
| 109 |  | Impulszähler 4 \(Volumen 5\) | 256 |  |
| 109 |  | Impulse | 256 |  |
| 110 |  | Impulse | 65536 |  |
| 110 |  | Impulszähler 4 \(Volumen 5\) | 65536 |  |
| 111 |  | Impulszähler 4 \(Volumen 5\) | 16777216 |  |
| 111 |  | Impulse | 16777216 |  |
| 112 |  | Impulszähler 5 \(Strom 1\) | 1 |  |
| 112 |  | Impulse | 1 |  |
| 113 |  | Impulszähler 5 \(Strom 1\) | 256 |  |
| 113 |  | Impulse | 256 |  |
| 114 |  | Impulse | 65536 |  |
| 114 |  | Impulszähler 5 \(Strom 1\) | 65536 |  |
| 115 |  | Impulszähler 5 \(Strom 1\) | 16777216 |  |
| 115 |  | Impulse | 16777216 |  |
| 116 |  | Impulszähler 6 \(Strom 2\) | 1 |  |
| 116 |  | Impulse | 1 |  |
| 117 |  | Impulse | 256 |  |
| 117 |  | Impulszähler 6 \(Strom 2\) | 256 |  |
| 118 |  | Impulszähler 6 \(Strom 2\) | 65536 |  |
| 118 |  | Impulse | 65536 |  |
| 119 |  | Impulszähler 6 \(Strom 2\) | 16777216 |  |
| 119 |  | Impulse | 16777216 |  |
| 120 |  | Impulszähler 7 \(th_ Energie 1\) | 1 |  |
| 120 |  | Impulse | 1 |  |
| 121 |  | Impulszähler 7 \(th_ Energie 1\) | 256 |  |
| 121 |  | Impulse | 256 |  |
| 122 |  | Impulse | 65536 |  |
| 122 |  | Impulszähler 7 \(th_ Energie 1\) | 65536 |  |
| 123 |  | Impulse | 16777216 |  |
| 123 |  | Impulszähler 7 \(th_ Energie 1\) | 16777216 |  |
| 124 |  | Impulse | 1 |  |
| 124 |  | Impulszähler 8 \(th_ Energie 2\) | 1 |  |
| 125 |  | Impulse | 256 |  |
| 125 |  | Impulszähler 8 \(th_ Energie 2\) | 256 |  |
| 126 |  | Impulszähler 8 \(th_ Energie 2\) | 65536 |  |
| 126 |  | Impulse | 65536 |  |
| 127 |  | Impulse | 16777216 |  |
| 127 |  | Impulszähler 8 \(th_ Energie 2\) | 16777216 |  |
| 128 |  | Impulse | 1 |  |
| 128 |  | Impulszähler 9 \(Gas 1\) | 1 |  |
| 129 |  | Impulse | 256 |  |
| 129 |  | Impulszähler 9 \(Gas 1\) | 256 |  |
| 130 |  | Impulse | 65536 |  |
| 130 |  | Impulszähler 9 \(Gas 1\) | 65536 |  |
| 131 |  | Impulse | 16777216 |  |
| 131 |  | Impulszähler 9 \(Gas 1\) | 16777216 |  |



### <a name="0010_7821_0100"></a>DFA (0x0010) <= COSMO Multi \[Regler\] (0x7821), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Einstrahlung CS | 1 |  W/m² |
| 21 |  | Einstrahlung CS | 256 |  W/m² |
| 22 |  | Impulse 1 V40 | 1 |  |
| 23 |  | Impulse 1 V40 | 256 |  |
| 24 |  | Digital Input | 1 |  |
| 25 |  | Digital Input | 256 |  |
| 26 |  | Drehzahl Relais 1 | 1 | % |
| 27 |  | Drehzahl Relais 2 | 1 | % |
| 28 |  | Drehzahl Relais 3 | 1 | % |
| 29 |  | Drehzahl Relais 4 | 1 | % |
| 30 |  | Drehzahl Relais 5 | 1 | % |
| 31 |  | Drehzahl Relais 6 | 1 | % |
| 32 |  | Drehzahl Relais 7 | 1 | % |
| 36 |  | Fehlermaske | 1 |  |
| 37 |  | Fehlermaske | 256 |  |
| 38 |  | Meldungen | 1 |  |
| 39 |  | Meldungen | 256 |  |
| 40 |  | System | 1 |  |
| 42 |  | Schema | 1 |  |
| 43 |  | Schema | 256 |  |
| 44 |  | Vorlauf Soll HK1 Modul Sensor 18 | 0.1 |  °C |
| 45 |  | Vorlauf Soll HK1 Modul Sensor 18 | 25.6 |  °C |
| 46 |  | Status HK1 Modul | 1 |  |
| 47 |  | Status HK1 Modul | 256 |  |
| 48 |  | Vorlauf Soll HK2 Modul Sensor 25 | 0.1 |  °C |
| 49 |  | Vorlauf Soll HK2 Modul Sensor 25 | 25.6 |  °C |
| 50 |  | Status HK2 Modul | 1 |  |
| 51 |  | Status HK2 Modul | 256 |  |
| 52 |  | Vorlauf Soll HK3 Modul Sensor 32 | 0.1 |  °C |
| 53 |  | Vorlauf Soll HK3 Modul Sensor 32 | 25.6 |  °C |
| 54 |  | Status HK3 Modul | 1 |  |
| 55 |  | Status HK3 Modul | 256 |  |
| 56 |  | Vorlauf Soll Heizkreis Sensor 11 | 0.1 |  °C |
| 57 |  | Vorlauf Soll Heizkreis Sensor 11 | 25.6 |  °C |
| 58 |  | Status Heizkreis | 1 |  |
| 59 |  | Status Heizkreis | 256 |  |
| 60 |  | Version | 1.00 |  |
| 61 |  | Version | 0.01 |  |
| 62 |  | Systemzeit | 1 |  |
| 63 |  | Systemzeit | 256 |  |
| 64 |  | Jahr | 1 |  |
| 65 |  | Jahr | 256 |  |
| 66 |  | Monat | 1 |  |
| 67 |  | Tag | 1 |  |



### <a name="0010_7822_0100"></a>DFA (0x0010) <= COSMO Multi \[WMZ\] (0x7822), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Vorlauf | 0.1 |  °C |
| 1 |  | Temperatur Vorlauf | 25.6 |  °C |
| 2 |  | Temperatur Rücklauf | 0.1 |  °C |
| 3 |  | Temperatur Rücklauf | 25.6 |  °C |
| 4 |  | Durchfluss Sensor 8 | 1 |  l/h |
| 5 |  | Durchfluss Sensor 8 | 256 |  l/h |
| 6 |  | Wärmemenge | 1 |  Wh |
| 7 |  | Wärmemenge | 256 |  Wh |
| 8 |  | Wärmemenge | 1000 |  Wh |
| 9 |  | Wärmemenge | 256000 |  Wh |
| 10 |  | Wärmemenge | 1000000 |  Wh |
| 11 |  | Wärmemenge | 256000000 |  Wh |



### <a name="0010_7830_0100"></a>DFA (0x0010) <= Unknown device (0x7830), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Jahr | 1 |  |
| 1 |  | Jahr | 256 |  |
| 2 |  | Monat | 1 |  |
| 3 |  | Tag | 1 |  |
| 4 |  | Systemzeit | 1 |  |
| 5 |  | Systemzeit | 256 |  |
| 6 |  | Status | 1 |  |
| 7 |  | Fehlermeldung | 1 |  |
| 8 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 9 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 10 |  | Vorlauftemperatur | 0.1 |  °C |
| 11 |  | Vorlauftemperatur | 25.6 |  °C |
| 12 |  | Relais Pumpe | 1 | % |
| 13 |  | Relais Mischer Auf | 1 | % |
| 14 |  | Relais Mischer Zu | 1 | % |
| 15 |  | Handebetrieb Relais Pumpe | 1 |  |
| 16 |  | Handebetrieb Relais Mischer Auf | 1 |  |
| 17 |  | Handebetrieb Relais Mischer Zu | 1 |  |
| 18 |  | NH-Anforderung | 1 |  |
| 19 |  | Parameter Start | 1 |  |
| 20 |  | Parameter TStart | 0.1 |  °C |
| 21 |  | Parameter TStart | 25.6 |  °C |
| 22 |  | Parameter TMax | 0.1 |  °C |
| 23 |  | Parameter TMax | 25.6 |  °C |
| 24 |  | Parameter Anstieg | 0.1 |  °C |
| 25 |  | Parameter Anstieg | 25.6 |  °C |
| 26 |  | Parameter Anstiegszeit | 1 |  h |
| 27 |  | Parameter Haltezeit | 1 |  d |



### <a name="0010_7910_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[Regler\] (0x7910), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Volumenstrom Sensor S10/V40 | 1 |  l/h |
| 21 |  | Volumenstrom Sensor S10/V40 | 256 |  l/h |
| 22 |  | Volumenstrom Sensor S10/V40 | 65536 |  l/h |
| 23 |  | Volumenstrom Sensor S10/V40 | 16777216 |  l/h |
| 24 |  | Einstrahlung Sensor CS10 | 1 |  W/m² |
| 25 |  | Einstrahlung Sensor CS10 | 256 |  W/m² |
| 26 |  | Druck Sensor RPS | 0.01 |  bar |
| 27 |  | Druck Sensor RPS | 2.56 |  bar |
| 28 |  | Volumenstrom Sensor FlowRotor | 1 |  l/h |
| 29 |  | Volumenstrom Sensor FlowRotor | 256 |  l/h |
| 30 |  | Volumenstrom Sensor FlowRotor | 65536 |  l/h |
| 31 |  | Volumenstrom Sensor FlowRotor | 16777216 |  l/h |
| 32 |  | Drehzahl Relais 1 | 1 | % |
| 33 |  | Drehzahl Relais 2 | 1 | % |
| 34 |  | Drehzahl Relais 3 | 1 | % |
| 35 |  | Drehzahl Relais 4 | 1 | % |
| 36 |  | Drehzahl Relais 5 | 1 | % |
| 40 |  | Systemdatum | 1 |  |
| 41 |  | Systemdatum | 256 |  |
| 42 |  | Systemdatum | 65536 |  |
| 43 |  | Systemdatum | 16777216 |  |
| 44 |  | Fehlermaske | 1 |  |
| 45 |  | Fehlermaske | 256 |  |
| 46 |  | Fehlermaske | 65536 |  |
| 47 |  | Fehlermaske | 16777216 |  |



### <a name="0010_7911_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[Module\] (0x7911), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Modul 1 Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Modul 1 Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Modul 1 Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Modul 1 Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Modul 1 Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Modul 1 Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 13 |  | Temperatur Modul 2 Sensor 1 | 25.6 |  °C |
| 14 |  | Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 15 |  | Temperatur Modul 2 Sensor 2 | 25.6 |  °C |
| 16 |  | Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 17 |  | Temperatur Modul 2 Sensor 3 | 25.6 |  °C |
| 18 |  | Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 19 |  | Temperatur Modul 2 Sensor 4 | 25.6 |  °C |
| 20 |  | Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 21 |  | Temperatur Modul 2 Sensor 5 | 25.6 |  °C |
| 22 |  | Temperatur Modul 2 Sensor 6 | 0.1 |  °C |
| 23 |  | Temperatur Modul 2 Sensor 6 | 25.6 |  °C |



### <a name="0010_7920_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[Heizkreis #0\] (0x7920), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_7930_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[WMZ #0\] (0x7930), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 8 |  | Wärmemenge heute | 1 |  Wh |
| 9 |  | Wärmemenge heute | 256 |  Wh |
| 10 |  | Wärmemenge heute | 65536 |  Wh |
| 11 |  | Wärmemenge heute | 16777216 |  Wh |
| 12 |  | Wärmemenge Woche | 1 |  Wh |
| 13 |  | Wärmemenge Woche | 256 |  Wh |
| 14 |  | Wärmemenge Woche | 65536 |  Wh |
| 15 |  | Wärmemenge Woche | 16777216 |  Wh |



### <a name="0010_7D04_0100"></a>DFA (0x0010) <= FRISTA-mix (0x7D04), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Warmwasser | 0.1 |  °C |
| 1 |  | Temperatur Warmwasser | 25.6 |  °C |
| 2 |  | Temperatur Kaltwasser | 0.1 |  °C |
| 3 |  | Temperatur Kaltwasser | 25.6 |  °C |
| 4 |  | Temperatur Zirkulation | 0.1 |  °C |
| 5 |  | Temperatur Zirkulation | 25.6 |  °C |
| 6 |  | Volumenstrom | 0.1 |  l/min |
| 7 |  | Volumenstrom | 25.6 |  l/min |
| 8 |  | Drehzahl Relais 1 | 1 | % |
| 9 |  | Drehzahl Relais 2 | 1 | % |
| 10 |  | Systemzeit | 1 |  |
| 11 |  | Systemzeit | 256 |  |
| 12 |  | Optionen | 1 |  |
| 13 |  | Status | 1 |  |
| 14 |  | Relaisstatus | 1 |  |
| 15 |  | SensorDefekt | 1 |  |
| 16 |  | Temperatur WW-Soll | 1 |  °C |
| 17 |  | Temperatur Quelle | 1 |  °C |
| 19 |  | verbl_ Zapfung | 1 |  min |
| 20 |  | Schaltspiele | 1 |  |
| 21 |  | Schaltspiele | 256 |  |
| 22 |  | Schaltspiele | 65536 |  |
| 23 |  | Schaltspiele | 16777216 |  |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 1000 |  Wh |
| 27 |  | Wärmemenge | 256000 |  Wh |
| 28 |  | Wärmemenge | 1000000 |  Wh |
| 29 |  | Wärmemenge | 256000000 |  Wh |
| 30 |  | Version | 1 |  |
| 31 |  | Version | 0 |  |
| 32 |  | max_ Temperatur Kaltwasser | 0.1 |  °C |
| 33 |  | max_ Temperatur Kaltwasser | 25.6 |  °C |
| 34 |  | min_ Temperatur Kaltwasser | 0.1 |  °C |
| 35 |  | min_ Temperatur Kaltwasser | 25.6 |  °C |
| 36 |  | max_ Volumenstrom | 1 |  l/h |
| 37 |  | max_ Volumenstrom | 256 |  l/h |
| 38 |  | Zapfmenge | 0.1 |  m³ |
| 39 |  | Zapfmenge | 25.6 |  m³ |



### <a name="0010_7E11_0100"></a>DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 8 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 8 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 9 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 9 | 25.6 |  °C |
| 18 |  | Temperatur Sensor 10 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 10 | 25.6 |  °C |
| 20 |  | Temperatur Sensor 11 | 0.1 |  °C |
| 21 |  | Temperatur Sensor 11 | 25.6 |  °C |
| 22 |  | Temperatur Sensor 12 | 0.1 |  °C |
| 23 |  | Temperatur Sensor 12 | 25.6 |  °C |
| 24 |  | Temperatur Sensor 13 | 0.1 |  °C |
| 25 |  | Temperatur Sensor 13 | 25.6 |  °C |
| 26 |  | Temperatur Sensor 14 | 0.1 |  °C |
| 27 |  | Temperatur Sensor 14 | 25.6 |  °C |
| 28 |  | Temperatur Sensor 15 | 0.1 |  °C |
| 29 |  | Temperatur Sensor 15 | 25.6 |  °C |
| 30 |  | Einstrahlung Sensor 16 | 1 |  W/m² |
| 31 |  | Einstrahlung Sensor 16 | 256 |  W/m² |
| 32 |  | Temperatur Sensor 17 | 0.1 |  °C |
| 33 |  | Temperatur Sensor 17 | 25.6 |  °C |
| 34 |  | Temperatur Sensor 18 | 0.1 |  °C |
| 35 |  | Temperatur Sensor 18 | 25.6 |  °C |
| 36 |  | Temperatur Sensor 19 | 0.1 |  °C |
| 37 |  | Temperatur Sensor 19 | 25.6 |  °C |
| 38 |  | Temperatur Sensor 20 | 0.1 |  °C |
| 39 |  | Temperatur Sensor 20 | 25.6 |  °C |
| 40 |  | Volumenstrom Sensor 13 | 1 |  l/h |
| 41 |  | Volumenstrom Sensor 13 | 256 |  l/h |
| 42 |  | Volumenstrom Sensor 13 | 65536 |  l/h |
| 43 |  | Volumenstrom Sensor 13 | 16777216 |  l/h |
| 44 |  | Volumenstrom Sensor 14 | 1 |  l/h |
| 45 |  | Volumenstrom Sensor 14 | 256 |  l/h |
| 46 |  | Volumenstrom Sensor 14 | 65536 |  l/h |
| 47 |  | Volumenstrom Sensor 14 | 16777216 |  l/h |
| 48 |  | Volumenstrom Sensor 15 | 1 |  l/h |
| 49 |  | Volumenstrom Sensor 15 | 256 |  l/h |
| 50 |  | Volumenstrom Sensor 15 | 65536 |  l/h |
| 51 |  | Volumenstrom Sensor 15 | 16777216 |  l/h |
| 52 |  | Volumenstrom Sensor 17 | 1 |  l/h |
| 53 |  | Volumenstrom Sensor 17 | 256 |  l/h |
| 54 |  | Volumenstrom Sensor 17 | 65536 |  l/h |
| 55 |  | Volumenstrom Sensor 17 | 16777216 |  l/h |
| 56 |  | Volumenstrom Sensor 18 | 1 |  l/h |
| 57 |  | Volumenstrom Sensor 18 | 256 |  l/h |
| 58 |  | Volumenstrom Sensor 18 | 65536 |  l/h |
| 59 |  | Volumenstrom Sensor 18 | 16777216 |  l/h |
| 60 |  | Volumenstrom Sensor 19 | 1 |  l/h |
| 61 |  | Volumenstrom Sensor 19 | 256 |  l/h |
| 62 |  | Volumenstrom Sensor 19 | 65536 |  l/h |
| 63 |  | Volumenstrom Sensor 19 | 16777216 |  l/h |
| 64 |  | Volumenstrom Sensor 20 | 1 |  l/h |
| 65 |  | Volumenstrom Sensor 20 | 256 |  l/h |
| 66 |  | Volumenstrom Sensor 20 | 65536 |  l/h |
| 67 |  | Volumenstrom Sensor 20 | 16777216 |  l/h |
| 68 |  | Druck Sensor 17 | 0.01 |  bar |
| 69 |  | Druck Sensor 17 | 2.56 |  bar |
| 70 |  | Druck Sensor 18 | 0.01 |  bar |
| 71 |  | Druck Sensor 18 | 2.56 |  bar |
| 72 |  | Druck Sensor 19 | 0.01 |  bar |
| 73 |  | Druck Sensor 19 | 2.56 |  bar |
| 74 |  | Druck Sensor 20 | 0.01 |  bar |
| 75 |  | Druck Sensor 20 | 2.56 |  bar |
| 76 |  | Drehzahl Relais 1 | 1 | % |
| 77 |  | Drehzahl Relais 2 | 1 | % |
| 78 |  | Drehzahl Relais 3 | 1 | % |
| 79 |  | Drehzahl Relais 4 | 1 | % |
| 80 |  | Drehzahl Relais 5 | 1 | % |
| 81 |  | Drehzahl Relais 6 | 1 | % |
| 82 |  | Drehzahl Relais 7 | 1 | % |
| 83 |  | Drehzahl Relais 8 | 1 | % |
| 84 |  | Drehzahl Relais 9 | 1 | % |
| 85 |  | Drehzahl Relais 10 | 1 | % |
| 86 |  | Drehzahl Relais 11 | 1 | % |
| 87 |  | Drehzahl Relais 12 | 1 | % |
| 88 |  | Drehzahl Relais 13 | 1 | % |
| 89 |  | Drehzahl Relais 14 | 1 | % |
| 92 |  | Systemdatum | 1 |  |
| 93 |  | Systemdatum | 256 |  |
| 94 |  | Systemdatum | 65536 |  |
| 95 |  | Systemdatum | 16777216 |  |
| 96 |  | Fehlermaske | 1 |  |
| 97 |  | Fehlermaske | 256 |  |
| 98 |  | Fehlermaske | 65536 |  |
| 99 |  | Fehlermaske | 16777216 |  |



### <a name="0010_7E12_0100"></a>DFA (0x0010) <= DeltaSol MX \[Module\] (0x7E12), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Modul 1 Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Modul 1 Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Modul 1 Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Modul 1 Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Modul 1 Sensor 5 | 25.6 |  °C |
| 10 |  | Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 11 |  | Temperatur Modul 1 Sensor 6 | 25.6 |  °C |
| 12 |  | Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 13 |  | Temperatur Modul 2 Sensor 1 | 25.6 |  °C |
| 14 |  | Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 15 |  | Temperatur Modul 2 Sensor 2 | 25.6 |  °C |
| 16 |  | Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 17 |  | Temperatur Modul 2 Sensor 3 | 25.6 |  °C |
| 18 |  | Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 19 |  | Temperatur Modul 2 Sensor 4 | 25.6 |  °C |
| 20 |  | Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 21 |  | Temperatur Modul 2 Sensor 5 | 25.6 |  °C |
| 22 |  | Temperatur Modul 2 Sensor 6 | 0.1 |  °C |
| 23 |  | Temperatur Modul 2 Sensor 6 | 25.6 |  °C |
| 24 |  | Temperatur Modul 3 Sensor 1 | 0.1 |  °C |
| 25 |  | Temperatur Modul 3 Sensor 1 | 25.6 |  °C |
| 26 |  | Temperatur Modul 3 Sensor 2 | 0.1 |  °C |
| 27 |  | Temperatur Modul 3 Sensor 2 | 25.6 |  °C |
| 28 |  | Temperatur Modul 3 Sensor 3 | 0.1 |  °C |
| 29 |  | Temperatur Modul 3 Sensor 3 | 25.6 |  °C |
| 30 |  | Temperatur Modul 3 Sensor 4 | 0.1 |  °C |
| 31 |  | Temperatur Modul 3 Sensor 4 | 25.6 |  °C |
| 32 |  | Temperatur Modul 3 Sensor 5 | 0.1 |  °C |
| 33 |  | Temperatur Modul 3 Sensor 5 | 25.6 |  °C |
| 34 |  | Temperatur Modul 3 Sensor 6 | 0.1 |  °C |
| 35 |  | Temperatur Modul 3 Sensor 6 | 25.6 |  °C |
| 36 |  | Temperatur Modul 4 Sensor 1 | 0.1 |  °C |
| 37 |  | Temperatur Modul 4 Sensor 1 | 25.6 |  °C |
| 38 |  | Temperatur Modul 4 Sensor 2 | 0.1 |  °C |
| 39 |  | Temperatur Modul 4 Sensor 2 | 25.6 |  °C |
| 40 |  | Temperatur Modul 4 Sensor 3 | 0.1 |  °C |
| 41 |  | Temperatur Modul 4 Sensor 3 | 25.6 |  °C |
| 42 |  | Temperatur Modul 4 Sensor 4 | 0.1 |  °C |
| 43 |  | Temperatur Modul 4 Sensor 4 | 25.6 |  °C |
| 44 |  | Temperatur Modul 4 Sensor 5 | 0.1 |  °C |
| 45 |  | Temperatur Modul 4 Sensor 5 | 25.6 |  °C |
| 46 |  | Temperatur Modul 4 Sensor 6 | 0.1 |  °C |
| 47 |  | Temperatur Modul 4 Sensor 6 | 25.6 |  °C |
| 48 |  | Temperatur Modul 5 Sensor 1 | 0.1 |  °C |
| 49 |  | Temperatur Modul 5 Sensor 1 | 25.6 |  °C |
| 50 |  | Temperatur Modul 5 Sensor 2 | 0.1 |  °C |
| 51 |  | Temperatur Modul 5 Sensor 2 | 25.6 |  °C |
| 52 |  | Temperatur Modul 5 Sensor 3 | 0.1 |  °C |
| 53 |  | Temperatur Modul 5 Sensor 3 | 25.6 |  °C |
| 54 |  | Temperatur Modul 5 Sensor 4 | 0.1 |  °C |
| 55 |  | Temperatur Modul 5 Sensor 4 | 25.6 |  °C |
| 56 |  | Temperatur Modul 5 Sensor 5 | 0.1 |  °C |
| 57 |  | Temperatur Modul 5 Sensor 5 | 25.6 |  °C |
| 58 |  | Temperatur Modul 5 Sensor 6 | 0.1 |  °C |
| 59 |  | Temperatur Modul 5 Sensor 6 | 25.6 |  °C |



### <a name="0010_7E20_0100"></a>DFA (0x0010) <= DeltaSol MX \[Heizkreis #0\] (0x7E20), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_7E30_0100"></a>DFA (0x0010) <= DeltaSol MX \[WMZ #0\] (0x7E30), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 8 |  | Wärmemenge heute | 1 |  Wh |
| 9 |  | Wärmemenge heute | 256 |  Wh |
| 10 |  | Wärmemenge heute | 65536 |  Wh |
| 11 |  | Wärmemenge heute | 16777216 |  Wh |
| 12 |  | Wärmemenge Woche | 1 |  Wh |
| 13 |  | Wärmemenge Woche | 256 |  Wh |
| 14 |  | Wärmemenge Woche | 65536 |  Wh |
| 15 |  | Wärmemenge Woche | 16777216 |  Wh |
| 16 |  | Gesamtvolumen | 1 |  l |
| 17 |  | Gesamtvolumen | 256 |  l |
| 18 |  | Gesamtvolumen | 65536 |  l |
| 19 |  | Gesamtvolumen | 16777216 |  l |



### <a name="0010_7F61_0100"></a>DFA (0x0010) <= IOC-Modul \[Messwerte\] (0x7F61), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | SekNr | 1 |  s |
| 1 |  | SekNr | 256 |  s |
| 2 |  | SekNr | 65536 |  s |
| 3 |  | SekNr | 16777216 |  s |
| 4 |  | T-Umgebung | 0.1 |  °C |
| 5 |  | T-Umgebung | 25.6 |  °C |
| 6 |  | T-Umgebung | 6553.6 |  °C |
| 7 |  | T-Umgebung | 1677721.6 |  °C |
| 8 |  | T-Vorlauf/S1 | 0.1 |  °C |
| 9 |  | T-Vorlauf/S1 | 25.6 |  °C |
| 10 |  | T-Vorlauf/S1 | 6553.6 |  °C |
| 11 |  | T-Vorlauf/S1 | 1677721.6 |  °C |
| 12 |  | T-Rücklauf/S2 | 0.1 |  °C |
| 13 |  | T-Rücklauf/S2 | 25.6 |  °C |
| 14 |  | T-Rücklauf/S2 | 6553.6 |  °C |
| 15 |  | T-Rücklauf/S2 | 1677721.6 |  °C |
| 16 |  | TSL | 0.1 |  °C |
| 17 |  | TSL | 25.6 |  °C |
| 18 |  | TSL | 6553.6 |  °C |
| 19 |  | TSL | 1677721.6 |  °C |
| 20 |  | Tmax-Temp_/S5 | 0.1 |  °C |
| 21 |  | Tmax-Temp_/S5 | 25.6 |  °C |
| 22 |  | Tmax-Temp_/S5 | 6553.6 |  °C |
| 23 |  | Tmax-Temp_/S5 | 1677721.6 |  °C |
| 24 |  | Einstrahlung | 0.1 |  W/m² |
| 25 |  | Einstrahlung | 25.6 |  W/m² |
| 26 |  | Einstrahlung | 6553.6 |  W/m² |
| 27 |  | Einstrahlung | 1677721.6 |  W/m² |
| 28 |  | Volumenstr_1 | 1 |  l/h |
| 29 |  | Volumenstr_1 | 256 |  l/h |
| 30 |  | Volumenstr_1 | 65536 |  l/h |
| 31 |  | Volumenstr_1 | 16777216 |  l/h |
| 32 |  | Volumenstr_2 | 1 |  l/h |
| 33 |  | Volumenstr_2 | 256 |  l/h |
| 34 |  | Volumenstr_2 | 65536 |  l/h |
| 35 |  | Volumenstr_2 | 16777216 |  l/h |
| 36 |  | S6 | 0.1 |  °C |
| 37 |  | S6 | 25.6 |  °C |
| 38 |  | S6 | 6553.6 |  °C |
| 39 |  | S6 | 1677721.6 |  °C |
| 40 |  | S7 | 0.1 |  °C |
| 41 |  | S7 | 25.6 |  °C |
| 42 |  | S7 | 6553.6 |  °C |
| 43 |  | S7 | 1677721.6 |  °C |
| 44 |  | Stromstärke 1 | 0.01 |  mA |
| 45 |  | Stromstärke 1 | 2.56 |  mA |
| 46 |  | Stromstärke 1 | 655.36 |  mA |
| 47 |  | Stromstärke 1 | 167772.16 |  mA |
| 48 |  | Stromstärke 2 | 0.01 |  mA |
| 49 |  | Stromstärke 2 | 2.56 |  mA |
| 50 |  | Stromstärke 2 | 655.36 |  mA |
| 51 |  | Stromstärke 2 | 167772.16 |  mA |
| 52 |  | Datum_Messdaten | 1 |  |
| 53 |  | Datum_Messdaten | 256 |  |
| 54 |  | Datum_Messdaten | 65536 |  |
| 55 |  | Datum_Messdaten | 16777216 |  |
| 56 |  | Wärmemenge 1 | 0.01 |  kWh |
| 57 |  | Wärmemenge 1 | 2.56 |  kWh |
| 58 |  | Wärmemenge 1 | 655.36 |  kWh |
| 59 |  | Wärmemenge 1 | 167772.16 |  kWh |
| 60 |  | Wärmemenge 2 | 0.01 |  kWh |
| 61 |  | Wärmemenge 2 | 2.56 |  kWh |
| 62 |  | Wärmemenge 2 | 655.36 |  kWh |
| 63 |  | Wärmemenge 2 | 167772.16 |  kWh |
| 64 |  | 5-Min-Fehlercode | 1 |  |
| 65 |  | 5-Min-Fehlercode | 256 |  |
| 66 |  | 5-Min-Fehlercode | 65536 |  |
| 67 |  | 5-Min-Fehlercode | 16777216 |  |
| 68 |  | Solarwärme | 1 |  Wh |
| 69 |  | Solarwärme | 256 |  Wh |
| 70 |  | Solarwärme | 1000 |  Wh |
| 71 |  | Solarwärme | 256000 |  Wh |
| 72 |  | Solarwärme | 1000000 |  Wh |
| 73 |  | Solarwärme | 256000000 |  Wh |
| 74 |  | Solarwärme | 1000000000 |  Wh |
| 75 |  | Solarwärme | 256000000000 |  Wh |



### <a name="0010_7F62_0100"></a>DFA (0x0010) <= IOC-Modul \[Tagesbilanz\] (0x7F62), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Datum | 1 |  |
| 1 |  | Datum | 256 |  |
| 2 |  | Datum | 65536 |  |
| 3 |  | Datum | 16777216 |  |
| 4 |  | H-Day | 0.01 |  kWh/\(m²*d\) |
| 5 |  | H-Day | 2.56 |  kWh/\(m²*d\) |
| 6 |  | H-Day | 655.36 |  kWh/\(m²*d\) |
| 7 |  | H-Day | 167772.16 |  kWh/\(m²*d\) |
| 8 |  | Q-mess | 0.001 |  kWh/\(m²*d\) |
| 9 |  | Q-mess | 0.256 |  kWh/\(m²*d\) |
| 10 |  | Q-mess | 65.536 |  kWh/\(m²*d\) |
| 11 |  | Q-mess | 16777.216 |  kWh/\(m²*d\) |
| 12 |  | Q-erw2 | 0.001 |  kWh/\(m²*d\) |
| 13 |  | Q-erw2 | 0.256 |  kWh/\(m²*d\) |
| 14 |  | Q-erw2 | 65.536 |  kWh/\(m²*d\) |
| 15 |  | Q-erw2 | 16777.216 |  kWh/\(m²*d\) |
| 16 |  | Q-erw | 0.001 |  kWh/\(m²*d\) |
| 17 |  | Q-erw | 0.256 |  kWh/\(m²*d\) |
| 18 |  | Q-erw | 65.536 |  kWh/\(m²*d\) |
| 19 |  | Q-erw | 16777.216 |  kWh/\(m²*d\) |
| 20 |  | Meldung | 1 |  |
| 21 |  | Meldung | 256 |  |
| 22 |  | Meldung | 65536 |  |
| 23 |  | Meldung | 16777216 |  |
| 24 |  | dt-mess | 0.01 |  h |
| 25 |  | dt-mess | 2.56 |  h |
| 26 |  | dt-mess | 655.36 |  h |
| 27 |  | dt-mess | 167772.16 |  h |
| 28 |  | dt-erw2 | 0.01 |  h |
| 29 |  | dt-erw2 | 2.56 |  h |
| 30 |  | dt-erw2 | 655.36 |  h |
| 31 |  | dt-erw2 | 167772.16 |  h |
| 32 |  | dt-erw | 0.01 |  h |
| 33 |  | dt-erw | 2.56 |  h |
| 34 |  | dt-erw | 655.36 |  h |
| 35 |  | dt-erw | 167772.16 |  h |
| 36 |  | Qutil-m | 0.01 |  kWh/\(m²*d\) |
| 37 |  | Qutil-m | 2.56 |  kWh/\(m²*d\) |
| 38 |  | Qutil-m | 655.36 |  kWh/\(m²*d\) |
| 39 |  | Qutil-m | 167772.16 |  kWh/\(m²*d\) |
| 40 |  | Qutil-e2 | 0.01 |  kWh/\(m²*d\) |
| 41 |  | Qutil-e2 | 2.56 |  kWh/\(m²*d\) |
| 42 |  | Qutil-e2 | 655.36 |  kWh/\(m²*d\) |
| 43 |  | Qutil-e2 | 167772.16 |  kWh/\(m²*d\) |
| 44 |  | Qutil-e | 0.01 |  kWh/\(m²*d\) |
| 45 |  | Qutil-e | 2.56 |  kWh/\(m²*d\) |
| 46 |  | Qutil-e | 655.36 |  kWh/\(m²*d\) |
| 47 |  | Qutil-e | 167772.16 |  kWh/\(m²*d\) |
| 48 |  | Qtv-e2 | 0.001 |  kWh/\(m²*d\) |
| 49 |  | Qtv-e2 | 0.256 |  kWh/\(m²*d\) |
| 50 |  | Qtv-e2 | 65.536 |  kWh/\(m²*d\) |
| 51 |  | Qtv-e2 | 16777.216 |  kWh/\(m²*d\) |
| 52 |  | Qtv-e | 0.001 |  kWh/\(m²*d\) |
| 53 |  | Qtv-e | 0.256 |  kWh/\(m²*d\) |
| 54 |  | Qtv-e | 65.536 |  kWh/\(m²*d\) |
| 55 |  | Qtv-e | 16777.216 |  kWh/\(m²*d\) |
| 56 |  | Qkv-e2 | 0.001 |  kWh/\(m²*d\) |
| 57 |  | Qkv-e2 | 0.256 |  kWh/\(m²*d\) |
| 58 |  | Qkv-e2 | 65.536 |  kWh/\(m²*d\) |
| 59 |  | Qkv-e2 | 16777.216 |  kWh/\(m²*d\) |
| 60 |  | Qkv-e | 0.001 |  kWh/\(m²*d\) |
| 61 |  | Qkv-e | 0.256 |  kWh/\(m²*d\) |
| 62 |  | Qkv-e | 65.536 |  kWh/\(m²*d\) |
| 63 |  | Qkv-e | 16777.216 |  kWh/\(m²*d\) |
| 64 |  | Qskv-e2 | 0.001 |  kWh/\(m²*d\) |
| 65 |  | Qskv-e2 | 0.256 |  kWh/\(m²*d\) |
| 66 |  | Qskv-e2 | 65.536 |  kWh/\(m²*d\) |
| 67 |  | Qskv-e2 | 16777.216 |  kWh/\(m²*d\) |
| 68 |  | Qskv-e | 0.001 |  kWh/\(m²*d\) |
| 69 |  | Qskv-e | 0.256 |  kWh/\(m²*d\) |
| 70 |  | Qskv-e | 65.536 |  kWh/\(m²*d\) |
| 71 |  | Qskv-e | 16777.216 |  kWh/\(m²*d\) |
| 72 |  | Tsoll-Day | 0.01 |  °C |
| 73 |  | Tsoll-Day | 2.56 |  °C |
| 74 |  | Tsoll-Day | 655.36 |  °C |
| 75 |  | Tsoll-Day | 167772.16 |  °C |



### <a name="0010_7F63_0100"></a>DFA (0x0010) <= IOC-Modul \[Entnahmekreis\] (0x7F63), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vlast-Day/Vol2 | 0.1 |  l/\(m²*d\) |
| 1 |  | Vlast-Day/Vol2 | 25.6 |  l/\(m²*d\) |
| 2 |  | Vlast-Day/Vol2 | 6553.6 |  l/\(m²*d\) |
| 3 |  | Vlast-Day/Vol2 | 1677721.6 |  l/\(m²*d\) |
| 4 |  | Qmess2 | 0.001 |  kWh/\(m²*d\) |
| 5 |  | Qmess2 | 0.256 |  kWh/\(m²*d\) |
| 6 |  | Qmess2 | 65.536 |  kWh/\(m²*d\) |
| 7 |  | Qmess2 | 16777.216 |  kWh/\(m²*d\) |
| 8 |  | Tagesfehlercode | 1 |  |
| 9 |  | Tagesfehlercode | 256 |  |
| 10 |  | Tagesfehlercode | 65536 |  |
| 11 |  | Tagesfehlercode | 16777216 |  |



### <a name="0010_7F64_0100"></a>DFA (0x0010) <= IOC-Modul \[Debug-Werte\] (0x7F64), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Tkol-erw | 0.1 |  °C |
| 1 |  | Tkol-erw | 25.6 |  °C |
| 2 |  | Tkol-erw | 6553.6 |  °C |
| 3 |  | Tkol-erw | 1677721.6 |  °C |
| 4 |  | Volumenstrom-erw | 1 |  l/h |
| 5 |  | Volumenstrom-erw | 256 |  l/h |
| 6 |  | Volumenstrom-erw | 65536 |  l/h |
| 7 |  | Volumenstrom-erw | 16777216 |  l/h |
| 8 |  | IAM | 1 | % |
| 9 |  | IAM | 256 | % |
| 10 |  | IAM | 65536 | % |
| 11 |  | IAM | 16777216 | % |
| 12 |  | Diffusstrahlung | 1 |  W/m² |
| 13 |  | Diffusstrahlung | 256 |  W/m² |
| 14 |  | Diffusstrahlung | 65536 |  W/m² |
| 15 |  | Diffusstrahlung | 16777216 |  W/m² |
| 16 |  | Einfallswinkel | 1 |  ° |
| 17 |  | Einfallswinkel | 256 |  ° |
| 18 |  | Einfallswinkel | 65536 |  ° |
| 19 |  | Einfallswinkel | 16777216 |  ° |



### <a name="0010_7F65_0100"></a>DFA (0x0010) <= IOC-Modul \[Messwerte_1s\] (0x7F65), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | T-Umgebung_1s | 0.1 |  °C |
| 1 |  | T-Umgebung_1s | 25.6 |  °C |
| 2 |  | T-Vorlauf/S1_1s | 0.1 |  °C |
| 3 |  | T-Vorlauf/S1_1s | 25.6 |  °C |
| 4 |  | T-Rücklauf/S2_1s | 0.1 |  °C |
| 5 |  | T-Rücklauf/S2_1s | 25.6 |  °C |
| 6 |  | TSL_1s | 0.1 |  °C |
| 7 |  | TSL_1s | 25.6 |  °C |
| 8 |  | Tmax-Temp_/S5_1s | 0.1 |  °C |
| 9 |  | Tmax-Temp_/S5_1s | 25.6 |  °C |
| 10 |  | Einstrahlung_1s | 0.1 |  W/m² |
| 11 |  | Einstrahlung_1s | 25.6 |  W/m² |
| 12 |  | Volumenstrom1_1s | 1 |  l/h |
| 13 |  | Volumenstrom1_1s | 256 |  l/h |
| 14 |  | Volumenstrom1_1s | 65536 |  l/h |
| 15 |  | Volumenstrom1_1s | 16777216 |  l/h |
| 16 |  | Volumenstrom2_1s | 1 |  l/h |
| 17 |  | Volumenstrom2_1s | 256 |  l/h |
| 18 |  | Volumenstrom2_1s | 65536 |  l/h |
| 19 |  | Volumenstrom2_1s | 16777216 |  l/h |
| 20 |  | S6_1s | 0.1 |  °C |
| 21 |  | S6_1s | 25.6 |  °C |
| 22 |  | S7_1s | 0.1 |  °C |
| 23 |  | S7_1s | 25.6 |  °C |
| 24 |  | Stromstärke1_1s | 0.01 |  mA |
| 25 |  | Stromstärke1_1s | 2.56 |  mA |
| 26 |  | Stromstärke2_1s | 0.01 |  mA |
| 27 |  | Stromstärke2_1s | 2.56 |  mA |
| 28 |  | Solarwärme_1s | 1 |  Wh |
| 29 |  | Solarwärme_1s | 256 |  Wh |
| 30 |  | Solarwärme_1s | 1000 |  Wh |
| 31 |  | Solarwärme_1s | 256000 |  Wh |
| 32 |  | Solarwärme_1s | 1000000 |  Wh |
| 33 |  | Solarwärme_1s | 256000000 |  Wh |
| 34 |  | Solarwärme_1s | 1000000000 |  Wh |
| 35 |  | Solarwärme_1s | 256000000000 |  Wh |
| 36 |  | Statusflag_1s | 1 |  |
| 37 |  | Statusflag_1s | 256 |  |
| 38 |  | Statusflag_1s | 65536 |  |
| 39 |  | Statusflag_1s | 16777216 |  |



### <a name="0010_7F71_0100"></a>DFA (0x0010) <= DeltaSol FCS (0x7F71), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 5 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 5 | 25.6 |  °C |
| 10 |  | Systemdruck | 0.01 |  bar |
| 11 |  | Systemdruck | 2.56 |  bar |
| 12 |  | Volumenstrom | 1 |  l/h |
| 13 |  | Volumenstrom | 256 |  l/h |
| 14 |  | Drehzahl Relais 1 | 1 | % |
| 15 |  | Systemmeldung | 1 |  |
| 16 |  | Leistung | 1 |  W |
| 17 |  | Leistung | 256 |  W |
| 18 |  | Leistung | 65536 |  W |
| 19 |  | Leistung | 16777216 |  W |
| 20 |  | Wärmemenge | 1 |  Wh |
| 21 |  | Wärmemenge | 256 |  Wh |
| 22 |  | Wärmemenge | 65536 |  Wh |
| 23 |  | Wärmemenge | 16777216 |  Wh |
| 24 |  | Datum | 1 |  |
| 25 |  | Datum | 256 |  |
| 26 |  | Datum | 65536 |  |
| 27 |  | Datum | 16777216 |  |
| 28 |  | Uhrzeit | 1 |  |
| 29 |  | Uhrzeit | 256 |  |
| 30 |  | Eff_Min-Drehzahl | 1 | % |
| 32 |  | Debug1 | 1 |  |
| 33 |  | Debug1 | 256 |  |
| 34 |  | Debug1 | 65536 |  |
| 35 |  | Debug1 | 16777216 |  |
| 36 |  | Debug2 | 1 |  |
| 37 |  | Debug2 | 256 |  |
| 38 |  | Debug2 | 65536 |  |
| 39 |  | Debug2 | 16777216 |  |
| 40 |  | Debug3 | 1 |  |
| 41 |  | Debug3 | 256 |  |
| 42 |  | Debug3 | 65536 |  |
| 43 |  | Debug3 | 16777216 |  |
| 44 |  | Debug4 | 1 |  |
| 45 |  | Debug4 | 256 |  |
| 46 |  | Debug4 | 65536 |  |
| 47 |  | Debug4 | 16777216 |  |
| 48 |  | Debug5 | 1 |  |
| 49 |  | Debug5 | 256 |  |
| 50 |  | Debug5 | 65536 |  |
| 51 |  | Debug5 | 16777216 |  |
| 52 |  | Einstrahlung | 1 |  W/m² |
| 53 |  | Einstrahlung | 256 |  W/m² |
| 54 |  | Zelltemperatur | 0.1 |  °C |
| 55 |  | Zelltemperatur | 25.6 |  °C |



### <a name="4420_0000_0200"></a>HKM1 #0 (0x4420) <= Broadcast (0x0000), command 0x0200

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 8 |  | Vorlaufmaximaltemperatur | 1 |  °C |
| 9 |  | HK-Kennlinie | 0.1 |  |
| 10 |  | Nachtabsenkung | 1 |  K |
| 11 |  | Tageskorrektur | 1 |  K |
| 12 |  | Mischerlaufzeit | 1 |  s |
| 13 |  | Sommerbetrieb | 1 |  °C |
| 14 |  | Info Schaltuhr | 1 |  |



### <a name="6510_0000_0200"></a>HKM2 (0x6510) <= Broadcast (0x0000), command 0x0200

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Steuerregister | 1 |  |
| 1 |  | Steuerregister | 256 |  |
| 8 |  | Vorlaufmaximaltemperatur | 1 |  °C |
| 9 |  | HK-Kennlinie | 0.1 |  |
| 10 |  | Nachtabsenkung | 1 |  K |
| 11 |  | Tageskorrektur | 1 |  K |
| 12 |  | Mischerlaufzeit | 1 |  s |
| 13 |  | Sommerbetrieb | 1 |  °C |
| 14 |  | Info Schaltuhr | 1 |  |
| 15 |  | Option Nachheizung | 1 |  |
| 16 |  | Speichertemperatur 1 \(Bus\) | 0.1 |  °C |
| 17 |  | Speichertemperatur 1 \(Bus\) | 25.6 |  °C |
| 18 |  | Aussentemperatur Bus | 0.1 |  °C |
| 19 |  | Aussentemperatur Bus | 25.6 |  °C |
| 20 |  | dT-NH-ein | 0.1 |  K |
| 21 |  | dT-NH-ein | 25.6 |  K |
| 22 |  | dT-NH-aus | 0.1 |  K |
| 23 |  | dT-NH-aus | 25.6 |  K |
| 24 |  | Speicherminimaltemperatur | 1 |  °C |
| 25 |  | Speicherkühltemperatur | 1 |  °C |
| 26 |  | Speicheranforderungstemperatur \(ein\) | 1 |  °C |
| 27 |  | Speicheranforderungstemperatur \(aus\) | 1 |  °C |
| 28 |  | WW-Anforderungstemperatur \(ein\) | 1 |  °C |
| 29 |  | WW-Anforderungstemperatur \(aus\) | 1 |  °C |
| 30 |  | Speichertemperatur 2 \(Bus\) | 0.1 |  °C |
| 31 |  | Speichertemperatur 2 \(Bus\) | 25.6 |  °C |



### <a name="6520_0000_0200"></a>MSR65 #0 (0x6520) <= Broadcast (0x0000), command 0x0200

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Drehzahl 1 R1 | 1 | % |
| 1 |  | Laufzeit 1 R1 | 1 |  s |
| 2 |  | Laufzeit 1 R1 | 256 |  s |
| 3 |  | Laufzeit 1 R1 | 65536 |  s |
| 4 |  | Drehzahl 2 R1 | 1 | % |
| 5 |  | Laufzeit 2 R1 | 1 |  s |
| 6 |  | Laufzeit 2 R1 | 256 |  s |
| 7 |  | Laufzeit 2 R1 | 65536 |  s |
| 8 |  | Drehzahl 1 R2 | 1 | % |
| 9 |  | Laufzeit 1 R2 | 1 |  s |
| 10 |  | Laufzeit 1 R2 | 256 |  s |
| 11 |  | Laufzeit 1 R2 | 65536 |  s |
| 12 |  | Drehzahl 2 R2 | 1 | % |
| 13 |  | Laufzeit 2 R2 | 1 |  s |
| 14 |  | Laufzeit 2 R2 | 256 |  s |
| 15 |  | Laufzeit 2 R2 | 65536 |  s |
| 16 |  | Drehzahl 1 R3 | 1 | % |
| 17 |  | Laufzeit 1 R3 | 1 |  s |
| 18 |  | Laufzeit 1 R3 | 256 |  s |
| 19 |  | Laufzeit 1 R3 | 65536 |  s |
| 20 |  | Drehzahl 2 R3 | 1 | % |
| 21 |  | Laufzeit 2 R3 | 1 |  s |
| 22 |  | Laufzeit 2 R3 | 256 |  s |
| 23 |  | Laufzeit 2 R3 | 65536 |  s |
| 24 |  | Drehzahl 1 R4 | 1 | % |
| 25 |  | Laufzeit 1 R4 | 1 |  s |
| 26 |  | Laufzeit 1 R4 | 256 |  s |
| 27 |  | Laufzeit 1 R4 | 65536 |  s |
| 28 |  | Drehzahl 2 R4 | 1 | % |
| 29 |  | Laufzeit 2 R4 | 1 |  s |
| 30 |  | Laufzeit 2 R4 | 256 |  s |
| 31 |  | Laufzeit 2 R4 | 65536 |  s |
| 32 |  | Drehzahl 1 R5 | 1 | % |
| 33 |  | Laufzeit 1 R5 | 1 |  s |
| 34 |  | Laufzeit 1 R5 | 256 |  s |
| 35 |  | Laufzeit 1 R5 | 65536 |  s |
| 36 |  | Drehzahl 2 R5 | 1 | % |
| 37 |  | Laufzeit 2 R5 | 1 |  s |
| 38 |  | Laufzeit 2 R5 | 256 |  s |
| 39 |  | Laufzeit 2 R5 | 65536 |  s |
| 40 |  | Offset Sensor 1 | 0.1 |  K |
| 41 |  | Offset Sensor 2 | 0.1 |  K |
| 42 |  | Offset Sensor 3 | 0.1 |  K |
| 43 |  | Offset Sensor 4 | 0.1 |  K |
| 44 |  | Offset Sensor 5 | 0.1 |  K |
| 45 |  | Offset Sensor 6 | 0.1 |  K |
| 46 |  | Sensormaske | 1 |  |
| 47 |  | Relaismaske | 1 |  |



### <a name="6650_0000_0200"></a>EM #0 (0x6650) <= Broadcast (0x0000), command 0x0200

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Drehzahl Relais 1_1 | 1 | % |
| 1 |  | Timer 1_1 | 1 |  s |
| 2 |  | Timer 1_1 | 256 |  s |
| 3 |  | Timer 1_1 | 65536 |  s |
| 4 |  | Drehzahl Relais 1_2 | 1 | % |
| 5 |  | Timer 1_2 | 1 |  s |
| 6 |  | Timer 1_2 | 256 |  s |
| 7 |  | Timer 1_2 | 65536 |  s |
| 8 |  | Drehzahl Relais 2_1 | 1 | % |
| 9 |  | Timer 2_1 | 1 |  s |
| 10 |  | Timer 2_1 | 256 |  s |
| 11 |  | Timer 2_1 | 65536 |  s |
| 12 |  | Drehzahl Relais 2_2 | 1 | % |
| 13 |  | Timer 2_2 | 1 |  s |
| 14 |  | Timer 2_2 | 256 |  s |
| 15 |  | Timer 2_2 | 65536 |  s |
| 16 |  | Drehzahl Relais 3_1 | 1 | % |
| 17 |  | Timer 3_1 | 1 |  s |
| 18 |  | Timer 3_1 | 256 |  s |
| 19 |  | Timer 3_1 | 65536 |  s |
| 20 |  | Drehzahl Relais 3_2 | 1 | % |
| 21 |  | Timer 3_2 | 1 |  s |
| 22 |  | Timer 3_2 | 256 |  s |
| 23 |  | Timer 3_2 | 65536 |  s |
| 24 |  | Drehzahl Relais 4_1 | 1 | % |
| 25 |  | Timer 4_1 | 1 |  s |
| 26 |  | Timer 4_1 | 256 |  s |
| 27 |  | Timer 4_1 | 65536 |  s |
| 28 |  | Drehzahl Relais 4_2 | 1 | % |
| 29 |  | Timer 4_2 | 1 |  s |
| 30 |  | Timer 4_2 | 256 |  s |
| 31 |  | Timer 4_2 | 65536 |  s |
| 32 |  | Drehzahl Relais 5_1 | 1 | % |
| 33 |  | Timer 5_1 | 1 |  s |
| 34 |  | Timer 5_1 | 256 |  s |
| 35 |  | Timer 5_1 | 65536 |  s |
| 36 |  | Drehzahl Relais 5_2 | 1 | % |
| 37 |  | Timer 5_2 | 1 |  s |
| 38 |  | Timer 5_2 | 256 |  s |
| 39 |  | Timer 5_2 | 65536 |  s |
| 40 |  | SensorOutputType1 | 1 |  |
| 41 |  | SensorOutputType2 | 1 |  |
| 42 |  | SensorOutputType3 | 1 |  |
| 43 |  | SensorOutputType4 | 1 |  |
| 44 |  | SensorOutputType5 | 1 |  |
| 45 |  | SensorOutputType6 | 1 |  |



