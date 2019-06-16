---
layout: docs
title: VBus Packets
---



## Table of Contents

- [Any destination <= WMZ (0x4010 - 0x401F), command 0x0100](#0000_4010_0100)
- [Any destination <= HKM1 (0x4420 - 0x442F), command 0x0100](#0000_4420_0100)
- [Any destination <= HKM2 (0x6510 - 0x651F), command 0x0100](#0000_6510_0100)
- [Any destination <= MSR65 (0x6520 - 0x652F), command 0x0100](#0000_6520_0100)
- [Any destination <= EM (0x6650 - 0x665F), command 0x0100](#0000_6650_0100)
- [DFA (0x0010) <= DL3 (0x0053), command 0x0100](#0010_0053_0100)
- [DFA (0x0010) <= DeltaSol SLT \[Regler\] (0x1001), command 0x0100](#0010_1001_0100)
- [DFA (0x0010) <= DeltaSol SLT \[WMZ\] (0x1010 - 0x101F), command 0x0100](#0010_1010_0100)
- [DFA (0x0010) <= Noventec Übergabestation \[Regler\] (0x1020), command 0x0100](#0010_1020_0100)
- [DFA (0x0010) <= DeltaSol E V2 HK 1 Estrichtrockung \[Modul 1\] (0x1040 - 0x104F), command 0x0100](#0010_1040_0100)
- [DFA (0x0010) <= DeltaSol E V2 \[Regler\] (0x1050), command 0x0100](#0010_1050_0100)
- [DFA (0x0010) <= DeltaSol E V2 \[WMZ\] (0x1051), command 0x0100](#0010_1051_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[Regler\] (0x1052), command 0x0100](#0010_1052_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[Module\] (0x1053), command 0x0100](#0010_1053_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[Heizkreis 1\] (0x1054), command 0x0100](#0010_1054_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[Heizkreis 2\] (0x1055), command 0x0100](#0010_1055_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[WMZ 1\] (0x1056), command 0x0100](#0010_1056_0100)
- [DFA (0x0010) <= Kioto BX Plus V2 \[WMZ 2\] (0x1057), command 0x0100](#0010_1057_0100)
- [DFA (0x0010) <= Caleffi Biomassa (0x1058), command 0x0100](#0010_1058_0100)
- [DFA (0x0010) <= DeltaTherm HC mini \[Regler\] (0x1059), command 0x0100](#0010_1059_0100)
- [DFA (0x0010) <= Remeha RemaCal (0x105A), command 0x0100](#0010_105A_0100)
- [DFA (0x0010) <= Atlantic SOLERIO V3 (0x105B), command 0x0100](#0010_105B_0100)
- [DFA (0x0010) <= DeDietrich Sol Plus ER 709 (0x105D), command 0x0100](#0010_105D_0100)
- [DFA (0x0010) <= Caleffi WP (0x105E), command 0x0100](#0010_105E_0100)
- [DFA (0x0010) <= Tuxhorn BHKW (0x105F), command 0x0100](#0010_105F_0100)
- [DFA (0x0010) <= Vitosolic 200 \[Regler\] (0x1060), command 0x0100](#0010_1060_0100)
- [DFA (0x0010) <= Vitosolic 200 \[WMZ 1\] (0x1065 - 0x1067), command 0x0100](#0010_1064_0100)
- [DFA (0x0010) <= DeltaSol MX - SorTech - eCoo \[Regler\] (0x1100), command 0x0100](#0010_1100_0100)
- [DFA (0x0010) <= Kioto Laderegler (0x1117), command 0x0100](#0010_1117_0100)
- [DFA (0x0010) <= Sol Plus SL (0x1119), command 0x0100](#0010_1119_0100)
- [DFA (0x0010) <= DeltaTherm PV (0x111E), command 0x0100](#0010_111E_0100)
- [DFA (0x0010) <= ETHERM (0x111F), command 0x0100](#0010_111F_0100)
- [DFA (0x0010) <= DeltaSol AL-E (0x1120), command 0x0100](#0010_1120_0100)
- [DFA (0x0010) <= DeltaSol CS2 (0x1121), command 0x0100](#0010_1121_0100)
- [DFA (0x0010) <= DeltaSol CS4 (0x1122), command 0x0100](#0010_1122_0100)
- [DFA (0x0010) <= ETHERM 2 (0x1123), command 0x0100](#0010_1123_0100)
- [DFA (0x0010) <= DeltaSol AL E HE (0x1127), command 0x0100](#0010_1127_0100)
- [DFA (0x0010) <= DeltaTherm HC mini \[Heizkreis 1\] (0x1140), command 0x0100](#0010_1140_0100)
- [DFA (0x0010) <= Kioto FWS (0x1150), command 0x0100](#0010_1150_0100)
- [DFA (0x0010) <= MFR \[Regler\] (0x1160), command 0x0100](#0010_1160_0100)
- [DFA (0x0010) <= MFR \[Module\] (0x1161), command 0x0100](#0010_1161_0100)
- [DFA (0x0010) <= MFR \[Frischwasser\] (0x1162), command 0x0100](#0010_1162_0100)
- [DFA (0x0010) <= MFR \[WMZ\] (0x1200 - 0x120F), command 0x0100](#0010_1200_0100)
- [DFA (0x0010) <= MFR \[Heizkreis\] (0x1210 - 0x121F), command 0x0100](#0010_1210_0100)
- [DFA (0x0010) <= Regudis H-HT \[Übergabestation\] (0x1220 - 0x122F), command 0x0100](#0010_1220_0100)
- [DFA (0x0010) <= Regudis H-HT \[BW-Erwärmung\] (0x1230 - 0x123F), command 0x0100](#0010_1230_0100)
- [DFA (0x0010) <= Wagner Sungo 100 \[Regler\] (0x1240), command 0x0100](#0010_1240_0100)
- [DFA (0x0010) <= Wagner Sungo 100 \[WMZ1\] (0x1241), command 0x0100](#0010_1241_0100)
- [DFA (0x0010) <= Viessmann Vitotrans 353 2017 (0x1250), command 0x0100](#0010_1250_0100)
- [DFA (0x0010) <= Viessmann Vitotrans 353 2017 Broadcast (0x1260), command 0x0100](#0010_1260_0100)
- [DFA (0x0010) <= THERMUfloor ER (0x1410), command 0x0100](#0010_1410_0100)
- [DFA (0x0010) <= Apricus DeltaSol AL E HE (0x1420), command 0x0100](#0010_1420_0100)
- [DFA (0x0010) <= DeltaSol Fresh 2018 (0x1510), command 0x0100](#0010_1510_0100)
- [DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0100](#0010_1711_0100)
- [DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0101](#0010_1711_0101)
- [DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0140](#0010_1711_0140)
- [DFA (0x0010) <= DeltaTherm HC max \[Heizkreis\] (0x1720 - 0x172F), command 0x0100](#0010_1720_0100)
- [DFA (0x0010) <= DeltaTherm HC max \[WMZ\] (0x1730 - 0x173F), command 0x0100](#0010_1730_0100)
- [DFA (0x0010) <= DeltaTherm HC max \[Modul\] (0x1740 - 0x174F), command 0x0100](#0010_1740_0100)
- [DFA (0x0010) <= DeltaSol CS Plus (0x2211), command 0x0100](#0010_2211_0100)
- [DFA (0x0010) <= DeltaSol CS Plus 2.x (0x2213), command 0x0100](#0010_2213_0100)
- [DFA (0x0010) <= Oranier HK \[Regler\] (0x2231), command 0x0100](#0010_2231_0100)
- [DFA (0x0010) <= Oranier HK \[WMZ1\] (0x2232), command 0x0100](#0010_2232_0100)
- [DFA (0x0010) <= Frischwasserregler (0x2241), command 0x0100](#0010_2241_0100)
- [DFA (0x0010) <= DeltaSol SL \[Regler\] (0x2251), command 0x0100](#0010_2251_0100)
- [DFA (0x0010) <= DeltaSol SL \[WMZ1\] (0x2252), command 0x0100](#0010_2252_0100)
- [DFA (0x0010) <= HR Solar BASIC controller \[Regler\] (0x2261), command 0x0100](#0010_2261_0100)
- [DFA (0x0010) <= HR Solar BASIC controller \[WMZ 1\] (0x2262), command 0x0100](#0010_2262_0100)
- [DFA (0x0010) <= DeltaSol SLL \[Regler\] (0x2271), command 0x0100](#0010_2271_0100)
- [DFA (0x0010) <= DeltaSol SLL \[WMZ1\] (0x2272), command 0x0100](#0010_2272_0100)
- [DFA (0x0010) <= HR Solar ADVANCED controller \[Regler\] (0x2360), command 0x0100](#0010_2360_0100)
- [DFA (0x0010) <= HR Solar ADVANCED controller \[WMZ 1\] (0x2362), command 0x0100](#0010_2362_0100)
- [DFA (0x0010) <= WMZ-L10 (0x3011), command 0x0100](#0010_3011_0100)
- [DFA (0x0010) <= Remeha RemaSol A (0x3112), command 0x0100](#0010_3112_0100)
- [DFA (0x0010) <= DeDietrich Diemasol Ai v2 (0x3113), command 0x0100](#0010_3113_0100)
- [DFA (0x0010) <= DeDietrich Sol Plus Trio (0x3114), command 0x0100](#0010_3114_0100)
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
- [DFA (0x0010) <= SKSC2 HE \[Regler\] (0x4213), command 0x0100](#0010_4213_0100)
- [DFA (0x0010) <= SKSC2 HE \[Regler\] (0x4214), command 0x0100](#0010_4214_0100)
- [DFA (0x0010) <= DeltaSol BS Plus (0x4221), command 0x0100](#0010_4221_0100)
- [DFA (0x0010) <= DeltaSol BS Plus BTU (0x4223), command 0x0100](#0010_4223_0100)
- [DFA (0x0010) <= CS2.2 (0x4224), command 0x0100](#0010_4224_0100)
- [DFA (0x0010) <= Frista (0x4231), command 0x0100](#0010_4231_0100)
- [DFA (0x0010) <= Huber - REGLOfresh / Felix \[Regler\] (0x4241), command 0x0100](#0010_4241_0100)
- [DFA (0x0010) <= DSPlus UMSYS \[Regler\] (0x4251), command 0x0100](#0010_4251_0100)
- [DFA (0x0010) <= BS Solex US (0x4252), command 0x0100](#0010_4252_0100)
- [DFA (0x0010) <= DeltaSol E SorTech \[Regler\] (0x4261), command 0x0100](#0010_4261_0100)
- [DFA (0x0010) <= Aton DeltaSol BS (0x4265), command 0x0100](#0010_4265_0100)
- [DFA (0x0010) <= DeltaSol BS/DrainBack (0x4278), command 0x0100](#0010_4278_0100)
- [DFA (0x0010) <= DeltaSol BS/DrainBack \(Fahrenheit\) (0x4279), command 0x0100](#0010_4279_0100)
- [DFA (0x0010) <= DeltaSol BS 2009 (0x427B), command 0x0100](#0010_427B_0100)
- [DFA (0x0010) <= DeDietrich DrainBack (0x4311), command 0x0100](#0010_4311_0100)
- [DFA (0x0010) <= DeltaSol MiniPool (0x4321), command 0x0100](#0010_4321_0100)
- [DFA (0x0010) <= DeltaSol BS/2 HE (0x4720), command 0x0100](#0010_4720_0100)
- [DFA (0x0010) <= DeltaSol BS/2 HE \[WMZ\] (0x4721), command 0x0100](#0010_4721_0100)
- [DFA (0x0010) <= DeltaSol BS/4 HE (0x4730), command 0x0100](#0010_4730_0100)
- [DFA (0x0010) <= DeltaSol BS/4 HE \[WMZ\] (0x4731), command 0x0100](#0010_4731_0100)
- [DFA (0x0010) <= Drainback DeDietrich (0x4A00), command 0x0100](#0010_4A00_0100)
- [DFA (0x0010) <= DeltaSol D (0x5111), command 0x0100](#0010_5111_0100)
- [DFA (0x0010) <= Speicherofenregler (0x5112), command 0x0100](#0010_5112_0100)
- [DFA (0x0010) <= FriwaMini (0x5121), command 0x0100](#0010_5121_0100)
- [DFA (0x0010) <= Tuxhorn PKE (0x5141), command 0x0100](#0010_5141_0100)
- [DFA (0x0010) <= DeltaSol Plus (0x5210), command 0x0100](#0010_5210_0100)
- [DFA (0x0010) <= DT4 \(MS\) (0x5221), command 0x0100](#0010_5221_0100)
- [DFA (0x0010) <= nemux (0x5231), command 0x0100](#0010_5231_0100)
- [DFA (0x0010) <= Frischwasserregler (0x5251), command 0x0100](#0010_5251_0100)
- [DFA (0x0010) <= X-Control (0x5311), command 0x0100](#0010_5311_0100)
- [DFA (0x0010) <= Frischwasserregler (0x5351), command 0x0100](#0010_5351_0100)
- [DFA (0x0010) <= DeltaTherm HC \[Regler\] (0x5400), command 0x0100](#0010_5400_0100)
- [DFA (0x0010) <= DeltaTherm HC \[Heizkreis\] (0x5410 - 0x541F), command 0x0100](#0010_5410_0100)
- [DFA (0x0010) <= DeltaTherm HC \[WMZ\] (0x5420 - 0x542F), command 0x0100](#0010_5420_0100)
- [DFA (0x0010) <= DeltaTherm HC \[Modul\] (0x5430 - 0x543F), command 0x0100](#0010_5430_0100)
- [DFA (0x0010) <= EL2/3 (0x5510), command 0x0100](#0010_5510_0100)
- [DFA (0x0010) <= DeltaTherm FK (0x5611), command 0x0100](#0010_5611_0100)
- [DFA (0x0010) <= Midi Pro (0x6610), command 0x0100](#0010_6610_0100)
- [DFA (0x0010) <= SunGo XL (0x6620), command 0x0100](#0010_6620_0100)
- [DFA (0x0010) <= DeltaSol BX WMZ (0x7101), command 0x0100](#0010_7101_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[Regler\] (0x7112), command 0x0100](#0010_7112_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[Regler\] (0x7112), command 0x0140](#0010_7112_0140)
- [DFA (0x0010) <= DeltaSol BX Plus \[Module\] (0x7113), command 0x0100](#0010_7113_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[Heizkreis\] (0x7120 - 0x712F), command 0x0100](#0010_7120_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[WMZ\] (0x7130 - 0x713F), command 0x0100](#0010_7130_0100)
- [DFA (0x0010) <= DeltaSol BX Pro \[Regler\] (0x7140), command 0x0100](#0010_7140_0100)
- [DFA (0x0010) <= DeltaSol BX Pro \[WMZ\] (0x7150 - 0x715F), command 0x0100](#0010_7150_0100)
- [DFA (0x0010) <= SKSC3HE (0x7160), command 0x0100](#0010_7160_0100)
- [DFA (0x0010) <= SKSC3HE \[HK1\] (0x7161), command 0x0100](#0010_7161_0100)
- [DFA (0x0010) <= SKSC3HE \[HK2\] (0x7162), command 0x0100](#0010_7162_0100)
- [DFA (0x0010) <= SKSC3HE \[HK3\] (0x7163), command 0x0100](#0010_7163_0100)
- [DFA (0x0010) <= DeltaSol BX Plus V2A \[Regler\] (0x7176), command 0x0100](#0010_7176_0100)
- [DFA (0x0010) <= DeltaSol BX Plus V2A \[Module\] (0x7177), command 0x0100](#0010_7177_0100)
- [DFA (0x0010) <= DeltaSol BX Plus V2A \[Heizkreis 1\] (0x7178), command 0x0100](#0010_7178_0100)
- [DFA (0x0010) <= DeltaSol BX Plus V2A \[Heizkreis 2\] (0x7179), command 0x0100](#0010_7179_0100)
- [DFA (0x0010) <= DeltaSol BX Plus V2A \[WMZ 1\] (0x717A), command 0x0100](#0010_717A_0100)
- [DFA (0x0010) <= DeltaSol BX Plus V2A \[WMZ 2\] (0x717B), command 0x0100](#0010_717B_0100)
- [DFA (0x0010) <= SKSR 1/2/3 (0x7210), command 0x0100](#0010_7210_0100)
- [DFA (0x0010) <= SKSC3 \[HK1\] (0x7211), command 0x0100](#0010_7211_0100)
- [DFA (0x0010) <= SKSC3 \[HK2\] (0x7212), command 0x0100](#0010_7212_0100)
- [DFA (0x0010) <= SKSC3 \[HK3\] (0x7213), command 0x0100](#0010_7213_0100)
- [DFA (0x0010) <= DrainBloC (0x7221), command 0x0100](#0010_7221_0100)
- [DFA (0x0010) <= SC25 (0x7231), command 0x0100](#0010_7231_0100)
- [DFA (0x0010) <= DeltaSol M \[Regler\] (0x7311), command 0x0100](#0010_7311_0100)
- [DFA (0x0010) <= DeltaSol M \[HK1\] (0x7312 - 0x7313), command 0x0100](#0010_7312_0100)
- [DFA (0x0010) <= DeltaSol M \[Volumen\] (0x7315), command 0x0100](#0010_7315_0100)
- [DFA (0x0010) <= DeltaSol M \[WMZ1\] (0x7316 - 0x7317), command 0x0100](#0010_7316_0100)
- [DFA (0x0010) <= Vitosolic 200 \[Regler\] (0x7321), command 0x0100](#0010_7321_0100)
- [DFA (0x0010) <= Vitosolic 200 \[WMZ1\] (0x7326 - 0x7327), command 0x0100](#0010_7326_0100)
- [DFA (0x0010) <= SLR (0x7331), command 0x0100](#0010_7331_0100)
- [DFA (0x0010) <= SLR-Erweiterungsmodul (0x7332), command 0x0100](#0010_7332_0100)
- [DFA (0x0010) <= SLR-Erweiterungsmodul (0x7333), command 0x0100](#0010_7333_0100)
- [DFA (0x0010) <= SLR-Erweiterungsmodul (0x7334), command 0x0100](#0010_7334_0100)
- [DFA (0x0010) <= SLR-Erweiterungsmodul (0x7335), command 0x0100](#0010_7335_0100)
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
- [DFA (0x0010) <= Oventrop RQ-B / RQ-B HE (0x7521), command 0x0100](#0010_7521_0100)
- [DFA (0x0010) <= Regtronic RX-B \[Regler\] (0x7522), command 0x0100](#0010_7522_0100)
- [DFA (0x0010) <= Regtronic RX-B \[Module\] (0x7523), command 0x0100](#0010_7523_0100)
- [DFA (0x0010) <= Regtronic RX-B \[WMZ\] (0x7530 - 0x753F), command 0x0100](#0010_7530_0100)
- [DFA (0x0010) <= Oventrop RQ XXL (0x7541), command 0x0100](#0010_7541_0100)
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
- [DFA (0x0010) <= COSMO Multi HK 1 Estrichtrockung \[Modul 1\] (0x7831 - 0x783F), command 0x0100](#0010_7830_0100)
- [DFA (0x0010) <= COSMO UNO (0x7840), command 0x0100](#0010_7840_0100)
- [DFA (0x0010) <= COSMO UNO \[WMZ1\] (0x7841), command 0x0100](#0010_7841_0100)
- [DFA (0x0010) <= PAW SOLEX SC5.14 \[Regler\] (0x7910), command 0x0100](#0010_7910_0100)
- [DFA (0x0010) <= PAW SOLEX SC5.14 \[Module\] (0x7911), command 0x0100](#0010_7911_0100)
- [DFA (0x0010) <= PAW SOLEX SC5.14 \[Heizkreis\] (0x7920 - 0x792F), command 0x0100](#0010_7920_0100)
- [DFA (0x0010) <= PAW SOLEX SC5.14 \[WMZ\] (0x7930 - 0x793F), command 0x0100](#0010_7930_0100)
- [DFA (0x0010) <= FRISTA-mix (0x7D04), command 0x0100](#0010_7D04_0100)
- [DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0100](#0010_7E11_0100)
- [DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0101](#0010_7E11_0101)
- [DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0140](#0010_7E11_0140)
- [DFA (0x0010) <= DeltaSol MX \[Module\] (0x7E12), command 0x0100](#0010_7E12_0100)
- [DFA (0x0010) <= DeltaSol MX \[Heizkreis\] (0x7E20 - 0x7E2F), command 0x0100](#0010_7E20_0100)
- [DFA (0x0010) <= DeltaSol MX \[WMZ\] (0x7E30 - 0x7E3F), command 0x0100](#0010_7E30_0100)
- [DFA (0x0010) <= DeltaSol MX \[Modul\] (0x7E40 - 0x7E4F), command 0x0100](#0010_7E40_0100)
- [DFA (0x0010) <= DeltaSol BX Plus \[Modul\] (0x7E60 - 0x7E6F), command 0x0100](#0010_7E60_0100)
- [DFA (0x0010) <= IOC-Modul \[Messwerte\] (0x7F61), command 0x0100](#0010_7F61_0100)
- [DFA (0x0010) <= IOC-Modul \[Tagesbilanz\] (0x7F62), command 0x0100](#0010_7F62_0100)
- [DFA (0x0010) <= IOC-Modul \[Entnahmekreis\] (0x7F63), command 0x0100](#0010_7F63_0100)
- [DFA (0x0010) <= IOC-Modul \[Debug-Werte\] (0x7F64), command 0x0100](#0010_7F64_0100)
- [DFA (0x0010) <= IOC-Modul \[Messwerte_1s\] (0x7F65), command 0x0100](#0010_7F65_0100)
- [DFA (0x0010) <= DeltaSol FCS (0x7F71), command 0x0100](#0010_7F71_0100)
- [Standard-Infos (0x0015) <= Tuxhorn BHKW (0x105F), command 0x0100](#0015_105F_0100)
- [Viessmann Vitotrans 353 2017 Broadcast (0x1260) <= Viessmann Vitotrans 353 2017 Broadcast (0x1260 - 0x126F), command 0x0101](#1260_1260_0101)
- [Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301](#1261_1261_0301)
- [Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301](#1261_1262_0301)
- [Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301](#1261_1263_0301)
- [Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301](#1261_1264_0301)
- [Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301](#1262_1261_0301)
- [Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301](#1262_1262_0301)
- [Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301](#1262_1263_0301)
- [Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301](#1262_1264_0301)
- [Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301](#1263_1261_0301)
- [Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301](#1263_1262_0301)
- [Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301](#1263_1263_0301)
- [Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301](#1263_1264_0301)
- [Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301](#1264_1261_0301)
- [Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301](#1264_1262_0301)
- [Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301](#1264_1263_0301)
- [Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301](#1264_1264_0301)
- [DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0222](#1520_1521_0222)
- [DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0333](#1520_1521_0333)
- [DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0222](#1520_1522_0222)
- [DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0333](#1520_1522_0333)
- [DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0222](#1520_1523_0222)
- [DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0333](#1520_1523_0333)
- [DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0222](#1520_1524_0222)
- [DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0333](#1520_1524_0333)
- [DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112](#1521_1521_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112](#1521_1522_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112](#1521_1523_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112](#1521_1524_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112](#1522_1521_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112](#1522_1522_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112](#1522_1523_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112](#1522_1524_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112](#1523_1521_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112](#1523_1522_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112](#1523_1523_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112](#1523_1524_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112](#1524_1521_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112](#1524_1522_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112](#1524_1523_0112)
- [DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112](#1524_1524_0112)
- [HKM1 (0x4420 - 0x442F) <= any source, command 0x0200](#4420_0000_0200)
- [Kaskade BasisAdr (0x5260) <= Kaskade BasisAdr (0x5260 - 0x526F), command 0x0102](#5260_5260_0102)
- [Kaskade Master (0x5261) <= Kaskade BasisAdr (0x5260 - 0x526F), command 0x0301](#5261_5260_0301)
- [PAW Kaskade BasisAdr (0x5360) <= PAW Kaskade BasisAdr (0x5360 - 0x536F), command 0x0102](#5360_5360_0102)
- [PAW Kaskade Master (0x5361) <= PAW Kaskade BasisAdr (0x5360 - 0x536F), command 0x0301](#5361_5360_0301)
- [HKM2 (0x6510 - 0x651F) <= any source, command 0x0200](#6510_0000_0200)
- [MSR65 (0x6520 - 0x652F) <= any source, command 0x0200](#6520_0000_0200)
- [EM (0x6650 - 0x665F) <= any source, command 0x0200](#6650_0000_0200)



## Known device addresses

| Address | Mask | Name |
|:-:|:-:|:--|
| 0x0000 | Broadcast |
| 0x0010 | DFA |
| 0x0015 | Standard-Infos |
| 0x0020 | Computer |
| 0x0040 | SD3 / GAx |
| 0x0050 | DL2 |
| 0x0053 | DL3 |
| 0x1001 | DeltaSol SLT \[Regler\] |
| 0x1010 | DeltaSol SLT \[WMZ #0\] |
| 0x1011 | DeltaSol SLT \[WMZ #1\] |
| 0x1012 | DeltaSol SLT \[WMZ #2\] |
| 0x1013 | DeltaSol SLT \[WMZ #3\] |
| 0x1014 | DeltaSol SLT \[WMZ #4\] |
| 0x1015 | DeltaSol SLT \[WMZ #5\] |
| 0x1016 | DeltaSol SLT \[WMZ #6\] |
| 0x1017 | DeltaSol SLT \[WMZ #7\] |
| 0x1018 | DeltaSol SLT \[WMZ #8\] |
| 0x1019 | DeltaSol SLT \[WMZ #9\] |
| 0x101A | DeltaSol SLT \[WMZ #10\] |
| 0x101B | DeltaSol SLT \[WMZ #11\] |
| 0x101C | DeltaSol SLT \[WMZ #12\] |
| 0x101D | DeltaSol SLT \[WMZ #13\] |
| 0x101E | DeltaSol SLT \[WMZ #14\] |
| 0x101F | DeltaSol SLT \[WMZ #15\] |
| 0x1020 | Noventec Übergabestation \[Regler\] |
| 0x1040 | DeltaSol E V2 HK 1 Estrichtrockung \[Modul 1\] |
| 0x1041 | DeltaSol E V2 HK 2 Estrichtrockung \[Modul 2\] |
| 0x1042 | DeltaSol E V2 HK 3 Estrichtrockung \[Modul 3\] |
| 0x1043 | DeltaSol E V2 HK Estrichtrockung \[Lokal\] |
| 0x1050 | DeltaSol E V2 \[Regler\] |
| 0x1051 | DeltaSol E V2 \[WMZ\] |
| 0x1052 | Kioto BX Plus V2 \[Regler\] |
| 0x1053 | Kioto BX Plus V2 \[Module\] |
| 0x1054 | Kioto BX Plus V2 \[Heizkreis 1\] |
| 0x1055 | Kioto BX Plus V2 \[Heizkreis 2\] |
| 0x1056 | Kioto BX Plus V2 \[WMZ 1\] |
| 0x1057 | Kioto BX Plus V2 \[WMZ 2\] |
| 0x1058 | Caleffi Biomassa |
| 0x1059 | DeltaTherm HC mini \[Regler\] |
| 0x105A | Remeha RemaCal |
| 0x105B | Atlantic SOLERIO V3 |
| 0x105D | DeDietrich Sol Plus ER 709 |
| 0x105E | Caleffi WP |
| 0x105F | Tuxhorn BHKW |
| 0x1060 | Vitosolic 200 \[Regler\] |
| 0x1065 | Vitosolic 200 \[WMZ 1\] |
| 0x1066 | Vitosolic 200 \[WMZ 2\] |
| 0x1100 | DeltaSol MX - SorTech - eCoo \[Regler\] |
| 0x1111 | EC1 |
| 0x1117 | Kioto Laderegler |
| 0x1119 | Sol Plus SL |
| 0x111E | DeltaTherm PV |
| 0x111F | ETHERM |
| 0x1120 | DeltaSol AL-E |
| 0x1121 | DeltaSol CS2 |
| 0x1122 | DeltaSol CS4 |
| 0x1123 | ETHERM 2 |
| 0x1127 | DeltaSol AL E HE |
| 0x1140 | DeltaTherm HC mini \[Heizkreis 1\] |
| 0x1150 | Kioto FWS |
| 0x1160 | MFR \[Regler\] |
| 0x1161 | MFR \[Module\] |
| 0x1162 | MFR \[Frischwasser\] |
| 0x1200 | MFR \[WMZ #0\] |
| 0x1201 | MFR \[WMZ #1\] |
| 0x1202 | MFR \[WMZ #2\] |
| 0x1203 | MFR \[WMZ #3\] |
| 0x1204 | MFR \[WMZ #4\] |
| 0x1205 | MFR \[WMZ #5\] |
| 0x1206 | MFR \[WMZ #6\] |
| 0x1207 | MFR \[WMZ #7\] |
| 0x1208 | MFR \[WMZ #8\] |
| 0x1209 | MFR \[WMZ #9\] |
| 0x120A | MFR \[WMZ #10\] |
| 0x120B | MFR \[WMZ #11\] |
| 0x120C | MFR \[WMZ #12\] |
| 0x120D | MFR \[WMZ #13\] |
| 0x120E | MFR \[WMZ #14\] |
| 0x120F | MFR \[WMZ #15\] |
| 0x1210 | MFR \[Heizkreis #0\] |
| 0x1211 | MFR \[Heizkreis #1\] |
| 0x1212 | MFR \[Heizkreis #2\] |
| 0x1213 | MFR \[Heizkreis #3\] |
| 0x1214 | MFR \[Heizkreis #4\] |
| 0x1215 | MFR \[Heizkreis #5\] |
| 0x1216 | MFR \[Heizkreis #6\] |
| 0x1217 | MFR \[Heizkreis #7\] |
| 0x1218 | MFR \[Heizkreis #8\] |
| 0x1219 | MFR \[Heizkreis #9\] |
| 0x121A | MFR \[Heizkreis #10\] |
| 0x121B | MFR \[Heizkreis #11\] |
| 0x121C | MFR \[Heizkreis #12\] |
| 0x121D | MFR \[Heizkreis #13\] |
| 0x121E | MFR \[Heizkreis #14\] |
| 0x121F | MFR \[Heizkreis #15\] |
| 0x1220 | Regudis H-HT \[Übergabestation #0\] |
| 0x1221 | Regudis H-HT \[Übergabestation #1\] |
| 0x1222 | Regudis H-HT \[Übergabestation #2\] |
| 0x1223 | Regudis H-HT \[Übergabestation #3\] |
| 0x1224 | Regudis H-HT \[Übergabestation #4\] |
| 0x1225 | Regudis H-HT \[Übergabestation #5\] |
| 0x1226 | Regudis H-HT \[Übergabestation #6\] |
| 0x1227 | Regudis H-HT \[Übergabestation #7\] |
| 0x1228 | Regudis H-HT \[Übergabestation #8\] |
| 0x1229 | Regudis H-HT \[Übergabestation #9\] |
| 0x122A | Regudis H-HT \[Übergabestation #10\] |
| 0x122B | Regudis H-HT \[Übergabestation #11\] |
| 0x122C | Regudis H-HT \[Übergabestation #12\] |
| 0x122D | Regudis H-HT \[Übergabestation #13\] |
| 0x122E | Regudis H-HT \[Übergabestation #14\] |
| 0x122F | Regudis H-HT \[Übergabestation #15\] |
| 0x1230 | Regudis H-HT \[BW-Erwärmung #0\] |
| 0x1231 | Regudis H-HT \[BW-Erwärmung #1\] |
| 0x1232 | Regudis H-HT \[BW-Erwärmung #2\] |
| 0x1233 | Regudis H-HT \[BW-Erwärmung #3\] |
| 0x1234 | Regudis H-HT \[BW-Erwärmung #4\] |
| 0x1235 | Regudis H-HT \[BW-Erwärmung #5\] |
| 0x1236 | Regudis H-HT \[BW-Erwärmung #6\] |
| 0x1237 | Regudis H-HT \[BW-Erwärmung #7\] |
| 0x1238 | Regudis H-HT \[BW-Erwärmung #8\] |
| 0x1239 | Regudis H-HT \[BW-Erwärmung #9\] |
| 0x123A | Regudis H-HT \[BW-Erwärmung #10\] |
| 0x123B | Regudis H-HT \[BW-Erwärmung #11\] |
| 0x123C | Regudis H-HT \[BW-Erwärmung #12\] |
| 0x123D | Regudis H-HT \[BW-Erwärmung #13\] |
| 0x123E | Regudis H-HT \[BW-Erwärmung #14\] |
| 0x123F | Regudis H-HT \[BW-Erwärmung #15\] |
| 0x1240 | Wagner Sungo 100 \[Regler\] |
| 0x1241 | Wagner Sungo 100 \[WMZ1\] |
| 0x1250 | Viessmann Vitotrans 353 2017 |
| 0x1260 | Viessmann Vitotrans 353 2017 Broadcast |
| 0x1261 | Viessmann Vitotrans 353 2017 Master |
| 0x1262 | Viessmann Vitotrans 353 2017 Slave 1 |
| 0x1263 | Viessmann Vitotrans 353 2017 Slave 2 |
| 0x1264 | Viessmann Vitotrans 353 2017 Slave 3 |
| 0x1410 | THERMUfloor ER |
| 0x1420 | Apricus DeltaSol AL E HE |
| 0x1510 | DeltaSol Fresh 2018 |
| 0x1520 | DeltaSol Fresh 2018 Kaskade Broadcast |
| 0x1521 | DeltaSol Fresh 2018 Kaskade - Station 1 |
| 0x1522 | DeltaSol Fresh 2018 Kaskade - Station 2 |
| 0x1523 | DeltaSol Fresh 2018 Kaskade - Station 3 |
| 0x1524 | DeltaSol Fresh 2018 Kaskade - Station 4 |
| 0x1711 | DeltaTherm HC max \[Regler\] |
| 0x1720 | DeltaTherm HC max \[Heizkreis #0\] |
| 0x1721 | DeltaTherm HC max \[Heizkreis #1\] |
| 0x1722 | DeltaTherm HC max \[Heizkreis #2\] |
| 0x1723 | DeltaTherm HC max \[Heizkreis #3\] |
| 0x1724 | DeltaTherm HC max \[Heizkreis #4\] |
| 0x1725 | DeltaTherm HC max \[Heizkreis #5\] |
| 0x1726 | DeltaTherm HC max \[Heizkreis #6\] |
| 0x1727 | DeltaTherm HC max \[Heizkreis #7\] |
| 0x1728 | DeltaTherm HC max \[Heizkreis #8\] |
| 0x1729 | DeltaTherm HC max \[Heizkreis #9\] |
| 0x172A | DeltaTherm HC max \[Heizkreis #10\] |
| 0x172B | DeltaTherm HC max \[Heizkreis #11\] |
| 0x172C | DeltaTherm HC max \[Heizkreis #12\] |
| 0x172D | DeltaTherm HC max \[Heizkreis #13\] |
| 0x172E | DeltaTherm HC max \[Heizkreis #14\] |
| 0x172F | DeltaTherm HC max \[Heizkreis #15\] |
| 0x1730 | DeltaTherm HC max \[WMZ #0\] |
| 0x1731 | DeltaTherm HC max \[WMZ #1\] |
| 0x1732 | DeltaTherm HC max \[WMZ #2\] |
| 0x1733 | DeltaTherm HC max \[WMZ #3\] |
| 0x1734 | DeltaTherm HC max \[WMZ #4\] |
| 0x1735 | DeltaTherm HC max \[WMZ #5\] |
| 0x1736 | DeltaTherm HC max \[WMZ #6\] |
| 0x1737 | DeltaTherm HC max \[WMZ #7\] |
| 0x1738 | DeltaTherm HC max \[WMZ #8\] |
| 0x1739 | DeltaTherm HC max \[WMZ #9\] |
| 0x173A | DeltaTherm HC max \[WMZ #10\] |
| 0x173B | DeltaTherm HC max \[WMZ #11\] |
| 0x173C | DeltaTherm HC max \[WMZ #12\] |
| 0x173D | DeltaTherm HC max \[WMZ #13\] |
| 0x173E | DeltaTherm HC max \[WMZ #14\] |
| 0x173F | DeltaTherm HC max \[WMZ #15\] |
| 0x1740 | DeltaTherm HC max \[Modul #0\] |
| 0x1741 | DeltaTherm HC max \[Modul #1\] |
| 0x1742 | DeltaTherm HC max \[Modul #2\] |
| 0x1743 | DeltaTherm HC max \[Modul #3\] |
| 0x1744 | DeltaTherm HC max \[Modul #4\] |
| 0x1745 | DeltaTherm HC max \[Modul #5\] |
| 0x1746 | DeltaTherm HC max \[Modul #6\] |
| 0x1747 | DeltaTherm HC max \[Modul #7\] |
| 0x1748 | DeltaTherm HC max \[Modul #8\] |
| 0x1749 | DeltaTherm HC max \[Modul #9\] |
| 0x174A | DeltaTherm HC max \[Modul #10\] |
| 0x174B | DeltaTherm HC max \[Modul #11\] |
| 0x174C | DeltaTherm HC max \[Modul #12\] |
| 0x174D | DeltaTherm HC max \[Modul #13\] |
| 0x174E | DeltaTherm HC max \[Modul #14\] |
| 0x174F | DeltaTherm HC max \[Modul #15\] |
| 0x2000 | Digital Sensor #0 |
| 0x2001 | Digital Sensor #1 |
| 0x2002 | Digital Sensor #2 |
| 0x2003 | Digital Sensor #3 |
| 0x2004 | Digital Sensor #4 |
| 0x2005 | Digital Sensor #5 |
| 0x2006 | Digital Sensor #6 |
| 0x2007 | Digital Sensor #7 |
| 0x2008 | Digital Sensor #8 |
| 0x2009 | Digital Sensor #9 |
| 0x200A | Digital Sensor #10 |
| 0x200B | Digital Sensor #11 |
| 0x200C | Digital Sensor #12 |
| 0x200D | Digital Sensor #13 |
| 0x200E | Digital Sensor #14 |
| 0x200F | Digital Sensor #15 |
| 0x2010 | Digital Sensor #16 |
| 0x2011 | Digital Sensor #17 |
| 0x2012 | Digital Sensor #18 |
| 0x2013 | Digital Sensor #19 |
| 0x2014 | Digital Sensor #20 |
| 0x2015 | Digital Sensor #21 |
| 0x2016 | Digital Sensor #22 |
| 0x2017 | Digital Sensor #23 |
| 0x2018 | Digital Sensor #24 |
| 0x2019 | Digital Sensor #25 |
| 0x201A | Digital Sensor #26 |
| 0x201B | Digital Sensor #27 |
| 0x201C | Digital Sensor #28 |
| 0x201D | Digital Sensor #29 |
| 0x201E | Digital Sensor #30 |
| 0x201F | Digital Sensor #31 |
| 0x2020 | Digital Sensor #32 |
| 0x2021 | Digital Sensor #33 |
| 0x2022 | Digital Sensor #34 |
| 0x2023 | Digital Sensor #35 |
| 0x2024 | Digital Sensor #36 |
| 0x2025 | Digital Sensor #37 |
| 0x2026 | Digital Sensor #38 |
| 0x2027 | Digital Sensor #39 |
| 0x2028 | Digital Sensor #40 |
| 0x2029 | Digital Sensor #41 |
| 0x202A | Digital Sensor #42 |
| 0x202B | Digital Sensor #43 |
| 0x202C | Digital Sensor #44 |
| 0x202D | Digital Sensor #45 |
| 0x202E | Digital Sensor #46 |
| 0x202F | Digital Sensor #47 |
| 0x2030 | Digital Sensor #48 |
| 0x2031 | Digital Sensor #49 |
| 0x2032 | Digital Sensor #50 |
| 0x2033 | Digital Sensor #51 |
| 0x2034 | Digital Sensor #52 |
| 0x2035 | Digital Sensor #53 |
| 0x2036 | Digital Sensor #54 |
| 0x2037 | Digital Sensor #55 |
| 0x2038 | Digital Sensor #56 |
| 0x2039 | Digital Sensor #57 |
| 0x203A | Digital Sensor #58 |
| 0x203B | Digital Sensor #59 |
| 0x203C | Digital Sensor #60 |
| 0x203D | Digital Sensor #61 |
| 0x203E | Digital Sensor #62 |
| 0x203F | Digital Sensor #63 |
| 0x2040 | Digital Sensor #64 |
| 0x2041 | Digital Sensor #65 |
| 0x2042 | Digital Sensor #66 |
| 0x2043 | Digital Sensor #67 |
| 0x2044 | Digital Sensor #68 |
| 0x2045 | Digital Sensor #69 |
| 0x2046 | Digital Sensor #70 |
| 0x2047 | Digital Sensor #71 |
| 0x2048 | Digital Sensor #72 |
| 0x2049 | Digital Sensor #73 |
| 0x204A | Digital Sensor #74 |
| 0x204B | Digital Sensor #75 |
| 0x204C | Digital Sensor #76 |
| 0x204D | Digital Sensor #77 |
| 0x204E | Digital Sensor #78 |
| 0x204F | Digital Sensor #79 |
| 0x2050 | Digital Sensor #80 |
| 0x2051 | Digital Sensor #81 |
| 0x2052 | Digital Sensor #82 |
| 0x2053 | Digital Sensor #83 |
| 0x2054 | Digital Sensor #84 |
| 0x2055 | Digital Sensor #85 |
| 0x2056 | Digital Sensor #86 |
| 0x2057 | Digital Sensor #87 |
| 0x2058 | Digital Sensor #88 |
| 0x2059 | Digital Sensor #89 |
| 0x205A | Digital Sensor #90 |
| 0x205B | Digital Sensor #91 |
| 0x205C | Digital Sensor #92 |
| 0x205D | Digital Sensor #93 |
| 0x205E | Digital Sensor #94 |
| 0x205F | Digital Sensor #95 |
| 0x2060 | Digital Sensor #96 |
| 0x2061 | Digital Sensor #97 |
| 0x2062 | Digital Sensor #98 |
| 0x2063 | Digital Sensor #99 |
| 0x2064 | Digital Sensor #100 |
| 0x2065 | Digital Sensor #101 |
| 0x2066 | Digital Sensor #102 |
| 0x2067 | Digital Sensor #103 |
| 0x2068 | Digital Sensor #104 |
| 0x2069 | Digital Sensor #105 |
| 0x206A | Digital Sensor #106 |
| 0x206B | Digital Sensor #107 |
| 0x206C | Digital Sensor #108 |
| 0x206D | Digital Sensor #109 |
| 0x206E | Digital Sensor #110 |
| 0x206F | Digital Sensor #111 |
| 0x2070 | Digital Sensor #112 |
| 0x2071 | Digital Sensor #113 |
| 0x2072 | Digital Sensor #114 |
| 0x2073 | Digital Sensor #115 |
| 0x2074 | Digital Sensor #116 |
| 0x2075 | Digital Sensor #117 |
| 0x2076 | Digital Sensor #118 |
| 0x2077 | Digital Sensor #119 |
| 0x2078 | Digital Sensor #120 |
| 0x2079 | Digital Sensor #121 |
| 0x207A | Digital Sensor #122 |
| 0x207B | Digital Sensor #123 |
| 0x207C | Digital Sensor #124 |
| 0x207D | Digital Sensor #125 |
| 0x207E | Digital Sensor #126 |
| 0x207F | Digital Sensor #127 |
| 0x2111 | TLR2 |
| 0x2211 | DeltaSol CS Plus |
| 0x2213 | DeltaSol CS Plus 2.x |
| 0x2231 | Oranier HK \[Regler\] |
| 0x2232 | Oranier HK \[WMZ1\] |
| 0x2241 | Frischwasserregler |
| 0x2251 | DeltaSol SL \[Regler\] |
| 0x2252 | DeltaSol SL \[WMZ1\] |
| 0x2261 | HR Solar BASIC controller \[Regler\] |
| 0x2262 | HR Solar BASIC controller \[WMZ 1\] |
| 0x2271 | DeltaSol SLL \[Regler\] |
| 0x2272 | DeltaSol SLL \[WMZ1\] |
| 0x2360 | HR Solar ADVANCED controller \[Regler\] |
| 0x2362 | HR Solar ADVANCED controller \[WMZ 1\] |
| 0x3011 | WMZ-L10 |
| 0x3112 | Remeha RemaSol A |
| 0x3113 | DeDietrich Diemasol Ai v2 |
| 0x3114 | DeDietrich Sol Plus Trio |
| 0x3211 | EL1 |
| 0x3221 | DeltaSol Pro |
| 0x3231 | DeltaSol B |
| 0x3241 | DT4 \(B\) |
| 0x3251 | DeltaSol BS |
| 0x3261 | DeltaSol BS \(DT4\) |
| 0x3271 | ConergyDT5 |
| 0x3311 | Diemasol C |
| 0x4010 | WMZ #0 |
| 0x4011 | WMZ #1 |
| 0x4012 | WMZ #2 |
| 0x4013 | WMZ #3 |
| 0x4014 | WMZ #4 |
| 0x4015 | WMZ #5 |
| 0x4016 | WMZ #6 |
| 0x4017 | WMZ #7 |
| 0x4018 | WMZ #8 |
| 0x4019 | WMZ #9 |
| 0x401A | WMZ #10 |
| 0x401B | WMZ #11 |
| 0x401C | WMZ #12 |
| 0x401D | WMZ #13 |
| 0x401E | WMZ #14 |
| 0x401F | WMZ #15 |
| 0x4021 | GF-Display |
| 0x4111 | DeltaSol AL |
| 0x4211 | SKSC1/2 |
| 0x4212 | DeltaSol C |
| 0x4213 | SKSC2 HE \[Regler\] |
| 0x4214 | SKSC2 HE \[Regler\] |
| 0x4221 | DeltaSol BS Plus |
| 0x4223 | DeltaSol BS Plus BTU |
| 0x4224 | CS2.2 |
| 0x4225 | CS1.2 |
| 0x4231 | Frista |
| 0x4241 | Huber - REGLOfresh / Felix \[Regler\] |
| 0x4251 | DSPlus UMSYS \[Regler\] |
| 0x4252 | BS Solex US |
| 0x4258 | SolarNor Drainback |
| 0x4261 | DeltaSol E SorTech \[Regler\] |
| 0x4265 | Aton DeltaSol BS |
| 0x4278 | DeltaSol BS/DrainBack |
| 0x4279 | DeltaSol BS/DrainBack \(Fahrenheit\) |
| 0x427A | DeltaSol BS/DrainBack \(Fahrenheit/BTU\) |
| 0x427B | DeltaSol BS 2009 |
| 0x4311 | DeDietrich DrainBack |
| 0x4312 | DeDietrich Drainback \(Control\) |
| 0x4321 | DeltaSol MiniPool |
| 0x4410 | MSR44 #0 |
| 0x4411 | MSR44 #1 |
| 0x4412 | MSR44 #2 |
| 0x4413 | MSR44 #3 |
| 0x4414 | MSR44 #4 |
| 0x4415 | MSR44 #5 |
| 0x4416 | MSR44 #6 |
| 0x4417 | MSR44 #7 |
| 0x4418 | MSR44 #8 |
| 0x4419 | MSR44 #9 |
| 0x441A | MSR44 #10 |
| 0x441B | MSR44 #11 |
| 0x441C | MSR44 #12 |
| 0x441D | MSR44 #13 |
| 0x441E | MSR44 #14 |
| 0x441F | MSR44 #15 |
| 0x4420 | HKM1 #0 |
| 0x4421 | HKM1 #1 |
| 0x4422 | HKM1 #2 |
| 0x4423 | HKM1 #3 |
| 0x4424 | HKM1 #4 |
| 0x4425 | HKM1 #5 |
| 0x4426 | HKM1 #6 |
| 0x4427 | HKM1 #7 |
| 0x4428 | HKM1 #8 |
| 0x4429 | HKM1 #9 |
| 0x442A | HKM1 #10 |
| 0x442B | HKM1 #11 |
| 0x442C | HKM1 #12 |
| 0x442D | HKM1 #13 |
| 0x442E | HKM1 #14 |
| 0x442F | HKM1 #15 |
| 0x4720 | DeltaSol BS/2 HE |
| 0x4721 | DeltaSol BS/2 HE \[WMZ\] |
| 0x4730 | DeltaSol BS/4 HE |
| 0x4731 | DeltaSol BS/4 HE \[WMZ\] |
| 0x4A00 | Drainback DeDietrich |
| 0x5111 | DeltaSol D |
| 0x5112 | Speicherofenregler |
| 0x5121 | FriwaMini |
| 0x5141 | Tuxhorn PKE |
| 0x5210 | DeltaSol Plus |
| 0x5221 | DT4 \(MS\) |
| 0x5231 | nemux |
| 0x5251 | Frischwasserregler |
| 0x5260 | Kaskade BasisAdr |
| 0x5261 | Kaskade Master |
| 0x5262 | Kaskade Slave  1 |
| 0x5263 | Kaskade Slave  2 |
| 0x5264 | Kaskade Slave  3 |
| 0x5265 | Kaskade Slave  4 |
| 0x5266 | Kaskade Slave  5 |
| 0x5267 | Kaskade Slave  6 |
| 0x5268 | Kaskade Slave  7 |
| 0x5269 | Kaskade Slave  8 |
| 0x526A | Kaskade Slave  9 |
| 0x526B | Kaskade Slave 10 |
| 0x526C | Kaskade Slave 11 |
| 0x526D | Kaskade Slave 12 |
| 0x526E | Kaskade Slave 13 |
| 0x526F | Kaskade Slave 14 |
| 0x5311 | X-Control |
| 0x5351 | Frischwasserregler |
| 0x5360 | PAW Kaskade BasisAdr |
| 0x5361 | PAW Kaskade Master |
| 0x5362 | PAW Kaskade Slave  1 |
| 0x5363 | PAW Kaskade Slave  2 |
| 0x5364 | PAW Kaskade Slave  3 |
| 0x5365 | PAW Kaskade Slave  4 |
| 0x5366 | PAW Kaskade Slave  5 |
| 0x5367 | PAW Kaskade Slave  6 |
| 0x5368 | PAW Kaskade Slave  7 |
| 0x5369 | PAW Kaskade Slave  8 |
| 0x536A | PAW Kaskade Slave  9 |
| 0x536B | PAW Kaskade Slave 10 |
| 0x536C | PAW Kaskade Slave 11 |
| 0x536D | PAW Kaskade Slave 12 |
| 0x536E | PAW Kaskade Slave 13 |
| 0x536F | PAW Kaskade Slave 14 |
| 0x5400 | DeltaTherm HC \[Regler\] |
| 0x5410 | DeltaTherm HC \[Heizkreis #0\] |
| 0x5411 | DeltaTherm HC \[Heizkreis #1\] |
| 0x5412 | DeltaTherm HC \[Heizkreis #2\] |
| 0x5413 | DeltaTherm HC \[Heizkreis #3\] |
| 0x5414 | DeltaTherm HC \[Heizkreis #4\] |
| 0x5415 | DeltaTherm HC \[Heizkreis #5\] |
| 0x5416 | DeltaTherm HC \[Heizkreis #6\] |
| 0x5417 | DeltaTherm HC \[Heizkreis #7\] |
| 0x5418 | DeltaTherm HC \[Heizkreis #8\] |
| 0x5419 | DeltaTherm HC \[Heizkreis #9\] |
| 0x541A | DeltaTherm HC \[Heizkreis #10\] |
| 0x541B | DeltaTherm HC \[Heizkreis #11\] |
| 0x541C | DeltaTherm HC \[Heizkreis #12\] |
| 0x541D | DeltaTherm HC \[Heizkreis #13\] |
| 0x541E | DeltaTherm HC \[Heizkreis #14\] |
| 0x541F | DeltaTherm HC \[Heizkreis #15\] |
| 0x5420 | DeltaTherm HC \[WMZ #0\] |
| 0x5421 | DeltaTherm HC \[WMZ #1\] |
| 0x5422 | DeltaTherm HC \[WMZ #2\] |
| 0x5423 | DeltaTherm HC \[WMZ #3\] |
| 0x5424 | DeltaTherm HC \[WMZ #4\] |
| 0x5425 | DeltaTherm HC \[WMZ #5\] |
| 0x5426 | DeltaTherm HC \[WMZ #6\] |
| 0x5427 | DeltaTherm HC \[WMZ #7\] |
| 0x5428 | DeltaTherm HC \[WMZ #8\] |
| 0x5429 | DeltaTherm HC \[WMZ #9\] |
| 0x542A | DeltaTherm HC \[WMZ #10\] |
| 0x542B | DeltaTherm HC \[WMZ #11\] |
| 0x542C | DeltaTherm HC \[WMZ #12\] |
| 0x542D | DeltaTherm HC \[WMZ #13\] |
| 0x542E | DeltaTherm HC \[WMZ #14\] |
| 0x542F | DeltaTherm HC \[WMZ #15\] |
| 0x5430 | DeltaTherm HC \[Modul #0\] |
| 0x5431 | DeltaTherm HC \[Modul #1\] |
| 0x5432 | DeltaTherm HC \[Modul #2\] |
| 0x5433 | DeltaTherm HC \[Modul #3\] |
| 0x5434 | DeltaTherm HC \[Modul #4\] |
| 0x5435 | DeltaTherm HC \[Modul #5\] |
| 0x5436 | DeltaTherm HC \[Modul #6\] |
| 0x5437 | DeltaTherm HC \[Modul #7\] |
| 0x5438 | DeltaTherm HC \[Modul #8\] |
| 0x5439 | DeltaTherm HC \[Modul #9\] |
| 0x543A | DeltaTherm HC \[Modul #10\] |
| 0x543B | DeltaTherm HC \[Modul #11\] |
| 0x543C | DeltaTherm HC \[Modul #12\] |
| 0x543D | DeltaTherm HC \[Modul #13\] |
| 0x543E | DeltaTherm HC \[Modul #14\] |
| 0x543F | DeltaTherm HC \[Modul #15\] |
| 0x5510 | EL2/3 |
| 0x5611 | DeltaTherm FK |
| 0x6510 | HKM2 #0 |
| 0x6511 | HKM2 #1 |
| 0x6512 | HKM2 #2 |
| 0x6513 | HKM2 #3 |
| 0x6514 | HKM2 #4 |
| 0x6515 | HKM2 #5 |
| 0x6516 | HKM2 #6 |
| 0x6517 | HKM2 #7 |
| 0x6518 | HKM2 #8 |
| 0x6519 | HKM2 #9 |
| 0x651A | HKM2 #10 |
| 0x651B | HKM2 #11 |
| 0x651C | HKM2 #12 |
| 0x651D | HKM2 #13 |
| 0x651E | HKM2 #14 |
| 0x651F | HKM2 #15 |
| 0x6520 | MSR65 #0 |
| 0x6521 | MSR65 #1 |
| 0x6522 | MSR65 #2 |
| 0x6523 | MSR65 #3 |
| 0x6524 | MSR65 #4 |
| 0x6525 | MSR65 #5 |
| 0x6526 | MSR65 #6 |
| 0x6527 | MSR65 #7 |
| 0x6528 | MSR65 #8 |
| 0x6529 | MSR65 #9 |
| 0x652A | MSR65 #10 |
| 0x652B | MSR65 #11 |
| 0x652C | MSR65 #12 |
| 0x652D | MSR65 #13 |
| 0x652E | MSR65 #14 |
| 0x652F | MSR65 #15 |
| 0x6610 | Midi Pro |
| 0x6620 | SunGo XL |
| 0x6650 | EM #0 |
| 0x6651 | EM #1 |
| 0x6652 | EM #2 |
| 0x6653 | EM #3 |
| 0x6654 | EM #4 |
| 0x6655 | EM #5 |
| 0x6656 | EM #6 |
| 0x6657 | EM #7 |
| 0x6658 | EM #8 |
| 0x6659 | EM #9 |
| 0x665A | EM #10 |
| 0x665B | EM #11 |
| 0x665C | EM #12 |
| 0x665D | EM #13 |
| 0x665E | EM #14 |
| 0x665F | EM #15 |
| 0x7101 | DeltaSol BX WMZ |
| 0x7112 | DeltaSol BX Plus \[Regler\] |
| 0x7113 | DeltaSol BX Plus \[Module\] |
| 0x7120 | DeltaSol BX Plus \[Heizkreis #0\] |
| 0x7121 | DeltaSol BX Plus \[Heizkreis #1\] |
| 0x7122 | DeltaSol BX Plus \[Heizkreis #2\] |
| 0x7123 | DeltaSol BX Plus \[Heizkreis #3\] |
| 0x7124 | DeltaSol BX Plus \[Heizkreis #4\] |
| 0x7125 | DeltaSol BX Plus \[Heizkreis #5\] |
| 0x7126 | DeltaSol BX Plus \[Heizkreis #6\] |
| 0x7127 | DeltaSol BX Plus \[Heizkreis #7\] |
| 0x7128 | DeltaSol BX Plus \[Heizkreis #8\] |
| 0x7129 | DeltaSol BX Plus \[Heizkreis #9\] |
| 0x712A | DeltaSol BX Plus \[Heizkreis #10\] |
| 0x712B | DeltaSol BX Plus \[Heizkreis #11\] |
| 0x712C | DeltaSol BX Plus \[Heizkreis #12\] |
| 0x712D | DeltaSol BX Plus \[Heizkreis #13\] |
| 0x712E | DeltaSol BX Plus \[Heizkreis #14\] |
| 0x712F | DeltaSol BX Plus \[Heizkreis #15\] |
| 0x7130 | DeltaSol BX Plus \[WMZ #0\] |
| 0x7131 | DeltaSol BX Plus \[WMZ #1\] |
| 0x7132 | DeltaSol BX Plus \[WMZ #2\] |
| 0x7133 | DeltaSol BX Plus \[WMZ #3\] |
| 0x7134 | DeltaSol BX Plus \[WMZ #4\] |
| 0x7135 | DeltaSol BX Plus \[WMZ #5\] |
| 0x7136 | DeltaSol BX Plus \[WMZ #6\] |
| 0x7137 | DeltaSol BX Plus \[WMZ #7\] |
| 0x7138 | DeltaSol BX Plus \[WMZ #8\] |
| 0x7139 | DeltaSol BX Plus \[WMZ #9\] |
| 0x713A | DeltaSol BX Plus \[WMZ #10\] |
| 0x713B | DeltaSol BX Plus \[WMZ #11\] |
| 0x713C | DeltaSol BX Plus \[WMZ #12\] |
| 0x713D | DeltaSol BX Plus \[WMZ #13\] |
| 0x713E | DeltaSol BX Plus \[WMZ #14\] |
| 0x713F | DeltaSol BX Plus \[WMZ #15\] |
| 0x7140 | DeltaSol BX Pro \[Regler\] |
| 0x7150 | DeltaSol BX Pro \[WMZ #0\] |
| 0x7151 | DeltaSol BX Pro \[WMZ #1\] |
| 0x7152 | DeltaSol BX Pro \[WMZ #2\] |
| 0x7153 | DeltaSol BX Pro \[WMZ #3\] |
| 0x7154 | DeltaSol BX Pro \[WMZ #4\] |
| 0x7155 | DeltaSol BX Pro \[WMZ #5\] |
| 0x7156 | DeltaSol BX Pro \[WMZ #6\] |
| 0x7157 | DeltaSol BX Pro \[WMZ #7\] |
| 0x7158 | DeltaSol BX Pro \[WMZ #8\] |
| 0x7159 | DeltaSol BX Pro \[WMZ #9\] |
| 0x715A | DeltaSol BX Pro \[WMZ #10\] |
| 0x715B | DeltaSol BX Pro \[WMZ #11\] |
| 0x715C | DeltaSol BX Pro \[WMZ #12\] |
| 0x715D | DeltaSol BX Pro \[WMZ #13\] |
| 0x715E | DeltaSol BX Pro \[WMZ #14\] |
| 0x715F | DeltaSol BX Pro \[WMZ #15\] |
| 0x7160 | SKSC3HE |
| 0x7161 | SKSC3HE \[HK1\] |
| 0x7162 | SKSC3HE \[HK2\] |
| 0x7163 | SKSC3HE \[HK3\] |
| 0x7176 | DeltaSol BX Plus V2A \[Regler\] |
| 0x7177 | DeltaSol BX Plus V2A \[Module\] |
| 0x7178 | DeltaSol BX Plus V2A \[Heizkreis 1\] |
| 0x7179 | DeltaSol BX Plus V2A \[Heizkreis 2\] |
| 0x717A | DeltaSol BX Plus V2A \[WMZ 1\] |
| 0x717B | DeltaSol BX Plus V2A \[WMZ 2\] |
| 0x7210 | SKSR 1/2/3 |
| 0x7211 | SKSC3 \[HK1\] |
| 0x7212 | SKSC3 \[HK2\] |
| 0x7213 | SKSC3 \[HK3\] |
| 0x7221 | DrainBloC |
| 0x7231 | SC25 |
| 0x7311 | DeltaSol M \[Regler\] |
| 0x7312 | DeltaSol M \[HK1\] |
| 0x7313 | DeltaSol M \[HK2\] |
| 0x7315 | DeltaSol M \[Volumen\] |
| 0x7316 | DeltaSol M \[WMZ1\] |
| 0x7317 | DeltaSol M \[WMZ2\] |
| 0x7321 | Vitosolic 200 \[Regler\] |
| 0x7326 | Vitosolic 200 \[WMZ1\] |
| 0x7327 | Vitosolic 200 \[WMZ2\] |
| 0x7331 | SLR |
| 0x7332 | SLR-Erweiterungsmodul #01 |
| 0x7333 | SLR-Erweiterungsmodul #02 |
| 0x7334 | SLR-Erweiterungsmodul #03 |
| 0x7335 | SLR-Erweiterungsmodul #04 |
| 0x7341 | SLR XT |
| 0x7342 | SLR XT-Erweiterungsmodul 1 |
| 0x7343 | SLR XT-Erweiterungsmodul 2 |
| 0x7344 | SLR XT-Erweiterungsmodul 3 |
| 0x7345 | SLR XT-Erweiterungsmodul 4 |
| 0x7346 | SLR XT-Erweiterungsmodul 5 |
| 0x7411 | DeltaSol ES |
| 0x7421 | DeltaSol BX |
| 0x7422 | IZEN DTi2 |
| 0x7428 | DeltaSol BXL |
| 0x7441 | ZEN DT6 \[Regler\] |
| 0x7442 | ZEN DT6 \[WMZ1\] |
| 0x7451 | Kioto SLM |
| 0x7511 | SOLTEX-Regler \[Teil 1\] |
| 0x7512 | SOLTEX-Regler \[Teil 2\] |
| 0x7521 | Oventrop RQ-B / RQ-B HE |
| 0x7522 | Regtronic RX-B \[Regler\] |
| 0x7523 | Regtronic RX-B \[Module\] |
| 0x7530 | Regtronic RX-B \[WMZ #0\] |
| 0x7531 | Regtronic RX-B \[WMZ #1\] |
| 0x7532 | Regtronic RX-B \[WMZ #2\] |
| 0x7533 | Regtronic RX-B \[WMZ #3\] |
| 0x7534 | Regtronic RX-B \[WMZ #4\] |
| 0x7535 | Regtronic RX-B \[WMZ #5\] |
| 0x7536 | Regtronic RX-B \[WMZ #6\] |
| 0x7537 | Regtronic RX-B \[WMZ #7\] |
| 0x7538 | Regtronic RX-B \[WMZ #8\] |
| 0x7539 | Regtronic RX-B \[WMZ #9\] |
| 0x753A | Regtronic RX-B \[WMZ #10\] |
| 0x753B | Regtronic RX-B \[WMZ #11\] |
| 0x753C | Regtronic RX-B \[WMZ #12\] |
| 0x753D | Regtronic RX-B \[WMZ #13\] |
| 0x753E | Regtronic RX-B \[WMZ #14\] |
| 0x753F | Regtronic RX-B \[WMZ #15\] |
| 0x7541 | Oventrop RQ XXL |
| 0x7611 | Friwa |
| 0x7621 | SOLEX \[Regler\] |
| 0x7622 | SOLEX \[WMZ\] |
| 0x7651 | FriWa Kaskadenmaster Version 1 |
| 0x7711 | Multitronic \[Regler\] |
| 0x7712 | Multitronic \[WMZ\] |
| 0x7721 | DeltaSol E \[Regler\] |
| 0x7722 | DeltaSol E \[WMZ\] |
| 0x7729 | DeltaSol E Fahrenheit \[Regler\] |
| 0x772A | DeltaSol E Fahrenheit \[WMZ\] |
| 0x7731 | SOLTOP DeltaSol S2/S3 |
| 0x7751 | DeDietrich Diemasol C v2007 |
| 0x7761 | DeltaSol Pool |
| 0x7762 | DeltaSol Pool \[WMZ\] |
| 0x7771 | DDS-Crawler |
| 0x7772 | RPT-Testsoftware |
| 0x7773 | RPT-Steuerbox |
| 0x7774 | EMZ/CME |
| 0x7821 | COSMO Multi \[Regler\] |
| 0x7822 | COSMO Multi \[WMZ\] |
| 0x7831 | COSMO Multi HK 1 Estrichtrockung \[Modul 1\] |
| 0x7832 | COSMO Multi HK 2 Estrichtrockung \[Modul 2\] |
| 0x7833 | COSMO Multi HK 3 Estrichtrockung \[Modul 3\] |
| 0x7834 | COSMO Multi HK Estrichtrockung \[Lokal\] |
| 0x7840 | COSMO UNO |
| 0x7841 | COSMO UNO \[WMZ1\] |
| 0x7900 | R-Wandler |
| 0x7910 | PAW SOLEX SC5.14 \[Regler\] |
| 0x7911 | PAW SOLEX SC5.14 \[Module\] |
| 0x7920 | PAW SOLEX SC5.14 \[Heizkreis #0\] |
| 0x7921 | PAW SOLEX SC5.14 \[Heizkreis #1\] |
| 0x7922 | PAW SOLEX SC5.14 \[Heizkreis #2\] |
| 0x7923 | PAW SOLEX SC5.14 \[Heizkreis #3\] |
| 0x7924 | PAW SOLEX SC5.14 \[Heizkreis #4\] |
| 0x7925 | PAW SOLEX SC5.14 \[Heizkreis #5\] |
| 0x7926 | PAW SOLEX SC5.14 \[Heizkreis #6\] |
| 0x7927 | PAW SOLEX SC5.14 \[Heizkreis #7\] |
| 0x7928 | PAW SOLEX SC5.14 \[Heizkreis #8\] |
| 0x7929 | PAW SOLEX SC5.14 \[Heizkreis #9\] |
| 0x792A | PAW SOLEX SC5.14 \[Heizkreis #10\] |
| 0x792B | PAW SOLEX SC5.14 \[Heizkreis #11\] |
| 0x792C | PAW SOLEX SC5.14 \[Heizkreis #12\] |
| 0x792D | PAW SOLEX SC5.14 \[Heizkreis #13\] |
| 0x792E | PAW SOLEX SC5.14 \[Heizkreis #14\] |
| 0x792F | PAW SOLEX SC5.14 \[Heizkreis #15\] |
| 0x7930 | PAW SOLEX SC5.14 \[WMZ #0\] |
| 0x7931 | PAW SOLEX SC5.14 \[WMZ #1\] |
| 0x7932 | PAW SOLEX SC5.14 \[WMZ #2\] |
| 0x7933 | PAW SOLEX SC5.14 \[WMZ #3\] |
| 0x7934 | PAW SOLEX SC5.14 \[WMZ #4\] |
| 0x7935 | PAW SOLEX SC5.14 \[WMZ #5\] |
| 0x7936 | PAW SOLEX SC5.14 \[WMZ #6\] |
| 0x7937 | PAW SOLEX SC5.14 \[WMZ #7\] |
| 0x7938 | PAW SOLEX SC5.14 \[WMZ #8\] |
| 0x7939 | PAW SOLEX SC5.14 \[WMZ #9\] |
| 0x793A | PAW SOLEX SC5.14 \[WMZ #10\] |
| 0x793B | PAW SOLEX SC5.14 \[WMZ #11\] |
| 0x793C | PAW SOLEX SC5.14 \[WMZ #12\] |
| 0x793D | PAW SOLEX SC5.14 \[WMZ #13\] |
| 0x793E | PAW SOLEX SC5.14 \[WMZ #14\] |
| 0x793F | PAW SOLEX SC5.14 \[WMZ #15\] |
| 0x7D04 | FRISTA-mix |
| 0x7E11 | DeltaSol MX \[Regler\] |
| 0x7E12 | DeltaSol MX \[Module\] |
| 0x7E20 | DeltaSol MX \[Heizkreis #0\] |
| 0x7E21 | DeltaSol MX \[Heizkreis #1\] |
| 0x7E22 | DeltaSol MX \[Heizkreis #2\] |
| 0x7E23 | DeltaSol MX \[Heizkreis #3\] |
| 0x7E24 | DeltaSol MX \[Heizkreis #4\] |
| 0x7E25 | DeltaSol MX \[Heizkreis #5\] |
| 0x7E26 | DeltaSol MX \[Heizkreis #6\] |
| 0x7E27 | DeltaSol MX \[Heizkreis #7\] |
| 0x7E28 | DeltaSol MX \[Heizkreis #8\] |
| 0x7E29 | DeltaSol MX \[Heizkreis #9\] |
| 0x7E2A | DeltaSol MX \[Heizkreis #10\] |
| 0x7E2B | DeltaSol MX \[Heizkreis #11\] |
| 0x7E2C | DeltaSol MX \[Heizkreis #12\] |
| 0x7E2D | DeltaSol MX \[Heizkreis #13\] |
| 0x7E2E | DeltaSol MX \[Heizkreis #14\] |
| 0x7E2F | DeltaSol MX \[Heizkreis #15\] |
| 0x7E30 | DeltaSol MX \[WMZ #0\] |
| 0x7E31 | DeltaSol MX \[WMZ #1\] |
| 0x7E32 | DeltaSol MX \[WMZ #2\] |
| 0x7E33 | DeltaSol MX \[WMZ #3\] |
| 0x7E34 | DeltaSol MX \[WMZ #4\] |
| 0x7E35 | DeltaSol MX \[WMZ #5\] |
| 0x7E36 | DeltaSol MX \[WMZ #6\] |
| 0x7E37 | DeltaSol MX \[WMZ #7\] |
| 0x7E38 | DeltaSol MX \[WMZ #8\] |
| 0x7E39 | DeltaSol MX \[WMZ #9\] |
| 0x7E3A | DeltaSol MX \[WMZ #10\] |
| 0x7E3B | DeltaSol MX \[WMZ #11\] |
| 0x7E3C | DeltaSol MX \[WMZ #12\] |
| 0x7E3D | DeltaSol MX \[WMZ #13\] |
| 0x7E3E | DeltaSol MX \[WMZ #14\] |
| 0x7E3F | DeltaSol MX \[WMZ #15\] |
| 0x7E40 | DeltaSol MX \[Modul #0\] |
| 0x7E41 | DeltaSol MX \[Modul #1\] |
| 0x7E42 | DeltaSol MX \[Modul #2\] |
| 0x7E43 | DeltaSol MX \[Modul #3\] |
| 0x7E44 | DeltaSol MX \[Modul #4\] |
| 0x7E45 | DeltaSol MX \[Modul #5\] |
| 0x7E46 | DeltaSol MX \[Modul #6\] |
| 0x7E47 | DeltaSol MX \[Modul #7\] |
| 0x7E48 | DeltaSol MX \[Modul #8\] |
| 0x7E49 | DeltaSol MX \[Modul #9\] |
| 0x7E4A | DeltaSol MX \[Modul #10\] |
| 0x7E4B | DeltaSol MX \[Modul #11\] |
| 0x7E4C | DeltaSol MX \[Modul #12\] |
| 0x7E4D | DeltaSol MX \[Modul #13\] |
| 0x7E4E | DeltaSol MX \[Modul #14\] |
| 0x7E4F | DeltaSol MX \[Modul #15\] |
| 0x7E60 | DeltaSol BX Plus \[Modul #0\] |
| 0x7E61 | DeltaSol BX Plus \[Modul #1\] |
| 0x7E62 | DeltaSol BX Plus \[Modul #2\] |
| 0x7E63 | DeltaSol BX Plus \[Modul #3\] |
| 0x7E64 | DeltaSol BX Plus \[Modul #4\] |
| 0x7E65 | DeltaSol BX Plus \[Modul #5\] |
| 0x7E66 | DeltaSol BX Plus \[Modul #6\] |
| 0x7E67 | DeltaSol BX Plus \[Modul #7\] |
| 0x7E68 | DeltaSol BX Plus \[Modul #8\] |
| 0x7E69 | DeltaSol BX Plus \[Modul #9\] |
| 0x7E6A | DeltaSol BX Plus \[Modul #10\] |
| 0x7E6B | DeltaSol BX Plus \[Modul #11\] |
| 0x7E6C | DeltaSol BX Plus \[Modul #12\] |
| 0x7E6D | DeltaSol BX Plus \[Modul #13\] |
| 0x7E6E | DeltaSol BX Plus \[Modul #14\] |
| 0x7E6F | DeltaSol BX Plus \[Modul #15\] |
| 0x7E71 | EMV-Software |
| 0x7F61 | IOC-Modul \[Messwerte\] |
| 0x7F62 | IOC-Modul \[Tagesbilanz\] |
| 0x7F63 | IOC-Modul \[Entnahmekreis\] |
| 0x7F64 | IOC-Modul \[Debug-Werte\] |
| 0x7F65 | IOC-Modul \[Messwerte_1s\] |
| 0x7F71 | DeltaSol FCS |



## Known packets (VBus Protocol Version 1.0)

### <a name="0000_4010_0100"></a>Any destination <= WMZ (0x4010 - 0x401F), command 0x0100

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



### <a name="0000_4420_0100"></a>Any destination <= HKM1 (0x4420 - 0x442F), command 0x0100

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



### <a name="0000_6510_0100"></a>Any destination <= HKM2 (0x6510 - 0x651F), command 0x0100

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



### <a name="0000_6520_0100"></a>Any destination <= MSR65 (0x6520 - 0x652F), command 0x0100

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



### <a name="0000_6650_0100"></a>Any destination <= EM (0x6650 - 0x665F), command 0x0100

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
| 44 |  | Last Impulse Interval Sensor 1 | 1 |  ms |
| 45 |  | Last Impulse Interval Sensor 1 | 256 |  ms |
| 46 |  | Last Impulse Interval Sensor 1 | 65536 |  ms |
| 47 |  | Last Impulse Interval Sensor 1 | 16777216 |  ms |
| 48 |  | Last Impulse Interval Sensor 2 | 1 |  ms |
| 49 |  | Last Impulse Interval Sensor 2 | 256 |  ms |
| 50 |  | Last Impulse Interval Sensor 2 | 65536 |  ms |
| 51 |  | Last Impulse Interval Sensor 2 | 16777216 |  ms |
| 52 |  | Last Impulse Interval Sensor 3 | 1 |  ms |
| 53 |  | Last Impulse Interval Sensor 3 | 256 |  ms |
| 54 |  | Last Impulse Interval Sensor 3 | 65536 |  ms |
| 55 |  | Last Impulse Interval Sensor 3 | 16777216 |  ms |
| 56 |  | Current Impulse Interval Sensor 1 | 1 |  ms |
| 57 |  | Current Impulse Interval Sensor 1 | 256 |  ms |
| 58 |  | Current Impulse Interval Sensor 1 | 65536 |  ms |
| 59 |  | Current Impulse Interval Sensor 1 | 16777216 |  ms |
| 60 |  | Current Impulse Interval Sensor 2 | 1 |  ms |
| 61 |  | Current Impulse Interval Sensor 2 | 256 |  ms |
| 62 |  | Current Impulse Interval Sensor 2 | 65536 |  ms |
| 63 |  | Current Impulse Interval Sensor 2 | 16777216 |  ms |
| 64 |  | Current Impulse Interval Sensor 3 | 1 |  ms |
| 65 |  | Current Impulse Interval Sensor 3 | 256 |  ms |
| 66 |  | Current Impulse Interval Sensor 3 | 65536 |  ms |
| 67 |  | Current Impulse Interval Sensor 3 | 16777216 |  ms |
| 80 |  | Wärmemenge | 1 |  Wh |
| 81 |  | Wärmemenge | 256 |  Wh |
| 82 |  | Wärmemenge | 65536 |  Wh |
| 83 |  | Wärmemenge | 16777216 |  Wh |



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
| 36 | 0x01 | Fehler: Sensorleitung unterbrochen | 1 |  |
| 36 | 0x02 | Fehler: Sensorleitung kurzgeschlossen | 1 |  |
| 36 | 0x20 | Fehler: Volumstromüberwachung | 1 |  |
| 36 | 0x40 | Fehler: Überdruck | 1 |  |
| 36 | 0x80 | Fehler: Minderdruck | 1 |  |
| 36 |  | Fehlermaske | 1 |  |
| 37 | 0x02 | Fehler: Datenspeicher | 1 |  |
| 37 | 0x04 | Fehler: Echtzeituhr | 1 |  |
| 37 | 0x10 | Fehler: Zwillingspumpe | 1 |  |
| 37 |  | Fehlermaske | 256 |  |
| 38 |  | Fehlermaske | 65536 |  |
| 39 |  | Fehlermaske | 16777216 |  |
| 40 | 0x04 | Warnung: ΔT zu hoch | 1 |  |
| 40 | 0x08 | Warnung: Nachtzirkulation | 1 |  |
| 40 | 0x10 | Warnung: Vorlauf/Rücklauf vertauscht | 1 |  |
| 40 |  | Warnmaske | 1 |  |
| 41 | 0x04 | Warnung: Speichermaximaltemperatur | 1 |  |
| 41 | 0x08 | Fehler: SD-Karte | 1 |  |
| 41 |  | Warnmaske | 256 |  |
| 42 |  | Warnmaske | 65536 |  |
| 43 |  | Warnmaske | 16777216 |  |



### <a name="0010_1010_0100"></a>DFA (0x0010) <= DeltaSol SLT \[WMZ\] (0x1010 - 0x101F), command 0x0100

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
| 36 |  | Volumen gesamt | 1 |  l |
| 37 |  | Volumen gesamt | 256 |  l |
| 38 |  | Volumen gesamt | 65536 |  l |
| 39 |  | Volumen gesamt | 16777216 |  l |
| 40 |  | Volumen Heute | 1 |  l |
| 41 |  | Volumen Heute | 256 |  l |
| 42 |  | Volumen Heute | 65536 |  l |
| 43 |  | Volumen Heute | 16777216 |  l |
| 44 |  | Volumen Gestern | 1 |  l |
| 45 |  | Volumen Gestern | 256 |  l |
| 46 |  | Volumen Gestern | 65536 |  l |
| 47 |  | Volumen Gestern | 16777216 |  l |
| 48 |  | Volumen Woche | 1 |  l |
| 49 |  | Volumen Woche | 256 |  l |
| 50 |  | Volumen Woche | 65536 |  l |
| 51 |  | Volumen Woche | 16777216 |  l |
| 52 |  | Volumen Vorwoche | 1 |  l |
| 53 |  | Volumen Vorwoche | 256 |  l |
| 54 |  | Volumen Vorwoche | 65536 |  l |
| 55 |  | Volumen Vorwoche | 16777216 |  l |
| 56 |  | Volumen Monat | 1 |  l |
| 57 |  | Volumen Monat | 256 |  l |
| 58 |  | Volumen Monat | 65536 |  l |
| 59 |  | Volumen Monat | 16777216 |  l |
| 60 |  | Volumen Vormonat | 1 |  l |
| 61 |  | Volumen Vormonat | 256 |  l |
| 62 |  | Volumen Vormonat | 65536 |  l |
| 63 |  | Volumen Vormonat | 16777216 |  l |
| 64 |  | Volumen Jahr | 1 |  l |
| 65 |  | Volumen Jahr | 256 |  l |
| 66 |  | Volumen Jahr | 65536 |  l |
| 67 |  | Volumen Jahr | 16777216 |  l |
| 68 |  | Volumen Vorjahr | 1 |  l |
| 69 |  | Volumen Vorjahr | 256 |  l |
| 70 |  | Volumen Vorjahr | 65536 |  l |
| 71 |  | Volumen Vorjahr | 16777216 |  l |
| 72 |  | Leistung | 0.001 |  kW |
| 73 |  | Leistung | 0.256 |  kW |
| 74 |  | Leistung | 65.536 |  kW |
| 75 |  | Leistung | 16777.216 |  kW |



### <a name="0010_1020_0100"></a>DFA (0x0010) <= Noventec Übergabestation \[Regler\] (0x1020), command 0x0100

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
| 14 |  | Temperatur Sensor 6 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 6 | 25.6 |  °C |
| 16 |  | Temperatur Sensor 7 | 0.1 |  °C |
| 17 |  | Temperatur Sensor 7 | 25.6 |  °C |
| 18 |  | Zustand Sensor 8 | 1 |  |
| 19 |  | Drehzahl Relais 1 | 1 | % |
| 20 |  | Drehzahl Relais 2 | 1 | % |
| 21 |  | Drehzahl Relais 3 | 1 | % |
| 22 |  | Drehzahl Relais 4 | 1 | % |
| 23 |  | Drehzahl Relais pot.frei | 1 | % |
| 24 |  | Drehzahl Ausgang PWM 1 | 1 | % |
| 25 |  | Drehzahl Ausgang PWM 2 | 1 | % |
| 28 |  | Fehler | 1 |  |
| 29 |  | Fehler | 256 |  |
| 30 |  | Fehler | 65536 |  |
| 31 |  | Fehler | 16777216 |  |



### <a name="0010_1040_0100"></a>DFA (0x0010) <= DeltaSol E V2 HK 1 Estrichtrockung \[Modul 1\] (0x1040 - 0x104F), command 0x0100

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



### <a name="0010_1059_0100"></a>DFA (0x0010) <= DeltaTherm HC mini \[Regler\] (0x1059), command 0x0100

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
| 12 |  | Drehzahl Relais 1 | 1 | % |
| 13 |  | Drehzahl Relais 2 | 1 | % |
| 14 |  | Drehzahl Relais 3 | 1 | % |
| 15 |  | Drehzahl Relais 4 | 1 | % |
| 17 |  | Regler Ausgang 1 | 1 | % |
| 18 |  | Regler Ausgang 2 | 1 | % |
| 20 |  | Systemdatum | 1 |  |
| 21 |  | Systemdatum | 256 |  |
| 22 |  | Systemdatum | 65536 |  |
| 23 |  | Systemdatum | 16777216 |  |
| 24 |  | Fehlermaske | 1 |  |
| 25 |  | Fehlermaske | 256 |  |
| 26 |  | Fehlermaske | 65536 |  |
| 27 |  | Fehlermaske | 16777216 |  |
| 28 |  | Warnungmaske | 1 |  |
| 29 |  | Warnungmaske | 256 |  |
| 30 |  | Warnungmaske | 65536 |  |
| 31 |  | Warnungmaske | 16777216 |  |



### <a name="0010_105A_0100"></a>DFA (0x0010) <= Remeha RemaCal (0x105A), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Außentemperatur | 0.1 |  °C |
| 1 |  | Außentemperatur | 25.6 |  °C |
| 2 |  | Temperatur Speicher Unten | 0.1 |  °C |
| 3 |  | Temperatur Speicher Unten | 25.6 |  °C |
| 4 |  | Temperatur Speicher Oben | 0.1 |  °C |
| 5 |  | Temperatur Speicher Oben | 25.6 |  °C |
| 6 |  | Einstrahlung | 1 |  W/m² |
| 7 |  | Einstrahlung | 256 |  W/m² |
| 8 |  | Drehzahl Relais Pumpe | 1 | % |
| 9 |  | Drehzahl Wärmepumpe | 1 | % |
| 10 |  | Drehzahl Relais FastOff | 1 | % |
| 12 |  | Betriebssekunden Relais Pumpe | 1 |  s |
| 13 |  | Betriebssekunden Relais Pumpe | 256 |  s |
| 14 |  | Betriebssekunden Relais Pumpe | 65536 |  s |
| 15 |  | Betriebssekunden Relais Pumpe | 16777216 |  s |
| 16 |  | Betriebssekunden Relais FastOff | 1 |  s |
| 17 |  | Betriebssekunden Relais FastOff | 256 |  s |
| 18 |  | Betriebssekunden Relais FastOff | 65536 |  s |
| 19 |  | Betriebssekunden Relais FastOff | 16777216 |  s |
| 20 | 0x01 | Fehler Außensensor | 1 |  |
| 20 | 0x02 | Fehler Speichersensor | 1 |  |
| 20 | 0x04 | Fehler Pumpe | 1 |  |
| 20 | 0x08 | Fehler Wärmepumpe | 1 |  |
| 20 | 0x10 | Fehler Flussschalter | 1 |  |
| 20 |  | Fehlermaske | 1 |  |
| 21 |  | Fehlermaske | 256 |  |
| 22 |  | Fehlermaske | 65536 |  |
| 23 |  | Fehlermaske | 16777216 |  |
| 24 |  | Systemdatum | 1 |  |
| 25 |  | Systemdatum | 256 |  |
| 26 |  | Systemdatum | 65536 |  |
| 27 |  | Systemdatum | 16777216 |  |
| 28 |  | Version | 0.01 |  |
| 29 |  | Version | 2.56 |  |
| 30 |  | Version | 655.36 |  |
| 31 |  | Version | 167772.16 |  |



### <a name="0010_105B_0100"></a>DFA (0x0010) <= Atlantic SOLERIO V3 (0x105B), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | TRB | 0.1 |  °C |
| 1 |  | TRB | 25.6 |  °C |
| 2 |  | TRH | 0.1 |  °C |
| 3 |  | TRH | 25.6 |  °C |
| 4 |  | TCAP | 0.1 |  °C |
| 5 |  | TCAP | 25.6 |  °C |
| 6 |  | R1 | 1 | % |
| 7 |  | R2 | 1 | % |
| 12 |  | h P1 | 1 |  h |
| 13 |  | h P1 | 256 |  h |
| 14 |  | h P2 | 1 |  h |
| 15 |  | h P2 | 256 |  h |
| 16 |  | kWh | 1 |  kWh |
| 17 |  | kWh | 256 |  kWh |
| 18 |  | kWh | 65536 |  kWh |
| 19 |  | kWh | 16777216 |  kWh |
| 20 |  | MWh | 1 |  MWh |
| 21 |  | MWh | 256 |  MWh |
| 22 |  | MWh | 65536 |  MWh |
| 23 |  | MWh | 16777216 |  MWh |
| 24 |  | Systemdatum | 1 |  |
| 25 |  | Systemdatum | 256 |  |
| 26 |  | Systemdatum | 65536 |  |
| 27 |  | Systemdatum | 16777216 |  |



### <a name="0010_105D_0100"></a>DFA (0x0010) <= DeDietrich Sol Plus ER 709 (0x105D), command 0x0100

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
| 32 |  | SW Version | 0.01 |  |
| 33 |  | SW Version | 2.56 |  |
| 36 |  | Temperatur VFD1 | 0.1 |  °C |
| 37 |  | Temperatur VFD1 | 25.6 |  °C |
| 38 |  | Volumenstrom VFD1 | 1 |  l/h |
| 39 |  | Volumenstrom VFD1 | 256 |  l/h |



### <a name="0010_105E_0100"></a>DFA (0x0010) <= Caleffi WP (0x105E), command 0x0100

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
| 12 |  | Betriebssekunden Relais 1 | 1 |  s |
| 13 |  | Betriebssekunden Relais 1 | 256 |  s |
| 14 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 15 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 16 |  | Betriebssekunden Relais 2 | 1 |  s |
| 17 |  | Betriebssekunden Relais 2 | 256 |  s |
| 18 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 19 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 20 |  | Betriebssekunden Relais 3 | 1 |  s |
| 21 |  | Betriebssekunden Relais 3 | 256 |  s |
| 22 |  | Betriebssekunden Relais 3 | 65536 |  s |
| 23 |  | Betriebssekunden Relais 3 | 16777216 |  s |
| 24 |  | Betriebssekunden Relais 4 | 1 |  s |
| 25 |  | Betriebssekunden Relais 4 | 256 |  s |
| 26 |  | Betriebssekunden Relais 4 | 65536 |  s |
| 27 |  | Betriebssekunden Relais 4 | 16777216 |  s |
| 28 |  | Fehlermaske | 1 |  |
| 29 |  | Fehlermaske | 256 |  |
| 30 |  | Fehlermaske | 65536 |  |
| 31 |  | Fehlermaske | 16777216 |  |
| 32 |  | Meldungen | 1 |  |
| 33 |  | Meldungen | 256 |  |
| 34 |  | Meldungen | 65536 |  |
| 35 |  | Meldungen | 16777216 |  |
| 36 |  | Waermepumpe Zustand | 1 |  |
| 37 |  | Waermepumpe Betriebsmodus | 1 |  |
| 38 |  | Waermepumpe TProjekt | 0.1 |  °C |
| 39 |  | Waermepumpe TProjekt | 25.6 |  °C |
| 40 |  | Mischer Befehl | 1 |  |
| 41 |  | Mischer dT | 0.1 |  K |
| 42 |  | Mischer dT | 25.6 |  K |
| 44 |  | TPlan Timer | 1 |  s |
| 45 |  | TPlan Timer | 256 |  s |



### <a name="0010_105F_0100"></a>DFA (0x0010) <= Tuxhorn BHKW (0x105F), command 0x0100

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
| 8 |  | Relais 1 | 1 | % |
| 9 |  | Relais 2 | 1 | % |
| 10 |  | Mischer auf | 1 | % |
| 11 |  | Mischer zu | 1 | % |
| 12 |  | Datum | 1 |  |
| 13 |  | Datum | 256 |  |
| 14 |  | Datum | 65536 |  |
| 15 |  | Datum | 16777216 |  |
| 16 |  | Uhrzeit | 1 |  |
| 17 |  | Uhrzeit | 256 |  |
| 18 |  | Systemmeldung | 1 |  |
| 20 |  | PWM A | 1 | % |
| 21 |  | PWM B | 1 | % |



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
| 37 | 0x01 | Sensor Unterbrechung S9 | 1 |  |
| 37 | 0x02 | Sensor Unterbrechung S10 | 1 |  |
| 37 | 0x04 | Sensor Unterbrechung S11 | 1 |  |
| 37 | 0x08 | Sensor Unterbrechung S12 | 1 |  |
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
| 39 | 0x01 | Sensor Kurzschluss S9 | 1 |  |
| 39 | 0x02 | Sensor Kurzschluss S10 | 1 |  |
| 39 | 0x04 | Sensor Kurzschluss S11 | 1 |  |
| 39 | 0x08 | Sensor Kurzschluss S12 | 1 |  |
| 40 | 0x01 | Sensor 1 benutzt | 1 |  |
| 40 | 0x02 | Sensor 2 benutzt | 1 |  |
| 40 | 0x04 | Sensor 3 benutzt | 1 |  |
| 40 | 0x08 | Sensor 4 benutzt | 1 |  |
| 40 | 0x10 | Sensor 5 benutzt | 1 |  |
| 40 | 0x20 | Sensor 6 benutzt | 1 |  |
| 40 | 0x40 | Sensor 7 benutzt | 1 |  |
| 40 | 0x80 | Sensor 8 benutzt | 1 |  |
| 40 |  | Sensor benutzt | 1 |  |
| 41 | 0x01 | Sensor 9 benutzt | 1 |  |
| 41 | 0x02 | Sensor 10 benutzt | 1 |  |
| 41 | 0x04 | Sensor 11 benutzt | 1 |  |
| 41 | 0x08 | Sensor 12 benutzt | 1 |  |
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



### <a name="0010_1064_0100"></a>DFA (0x0010) <= Vitosolic 200 \[WMZ 1\] (0x1065 - 0x1067), command 0x0100

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



### <a name="0010_1100_0100"></a>DFA (0x0010) <= DeltaSol MX - SorTech - eCoo \[Regler\] (0x1100), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | T E1 OUT: | 0.1 |  °C |
| 1 |  | T E1 OUT: | 25.6 |  °C |
| 2 |  | T E2 OUT: | 0.1 |  °C |
| 3 |  | T E2 OUT: | 25.6 |  °C |
| 4 |  | T A1 OUT: | 0.1 |  °C |
| 5 |  | T A1 OUT: | 25.6 |  °C |
| 6 |  | T A2 OUT: | 0.1 |  °C |
| 7 |  | T A2 OUT: | 25.6 |  °C |
| 8 |  | T LT IN: | 0.1 |  °C |
| 9 |  | T LT IN: | 25.6 |  °C |
| 10 |  | T LT OUT: | 0.1 |  °C |
| 11 |  | T LT OUT: | 25.6 |  °C |
| 12 |  | T MT OUT: | 0.1 |  °C |
| 13 |  | T MT OUT: | 25.6 |  °C |
| 14 |  | T HT OUT: | 0.1 |  °C |
| 15 |  | T HT OUT: | 25.6 |  °C |
| 16 |  | T AMB: | 0.1 |  °C |
| 17 |  | T AMB: | 25.6 |  °C |
| 18 |  | T HT Ext: | 0.1 |  °C |
| 19 |  | T HT Ext: | 25.6 |  °C |
| 20 |  | T LT Ext: | 0.1 |  °C |
| 21 |  | T LT Ext: | 25.6 |  °C |
| 22 |  | EXT-Volt \(T-SET\): | 1 |  V |
| 22 |  | T MT IN: | 0.1 |  °C |
| 23 |  | T MT IN: | 25.6 |  °C |
| 23 |  | EXT-Volt \(T-SET\): | 256 |  V |
| 25 | 0x01 | M1_A_OUT: | 1 |  |
| 25 | 0x02 | M2_A_OUT: | 1 |  |
| 25 | 0x04 | M1_E_OUT: | 1 |  |
| 25 | 0x08 | M2_E_OUT: | 1 |  |
| 25 | 0x08 | SPR Relais: | 1 |  |
| 25 | 0x10 | Sammelstörmeldung | 1 |  |
| 25 | 0x20 | Betriebsmeldung | 1 |  |
| 25 | 0x40 | Betriebsart \(Kühlen/Heizen\) | 1 |  |
| 26 | 0x01 | Anlage: | 1 |  |
| 26 | 0x02 | Heizmodus: | 1 |  |
| 26 | 0x04 | Strömungswächter LT-Kreis: | 1 |  |
| 26 | 0x10 | M1_A_IN: | 1 |  |
| 26 | 0x20 | M2_A_IN: | 1 |  |
| 26 | 0x40 | M1_E_IN: | 1 |  |
| 26 | 0x80 | M2_E_IN: | 1 |  |
| 27 |  | LT-Pumpe | 1 | % |
| 28 |  | MT-Pumpe | 1 | % |
| 29 |  | HT-Pumpe | 1 | % |
| 30 |  | Phase: | 1 |  |
| 31 |  | Systemcode: | 1 |  |
| 32 |  | RCS %: | 1 | % |
| 36 |  | Aufsummierte Besprühungzeit: | 1 |  |
| 36 |  | T LTS OUT AVG | 0.1 |  °C |
| 37 |  | Aufsummierte Besprühungzeit: | 256 |  |
| 37 |  | T LTS OUT AVG | 25.6 |  °C |
| 38 |  | Aufsummierte Besprühungzeit: | 65536 |  |
| 38 |  | T MT OUT AVG | 0.1 |  °C |
| 39 |  | Aufsummierte Besprühungzeit: | 16777216 |  |
| 39 |  | T MT OUT AVG | 25.6 |  °C |
| 40 |  | Aktuellen Sollwert \(T-SET\): | 0.1 |  °C |
| 41 |  | Aktuellen Sollwert \(T-SET\): | 25.6 |  °C |
| 42 |  | Externe Solltemperatur \(T-SET-EXT\): | 0.1 |  °C |
| 43 |  | Externe Solltemperatur \(T-SET-EXT\): | 25.6 |  °C |
| 44 |  | Anzahl Zyklen \(seit Start\): | 1 |  |
| 45 |  | Anzahl Zyklen \(seit Start\): | 256 |  |
| 46 |  | Anzahl Zyklen \(seit Start\): | 65536 |  |
| 47 |  | Anzahl Zyklen \(seit Start\): | 16777216 |  |
| 48 |  | Anzahl Zyklen \(Summe\): | 1 |  |
| 49 |  | Anzahl Zyklen \(Summe\): | 256 |  |
| 50 |  | Anzahl Zyklen \(Summe\): | 65536 |  |
| 51 |  | Anzahl Zyklen \(Summe\): | 16777216 |  |
| 52 |  | T LT IN AVG | 0.1 |  °C |
| 53 |  | T LT IN AVG | 25.6 |  °C |
| 54 |  | T LT IN Cycle | 0.1 |  °C |
| 55 |  | T LT IN Cycle | 25.6 |  °C |
| 56 |  | T LT OUT Cycle | 0.1 |  °C |
| 57 |  | T LT OUT Cycle | 25.6 |  °C |
| 58 |  | T MT OUT Cycle | 0.1 |  °C |
| 59 |  | T MT OUT Cycle | 25.6 |  °C |
| 60 |  | Kälteleistung letzter Zyklus | 0.1 |  kW |
| 61 |  | Kälteleistung letzter Zyklus | 25.6 |  kW |
| 62 |  | Volumenstrom Kaltwasserkreis \(dV_LT\) | 1 |  l/h |
| 63 |  | Volumenstrom Kaltwasserkreis \(dV_LT\) | 256 |  l/h |
| 64 |  | Systemzeit: | 1 |  |
| 65 |  | Systemzeit: | 256 |  |
| 66 |  | Jahr: | 1 |  |
| 67 |  | Jahr: | 256 |  |
| 68 |  | Monat: | 1 |  |
| 69 |  | Tag: | 1 |  |
| 70 |  | Kern: | 1.00 |  |
| 71 |  | Kern: | 0.01 |  |



### <a name="0010_1117_0100"></a>DFA (0x0010) <= Kioto Laderegler (0x1117), command 0x0100

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
| 32 |  | SW Version | 0.01 |  |
| 33 |  | SW Version | 2.56 |  |
| 36 |  | Temperatur VFD1 | 0.1 |  °C |
| 37 |  | Temperatur VFD1 | 25.6 |  °C |
| 38 |  | Volumenstrom VFD1 | 1 |  l/h |
| 39 |  | Volumenstrom VFD1 | 256 |  l/h |



### <a name="0010_1119_0100"></a>DFA (0x0010) <= Sol Plus SL (0x1119), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Kollektor-Temperatur \(TC\) | 0.1 |  °C |
| 1 |  | Kollektor-Temperatur \(TC\) | 25.6 |  °C |
| 2 |  | Speicher-Temperatur \(TS\) | 0.1 |  °C |
| 3 |  | Speicher-Temperatur \(TS\) | 25.6 |  °C |
| 8 |  | Wärmemenge | 1 |  Wh |
| 9 |  | Wärmemenge | 256 |  Wh |
| 10 |  | Wärmemenge | 65536 |  Wh |
| 11 |  | Wärmemenge | 16777216 |  Wh |
| 12 |  | Pumpendrehzahl \(PC\) | 1 | % |
| 14 |  | Steuerungszeit \(tc\) | 1 | % |
| 15 |  | Steuerungszeit \(tc\) | 256 | % |
| 16 |  | Softwareversion | 0.01 |  |
| 17 |  | Softwareversion | 2.56 |  |



### <a name="0010_111E_0100"></a>DFA (0x0010) <= DeltaTherm PV (0x111E), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 | 0x01 | Funktionsstatus Aus | 1 |  |
| 0 | 0x02 | Funktionsstatus Fehler | 1 |  |
| 0 | 0x04 | Funktionsstatus Bereit | 1 |  |
| 0 | 0x08 | Funktionsstatus Heizung | 1 |  |
| 0 | 0x10 | Funktionsstatus Max. Temp. | 1 |  |
| 0 | 0x20 | Funktionsstatus Lstg. reduziert | 1 |  |
| 2 |  | Leistung Überschuss | 0.001 |  W |
| 3 |  | Leistung Überschuss | 0.256 |  W |
| 4 |  | Leistung Überschuss | 65.536 |  W |
| 5 |  | Leistung Überschuss | 16777.216 |  W |
| 6 |  | Leistung Heizung | 0.001 |  W |
| 7 |  | Leistung Heizung | 0.256 |  W |
| 8 |  | Leistung Heizung | 65.536 |  W |
| 9 |  | Leistung Heizung | 16777.216 |  W |
| 10 |  | Temperatur Speicher \(Sensor 1\) | 0.1 |  °C |
| 11 |  | Temperatur Speicher \(Sensor 1\) | 25.6 |  °C |
| 12 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 13 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 14 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 15 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 16 |  | Überschuss | 1 |  Wh |
| 17 |  | Überschuss | 256 |  Wh |
| 18 |  | Überschuss | 65536 |  Wh |
| 19 |  | Überschuss | 16777216 |  Wh |
| 24 |  | Heizung | 1 |  Wh |
| 25 |  | Heizung | 256 |  Wh |
| 26 |  | Heizung | 65536 |  Wh |
| 27 |  | Heizung | 16777216 |  Wh |
| 32 |  | Betriebsstunden Heizung | 1 |  h |
| 33 |  | Betriebsstunden Heizung | 256 |  h |
| 34 |  | Betriebsstunden Heizung | 65536 |  h |
| 35 |  | Betriebsstunden Heizung | 16777216 |  h |
| 36 |  | Parameter Max. Temp. \(S1\) | 0.1 |  °C |
| 37 |  | Parameter Max. Temp. \(S1\) | 25.6 |  °C |
| 40 |  | Parameter Reserve | 1 |  W |
| 41 |  | Parameter Reserve | 256 |  W |
| 44 |  | Systemdatum | 1 |  |
| 45 |  | Systemdatum | 256 |  |
| 46 |  | Systemdatum | 65536 |  |
| 47 |  | Systemdatum | 16777216 |  |
| 48 | 0x01 | !Sensorfehler | 1 |  |
| 48 | 0x02 | !Sensormodul Bus-Kommunikation gestört | 1 |  |
| 48 | 0x04 | !Lüfterfehler | 1 |  |
| 48 | 0x08 | !Max. Temp. Regler | 1 |  |
| 48 | 0x10 | !Datum/Uhrzeit | 1 |  |
| 52 | 0x04 | !Lüfterwarnung | 1 |  |



### <a name="0010_111F_0100"></a>DFA (0x0010) <= ETHERM (0x111F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 | 0x01 | Funktionsstatus Aus | 1 |  |
| 0 | 0x02 | Funktionsstatus Fehler | 1 |  |
| 0 | 0x04 | Funktionsstatus Bereit | 1 |  |
| 0 | 0x08 | Funktionsstatus Heizung | 1 |  |
| 0 | 0x10 | Funktionsstatus Max. Temp. RL | 1 |  |
| 0 | 0x20 | Funktionsstatus Max. Temp. VL | 1 |  |
| 0 | 0x40 | Funktionsstatus Spülen | 1 |  |
| 0 | 0x80 | Funktionsstatus Nachheizung | 1 |  |
| 1 |  | Countdown Sperrung | 1 |  |
| 2 |  | Countdown Sperrung | 256 |  |
| 3 |  | Drehzahl Ladepumpe | 1 | % |
| 4 |  | Leistung Überschuss | 0.001 |  W |
| 5 |  | Leistung Überschuss | 0.256 |  W |
| 6 |  | Leistung Überschuss | 65.536 |  W |
| 7 |  | Leistung Überschuss | 16777.216 |  W |
| 8 |  | Leistung Heizung | 0.001 |  W |
| 9 |  | Leistung Heizung | 0.256 |  W |
| 10 |  | Leistung Heizung | 65.536 |  W |
| 11 |  | Leistung Heizung | 16777.216 |  W |
| 12 |  | Temperatur Vorlauf \(Sensor 1\) | 0.1 |  °C |
| 13 |  | Temperatur Vorlauf \(Sensor 1\) | 25.6 |  °C |
| 14 |  | Temperatur Rücklauf \(Sensor 2\) | 0.1 |  °C |
| 15 |  | Temperatur Rücklauf \(Sensor 2\) | 25.6 |  °C |
| 16 |  | Temperatur Speicher oben \(Sensor 3\) | 0.1 |  °C |
| 17 |  | Temperatur Speicher oben \(Sensor 3\) | 25.6 |  °C |
| 18 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 20 |  | Überschuss Wh | 1 |  Wh |
| 21 |  | Überschuss Wh | 256 |  Wh |
| 22 |  | Überschuss Wh | 65536 |  Wh |
| 23 |  | Überschuss Wh | 16777216 |  Wh |
| 28 |  | Heizung Wh | 1 |  Wh |
| 29 |  | Heizung Wh | 256 |  Wh |
| 30 |  | Heizung Wh | 65536 |  Wh |
| 31 |  | Heizung Wh | 16777216 |  Wh |
| 36 |  | Betriebsstunden Heizung | 1 |  h |
| 37 |  | Betriebsstunden Heizung | 256 |  h |
| 38 |  | Betriebsstunden Heizung | 65536 |  h |
| 39 |  | Betriebsstunden Heizung | 16777216 |  h |
| 40 |  | Parameter Zieltemperatur | 0.1 |  °C |
| 41 |  | Parameter Zieltemperatur | 25.6 |  °C |
| 42 |  | Drehzahl Relais 2 | 1 | % |
| 44 |  | Parameter Reserve | 1 |  W |
| 45 |  | Parameter Reserve | 256 |  W |
| 48 | 0x01 | !Sensorfehler Leitungsbruch | 1 |  |
| 48 | 0x02 | !Sensorfehler Kurzschluss | 1 |  |
| 49 | 0x20 | !Sensormodul Bus-Kommunikation gestört | 1 |  |
| 49 | 0x40 | !Powermodul Bus-Kommunikation gestört | 1 |  |
| 52 |  | Systemdatum | 1 |  |
| 53 |  | Systemdatum | 256 |  |
| 54 |  | Systemdatum | 65536 |  |
| 55 |  | Systemdatum | 16777216 |  |
| 56 |  | Betriebsstunden Relais 2 | 1 |  h |
| 57 |  | Betriebsstunden Relais 2 | 256 |  h |
| 58 |  | Betriebsstunden Relais 2 | 65536 |  h |
| 59 |  | Betriebsstunden Relais 2 | 16777216 |  h |
| 60 |  | Betriebsstunden Nachheizung | 1 |  h |
| 61 |  | Betriebsstunden Nachheizung | 256 |  h |
| 62 |  | Betriebsstunden Nachheizung | 65536 |  h |
| 63 |  | Betriebsstunden Nachheizung | 16777216 |  h |



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



### <a name="0010_1121_0100"></a>DFA (0x0010) <= DeltaSol CS2 (0x1121), command 0x0100

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
| 10 |  | Volumenstrom | 0.1 |  l/min |
| 11 |  | Volumenstrom | 25.6 |  l/min |
| 12 |  | Drehzahl Relais | 1 | % |
| 14 |  | Betriebsstunden Relais | 1 |  h |
| 15 |  | Betriebsstunden Relais | 256 |  h |
| 16 |  | UnitType | 1 |  |
| 18 | 0x01 | Sensor 1 defekt | 1 |  |
| 18 | 0x02 | Sensor 2 defekt | 1 |  |
| 18 | 0x04 | Sensor 3 defekt | 1 |  |
| 18 | 0x08 | Sensor 4 defekt | 1 |  |
| 18 |  | ErrorMask | 1 |  |
| 19 |  | ErrorMask | 256 |  |
| 20 |  | Statusmask | 1 |  |
| 21 |  | Statusmask | 256 |  |
| 22 |  | Statusmask | 65536 |  |
| 23 |  | Statusmask | 16777216 |  |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 65536 |  Wh |
| 27 |  | Wärmemenge | 16777216 |  Wh |
| 28 |  | SW-Version | 0.01 |  |
| 29 |  | SW-Version | 2.56 |  |



### <a name="0010_1122_0100"></a>DFA (0x0010) <= DeltaSol CS4 (0x1122), command 0x0100

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



### <a name="0010_1123_0100"></a>DFA (0x0010) <= ETHERM 2 (0x1123), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 1 |  | Countdown Sperrung | 1 |  |
| 2 |  | Countdown Sperrung | 256 |  |
| 3 |  | Drehzahl Ladepumpe | 1 | % |
| 4 |  | Leistung Überschuss | 0.001 |  W |
| 5 |  | Leistung Überschuss | 0.256 |  W |
| 6 |  | Leistung Überschuss | 65.536 |  W |
| 7 |  | Leistung Überschuss | 16777.216 |  W |
| 12 |  | Temperatur Vorlauf \(Sensor 1\) | 0.1 |  °C |
| 13 |  | Temperatur Vorlauf \(Sensor 1\) | 25.6 |  °C |
| 14 |  | Temperatur Rücklauf \(Sensor 2\) | 0.1 |  °C |
| 15 |  | Temperatur Rücklauf \(Sensor 2\) | 25.6 |  °C |
| 16 |  | Temperatur Speicher oben \(Sensor 3\) | 0.1 |  °C |
| 17 |  | Temperatur Speicher oben \(Sensor 3\) | 25.6 |  °C |
| 18 |  | Temperatur Sensor 4 | 0.1 |  °C |
| 19 |  | Temperatur Sensor 4 | 25.6 |  °C |
| 20 |  | Überschuss Wh | 1 |  Wh |
| 21 |  | Überschuss Wh | 256 |  Wh |
| 22 |  | Überschuss Wh | 65536 |  Wh |
| 23 |  | Überschuss Wh | 16777216 |  Wh |
| 28 |  | Heizung Wh | 1 |  Wh |
| 29 |  | Heizung Wh | 256 |  Wh |
| 30 |  | Heizung Wh | 65536 |  Wh |
| 31 |  | Heizung Wh | 16777216 |  Wh |
| 36 |  | Betriebsstunden Heizung | 1 |  h |
| 37 |  | Betriebsstunden Heizung | 256 |  h |
| 38 |  | Betriebsstunden Heizung | 65536 |  h |
| 39 |  | Betriebsstunden Heizung | 16777216 |  h |
| 40 |  | Parameter Zieltemperatur | 0.1 |  °C |
| 41 |  | Parameter Zieltemperatur | 25.6 |  °C |
| 42 |  | Drehzahl Relais 2 | 1 | % |
| 43 |  | 0-10V In | 0.1 |  V |
| 44 |  | Parameter Reserve | 1 |  W |
| 45 |  | Parameter Reserve | 256 |  W |
| 48 | 0x01 | !Sensorfehler Leitungsbruch | 1 |  |
| 48 | 0x02 | !Sensorfehler Kurzschluss | 1 |  |
| 49 | 0x20 | !Sensormodul Bus-Kommunikation gestört | 1 |  |
| 49 | 0x40 | !Powermodul Bus-Kommunikation gestört | 1 |  |
| 52 |  | Systemdatum | 1 |  |
| 53 |  | Systemdatum | 256 |  |
| 54 |  | Systemdatum | 65536 |  |
| 55 |  | Systemdatum | 16777216 |  |
| 56 |  | Betriebsstunden Relais 2 | 1 |  h |
| 57 |  | Betriebsstunden Relais 2 | 256 |  h |
| 58 |  | Betriebsstunden Relais 2 | 65536 |  h |
| 59 |  | Betriebsstunden Relais 2 | 16777216 |  h |
| 60 |  | Betriebsstunden Nachheizung | 1 |  h |
| 61 |  | Betriebsstunden Nachheizung | 256 |  h |
| 62 |  | Betriebsstunden Nachheizung | 65536 |  h |
| 63 |  | Betriebsstunden Nachheizung | 16777216 |  h |
| 64 | 0x01 | Funktionsstatus Aus | 1 |  |
| 64 | 0x02 | Funktionsstatus Fehler | 1 |  |
| 64 | 0x04 | Funktionsstatus Bereit | 1 |  |
| 64 | 0x08 | Funktionsstatus Heizung | 1 |  |
| 64 | 0x10 | Funktionsstatus Max. Temp. RL | 1 |  |
| 64 | 0x20 | Funktionsstatus Max. Temp. VL | 1 |  |
| 64 | 0x40 | Funktionsstatus Spülen | 1 |  |
| 64 | 0x80 | Funktionsstatus Nachheizung | 1 |  |
| 65 | 0x01 | Funktionsstatus SmartRemote aus | 1 |  |
| 65 | 0x02 | Funktionsstatus SmartRemote Verbraucher extern | 1 |  |
| 65 | 0x04 | Funktionsstatus SmartRemote ein | 1 |  |
| 68 |  | Leistung Verbraucher extern | 1 |  W |
| 69 |  | Leistung Verbraucher extern | 256 |  W |
| 70 |  | Drehzahl Relais 3 | 1 | % |
| 71 |  | Drehzahl Relais 4 | 1 | % |
| 72 | 0x04 | RTC Fehler | 1 |  |
| 72 | 0x80 | Sensormodul wird verwendet | 1 |  |
| 74 | 0x01 | Heizstab 0 aktiv | 1 |  |
| 74 | 0x20 | Wechselrichter Aktiv | 1 |  |
| 76 |  | Leistung Heizung | 0.001 |  W |
| 77 |  | Leistung Heizung | 0.256 |  W |
| 78 |  | Leistung Heizung | 65.536 |  W |
| 79 |  | Leistung Heizung | 16777.216 |  W |
| 80 | 0x01 | Zustand Sensor 5 | 1 |  |
| 84 |  | Betriebsstunden Relais 3 | 1 |  h |
| 85 |  | Betriebsstunden Relais 3 | 256 |  h |
| 86 |  | Betriebsstunden Relais 3 | 65536 |  h |
| 87 |  | Betriebsstunden Relais 3 | 16777216 |  h |
| 88 |  | Betriebsstunden Relais 4 | 1 |  h |
| 89 |  | Betriebsstunden Relais 4 | 256 |  h |
| 90 |  | Betriebsstunden Relais 4 | 65536 |  h |
| 91 |  | Betriebsstunden Relais 4 | 16777216 |  h |



### <a name="0010_1127_0100"></a>DFA (0x0010) <= DeltaSol AL E HE (0x1127), command 0x0100

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
| 8 |  | Temperatur GFD | 0.1 |  °C |
| 9 |  | Temperatur GFD | 25.6 |  °C |
| 10 |  | Volumenstrom 1 | 1 |  l/h |
| 11 |  | Volumenstrom 1 | 256 |  l/h |
| 12 |  | Drehzahl Relais 1 | 1 | % |
| 14 |  | Betriebsstunden Relais 1 | 1 |  h |
| 15 |  | Betriebsstunden Relais 1 | 256 |  h |
| 16 |  | Drehzahl Relais 2 | 1 | % |
| 18 |  | Betriebsstunden Relais 2 | 1 |  h |
| 19 |  | Betriebsstunden Relais 2 | 256 |  h |
| 20 |  | PFB1 Duty | 0.001 | % |
| 21 |  | PFB1 Duty | 0.256 | % |
| 22 |  | PFB1 Duty | 65.536 | % |
| 23 |  | PFB1 Duty | 16777.216 | % |
| 24 |  | PFB1 Freq. | 0.001 |  Hz |
| 25 |  | PFB1 Freq. | 0.256 |  Hz |
| 26 |  | PFB1 Freq. | 65.536 |  Hz |
| 27 |  | PFB1 Freq. | 16777.216 |  Hz |
| 28 |  | Wärmemenge | 1 |  Wh |
| 29 |  | Wärmemenge | 256 |  Wh |
| 30 |  | Wärmemenge | 65536 |  Wh |
| 31 |  | Wärmemenge | 16777216 |  Wh |
| 32 | 0x01 | Sensor 1 defekt | 1 |  |
| 32 | 0x02 | Sensor 2 defekt | 1 |  |
| 32 | 0x04 | Sensor 3 defekt | 1 |  |
| 32 | 0x08 | Sensor 4 defekt | 1 |  |
| 32 | 0x10 | GFD defekt | 1 |  |
| 32 | 0x20 | PFB1 defekt | 1 |  |
| 32 |  | ErrorMask | 1 |  |
| 33 |  | ErrorMask | 256 |  |
| 34 |  | Systemzeit | 1 |  |
| 35 |  | Systemzeit | 256 |  |
| 36 |  | Statusmask | 1 |  |
| 37 |  | Statusmask | 256 |  |
| 38 |  | Statusmask | 65536 |  |
| 39 |  | Statusmask | 16777216 |  |
| 40 |  | UnitType | 1 |  |
| 42 |  | SW Version | 0.01 |  |
| 43 |  | SW Version | 2.56 |  |



### <a name="0010_1140_0100"></a>DFA (0x0010) <= DeltaTherm HC mini \[Heizkreis 1\] (0x1140), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Heizung_Heizkreis1_TVorlaufSoll_C | 0.1 |  °C |
| 1 |  | Heizung_Heizkreis1_TVorlaufSoll_C | 25.6 |  °C |
| 2 |  | Heizung_Heizkreis1_Betriebsstatus | 1 |  |
| 3 |  | Heizung_Heizkreis1_Betriebsart | 1 |  |
| 4 |  | Heizung_Heizkreis1_Brennerstarts | 1 |  |
| 5 |  | Heizung_Heizkreis1_Brennerstarts | 256 |  |
| 6 |  | Heizung_Heizkreis1_Brennerstarts | 65536 |  |
| 7 |  | Heizung_Heizkreis1_Brennerstarts | 16777216 |  |



### <a name="0010_1150_0100"></a>DFA (0x0010) <= Kioto FWS (0x1150), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Sensor S1 | 0.1 |  °C |
| 1 |  | Sensor S1 | 25.6 |  °C |
| 2 |  | Sensor S2 | 0.1 |  °C |
| 3 |  | Sensor S2 | 25.6 |  °C |
| 4 |  | Sensor S3 | 0.1 |  °C |
| 5 |  | Sensor S3 | 25.6 |  °C |
| 6 |  | Sensor S4 T | 0.1 |  °C |
| 7 |  | Sensor S4 T | 25.6 |  °C |
| 8 |  | Sensor S4 / dV | 1 |  l/h |
| 9 |  | Sensor S4 / dV | 256 |  l/h |
| 10 |  | Sensor S4 / dV | 65536 |  l/h |
| 11 |  | Sensor S4 / dV | 16777216 |  l/h |
| 12 |  | Sensor S5 | 0.1 |  °C |
| 13 |  | Sensor S5 | 25.6 |  °C |
| 14 |  | Poti | 0.1 |  °C |
| 15 |  | Poti | 25.6 |  °C |
| 16 |  | Primärpumpe | 0.1 | % |
| 17 |  | Primärpumpe | 25.6 | % |
| 18 |  | Mischventil | 1 | % |
| 19 |  | Mischventil | 256 | % |
| 20 |  | Zirkulationspumpe | 1 | % |
| 21 |  | WW-Solltemperatur | 0.1 |  °C |
| 22 |  | WW-Solltemperatur | 25.6 |  °C |
| 24 |  | Zirkulation Einschaltz. | 1 |  s |
| 25 |  | Zirkulation Einschaltz. | 256 |  s |
| 26 |  | Zirkulation Sperrzeit | 1 |  s |
| 27 |  | Zirkulation Sperrzeit | 256 |  s |
| 28 |  | Therm. Desinfektion | 1 |  s |
| 29 |  | Therm. Desinfektion | 256 |  s |
| 30 |  | DipSwitch | 1 |  |
| 32 |  | Betriebszeit Primärp. | 1 |  s |
| 33 |  | Betriebszeit Primärp. | 256 |  s |
| 34 |  | Betriebszeit Primärp. | 65536 |  s |
| 35 |  | Betriebszeit Primärp. | 16777216 |  s |
| 36 |  | Betriebszeit Zirkulation | 1 |  s |
| 37 |  | Betriebszeit Zirkulation | 256 |  s |
| 38 |  | Betriebszeit Zirkulation | 65536 |  s |
| 39 |  | Betriebszeit Zirkulation | 16777216 |  s |
| 40 |  | PWM A | 1 | % |
| 41 |  | Kennlinie | 1 |  |
| 42 |  | Kennlinie | 256 |  |
| 44 |  | PID P-Anteil | 0.001 |  |
| 45 |  | PID P-Anteil | 0.256 |  |
| 46 |  | PID P-Anteil | 65.536 |  |
| 47 |  | PID P-Anteil | 16777.216 |  |
| 48 |  | PID I-Anteil | 0.001 |  |
| 49 |  | PID I-Anteil | 0.256 |  |
| 50 |  | PID I-Anteil | 65.536 |  |
| 51 |  | PID I-Anteil | 16777.216 |  |
| 52 |  | PID D-Anteil | 0.001 |  |
| 53 |  | PID D-Anteil | 0.256 |  |
| 54 |  | PID D-Anteil | 65.536 |  |
| 55 |  | PID D-Anteil | 16777.216 |  |
| 56 |  | Systemdatum | 1 |  |
| 57 |  | Systemdatum | 256 |  |
| 58 |  | Systemdatum | 65536 |  |
| 59 |  | Systemdatum | 16777216 |  |



### <a name="0010_1160_0100"></a>DFA (0x0010) <= MFR \[Regler\] (0x1160), command 0x0100

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



### <a name="0010_1161_0100"></a>DFA (0x0010) <= MFR \[Module\] (0x1161), command 0x0100

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



### <a name="0010_1162_0100"></a>DFA (0x0010) <= MFR \[Frischwasser\] (0x1162), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Warmwassertemperatur | 0.1 |  °C |
| 1 |  | Warmwassertemperatur | 25.6 |  °C |
| 2 |  | Warmwassersoll | 0.1 |  °C |
| 3 |  | Warmwassersoll | 25.6 |  °C |
| 4 |  | Zapfvolumenstrom | 0.1 |  l/min |
| 5 |  | Zapfvolumenstrom | 25.6 |  l/min |
| 6 |  | Zapfvolumenstrom | 6553.6 |  l/min |
| 7 |  | Zapfvolumenstrom | 1677721.6 |  l/min |
| 8 |  | Speichervorlauf | 0.1 |  °C |
| 9 |  | Speichervorlauf | 25.6 |  °C |
| 10 |  | Drehzahl Primärpumpe | 1 | % |
| 11 |  | Drehzahl Zirkulation | 1 | % |
| 12 |  | Zapfmenge gesamt | 0.001 |  m³ |
| 13 |  | Zapfmenge gesamt | 0.256 |  m³ |
| 14 |  | Zapfmenge gesamt | 65.536 |  m³ |
| 15 |  | Zapfmenge gesamt | 16777.216 |  m³ |
| 16 |  | Status | 1 |  |
| 17 |  | Status | 256 |  |



### <a name="0010_1200_0100"></a>DFA (0x0010) <= MFR \[WMZ\] (0x1200 - 0x120F), command 0x0100

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



### <a name="0010_1210_0100"></a>DFA (0x0010) <= MFR \[Heizkreis\] (0x1210 - 0x121F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_1220_0100"></a>DFA (0x0010) <= Regudis H-HT \[Übergabestation\] (0x1220 - 0x122F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Übergabestation Status | 1 |  |
| 1 |  | Primärkreis Stellantrieb | 1 | % |
| 2 |  | Primärkreis Vorlauftemperatur | 0.1 |  °C |
| 3 |  | Primärkreis Vorlauftemperatur | 25.6 |  °C |
| 4 |  | Primärkreis Rücklauftemperatur | 0.1 |  °C |
| 5 |  | Primärkreis Rücklauftemperatur | 25.6 |  °C |
| 6 |  | Primärkreis Rücklaufmaximaltemperatur | 0.1 |  °C |
| 7 |  | Primärkreis Rücklaufmaximaltemperatur | 25.6 |  °C |
| 8 |  | Sekundärkreis Vorlauftemperatur | 0.1 |  °C |
| 9 |  | Sekundärkreis Vorlauftemperatur | 25.6 |  °C |
| 10 |  | Sekundärkreis Vorlaufsolltemperatur | 0.1 |  °C |
| 11 |  | Sekundärkreis Vorlaufsolltemperatur | 25.6 |  °C |
| 12 |  | Sekundärkreis Rücklauftemperatur | 0.1 |  °C |
| 13 |  | Sekundärkreis Rücklauftemperatur | 25.6 |  °C |



### <a name="0010_1230_0100"></a>DFA (0x0010) <= Regudis H-HT \[BW-Erwärmung\] (0x1230 - 0x123F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Status | 1 |  |
| 1 |  | Ladepumpe | 1 | % |
| 2 |  | NH1 | 0.1 |  °C |
| 3 |  | NH1 | 25.6 |  °C |
| 4 |  | NH2 | 0.1 |  °C |
| 5 |  | NH2 | 25.6 |  °C |
| 6 |  | Ventil | 1 | % |
| 7 |  | Anforderung | 1 | % |
| 8 |  | TEin | 0.1 |  °C |
| 9 |  | TEin | 25.6 |  °C |
| 10 |  | TAus | 0.1 |  °C |
| 11 |  | TAus | 25.6 |  °C |



### <a name="0010_1240_0100"></a>DFA (0x0010) <= Wagner Sungo 100 \[Regler\] (0x1240), command 0x0100

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
| 22 |  | Drehzahl Relais 3 | 1 | % |
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



### <a name="0010_1241_0100"></a>DFA (0x0010) <= Wagner Sungo 100 \[WMZ1\] (0x1241), command 0x0100

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



### <a name="0010_1250_0100"></a>DFA (0x0010) <= Viessmann Vitotrans 353 2017 (0x1250), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Systemdatum | 1 |  |
| 1 |  | Systemdatum | 256 |  |
| 2 |  | Systemdatum | 65536 |  |
| 3 |  | Systemdatum | 16777216 |  |
| 4 |  | T-VL | 0.1 |  °C |
| 5 |  | T-VL | 25.6 |  °C |
| 6 |  | T-WW | 0.1 |  °C |
| 7 |  | T-WW | 25.6 |  °C |
| 8 |  | T-KW | 0.1 |  °C |
| 9 |  | T-KW | 25.6 |  °C |
| 10 |  | S4 | 0.1 |  °C |
| 11 |  | S4 | 25.6 |  °C |
| 12 |  | S5 | 0.1 |  °C |
| 13 |  | S5 | 25.6 |  °C |
| 16 |  | V-US | 1 |  l/h |
| 17 |  | V-US | 256 |  l/h |
| 18 |  | V-US | 65536 |  l/h |
| 19 |  | V-US | 16777216 |  l/h |
| 20 |  | V-Impuls | 1 |  l/h |
| 21 |  | V-Impuls | 256 |  l/h |
| 22 |  | V-Impuls | 65536 |  l/h |
| 23 |  | V-Impuls | 16777216 |  l/h |
| 24 |  | PWM P | 1 | % |
| 25 |  | PWM 28 | 1 | % |
| 26 |  | Relais 157 | 1 |  |
| 27 |  | Relais 28 | 1 |  |
| 28 |  | PWM P | 1 |  s |
| 29 |  | PWM P | 256 |  s |
| 30 |  | PWM P | 65536 |  s |
| 31 |  | PWM P | 16777216 |  s |
| 32 |  | PWM 28 | 1 |  s |
| 33 |  | PWM 28 | 256 |  s |
| 34 |  | PWM 28 | 65536 |  s |
| 35 |  | PWM 28 | 16777216 |  s |
| 36 |  | R2 | 1 |  |
| 44 |  | Energie Heute | 1 |  Wh |
| 45 |  | Energie Heute | 256 |  Wh |
| 46 |  | Energie Heute | 65536 |  Wh |
| 47 |  | Energie Heute | 16777216 |  Wh |
| 48 |  | Energie Gesamt | 1 |  Wh |
| 49 |  | Energie Gesamt | 256 |  Wh |
| 50 |  | Energie Gesamt | 65536 |  Wh |
| 51 |  | Energie Gesamt | 16777216 |  Wh |
| 64 |  | Version | 0.01 |  |
| 65 |  | Version | 2.56 |  |
| 66 |  | Reglervariante | 1 |  |
| 80 |  | Fehler | 1 |  |
| 81 |  | Fehler | 256 |  |
| 82 |  | Fehler | 65536 |  |
| 83 |  | Fehler | 16777216 |  |
| 84 |  | Zapfmenge Gesamt | 1 |  l |
| 85 |  | Zapfmenge Gesamt | 256 |  l |
| 86 |  | Zapfmenge Gesamt | 65536 |  l |
| 87 |  | Zapfmenge Gesamt | 16777216 |  l |
| 88 |  | Gesamtbetrieb | 1 |  s |
| 89 |  | Gesamtbetrieb | 256 |  s |
| 90 |  | Gesamtbetrieb | 65536 |  s |
| 91 |  | Gesamtbetrieb | 16777216 |  s |



### <a name="0010_1260_0100"></a>DFA (0x0010) <= Viessmann Vitotrans 353 2017 Broadcast (0x1260), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | KS3 | 0.1 |  °C |
| 1 |  | KS3 | 25.6 |  °C |
| 2 |  | S4 | 0.1 |  °C |
| 3 |  | S4 | 25.6 |  °C |
| 4 |  | PWM 28 | 1 | % |
| 5 |  | Relais 157 | 1 |  |
| 6 |  | Relais 28 | 1 |  |
| 8 |  | PWM 28 | 1 |  s |
| 9 |  | PWM 28 | 256 |  s |
| 10 |  | PWM 28 | 65536 |  s |
| 11 |  | PWM 28 | 16777216 |  s |
| 12 |  | R2 | 1 |  |
| 16 |  | Energie Gesamt | 1 |  Wh |
| 17 |  | Energie Gesamt | 256 |  Wh |
| 18 |  | Energie Gesamt | 65536 |  Wh |
| 19 |  | Energie Gesamt | 16777216 |  Wh |
| 20 |  | Zapfmenge Gesamt | 1 |  l |
| 21 |  | Zapfmenge Gesamt | 256 |  l |
| 22 |  | Zapfmenge Gesamt | 65536 |  l |
| 23 |  | Zapfmenge Gesamt | 16777216 |  l |
| 24 |  | Betriebszeit Gesamt | 1 |  s |
| 25 |  | Betriebszeit Gesamt | 256 |  s |
| 26 |  | Betriebszeit Gesamt | 65536 |  s |
| 27 |  | Betriebszeit Gesamt | 16777216 |  s |
| 28 |  | Systemdatum | 1 |  |
| 29 |  | Systemdatum | 256 |  |
| 30 |  | Systemdatum | 65536 |  |
| 31 |  | Systemdatum | 16777216 |  |
| 32 |  | S5 | 0.1 |  °C |
| 33 |  | S5 | 25.6 |  °C |



### <a name="0010_1410_0100"></a>DFA (0x0010) <= THERMUfloor ER (0x1410), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Primär Rücklauftemperatur Sensor 1 | 0.1 |  °C |
| 1 |  | Primär Rücklauftemperatur Sensor 1 | 25.6 |  °C |
| 2 |  | Sekundär Vorlauftemperatur Sensor 2 | 0.1 |  °C |
| 3 |  | Sekundär Vorlauftemperatur Sensor 2 | 25.6 |  °C |
| 4 |  | Außentemperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Außentemperatur Sensor 3 | 25.6 |  °C |
| 34 |  | Primär Vorlauftemperatur Ga2 | 0.1 |  °C |
| 35 |  | Primär Vorlauftemperatur Ga2 | 25.6 |  °C |
| 36 |  | Sekundär Rücklauftemperatur Gd1 | 0.1 |  °C |
| 37 |  | Sekundär Rücklauftemperatur Gd1 | 25.6 |  °C |
| 40 |  | Kesselstörung Sensor 4 | 1 |  |
| 41 |  | Ölstand Sensor Ga1 | 1 | % |
| 46 |  | Primär Druck Ga2 | 0.01 |  bar |
| 47 |  | Primär Druck Ga2 | 2.56 |  bar |
| 48 |  | Sekundär Druck Gd1 | 0.01 |  bar |
| 49 |  | Sekundär Druck Gd1 | 2.56 |  bar |
| 55 |  | Luftfeuchtigkeit Gd2 | 1 | % |
| 56 |  | Relais 1 | 1 | % |
| 57 |  | Relais 2 | 1 | % |
| 58 |  | Relais 3 | 1 | % |
| 69 |  | Relais 4 | 1 | % |
| 72 |  | Systemdatum | 1 |  |
| 73 |  | Systemdatum | 256 |  |
| 74 |  | Systemdatum | 65536 |  |
| 75 |  | Systemdatum | 16777216 |  |
| 76 |  | Fehlermaske | 1 |  |
| 77 |  | Fehlermaske | 256 |  |
| 78 |  | Fehlermaske | 65536 |  |
| 79 |  | Fehlermaske | 16777216 |  |
| 80 |  | PWM A | 1 | % |
| 81 |  | Kesselanforderung 0-10 V | 1 | % |
| 84 |  | Letztes Ereignis \(L. E.\) | 1 |  |
| 88 |  | L. E. Fehlermaske | 1 |  |
| 89 |  | L. E. Fehlermaske | 256 |  |
| 90 |  | L. E. Fehlermaske | 65536 |  |
| 91 |  | L. E. Fehlermaske | 16777216 |  |
| 92 |  | L. E. Zeitstempel | 1 |  |
| 93 |  | L. E. Zeitstempel | 256 |  |
| 94 |  | L. E. Zeitstempel | 65536 |  |
| 95 |  | L. E. Zeitstempel | 16777216 |  |



### <a name="0010_1420_0100"></a>DFA (0x0010) <= Apricus DeltaSol AL E HE (0x1420), command 0x0100

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
| 8 |  | Temperatur GFD | 0.1 |  °C |
| 9 |  | Temperatur GFD | 25.6 |  °C |
| 10 |  | Volumenstrom 1 | 1 |  l/h |
| 11 |  | Volumenstrom 1 | 256 |  l/h |
| 12 |  | Drehzahl Relais 1 | 1 | % |
| 14 |  | Betriebsstunden Relais 1 | 1 |  h |
| 15 |  | Betriebsstunden Relais 1 | 256 |  h |
| 16 |  | Drehzahl Relais 2 | 1 | % |
| 18 |  | Betriebsstunden Relais 2 | 1 |  h |
| 19 |  | Betriebsstunden Relais 2 | 256 |  h |
| 20 |  | PFB1 Duty | 0.001 | % |
| 21 |  | PFB1 Duty | 0.256 | % |
| 22 |  | PFB1 Duty | 65.536 | % |
| 23 |  | PFB1 Duty | 16777.216 | % |
| 24 |  | PFB1 Freq. | 0.001 |  Hz |
| 25 |  | PFB1 Freq. | 0.256 |  Hz |
| 26 |  | PFB1 Freq. | 65.536 |  Hz |
| 27 |  | PFB1 Freq. | 16777.216 |  Hz |
| 28 |  | Wärmemenge | 1 |  Wh |
| 29 |  | Wärmemenge | 256 |  Wh |
| 30 |  | Wärmemenge | 65536 |  Wh |
| 31 |  | Wärmemenge | 16777216 |  Wh |
| 32 | 0x01 | Sensor 1 defekt | 1 |  |
| 32 | 0x02 | Sensor 2 defekt | 1 |  |
| 32 | 0x04 | Sensor 3 defekt | 1 |  |
| 32 | 0x08 | Sensor 4 defekt | 1 |  |
| 32 | 0x10 | GFD defekt | 1 |  |
| 32 | 0x20 | PFB1 defekt | 1 |  |
| 32 |  | ErrorMask | 1 |  |
| 33 |  | ErrorMask | 256 |  |
| 34 |  | Systemzeit | 1 |  |
| 35 |  | Systemzeit | 256 |  |
| 36 |  | Statusmask | 1 |  |
| 37 |  | Statusmask | 256 |  |
| 38 |  | Statusmask | 65536 |  |
| 39 |  | Statusmask | 16777216 |  |
| 40 |  | UnitType | 1 |  |
| 42 |  | SW Version | 0.01 |  |
| 43 |  | SW Version | 2.56 |  |



### <a name="0010_1510_0100"></a>DFA (0x0010) <= DeltaSol Fresh 2018 (0x1510), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Systemdatum | 1 |  |
| 5 |  | Systemdatum | 256 |  |
| 6 |  | Systemdatum | 65536 |  |
| 7 |  | Systemdatum | 16777216 |  |
| 13 |  | Warmwasser: Zustand | 1 |  |
| 16 |  | Warmwasser: Primärpumpendrehzahl | 0.1 | % |
| 17 |  | Warmwasser: Primärpumpendrehzahl | 25.6 | % |
| 18 |  | Warmwasser: Solltemperatur | 0.1 |  °C |
| 19 |  | Warmwasser: Solltemperatur | 25.6 |  °C |
| 32 |  | Zirkulation: Pumpendrehzahl | 0.1 | % |
| 33 |  | Zirkulation: Pumpendrehzahl | 25.6 | % |
| 34 |  | Zirkulation: dT Leitung | 0.1 |  K |
| 35 |  | Zirkulation: dT Leitung | 25.6 |  K |
| 38 |  | Desinfektion: Zustand | 1 |  |
| 40 |  | Desinfektion: Letzte Desinfektion | 1 |  |
| 41 |  | Desinfektion: Letzte Desinfektion | 256 |  |
| 42 |  | Desinfektion: Letzte Desinfektion | 65536 |  |
| 43 |  | Desinfektion: Letzte Desinfektion | 16777216 |  |
| 51 |  | RL-Einschichtung: Ventilzustand | 1 |  |
| 56 |  | Fehlerrelais: Zustand | 1 |  |
| 64 |  | Sensor: S1 | 0.1 |  °C |
| 65 |  | Sensor: S1 | 25.6 |  °C |
| 66 |  | Sensor: S2 | 0.1 |  °C |
| 67 |  | Sensor: S2 | 25.6 |  °C |
| 68 |  | Sensor: S3 | 0.1 |  °C |
| 69 |  | Sensor: S3 | 25.6 |  °C |
| 70 |  | Sensor: S4 | 0.1 |  °C |
| 71 |  | Sensor: S4 | 25.6 |  °C |
| 72 |  | Sensor: S5 | 0.1 |  °C |
| 73 |  | Sensor: S5 | 25.6 |  °C |
| 74 |  | Sensor: S6 | 0.1 |  °C |
| 75 |  | Sensor: S6 | 25.6 |  °C |
| 76 |  | Sensor: S7 | 0.1 |  °C |
| 77 |  | Sensor: S7 | 25.6 |  °C |
| 84 |  | Sensor: S9 Volumenstrom | 1 |  l/h |
| 85 |  | Sensor: S9 Volumenstrom | 256 |  l/h |
| 86 |  | Sensor: S9 Volumenstrom | 65536 |  l/h |
| 87 |  | Sensor: S9 Volumenstrom | 16777216 |  l/h |



### <a name="0010_1711_0100"></a>DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0100

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
| 96 | 0x01 | Fehler: Sensorleitung unterbrochen | 1 |  |
| 96 | 0x02 | Fehler: Sensorleitung kurzgeschlossen | 1 |  |
| 96 | 0x20 | Fehler: Volumstromüberwachung | 1 |  |
| 96 | 0x40 | Fehler: Überdruck | 1 |  |
| 96 | 0x80 | Fehler: Minderdruck | 1 |  |
| 96 |  | Fehlermaske | 1 |  |
| 97 | 0x02 | Fehler: Datenspeicher | 1 |  |
| 97 | 0x04 | Fehler: Echtzeituhr | 1 |  |
| 97 | 0x10 | Fehler: Zwillingspumpe | 1 |  |
| 97 | 0x20 | Fehler: HK-Kühlung unter Vorlaufminimaltemperatur | 1 |  |
| 97 | 0x40 | Fehler: Thermische Desinfektion abgebrochen | 1 |  |
| 97 |  | Fehlermaske | 256 |  |
| 98 |  | Fehlermaske | 65536 |  |
| 99 |  | Fehlermaske | 16777216 |  |
| 100 |  | Ausgang A | 1 | % |
| 101 |  | Ausgang B | 1 | % |
| 102 |  | Ausgang C | 1 | % |
| 103 |  | Ausgang D | 1 | % |
| 104 |  | Volumenstrom Sensor 21 | 1 |  l/h |
| 105 |  | Volumenstrom Sensor 21 | 256 |  l/h |
| 106 |  | Volumenstrom Sensor 21 | 65536 |  l/h |
| 107 |  | Volumenstrom Sensor 21 | 16777216 |  l/h |



### <a name="0010_1711_0101"></a>DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0101

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 | 0x04 | Warnung: ΔT zu hoch | 1 |  |
| 0 | 0x08 | Warnung: Nachtzirkulation | 1 |  |
| 0 | 0x10 | Warnung: Vorlauf/Rücklauf vertauscht | 1 |  |
| 0 |  | Warnungsmaske | 1 |  |
| 1 | 0x08 | Warnung: SD-Karte | 1 |  |
| 1 |  | Warnungsmaske | 256 |  |
| 2 |  | Warnungsmaske | 65536 |  |
| 3 |  | Warnungsmaske | 16777216 |  |
| 4 |  | Luftfeuchtigkeit Sensor 17 | 1 | %RH |
| 5 |  | Luftfeuchtigkeit Sensor 18 | 1 | %RH |



### <a name="0010_1711_0140"></a>DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0140

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Anzahl TD-Funktionen | 1 |  |
| 1 |  | Nummer letzte erfolgreiche TD | 1 |  |
| 2 |  | Nummer letzte abgebrochene TD | 1 |  |
| 4 |  | Maske erfolgreiche TD | 1 |  |
| 5 |  | Maske erfolgreiche TD | 256 |  |
| 6 |  | Maske abgebrochene TD | 1 |  |
| 7 |  | Maske abgebrochene TD | 256 |  |
| 8 |  | Zeitstempel letzte erfolgreiche TD | 1 |  |
| 9 |  | Zeitstempel letzte erfolgreiche TD | 256 |  |
| 10 |  | Zeitstempel letzte erfolgreiche TD | 65536 |  |
| 11 |  | Zeitstempel letzte erfolgreiche TD | 16777216 |  |
| 12 |  | Zeitstempel letzte abgebrochene TD | 1 |  |
| 13 |  | Zeitstempel letzte abgebrochene TD | 256 |  |
| 14 |  | Zeitstempel letzte abgebrochene TD | 65536 |  |
| 15 |  | Zeitstempel letzte abgebrochene TD | 16777216 |  |



### <a name="0010_1720_0100"></a>DFA (0x0010) <= DeltaTherm HC max \[Heizkreis\] (0x1720 - 0x172F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_1730_0100"></a>DFA (0x0010) <= DeltaTherm HC max \[WMZ\] (0x1730 - 0x173F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 4 |  | Leistung | 1 |  W |
| 5 |  | Leistung | 256 |  W |
| 6 |  | Leistung | 65536 |  W |
| 7 |  | Leistung | 16777216 |  W |
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
| 20 |  | Wärmemenge Monat | 1 |  Wh |
| 21 |  | Wärmemenge Monat | 256 |  Wh |
| 22 |  | Wärmemenge Monat | 65536 |  Wh |
| 23 |  | Wärmemenge Monat | 16777216 |  Wh |
| 24 |  | Volumen heute | 1 |  l |
| 25 |  | Volumen heute | 256 |  l |
| 26 |  | Volumen heute | 65536 |  l |
| 27 |  | Volumen heute | 16777216 |  l |
| 28 |  | Volumen Woche | 1 |  l |
| 29 |  | Volumen Woche | 256 |  l |
| 30 |  | Volumen Woche | 65536 |  l |
| 31 |  | Volumen Woche | 16777216 |  l |
| 32 |  | Volumen Monat | 1 |  l |
| 33 |  | Volumen Monat | 256 |  l |
| 34 |  | Volumen Monat | 65536 |  l |
| 35 |  | Volumen Monat | 16777216 |  l |
| 36 |  | Wärmemenge | 1000000000 |  Wh |
| 37 |  | Wärmemenge | 256000000000 |  Wh |
| 38 |  | Wärmemenge | 65536000000000 |  Wh |
| 39 |  | Wärmemenge | 16777216000000000 |  Wh |



### <a name="0010_1740_0100"></a>DFA (0x0010) <= DeltaTherm HC max \[Modul\] (0x1740 - 0x174F), command 0x0100

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
| 12 |  | Drehzahl Relais 1 | 1 | % |
| 13 |  | Drehzahl Relais 2 | 1 | % |
| 14 |  | Drehzahl Relais 3 | 1 | % |
| 15 |  | Drehzahl Relais 4 | 1 | % |
| 16 |  | Drehzahl Relais 5 | 1 | % |



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



### <a name="0010_2213_0100"></a>DFA (0x0010) <= DeltaSol CS Plus 2.x (0x2213), command 0x0100

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
| 20 | 0x10 | GFD defekt | 1 |  |
| 20 | 0x20 | PFB1 defekt | 1 |  |
| 20 | 0x40 | PFB2 defekt | 1 |  |
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
| 32 |  | SW Version | 0.01 |  |
| 33 |  | SW Version | 2.56 |  |
| 36 |  | Temperatur GFD | 0.1 |  °C |
| 37 |  | Temperatur GFD | 25.6 |  °C |
| 38 |  | Volumenstrom 1 | 1 |  l/h |
| 39 |  | Volumenstrom 1 | 256 |  l/h |
| 40 |  | Volumenstrom 2 | 1 |  l/h |
| 41 |  | Volumenstrom 2 | 256 |  l/h |
| 44 |  | PFB1 Duty | 0.001 | % |
| 45 |  | PFB1 Duty | 0.256 | % |
| 46 |  | PFB1 Duty | 65.536 | % |
| 47 |  | PFB1 Duty | 16777.216 | % |
| 48 |  | PFB1 Freq. | 0.001 |  Hz |
| 49 |  | PFB1 Freq. | 0.256 |  Hz |
| 50 |  | PFB1 Freq. | 65.536 |  Hz |
| 51 |  | PFB1 Freq. | 16777.216 |  Hz |
| 52 |  | PFB2 Duty | 0.001 | % |
| 53 |  | PFB2 Duty | 0.256 | % |
| 54 |  | PFB2 Duty | 65.536 | % |
| 55 |  | PFB2 Duty | 16777.216 | % |
| 56 |  | PFB2 Freq. | 0.001 |  Hz |
| 57 |  | PFB2 Freq. | 0.256 |  Hz |
| 58 |  | PFB2 Freq. | 65.536 |  Hz |
| 59 |  | PFB2 Freq. | 16777.216 |  Hz |



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
| 45 |  | BW-Ladepumpe | 1 | % |
| 46 |  | Zirkulationspumpe | 1 | % |
| 47 |  | Relais 6 | 1 | % |
| 48 |  | Relais 7 | 1 | % |
| 49 |  | Relais 8 | 1 | % |
| 50 |  | Brennersperre 2 | 1 | % |
| 51 |  | Mischer Auf | 1 | % |
| 52 |  | Mischer Zu | 1 | % |
| 53 |  | HK-Pumpe | 1 | % |
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



### <a name="0010_2241_0100"></a>DFA (0x0010) <= Frischwasserregler (0x2241), command 0x0100

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
| 8 |  | S5 | 0.1 |  l/min |
| 9 |  | S5 | 25.6 |  l/min |
| 10 |  | Primärpumpe | 0.1 | % |
| 11 |  | Primärpumpe | 25.6 | % |
| 12 |  | Drehzahl Relais 2 | 1 | % |
| 13 |  | errorMask | 1 |  |
| 14 |  | warningMask | 1 |  |
| 15 |  | statusMask | 1 |  |
| 16 |  | Bilanz Wärmemenge | 1 |  Wh |
| 17 |  | Bilanz Wärmemenge | 256 |  Wh |
| 18 |  | Bilanz Wärmemenge | 65536 |  Wh |
| 19 |  | Bilanz Wärmemenge | 16777216 |  Wh |
| 20 |  | Bilanz Dauer P1 an | 1 |  h |
| 21 |  | Bilanz Dauer P1 an | 256 |  h |
| 22 |  | Bilanz Dauer P1 an | 65536 |  h |
| 23 |  | Bilanz Dauer P1 an | 16777216 |  h |
| 24 |  | Bilanz Dauer P2 an | 1 |  h |
| 25 |  | Bilanz Dauer P2 an | 256 |  h |
| 26 |  | Bilanz Dauer P2 an | 65536 |  h |
| 27 |  | Bilanz Dauer P2 an | 16777216 |  h |
| 28 |  | Zapfmenge | 0.1 |  m³ |
| 29 |  | Zapfmenge | 25.6 |  m³ |
| 30 |  | Zapfmenge | 6553.6 |  m³ |
| 31 |  | Zapfmenge | 1677721.6 |  m³ |
| 32 |  | Systemdatum | 1 |  |
| 33 |  | Systemdatum | 256 |  |
| 34 |  | Systemdatum | 65536 |  |
| 35 |  | Systemdatum | 16777216 |  |
| 36 |  | Systemzeit | 1 |  |
| 37 |  | Systemzeit | 256 |  |
| 38 |  | Version | 1.00 |  |
| 39 |  | Version | 0.01 |  |
| 40 |  | Drehzahl Relais 1 | 0.1 | % |
| 41 |  | Drehzahl Relais 1 | 25.6 | % |



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



### <a name="0010_2261_0100"></a>DFA (0x0010) <= HR Solar BASIC controller \[Regler\] (0x2261), command 0x0100

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
| 16 |  | Volumenstrom Sensor V40 | 1 |  l/h |
| 17 |  | Volumenstrom Sensor V40 | 256 |  l/h |
| 18 |  | Volumenstrom Sensor V40 | 65536 |  l/h |
| 19 |  | Volumenstrom Sensor V40 | 16777216 |  l/h |
| 20 |  | Volumenstrom Sensor VFS | 1 |  l/h |
| 21 |  | Volumenstrom Sensor VFS | 256 |  l/h |
| 22 |  | Volumenstrom Sensor VFS | 65536 |  l/h |
| 23 |  | Volumenstrom Sensor VFS | 16777216 |  l/h |
| 24 |  | Temperatur Sensor VFS | 0.1 |  °C |
| 25 |  | Temperatur Sensor VFS | 25.6 |  °C |
| 26 |  | Drehzahl Relais 1 | 1 | % |
| 27 |  | Drehzahl Relais 2 | 1 | % |
| 28 |  | Regler Ausgang 1 | 1 | % |
| 32 |  | Wmz1_Wert_Wh | 1 |  Wh |
| 33 |  | Wmz1_Wert_Wh | 256 |  Wh |
| 34 |  | Wmz1_Wert_Wh | 65536 |  Wh |
| 35 |  | Wmz1_Wert_Wh | 16777216 |  Wh |
| 36 |  | SW-Version | 0.01 |  |
| 37 |  | SW-Version | 2.56 |  |
| 40 |  | Betriebsstunden Relais1 | 1 |  h |
| 41 |  | Betriebsstunden Relais1 | 256 |  h |
| 42 |  | Betriebsstunden Relais1 | 65536 |  h |
| 43 |  | Betriebsstunden Relais1 | 16777216 |  h |
| 44 |  | Betriebsstunden Relais2 | 1 |  h |
| 45 |  | Betriebsstunden Relais2 | 256 |  h |
| 46 |  | Betriebsstunden Relais2 | 65536 |  h |
| 47 |  | Betriebsstunden Relais2 | 16777216 |  h |
| 48 | 0x01 | Urlaubsfunktion | 1 |  |
| 49 | 0x01 | Blockierschutz 1 | 1 |  |
| 52 |  | Initalisieren | 1 |  |
| 53 |  | Initalisieren | 256 |  |
| 54 |  | Initalisieren | 65536 |  |
| 55 |  | Initalisieren | 16777216 |  |
| 56 |  | Befüllung | 1 |  |
| 57 |  | Befüllung | 256 |  |
| 58 |  | Befüllung | 65536 |  |
| 59 |  | Befüllung | 16777216 |  |
| 60 |  | Stabilisieren | 1 |  |
| 61 |  | Stabilisieren | 256 |  |
| 62 |  | Stabilisieren | 65536 |  |
| 63 |  | Stabilisieren | 16777216 |  |
| 64 |  | Pumpenverzögerung | 1 |  |
| 65 | 0x01 | Überwärmeabfuhr | 1 |  |
| 66 |  | Nachlauf | 1 |  |
| 67 | 0x01 | Speicherkühlung | 1 |  |
| 68 |  | Frostschutz | 1 |  |
| 69 | 0x01 | Kollektorkühlung | 1 |  |
| 70 | 0x01 | Einheit Temperatur | 1 |  |
| 71 | 0x01 | Speichermaximaltemperatur | 1 |  |
| 72 | 0x01 | Neustarts | 1 |  |
| 76 |  | Fehlermaske | 1 |  |
| 77 |  | Fehlermaske | 256 |  |
| 78 |  | Fehlermaske | 65536 |  |
| 79 |  | Fehlermaske | 16777216 |  |



### <a name="0010_2262_0100"></a>DFA (0x0010) <= HR Solar BASIC controller \[WMZ 1\] (0x2262), command 0x0100

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
| 72 | 0x01 | Fehler: Sensorfehler | 1 |  |
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



### <a name="0010_2360_0100"></a>DFA (0x0010) <= HR Solar ADVANCED controller \[Regler\] (0x2360), command 0x0100

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
| 16 |  | TAGE | 1 |  |
| 17 |  | TAGE | 256 |  |
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
| 44 |  | SW-Version | 0.01 |  |
| 45 |  | SW-Version | 2.56 |  |
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
| 92 | 0x01 | Einheit Leistung | 1 |  |
| 93 | 0x01 | Einheit Energie | 1 |  |
| 94 | 0x01 | Speichermaximaltemperatur | 1 |  |
| 95 | 0x01 | Neustarts | 1 |  |
| 96 |  | Fehlermaske | 1 |  |
| 97 |  | Fehlermaske | 256 |  |
| 98 |  | Fehlermaske | 65536 |  |
| 99 |  | Fehlermaske | 16777216 |  |
| 100 |  | WAMA \(Counter\) | 1 |  |
| 101 |  | WAMA \(Counter\) | 256 |  |
| 102 |  | WAMA \(Counter\) | 65536 |  |
| 103 |  | WAMA \(Counter\) | 16777216 |  |
| 104 |  | TWAMA | 0.1 |  °C |
| 105 |  | TWAMA | 25.6 |  °C |



### <a name="0010_2362_0100"></a>DFA (0x0010) <= HR Solar ADVANCED controller \[WMZ 1\] (0x2362), command 0x0100

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



### <a name="0010_3112_0100"></a>DFA (0x0010) <= Remeha RemaSol A (0x3112), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Kollektor-Temperatur \(TC\) | 0.1 |  °C |
| 1 |  | Kollektor-Temperatur \(TC\) | 25.6 |  °C |
| 2 |  | Speicher-Temperatur \(TS\) | 0.1 |  °C |
| 3 |  | Speicher-Temperatur \(TS\) | 25.6 |  °C |
| 4 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 8 |  | Wärmemenge | 1 |  Wh |
| 9 |  | Wärmemenge | 256 |  Wh |
| 10 |  | Wärmemenge | 65536 |  Wh |
| 11 |  | Wärmemenge | 16777216 |  Wh |
| 12 |  | Pumpendrehzahl \(PC\) | 1 | % |
| 14 |  | Steuerungszeit \(tc\) | 1 | % |
| 15 |  | Steuerungszeit \(tc\) | 256 | % |
| 16 |  | Softwareversion | 0.01 |  |
| 17 |  | Softwareversion | 2.56 |  |
| 20 |  | Systemzeit | 1 |  |
| 21 |  | Systemzeit | 256 |  |
| 22 |  | Timer | 1 |  |
| 23 |  | Timer | 256 |  |



### <a name="0010_3113_0100"></a>DFA (0x0010) <= DeDietrich Diemasol Ai v2 (0x3113), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Kollektor-Temperatur \(TC\) | 0.1 |  °C |
| 1 |  | Kollektor-Temperatur \(TC\) | 25.6 |  °C |
| 2 |  | Speicher-Temperatur \(TS\) | 0.1 |  °C |
| 3 |  | Speicher-Temperatur \(TS\) | 25.6 |  °C |
| 8 |  | Wärmemenge | 1 |  Wh |
| 9 |  | Wärmemenge | 256 |  Wh |
| 10 |  | Wärmemenge | 65536 |  Wh |
| 11 |  | Wärmemenge | 16777216 |  Wh |
| 12 |  | Pumpendrehzahl \(PC\) | 1 | % |
| 14 |  | Steuerungszeit \(tc\) | 1 | % |
| 15 |  | Steuerungszeit \(tc\) | 256 | % |
| 16 |  | Softwareversion | 0.01 |  |
| 17 |  | Softwareversion | 2.56 |  |



### <a name="0010_3114_0100"></a>DFA (0x0010) <= DeDietrich Sol Plus Trio (0x3114), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Kollektor-Temperatur \(TC\) | 0.1 |  °C |
| 1 |  | Kollektor-Temperatur \(TC\) | 25.6 |  °C |
| 2 |  | Speicher-Temperatur \(TS\) | 0.1 |  °C |
| 3 |  | Speicher-Temperatur \(TS\) | 25.6 |  °C |
| 4 |  | Heizungsrücklauf-Temperatur \(TR\) | 0.1 |  °C |
| 5 |  | Heizungsrücklauf-Temperatur \(TR\) | 25.6 |  °C |
| 6 |  | Messfühler-Temperatur \(TM\) | 0.1 |  °C |
| 7 |  | Messfühler-Temperatur \(TM\) | 25.6 |  °C |
| 8 |  | Wärmemenge | 1 |  Wh |
| 9 |  | Wärmemenge | 256 |  Wh |
| 10 |  | Wärmemenge | 65536 |  Wh |
| 11 |  | Wärmemenge | 16777216 |  Wh |
| 12 |  | Pumpendrehzahl \(PC\) | 1 | % |
| 13 |  | Ventil \(R2\) | 1 | % |
| 14 |  | Steuerungszeit \(tc\) | 1 | % |
| 15 |  | Steuerungszeit \(tc\) | 256 | % |
| 16 |  | Softwareversion | 0.01 |  |
| 17 |  | Softwareversion | 2.56 |  |



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
| 6 |  | Wärmemenge \(<= v1.01\) | 1 |  kWh |
| 6 |  | Temperatur Sensor 4 \(>= v1.02\) | 0.1 |  °C |
| 7 |  | Temperatur Sensor 4 \(>= v1.02\) | 25.6 |  °C |
| 7 |  | Wärmemenge \(<= v1.01\) | 256 |  kWh |
| 8 |  | Drehzahl Relais 1 \(>= v1.02\) | 1 | % |
| 8 |  | Drehzahl Relais 1 \(<= v1.01\) | 0.1 | % |
| 9 |  | Drehzahl Relais 1 \(<= v1.01\) | 25.6 | % |
| 9 |  | Drehzahl Relais 2 \(>= v1.02\) | 1 | % |
| 10 |  | Fehlermaske \(>= v1.02\) | 1 |  |
| 10 |  | Drehzahl Relais 2 \(<= v1.01\) | 0.1 | % |
| 11 |  | Relaismaske \(>= v1.02\) | 1 |  |
| 11 |  | Drehzahl Relais 2 \(<= v1.01\) | 25.6 | % |
| 12 |  | Wärmemenge \(>= v1.02\) | 1 |  kWh |
| 13 |  | Wärmemenge \(>= v1.02\) | 256 |  kWh |



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



### <a name="0010_4213_0100"></a>DFA (0x0010) <= SKSC2 HE \[Regler\] (0x4213), command 0x0100

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



### <a name="0010_4214_0100"></a>DFA (0x0010) <= SKSC2 HE \[Regler\] (0x4214), command 0x0100

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
| 15 | 0x01 | Option Kollektor Max. | 1 |  |
| 15 | 0x02 | Option Kollektor Min. | 1 |  |
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
| 15 | 0x01 | Option Kollektor Max. | 1 |  |
| 15 | 0x02 | Option Kollektor Min. | 1 |  |
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
| 15 | 0x01 | Option Kollektor Max. | 1 |  |
| 15 | 0x02 | Option Kollektor Min. | 1 |  |
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
| 19 |  | verbl. Zapfung | 1 |  min |
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
| 30 |  | Version | 1.00 |  |
| 31 |  | Version | 0.01 |  |
| 32 |  | max. Temperatur Kaltwasser | 0.1 |  °C |
| 33 |  | max. Temperatur Kaltwasser | 25.6 |  °C |
| 34 |  | min. Temperatur Kaltwasser | 0.1 |  °C |
| 35 |  | min. Temperatur Kaltwasser | 25.6 |  °C |
| 36 |  | max. Volumenstrom | 1 |  l/h |
| 37 |  | max. Volumenstrom | 256 |  l/h |
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
| 32 |  | Temperatur max. Kaltwasser | 0.1 |  °C |
| 33 |  | Temperatur max. Kaltwasser | 25.6 |  °C |
| 34 |  | Temperatur min. Kaltwasser | 0.1 |  °C |
| 35 |  | Temperatur min. Kaltwasser | 25.6 |  °C |
| 36 |  | Volumenstrom max. | 1 |  l/h |
| 37 |  | Volumenstrom max. | 256 |  l/h |
| 38 |  | Zapfmenge max. | 1 |  m³ |
| 39 |  | Zapfmenge max. | 256 |  m³ |
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
| 6 |  | Ann. Temperatur Erdspeicher | 0.1 |  °C |
| 7 |  | Ann. Temperatur Erdspeicher | 25.6 |  °C |
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
| 23 | 0x01 | Relais 2 an | 1 |  |
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
| 22 | 0x01 | Kollektor-Nottemperatur | 1 |  |
| 22 | 0x02 | Kollektor-Minimaltemperatur | 1 |  |
| 22 | 0x04 | Wärmetauscher Nottemperatur | 1 |  |
| 22 | 0x08 | Speichernottemperatur | 1 |  |
| 22 | 0x10 | Speicher leer | 1 |  |
| 22 | 0x20 | Speichermaximaltemperatur | 1 |  |
| 22 | 0x40 | Kollektor-Frostschutz | 1 |  |
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



### <a name="0010_4261_0100"></a>DFA (0x0010) <= DeltaSol E SorTech \[Regler\] (0x4261), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | T LT OUT: | 0.1 |  °C |
| 1 |  | T LT OUT: | 25.6 |  °C |
| 2 |  | T MT OUT: | 0.1 |  °C |
| 3 |  | T MT OUT: | 25.6 |  °C |
| 4 |  | T A1 OUT: | 0.1 |  °C |
| 5 |  | T A1 OUT: | 25.6 |  °C |
| 6 |  | T A2 OUT: | 0.1 |  °C |
| 7 |  | T A2 OUT: | 25.6 |  °C |
| 8 |  | T HT Ext: | 0.1 |  °C |
| 9 |  | T HT Ext: | 25.6 |  °C |
| 10 |  | T LT Ext: | 0.1 |  °C |
| 11 |  | T LT Ext: | 25.6 |  °C |
| 12 |  | T LT IN: | 0.1 |  °C |
| 13 |  | T LT IN: | 25.6 |  °C |
| 14 | 0x01 | Anlage: | 1 |  |
| 14 | 0x02 | Heizmodus: | 1 |  |
| 14 | 0x04 | Strömungswächter LT-Kreis: | 1 |  |
| 14 | 0x08 | HV_A1_IN: | 1 |  |
| 14 | 0x10 | HV_A2_IN: | 1 |  |
| 14 | 0x20 | HV_OUT: | 1 |  |
| 14 | 0x40 | Melderelais | 1 |  |
| 15 |  | RCS %: | 1 | % |
| 16 |  | Pumpenrelais: | 1 | % |
| 17 |  | SPR Relais: | 1 | % |
| 18 |  | Phase: | 1 |  |
| 19 |  | Systemcode: | 1 |  |
| 22 |  | W Soll: | 1 |  Hz |
| 23 |  | W Soll: | 256 |  Hz |
| 24 |  | T LTS OUT AVG | 0.1 |  °C |
| 25 |  | T LTS OUT AVG | 25.6 |  °C |
| 26 |  | T MT OUT AVG | 0.1 |  °C |
| 27 |  | T MT OUT AVG | 25.6 |  °C |
| 30 |  | Externe Solltemperatur: | 0.1 |  °C |
| 31 |  | Externe Solltemperatur: | 25.6 |  °C |
| 32 |  | Anzahl Zyklen: | 1 |  |
| 33 |  | Anzahl Zyklen: | 256 |  |
| 34 |  | Anzahl Zyklen: | 65536 |  |
| 35 |  | Anzahl Zyklen: | 16777216 |  |
| 36 |  | Aufsummierte Besprühungzeit: | 1 |  |
| 37 |  | Aufsummierte Besprühungzeit: | 256 |  |
| 38 |  | Aufsummierte Besprühungzeit: | 65536 |  |
| 39 |  | Aufsummierte Besprühungzeit: | 16777216 |  |
| 40 |  | Systemzeit: | 1 |  |
| 41 |  | Systemzeit: | 256 |  |
| 42 |  | Jahr: | 1 |  |
| 43 |  | Jahr: | 256 |  |
| 44 |  | Monat: | 1 |  |
| 45 |  | Tag: | 1 |  |
| 46 |  | Kern: | 1.00 |  |
| 47 |  | Kern: | 0.01 |  |
| 48 |  | T LT IN AVG | 0.1 |  °C |
| 49 |  | T LT IN AVG | 25.6 |  °C |
| 50 |  | T LT IN Cycle | 0.1 |  °C |
| 51 |  | T LT IN Cycle | 25.6 |  °C |
| 52 |  | T LT OUT Cycle | 0.1 |  °C |
| 52 |  | Aktuellen Sollwert: | 0.1 |  °C |
| 53 |  | Aktuellen Sollwert: | 25.6 |  °C |
| 53 |  | T LT OUT Cycle | 25.6 |  °C |
| 54 |  | T MT OUT Cycle | 0.1 |  °C |
| 55 |  | T MT OUT Cycle | 25.6 |  °C |
| 56 |  | dQ LT Cycle | 0.1 |  kW |
| 57 |  | dQ LT Cycle | 25.6 |  kW |
| 58 |  | dV LT | 1 |  l/h |
| 59 |  | dV LT | 256 |  l/h |



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
| 10 | 0x20 | Kollektor-Nottemperatur | 1 |  |
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
| 10 | 0x20 | Kollektor-Nottemperatur | 1 |  |
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



### <a name="0010_4311_0100"></a>DFA (0x0010) <= DeDietrich DrainBack (0x4311), command 0x0100

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
| 16 |  | kWh | 0.1 |  kWh |
| 17 |  | kWh | 25.6 |  kWh |
| 18 |  | kWh | 6553.6 |  kWh |
| 19 |  | kWh | 1677721.6 |  kWh |



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
| 19 | 0x01 | Regelstatus: Sensordefekt | 1 |  |
| 19 | 0x02 | Regelstatus: Solare Beladung aktiv | 1 |  |
| 19 | 0x04 | Regelstatus: FilterMinLaufzeit aktiv | 1 |  |
| 19 | 0x08 | Regelstatus: Umwälzung aktiv | 1 |  |
| 19 | 0x10 | Regelstatus: SolarFilterNachlauf aktiv | 1 |  |
| 19 | 0x20 | Regelstatus: Kühlung aktiv | 1 |  |
| 19 | 0x40 | Regelstatus: VLMax aktiv | 1 |  |
| 24 |  | Wärmemenge | 1 |  Wh |
| 25 |  | Wärmemenge | 256 |  Wh |
| 26 |  | Wärmemenge | 65536 |  Wh |
| 27 |  | Wärmemenge | 16777216 |  Wh |



### <a name="0010_4720_0100"></a>DFA (0x0010) <= DeltaSol BS/2 HE (0x4720), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 16 |  | Drehzahl Relais 1 | 1 | % |
| 20 |  | Wärmemenge | 1 |  Wh |
| 21 |  | Wärmemenge | 256 |  Wh |
| 22 |  | Wärmemenge | 65536 |  Wh |
| 23 |  | Wärmemenge | 16777216 |  Wh |
| 24 |  | SW-Version | 0.01 |  |
| 25 |  | SW-Version | 2.56 |  |
| 28 |  | Betriebsstunden Relais 1 | 1 |  h |
| 29 |  | Betriebsstunden Relais 1 | 256 |  h |
| 30 |  | Betriebsstunden Relais 1 | 65536 |  h |
| 31 |  | Betriebsstunden Relais 1 | 16777216 |  h |
| 68 |  | Fehlermaske | 1 |  |
| 69 |  | Fehlermaske | 256 |  |
| 70 |  | Fehlermaske | 65536 |  |
| 71 |  | Fehlermaske | 16777216 |  |



### <a name="0010_4721_0100"></a>DFA (0x0010) <= DeltaSol BS/2 HE \[WMZ\] (0x4721), command 0x0100

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
| 8 |  | Wert \(heute\) | 1 |  Wh |
| 9 |  | Wert \(heute\) | 256 |  Wh |
| 10 |  | Wert \(heute\) | 65536 |  Wh |
| 11 |  | Wert \(heute\) | 16777216 |  Wh |
| 12 |  | Wert \(Woche\) | 1 |  Wh |
| 13 |  | Wert \(Woche\) | 256 |  Wh |
| 14 |  | Wert \(Woche\) | 65536 |  Wh |
| 15 |  | Wert \(Woche\) | 16777216 |  Wh |



### <a name="0010_4730_0100"></a>DFA (0x0010) <= DeltaSol BS/4 HE (0x4730), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Temperatur Sensor 1 | 0.1 |  °C |
| 5 |  | Temperatur Sensor 1 | 25.6 |  °C |
| 6 |  | Temperatur Sensor 2 | 0.1 |  °C |
| 7 |  | Temperatur Sensor 2 | 25.6 |  °C |
| 8 |  | Temperatur Sensor 3 | 0.1 |  °C |
| 9 |  | Temperatur Sensor 3 | 25.6 |  °C |
| 16 |  | Drehzahl Relais 1 | 1 | % |
| 17 |  | Drehzahl Relais 2 | 1 | % |
| 20 |  | Wärmemenge | 1 |  Wh |
| 21 |  | Wärmemenge | 256 |  Wh |
| 22 |  | Wärmemenge | 65536 |  Wh |
| 23 |  | Wärmemenge | 16777216 |  Wh |
| 24 |  | SW-Version | 0.01 |  |
| 25 |  | SW-Version | 2.56 |  |
| 28 |  | Betriebsstunden Relais 1 | 1 |  h |
| 29 |  | Betriebsstunden Relais 1 | 256 |  h |
| 30 |  | Betriebsstunden Relais 1 | 65536 |  h |
| 31 |  | Betriebsstunden Relais 1 | 16777216 |  h |
| 32 |  | Betriebsstunden Relais 2 | 1 |  h |
| 33 |  | Betriebsstunden Relais 2 | 256 |  h |
| 34 |  | Betriebsstunden Relais 2 | 65536 |  h |
| 35 |  | Betriebsstunden Relais 2 | 16777216 |  h |
| 72 |  | Fehlermaske | 1 |  |
| 73 |  | Fehlermaske | 256 |  |
| 74 |  | Fehlermaske | 65536 |  |
| 75 |  | Fehlermaske | 16777216 |  |



### <a name="0010_4731_0100"></a>DFA (0x0010) <= DeltaSol BS/4 HE \[WMZ\] (0x4731), command 0x0100

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
| 8 |  | Wert \(heute\) | 1 |  Wh |
| 9 |  | Wert \(heute\) | 256 |  Wh |
| 10 |  | Wert \(heute\) | 65536 |  Wh |
| 11 |  | Wert \(heute\) | 16777216 |  Wh |
| 12 |  | Wert \(Woche\) | 1 |  Wh |
| 13 |  | Wert \(Woche\) | 256 |  Wh |
| 14 |  | Wert \(Woche\) | 65536 |  Wh |
| 15 |  | Wert \(Woche\) | 16777216 |  Wh |



### <a name="0010_4A00_0100"></a>DFA (0x0010) <= Drainback DeDietrich (0x4A00), command 0x0100

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
| 16 |  | kWh | 0.1 |  kWh |
| 17 |  | kWh | 25.6 |  kWh |
| 18 |  | kWh | 6553.6 |  kWh |
| 19 |  | kWh | 1677721.6 |  kWh |



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
| 22 |  | Temperatur Sensor VFS/US | 0.1 |  °C |
| 23 |  | Temperatur Sensor VFS/US | 25.6 |  °C |
| 36 |  | Durchfluss Sensor VFS/US | 1 |  l/h |
| 37 |  | Durchfluss Sensor VFS/US | 256 |  l/h |
| 38 |  | Durchfluss Sensor VFS/US | 65536 |  l/h |
| 39 |  | Durchfluss Sensor VFS/US | 16777216 |  l/h |
| 49 |  | Drehzahl Relais 1 | 1 | % |
| 50 |  | Drehzahl Relais 2 | 1 | % |
| 51 |  | Drehzahl Relais 3 | 1 | % |
| 52 |  | Drehzahl Relais pot.frei | 1 | % |
| 56 |  | Drehzahl Ausgang PWM 1 | 1 | % |
| 57 |  | Drehzahl Ausgang PWM 2 | 1 | % |
| 64 |  | Betriebssekunden Relais 1 | 1 |  s |
| 65 |  | Betriebssekunden Relais 1 | 256 |  s |
| 66 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 67 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 68 |  | Betriebssekunden Relais 2 | 1 |  s |
| 69 |  | Betriebssekunden Relais 2 | 256 |  s |
| 70 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 71 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 72 |  | Betriebssekunden Relais 3 | 1 |  s |
| 73 |  | Betriebssekunden Relais 3 | 256 |  s |
| 74 |  | Betriebssekunden Relais 3 | 65536 |  s |
| 75 |  | Betriebssekunden Relais 3 | 16777216 |  s |
| 76 |  | Betriebssekunden Relais pot.frei | 1 |  s |
| 77 |  | Betriebssekunden Relais pot.frei | 256 |  s |
| 78 |  | Betriebssekunden Relais pot.frei | 65536 |  s |
| 79 |  | Betriebssekunden Relais pot.frei | 16777216 |  s |
| 80 |  | Betriebssekunden Ausgang PWM 1 | 1 |  s |
| 81 |  | Betriebssekunden Ausgang PWM 1 | 256 |  s |
| 82 |  | Betriebssekunden Ausgang PWM 1 | 65536 |  s |
| 83 |  | Betriebssekunden Ausgang PWM 1 | 16777216 |  s |
| 84 |  | Betriebssekunden Ausgang PWM 2 | 1 |  s |
| 85 |  | Betriebssekunden Ausgang PWM 2 | 256 |  s |
| 86 |  | Betriebssekunden Ausgang PWM 2 | 65536 |  s |
| 87 |  | Betriebssekunden Ausgang PWM 2 | 16777216 |  s |
| 96 |  | Wärmemenge | 1 |  Wh |
| 97 |  | Wärmemenge | 256 |  Wh |
| 98 |  | Wärmemenge | 65536 |  Wh |
| 99 |  | Wärmemenge | 16777216 |  Wh |
| 100 |  | Fehler | 1 |  |
| 101 |  | Fehler | 256 |  |
| 102 |  | Fehler | 65536 |  |
| 103 |  | Fehler | 16777216 |  |
| 108 |  | Version | 0.01 |  |
| 109 |  | Version | 2.56 |  |
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
| 23 | 0x01 | Optionen: Ventil | 1 |  |
| 23 | 0x02 | Optionen: Minimal | 1 |  |
| 23 | 0x04 | Optionen: WMZ | 1 |  |
| 23 | 0x08 | Optionen: Boilerladung | 1 |  |
| 23 | 0x10 | Optionen: Solarzelle | 1 |  |
| 23 | 0x20 | Optionen: 2. Kollektor-Ventil | 1 |  |
| 24 |  | Fehlermaske | 1 |  |
| 25 |  | Sensorbruch-Maske | 1 |  |
| 26 |  | Sensorkurzschluss-Maske | 1 |  |
| 28 |  | Systemzeit | 1 |  |
| 29 |  | Systemzeit | 256 |  |



### <a name="0010_5351_0100"></a>DFA (0x0010) <= Frischwasserregler (0x5351), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | TSpVL \(S1\) | 0.1 |  °C |
| 1 |  | TSpVL \(S1\) | 25.6 |  °C |
| 4 |  | S3 | 0.1 |  °C |
| 5 |  | S3 | 25.6 |  °C |
| 6 |  | TKW \(S4\) | 0.1 |  °C |
| 7 |  | TKW \(S4\) | 25.6 |  °C |
| 8 |  | S5 | 0.1 |  °C |
| 9 |  | S5 | 25.6 |  °C |
| 10 |  | S6 | 0.1 |  °C |
| 11 |  | S6 | 25.6 |  °C |
| 12 |  | S7 | 0.1 |  °C |
| 13 |  | S7 | 25.6 |  °C |
| 14 |  | S8 | 0.1 |  °C |
| 15 |  | S8 | 25.6 |  °C |
| 16 |  | S9 | 0.1 |  °C |
| 17 |  | S9 | 25.6 |  °C |
| 50 |  | R2 | 1 | % |
| 51 |  | R3 | 1 | % |
| 52 |  | R4 | 1 | % |
| 56 |  | Drehzahl Primaerpumpe | 1 | % |
| 96 |  | Wärmemenge | 1 |  Wh |
| 97 |  | Wärmemenge | 256 |  Wh |
| 98 |  | Wärmemenge | 65536 |  Wh |
| 99 |  | Wärmemenge | 16777216 |  Wh |
| 108 |  | Version | 0.01 |  |
| 109 |  | Version | 2.56 |  |
| 110 |  | Hydraulik | 1 |  |
| 112 |  | Datum/Uhrzeit | 1 |  |
| 113 |  | Datum/Uhrzeit | 256 |  |
| 114 |  | Datum/Uhrzeit | 65536 |  |
| 115 |  | Datum/Uhrzeit | 16777216 |  |
| 116 |  | TWW | 0.1 |  °C |
| 117 |  | TWW | 25.6 |  °C |
| 118 |  | Drehzahl Sekundaerpumpe | 1 | % |
| 119 |  | Drehzahl Zirkulationspumpe | 1 | % |
| 120 |  | Volumenstrom US1 | 1 |  l/h |
| 121 |  | Volumenstrom US1 | 256 |  l/h |
| 122 |  | Volumenstrom US1 | 65536 |  l/h |
| 123 |  | Volumenstrom US1 | 16777216 |  l/h |
| 124 |  | Volumenstrom US2 | 1 |  l/h |
| 125 |  | Volumenstrom US2 | 256 |  l/h |
| 126 |  | Volumenstrom US2 | 65536 |  l/h |
| 127 |  | Volumenstrom US2 | 16777216 |  l/h |
| 128 |  | Volumenstrom US gesamt | 1 |  l/h |
| 129 |  | Volumenstrom US gesamt | 256 |  l/h |
| 130 |  | Volumenstrom US gesamt | 65536 |  l/h |
| 131 |  | Volumenstrom US gesamt | 16777216 |  l/h |
| 132 |  | Volumenstrom | 1 |  l/h |
| 133 |  | Volumenstrom | 256 |  l/h |
| 134 |  | Volumenstrom | 65536 |  l/h |
| 135 |  | Volumenstrom | 16777216 |  l/h |



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
| 52 | 0x01 | Fehler: Sensorfehler | 1 |  |
| 52 | 0x02 | Fehler: Modulfehler | 1 |  |
| 52 |  | Fehlermaske | 1 |  |
| 53 |  | Fehlermaske | 256 |  |
| 54 |  | Fehlermaske | 65536 |  |
| 55 |  | Fehlermaske | 16777216 |  |
| 56 |  | Warnungmaske | 1 |  |
| 57 |  | Warnungmaske | 256 |  |
| 58 |  | Warnungmaske | 65536 |  |
| 59 |  | Warnungmaske | 16777216 |  |



### <a name="0010_5410_0100"></a>DFA (0x0010) <= DeltaTherm HC \[Heizkreis\] (0x5410 - 0x541F), command 0x0100

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



### <a name="0010_5420_0100"></a>DFA (0x0010) <= DeltaTherm HC \[WMZ\] (0x5420 - 0x542F), command 0x0100

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
| 8 |  | Wert \(heute\) | 1 |  Wh |
| 9 |  | Wert \(heute\) | 256 |  Wh |
| 10 |  | Wert \(heute\) | 65536 |  Wh |
| 11 |  | Wert \(heute\) | 16777216 |  Wh |
| 12 |  | Wert \(Woche\) | 1 |  Wh |
| 13 |  | Wert \(Woche\) | 256 |  Wh |
| 14 |  | Wert \(Woche\) | 65536 |  Wh |
| 15 |  | Wert \(Woche\) | 16777216 |  Wh |



### <a name="0010_5430_0100"></a>DFA (0x0010) <= DeltaTherm HC \[Modul\] (0x5430 - 0x543F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Sensor 1 | 0.1 |  °C |
| 1 |  | Sensor 1 | 25.6 |  °C |
| 2 |  | Sensor 2 | 0.1 |  °C |
| 3 |  | Sensor 2 | 25.6 |  °C |
| 4 |  | Sensor 3 | 0.1 |  °C |
| 5 |  | Sensor 3 | 25.6 |  °C |
| 6 |  | Sensor 4 | 0.1 |  °C |
| 7 |  | Sensor 4 | 25.6 |  °C |
| 8 |  | Sensor 5 | 0.1 |  °C |
| 9 |  | Sensor 5 | 25.6 |  °C |
| 10 |  | Sensor 6 | 0.1 |  °C |
| 11 |  | Sensor 6 | 25.6 |  °C |
| 12 |  | Drehzahl Relais 1 | 1 | % |
| 13 |  | Drehzahl Relais 2 | 1 | % |
| 14 |  | Drehzahl Relais 3 | 1 | % |
| 15 |  | Drehzahl Relais 4 | 1 | % |
| 16 |  | Drehzahl Relais 5 | 1 | % |



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
| 68 |  | Warnungsmaske | 1 |  |
| 69 |  | Warnungsmaske | 256 |  |
| 70 |  | Warnungsmaske | 65536 |  |
| 71 |  | Warnungsmaske | 16777216 |  |



### <a name="0010_7112_0140"></a>DFA (0x0010) <= DeltaSol BX Plus \[Regler\] (0x7112), command 0x0140

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Anzahl TD-Funktionen | 1 |  |
| 1 |  | Nummer letzte erfolgreiche TD | 1 |  |
| 2 |  | Nummer letzte abgebrochene TD | 1 |  |
| 4 |  | Maske erfolgreiche TD | 1 |  |
| 5 |  | Maske erfolgreiche TD | 256 |  |
| 6 |  | Maske abgebrochene TD | 1 |  |
| 7 |  | Maske abgebrochene TD | 256 |  |
| 8 |  | Zeitstempel letzte erfolgreiche TD | 1 |  |
| 9 |  | Zeitstempel letzte erfolgreiche TD | 256 |  |
| 10 |  | Zeitstempel letzte erfolgreiche TD | 65536 |  |
| 11 |  | Zeitstempel letzte erfolgreiche TD | 16777216 |  |
| 12 |  | Zeitstempel letzte abgebrochene TD | 1 |  |
| 13 |  | Zeitstempel letzte abgebrochene TD | 256 |  |
| 14 |  | Zeitstempel letzte abgebrochene TD | 65536 |  |
| 15 |  | Zeitstempel letzte abgebrochene TD | 16777216 |  |



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



### <a name="0010_7120_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Heizkreis\] (0x7120 - 0x712F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_7130_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[WMZ\] (0x7130 - 0x713F), command 0x0100

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



### <a name="0010_7140_0100"></a>DFA (0x0010) <= DeltaSol BX Pro \[Regler\] (0x7140), command 0x0100

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



### <a name="0010_7150_0100"></a>DFA (0x0010) <= DeltaSol BX Pro \[WMZ\] (0x7150 - 0x715F), command 0x0100

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



### <a name="0010_7176_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[Regler\] (0x7176), command 0x0100

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
| 20 |  | Einstrahlung Sensor 11 | 1 |  W/m² |
| 21 |  | Einstrahlung Sensor 11 | 256 |  W/m² |
| 24 |  | Temperatur Sensor Ga1 | 0.1 |  °C |
| 25 |  | Temperatur Sensor Ga1 | 25.6 |  °C |
| 26 |  | Temperatur Sensor Ga2 | 0.1 |  °C |
| 27 |  | Temperatur Sensor Ga2 | 25.6 |  °C |
| 28 |  | Volumenstrom Sensor 9 | 1 |  l/h |
| 29 |  | Volumenstrom Sensor 9 | 256 |  l/h |
| 30 |  | Volumenstrom Sensor 9 | 65536 |  l/h |
| 31 |  | Volumenstrom Sensor 9 | 16777216 |  l/h |
| 32 |  | Volumenstrom Sensor 10 | 1 |  l/h |
| 33 |  | Volumenstrom Sensor 10 | 256 |  l/h |
| 34 |  | Volumenstrom Sensor 10 | 65536 |  l/h |
| 35 |  | Volumenstrom Sensor 10 | 16777216 |  l/h |
| 36 |  | Volumenstrom Sensor Ga1 | 1 |  l/h |
| 37 |  | Volumenstrom Sensor Ga1 | 256 |  l/h |
| 38 |  | Volumenstrom Sensor Ga1 | 65536 |  l/h |
| 39 |  | Volumenstrom Sensor Ga1 | 16777216 |  l/h |
| 40 |  | Volumenstrom Sensor Ga2 | 1 |  l/h |
| 41 |  | Volumenstrom Sensor Ga2 | 256 |  l/h |
| 42 |  | Volumenstrom Sensor Ga2 | 65536 |  l/h |
| 43 |  | Volumenstrom Sensor Ga2 | 16777216 |  l/h |
| 44 |  | Druck Sensor Ga1 | 0.01 |  bar |
| 45 |  | Druck Sensor Ga1 | 2.56 |  bar |
| 46 |  | Druck Sensor Ga2 | 0.01 |  bar |
| 47 |  | Druck Sensor Ga2 | 2.56 |  bar |
| 48 |  | Relais 1 | 1 | % |
| 49 |  | Relais 2 | 1 | % |
| 50 |  | Relais 3 | 1 | % |
| 51 |  | Relais 4 | 1 | % |
| 52 |  | Relais 5 | 1 | % |
| 56 |  | Systemdatum | 1 |  |
| 57 |  | Systemdatum | 256 |  |
| 58 |  | Systemdatum | 65536 |  |
| 59 |  | Systemdatum | 16777216 |  |
| 60 |  | Fehlermaske | 1 |  |
| 61 |  | Fehlermaske | 256 |  |
| 62 |  | Fehlermaske | 65536 |  |
| 63 |  | Fehlermaske | 16777216 |  |
| 72 |  | PWM/0-10V A | 1 | % |
| 73 |  | PWM/0-10V B | 1 | % |
| 74 |  | PWM/0-10V C | 1 | % |
| 75 |  | PWM/0-10V D | 1 | % |



### <a name="0010_7177_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[Module\] (0x7177), command 0x0100

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



### <a name="0010_7178_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[Heizkreis 1\] (0x7178), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_7179_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[Heizkreis 2\] (0x7179), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_717A_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[WMZ 1\] (0x717A), command 0x0100

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



### <a name="0010_717B_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[WMZ 2\] (0x717B), command 0x0100

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



### <a name="0010_7312_0100"></a>DFA (0x0010) <= DeltaSol M \[HK1\] (0x7312 - 0x7313), command 0x0100

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



### <a name="0010_7316_0100"></a>DFA (0x0010) <= DeltaSol M \[WMZ1\] (0x7316 - 0x7317), command 0x0100

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



### <a name="0010_7326_0100"></a>DFA (0x0010) <= Vitosolic 200 \[WMZ1\] (0x7326 - 0x7327), command 0x0100

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



### <a name="0010_7332_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul (0x7332), command 0x0100

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



### <a name="0010_7333_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul (0x7333), command 0x0100

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



### <a name="0010_7334_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul (0x7334), command 0x0100

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



### <a name="0010_7335_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul (0x7335), command 0x0100

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
| 96 |  | SensorBenutzt bit 0..31 | 1 |  |
| 97 |  | SensorBenutzt bit 0..31 | 256 |  |
| 98 |  | SensorBenutzt bit 0..31 | 65536 |  |
| 99 |  | SensorBenutzt bit 0..31 | 16777216 |  |
| 100 |  | SensorBenutzt bit 31..63 | 1 |  |
| 101 |  | SensorBenutzt bit 31..63 | 256 |  |
| 102 |  | SensorBenutzt bit 31..63 | 65536 |  |
| 103 |  | SensorBenutzt bit 31..63 | 16777216 |  |
| 104 |  | Error SensorBruch bit 0..31 | 1 |  |
| 105 |  | Error SensorBruch bit 0..31 | 256 |  |
| 106 |  | Error SensorBruch bit 0..31 | 65536 |  |
| 107 |  | Error SensorBruch bit 0..31 | 16777216 |  |
| 108 |  | Error SensorBruch bit 31..63 | 1 |  |
| 109 |  | Error SensorBruch bit 31..63 | 256 |  |
| 110 |  | Error SensorBruch bit 31..63 | 65536 |  |
| 111 |  | Error SensorBruch bit 31..63 | 16777216 |  |
| 112 |  | Error SensorKurzschluss bit 0..31 | 1 |  |
| 113 |  | Error SensorKurzschluss bit 0..31 | 256 |  |
| 114 |  | Error SensorKurzschluss bit 0..31 | 65536 |  |
| 115 |  | Error SensorKurzschluss bit 0..31 | 16777216 |  |
| 116 |  | Error SensorKurzschluss bit 31..63 | 1 |  |
| 117 |  | Error SensorKurzschluss bit 31..63 | 256 |  |
| 118 |  | Error SensorKurzschluss bit 31..63 | 65536 |  |
| 119 |  | Error SensorKurzschluss bit 31..63 | 16777216 |  |
| 120 |  | Errormask | 1 |  |
| 121 |  | Errormask | 256 |  |
| 122 |  | Warningmask | 1 |  |
| 123 |  | Warningmask | 256 |  |
| 124 |  | Systemflow.Parameteraenderungen | 1 |  |
| 125 |  | Systemflow.Parameteraenderungen | 256 |  |



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
| 36 |  | Diff. TUmg/24h | 0.1 |  K |
| 37 |  | Diff. TUmg/24h | 25.6 |  K |
| 38 |  | Diff. TSs/8h | 0.1 |  K |
| 39 |  | Diff. TSs/8h | 25.6 |  K |
| 40 |  | Diff. TSs/1h | 0.1 |  K |
| 41 |  | Diff. TSs/1h | 25.6 |  K |
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



### <a name="0010_7521_0100"></a>DFA (0x0010) <= Oventrop RQ-B / RQ-B HE (0x7521), command 0x0100

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
| 27 |  | Desinf. Phase | 1 |  |
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
| 50 |  | Funktionen | 65536 |  |
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
| 52 | 0x01 | Fehler: Sensorfehler oder Volumenstromüberwachung | 1 |  |
| 52 | 0x02 | Fehler: Modulfehler | 1 |  |
| 52 | 0x04 | Fehler: ΔT zu hoch | 1 |  |
| 52 | 0x08 | Fehler: Überladeschutz | 1 |  |
| 52 | 0x10 | Fehler: Abbruch Überwärmeabfuhr | 1 |  |
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



### <a name="0010_7530_0100"></a>DFA (0x0010) <= Regtronic RX-B \[WMZ\] (0x7530 - 0x753F), command 0x0100

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



### <a name="0010_7541_0100"></a>DFA (0x0010) <= Oventrop RQ XXL (0x7541), command 0x0100

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
| 16 |  | Temperatur Sensor S14/VFD | 0.1 |  °C |
| 17 |  | Temperatur Sensor S14/VFD | 25.6 |  °C |
| 20 |  | Durchfluss Sensor S8/V40 | 1 |  l/h |
| 21 |  | Durchfluss Sensor S8/V40 | 256 |  l/h |
| 22 |  | Durchfluss Sensor S8/V40 | 65536 |  l/h |
| 23 |  | Durchfluss Sensor S8/V40 | 16777216 |  l/h |
| 24 |  | Durchfluss Sensor S14/VFD | 1 |  l/h |
| 25 |  | Durchfluss Sensor S14/VFD | 256 |  l/h |
| 26 |  | Durchfluss Sensor S14/VFD | 65536 |  l/h |
| 27 |  | Durchfluss Sensor S14/VFD | 16777216 |  l/h |
| 28 |  | Druck Sensor S14/VFD | 0.01 |  bar |
| 29 |  | Druck Sensor S14/VFD | 2.56 |  bar |
| 30 |  | Einstrahlung Sensor 9 | 1 |  W/m² |
| 31 |  | Einstrahlung Sensor 9 | 256 |  W/m² |
| 32 |  | PWM In Dutycycle 1 | 0.001 | % |
| 33 |  | PWM In Dutycycle 1 | 0.256 | % |
| 34 |  | PWM In Dutycycle 1 | 65.536 | % |
| 35 |  | PWM In Dutycycle 1 | 16777.216 | % |
| 36 |  | PWM In Dutycycle 2 | 0.001 | % |
| 37 |  | PWM In Dutycycle 2 | 0.256 | % |
| 38 |  | PWM In Dutycycle 2 | 65.536 | % |
| 39 |  | PWM In Dutycycle 2 | 16777.216 | % |
| 40 |  | PWM In Dutycycle 3 | 0.001 | % |
| 41 |  | PWM In Dutycycle 3 | 0.256 | % |
| 42 |  | PWM In Dutycycle 3 | 65.536 | % |
| 43 |  | PWM In Dutycycle 3 | 16777.216 | % |
| 44 |  | PWM In Dutycycle 4 | 0.001 | % |
| 45 |  | PWM In Dutycycle 4 | 0.256 | % |
| 46 |  | PWM In Dutycycle 4 | 65.536 | % |
| 47 |  | PWM In Dutycycle 4 | 16777.216 | % |
| 48 |  | PWM In Frequenz 1 | 0.001 |  Hz |
| 49 |  | PWM In Frequenz 1 | 0.256 |  Hz |
| 50 |  | PWM In Frequenz 1 | 65.536 |  Hz |
| 51 |  | PWM In Frequenz 1 | 16777.216 |  Hz |
| 52 |  | PWM In Frequenz 2 | 0.001 |  Hz |
| 53 |  | PWM In Frequenz 2 | 0.256 |  Hz |
| 54 |  | PWM In Frequenz 2 | 65.536 |  Hz |
| 55 |  | PWM In Frequenz 2 | 16777.216 |  Hz |
| 56 |  | PWM In Frequenz 3 | 0.001 |  Hz |
| 57 |  | PWM In Frequenz 3 | 0.256 |  Hz |
| 58 |  | PWM In Frequenz 3 | 65.536 |  Hz |
| 59 |  | PWM In Frequenz 3 | 16777.216 |  Hz |
| 60 |  | PWM In Frequenz 4 | 0.001 |  Hz |
| 61 |  | PWM In Frequenz 4 | 0.256 |  Hz |
| 62 |  | PWM In Frequenz 4 | 65.536 |  Hz |
| 63 |  | PWM In Frequenz 4 | 16777.216 |  Hz |
| 64 |  | Drehzahl Relais 1 | 1 | % |
| 65 |  | Drehzahl Relais 2 | 1 | % |
| 66 |  | Drehzahl Relais 3 | 1 | % |
| 67 |  | Drehzahl Relais 4 | 1 | % |
| 68 |  | Drehzahl Relais 5 | 1 | % |
| 72 |  | Ausgang PWM 1 | 1 | % |
| 73 |  | Ausgang PWM 2 | 1 | % |
| 74 |  | Ausgang PWM 3 | 1 | % |
| 75 |  | Ausgang PWM 4 | 1 | % |
| 76 |  | Betriebssekunden Relais 1 | 1 |  s |
| 77 |  | Betriebssekunden Relais 1 | 256 |  s |
| 78 |  | Betriebssekunden Relais 1 | 65536 |  s |
| 79 |  | Betriebssekunden Relais 1 | 16777216 |  s |
| 80 |  | Betriebssekunden Relais 2 | 1 |  s |
| 81 |  | Betriebssekunden Relais 2 | 256 |  s |
| 82 |  | Betriebssekunden Relais 2 | 65536 |  s |
| 83 |  | Betriebssekunden Relais 2 | 16777216 |  s |
| 84 |  | Betriebssekunden Relais 3 | 1 |  s |
| 85 |  | Betriebssekunden Relais 3 | 256 |  s |
| 86 |  | Betriebssekunden Relais 3 | 65536 |  s |
| 87 |  | Betriebssekunden Relais 3 | 16777216 |  s |
| 88 |  | Betriebssekunden Relais 4 | 1 |  s |
| 89 |  | Betriebssekunden Relais 4 | 256 |  s |
| 90 |  | Betriebssekunden Relais 4 | 65536 |  s |
| 91 |  | Betriebssekunden Relais 4 | 16777216 |  s |
| 92 |  | Betriebssekunden Relais 5 | 1 |  s |
| 93 |  | Betriebssekunden Relais 5 | 256 |  s |
| 94 |  | Betriebssekunden Relais 5 | 65536 |  s |
| 95 |  | Betriebssekunden Relais 5 | 16777216 |  s |
| 96 |  | Betriebssekunden Ausgang PWM 1 | 1 |  s |
| 97 |  | Betriebssekunden Ausgang PWM 1 | 256 |  s |
| 98 |  | Betriebssekunden Ausgang PWM 1 | 65536 |  s |
| 99 |  | Betriebssekunden Ausgang PWM 1 | 16777216 |  s |
| 100 |  | Betriebssekunden Ausgang PWM 2 | 1 |  s |
| 101 |  | Betriebssekunden Ausgang PWM 2 | 256 |  s |
| 102 |  | Betriebssekunden Ausgang PWM 2 | 65536 |  s |
| 103 |  | Betriebssekunden Ausgang PWM 2 | 16777216 |  s |
| 104 |  | Betriebssekunden Ausgang PWM 3 | 1 |  s |
| 105 |  | Betriebssekunden Ausgang PWM 3 | 256 |  s |
| 106 |  | Betriebssekunden Ausgang PWM 3 | 65536 |  s |
| 107 |  | Betriebssekunden Ausgang PWM 3 | 16777216 |  s |
| 108 |  | Betriebssekunden Ausgang PWM 4 | 1 |  s |
| 109 |  | Betriebssekunden Ausgang PWM 4 | 256 |  s |
| 110 |  | Betriebssekunden Ausgang PWM 4 | 65536 |  s |
| 111 |  | Betriebssekunden Ausgang PWM 4 | 16777216 |  s |
| 112 |  | Wärmemenge | 1 |  Wh |
| 113 |  | Wärmemenge | 256 |  Wh |
| 114 |  | Wärmemenge | 65536 |  Wh |
| 115 |  | Wärmemenge | 16777216 |  Wh |
| 116 | 0x01 | Sensorfehler S1 | 1 |  |
| 116 | 0x02 | Sensorfehler S2 | 1 |  |
| 116 | 0x04 | Sensorfehler S3 | 1 |  |
| 116 | 0x08 | Sensorfehler S4 | 1 |  |
| 116 | 0x10 | Sensorfehler S5 | 1 |  |
| 116 | 0x20 | Sensorfehler S6 | 1 |  |
| 116 | 0x40 | Sensorfehler S7 | 1 |  |
| 116 | 0x80 | Sensorfehler S8 | 1 |  |
| 116 |  | Fehler | 1 |  |
| 117 | 0x20 | Sensorfehler S14 VFD | 1 |  |
| 117 |  | Fehler | 256 |  |
| 118 | 0x01 | Desinfektion: Vorlauf zu niedrig | 1 |  |
| 118 | 0x02 | Desinfektion: Fehlgeschlagen | 1 |  |
| 118 | 0x04 | Uebertemperaturschutz aktiv | 1 |  |
| 118 |  | Fehler | 65536 |  |
| 119 |  | Fehler | 16777216 |  |
| 120 |  | Optionsmaske | 1 |  |
| 121 |  | Optionsmaske | 256 |  |
| 122 |  | Optionsmaske | 65536 |  |
| 123 |  | Optionsmaske | 16777216 |  |
| 124 |  | Version | 0.01 |  |
| 125 |  | Version | 2.56 |  |
| 128 |  | Systemdatum | 1 |  |
| 129 |  | Systemdatum | 256 |  |
| 130 |  | Systemdatum | 65536 |  |
| 131 |  | Systemdatum | 16777216 |  |
| 132 |  | Durchfluss Turbotron | 1 |  l/h |
| 133 |  | Durchfluss Turbotron | 256 |  l/h |
| 134 |  | Durchfluss Turbotron | 65536 |  l/h |
| 135 |  | Durchfluss Turbotron | 16777216 |  l/h |



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
| 34 |  | Version | 1.00 |  |
| 35 |  | Version | 0.01 |  |



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
| 22 | 0x04 | EEPROM-Fehler | 1 |  |
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
| 36 | 0x10 | Beckenmax. | 1 |  |
| 36 | 0x20 | Filtermin. | 1 |  |
| 36 | 0x40 | Nachheizung | 1 |  |
| 36 | 0x80 | Solar Nachheizung | 1 |  |
| 36 |  | Meldungen | 1 |  |
| 37 | 0x01 | dT Solar Nachheizung | 1 |  |
| 37 | 0x02 | Umwälzung | 1 |  |
| 37 | 0x04 | Kollektorabschaltung | 1 |  |
| 37 | 0x08 | Kollektorminimal | 1 |  |
| 37 | 0x10 | dT Beckenkühlfkt aus | 1 |  |
| 37 | 0x20 | Vorlaufbegrenzung | 1 |  |
| 37 | 0x40 | Extra Filterlaufzeit | 1 |  |
| 37 | 0x80 | Externe Reglerfreigabe | 1 |  |
| 37 |  | Meldungen | 256 |  |
| 38 | 0x01 | Fehlerrelais | 1 |  |
| 38 | 0x04 | T Beckenkühlfkt | 1 |  |
| 38 | 0x08 | Solarkreis ein | 1 |  |
| 38 | 0x08 | dT Beckenkühlfkt ein | 1 |  |
| 38 | 0x10 | Filter eingeschaltet | 1 |  |
| 38 | 0x20 | Nachhzg normal | 1 |  |
| 38 | 0x40 | Solarkreis aktiv | 1 |  |
| 38 | 0x80 | Betriebsrelais ein | 1 |  |
| 38 |  | Meldungen | 65536 |  |
| 39 | 0x01 | Pumpencheck | 1 |  |
| 39 | 0x04 | Solar dTaus | 1 |  |
| 39 |  | Meldungen | 16777216 |  |
| 40 |  | Filterlaufzeit | 1 |  min |
| 41 |  | Filterlaufzeit | 256 |  min |
| 44 |  | Version | 1.00 |  |
| 44 |  | Solarphase | 1 |  |
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
| 64 |  | Solar Min. Ein/Aus | 1 |  s |
| 65 |  | Solar Min. Ein/Aus | 256 |  s |
| 66 |  | Solar Min. Ein/Aus | 65536 |  s |
| 67 |  | Solar Min. Ein/Aus | 16777216 |  s |
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
| 88 |  | Therm. Energie1 | 1 |  kWh |
| 89 |  | Therm. Energie1 | 256 |  kWh |
| 90 |  | Therm. Energie1 | 65536 |  kWh |
| 91 |  | Therm. Energie1 | 16777216 |  kWh |
| 92 |  | Therm. Energie2 | 1 |  kWh |
| 93 |  | Therm. Energie2 | 256 |  kWh |
| 94 |  | Therm. Energie2 | 65536 |  kWh |
| 95 |  | Therm. Energie2 | 16777216 |  kWh |
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
| 120 |  | Impulszähler 7 \(th. Energie 1\) | 1 |  |
| 120 |  | Impulse | 1 |  |
| 121 |  | Impulszähler 7 \(th. Energie 1\) | 256 |  |
| 121 |  | Impulse | 256 |  |
| 122 |  | Impulse | 65536 |  |
| 122 |  | Impulszähler 7 \(th. Energie 1\) | 65536 |  |
| 123 |  | Impulse | 16777216 |  |
| 123 |  | Impulszähler 7 \(th. Energie 1\) | 16777216 |  |
| 124 |  | Impulse | 1 |  |
| 124 |  | Impulszähler 8 \(th. Energie 2\) | 1 |  |
| 125 |  | Impulse | 256 |  |
| 125 |  | Impulszähler 8 \(th. Energie 2\) | 256 |  |
| 126 |  | Impulszähler 8 \(th. Energie 2\) | 65536 |  |
| 126 |  | Impulse | 65536 |  |
| 127 |  | Impulse | 16777216 |  |
| 127 |  | Impulszähler 8 \(th. Energie 2\) | 16777216 |  |
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



### <a name="0010_7830_0100"></a>DFA (0x0010) <= COSMO Multi HK 1 Estrichtrockung \[Modul 1\] (0x7831 - 0x783F), command 0x0100

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



### <a name="0010_7840_0100"></a>DFA (0x0010) <= COSMO UNO (0x7840), command 0x0100

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
| 20 |  | Drehzahl Relais 1 | 1 | % |
| 21 |  | Drehzahl Relais 2 | 1 | % |
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
| 64 | 0x01 | Speicherkühlung | 1 |  |
| 65 | 0x01 | Systemkühlung | 1 |  |
| 67 |  | Frostschutz | 1 |  |
| 68 | 0x01 | Kollektorkühlung | 1 |  |
| 69 | 0x01 | Speichermaximaltemperatur | 1 |  |
| 72 |  | Fehlermaske | 1 |  |
| 73 |  | Fehlermaske | 256 |  |
| 74 |  | Fehlermaske | 65536 |  |
| 75 |  | Fehlermaske | 16777216 |  |



### <a name="0010_7841_0100"></a>DFA (0x0010) <= COSMO UNO \[WMZ1\] (0x7841), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 4 |  | Leistung | 1 |  W |
| 5 |  | Leistung | 256 |  W |
| 6 |  | Leistung | 65536 |  W |
| 7 |  | Leistung | 16777216 |  W |



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



### <a name="0010_7920_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[Heizkreis\] (0x7920 - 0x792F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_7930_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[WMZ\] (0x7930 - 0x793F), command 0x0100

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
| 19 |  | verbl. Zapfung | 1 |  min |
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
| 30 |  | Version | 1.00 |  |
| 31 |  | Version | 0.01 |  |
| 32 |  | max. Temperatur Kaltwasser | 0.1 |  °C |
| 33 |  | max. Temperatur Kaltwasser | 25.6 |  °C |
| 34 |  | min. Temperatur Kaltwasser | 0.1 |  °C |
| 35 |  | min. Temperatur Kaltwasser | 25.6 |  °C |
| 36 |  | max. Volumenstrom | 1 |  l/h |
| 37 |  | max. Volumenstrom | 256 |  l/h |
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
| 96 | 0x01 | Fehler: Sensorleitung unterbrochen | 1 |  |
| 96 | 0x02 | Fehler: Sensorleitung kurzgeschlossen | 1 |  |
| 96 | 0x20 | Fehler: Volumstromüberwachung | 1 |  |
| 96 | 0x40 | Fehler: Überdruck | 1 |  |
| 96 | 0x80 | Fehler: Minderdruck | 1 |  |
| 96 |  | Fehlermaske | 1 |  |
| 97 | 0x02 | Fehler: Datenspeicher | 1 |  |
| 97 | 0x04 | Fehler: Echtzeituhr | 1 |  |
| 97 | 0x10 | Fehler: Zwillingspumpe | 1 |  |
| 97 | 0x20 | Fehler: HK-Kühlung unter Vorlaufminimaltemperatur | 1 |  |
| 97 | 0x40 | Fehler: Thermische Desinfektion abgebrochen | 1 |  |
| 97 |  | Fehlermaske | 256 |  |
| 98 |  | Fehlermaske | 65536 |  |
| 99 |  | Fehlermaske | 16777216 |  |
| 100 |  | Ausgang A | 1 | % |
| 101 |  | Ausgang B | 1 | % |
| 102 |  | Ausgang C | 1 | % |
| 103 |  | Ausgang D | 1 | % |
| 104 |  | Volumenstrom Sensor 21 | 1 |  l/h |
| 105 |  | Volumenstrom Sensor 21 | 256 |  l/h |
| 106 |  | Volumenstrom Sensor 21 | 65536 |  l/h |
| 107 |  | Volumenstrom Sensor 21 | 16777216 |  l/h |



### <a name="0010_7E11_0101"></a>DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0101

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 | 0x04 | Warnung: ΔT zu hoch | 1 |  |
| 0 | 0x08 | Warnung: Nachtzirkulation | 1 |  |
| 0 | 0x10 | Warnung: Vorlauf/Rücklauf vertauscht | 1 |  |
| 0 |  | Warnungsmaske | 1 |  |
| 1 | 0x08 | Warnung: SD-Karte | 1 |  |
| 1 |  | Warnungsmaske | 256 |  |
| 2 |  | Warnungsmaske | 65536 |  |
| 3 |  | Warnungsmaske | 16777216 |  |
| 4 |  | Luftfeuchtigkeit Sensor 17 | 1 | %RH |
| 5 |  | Luftfeuchtigkeit Sensor 18 | 1 | %RH |
| 6 |  | Luftfeuchtigkeit Sensor 19 | 1 | %RH |
| 7 |  | Luftfeuchtigkeit Sensor 20 | 1 | %RH |



### <a name="0010_7E11_0140"></a>DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0140

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Anzahl TD-Funktionen | 1 |  |
| 1 |  | Nummer letzte erfolgreiche TD | 1 |  |
| 2 |  | Nummer letzte abgebrochene TD | 1 |  |
| 4 |  | Maske erfolgreiche TD | 1 |  |
| 5 |  | Maske erfolgreiche TD | 256 |  |
| 6 |  | Maske abgebrochene TD | 1 |  |
| 7 |  | Maske abgebrochene TD | 256 |  |
| 8 |  | Zeitstempel letzte erfolgreiche TD | 1 |  |
| 9 |  | Zeitstempel letzte erfolgreiche TD | 256 |  |
| 10 |  | Zeitstempel letzte erfolgreiche TD | 65536 |  |
| 11 |  | Zeitstempel letzte erfolgreiche TD | 16777216 |  |
| 12 |  | Zeitstempel letzte abgebrochene TD | 1 |  |
| 13 |  | Zeitstempel letzte abgebrochene TD | 256 |  |
| 14 |  | Zeitstempel letzte abgebrochene TD | 65536 |  |
| 15 |  | Zeitstempel letzte abgebrochene TD | 16777216 |  |



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



### <a name="0010_7E20_0100"></a>DFA (0x0010) <= DeltaSol MX \[Heizkreis\] (0x7E20 - 0x7E2F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 1 |  | Vorlauf-Soll-Temperatur | 25.6 |  °C |
| 2 |  | Betriebsstatus | 1 |  |



### <a name="0010_7E30_0100"></a>DFA (0x0010) <= DeltaSol MX \[WMZ\] (0x7E30 - 0x7E3F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Wärmemenge | 1 |  Wh |
| 1 |  | Wärmemenge | 256 |  Wh |
| 2 |  | Wärmemenge | 65536 |  Wh |
| 3 |  | Wärmemenge | 16777216 |  Wh |
| 4 |  | Leistung | 1 |  W |
| 5 |  | Leistung | 256 |  W |
| 6 |  | Leistung | 65536 |  W |
| 7 |  | Leistung | 16777216 |  W |
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
| 20 |  | Wärmemenge Monat | 1 |  Wh |
| 21 |  | Wärmemenge Monat | 256 |  Wh |
| 22 |  | Wärmemenge Monat | 65536 |  Wh |
| 23 |  | Wärmemenge Monat | 16777216 |  Wh |
| 24 |  | Volumen heute | 1 |  l |
| 25 |  | Volumen heute | 256 |  l |
| 26 |  | Volumen heute | 65536 |  l |
| 27 |  | Volumen heute | 16777216 |  l |
| 28 |  | Volumen Woche | 1 |  l |
| 29 |  | Volumen Woche | 256 |  l |
| 30 |  | Volumen Woche | 65536 |  l |
| 31 |  | Volumen Woche | 16777216 |  l |
| 32 |  | Volumen Monat | 1 |  l |
| 33 |  | Volumen Monat | 256 |  l |
| 34 |  | Volumen Monat | 65536 |  l |
| 35 |  | Volumen Monat | 16777216 |  l |
| 36 |  | Wärmemenge | 1000000000 |  Wh |
| 37 |  | Wärmemenge | 256000000000 |  Wh |
| 38 |  | Wärmemenge | 65536000000000 |  Wh |
| 39 |  | Wärmemenge | 16777216000000000 |  Wh |



### <a name="0010_7E40_0100"></a>DFA (0x0010) <= DeltaSol MX \[Modul\] (0x7E40 - 0x7E4F), command 0x0100

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
| 12 |  | Drehzahl Relais 1 | 1 | % |
| 13 |  | Drehzahl Relais 2 | 1 | % |
| 14 |  | Drehzahl Relais 3 | 1 | % |
| 15 |  | Drehzahl Relais 4 | 1 | % |
| 16 |  | Drehzahl Relais 5 | 1 | % |



### <a name="0010_7E60_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Modul\] (0x7E60 - 0x7E6F), command 0x0100

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
| 12 |  | Drehzahl Relais 1 | 1 | % |
| 13 |  | Drehzahl Relais 2 | 1 | % |
| 14 |  | Drehzahl Relais 3 | 1 | % |
| 15 |  | Drehzahl Relais 4 | 1 | % |
| 16 |  | Drehzahl Relais 5 | 1 | % |



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
| 20 |  | Tmax-Temp./S5 | 0.1 |  °C |
| 21 |  | Tmax-Temp./S5 | 25.6 |  °C |
| 22 |  | Tmax-Temp./S5 | 6553.6 |  °C |
| 23 |  | Tmax-Temp./S5 | 1677721.6 |  °C |
| 24 |  | Einstrahlung | 0.1 |  W/m² |
| 25 |  | Einstrahlung | 25.6 |  W/m² |
| 26 |  | Einstrahlung | 6553.6 |  W/m² |
| 27 |  | Einstrahlung | 1677721.6 |  W/m² |
| 28 |  | Volumenstr.1 | 1 |  l/h |
| 29 |  | Volumenstr.1 | 256 |  l/h |
| 30 |  | Volumenstr.1 | 65536 |  l/h |
| 31 |  | Volumenstr.1 | 16777216 |  l/h |
| 32 |  | Volumenstr.2 | 1 |  l/h |
| 33 |  | Volumenstr.2 | 256 |  l/h |
| 34 |  | Volumenstr.2 | 65536 |  l/h |
| 35 |  | Volumenstr.2 | 16777216 |  l/h |
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
| 8 |  | Tmax-Temp./S5_1s | 0.1 |  °C |
| 9 |  | Tmax-Temp./S5_1s | 25.6 |  °C |
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



### <a name="0015_105F_0100"></a>Standard-Infos (0x0015) <= Tuxhorn BHKW (0x105F), command 0x0100

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | SD3: Temperatur Sensor 1 | 0.1 |  °C |
| 5 |  | SD3: Temperatur Sensor 1 | 25.6 |  °C |
| 6 |  | SD3: Temperatur Sensor 2 | 0.1 |  °C |
| 7 |  | SD3: Temperatur Sensor 2 | 25.6 |  °C |
| 8 |  | SD3: Wärmemenge | 1 |  Wh |
| 9 |  | SD3: Wärmemenge | 256 |  Wh |
| 10 |  | SD3: Wärmemenge | 65536 |  Wh |
| 11 |  | SD3: Wärmemenge | 16777216 |  Wh |
| 16 |  | DZ: Drehzahl 1 | 1 | % |
| 17 |  | DZ: Drehzahl 2 | 1 | % |
| 24 |  | ERR: Errormask | 1 |  |
| 32 |  | TW: Temperatur Sensor 1 | 0.1 |  °C |
| 33 |  | TW: Temperatur Sensor 1 | 25.6 |  °C |
| 34 |  | TW: Temperatur Sensor 2 | 0.1 |  °C |
| 35 |  | TW: Temperatur Sensor 2 | 25.6 |  °C |
| 36 |  | TW: Temperatur Sensor 3 | 0.1 |  °C |
| 37 |  | TW: Temperatur Sensor 3 | 25.6 |  °C |
| 38 |  | TW: Temperatur Sensor 4 | 0.1 |  °C |
| 39 |  | TW: Temperatur Sensor 4 | 25.6 |  °C |
| 44 |  | WM: Wärmemenge | 1 |  Wh |
| 45 |  | WM: Wärmemenge | 256 |  Wh |
| 46 |  | WM: Wärmemenge | 65536 |  Wh |
| 47 |  | WM: Wärmemenge | 16777216 |  Wh |
| 52 |  | BS: Betriebsstunden Relais 1 | 1 |  h |
| 53 |  | BS: Betriebsstunden Relais 1 | 256 |  h |
| 54 |  | BS: Betriebsstunden Relais 1 | 65536 |  h |
| 55 |  | BS: Betriebsstunden Relais 1 | 16777216 |  h |
| 56 |  | BS: Betriebsstunden Relais 2 | 1 |  h |
| 57 |  | BS: Betriebsstunden Relais 2 | 256 |  h |
| 58 |  | BS: Betriebsstunden Relais 2 | 65536 |  h |
| 59 |  | BS: Betriebsstunden Relais 2 | 16777216 |  h |



### <a name="1260_1260_0101"></a>Viessmann Vitotrans 353 2017 Broadcast (0x1260) <= Viessmann Vitotrans 353 2017 Broadcast (0x1260 - 0x126F), command 0x0101

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 2 |  | Einschaltschwelle | 1 | % |
| 3 |  | Ausschaltschwelle | 1 | % |
| 8 | 0x02 | Master / Station 1 vorhanden | 1 |  |
| 8 | 0x04 | Station 2 vorhanden | 1 |  |
| 8 | 0x08 | Station 3 vorhanden | 1 |  |
| 8 | 0x10 | Station 4 vorhanden | 1 |  |
| 40 |  | Systemdatum | 1 |  |
| 41 |  | Systemdatum | 256 |  |
| 42 |  | Systemdatum | 65536 |  |
| 43 |  | Systemdatum | 16777216 |  |



### <a name="1261_1261_0301"></a>Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Master: Version | 1 |  |
| 1 |  | Master: Version | 256 |  |
| 2 |  | Master: Status | 1 |  |
| 3 |  | Master: Status | 256 |  |
| 4 |  | Master: Fehlermaske | 1 |  |
| 5 |  | Master: Fehlermaske | 256 |  |
| 6 |  | Master: Fehlermaske | 65536 |  |
| 7 |  | Master: Fehlermaske | 16777216 |  |
| 8 |  | Master: T-WW | 0.1 |  °C |
| 9 |  | Master: T-WW | 25.6 |  °C |
| 10 |  | Master: T-KW | 0.1 |  °C |
| 11 |  | Master: T-KW | 25.6 |  °C |
| 12 |  | Master: T-SpVL | 0.1 |  °C |
| 13 |  | Master: T-SpVL | 25.6 |  °C |
| 16 |  | Master: Volumenstrom | 0.1 |  l/min |
| 17 |  | Master: Volumenstrom | 25.6 |  l/min |
| 18 |  | Master: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Master: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Master: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Master: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Master: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Master: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Master: Reglervariante | 1 |  |
| 49 |  | Master: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Master: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Master: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Master: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Master: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Master: Strangventil Zustand | 1 |  |



### <a name="1261_1262_0301"></a>Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 1: Version | 1 |  |
| 1 |  | Slave 1: Version | 256 |  |
| 2 |  | Slave 1: Status | 1 |  |
| 3 |  | Slave 1: Status | 256 |  |
| 4 |  | Slave 1: Fehlermaske | 1 |  |
| 5 |  | Slave 1: Fehlermaske | 256 |  |
| 6 |  | Slave 1: Fehlermaske | 65536 |  |
| 7 |  | Slave 1: Fehlermaske | 16777216 |  |
| 8 |  | Slave 1: T-WW | 0.1 |  °C |
| 9 |  | Slave 1: T-WW | 25.6 |  °C |
| 10 |  | Slave 1: T-KW | 0.1 |  °C |
| 11 |  | Slave 1: T-KW | 25.6 |  °C |
| 12 |  | Slave 1: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 1: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 1: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 1: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 1: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 1: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 1: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 1: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 1: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 1: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 1: Reglervariante | 1 |  |
| 49 |  | Slave 1: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 1: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 1: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 1: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 1: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 1: Strangventil Zustand | 1 |  |



### <a name="1261_1263_0301"></a>Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 2: Version | 1 |  |
| 1 |  | Slave 2: Version | 256 |  |
| 2 |  | Slave 2: Status | 1 |  |
| 3 |  | Slave 2: Status | 256 |  |
| 4 |  | Slave 2: Fehlermaske | 1 |  |
| 5 |  | Slave 2: Fehlermaske | 256 |  |
| 6 |  | Slave 2: Fehlermaske | 65536 |  |
| 7 |  | Slave 2: Fehlermaske | 16777216 |  |
| 8 |  | Slave 2: T-WW | 0.1 |  °C |
| 9 |  | Slave 2: T-WW | 25.6 |  °C |
| 10 |  | Slave 2: T-KW | 0.1 |  °C |
| 11 |  | Slave 2: T-KW | 25.6 |  °C |
| 12 |  | Slave 2: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 2: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 2: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 2: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 2: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 2: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 2: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 2: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 2: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 2: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 2: Reglervariante | 1 |  |
| 49 |  | Slave 2: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 2: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 2: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 2: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 2: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 2: Strangventil Zustand | 1 |  |



### <a name="1261_1264_0301"></a>Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 3: Version | 1 |  |
| 1 |  | Slave 3: Version | 256 |  |
| 2 |  | Slave 3: Status | 1 |  |
| 3 |  | Slave 3: Status | 256 |  |
| 4 |  | Slave 3: Fehlermaske | 1 |  |
| 5 |  | Slave 3: Fehlermaske | 256 |  |
| 6 |  | Slave 3: Fehlermaske | 65536 |  |
| 7 |  | Slave 3: Fehlermaske | 16777216 |  |
| 8 |  | Slave 3: T-WW | 0.1 |  °C |
| 9 |  | Slave 3: T-WW | 25.6 |  °C |
| 10 |  | Slave 3: T-KW | 0.1 |  °C |
| 11 |  | Slave 3: T-KW | 25.6 |  °C |
| 12 |  | Slave 3: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 3: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 3: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 3: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 3: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 3: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 3: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 3: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 3: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 3: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 3: Reglervariante | 1 |  |
| 49 |  | Slave 3: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 3: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 3: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 3: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 3: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 3: Strangventil Zustand | 1 |  |



### <a name="1262_1261_0301"></a>Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Master: Version | 1 |  |
| 1 |  | Master: Version | 256 |  |
| 2 |  | Master: Status | 1 |  |
| 3 |  | Master: Status | 256 |  |
| 4 |  | Master: Fehlermaske | 1 |  |
| 5 |  | Master: Fehlermaske | 256 |  |
| 6 |  | Master: Fehlermaske | 65536 |  |
| 7 |  | Master: Fehlermaske | 16777216 |  |
| 8 |  | Master: T-WW | 0.1 |  °C |
| 9 |  | Master: T-WW | 25.6 |  °C |
| 10 |  | Master: T-KW | 0.1 |  °C |
| 11 |  | Master: T-KW | 25.6 |  °C |
| 12 |  | Master: T-SpVL | 0.1 |  °C |
| 13 |  | Master: T-SpVL | 25.6 |  °C |
| 16 |  | Master: Volumenstrom | 0.1 |  l/min |
| 17 |  | Master: Volumenstrom | 25.6 |  l/min |
| 18 |  | Master: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Master: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Master: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Master: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Master: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Master: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Master: Reglervariante | 1 |  |
| 49 |  | Master: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Master: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Master: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Master: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Master: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Master: Strangventil Zustand | 1 |  |



### <a name="1262_1262_0301"></a>Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 1: Version | 1 |  |
| 1 |  | Slave 1: Version | 256 |  |
| 2 |  | Slave 1: Status | 1 |  |
| 3 |  | Slave 1: Status | 256 |  |
| 4 |  | Slave 1: Fehlermaske | 1 |  |
| 5 |  | Slave 1: Fehlermaske | 256 |  |
| 6 |  | Slave 1: Fehlermaske | 65536 |  |
| 7 |  | Slave 1: Fehlermaske | 16777216 |  |
| 8 |  | Slave 1: T-WW | 0.1 |  °C |
| 9 |  | Slave 1: T-WW | 25.6 |  °C |
| 10 |  | Slave 1: T-KW | 0.1 |  °C |
| 11 |  | Slave 1: T-KW | 25.6 |  °C |
| 12 |  | Slave 1: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 1: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 1: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 1: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 1: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 1: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 1: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 1: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 1: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 1: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 1: Reglervariante | 1 |  |
| 49 |  | Slave 1: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 1: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 1: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 1: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 1: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 1: Strangventil Zustand | 1 |  |



### <a name="1262_1263_0301"></a>Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 2: Version | 1 |  |
| 1 |  | Slave 2: Version | 256 |  |
| 2 |  | Slave 2: Status | 1 |  |
| 3 |  | Slave 2: Status | 256 |  |
| 4 |  | Slave 2: Fehlermaske | 1 |  |
| 5 |  | Slave 2: Fehlermaske | 256 |  |
| 6 |  | Slave 2: Fehlermaske | 65536 |  |
| 7 |  | Slave 2: Fehlermaske | 16777216 |  |
| 8 |  | Slave 2: T-WW | 0.1 |  °C |
| 9 |  | Slave 2: T-WW | 25.6 |  °C |
| 10 |  | Slave 2: T-KW | 0.1 |  °C |
| 11 |  | Slave 2: T-KW | 25.6 |  °C |
| 12 |  | Slave 2: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 2: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 2: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 2: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 2: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 2: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 2: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 2: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 2: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 2: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 2: Reglervariante | 1 |  |
| 49 |  | Slave 2: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 2: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 2: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 2: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 2: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 2: Strangventil Zustand | 1 |  |



### <a name="1262_1264_0301"></a>Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 3: Version | 1 |  |
| 1 |  | Slave 3: Version | 256 |  |
| 2 |  | Slave 3: Status | 1 |  |
| 3 |  | Slave 3: Status | 256 |  |
| 4 |  | Slave 3: Fehlermaske | 1 |  |
| 5 |  | Slave 3: Fehlermaske | 256 |  |
| 6 |  | Slave 3: Fehlermaske | 65536 |  |
| 7 |  | Slave 3: Fehlermaske | 16777216 |  |
| 8 |  | Slave 3: T-WW | 0.1 |  °C |
| 9 |  | Slave 3: T-WW | 25.6 |  °C |
| 10 |  | Slave 3: T-KW | 0.1 |  °C |
| 11 |  | Slave 3: T-KW | 25.6 |  °C |
| 12 |  | Slave 3: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 3: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 3: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 3: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 3: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 3: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 3: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 3: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 3: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 3: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 3: Reglervariante | 1 |  |
| 49 |  | Slave 3: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 3: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 3: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 3: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 3: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 3: Strangventil Zustand | 1 |  |



### <a name="1263_1261_0301"></a>Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Master: Version | 1 |  |
| 1 |  | Master: Version | 256 |  |
| 2 |  | Master: Status | 1 |  |
| 3 |  | Master: Status | 256 |  |
| 4 |  | Master: Fehlermaske | 1 |  |
| 5 |  | Master: Fehlermaske | 256 |  |
| 6 |  | Master: Fehlermaske | 65536 |  |
| 7 |  | Master: Fehlermaske | 16777216 |  |
| 8 |  | Master: T-WW | 0.1 |  °C |
| 9 |  | Master: T-WW | 25.6 |  °C |
| 10 |  | Master: T-KW | 0.1 |  °C |
| 11 |  | Master: T-KW | 25.6 |  °C |
| 12 |  | Master: T-SpVL | 0.1 |  °C |
| 13 |  | Master: T-SpVL | 25.6 |  °C |
| 16 |  | Master: Volumenstrom | 0.1 |  l/min |
| 17 |  | Master: Volumenstrom | 25.6 |  l/min |
| 18 |  | Master: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Master: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Master: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Master: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Master: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Master: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Master: Reglervariante | 1 |  |
| 49 |  | Master: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Master: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Master: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Master: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Master: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Master: Strangventil Zustand | 1 |  |



### <a name="1263_1262_0301"></a>Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 1: Version | 1 |  |
| 1 |  | Slave 1: Version | 256 |  |
| 2 |  | Slave 1: Status | 1 |  |
| 3 |  | Slave 1: Status | 256 |  |
| 4 |  | Slave 1: Fehlermaske | 1 |  |
| 5 |  | Slave 1: Fehlermaske | 256 |  |
| 6 |  | Slave 1: Fehlermaske | 65536 |  |
| 7 |  | Slave 1: Fehlermaske | 16777216 |  |
| 8 |  | Slave 1: T-WW | 0.1 |  °C |
| 9 |  | Slave 1: T-WW | 25.6 |  °C |
| 10 |  | Slave 1: T-KW | 0.1 |  °C |
| 11 |  | Slave 1: T-KW | 25.6 |  °C |
| 12 |  | Slave 1: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 1: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 1: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 1: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 1: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 1: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 1: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 1: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 1: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 1: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 1: Reglervariante | 1 |  |
| 49 |  | Slave 1: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 1: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 1: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 1: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 1: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 1: Strangventil Zustand | 1 |  |



### <a name="1263_1263_0301"></a>Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 2: Version | 1 |  |
| 1 |  | Slave 2: Version | 256 |  |
| 2 |  | Slave 2: Status | 1 |  |
| 3 |  | Slave 2: Status | 256 |  |
| 4 |  | Slave 2: Fehlermaske | 1 |  |
| 5 |  | Slave 2: Fehlermaske | 256 |  |
| 6 |  | Slave 2: Fehlermaske | 65536 |  |
| 7 |  | Slave 2: Fehlermaske | 16777216 |  |
| 8 |  | Slave 2: T-WW | 0.1 |  °C |
| 9 |  | Slave 2: T-WW | 25.6 |  °C |
| 10 |  | Slave 2: T-KW | 0.1 |  °C |
| 11 |  | Slave 2: T-KW | 25.6 |  °C |
| 12 |  | Slave 2: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 2: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 2: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 2: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 2: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 2: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 2: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 2: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 2: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 2: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 2: Reglervariante | 1 |  |
| 49 |  | Slave 2: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 2: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 2: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 2: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 2: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 2: Strangventil Zustand | 1 |  |



### <a name="1263_1264_0301"></a>Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 3: Version | 1 |  |
| 1 |  | Slave 3: Version | 256 |  |
| 2 |  | Slave 3: Status | 1 |  |
| 3 |  | Slave 3: Status | 256 |  |
| 4 |  | Slave 3: Fehlermaske | 1 |  |
| 5 |  | Slave 3: Fehlermaske | 256 |  |
| 6 |  | Slave 3: Fehlermaske | 65536 |  |
| 7 |  | Slave 3: Fehlermaske | 16777216 |  |
| 8 |  | Slave 3: T-WW | 0.1 |  °C |
| 9 |  | Slave 3: T-WW | 25.6 |  °C |
| 10 |  | Slave 3: T-KW | 0.1 |  °C |
| 11 |  | Slave 3: T-KW | 25.6 |  °C |
| 12 |  | Slave 3: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 3: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 3: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 3: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 3: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 3: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 3: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 3: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 3: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 3: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 3: Reglervariante | 1 |  |
| 49 |  | Slave 3: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 3: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 3: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 3: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 3: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 3: Strangventil Zustand | 1 |  |



### <a name="1264_1261_0301"></a>Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Master: Version | 1 |  |
| 1 |  | Master: Version | 256 |  |
| 2 |  | Master: Status | 1 |  |
| 3 |  | Master: Status | 256 |  |
| 4 |  | Master: Fehlermaske | 1 |  |
| 5 |  | Master: Fehlermaske | 256 |  |
| 6 |  | Master: Fehlermaske | 65536 |  |
| 7 |  | Master: Fehlermaske | 16777216 |  |
| 8 |  | Master: T-WW | 0.1 |  °C |
| 9 |  | Master: T-WW | 25.6 |  °C |
| 10 |  | Master: T-KW | 0.1 |  °C |
| 11 |  | Master: T-KW | 25.6 |  °C |
| 12 |  | Master: T-SpVL | 0.1 |  °C |
| 13 |  | Master: T-SpVL | 25.6 |  °C |
| 16 |  | Master: Volumenstrom | 0.1 |  l/min |
| 17 |  | Master: Volumenstrom | 25.6 |  l/min |
| 18 |  | Master: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Master: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Master: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Master: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Master: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Master: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Master: Reglervariante | 1 |  |
| 49 |  | Master: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Master: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Master: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Master: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Master: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Master: Strangventil Zustand | 1 |  |



### <a name="1264_1262_0301"></a>Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 1: Version | 1 |  |
| 1 |  | Slave 1: Version | 256 |  |
| 2 |  | Slave 1: Status | 1 |  |
| 3 |  | Slave 1: Status | 256 |  |
| 4 |  | Slave 1: Fehlermaske | 1 |  |
| 5 |  | Slave 1: Fehlermaske | 256 |  |
| 6 |  | Slave 1: Fehlermaske | 65536 |  |
| 7 |  | Slave 1: Fehlermaske | 16777216 |  |
| 8 |  | Slave 1: T-WW | 0.1 |  °C |
| 9 |  | Slave 1: T-WW | 25.6 |  °C |
| 10 |  | Slave 1: T-KW | 0.1 |  °C |
| 11 |  | Slave 1: T-KW | 25.6 |  °C |
| 12 |  | Slave 1: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 1: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 1: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 1: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 1: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 1: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 1: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 1: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 1: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 1: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 1: Reglervariante | 1 |  |
| 49 |  | Slave 1: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 1: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 1: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 1: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 1: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 1: Strangventil Zustand | 1 |  |



### <a name="1264_1263_0301"></a>Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 2: Version | 1 |  |
| 1 |  | Slave 2: Version | 256 |  |
| 2 |  | Slave 2: Status | 1 |  |
| 3 |  | Slave 2: Status | 256 |  |
| 4 |  | Slave 2: Fehlermaske | 1 |  |
| 5 |  | Slave 2: Fehlermaske | 256 |  |
| 6 |  | Slave 2: Fehlermaske | 65536 |  |
| 7 |  | Slave 2: Fehlermaske | 16777216 |  |
| 8 |  | Slave 2: T-WW | 0.1 |  °C |
| 9 |  | Slave 2: T-WW | 25.6 |  °C |
| 10 |  | Slave 2: T-KW | 0.1 |  °C |
| 11 |  | Slave 2: T-KW | 25.6 |  °C |
| 12 |  | Slave 2: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 2: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 2: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 2: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 2: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 2: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 2: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 2: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 2: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 2: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 2: Reglervariante | 1 |  |
| 49 |  | Slave 2: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 2: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 2: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 2: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 2: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 2: Strangventil Zustand | 1 |  |



### <a name="1264_1264_0301"></a>Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Slave 3: Version | 1 |  |
| 1 |  | Slave 3: Version | 256 |  |
| 2 |  | Slave 3: Status | 1 |  |
| 3 |  | Slave 3: Status | 256 |  |
| 4 |  | Slave 3: Fehlermaske | 1 |  |
| 5 |  | Slave 3: Fehlermaske | 256 |  |
| 6 |  | Slave 3: Fehlermaske | 65536 |  |
| 7 |  | Slave 3: Fehlermaske | 16777216 |  |
| 8 |  | Slave 3: T-WW | 0.1 |  °C |
| 9 |  | Slave 3: T-WW | 25.6 |  °C |
| 10 |  | Slave 3: T-KW | 0.1 |  °C |
| 11 |  | Slave 3: T-KW | 25.6 |  °C |
| 12 |  | Slave 3: T-SpVL | 0.1 |  °C |
| 13 |  | Slave 3: T-SpVL | 25.6 |  °C |
| 16 |  | Slave 3: Volumenstrom | 0.1 |  l/min |
| 17 |  | Slave 3: Volumenstrom | 25.6 |  l/min |
| 18 |  | Slave 3: Volumenstrom | 6553.6 |  l/min |
| 19 |  | Slave 3: Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Slave 3: Stationsbetriebssekunden | 1 |  s |
| 25 |  | Slave 3: Stationsbetriebssekunden | 256 |  s |
| 26 |  | Slave 3: Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Slave 3: Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Slave 3: Reglervariante | 1 |  |
| 49 |  | Slave 3: Primärpumpe Drehzahl | 1 | % |
| 52 |  | Slave 3: Primärpumpe Betriebssekunden | 1 |  s |
| 53 |  | Slave 3: Primärpumpe Betriebssekunden | 256 |  s |
| 54 |  | Slave 3: Primärpumpe Betriebssekunden | 65536 |  s |
| 55 |  | Slave 3: Primärpumpe Betriebssekunden | 16777216 |  s |
| 56 |  | Slave 3: Strangventil Zustand | 1 |  |



### <a name="1520_1521_0222"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0222

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 | 0x02 | Station 1 Basis | 1 |  |
| 0 | 0x04 | Station 2 Basis | 1 |  |
| 0 | 0x08 | Station 3 Basis | 1 |  |
| 0 | 0x10 | Station 4 Basis | 1 |  |
| 1 | 0x02 | Station 1 Ein | 1 |  |
| 1 | 0x04 | Station 2 Ein | 1 |  |
| 1 | 0x08 | Station 3 Ein | 1 |  |
| 1 | 0x10 | Station 4 Ein | 1 |  |
| 2 | 0x02 | Station 1 Erreichbar | 1 |  |
| 2 | 0x04 | Station 2 Erreichbar | 1 |  |
| 2 | 0x08 | Station 3 Erreichbar | 1 |  |
| 2 | 0x10 | Station 4 Erreichbar | 1 |  |
| 3 | 0x02 | Station 1 Fehler | 1 |  |
| 3 | 0x04 | Station 2 Fehler | 1 |  |
| 3 | 0x08 | Station 3 Fehler | 1 |  |
| 3 | 0x10 | Station 4 Fehler | 1 |  |
| 4 | 0x02 | Station 1 Durchflusserkennung | 1 |  |
| 4 | 0x04 | Station 2 Durchflusserkennung | 1 |  |
| 4 | 0x08 | Station 3 Durchflusserkennung | 1 |  |
| 4 | 0x10 | Station 4 Durchflusserkennung | 1 |  |
| 5 | 0x02 | Station 1 Desinfektion | 1 |  |
| 5 | 0x04 | Station 2 Desinfektion | 1 |  |
| 5 | 0x08 | Station 3 Desinfektion | 1 |  |
| 5 | 0x10 | Station 4 Desinfektion | 1 |  |
| 6 | 0x02 | Station 1 Blockierschutz | 1 |  |
| 6 | 0x04 | Station 2 Blockierschutz | 1 |  |
| 6 | 0x08 | Station 3 Blockierschutz | 1 |  |
| 6 | 0x10 | Station 4 Blockierschutz | 1 |  |
| 7 |  | DurchflussErwartet | 1 |  |
| 8 |  | RLEinschichtung Relais | 1 |  |



### <a name="1520_1521_0333"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0333

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 1: Systemdatum | 1 |  |
| 5 |  | Station 1: Systemdatum | 256 |  |
| 6 |  | Station 1: Systemdatum | 65536 |  |
| 7 |  | Station 1: Systemdatum | 16777216 |  |
| 24 |  | Station 1: Solltemperatur | 0.1 |  °C |
| 25 |  | Station 1: Solltemperatur | 25.6 |  °C |
| 28 |  | Station 1: Variante | 1 |  |



### <a name="1520_1522_0222"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0222

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 | 0x02 | Station 1 Basis | 1 |  |
| 0 | 0x04 | Station 2 Basis | 1 |  |
| 0 | 0x08 | Station 3 Basis | 1 |  |
| 0 | 0x10 | Station 4 Basis | 1 |  |
| 1 | 0x02 | Station 1 Ein | 1 |  |
| 1 | 0x04 | Station 2 Ein | 1 |  |
| 1 | 0x08 | Station 3 Ein | 1 |  |
| 1 | 0x10 | Station 4 Ein | 1 |  |
| 2 | 0x02 | Station 1 Erreichbar | 1 |  |
| 2 | 0x04 | Station 2 Erreichbar | 1 |  |
| 2 | 0x08 | Station 3 Erreichbar | 1 |  |
| 2 | 0x10 | Station 4 Erreichbar | 1 |  |
| 3 | 0x02 | Station 1 Fehler | 1 |  |
| 3 | 0x04 | Station 2 Fehler | 1 |  |
| 3 | 0x08 | Station 3 Fehler | 1 |  |
| 3 | 0x10 | Station 4 Fehler | 1 |  |
| 4 | 0x02 | Station 1 Durchflusserkennung | 1 |  |
| 4 | 0x04 | Station 2 Durchflusserkennung | 1 |  |
| 4 | 0x08 | Station 3 Durchflusserkennung | 1 |  |
| 4 | 0x10 | Station 4 Durchflusserkennung | 1 |  |
| 5 | 0x02 | Station 1 Desinfektion | 1 |  |
| 5 | 0x04 | Station 2 Desinfektion | 1 |  |
| 5 | 0x08 | Station 3 Desinfektion | 1 |  |
| 5 | 0x10 | Station 4 Desinfektion | 1 |  |
| 6 | 0x02 | Station 1 Blockierschutz | 1 |  |
| 6 | 0x04 | Station 2 Blockierschutz | 1 |  |
| 6 | 0x08 | Station 3 Blockierschutz | 1 |  |
| 6 | 0x10 | Station 4 Blockierschutz | 1 |  |
| 7 |  | DurchflussErwartet | 1 |  |
| 8 |  | RLEinschichtung Relais | 1 |  |



### <a name="1520_1522_0333"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0333

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 2: Systemdatum | 1 |  |
| 5 |  | Station 2: Systemdatum | 256 |  |
| 6 |  | Station 2: Systemdatum | 65536 |  |
| 7 |  | Station 2: Systemdatum | 16777216 |  |
| 24 |  | Station 2: Solltemperatur | 0.1 |  °C |
| 25 |  | Station 2: Solltemperatur | 25.6 |  °C |
| 28 |  | Station 2: Variante | 1 |  |



### <a name="1520_1523_0222"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0222

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 | 0x02 | Station 1 Basis | 1 |  |
| 0 | 0x04 | Station 2 Basis | 1 |  |
| 0 | 0x08 | Station 3 Basis | 1 |  |
| 0 | 0x10 | Station 4 Basis | 1 |  |
| 1 | 0x02 | Station 1 Ein | 1 |  |
| 1 | 0x04 | Station 2 Ein | 1 |  |
| 1 | 0x08 | Station 3 Ein | 1 |  |
| 1 | 0x10 | Station 4 Ein | 1 |  |
| 2 | 0x02 | Station 1 Erreichbar | 1 |  |
| 2 | 0x04 | Station 2 Erreichbar | 1 |  |
| 2 | 0x08 | Station 3 Erreichbar | 1 |  |
| 2 | 0x10 | Station 4 Erreichbar | 1 |  |
| 3 | 0x02 | Station 1 Fehler | 1 |  |
| 3 | 0x04 | Station 2 Fehler | 1 |  |
| 3 | 0x08 | Station 3 Fehler | 1 |  |
| 3 | 0x10 | Station 4 Fehler | 1 |  |
| 4 | 0x02 | Station 1 Durchflusserkennung | 1 |  |
| 4 | 0x04 | Station 2 Durchflusserkennung | 1 |  |
| 4 | 0x08 | Station 3 Durchflusserkennung | 1 |  |
| 4 | 0x10 | Station 4 Durchflusserkennung | 1 |  |
| 5 | 0x02 | Station 1 Desinfektion | 1 |  |
| 5 | 0x04 | Station 2 Desinfektion | 1 |  |
| 5 | 0x08 | Station 3 Desinfektion | 1 |  |
| 5 | 0x10 | Station 4 Desinfektion | 1 |  |
| 6 | 0x02 | Station 1 Blockierschutz | 1 |  |
| 6 | 0x04 | Station 2 Blockierschutz | 1 |  |
| 6 | 0x08 | Station 3 Blockierschutz | 1 |  |
| 6 | 0x10 | Station 4 Blockierschutz | 1 |  |
| 7 |  | DurchflussErwartet | 1 |  |
| 8 |  | RLEinschichtung Relais | 1 |  |



### <a name="1520_1523_0333"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0333

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 3: Systemdatum | 1 |  |
| 5 |  | Station 3: Systemdatum | 256 |  |
| 6 |  | Station 3: Systemdatum | 65536 |  |
| 7 |  | Station 3: Systemdatum | 16777216 |  |
| 24 |  | Station 3: Solltemperatur | 0.1 |  °C |
| 25 |  | Station 3: Solltemperatur | 25.6 |  °C |
| 28 |  | Station 3: Variante | 1 |  |



### <a name="1520_1524_0222"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0222

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 | 0x02 | Station 1 Basis | 1 |  |
| 0 | 0x04 | Station 2 Basis | 1 |  |
| 0 | 0x08 | Station 3 Basis | 1 |  |
| 0 | 0x10 | Station 4 Basis | 1 |  |
| 1 | 0x02 | Station 1 Ein | 1 |  |
| 1 | 0x04 | Station 2 Ein | 1 |  |
| 1 | 0x08 | Station 3 Ein | 1 |  |
| 1 | 0x10 | Station 4 Ein | 1 |  |
| 2 | 0x02 | Station 1 Erreichbar | 1 |  |
| 2 | 0x04 | Station 2 Erreichbar | 1 |  |
| 2 | 0x08 | Station 3 Erreichbar | 1 |  |
| 2 | 0x10 | Station 4 Erreichbar | 1 |  |
| 3 | 0x02 | Station 1 Fehler | 1 |  |
| 3 | 0x04 | Station 2 Fehler | 1 |  |
| 3 | 0x08 | Station 3 Fehler | 1 |  |
| 3 | 0x10 | Station 4 Fehler | 1 |  |
| 4 | 0x02 | Station 1 Durchflusserkennung | 1 |  |
| 4 | 0x04 | Station 2 Durchflusserkennung | 1 |  |
| 4 | 0x08 | Station 3 Durchflusserkennung | 1 |  |
| 4 | 0x10 | Station 4 Durchflusserkennung | 1 |  |
| 5 | 0x02 | Station 1 Desinfektion | 1 |  |
| 5 | 0x04 | Station 2 Desinfektion | 1 |  |
| 5 | 0x08 | Station 3 Desinfektion | 1 |  |
| 5 | 0x10 | Station 4 Desinfektion | 1 |  |
| 6 | 0x02 | Station 1 Blockierschutz | 1 |  |
| 6 | 0x04 | Station 2 Blockierschutz | 1 |  |
| 6 | 0x08 | Station 3 Blockierschutz | 1 |  |
| 6 | 0x10 | Station 4 Blockierschutz | 1 |  |
| 7 |  | DurchflussErwartet | 1 |  |
| 8 |  | RLEinschichtung Relais | 1 |  |



### <a name="1520_1524_0333"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0333

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 4: Systemdatum | 1 |  |
| 5 |  | Station 4: Systemdatum | 256 |  |
| 6 |  | Station 4: Systemdatum | 65536 |  |
| 7 |  | Station 4: Systemdatum | 16777216 |  |
| 24 |  | Station 4: Solltemperatur | 0.1 |  °C |
| 25 |  | Station 4: Solltemperatur | 25.6 |  °C |
| 28 |  | Station 4: Variante | 1 |  |



### <a name="1521_1521_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 1: Systemdatum | 1 |  |
| 5 |  | Station 1: Systemdatum | 256 |  |
| 6 |  | Station 1: Systemdatum | 65536 |  |
| 7 |  | Station 1: Systemdatum | 16777216 |  |
| 12 |  | Station 1: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 1: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 1: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 1: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 1: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 1: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 1: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 1: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 1: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 1: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 1: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 1: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 1: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 1: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 1: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 1: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 1: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 1: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 1: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 1: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 1: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 1: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 1: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 1: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 1: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 1: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 1: Variante | 1 |  |
| 60 |  | Station 1: Strangventil Zustand | 1 |  |
| 62 |  | Station 1: RLEinschichtung Ventil | 1 |  |



### <a name="1521_1522_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 2: Systemdatum | 1 |  |
| 5 |  | Station 2: Systemdatum | 256 |  |
| 6 |  | Station 2: Systemdatum | 65536 |  |
| 7 |  | Station 2: Systemdatum | 16777216 |  |
| 12 |  | Station 2: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 2: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 2: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 2: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 2: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 2: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 2: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 2: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 2: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 2: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 2: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 2: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 2: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 2: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 2: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 2: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 2: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 2: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 2: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 2: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 2: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 2: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 2: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 2: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 2: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 2: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 2: Variante | 1 |  |
| 60 |  | Station 2: Strangventil Zustand | 1 |  |
| 62 |  | Station 2: RLEinschichtung Ventil | 1 |  |



### <a name="1521_1523_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 3: Systemdatum | 1 |  |
| 5 |  | Station 3: Systemdatum | 256 |  |
| 6 |  | Station 3: Systemdatum | 65536 |  |
| 7 |  | Station 3: Systemdatum | 16777216 |  |
| 12 |  | Station 3: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 3: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 3: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 3: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 3: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 3: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 3: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 3: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 3: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 3: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 3: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 3: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 3: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 3: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 3: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 3: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 3: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 3: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 3: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 3: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 3: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 3: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 3: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 3: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 3: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 3: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 3: Variante | 1 |  |
| 60 |  | Station 3: Strangventil Zustand | 1 |  |
| 62 |  | Station 3: RLEinschichtung Ventil | 1 |  |



### <a name="1521_1524_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 4: Systemdatum | 1 |  |
| 5 |  | Station 4: Systemdatum | 256 |  |
| 6 |  | Station 4: Systemdatum | 65536 |  |
| 7 |  | Station 4: Systemdatum | 16777216 |  |
| 12 |  | Station 4: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 4: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 4: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 4: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 4: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 4: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 4: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 4: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 4: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 4: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 4: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 4: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 4: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 4: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 4: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 4: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 4: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 4: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 4: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 4: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 4: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 4: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 4: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 4: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 4: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 4: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 4: Variante | 1 |  |
| 60 |  | Station 4: Strangventil Zustand | 1 |  |
| 62 |  | Station 4: RLEinschichtung Ventil | 1 |  |



### <a name="1522_1521_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 1: Systemdatum | 1 |  |
| 5 |  | Station 1: Systemdatum | 256 |  |
| 6 |  | Station 1: Systemdatum | 65536 |  |
| 7 |  | Station 1: Systemdatum | 16777216 |  |
| 12 |  | Station 1: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 1: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 1: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 1: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 1: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 1: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 1: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 1: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 1: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 1: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 1: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 1: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 1: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 1: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 1: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 1: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 1: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 1: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 1: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 1: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 1: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 1: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 1: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 1: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 1: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 1: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 1: Variante | 1 |  |
| 60 |  | Station 1: Strangventil Zustand | 1 |  |
| 62 |  | Station 1: RLEinschichtung Ventil | 1 |  |



### <a name="1522_1522_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 2: Systemdatum | 1 |  |
| 5 |  | Station 2: Systemdatum | 256 |  |
| 6 |  | Station 2: Systemdatum | 65536 |  |
| 7 |  | Station 2: Systemdatum | 16777216 |  |
| 12 |  | Station 2: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 2: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 2: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 2: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 2: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 2: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 2: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 2: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 2: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 2: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 2: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 2: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 2: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 2: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 2: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 2: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 2: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 2: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 2: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 2: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 2: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 2: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 2: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 2: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 2: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 2: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 2: Variante | 1 |  |
| 60 |  | Station 2: Strangventil Zustand | 1 |  |
| 62 |  | Station 2: RLEinschichtung Ventil | 1 |  |



### <a name="1522_1523_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 3: Systemdatum | 1 |  |
| 5 |  | Station 3: Systemdatum | 256 |  |
| 6 |  | Station 3: Systemdatum | 65536 |  |
| 7 |  | Station 3: Systemdatum | 16777216 |  |
| 12 |  | Station 3: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 3: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 3: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 3: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 3: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 3: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 3: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 3: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 3: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 3: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 3: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 3: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 3: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 3: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 3: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 3: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 3: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 3: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 3: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 3: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 3: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 3: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 3: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 3: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 3: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 3: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 3: Variante | 1 |  |
| 60 |  | Station 3: Strangventil Zustand | 1 |  |
| 62 |  | Station 3: RLEinschichtung Ventil | 1 |  |



### <a name="1522_1524_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 4: Systemdatum | 1 |  |
| 5 |  | Station 4: Systemdatum | 256 |  |
| 6 |  | Station 4: Systemdatum | 65536 |  |
| 7 |  | Station 4: Systemdatum | 16777216 |  |
| 12 |  | Station 4: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 4: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 4: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 4: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 4: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 4: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 4: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 4: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 4: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 4: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 4: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 4: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 4: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 4: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 4: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 4: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 4: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 4: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 4: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 4: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 4: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 4: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 4: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 4: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 4: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 4: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 4: Variante | 1 |  |
| 60 |  | Station 4: Strangventil Zustand | 1 |  |
| 62 |  | Station 4: RLEinschichtung Ventil | 1 |  |



### <a name="1523_1521_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 1: Systemdatum | 1 |  |
| 5 |  | Station 1: Systemdatum | 256 |  |
| 6 |  | Station 1: Systemdatum | 65536 |  |
| 7 |  | Station 1: Systemdatum | 16777216 |  |
| 12 |  | Station 1: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 1: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 1: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 1: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 1: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 1: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 1: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 1: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 1: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 1: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 1: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 1: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 1: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 1: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 1: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 1: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 1: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 1: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 1: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 1: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 1: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 1: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 1: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 1: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 1: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 1: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 1: Variante | 1 |  |
| 60 |  | Station 1: Strangventil Zustand | 1 |  |
| 62 |  | Station 1: RLEinschichtung Ventil | 1 |  |



### <a name="1523_1522_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 2: Systemdatum | 1 |  |
| 5 |  | Station 2: Systemdatum | 256 |  |
| 6 |  | Station 2: Systemdatum | 65536 |  |
| 7 |  | Station 2: Systemdatum | 16777216 |  |
| 12 |  | Station 2: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 2: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 2: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 2: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 2: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 2: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 2: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 2: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 2: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 2: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 2: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 2: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 2: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 2: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 2: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 2: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 2: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 2: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 2: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 2: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 2: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 2: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 2: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 2: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 2: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 2: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 2: Variante | 1 |  |
| 60 |  | Station 2: Strangventil Zustand | 1 |  |
| 62 |  | Station 2: RLEinschichtung Ventil | 1 |  |



### <a name="1523_1523_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 3: Systemdatum | 1 |  |
| 5 |  | Station 3: Systemdatum | 256 |  |
| 6 |  | Station 3: Systemdatum | 65536 |  |
| 7 |  | Station 3: Systemdatum | 16777216 |  |
| 12 |  | Station 3: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 3: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 3: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 3: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 3: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 3: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 3: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 3: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 3: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 3: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 3: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 3: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 3: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 3: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 3: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 3: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 3: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 3: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 3: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 3: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 3: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 3: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 3: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 3: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 3: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 3: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 3: Variante | 1 |  |
| 60 |  | Station 3: Strangventil Zustand | 1 |  |
| 62 |  | Station 3: RLEinschichtung Ventil | 1 |  |



### <a name="1523_1524_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 4: Systemdatum | 1 |  |
| 5 |  | Station 4: Systemdatum | 256 |  |
| 6 |  | Station 4: Systemdatum | 65536 |  |
| 7 |  | Station 4: Systemdatum | 16777216 |  |
| 12 |  | Station 4: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 4: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 4: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 4: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 4: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 4: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 4: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 4: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 4: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 4: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 4: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 4: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 4: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 4: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 4: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 4: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 4: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 4: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 4: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 4: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 4: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 4: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 4: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 4: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 4: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 4: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 4: Variante | 1 |  |
| 60 |  | Station 4: Strangventil Zustand | 1 |  |
| 62 |  | Station 4: RLEinschichtung Ventil | 1 |  |



### <a name="1524_1521_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 1: Systemdatum | 1 |  |
| 5 |  | Station 1: Systemdatum | 256 |  |
| 6 |  | Station 1: Systemdatum | 65536 |  |
| 7 |  | Station 1: Systemdatum | 16777216 |  |
| 12 |  | Station 1: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 1: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 1: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 1: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 1: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 1: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 1: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 1: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 1: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 1: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 1: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 1: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 1: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 1: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 1: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 1: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 1: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 1: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 1: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 1: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 1: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 1: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 1: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 1: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 1: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 1: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 1: Variante | 1 |  |
| 60 |  | Station 1: Strangventil Zustand | 1 |  |
| 62 |  | Station 1: RLEinschichtung Ventil | 1 |  |



### <a name="1524_1522_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 2: Systemdatum | 1 |  |
| 5 |  | Station 2: Systemdatum | 256 |  |
| 6 |  | Station 2: Systemdatum | 65536 |  |
| 7 |  | Station 2: Systemdatum | 16777216 |  |
| 12 |  | Station 2: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 2: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 2: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 2: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 2: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 2: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 2: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 2: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 2: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 2: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 2: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 2: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 2: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 2: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 2: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 2: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 2: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 2: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 2: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 2: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 2: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 2: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 2: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 2: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 2: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 2: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 2: Variante | 1 |  |
| 60 |  | Station 2: Strangventil Zustand | 1 |  |
| 62 |  | Station 2: RLEinschichtung Ventil | 1 |  |



### <a name="1524_1523_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 3: Systemdatum | 1 |  |
| 5 |  | Station 3: Systemdatum | 256 |  |
| 6 |  | Station 3: Systemdatum | 65536 |  |
| 7 |  | Station 3: Systemdatum | 16777216 |  |
| 12 |  | Station 3: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 3: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 3: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 3: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 3: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 3: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 3: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 3: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 3: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 3: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 3: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 3: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 3: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 3: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 3: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 3: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 3: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 3: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 3: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 3: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 3: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 3: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 3: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 3: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 3: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 3: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 3: Variante | 1 |  |
| 60 |  | Station 3: Strangventil Zustand | 1 |  |
| 62 |  | Station 3: RLEinschichtung Ventil | 1 |  |



### <a name="1524_1524_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | Station 4: Systemdatum | 1 |  |
| 5 |  | Station 4: Systemdatum | 256 |  |
| 6 |  | Station 4: Systemdatum | 65536 |  |
| 7 |  | Station 4: Systemdatum | 16777216 |  |
| 12 |  | Station 4: Gesamtbetriebssekunden | 1 |  |
| 13 |  | Station 4: Gesamtbetriebssekunden | 256 |  |
| 14 |  | Station 4: Gesamtbetriebssekunden | 65536 |  |
| 15 |  | Station 4: Gesamtbetriebssekunden | 16777216 |  |
| 16 |  | Station 4: Warmwasser Volumenstrom | 0.1 |  l/min |
| 17 |  | Station 4: Warmwasser Volumenstrom | 25.6 |  l/min |
| 18 |  | Station 4: Warmwasser Volumenstrom | 6553.6 |  l/min |
| 19 |  | Station 4: Warmwasser Volumenstrom | 1677721.6 |  l/min |
| 24 |  | Station 4: Primaerpumpe Betriebssekunden | 1 |  s |
| 25 |  | Station 4: Primaerpumpe Betriebssekunden | 256 |  s |
| 26 |  | Station 4: Primaerpumpe Betriebssekunden | 65536 |  s |
| 27 |  | Station 4: Primaerpumpe Betriebssekunden | 16777216 |  s |
| 42 |  | Station 4: Warmwasser TWW | 0.1 |  °C |
| 43 |  | Station 4: Warmwasser TWW | 25.6 |  °C |
| 46 |  | Station 4: Warmwasser TVL | 0.1 |  °C |
| 47 |  | Station 4: Warmwasser TVL | 25.6 |  °C |
| 48 |  | Station 4: Primärpumpe Drehzahl | 1 | % |
| 49 |  | Station 4: Primärpumpe Drehzahl | 256 | % |
| 50 |  | Station 4: Zirkulation TRL | 0.1 |  °C |
| 51 |  | Station 4: Zirkulation TRL | 25.6 |  °C |
| 52 |  | Station 4: Zirkulation Drehzahl | 1 | % |
| 53 |  | Station 4: Zirkulation Drehzahl | 256 | % |
| 54 |  | Station 4: RLEinschichtung TRL | 0.1 |  °C |
| 55 |  | Station 4: RLEinschichtung TRL | 25.6 |  °C |
| 56 |  | Station 4: RLEinschichtung TSpeicher | 0.1 |  °C |
| 57 |  | Station 4: RLEinschichtung TSpeicher | 25.6 |  °C |
| 58 |  | Station 4: Variante | 1 |  |
| 60 |  | Station 4: Strangventil Zustand | 1 |  |
| 62 |  | Station 4: RLEinschichtung Ventil | 1 |  |



### <a name="4420_0000_0200"></a>HKM1 (0x4420 - 0x442F) <= any source, command 0x0200

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 8 |  | Vorlaufmaximaltemperatur | 1 |  °C |
| 9 |  | HK-Kennlinie | 0.1 |  |
| 10 |  | Nachtabsenkung | 1 |  K |
| 11 |  | Tageskorrektur | 1 |  K |
| 12 |  | Mischerlaufzeit | 1 |  s |
| 13 |  | Sommerbetrieb | 1 |  °C |
| 14 |  | Info Schaltuhr | 1 |  |



### <a name="5260_5260_0102"></a>Kaskade BasisAdr (0x5260) <= Kaskade BasisAdr (0x5260 - 0x526F), command 0x0102

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | mStationEin | 1 |  |
| 5 |  | mStationEin | 256 |  |
| 6 |  | mStationAus | 1 |  |
| 7 |  | mStationAus | 256 |  |
| 8 |  | mStationAlive | 1 |  |
| 9 |  | mStationAlive | 256 |  |
| 10 |  | mStationFehler | 1 |  |
| 11 |  | mStationFehler | 256 |  |
| 12 |  | Version | 1 |  |
| 13 |  | Version | 256 |  |
| 14 |  | Reglervariante | 1 |  |
| 15 |  | Durchfluss erwartet | 1 |  |
| 16 |  | DurchschnittsDrehzahl | 0.1 | % |
| 17 |  | DurchschnittsDrehzahl | 25.6 | % |



### <a name="5261_5260_0301"></a>Kaskade Master (0x5261) <= Kaskade BasisAdr (0x5260 - 0x526F), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Version | 1 |  |
| 1 |  | Version | 256 |  |
| 2 |  | Status | 1 |  |
| 3 |  | Status | 256 |  |
| 4 |  | Fehler | 1 |  |
| 5 |  | Fehler | 256 |  |
| 6 |  | Fehler | 65536 |  |
| 7 |  | Fehler | 16777216 |  |
| 8 |  | TWW | 0.1 |  °C |
| 9 |  | TWW | 25.6 |  °C |
| 10 |  | TKW | 0.1 |  °C |
| 11 |  | TKW | 25.6 |  °C |
| 12 |  | TSpVL | 0.1 |  °C |
| 13 |  | TSpVL | 25.6 |  °C |
| 14 |  | Volumenstrom | 1 |  l/h |
| 15 |  | Volumenstrom | 256 |  l/h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 65536 |  Wh |
| 19 |  | Wärmemenge | 16777216 |  Wh |
| 20 |  | Betriebssekunden | 1 |  s |
| 21 |  | Betriebssekunden | 256 |  s |
| 22 |  | Betriebssekunden | 65536 |  s |
| 23 |  | Betriebssekunden | 16777216 |  s |
| 24 |  | Stationsbetriebssekunden | 1 |  s |
| 25 |  | Stationsbetriebssekunden | 256 |  s |
| 26 |  | Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Gesamtbetriebsstunden | 1 |  s |
| 29 |  | Gesamtbetriebsstunden | 256 |  s |
| 30 |  | Gesamtbetriebsstunden | 65536 |  s |
| 31 |  | Gesamtbetriebsstunden | 16777216 |  s |
| 32 |  | Reglervariante | 1 |  |
| 33 |  | Drehzahl | 0.1 | % |
| 34 |  | Handbetrieb Relais Kaskade | 1 |  |
| 35 |  | Handbetrieb PWM1 | 1 |  |



### <a name="5360_5360_0102"></a>PAW Kaskade BasisAdr (0x5360) <= PAW Kaskade BasisAdr (0x5360 - 0x536F), command 0x0102

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 4 |  | mStationEin | 1 |  |
| 5 |  | mStationEin | 256 |  |
| 6 |  | mStationAus | 1 |  |
| 7 |  | mStationAus | 256 |  |
| 8 |  | mStationAlive | 1 |  |
| 9 |  | mStationAlive | 256 |  |
| 10 |  | mStationFehler | 1 |  |
| 11 |  | mStationFehler | 256 |  |
| 12 |  | Version | 1 |  |
| 13 |  | Version | 256 |  |
| 14 |  | Reglervariante | 1 |  |
| 15 |  | Durchfluss erwartet | 1 |  |
| 16 |  | DurchschnittsDrehzahl | 0.1 | % |
| 17 |  | DurchschnittsDrehzahl | 25.6 | % |



### <a name="5361_5360_0301"></a>PAW Kaskade Master (0x5361) <= PAW Kaskade BasisAdr (0x5360 - 0x536F), command 0x0301

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Version | 1 |  |
| 1 |  | Version | 256 |  |
| 2 |  | Status | 1 |  |
| 3 |  | Status | 256 |  |
| 4 |  | Fehler | 1 |  |
| 5 |  | Fehler | 256 |  |
| 6 |  | Fehler | 65536 |  |
| 7 |  | Fehler | 16777216 |  |
| 8 |  | TWW | 0.1 |  °C |
| 9 |  | TWW | 25.6 |  °C |
| 10 |  | TKW | 0.1 |  °C |
| 11 |  | TKW | 25.6 |  °C |
| 12 |  | TSpVL | 0.1 |  °C |
| 13 |  | TSpVL | 25.6 |  °C |
| 14 |  | Volumenstrom | 1 |  l/h |
| 15 |  | Volumenstrom | 256 |  l/h |
| 16 |  | Wärmemenge | 1 |  Wh |
| 17 |  | Wärmemenge | 256 |  Wh |
| 18 |  | Wärmemenge | 65536 |  Wh |
| 19 |  | Wärmemenge | 16777216 |  Wh |
| 20 |  | Betriebssekunden | 1 |  s |
| 21 |  | Betriebssekunden | 256 |  s |
| 22 |  | Betriebssekunden | 65536 |  s |
| 23 |  | Betriebssekunden | 16777216 |  s |
| 24 |  | Stationsbetriebssekunden | 1 |  s |
| 25 |  | Stationsbetriebssekunden | 256 |  s |
| 26 |  | Stationsbetriebssekunden | 65536 |  s |
| 27 |  | Stationsbetriebssekunden | 16777216 |  s |
| 28 |  | Gesamtbetriebsstunden | 1 |  s |
| 29 |  | Gesamtbetriebsstunden | 256 |  s |
| 30 |  | Gesamtbetriebsstunden | 65536 |  s |
| 31 |  | Gesamtbetriebsstunden | 16777216 |  s |
| 32 |  | Reglervariante | 1 |  |
| 33 |  | Drehzahl | 0.1 | % |
| 34 |  | Handbetrieb Relais Kaskade | 1 |  |
| 35 |  | Handbetrieb PWM1 | 1 |  |



### <a name="6510_0000_0200"></a>HKM2 (0x6510 - 0x651F) <= any source, command 0x0200

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



### <a name="6520_0000_0200"></a>MSR65 (0x6520 - 0x652F) <= any source, command 0x0200

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



### <a name="6650_0000_0200"></a>EM (0x6650 - 0x665F) <= any source, command 0x0200

| Offset | Mask | Name | Factor | Unit |
|:-:|:-:|:--|:-:|:-:|
| 0 |  | Drehzahl Relais 1.1 | 1 | % |
| 1 |  | Timer 1.1 | 1 |  s |
| 2 |  | Timer 1.1 | 256 |  s |
| 3 |  | Timer 1.1 | 65536 |  s |
| 4 |  | Drehzahl Relais 1.2 | 1 | % |
| 5 |  | Timer 1.2 | 1 |  s |
| 6 |  | Timer 1.2 | 256 |  s |
| 7 |  | Timer 1.2 | 65536 |  s |
| 8 |  | Drehzahl Relais 2.1 | 1 | % |
| 9 |  | Timer 2.1 | 1 |  s |
| 10 |  | Timer 2.1 | 256 |  s |
| 11 |  | Timer 2.1 | 65536 |  s |
| 12 |  | Drehzahl Relais 2.2 | 1 | % |
| 13 |  | Timer 2.2 | 1 |  s |
| 14 |  | Timer 2.2 | 256 |  s |
| 15 |  | Timer 2.2 | 65536 |  s |
| 16 |  | Drehzahl Relais 3.1 | 1 | % |
| 17 |  | Timer 3.1 | 1 |  s |
| 18 |  | Timer 3.1 | 256 |  s |
| 19 |  | Timer 3.1 | 65536 |  s |
| 20 |  | Drehzahl Relais 3.2 | 1 | % |
| 21 |  | Timer 3.2 | 1 |  s |
| 22 |  | Timer 3.2 | 256 |  s |
| 23 |  | Timer 3.2 | 65536 |  s |
| 24 |  | Drehzahl Relais 4.1 | 1 | % |
| 25 |  | Timer 4.1 | 1 |  s |
| 26 |  | Timer 4.1 | 256 |  s |
| 27 |  | Timer 4.1 | 65536 |  s |
| 28 |  | Drehzahl Relais 4.2 | 1 | % |
| 29 |  | Timer 4.2 | 1 |  s |
| 30 |  | Timer 4.2 | 256 |  s |
| 31 |  | Timer 4.2 | 65536 |  s |
| 32 |  | Drehzahl Relais 5.1 | 1 | % |
| 33 |  | Timer 5.1 | 1 |  s |
| 34 |  | Timer 5.1 | 256 |  s |
| 35 |  | Timer 5.1 | 65536 |  s |
| 36 |  | Drehzahl Relais 5.2 | 1 | % |
| 37 |  | Timer 5.2 | 1 |  s |
| 38 |  | Timer 5.2 | 256 |  s |
| 39 |  | Timer 5.2 | 65536 |  s |
| 40 |  | SensorOutputType1 | 1 |  |
| 41 |  | SensorOutputType2 | 1 |  |
| 42 |  | SensorOutputType3 | 1 |  |
| 43 |  | SensorOutputType4 | 1 |  |
| 44 |  | SensorOutputType5 | 1 |  |
| 45 |  | SensorOutputType6 | 1 |  |



> Based on VSF dated 20190202

