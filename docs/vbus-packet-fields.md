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
- [DFA (0x0010) <= SolarVenti SControl (0x1170), command 0x0100](#0010_1170_0100)
- [DFA (0x0010) <= MFR \[WMZ\] (0x1200 - 0x120F), command 0x0100](#0010_1200_0100)
- [DFA (0x0010) <= MFR \[Heizkreis\] (0x1210 - 0x121F), command 0x0100](#0010_1210_0100)
- [DFA (0x0010) <= Regudis H-HT \[Übergabestation\] (0x1220 - 0x122F), command 0x0100](#0010_1220_0100)
- [DFA (0x0010) <= DeltaTherm HC \[BW-Erwärmung\] (0x1230 - 0x123F), command 0x0100](#0010_1230_0100)
- [DFA (0x0010) <= Wagner Sungo 100 \[Regler\] (0x1240), command 0x0100](#0010_1240_0100)
- [DFA (0x0010) <= Wagner Sungo 100 \[WMZ1\] (0x1241), command 0x0100](#0010_1241_0100)
- [DFA (0x0010) <= Viessmann Vitotrans 353 2017 (0x1250), command 0x0100](#0010_1250_0100)
- [DFA (0x0010) <= Viessmann Vitotrans 353 2017 Broadcast (0x1260), command 0x0100](#0010_1260_0100)
- [DFA (0x0010) <= controller S/L (0x1330), command 0x0100](#0010_1330_0100)
- [DFA (0x0010) <= WMZ Plus (0x1400 - 0x140F), command 0x0100](#0010_1400_0100)
- [DFA (0x0010) <= THERMUfloor ER (0x1410), command 0x0100](#0010_1410_0100)
- [DFA (0x0010) <= Apricus DeltaSol AL E HE (0x1420), command 0x0100](#0010_1420_0100)
- [DFA (0x0010) <= DeltaSol Fresh 2018 (0x1510), command 0x0100](#0010_1510_0100)
- [DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0100](#0010_1711_0100)
- [DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0101](#0010_1711_0101)
- [DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0140](#0010_1711_0140)
- [DFA (0x0010) <= DeltaTherm HC max \[Heizkreis\] (0x1720 - 0x172F), command 0x0100](#0010_1720_0100)
- [DFA (0x0010) <= DeltaTherm HC max \[WMZ\] (0x1730 - 0x173F), command 0x0100](#0010_1730_0100)
- [DFA (0x0010) <= DeltaTherm HC max \[Modul\] (0x1740 - 0x174F), command 0x0100](#0010_1740_0100)
- [DFA (0x0010) <= DeltaSol MX \[Impulszähler\] (0x1800 - 0x180F), command 0x0100](#0010_1800_0100)
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
- [DFA (0x0010) <= SOLTEX 5VH3 (0x7513), command 0x0100](#0010_7513_0100)
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

| Address | Name |
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
| 0x1170 | SolarVenti SControl |
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
| 0x1230 | DeltaTherm HC \[BW-Erwärmung #0\] |
| 0x1231 | DeltaTherm HC \[BW-Erwärmung #1\] |
| 0x1232 | DeltaTherm HC \[BW-Erwärmung #2\] |
| 0x1233 | DeltaTherm HC \[BW-Erwärmung #3\] |
| 0x1234 | DeltaTherm HC \[BW-Erwärmung #4\] |
| 0x1235 | DeltaTherm HC \[BW-Erwärmung #5\] |
| 0x1236 | DeltaTherm HC \[BW-Erwärmung #6\] |
| 0x1237 | DeltaTherm HC \[BW-Erwärmung #7\] |
| 0x1238 | DeltaTherm HC \[BW-Erwärmung #8\] |
| 0x1239 | DeltaTherm HC \[BW-Erwärmung #9\] |
| 0x123A | DeltaTherm HC \[BW-Erwärmung #10\] |
| 0x123B | DeltaTherm HC \[BW-Erwärmung #11\] |
| 0x123C | DeltaTherm HC \[BW-Erwärmung #12\] |
| 0x123D | DeltaTherm HC \[BW-Erwärmung #13\] |
| 0x123E | DeltaTherm HC \[BW-Erwärmung #14\] |
| 0x123F | DeltaTherm HC \[BW-Erwärmung #15\] |
| 0x1240 | Wagner Sungo 100 \[Regler\] |
| 0x1241 | Wagner Sungo 100 \[WMZ1\] |
| 0x1250 | Viessmann Vitotrans 353 2017 |
| 0x1260 | Viessmann Vitotrans 353 2017 Broadcast |
| 0x1261 | Viessmann Vitotrans 353 2017 Master |
| 0x1262 | Viessmann Vitotrans 353 2017 Slave 1 |
| 0x1263 | Viessmann Vitotrans 353 2017 Slave 2 |
| 0x1264 | Viessmann Vitotrans 353 2017 Slave 3 |
| 0x1330 | controller S/L |
| 0x1400 | WMZ Plus |
| 0x1401 | WMZ Plus Master |
| 0x1402 | WMZ Plus Master |
| 0x1403 | WMZ Plus Slave 1 |
| 0x1404 | WMZ Plus Slave 2 |
| 0x1405 | WMZ Plus Slave 3 |
| 0x1406 | WMZ Plus Slave 4 |
| 0x1407 | WMZ Plus Slave 5 |
| 0x1408 | WMZ Plus Slave 6 |
| 0x1409 | WMZ Plus Slave 7 |
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
| 0x1800 | DeltaSol MX \[Impulszähler #0\] |
| 0x1801 | DeltaSol MX \[Impulszähler #1\] |
| 0x1802 | DeltaSol MX \[Impulszähler #2\] |
| 0x1803 | DeltaSol MX \[Impulszähler #3\] |
| 0x1804 | DeltaSol MX \[Impulszähler #4\] |
| 0x1805 | DeltaSol MX \[Impulszähler #5\] |
| 0x1806 | DeltaSol MX \[Impulszähler #6\] |
| 0x1807 | DeltaSol MX \[Impulszähler #7\] |
| 0x1808 | DeltaSol MX \[Impulszähler #8\] |
| 0x1809 | DeltaSol MX \[Impulszähler #9\] |
| 0x180A | DeltaSol MX \[Impulszähler #10\] |
| 0x180B | DeltaSol MX \[Impulszähler #11\] |
| 0x180C | DeltaSol MX \[Impulszähler #12\] |
| 0x180D | DeltaSol MX \[Impulszähler #13\] |
| 0x180E | DeltaSol MX \[Impulszähler #14\] |
| 0x180F | DeltaSol MX \[Impulszähler #15\] |
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
| 0x7513 | SOLTEX 5VH3 |
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

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0000_4010_10_0100_002_2_0| Wärme | 1 |  Wh |
| 00_0000_4010_10_0100_006_1_0| Leistung | 1 |  W |
| 00_0000_4010_10_0100_004_2_0| Volumenstrom | 0.01 |  m³/h |
| 00_0000_4010_10_0100_008_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0000_4010_10_0100_010_2_0| Rücklauftemperatur | 0.1 |  °C |
| 00_0000_4010_10_0100_015_1_0| Glykol | 1 |  |
| 00_0000_4010_10_0100_016_2_0| Druck | 0.01 |  bar |



### <a name="0000_4420_0100"></a>Any destination <= HKM1 (0x4420 - 0x442F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0000_4420_10_0100_000_1_0| Fehlerstatus | 1 |  |
| 00_0000_4420_10_0100_001_2_0| Modulstatus | 1 |  |
| 00_0000_4420_10_0100_003_1_0| Relaisstatus | 1 |  |
| 00_0000_4420_10_0100_004_2_0| Fehler-Info | 1 |  |
| 00_0000_4420_10_0100_008_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0000_4420_10_0100_010_2_0| Fernversteller | 0.1 |  °C |
| 00_0000_4420_10_0100_012_2_0| Aussentemperatur | 0.1 |  °C |
| 00_0000_4420_10_0100_016_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0000_4420_10_0100_018_2_0| Modulversion | 1 |  |



### <a name="0000_6510_0100"></a>Any destination <= HKM2 (0x6510 - 0x651F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0000_6510_10_0100_000_1_0| Fehlerstatus | 1 |  |
| 00_0000_6510_10_0100_001_2_0| Modulstatus | 1 |  |
| 00_0000_6510_10_0100_003_1_0| Relaisstatus | 1 |  |
| 00_0000_6510_10_0100_003_1_1| Relais 1 | 1 |  |
| 00_0000_6510_10_0100_003_1_2| Relais 2 | 1 |  |
| 00_0000_6510_10_0100_003_1_4| Relais 3 | 1 |  |
| 00_0000_6510_10_0100_003_1_8| Relais 4 | 1 |  |
| 00_0000_6510_10_0100_003_1_16| Relais 5 | 1 |  |
| 00_0000_6510_10_0100_003_1_32| Relais 6 | 1 |  |
| 00_0000_6510_10_0100_004_2_0| Fehler-Info | 1 |  |
| 00_0000_6510_10_0100_008_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0000_6510_10_0100_010_2_0| Fernversteller | 0.1 |  °C |
| 00_0000_6510_10_0100_012_2_0| Aussentemperatur | 0.1 |  °C |
| 00_0000_6510_10_0100_014_2_0| Speichertemperatur 1 | 0.1 |  °C |
| 00_0000_6510_10_0100_016_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0000_6510_10_0100_018_2_0| Modulversion | 1 |  |
| 00_0000_6510_10_0100_020_2_0| Speichertemperatur 2 | 0.1 |  °C |
| 00_0000_6510_10_0100_022_2_0| Temperatur Sensor 6 | 0.1 |  °C |



### <a name="0000_6520_0100"></a>Any destination <= MSR65 (0x6520 - 0x652F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0000_6520_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0000_6520_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0000_6520_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0000_6520_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0000_6520_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0000_6520_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |



### <a name="0000_6650_0100"></a>Any destination <= EM (0x6650 - 0x665F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0000_6650_10_0100_000_4_0| Resistor 1 | 0.001 |  Ω |
| 00_0000_6650_10_0100_004_4_0| Resistor 2 | 0.001 |  Ω |
| 00_0000_6650_10_0100_008_4_0| Resistor 3 | 0.001 |  Ω |
| 00_0000_6650_10_0100_012_4_0| Resistor 4 | 0.001 |  Ω |
| 00_0000_6650_10_0100_016_4_0| Resistor 5 | 0.001 |  Ω |
| 00_0000_6650_10_0100_020_4_0| Resistor 6 | 0.001 |  Ω |



### <a name="0010_0053_0100"></a>DFA (0x0010) <= DL3 (0x0053), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_0053_10_0100_000_4_0| Resistor Sensor 1 | 0.001 |  Ω |
| 00_0010_0053_10_0100_004_4_0| Resistor Sensor 2 | 0.001 |  Ω |
| 00_0010_0053_10_0100_008_4_0| Resistor Sensor 3 | 0.001 |  Ω |
| 00_0010_0053_10_0100_012_4_0| Current Sensor 4 | 0.001 |  mA |
| 00_0010_0053_10_0100_034_2_0| Temperature Sensor 1 | 0.1 |  °C |
| 00_0010_0053_10_0100_036_2_0| Temperature Sensor 2 | 0.1 |  °C |
| 00_0010_0053_10_0100_038_2_0| Temperature Sensor 3 | 0.1 |  °C |
| 00_0010_0053_10_0100_016_4_0| Impulse Counter Sensor 1 | 1 |  |
| 00_0010_0053_10_0100_020_4_0| Impulse Counter Sensor 2 | 1 |  |
| 00_0010_0053_10_0100_024_4_0| Impulse Counter Sensor 3 | 1 |  |
| 00_0010_0053_10_0100_040_2_0| Irradiation Sensor 4 | 1 |  W/m² |
| 00_0010_0053_10_0100_044_4_0| Last Impulse Interval Sensor 1 | 1 |  ms |
| 00_0010_0053_10_0100_048_4_0| Last Impulse Interval Sensor 2 | 1 |  ms |
| 00_0010_0053_10_0100_052_4_0| Last Impulse Interval Sensor 3 | 1 |  ms |
| 00_0010_0053_10_0100_056_4_0| Current Impulse Interval Sensor 1 | 1 |  ms |
| 00_0010_0053_10_0100_060_4_0| Current Impulse Interval Sensor 2 | 1 |  ms |
| 00_0010_0053_10_0100_064_4_0| Current Impulse Interval Sensor 3 | 1 |  ms |
| 00_0010_0053_10_0100_080_4_0| Wärmemenge | 1 |  Wh |



### <a name="0010_1001_0100"></a>DFA (0x0010) <= DeltaSol SLT \[Regler\] (0x1001), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1001_10_0100_000_4_0| Systemdatum | 1 |  |
| 00_0010_1001_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1001_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1001_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1001_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1001_10_0100_012_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1001_10_0100_014_2_0| Temperatur VFS/RPS \(S6\) | 0.1 |  °C |
| 00_0010_1001_10_0100_016_4_0| Volumenstrom V40 | 1 |  l/h |
| 00_0010_1001_10_0100_020_4_0| Volumenstrom VFS \(S6\) | 1 |  l/h |
| 00_0010_1001_10_0100_024_4_0| Volumenstrom Flowrotor \(S7\) | 1 |  l/h |
| 00_0010_1001_10_0100_028_2_0| Druck RPS \(S6\) | 0.01 |  bar |
| 00_0010_1001_10_0100_030_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1001_10_0100_031_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1001_10_0100_032_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1001_10_0100_033_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1001_10_0100_034_1_0| PWM A | 1 | % |
| 00_0010_1001_10_0100_035_1_0| PWM B | 1 | % |
| 00_0010_1001_10_0100_036_4_0| Fehlermaske | 1 |  |
| 00_0010_1001_10_0100_036_1_1| Fehler: Sensorleitung unterbrochen | 1 |  |
| 00_0010_1001_10_0100_036_1_2| Fehler: Sensorleitung kurzgeschlossen | 1 |  |
| 00_0010_1001_10_0100_036_1_32| Fehler: Volumstromüberwachung | 1 |  |
| 00_0010_1001_10_0100_036_1_64| Fehler: Überdruck | 1 |  |
| 00_0010_1001_10_0100_036_1_128| Fehler: Minderdruck | 1 |  |
| 00_0010_1001_10_0100_036_1_512| Fehler: Datenspeicher | 1 |  |
| 00_0010_1001_10_0100_036_1_1024| Fehler: Echtzeituhr | 1 |  |
| 00_0010_1001_10_0100_036_1_4096| Fehler: Zwillingspumpe | 1 |  |
| 00_0010_1001_10_0100_040_4_0| Warnmaske | 1 |  |
| 00_0010_1001_10_0100_040_1_4| Warnung: ΔT zu hoch | 1 |  |
| 00_0010_1001_10_0100_040_1_8| Warnung: Nachtzirkulation | 1 |  |
| 00_0010_1001_10_0100_040_1_16| Warnung: Vorlauf/Rücklauf vertauscht | 1 |  |
| 00_0010_1001_10_0100_040_1_1024| Warnung: Speichermaximaltemperatur | 1 |  |
| 00_0010_1001_10_0100_040_1_2048| Fehler: SD-Karte | 1 |  |



### <a name="0010_1010_0100"></a>DFA (0x0010) <= DeltaSol SLT \[WMZ\] (0x1010 - 0x101F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1010_10_0100_000_4_0| Wärme Gesamt | 1 |  Wh |
| 00_0010_1010_10_0100_004_4_0| Wärme Heute | 1 |  Wh |
| 00_0010_1010_10_0100_008_4_0| Wärme Gestern | 1 |  Wh |
| 00_0010_1010_10_0100_012_4_0| Wärme Woche | 1 |  Wh |
| 00_0010_1010_10_0100_016_4_0| Wärme Vorwoche | 1 |  Wh |
| 00_0010_1010_10_0100_020_4_0| Wärme Monat | 1 |  Wh |
| 00_0010_1010_10_0100_024_4_0| Wärme Vormonat | 1 |  Wh |
| 00_0010_1010_10_0100_028_4_0| Wärme Jahr | 1 |  Wh |
| 00_0010_1010_10_0100_032_4_0| Wärme Vorjahr | 1 |  Wh |
| 00_0010_1010_10_0100_036_4_0| Volumen gesamt | 1 |  l |
| 00_0010_1010_10_0100_040_4_0| Volumen Heute | 1 |  l |
| 00_0010_1010_10_0100_044_4_0| Volumen Gestern | 1 |  l |
| 00_0010_1010_10_0100_048_4_0| Volumen Woche | 1 |  l |
| 00_0010_1010_10_0100_052_4_0| Volumen Vorwoche | 1 |  l |
| 00_0010_1010_10_0100_056_4_0| Volumen Monat | 1 |  l |
| 00_0010_1010_10_0100_060_4_0| Volumen Vormonat | 1 |  l |
| 00_0010_1010_10_0100_064_4_0| Volumen Jahr | 1 |  l |
| 00_0010_1010_10_0100_068_4_0| Volumen Vorjahr | 1 |  l |
| 00_0010_1010_10_0100_072_4_0| Leistung | 0.001 |  kW |



### <a name="0010_1020_0100"></a>DFA (0x0010) <= Noventec Übergabestation \[Regler\] (0x1020), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1020_10_0100_000_4_0| Systemdatum | 1 |  |
| 00_0010_1020_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1020_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1020_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1020_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1020_10_0100_012_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1020_10_0100_014_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_1020_10_0100_016_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_1020_10_0100_018_1_0| Zustand Sensor 8 | 1 |  |
| 00_0010_1020_10_0100_019_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1020_10_0100_020_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1020_10_0100_021_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1020_10_0100_022_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1020_10_0100_023_1_0| Drehzahl Relais pot.frei | 1 | % |
| 00_0010_1020_10_0100_024_1_0| Drehzahl Ausgang PWM 1 | 1 | % |
| 00_0010_1020_10_0100_025_1_0| Drehzahl Ausgang PWM 2 | 1 | % |
| 00_0010_1020_10_0100_028_4_0| Fehler | 1 |  |



### <a name="0010_1040_0100"></a>DFA (0x0010) <= DeltaSol E V2 HK 1 Estrichtrockung \[Modul 1\] (0x1040 - 0x104F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1040_10_0100_000_2_0| Jahr | 1 |  |
| 00_0010_1040_10_0100_002_1_0| Monat | 1 |  |
| 00_0010_1040_10_0100_003_1_0| Tag | 1 |  |
| 00_0010_1040_10_0100_004_2_0| Systemzeit | 1 |  |
| 00_0010_1040_10_0100_006_1_0| Status | 1 |  |
| 00_0010_1040_10_0100_007_1_0| Fehlermeldung | 1 |  |
| 00_0010_1040_10_0100_008_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_1040_10_0100_010_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_1040_10_0100_012_1_0| Relais Pumpe | 1 | % |
| 00_0010_1040_10_0100_013_1_0| Relais Mischer Auf | 1 | % |
| 00_0010_1040_10_0100_014_1_0| Relais Mischer Zu | 1 | % |
| 00_0010_1040_10_0100_015_1_0| Handebetrieb Relais Pumpe | 1 |  |
| 00_0010_1040_10_0100_016_1_0| Handebetrieb Relais Mischer Auf | 1 |  |
| 00_0010_1040_10_0100_017_1_0| Handebetrieb Relais Mischer Zu | 1 |  |
| 00_0010_1040_10_0100_018_1_0| NH-Anforderung | 1 |  |
| 00_0010_1040_10_0100_019_1_0| Parameter Start | 1 |  |
| 00_0010_1040_10_0100_020_2_0| Parameter TStart | 0.1 |  °C |
| 00_0010_1040_10_0100_022_2_0| Parameter TMax | 0.1 |  °C |
| 00_0010_1040_10_0100_024_2_0| Parameter Anstieg | 0.1 |  °C |
| 00_0010_1040_10_0100_026_1_0| Parameter Anstiegszeit | 1 |  h |
| 00_0010_1040_10_0100_027_1_0| Parameter Haltezeit | 1 |  d |



### <a name="0010_1050_0100"></a>DFA (0x0010) <= DeltaSol E V2 \[Regler\] (0x1050), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1050_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1050_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1050_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1050_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1050_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1050_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_1050_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_1050_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_1050_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_1050_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_1050_10_0100_020_2_0| Einstrahlung CS | 1 |  W/m² |
| 00_0010_1050_10_0100_022_2_0| Impulse 1 V40 | 1 |  |
| 00_0010_1050_10_0100_024_2_0| Digital Input | 1 |  |
| 00_0010_1050_10_0100_068_1_0| PWM 1 | 1 | % |
| 00_0010_1050_10_0100_026_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1050_10_0100_069_1_0| PWM 2 | 1 | % |
| 00_0010_1050_10_0100_027_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1050_10_0100_070_1_0| PWM 3 | 1 | % |
| 00_0010_1050_10_0100_028_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1050_10_0100_029_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1050_10_0100_030_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_1050_10_0100_031_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_1050_10_0100_032_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_1050_10_0100_036_2_0| Fehlermaske | 1 |  |
| 00_0010_1050_10_0100_038_2_0| Meldungen | 1 |  |
| 00_0010_1050_10_0100_040_1_0| System | 1 |  |
| 00_0010_1050_10_0100_042_2_0| Schema | 1 |  |
| 00_0010_1050_10_0100_044_2_0| Vorlauf Soll HK1 Modul Sensor 18 | 0.1 |  °C |
| 00_0010_1050_10_0100_046_2_0| Status HK1 Modul | 1 |  |
| 00_0010_1050_10_0100_048_2_0| Vorlauf Soll HK2 Modul Sensor 25 | 0.1 |  °C |
| 00_0010_1050_10_0100_050_2_0| Status HK2 Modul | 1 |  |
| 00_0010_1050_10_0100_052_2_0| Vorlauf Soll HK3 Modul Sensor 32 | 0.1 |  °C |
| 00_0010_1050_10_0100_054_2_0| Status HK3 Modul | 1 |  |
| 00_0010_1050_10_0100_056_2_0| Vorlauf Soll Heizkreis Sensor 11 | 0.1 |  °C |
| 00_0010_1050_10_0100_058_2_0| Status Heizkreis | 1 |  |
| 00_0010_1050_10_0100_062_2_0| Systemzeit | 1 |  |
| 00_0010_1050_10_0100_064_2_0| Jahr | 1 |  |
| 00_0010_1050_10_0100_066_1_0| Monat | 1 |  |
| 00_0010_1050_10_0100_067_1_0| Tag | 1 |  |
| 00_0010_1050_10_0100_060_1_0| Version | 0.01 |  |



### <a name="0010_1051_0100"></a>DFA (0x0010) <= DeltaSol E V2 \[WMZ\] (0x1051), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1051_10_0100_000_2_0| Temperatur Vorlauf | 0.1 |  °C |
| 00_0010_1051_10_0100_002_2_0| Temperatur Rücklauf | 0.1 |  °C |
| 00_0010_1051_10_0100_004_2_0| Durchfluss Sensor 8 | 1 |  l/h |
| 00_0010_1051_10_0100_006_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_1052_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[Regler\] (0x1052), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1052_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1052_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1052_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1052_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1052_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1052_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_1052_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_1052_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_1052_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_1052_10_0100_018_2_0| Einstrahlung Sensor 10 | 1 |  W/m² |
| 00_0010_1052_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_1052_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_1052_10_0100_024_4_0| Volumenstrom Sensor 9 | 1 |  l/h |
| 00_0010_1052_10_0100_028_4_0| Volumenstrom Sensor 11 | 1 |  l/h |
| 00_0010_1052_10_0100_032_4_0| Volumenstrom Sensor 12 | 1 |  l/h |
| 00_0010_1052_10_0100_036_2_0| Druck Sensor 11 | 0.01 |  bar |
| 00_0010_1052_10_0100_038_2_0| Druck Sensor 12 | 0.01 |  bar |
| 00_0010_1052_10_0100_040_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1052_10_0100_041_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1052_10_0100_042_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1052_10_0100_043_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1052_10_0100_044_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_1052_10_0100_048_4_0| Systemdatum | 1 |  |
| 00_0010_1052_10_0100_052_4_0| Fehlermaske | 1 |  |



### <a name="0010_1053_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[Module\] (0x1053), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1053_10_0100_000_2_0| Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 00_0010_1053_10_0100_002_2_0| Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 00_0010_1053_10_0100_004_2_0| Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 00_0010_1053_10_0100_006_2_0| Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 00_0010_1053_10_0100_008_2_0| Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 00_0010_1053_10_0100_010_2_0| Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 00_0010_1053_10_0100_012_2_0| Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 00_0010_1053_10_0100_014_2_0| Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 00_0010_1053_10_0100_016_2_0| Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 00_0010_1053_10_0100_018_2_0| Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 00_0010_1053_10_0100_020_2_0| Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 00_0010_1053_10_0100_022_2_0| Temperatur Modul 2 Sensor 6 | 0.1 |  °C |



### <a name="0010_1054_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[Heizkreis 1\] (0x1054), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1054_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_1054_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_1055_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[Heizkreis 2\] (0x1055), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1055_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_1055_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_1056_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[WMZ 1\] (0x1056), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1056_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1056_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_1056_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |



### <a name="0010_1057_0100"></a>DFA (0x0010) <= Kioto BX Plus V2 \[WMZ 2\] (0x1057), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1057_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1057_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_1057_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |



### <a name="0010_1058_0100"></a>DFA (0x0010) <= Caleffi Biomassa (0x1058), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1058_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1058_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1058_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1058_10_0100_006_1_0| Sensor 3 Zustand \(FS\) | 1 |  |
| 00_0010_1058_10_0100_007_1_0| Sensor 4 Zustand \(TA\) | 1 |  |
| 00_0010_1058_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1058_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1058_10_0100_010_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1058_10_0100_011_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1058_10_0100_012_1_0| Schema | 1 |  |
| 00_0010_1058_10_0100_016_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_1058_10_0100_020_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_1058_10_0100_024_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_1058_10_0100_028_4_0| Betriebssekunden Relais 4 | 1 |  s |
| 00_0010_1058_10_0100_032_4_0| Fehlermaske | 1 |  |
| 00_0010_1058_10_0100_036_4_0| Meldungen | 1 |  |



### <a name="0010_1059_0100"></a>DFA (0x0010) <= DeltaTherm HC mini \[Regler\] (0x1059), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1059_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1059_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1059_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1059_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1059_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1059_10_0100_012_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1059_10_0100_013_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1059_10_0100_014_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1059_10_0100_015_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1059_10_0100_017_1_0| Regler Ausgang 1 | 1 | % |
| 00_0010_1059_10_0100_018_1_0| Regler Ausgang 2 | 1 | % |
| 00_0010_1059_10_0100_020_4_0| Systemdatum | 1 |  |
| 00_0010_1059_10_0100_024_4_0| Fehlermaske | 1 |  |
| 00_0010_1059_10_0100_028_4_0| Warnungmaske | 1 |  |



### <a name="0010_105A_0100"></a>DFA (0x0010) <= Remeha RemaCal (0x105A), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_105A_10_0100_000_2_0| Außentemperatur | 0.1 |  °C |
| 00_0010_105A_10_0100_002_2_0| Temperatur Speicher Unten | 0.1 |  °C |
| 00_0010_105A_10_0100_004_2_0| Temperatur Speicher Oben | 0.1 |  °C |
| 00_0010_105A_10_0100_006_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_105A_10_0100_008_1_0| Drehzahl Relais Pumpe | 1 | % |
| 00_0010_105A_10_0100_009_1_0| Drehzahl Wärmepumpe | 1 | % |
| 00_0010_105A_10_0100_010_1_0| Drehzahl Relais FastOff | 1 | % |
| 00_0010_105A_10_0100_012_4_0| Betriebssekunden Relais Pumpe | 1 |  s |
| 00_0010_105A_10_0100_016_4_0| Betriebssekunden Relais FastOff | 1 |  s |
| 00_0010_105A_10_0100_020_4_0| Fehlermaske | 1 |  |
| 00_0010_105A_10_0100_020_1_1| Fehler Außensensor | 1 |  |
| 00_0010_105A_10_0100_020_1_2| Fehler Speichersensor | 1 |  |
| 00_0010_105A_10_0100_020_1_4| Fehler Pumpe | 1 |  |
| 00_0010_105A_10_0100_020_1_8| Fehler Wärmepumpe | 1 |  |
| 00_0010_105A_10_0100_020_1_16| Fehler Flussschalter | 1 |  |
| 00_0010_105A_10_0100_024_4_0| Systemdatum | 1 |  |
| 00_0010_105A_10_0100_028_4_0| Version | 0.01 |  |



### <a name="0010_105B_0100"></a>DFA (0x0010) <= Atlantic SOLERIO V3 (0x105B), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_105B_10_0100_004_2_0| TCAP | 0.1 |  °C |
| 00_0010_105B_10_0100_002_2_0| TRH | 0.1 |  °C |
| 00_0010_105B_10_0100_000_2_0| TRB | 0.1 |  °C |
| 00_0010_105B_10_0100_006_1_0| R1 | 1 | % |
| 00_0010_105B_10_0100_007_1_0| R2 | 1 | % |
| 00_0010_105B_10_0100_012_2_0| h P1 | 1 |  h |
| 00_0010_105B_10_0100_014_2_0| h P2 | 1 |  h |
| 00_0010_105B_10_0100_016_4_0| kWh | 1 |  kWh |
| 00_0010_105B_10_0100_020_4_0| MWh | 1 |  MWh |
| 00_0010_105B_10_0100_024_4_0| Systemdatum | 1 |  |



### <a name="0010_105D_0100"></a>DFA (0x0010) <= DeDietrich Sol Plus ER 709 (0x105D), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_105D_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_105D_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_105D_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_105D_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_105D_10_0100_036_2_0| Temperatur VFD1 | 0.1 |  °C |
| 00_0010_105D_10_0100_038_2_0| Volumenstrom VFD1 | 1 |  l/h |
| 00_0010_105D_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_105D_10_0100_012_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_105D_10_0100_010_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_105D_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_105D_10_0100_016_1_0| UnitType | 1 |  |
| 00_0010_105D_10_0100_017_1_0| System | 1 |  |
| 00_0010_105D_10_0100_020_2_0| ErrorMask | 1 |  |
| 00_0010_105D_10_0100_022_2_0| Systemzeit | 1 |  |
| 00_0010_105D_10_0100_020_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_105D_10_0100_020_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_105D_10_0100_020_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_105D_10_0100_020_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_105D_10_0100_024_4_0| Statusmask | 1 |  |
| 00_0010_105D_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_105D_10_0100_032_2_0| SW Version | 0.01 |  |



### <a name="0010_105E_0100"></a>DFA (0x0010) <= Caleffi WP (0x105E), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_105E_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_105E_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_105E_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_105E_10_0100_006_1_0| Sensor 3 Zustand \(FS\) | 1 |  |
| 00_0010_105E_10_0100_007_1_0| Sensor 4 Zustand \(TA\) | 1 |  |
| 00_0010_105E_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_105E_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_105E_10_0100_010_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_105E_10_0100_011_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_105E_10_0100_012_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_105E_10_0100_016_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_105E_10_0100_020_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_105E_10_0100_024_4_0| Betriebssekunden Relais 4 | 1 |  s |
| 00_0010_105E_10_0100_028_4_0| Fehlermaske | 1 |  |
| 00_0010_105E_10_0100_032_4_0| Meldungen | 1 |  |
| 00_0010_105E_10_0100_036_1_0| Waermepumpe Zustand | 1 |  |
| 00_0010_105E_10_0100_037_1_0| Waermepumpe Betriebsmodus | 1 |  |
| 00_0010_105E_10_0100_038_2_0| Waermepumpe TProjekt | 0.1 |  °C |
| 00_0010_105E_10_0100_040_1_0| Mischer Befehl | 1 |  |
| 00_0010_105E_10_0100_041_2_0| Mischer dT | 0.1 |  K |
| 00_0010_105E_10_0100_044_2_0| TPlan Timer | 1 |  s |



### <a name="0010_105F_0100"></a>DFA (0x0010) <= Tuxhorn BHKW (0x105F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_105F_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_105F_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_105F_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_105F_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_105F_10_0100_008_1_0| Relais 1 | 1 | % |
| 00_0010_105F_10_0100_009_1_0| Relais 2 | 1 | % |
| 00_0010_105F_10_0100_020_1_0| PWM A | 1 | % |
| 00_0010_105F_10_0100_021_1_0| PWM B | 1 | % |
| 00_0010_105F_10_0100_010_1_0| Mischer auf | 1 | % |
| 00_0010_105F_10_0100_011_1_0| Mischer zu | 1 | % |
| 00_0010_105F_10_0100_018_1_0| Systemmeldung | 1 |  |
| 00_0010_105F_10_0100_012_4_0| Datum | 1 |  |
| 00_0010_105F_10_0100_016_2_0| Uhrzeit | 1 |  |



### <a name="0010_1060_0100"></a>DFA (0x0010) <= Vitosolic 200 \[Regler\] (0x1060), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1060_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1060_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1060_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1060_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1060_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1060_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_1060_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_1060_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_1060_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_1060_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_1060_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_1060_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_1060_10_0100_024_2_0| SZ Einstrahlung | 1 |  W/m² |
| 00_0010_1060_10_0100_026_2_0| SZ Spannung | 0.001 |  V |
| 00_0010_1060_10_0100_028_4_0| Impulszähler 1 | 1 |  l/min |
| 00_0010_1060_10_0100_032_4_0| Impulszähler 2 | 1 |  l/min |
| 00_0010_1060_10_0100_036_2_0| Sensor Unterbrechung | 1 |  |
| 00_0010_1060_10_0100_036_1_1| Sensor Unterbrechung S1 | 1 |  |
| 00_0010_1060_10_0100_036_1_2| Sensor Unterbrechung S2 | 1 |  |
| 00_0010_1060_10_0100_036_1_4| Sensor Unterbrechung S3 | 1 |  |
| 00_0010_1060_10_0100_036_1_8| Sensor Unterbrechung S4 | 1 |  |
| 00_0010_1060_10_0100_036_1_16| Sensor Unterbrechung S5 | 1 |  |
| 00_0010_1060_10_0100_036_1_32| Sensor Unterbrechung S6 | 1 |  |
| 00_0010_1060_10_0100_036_1_64| Sensor Unterbrechung S7 | 1 |  |
| 00_0010_1060_10_0100_036_1_128| Sensor Unterbrechung S8 | 1 |  |
| 00_0010_1060_10_0100_036_1_256| Sensor Unterbrechung S9 | 1 |  |
| 00_0010_1060_10_0100_036_1_512| Sensor Unterbrechung S10 | 1 |  |
| 00_0010_1060_10_0100_036_1_1024| Sensor Unterbrechung S11 | 1 |  |
| 00_0010_1060_10_0100_036_1_2048| Sensor Unterbrechung S12 | 1 |  |
| 00_0010_1060_10_0100_038_1_1| Sensor Kurzschluss | 1 |  |
| 00_0010_1060_10_0100_038_1_1_1| Sensor Kurzschluss S1 | 1 |  |
| 00_0010_1060_10_0100_038_1_2| Sensor Kurzschluss S2 | 1 |  |
| 00_0010_1060_10_0100_038_1_4| Sensor Kurzschluss S3 | 1 |  |
| 00_0010_1060_10_0100_038_1_8| Sensor Kurzschluss S4 | 1 |  |
| 00_0010_1060_10_0100_038_1_16| Sensor Kurzschluss S5 | 1 |  |
| 00_0010_1060_10_0100_038_1_32| Sensor Kurzschluss S6 | 1 |  |
| 00_0010_1060_10_0100_038_1_64| Sensor Kurzschluss S7 | 1 |  |
| 00_0010_1060_10_0100_038_1_128| Sensor Kurzschluss S8 | 1 |  |
| 00_0010_1060_10_0100_038_1_256| Sensor Kurzschluss S9 | 1 |  |
| 00_0010_1060_10_0100_038_1_512| Sensor Kurzschluss S10 | 1 |  |
| 00_0010_1060_10_0100_038_1_1024| Sensor Kurzschluss S11 | 1 |  |
| 00_0010_1060_10_0100_038_1_2048| Sensor Kurzschluss S12 | 1 |  |
| 00_0010_1060_10_0100_040_1_0| Sensor benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_1| Sensor 1 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_2| Sensor 2 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_4| Sensor 3 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_8| Sensor 4 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_16| Sensor 5 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_32| Sensor 6 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_64| Sensor 7 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_128| Sensor 8 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_256| Sensor 9 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_512| Sensor 10 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_1024| Sensor 11 benutzt | 1 |  |
| 00_0010_1060_10_0100_040_1_2048| Sensor 12 benutzt | 1 |  |
| 00_0010_1060_10_0100_044_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1060_10_0100_045_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1060_10_0100_046_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1060_10_0100_047_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1060_10_0100_048_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_1060_10_0100_049_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_1060_10_0100_050_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_1060_10_0100_056_1_0| Lasterkennung Relais | 1 |  |
| 00_0010_1060_10_0100_056_1_1| Lasterkennung R1 | 1 |  |
| 00_0010_1060_10_0100_056_1_2| Lasterkennung R2 | 1 |  |
| 00_0010_1060_10_0100_056_1_4| Lasterkennung R3 | 1 |  |
| 00_0010_1060_10_0100_056_1_8| Lasterkennung R4 | 1 |  |
| 00_0010_1060_10_0100_057_1_0| Fehler Lasterkennung Relais | 1 |  |
| 00_0010_1060_10_0100_057_1_1| Fehler Lasterkennung R1 | 1 |  |
| 00_0010_1060_10_0100_057_1_2| Fehler Lasterkennung R2 | 1 |  |
| 00_0010_1060_10_0100_057_1_4| Fehler Lasterkennung R3 | 1 |  |
| 00_0010_1060_10_0100_057_1_8| Fehler Lasterkennung R4 | 1 |  |
| 00_0010_1060_10_0100_058_2_0| Relaisbenutzungsmaske | 1 |  |
| 00_0010_1060_10_0100_058_1_1| Relais 1 benutzt | 1 |  |
| 00_0010_1060_10_0100_058_1_2| Relais 2 benutzt | 1 |  |
| 00_0010_1060_10_0100_058_1_4| Relais 3 benutzt | 1 |  |
| 00_0010_1060_10_0100_058_1_8| Relais 4 benutzt | 1 |  |
| 00_0010_1060_10_0100_058_1_16| Relais 5 benutzt | 1 |  |
| 00_0010_1060_10_0100_058_1_32| Relais 6 benutzt | 1 |  |
| 00_0010_1060_10_0100_058_1_64| Relais 7 benutzt | 1 |  |
| 00_0010_1060_10_0100_060_2_0| Fehlermaske | 1 |  |
| 00_0010_1060_10_0100_062_2_0| Warnmaske | 1 |  |
| 00_0010_1060_10_0100_064_1_0| SW-Version | 0.1 |  |
| 00_0010_1060_10_0100_065_1_0| Minorversion | 1 |  |
| 00_0010_1060_10_0100_066_2_0| Systemzeit | 1 |  |
| 00_0010_1060_10_0100_072_1_0| Fehler Solarzelle | 1 |  |



### <a name="0010_1064_0100"></a>DFA (0x0010) <= Vitosolic 200 \[WMZ 1\] (0x1065 - 0x1067), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1064_10_0100_000_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_1064_10_0100_002_2_0| Rücklauftemperatur | 0.1 |  °C |
| 00_0010_1064_10_0100_004_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_1064_10_0100_006_2_0| Wärme Wh | 1 |  Wh |
| 00_0010_1064_10_0100_008_2_0| Wärme kWh | 1 |  kWh |
| 00_0010_1064_10_0100_010_2_0| Wärme MWh | 1 |  MWh |
| 00_0010_1064_10_0100_006_2_0_1| Wärme | 1 |  Wh |



### <a name="0010_1100_0100"></a>DFA (0x0010) <= DeltaSol MX - SorTech - eCoo \[Regler\] (0x1100), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1100_10_0100_010_2_0| T LT OUT: | 0.1 |  °C |
| 00_0010_1100_10_0100_008_2_0| T LT IN: | 0.1 |  °C |
| 00_0010_1100_10_0100_012_2_0| T MT OUT: | 0.1 |  °C |
| 00_0010_1100_10_0100_022_2_0| T MT IN: | 0.1 |  °C |
| 00_0010_1100_10_0100_000_2_0| T E1 OUT: | 0.1 |  °C |
| 00_0010_1100_10_0100_002_2_0| T E2 OUT: | 0.1 |  °C |
| 00_0010_1100_10_0100_004_2_0| T A1 OUT: | 0.1 |  °C |
| 00_0010_1100_10_0100_006_2_0| T A2 OUT: | 0.1 |  °C |
| 00_0010_1100_10_0100_014_2_0| T HT OUT: | 0.1 |  °C |
| 00_0010_1100_10_0100_016_2_0| T AMB: | 0.1 |  °C |
| 00_0010_1100_10_0100_018_2_0| T HT Ext: | 0.1 |  °C |
| 00_0010_1100_10_0100_020_2_0| T LT Ext: | 0.1 |  °C |
| 00_0010_1100_10_0100_026_1_1| Anlage: | 1 |  |
| 00_0010_1100_10_0100_026_1_2| Heizmodus: | 1 |  |
| 00_0010_1100_10_0100_026_1_4| Strömungswächter LT-Kreis: | 1 |  |
| 00_0010_1100_10_0100_026_1_16| M1_A_IN: | 1 |  |
| 00_0010_1100_10_0100_026_1_32| M2_A_IN: | 1 |  |
| 00_0010_1100_10_0100_026_1_64| M1_E_IN: | 1 |  |
| 00_0010_1100_10_0100_026_1_128| M2_E_IN: | 1 |  |
| 00_0010_1100_10_0100_025_1_1| M1_A_OUT: | 1 |  |
| 00_0010_1100_10_0100_025_1_2| M2_A_OUT: | 1 |  |
| 00_0010_1100_10_0100_025_1_4| M1_E_OUT: | 1 |  |
| 00_0010_1100_10_0100_025_1_8| M2_E_OUT: | 1 |  |
| 00_0010_1100_10_0100_025_1_32| Betriebsmeldung | 1 |  |
| 00_0010_1100_10_0100_025_1_16| Sammelstörmeldung | 1 |  |
| 00_0010_1100_10_0100_025_1_64| Betriebsart \(Kühlen/Heizen\) | 1 |  |
| 00_0010_1100_10_0100_029_1_0| HT-Pumpe | 1 | % |
| 00_0010_1100_10_0100_028_1_0| MT-Pumpe | 1 | % |
| 00_0010_1100_10_0100_027_1_0| LT-Pumpe | 1 | % |
| 00_0010_1100_10_0100_032_1_0| RCS %: | 1 | % |
| 00_0010_1100_10_0100_025_1_8_1| SPR Relais: | 1 |  |
| 00_0010_1100_10_0100_030_1_0| Phase: | 1 |  |
| 00_0010_1100_10_0100_031_1_0| Systemcode: | 1 |  |
| 00_0010_1100_10_0100_022_2_0_1| EXT-Volt \(T-SET\): | 1 |  V |
| 00_0010_1100_10_0100_036_2_0| T LTS OUT AVG | 0.1 |  °C |
| 00_0010_1100_10_0100_056_2_0| T LT OUT Cycle | 0.1 |  °C |
| 00_0010_1100_10_0100_052_2_0| T LT IN AVG | 0.1 |  °C |
| 00_0010_1100_10_0100_054_2_0| T LT IN Cycle | 0.1 |  °C |
| 00_0010_1100_10_0100_038_2_0| T MT OUT AVG | 0.1 |  °C |
| 00_0010_1100_10_0100_058_2_0| T MT OUT Cycle | 0.1 |  °C |
| 00_0010_1100_10_0100_060_2_0| Kälteleistung letzter Zyklus | 0.1 |  kW |
| 00_0010_1100_10_0100_062_2_0| Volumenstrom Kaltwasserkreis \(dV_LT\) | 1 |  l/h |
| 00_0010_1100_10_0100_040_2_0| Aktuellen Sollwert \(T-SET\): | 0.1 |  °C |
| 00_0010_1100_10_0100_042_2_0| Externe Solltemperatur \(T-SET-EXT\): | 0.1 |  °C |
| 00_0010_1100_10_0100_044_4_0| Anzahl Zyklen \(seit Start\): | 1 |  |
| 00_0010_1100_10_0100_048_4_0| Anzahl Zyklen \(Summe\): | 1 |  |
| 00_0010_1100_10_0100_036_4_0| Aufsummierte Besprühungzeit: | 1 |  |
| 00_0010_1100_10_0100_064_2_0| Systemzeit: | 1 |  |
| 00_0010_1100_10_0100_066_2_0| Jahr: | 1 |  |
| 00_0010_1100_10_0100_068_1_0| Monat: | 1 |  |
| 00_0010_1100_10_0100_069_1_0| Tag: | 1 |  |
| 00_0010_1100_10_0100_070_1_0| Kern: | 0.01 |  |



### <a name="0010_1117_0100"></a>DFA (0x0010) <= Kioto Laderegler (0x1117), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1117_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1117_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1117_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1117_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1117_10_0100_036_2_0| Temperatur VFD1 | 0.1 |  °C |
| 00_0010_1117_10_0100_038_2_0| Volumenstrom VFD1 | 1 |  l/h |
| 00_0010_1117_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1117_10_0100_012_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1117_10_0100_010_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_1117_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_1117_10_0100_016_1_0| UnitType | 1 |  |
| 00_0010_1117_10_0100_017_1_0| System | 1 |  |
| 00_0010_1117_10_0100_020_2_0| ErrorMask | 1 |  |
| 00_0010_1117_10_0100_022_2_0| Systemzeit | 1 |  |
| 00_0010_1117_10_0100_020_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_1117_10_0100_020_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_1117_10_0100_020_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_1117_10_0100_020_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_1117_10_0100_024_4_0| Statusmask | 1 |  |
| 00_0010_1117_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1117_10_0100_032_2_0| SW Version | 0.01 |  |



### <a name="0010_1119_0100"></a>DFA (0x0010) <= Sol Plus SL (0x1119), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1119_10_0100_000_2_0| Kollektor-Temperatur \(TC\) | 0.1 |  °C |
| 00_0010_1119_10_0100_002_2_0| Speicher-Temperatur \(TS\) | 0.1 |  °C |
| 00_0010_1119_10_0100_008_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1119_10_0100_012_1_0| Pumpendrehzahl \(PC\) | 1 | % |
| 00_0010_1119_10_0100_014_2_0| Steuerungszeit \(tc\) | 1 | % |
| 00_0010_1119_10_0100_016_2_0| Softwareversion | 0.01 |  |



### <a name="0010_111E_0100"></a>DFA (0x0010) <= DeltaTherm PV (0x111E), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_111E_10_0100_000_1_1| Funktionsstatus Aus | 1 |  |
| 00_0010_111E_10_0100_000_1_2| Funktionsstatus Fehler | 1 |  |
| 00_0010_111E_10_0100_000_1_4| Funktionsstatus Bereit | 1 |  |
| 00_0010_111E_10_0100_000_1_8| Funktionsstatus Heizung | 1 |  |
| 00_0010_111E_10_0100_000_1_16| Funktionsstatus Max. Temp. | 1 |  |
| 00_0010_111E_10_0100_000_1_32| Funktionsstatus Lstg. reduziert | 1 |  |
| 00_0010_111E_10_0100_000_1_64| Funktionsstatus Nachheizung | 1 |  |
| 00_0010_111E_10_0100_002_4_0| Leistung Überschuss | 0.001 |  W |
| 00_0010_111E_10_0100_006_4_0| Leistung Heizung | 0.001 |  W |
| 00_0010_111E_10_0100_068_2_0| DCIn | 0.1 |  V |
| 00_0010_111E_10_0100_010_2_0| Temperatur Speicher \(Sensor 1\) | 0.1 |  °C |
| 00_0010_111E_10_0100_012_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_111E_10_0100_014_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_111E_10_0100_016_4_0| Überschuss | 1 |  Wh |
| 00_0010_111E_10_0100_024_4_0| Heizung | 1 |  Wh |
| 00_0010_111E_10_0100_032_4_0| Betriebsstunden Heizung | 1 |  h |
| 00_0010_111E_10_0100_056_4_0| Nachheizung | 1 |  Wh |
| 00_0010_111E_10_0100_064_4_0| Betriebsstunden Nachheizung | 1 |  h |
| 00_0010_111E_10_0100_036_2_0| Parameter Max. Temp. \(S1\) | 0.1 |  °C |
| 00_0010_111E_10_0100_040_2_0| Parameter Reserve | 1 |  W |
| 00_0010_111E_10_0100_044_4_0| Systemdatum | 1 |  |
| 00_0010_111E_10_0100_048_1_2| !Sensormodul Bus-Kommunikation gestört | 1 |  |
| 00_0010_111E_10_0100_048_1_1| !Sensorfehler | 1 |  |
| 00_0010_111E_10_0100_048_1_4| !Lüfterfehler | 1 |  |
| 00_0010_111E_10_0100_048_1_8| !Max. Temp. Regler | 1 |  |
| 00_0010_111E_10_0100_048_1_16| !Datum/Uhrzeit | 1 |  |
| 00_0010_111E_10_0100_052_1_4| !Lüfterwarnung | 1 |  |



### <a name="0010_111F_0100"></a>DFA (0x0010) <= ETHERM (0x111F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_111F_10_0100_000_1_1| Funktionsstatus Aus | 1 |  |
| 00_0010_111F_10_0100_000_1_2| Funktionsstatus Fehler | 1 |  |
| 00_0010_111F_10_0100_000_1_4| Funktionsstatus Bereit | 1 |  |
| 00_0010_111F_10_0100_000_1_8| Funktionsstatus Heizung | 1 |  |
| 00_0010_111F_10_0100_000_1_16| Funktionsstatus Max. Temp. RL | 1 |  |
| 00_0010_111F_10_0100_000_1_32| Funktionsstatus Max. Temp. VL | 1 |  |
| 00_0010_111F_10_0100_000_1_64| Funktionsstatus Spülen | 1 |  |
| 00_0010_111F_10_0100_000_1_128| Funktionsstatus Nachheizung | 1 |  |
| 00_0010_111F_10_0100_001_2_0| Countdown Sperrung | 1 |  |
| 00_0010_111F_10_0100_004_4_0| Leistung Überschuss | 0.001 |  W |
| 00_0010_111F_10_0100_008_4_0| Leistung Heizung | 0.001 |  W |
| 00_0010_111F_10_0100_012_2_0| Temperatur Vorlauf \(Sensor 1\) | 0.1 |  °C |
| 00_0010_111F_10_0100_014_2_0| Temperatur Rücklauf \(Sensor 2\) | 0.1 |  °C |
| 00_0010_111F_10_0100_016_2_0| Temperatur Speicher oben \(Sensor 3\) | 0.1 |  °C |
| 00_0010_111F_10_0100_018_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_111F_10_0100_003_1_0| Drehzahl Ladepumpe | 1 | % |
| 00_0010_111F_10_0100_042_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_111F_10_0100_020_4_0| Überschuss Wh | 1 |  Wh |
| 00_0010_111F_10_0100_028_4_0| Heizung Wh | 1 |  Wh |
| 00_0010_111F_10_0100_036_4_0| Betriebsstunden Heizung | 1 |  h |
| 00_0010_111F_10_0100_060_4_0| Betriebsstunden Nachheizung | 1 |  h |
| 00_0010_111F_10_0100_056_4_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_111F_10_0100_040_2_0| Parameter Zieltemperatur | 0.1 |  °C |
| 00_0010_111F_10_0100_044_2_0| Parameter Reserve | 1 |  W |
| 00_0010_111F_10_0100_052_4_0| Systemdatum | 1 |  |
| 00_0010_111F_10_0100_048_1_8192| !Sensormodul Bus-Kommunikation gestört | 1 |  |
| 00_0010_111F_10_0100_048_1_16384| !Powermodul Bus-Kommunikation gestört | 1 |  |
| 00_0010_111F_10_0100_048_1_1| !Sensorfehler Leitungsbruch | 1 |  |
| 00_0010_111F_10_0100_048_1_2| !Sensorfehler Kurzschluss | 1 |  |



### <a name="0010_1120_0100"></a>DFA (0x0010) <= DeltaSol AL-E (0x1120), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1120_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1120_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1120_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1120_10_0100_006_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1120_10_0100_007_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1120_10_0100_008_2_0| Anzeige-Status | 1 |  |
| 00_0010_1120_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_1120_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_1120_10_0100_016_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1120_10_0100_010_2_0| Uhrzeit | 1 |  |



### <a name="0010_1121_0100"></a>DFA (0x0010) <= DeltaSol CS2 (0x1121), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1121_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1121_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1121_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1121_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1121_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1121_10_0100_010_2_0| Volumenstrom | 0.1 |  l/min |
| 00_0010_1121_10_0100_012_1_0| Drehzahl Relais | 1 | % |
| 00_0010_1121_10_0100_014_2_0| Betriebsstunden Relais | 1 |  h |
| 00_0010_1121_10_0100_016_1_0| UnitType | 1 |  |
| 00_0010_1121_10_0100_018_2_0| ErrorMask | 1 |  |
| 00_0010_1121_10_0100_018_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_1121_10_0100_018_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_1121_10_0100_018_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_1121_10_0100_018_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_1121_10_0100_020_4_0| Statusmask | 1 |  |
| 00_0010_1121_10_0100_024_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1121_10_0100_028_2_0| SW-Version | 0.01 |  |



### <a name="0010_1122_0100"></a>DFA (0x0010) <= DeltaSol CS4 (0x1122), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1122_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1122_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1122_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1122_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1122_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1122_10_0100_012_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1122_10_0100_010_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_1122_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_1122_10_0100_016_1_0| UnitType | 1 |  |
| 00_0010_1122_10_0100_017_1_0| System | 1 |  |
| 00_0010_1122_10_0100_020_2_0| ErrorMask | 1 |  |
| 00_0010_1122_10_0100_022_2_0| Systemzeit | 1 |  |
| 00_0010_1122_10_0100_020_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_1122_10_0100_020_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_1122_10_0100_020_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_1122_10_0100_020_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_1122_10_0100_024_4_0| Statusmask | 1 |  |
| 00_0010_1122_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1122_10_0100_032_2_0| SW-Version | 0.01 |  |



### <a name="0010_1123_0100"></a>DFA (0x0010) <= ETHERM 2 (0x1123), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1123_10_0100_064_1_1| Funktionsstatus Aus | 1 |  |
| 00_0010_1123_10_0100_064_1_2| Funktionsstatus Fehler | 1 |  |
| 00_0010_1123_10_0100_064_1_4| Funktionsstatus Bereit | 1 |  |
| 00_0010_1123_10_0100_064_1_8| Funktionsstatus Heizung | 1 |  |
| 00_0010_1123_10_0100_064_1_16| Funktionsstatus Max. Temp. RL | 1 |  |
| 00_0010_1123_10_0100_064_1_32| Funktionsstatus Max. Temp. VL | 1 |  |
| 00_0010_1123_10_0100_064_1_64| Funktionsstatus Spülen | 1 |  |
| 00_0010_1123_10_0100_064_1_128| Funktionsstatus Nachheizung | 1 |  |
| 00_0010_1123_10_0100_064_1_256| Funktionsstatus SmartRemote aus | 1 |  |
| 00_0010_1123_10_0100_064_1_512| Funktionsstatus SmartRemote Verbraucher extern | 1 |  |
| 00_0010_1123_10_0100_064_1_1024| Funktionsstatus SmartRemote ein | 1 |  |
| 00_0010_1123_10_0100_001_2_0| Countdown Sperrung | 1 |  |
| 00_0010_1123_10_0100_004_4_0| Leistung Überschuss | 0.001 |  W |
| 00_0010_1123_10_0100_076_4_0| Leistung Heizung | 0.001 |  W |
| 00_0010_1123_10_0100_068_2_0| Leistung Verbraucher extern | 1 |  W |
| 00_0010_1123_10_0100_012_2_0| Temperatur Vorlauf \(Sensor 1\) | 0.1 |  °C |
| 00_0010_1123_10_0100_014_2_0| Temperatur Rücklauf \(Sensor 2\) | 0.1 |  °C |
| 00_0010_1123_10_0100_016_2_0| Temperatur Speicher oben \(Sensor 3\) | 0.1 |  °C |
| 00_0010_1123_10_0100_018_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1123_10_0100_080_1_1| Zustand Sensor 5 | 1 |  |
| 00_0010_1123_10_0100_003_1_0| Drehzahl Ladepumpe | 1 | % |
| 00_0010_1123_10_0100_042_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1123_10_0100_070_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1123_10_0100_071_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1123_10_0100_020_4_0| Überschuss Wh | 1 |  Wh |
| 00_0010_1123_10_0100_028_4_0| Heizung Wh | 1 |  Wh |
| 00_0010_1123_10_0100_036_4_0| Betriebsstunden Heizung | 1 |  h |
| 00_0010_1123_10_0100_060_4_0| Betriebsstunden Nachheizung | 1 |  h |
| 00_0010_1123_10_0100_056_4_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_1123_10_0100_084_4_0| Betriebsstunden Relais 3 | 1 |  h |
| 00_0010_1123_10_0100_088_4_0| Betriebsstunden Relais 4 | 1 |  h |
| 00_0010_1123_10_0100_040_2_0| Parameter Zieltemperatur | 0.1 |  °C |
| 00_0010_1123_10_0100_044_2_0| Parameter Reserve | 1 |  W |
| 00_0010_1123_10_0100_043_1_0| 0-10V In | 0.1 |  V |
| 00_0010_1123_10_0100_052_4_0| Systemdatum | 1 |  |
| 00_0010_1123_10_0100_048_1_8192| !Sensormodul Bus-Kommunikation gestört | 1 |  |
| 00_0010_1123_10_0100_048_1_16384| !Powermodul Bus-Kommunikation gestört | 1 |  |
| 00_0010_1123_10_0100_048_1_1| !Sensorfehler Leitungsbruch | 1 |  |
| 00_0010_1123_10_0100_048_1_2| !Sensorfehler Kurzschluss | 1 |  |
| 00_0010_1123_10_0100_072_1_4| RTC Fehler | 1 |  |
| 00_0010_1123_10_0100_072_1_128| Sensormodul wird verwendet | 1 |  |
| 00_0010_1123_10_0100_072_1_65536| Heizstab 0 aktiv | 1 |  |
| 00_0010_1123_10_0100_072_1_2097152| Wechselrichter Aktiv | 1 |  |



### <a name="0010_1127_0100"></a>DFA (0x0010) <= DeltaSol AL E HE (0x1127), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1127_10_0100_034_2_0| Systemzeit | 1 |  |
| 00_0010_1127_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1127_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1127_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1127_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1127_10_0100_008_2_0| Temperatur GFD | 0.1 |  °C |
| 00_0010_1127_10_0100_010_2_0| Volumenstrom 1 | 1 |  l/h |
| 00_0010_1127_10_0100_012_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1127_10_0100_016_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1127_10_0100_014_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_1127_10_0100_018_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_1127_10_0100_020_4_0| PFB1 Duty | 0.001 | % |
| 00_0010_1127_10_0100_024_4_0| PFB1 Freq. | 0.001 |  Hz |
| 00_0010_1127_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1127_10_0100_040_1_0| UnitType | 1 |  |
| 00_0010_1127_10_0100_036_4_0| Statusmask | 1 |  |
| 00_0010_1127_10_0100_032_2_0| ErrorMask | 1 |  |
| 00_0010_1127_10_0100_032_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_1127_10_0100_032_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_1127_10_0100_032_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_1127_10_0100_032_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_1127_10_0100_032_1_16| GFD defekt | 1 |  |
| 00_0010_1127_10_0100_032_1_32| PFB1 defekt | 1 |  |
| 00_0010_1127_10_0100_042_2_0| SW Version | 0.01 |  |



### <a name="0010_1140_0100"></a>DFA (0x0010) <= DeltaTherm HC mini \[Heizkreis 1\] (0x1140), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1140_10_0100_000_2_0| Heizung_Heizkreis1_TVorlaufSoll_C | 0.1 |  °C |
| 00_0010_1140_10_0100_002_1_0| Heizung_Heizkreis1_Betriebsstatus | 1 |  |
| 00_0010_1140_10_0100_003_1_0| Heizung_Heizkreis1_Betriebsart | 1 |  |
| 00_0010_1140_10_0100_004_4_0| Heizung_Heizkreis1_Brennerstarts | 1 |  |



### <a name="0010_1150_0100"></a>DFA (0x0010) <= Kioto FWS (0x1150), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1150_10_0100_000_2_0| Sensor S1 | 0.1 |  °C |
| 00_0010_1150_10_0100_002_2_0| Sensor S2 | 0.1 |  °C |
| 00_0010_1150_10_0100_004_2_0| Sensor S3 | 0.1 |  °C |
| 00_0010_1150_10_0100_006_2_0| Sensor S4 T | 0.1 |  °C |
| 00_0010_1150_10_0100_008_4_0| Sensor S4 / dV | 1 |  l/h |
| 00_0010_1150_10_0100_012_2_0| Sensor S5 | 0.1 |  °C |
| 00_0010_1150_10_0100_014_2_0| Poti | 0.1 |  °C |
| 00_0010_1150_10_0100_030_1_0| DipSwitch | 1 |  |
| 00_0010_1150_10_0100_016_2_0| Primärpumpe | 0.1 | % |
| 00_0010_1150_10_0100_018_2_0| Mischventil | 1 | % |
| 00_0010_1150_10_0100_020_1_0| Zirkulationspumpe | 1 | % |
| 00_0010_1150_10_0100_021_2_0| WW-Solltemperatur | 0.1 |  °C |
| 00_0010_1150_10_0100_024_2_0| Zirkulation Einschaltz. | 1 |  s |
| 00_0010_1150_10_0100_026_2_0| Zirkulation Sperrzeit | 1 |  s |
| 00_0010_1150_10_0100_028_2_0| Therm. Desinfektion | 1 |  s |
| 00_0010_1150_10_0100_032_4_0| Betriebszeit Primärp. | 1 |  s |
| 00_0010_1150_10_0100_036_4_0| Betriebszeit Zirkulation | 1 |  s |
| 00_0010_1150_10_0100_040_1_0| PWM A | 1 | % |
| 00_0010_1150_10_0100_041_2_0| Kennlinie | 1 |  |
| 00_0010_1150_10_0100_044_4_0| PID P-Anteil | 0.001 |  |
| 00_0010_1150_10_0100_048_4_0| PID I-Anteil | 0.001 |  |
| 00_0010_1150_10_0100_052_4_0| PID D-Anteil | 0.001 |  |
| 00_0010_1150_10_0100_056_4_0| Systemdatum | 1 |  |



### <a name="0010_1160_0100"></a>DFA (0x0010) <= MFR \[Regler\] (0x1160), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1160_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1160_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1160_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1160_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1160_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1160_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_1160_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_1160_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_1160_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_1160_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_1160_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_1160_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_1160_10_0100_024_2_0| Temperatur Sensor 13 | 0.1 |  °C |
| 00_0010_1160_10_0100_026_2_0| Temperatur Sensor 14 | 0.1 |  °C |
| 00_0010_1160_10_0100_028_2_0| Temperatur Sensor 15 | 0.1 |  °C |
| 00_0010_1160_10_0100_030_2_0| Einstrahlung Sensor 16 | 1 |  W/m² |
| 00_0010_1160_10_0100_032_2_0| Temperatur Sensor 17 | 0.1 |  °C |
| 00_0010_1160_10_0100_034_2_0| Temperatur Sensor 18 | 0.1 |  °C |
| 00_0010_1160_10_0100_036_2_0| Temperatur Sensor 19 | 0.1 |  °C |
| 00_0010_1160_10_0100_038_2_0| Temperatur Sensor 20 | 0.1 |  °C |
| 00_0010_1160_10_0100_040_4_0| Volumenstrom Sensor 13 | 1 |  l/h |
| 00_0010_1160_10_0100_044_4_0| Volumenstrom Sensor 14 | 1 |  l/h |
| 00_0010_1160_10_0100_048_4_0| Volumenstrom Sensor 15 | 1 |  l/h |
| 00_0010_1160_10_0100_052_4_0| Volumenstrom Sensor 17 | 1 |  l/h |
| 00_0010_1160_10_0100_056_4_0| Volumenstrom Sensor 18 | 1 |  l/h |
| 00_0010_1160_10_0100_060_4_0| Volumenstrom Sensor 19 | 1 |  l/h |
| 00_0010_1160_10_0100_064_4_0| Volumenstrom Sensor 20 | 1 |  l/h |
| 00_0010_1160_10_0100_068_2_0| Druck Sensor 17 | 0.01 |  bar |
| 00_0010_1160_10_0100_070_2_0| Druck Sensor 18 | 0.01 |  bar |
| 00_0010_1160_10_0100_072_2_0| Druck Sensor 19 | 0.01 |  bar |
| 00_0010_1160_10_0100_074_2_0| Druck Sensor 20 | 0.01 |  bar |
| 00_0010_1160_10_0100_076_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1160_10_0100_077_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1160_10_0100_078_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1160_10_0100_079_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1160_10_0100_080_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_1160_10_0100_081_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_1160_10_0100_082_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_1160_10_0100_083_1_0| Drehzahl Relais 8 | 1 | % |
| 00_0010_1160_10_0100_084_1_0| Drehzahl Relais 9 | 1 | % |
| 00_0010_1160_10_0100_085_1_0| Drehzahl Relais 10 | 1 | % |
| 00_0010_1160_10_0100_086_1_0| Drehzahl Relais 11 | 1 | % |
| 00_0010_1160_10_0100_087_1_0| Drehzahl Relais 12 | 1 | % |
| 00_0010_1160_10_0100_088_1_0| Drehzahl Relais 13 | 1 | % |
| 00_0010_1160_10_0100_089_1_0| Drehzahl Relais 14 | 1 | % |
| 00_0010_1160_10_0100_092_4_0| Systemdatum | 1 |  |
| 00_0010_1160_10_0100_096_4_0| Fehlermaske | 1 |  |



### <a name="0010_1161_0100"></a>DFA (0x0010) <= MFR \[Module\] (0x1161), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1161_10_0100_000_2_0| Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 00_0010_1161_10_0100_002_2_0| Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 00_0010_1161_10_0100_004_2_0| Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 00_0010_1161_10_0100_006_2_0| Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 00_0010_1161_10_0100_008_2_0| Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 00_0010_1161_10_0100_010_2_0| Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 00_0010_1161_10_0100_012_2_0| Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 00_0010_1161_10_0100_014_2_0| Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 00_0010_1161_10_0100_016_2_0| Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 00_0010_1161_10_0100_018_2_0| Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 00_0010_1161_10_0100_020_2_0| Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 00_0010_1161_10_0100_022_2_0| Temperatur Modul 2 Sensor 6 | 0.1 |  °C |
| 00_0010_1161_10_0100_024_2_0| Temperatur Modul 3 Sensor 1 | 0.1 |  °C |
| 00_0010_1161_10_0100_026_2_0| Temperatur Modul 3 Sensor 2 | 0.1 |  °C |
| 00_0010_1161_10_0100_028_2_0| Temperatur Modul 3 Sensor 3 | 0.1 |  °C |
| 00_0010_1161_10_0100_030_2_0| Temperatur Modul 3 Sensor 4 | 0.1 |  °C |
| 00_0010_1161_10_0100_032_2_0| Temperatur Modul 3 Sensor 5 | 0.1 |  °C |
| 00_0010_1161_10_0100_034_2_0| Temperatur Modul 3 Sensor 6 | 0.1 |  °C |
| 00_0010_1161_10_0100_036_2_0| Temperatur Modul 4 Sensor 1 | 0.1 |  °C |
| 00_0010_1161_10_0100_038_2_0| Temperatur Modul 4 Sensor 2 | 0.1 |  °C |
| 00_0010_1161_10_0100_040_2_0| Temperatur Modul 4 Sensor 3 | 0.1 |  °C |
| 00_0010_1161_10_0100_042_2_0| Temperatur Modul 4 Sensor 4 | 0.1 |  °C |
| 00_0010_1161_10_0100_044_2_0| Temperatur Modul 4 Sensor 5 | 0.1 |  °C |
| 00_0010_1161_10_0100_046_2_0| Temperatur Modul 4 Sensor 6 | 0.1 |  °C |
| 00_0010_1161_10_0100_048_2_0| Temperatur Modul 5 Sensor 1 | 0.1 |  °C |
| 00_0010_1161_10_0100_050_2_0| Temperatur Modul 5 Sensor 2 | 0.1 |  °C |
| 00_0010_1161_10_0100_052_2_0| Temperatur Modul 5 Sensor 3 | 0.1 |  °C |
| 00_0010_1161_10_0100_054_2_0| Temperatur Modul 5 Sensor 4 | 0.1 |  °C |
| 00_0010_1161_10_0100_056_2_0| Temperatur Modul 5 Sensor 5 | 0.1 |  °C |
| 00_0010_1161_10_0100_058_2_0| Temperatur Modul 5 Sensor 6 | 0.1 |  °C |



### <a name="0010_1162_0100"></a>DFA (0x0010) <= MFR \[Frischwasser\] (0x1162), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1162_10_0100_000_2_0| Warmwassertemperatur | 0.1 |  °C |
| 00_0010_1162_10_0100_002_2_0| Warmwassersoll | 0.1 |  °C |
| 00_0010_1162_10_0100_004_4_0| Zapfvolumenstrom | 0.1 |  l/min |
| 00_0010_1162_10_0100_008_2_0| Speichervorlauf | 0.1 |  °C |
| 00_0010_1162_10_0100_012_4_0| Zapfmenge gesamt | 0.001 |  m³ |
| 00_0010_1162_10_0100_010_1_0| Drehzahl Primärpumpe | 1 | % |
| 00_0010_1162_10_0100_011_1_0| Drehzahl Zirkulation | 1 | % |
| 00_0010_1162_10_0100_016_2_0| Status | 1 |  |



### <a name="0010_1170_0100"></a>DFA (0x0010) <= SolarVenti SControl (0x1170), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1170_10_0100_000_4_0| ChangeSetId | 1 |  |
| 00_0010_1170_10_0100_004_4_0| Systemdatum | 1 |  |
| 00_0010_1170_10_0100_008_4_0| Software-Artikelnummer | 1 |  |
| 00_0010_1170_10_0100_050_2_0| Systemspannung | 0.01 |  V |
| 00_0010_1170_10_0100_052_2_0| VIN 1 | 0.01 |  V |
| 00_0010_1170_10_0100_054_2_0| VIN 2 | 0.01 |  V |
| 00_0010_1170_10_0100_056_2_0| VOut | 0.01 |  V |
| 00_0010_1170_10_0100_012_1_0| System | 1 |  |
| 00_0010_1170_10_0100_013_1_0| Regelstatus | 1 |  |
| 00_0010_1170_10_0100_014_1_0| Betriebsart | 1 |  |
| 00_0010_1170_10_0100_016_1_2| Meldungen: Datum/Uhrzeit | 1 |  |
| 00_0010_1170_10_0100_016_1_8| Meldungen: Handbetrieb | 1 |  |
| 00_0010_1170_10_0100_016_1_16| Meldungen: Sensorfehler Kollektor | 1 |  |
| 00_0010_1170_10_0100_016_1_32| Meldungen: Sensorfehler Raum | 1 |  |
| 00_0010_1170_10_0100_016_1_64| Meldungen: Sensorfehler Gerät | 1 |  |
| 00_0010_1170_10_0100_016_1_128| Meldungen: Sensorfehler Aussen | 1 |  |
| 00_0010_1170_10_0100_016_1_256| Meldungen: Systemspannung | 1 |  |
| 00_0010_1170_10_0100_020_2_0| Sensor: S1 | 0.1 |  °C |
| 00_0010_1170_10_0100_022_2_0| Sensor: S2 | 0.1 |  °C |
| 00_0010_1170_10_0100_026_2_0| Sensor: K1 - Temperatur | 0.1 |  °C |
| 00_0010_1170_10_0100_028_2_0| Sensor: K1 - Relative Luftfeuchtigkeit | 1 | % |
| 00_0010_1170_10_0100_030_2_0| Sensor: K1 - Berechnete Taupunkttemperatur | 0.1 |  °C |
| 00_0010_1170_10_0100_032_2_0| Sensor: K2 - Temperatur | 0.1 |  °C |
| 00_0010_1170_10_0100_034_2_0| Sensor: K2 - Relative Luftfeuchtigkeit | 1 | % |
| 00_0010_1170_10_0100_036_2_0| Sensor: K2 - Berechnete Taupunkttemperatur | 0.1 |  °C |
| 00_0010_1170_10_0100_038_2_0| Sensor: K3 - Temperatur | 0.1 |  °C |
| 00_0010_1170_10_0100_040_2_0| Sensor: K3 - Relative Luftfeuchtigkeit | 1 | % |
| 00_0010_1170_10_0100_042_2_0| Sensor: K3 - Berechnete Taupunkttemperatur | 0.1 |  °C |
| 00_0010_1170_10_0100_058_2_0| Tauspunktsperre: Dynamische Kollektortemperatur | 0.1 |  °C |
| 00_0010_1170_10_0100_044_2_0| Ausgang Ventilator | 1 | % |
| 00_0010_1170_10_0100_046_2_0| Ausgang 0-10V | 1 | % |
| 00_0010_1170_10_0100_048_2_0| Relais | 1 | % |
| 00_0010_1170_10_0100_064_1_64| Kollektormaximaltemperatur erreicht | 1 |  |
| 00_0010_1170_10_0100_064_1_128| Frostschutzfunktion aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_256| Taupunktsperre aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_512| Freigabe aufgrund der Dynamik | 1 |  |
| 00_0010_1170_10_0100_064_1_1024| Thermische Freigabe erteilt | 1 |  |
| 00_0010_1170_10_0100_064_1_2048| Freigabe durch Starttemperatur | 1 |  |
| 00_0010_1170_10_0100_064_1_4096| Freigabe durch Differenztemperatur | 1 |  |
| 00_0010_1170_10_0100_064_1_8192| Freigabe durch Raumtemperatur | 1 |  |
| 00_0010_1170_10_0100_064_1_16384| Sperrzeit der Temperaturfunktion aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_32768| Intervallfunktion der Timerfunktion ist aus | 1 |  |
| 00_0010_1170_10_0100_064_1_65536| Intervallfunktion der Timerfunktion ist im Pausenbetrieb | 1 |  |
| 00_0010_1170_10_0100_064_1_131072| Intervallfunktion der Timerfunktion ist aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_262144| Schaltuhrenstatus der Timerfunktion aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_524288| Kuehlfunktion aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_1048576| Raumfreigabe der Kuehlfunktion | 1 |  |
| 00_0010_1170_10_0100_064_1_2097152| Aussentemperaturfreigabe der Kuehlfunktion | 1 |  |
| 00_0010_1170_10_0100_064_1_4194304| Timer der Kuehlfunktion aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_8388608| Feuchtigkeitsfunktion aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_16777216| Feuchtigkeitsfunktion durch Raumklima angefordert | 1 |  |
| 00_0010_1170_10_0100_064_1_33554432| Sperrzeit der Feuchtigkeitsfunktion aktiv | 1 |  |
| 00_0010_1170_10_0100_064_1_67108864| Die ChangeSet-ID des Regler | 1 |  |



### <a name="0010_1200_0100"></a>DFA (0x0010) <= MFR \[WMZ\] (0x1200 - 0x120F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1200_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1200_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_1200_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |



### <a name="0010_1210_0100"></a>DFA (0x0010) <= MFR \[Heizkreis\] (0x1210 - 0x121F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1210_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_1210_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_1220_0100"></a>DFA (0x0010) <= Regudis H-HT \[Übergabestation\] (0x1220 - 0x122F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1220_10_0100_000_1_0| Übergabestation Status | 1 |  |
| 00_0010_1220_10_0100_001_1_0| Primärkreis Stellantrieb | 1 | % |
| 00_0010_1220_10_0100_002_2_0| Primärkreis Vorlauftemperatur | 0.1 |  °C |
| 00_0010_1220_10_0100_004_2_0| Primärkreis Rücklauftemperatur | 0.1 |  °C |
| 00_0010_1220_10_0100_006_2_0| Primärkreis Rücklaufmaximaltemperatur | 0.1 |  °C |
| 00_0010_1220_10_0100_008_2_0| Sekundärkreis Vorlauftemperatur | 0.1 |  °C |
| 00_0010_1220_10_0100_010_2_0| Sekundärkreis Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0010_1220_10_0100_012_2_0| Sekundärkreis Rücklauftemperatur | 0.1 |  °C |



### <a name="0010_1230_0100"></a>DFA (0x0010) <= DeltaTherm HC \[BW-Erwärmung\] (0x1230 - 0x123F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1230_10_0100_000_1_0| Status | 1 |  |
| 00_0010_1230_10_0100_002_2_0| NH1 | 0.1 |  °C |
| 00_0010_1230_10_0100_004_2_0| NH2 | 0.1 |  °C |
| 00_0010_1230_10_0100_008_2_0| TEin | 0.1 |  °C |
| 00_0010_1230_10_0100_010_2_0| TAus | 0.1 |  °C |
| 00_0010_1230_10_0100_001_1_0| Ladepumpe | 1 | % |
| 00_0010_1230_10_0100_006_1_0| Ventil | 1 | % |
| 00_0010_1230_10_0100_007_1_0| Anforderung | 1 | % |



### <a name="0010_1240_0100"></a>DFA (0x0010) <= Wagner Sungo 100 \[Regler\] (0x1240), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1240_10_0100_000_4_0| Systemdatum | 1 |  |
| 00_0010_1240_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1240_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1240_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1240_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1240_10_0100_012_2_0| TAGE | 1 |  |
| 00_0010_1240_10_0100_016_4_0| Volumenstrom V40 | 1 |  l/h |
| 00_0010_1240_10_0100_020_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1240_10_0100_021_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1240_10_0100_022_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1240_10_0100_024_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1240_10_0100_028_2_0| SW-Version | 0.01 |  |
| 00_0010_1240_10_0100_032_4_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_1240_10_0100_036_4_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_1240_10_0100_040_4_0| Betriebsstunden Relais 3 | 1 |  h |
| 00_0010_1240_10_0100_044_1_1| Urlaubsfunktion | 1 |  |
| 00_0010_1240_10_0100_045_1_0| Blockierschutz 1 | 1 | % |
| 00_0010_1240_10_0100_046_1_0| Blockierschutz 2 | 1 | % |
| 00_0010_1240_10_0100_047_1_0| Blockierschutz 3 | 1 | % |
| 00_0010_1240_10_0100_048_4_0| Initalisieren | 1 |  |
| 00_0010_1240_10_0100_052_4_0| Befüllung | 1 |  |
| 00_0010_1240_10_0100_054_4_0| Stabilisieren | 1 |  |
| 00_0010_1240_10_0100_060_1_0| Pumpenverzögerung | 1 |  |
| 00_0010_1240_10_0100_061_1_1| Überwärmeabfuhr | 1 |  |
| 00_0010_1240_10_0100_062_1_0| Nachlauf | 1 |  |
| 00_0010_1240_10_0100_063_1_0| Thermische Desinfektion | 1 |  |
| 00_0010_1240_10_0100_064_1_1| Speicherkühlung | 1 |  |
| 00_0010_1240_10_0100_065_1_1| Systemkühlung | 1 |  |
| 00_0010_1240_10_0100_066_1_0| Spreizung | 1 |  |
| 00_0010_1240_10_0100_067_1_0| Frostschutz | 1 |  |
| 00_0010_1240_10_0100_068_1_1| Kollektorkühlung | 1 |  |
| 00_0010_1240_10_0100_069_1_1| Speichermaximaltemperatur | 1 |  |
| 00_0010_1240_10_0100_070_1_1| Neustarts | 1 |  |
| 00_0010_1240_10_0100_072_4_0| Fehlermaske | 1 |  |



### <a name="0010_1241_0100"></a>DFA (0x0010) <= Wagner Sungo 100 \[WMZ1\] (0x1241), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1241_10_0100_000_4_0| Wmz1_Wert_Wh | 1 |  Wh |
| 00_0010_1241_10_0100_004_4_0| Wmz1_Leistung_W | 1 |  W |
| 00_0010_1241_10_0100_008_4_0| Wmz1_WertHeute_Wh | 1 |  Wh |
| 00_0010_1241_10_0100_012_4_0| Wmz1_WertWoche_Wh | 1 |  Wh |



### <a name="0010_1250_0100"></a>DFA (0x0010) <= Viessmann Vitotrans 353 2017 (0x1250), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1250_10_0100_000_4_0| Systemdatum | 1 |  |
| 00_0010_1250_10_0100_004_2_0| T-VL | 0.1 |  °C |
| 00_0010_1250_10_0100_006_2_0| T-WW | 0.1 |  °C |
| 00_0010_1250_10_0100_008_2_0| T-KW | 0.1 |  °C |
| 00_0010_1250_10_0100_010_2_0| S4 | 0.1 |  °C |
| 00_0010_1250_10_0100_012_2_0| S5 | 0.1 |  °C |
| 00_0010_1250_10_0100_016_4_0| V-US | 1 |  l/h |
| 00_0010_1250_10_0100_020_4_0| V-Impuls | 1 |  l/h |
| 00_0010_1250_10_0100_024_1_0| PWM P | 1 | % |
| 00_0010_1250_10_0100_028_4_0| PWM P | 1 |  s |
| 00_0010_1250_10_0100_025_1_0| PWM 28 | 1 | % |
| 00_0010_1250_10_0100_032_4_0| PWM 28 | 1 |  s |
| 00_0010_1250_10_0100_026_1_0| Relais 157 | 1 |  |
| 00_0010_1250_10_0100_027_1_0| Relais 28 | 1 |  |
| 00_0010_1250_10_0100_036_1_0| R2 | 1 |  |
| 00_0010_1250_10_0100_044_4_0| Energie Heute | 1 |  Wh |
| 00_0010_1250_10_0100_048_4_0| Energie Gesamt | 1 |  Wh |
| 00_0010_1250_10_0100_084_4_0| Zapfmenge Gesamt | 1 |  l |
| 00_0010_1250_10_0100_088_4_0| Gesamtbetrieb | 1 |  s |
| 00_0010_1250_10_0100_080_4_0| Fehler | 1 |  |
| 00_0010_1250_10_0100_064_2_0| Version | 0.01 |  |
| 00_0010_1250_10_0100_066_1_0| Reglervariante | 1 |  |



### <a name="0010_1260_0100"></a>DFA (0x0010) <= Viessmann Vitotrans 353 2017 Broadcast (0x1260), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1260_10_0100_028_4_0| Systemdatum | 1 |  |
| 00_0010_1260_10_0100_000_2_0| KS3 | 0.1 |  °C |
| 00_0010_1260_10_0100_002_2_0| S4 | 0.1 |  °C |
| 00_0010_1260_10_0100_032_2_0| S5 | 0.1 |  °C |
| 00_0010_1260_10_0100_004_1_0| PWM 28 | 1 | % |
| 00_0010_1260_10_0100_008_4_0| PWM 28 | 1 |  s |
| 00_0010_1260_10_0100_005_1_0| Relais 157 | 1 |  |
| 00_0010_1260_10_0100_006_1_0| Relais 28 | 1 |  |
| 00_0010_1260_10_0100_012_1_0| R2 | 1 |  |
| 00_0010_1260_10_0100_016_4_0| Energie Gesamt | 1 |  Wh |
| 00_0010_1260_10_0100_020_4_0| Zapfmenge Gesamt | 1 |  l |
| 00_0010_1260_10_0100_024_4_0| Betriebszeit Gesamt | 1 |  s |



### <a name="0010_1330_0100"></a>DFA (0x0010) <= controller S/L (0x1330), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1330_10_0100_004_4_0| Systemdatum | 1 |  |
| 00_0010_1330_10_0100_016_2_0| Warmwasser: Primärpumpendrehzahl | 0.1 | % |
| 00_0010_1330_10_0100_018_2_0| Warmwasser: Solltemperatur | 0.1 |  °C |
| 00_0010_1330_10_0100_020_1_0| Warmwasser: Notdrehzahl | 1 | % |
| 00_0010_1330_10_0100_021_1_0| Warmwasser: Handbetrieb Primärpumpe | 1 | % |
| 00_0010_1330_10_0100_032_2_0| Zirkulation: Pumpendrehzahl | 0.1 | % |
| 00_0010_1330_10_0100_037_1_0| Desinfektion: Handstartschalter | 1 |  |
| 00_0010_1330_10_0100_039_1_0| Desinfektion: Ergebnis | 1 |  |
| 00_0010_1330_10_0100_040_4_0| Desinfektion: Letzte Desinfektion | 1 |  |
| 00_0010_1330_10_0100_044_2_0| Desinfektion: Startzeit | 1 |  |
| 00_0010_1330_10_0100_046_1_1| Desinfektion: Montag | 1 |  |
| 00_0010_1330_10_0100_046_1_2| Desinfektion: Dienstag | 1 |  |
| 00_0010_1330_10_0100_046_1_4| Desinfektion: Mittwoch | 1 |  |
| 00_0010_1330_10_0100_046_1_8| Desinfektion: Donnerstag | 1 |  |
| 00_0010_1330_10_0100_046_1_16| Desinfektion: Freitag | 1 |  |
| 00_0010_1330_10_0100_046_1_32| Desinfektion: Samstag | 1 |  |
| 00_0010_1330_10_0100_046_1_64| Desinfektion: Sonntag | 1 |  |
| 00_0010_1330_10_0100_051_1_0| RL-Einschichtung: Ventilzustand | 1 |  |
| 00_0010_1330_10_0100_056_1_0| Fehlerrelais: Zustand | 1 |  |
| 00_0010_1330_10_0100_064_2_0| Sensor: S1 | 0.1 |  °C |
| 00_0010_1330_10_0100_066_2_0| Sensor: S2 | 0.1 |  °C |
| 00_0010_1330_10_0100_068_2_0| Sensor: S3 | 0.1 |  °C |
| 00_0010_1330_10_0100_070_2_0| Sensor: S4 | 0.1 |  °C |
| 00_0010_1330_10_0100_072_2_0| Sensor: S5 | 0.1 |  °C |
| 00_0010_1330_10_0100_074_2_0| Sensor: S6 | 0.1 |  °C |
| 00_0010_1330_10_0100_076_2_0| Sensor: S7 | 0.1 |  °C |
| 00_0010_1330_10_0100_084_4_0| Sensor: S9 Volumenstrom | 1 |  l/h |
| 00_0010_1330_10_0100_088_4_0| Sensor: S10 Volumenstrom | 1 |  l/h |
| 00_0010_1330_10_0100_092_4_0| Sensor: S14 Kaskade - Gesamtvolumenstrom | 1 |  l/h |
| 00_0010_1330_10_0100_100_1_0| Kaskade: Grundlaststation | 1 |  |
| 00_0010_1330_10_0100_112_2_0| Kaskade: Station 2 TVL | 0.1 |  °C |
| 00_0010_1330_10_0100_114_2_0| Kaskade: Station 2 TWW | 0.1 |  °C |
| 00_0010_1330_10_0100_116_4_0| Kaskade: Station 2 Volumenstrom | 0.1 |  l/min |
| 00_0010_1330_10_0100_120_4_0| Kaskade: Station 2 Meldungen | 1 |  |
| 00_0010_1330_10_0100_124_2_0| Kaskade: Station 3 TVL | 0.1 |  °C |
| 00_0010_1330_10_0100_126_2_0| Kaskade: Station 3 TWW | 0.1 |  °C |
| 00_0010_1330_10_0100_128_4_0| Kaskade: Station 3 Volumenstrom | 0.1 |  l/min |
| 00_0010_1330_10_0100_132_4_0| Kaskade: Station 3 Meldungen | 1 |  |
| 00_0010_1330_10_0100_136_2_0| Kaskade: Station 4 TVL | 0.1 |  °C |
| 00_0010_1330_10_0100_138_2_0| Kaskade: Station 4 TWW | 0.1 |  °C |
| 00_0010_1330_10_0100_140_4_0| Kaskade: Station 4 Volumenstrom | 0.1 |  l/min |
| 00_0010_1330_10_0100_144_4_0| Kaskade: Station 4 Meldungen | 1 |  |
| 00_0010_1330_10_0100_168_2_0| Kaskade: Station 5 TVL | 0.1 |  °C |
| 00_0010_1330_10_0100_170_2_0| Kaskade: Station 5 TWW | 0.1 |  °C |
| 00_0010_1330_10_0100_172_4_0| Kaskade: Station 5 Volumenstrom | 0.1 |  l/min |
| 00_0010_1330_10_0100_176_4_0| Kaskade: Station 5 Meldungen | 1 |  |
| 00_0010_1330_10_0100_180_2_0| Kaskade: Station 6 TVL | 0.1 |  °C |
| 00_0010_1330_10_0100_182_2_0| Kaskade: Station 6 TWW | 0.1 |  °C |
| 00_0010_1330_10_0100_184_4_0| Kaskade: Station 6 Volumenstrom | 0.1 |  l/min |
| 00_0010_1330_10_0100_188_4_0| Kaskade: Station 6 Meldungen | 1 |  |
| 00_0010_1330_10_0100_148_2_0| Kaskade: Station 2 Primärpumpendrehzahl | 0.1 | % |
| 00_0010_1330_10_0100_150_2_0| Kaskade: Station 3 Primärpumpendrehzahl | 0.1 | % |
| 00_0010_1330_10_0100_152_2_0| Kaskade: Station 4 Primärpumpendrehzahl | 0.1 | % |
| 00_0010_1330_10_0100_192_2_0| Kaskade: Station 5 Primärpumpendrehzahl | 0.1 | % |
| 00_0010_1330_10_0100_194_2_0| Kaskade: Station 6 Primärpumpendrehzahl | 0.1 | % |



### <a name="0010_1400_0100"></a>DFA (0x0010) <= WMZ Plus (0x1400 - 0x140F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1400_10_0100_022_4_0| Datum | 1 |  |
| 00_0010_1400_10_0100_026_2_0| Vorlauf WMZ 1 | 0.1 |  °C |
| 00_0010_1400_10_0100_028_2_0| Rücklauf WMZ 1 | 0.1 |  °C |
| 00_0010_1400_10_0100_030_2_0| Volumenstrom WMZ 1 | 1 |  l/h |
| 00_0010_1400_10_0100_032_4_0| Wärmemenge WMZ 1 | 1 |  Wh |
| 00_0010_1400_10_0100_036_4_0| Kältemenge WMZ 1 | 1 |  Wh |
| 00_0010_1400_10_0100_040_4_0| Gesamtenergie WMZ 1 | 1 |  Wh |
| 00_0010_1400_10_0100_044_4_0| Gesamtvolumen WMZ 1 | 1 |  l |
| 00_0010_1400_10_0100_048_4_0| Leistung WMZ 1 | 1 |  W |
| 00_0010_1400_10_0100_052_1_0| Status WMZ 1 | 1 |  |
| 00_0010_1400_10_0100_056_2_0| Vorlauf WMZ 2 | 0.1 |  °C |
| 00_0010_1400_10_0100_058_2_0| Rücklauf WMZ 2 | 0.1 |  °C |
| 00_0010_1400_10_0100_060_2_0| Volumenstrom WMZ 2 | 1 |  l/h |
| 00_0010_1400_10_0100_062_4_0| Wärmemenge WMZ 2 | 1 |  Wh |
| 00_0010_1400_10_0100_066_4_0| Kältemenge WMZ 2 | 1 |  Wh |
| 00_0010_1400_10_0100_070_4_0| Gesamtenergie WMZ 2 | 1 |  Wh |
| 00_0010_1400_10_0100_074_4_0| Gesamtvolumen WMZ 2 | 1 |  l |
| 00_0010_1400_10_0100_078_4_0| Leistung WMZ 2 | 1 |  W |
| 00_0010_1400_10_0100_082_1_0| Status WMZ 2 | 1 |  |
| 00_0010_1400_10_0100_008_4_0| Warnungsmaske | 1 |  |
| 00_0010_1400_10_0100_012_4_0| Fehlermaske | 1 |  |
| 00_0010_1400_10_0100_016_4_0| Hinweismaske | 1 |  |
| 00_0010_1400_10_0100_020_2_0| SW-Version | 0.01 |  |



### <a name="0010_1410_0100"></a>DFA (0x0010) <= THERMUfloor ER (0x1410), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1410_10_0100_000_2_0| Primär Rücklauftemperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1410_10_0100_002_2_0| Sekundär Vorlauftemperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1410_10_0100_004_2_0| Außentemperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1410_10_0100_034_2_0| Primär Vorlauftemperatur Ga2 | 0.1 |  °C |
| 00_0010_1410_10_0100_036_2_0| Sekundär Rücklauftemperatur Gd1 | 0.1 |  °C |
| 00_0010_1410_10_0100_040_1_0| Kesselstörung Sensor 4 | 1 |  |
| 00_0010_1410_10_0100_041_1_0| Ölstand Sensor Ga1 | 1 | % |
| 00_0010_1410_10_0100_046_2_0| Primär Druck Ga2 | 0.01 |  bar |
| 00_0010_1410_10_0100_048_2_0| Sekundär Druck Gd1 | 0.01 |  bar |
| 00_0010_1410_10_0100_055_1_0| Luftfeuchtigkeit Gd2 | 1 | % |
| 00_0010_1410_10_0100_056_1_0| Relais 1 | 1 | % |
| 00_0010_1410_10_0100_057_1_0| Relais 2 | 1 | % |
| 00_0010_1410_10_0100_058_1_0| Relais 3 | 1 | % |
| 00_0010_1410_10_0100_069_1_0| Relais 4 | 1 | % |
| 00_0010_1410_10_0100_080_1_0| PWM A | 1 | % |
| 00_0010_1410_10_0100_081_1_0| Kesselanforderung 0-10 V | 1 | % |
| 00_0010_1410_10_0100_072_4_0| Systemdatum | 1 |  |
| 00_0010_1410_10_0100_076_4_0| Fehlermaske | 1 |  |
| 00_0010_1410_10_0100_084_1_0| Letztes Ereignis \(L. E.\) | 1 |  |
| 00_0010_1410_10_0100_088_4_0| L. E. Fehlermaske | 1 |  |
| 00_0010_1410_10_0100_092_4_0| L. E. Zeitstempel | 1 |  |



### <a name="0010_1420_0100"></a>DFA (0x0010) <= Apricus DeltaSol AL E HE (0x1420), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1420_10_0100_034_2_0| Systemzeit | 1 |  |
| 00_0010_1420_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1420_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1420_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1420_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1420_10_0100_008_2_0| Temperatur GFD | 0.1 |  °C |
| 00_0010_1420_10_0100_010_2_0| Volumenstrom 1 | 1 |  l/h |
| 00_0010_1420_10_0100_012_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1420_10_0100_016_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1420_10_0100_014_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_1420_10_0100_018_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_1420_10_0100_020_4_0| PFB1 Duty | 0.001 | % |
| 00_0010_1420_10_0100_024_4_0| PFB1 Freq. | 0.001 |  Hz |
| 00_0010_1420_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1420_10_0100_040_1_0| UnitType | 1 |  |
| 00_0010_1420_10_0100_036_4_0| Statusmask | 1 |  |
| 00_0010_1420_10_0100_032_2_0| ErrorMask | 1 |  |
| 00_0010_1420_10_0100_032_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_1420_10_0100_032_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_1420_10_0100_032_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_1420_10_0100_032_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_1420_10_0100_032_1_16| GFD defekt | 1 |  |
| 00_0010_1420_10_0100_032_1_32| PFB1 defekt | 1 |  |
| 00_0010_1420_10_0100_042_2_0| SW Version | 0.01 |  |



### <a name="0010_1510_0100"></a>DFA (0x0010) <= DeltaSol Fresh 2018 (0x1510), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1510_10_0100_004_4_0| Systemdatum | 1 |  |
| 00_0010_1510_10_0100_013_1_0| Warmwasser: Zustand | 1 |  |
| 00_0010_1510_10_0100_016_2_0| Warmwasser: Primärpumpendrehzahl | 0.1 | % |
| 00_0010_1510_10_0100_018_2_0| Warmwasser: Solltemperatur | 0.1 |  °C |
| 00_0010_1510_10_0100_032_2_0| Zirkulation: Pumpendrehzahl | 0.1 | % |
| 00_0010_1510_10_0100_034_2_0| Zirkulation: dT Leitung | 0.1 |  K |
| 00_0010_1510_10_0100_038_1_0| Desinfektion: Zustand | 1 |  |
| 00_0010_1510_10_0100_040_4_0| Desinfektion: Letzte Desinfektion | 1 |  |
| 00_0010_1510_10_0100_051_1_0| RL-Einschichtung: Ventilzustand | 1 |  |
| 00_0010_1510_10_0100_056_1_0| Fehlerrelais: Zustand | 1 |  |
| 00_0010_1510_10_0100_064_2_0| Sensor: S1 | 0.1 |  °C |
| 00_0010_1510_10_0100_066_2_0| Sensor: S2 | 0.1 |  °C |
| 00_0010_1510_10_0100_068_2_0| Sensor: S3 | 0.1 |  °C |
| 00_0010_1510_10_0100_070_2_0| Sensor: S4 | 0.1 |  °C |
| 00_0010_1510_10_0100_072_2_0| Sensor: S5 | 0.1 |  °C |
| 00_0010_1510_10_0100_074_2_0| Sensor: S6 | 0.1 |  °C |
| 00_0010_1510_10_0100_076_2_0| Sensor: S7 | 0.1 |  °C |
| 00_0010_1510_10_0100_084_4_0| Sensor: S9 Volumenstrom | 1 |  l/h |



### <a name="0010_1711_0100"></a>DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1711_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1711_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1711_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1711_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1711_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1711_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_1711_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_1711_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_1711_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_1711_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_1711_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_1711_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_1711_10_0100_024_2_0| Temperatur Sensor 13 | 0.1 |  °C |
| 00_0010_1711_10_0100_026_2_0| Temperatur Sensor 14 | 0.1 |  °C |
| 00_0010_1711_10_0100_028_2_0| Temperatur Sensor 15 | 0.1 |  °C |
| 00_0010_1711_10_0100_030_2_0| Einstrahlung Sensor 16 | 1 |  W/m² |
| 00_0010_1711_10_0100_032_2_0| Temperatur Sensor 17 | 0.1 |  °C |
| 00_0010_1711_10_0100_034_2_0| Temperatur Sensor 18 | 0.1 |  °C |
| 00_0010_1711_10_0100_036_2_0| Temperatur Sensor 19 | 0.1 |  °C |
| 00_0010_1711_10_0100_038_2_0| Temperatur Sensor 20 | 0.1 |  °C |
| 00_0010_1711_10_0100_040_4_0| Volumenstrom Sensor 13 | 1 |  l/h |
| 00_0010_1711_10_0100_044_4_0| Volumenstrom Sensor 14 | 1 |  l/h |
| 00_0010_1711_10_0100_048_4_0| Volumenstrom Sensor 15 | 1 |  l/h |
| 00_0010_1711_10_0100_052_4_0| Volumenstrom Sensor 17 | 1 |  l/h |
| 00_0010_1711_10_0100_056_4_0| Volumenstrom Sensor 18 | 1 |  l/h |
| 00_0010_1711_10_0100_060_4_0| Volumenstrom Sensor 19 | 1 |  l/h |
| 00_0010_1711_10_0100_064_4_0| Volumenstrom Sensor 20 | 1 |  l/h |
| 00_0010_1711_10_0100_104_4_0| Volumenstrom Sensor 21 | 1 |  l/h |
| 00_0010_1711_10_0100_068_2_0| Druck Sensor 17 | 0.01 |  bar |
| 00_0010_1711_10_0100_070_2_0| Druck Sensor 18 | 0.01 |  bar |
| 00_0010_1711_10_0100_072_2_0| Druck Sensor 19 | 0.01 |  bar |
| 00_0010_1711_10_0100_074_2_0| Druck Sensor 20 | 0.01 |  bar |
| 00_0010_1711_10_0100_076_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1711_10_0100_077_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1711_10_0100_078_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1711_10_0100_079_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1711_10_0100_080_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_1711_10_0100_081_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_1711_10_0100_082_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_1711_10_0100_083_1_0| Drehzahl Relais 8 | 1 | % |
| 00_0010_1711_10_0100_084_1_0| Drehzahl Relais 9 | 1 | % |
| 00_0010_1711_10_0100_085_1_0| Drehzahl Relais 10 | 1 | % |
| 00_0010_1711_10_0100_086_1_0| Drehzahl Relais 11 | 1 | % |
| 00_0010_1711_10_0100_087_1_0| Drehzahl Relais 12 | 1 | % |
| 00_0010_1711_10_0100_088_1_0| Drehzahl Relais 13 | 1 | % |
| 00_0010_1711_10_0100_089_1_0| Drehzahl Relais 14 | 1 | % |
| 00_0010_1711_10_0100_100_1_0| Ausgang A | 1 | % |
| 00_0010_1711_10_0100_101_1_0| Ausgang B | 1 | % |
| 00_0010_1711_10_0100_102_1_0| Ausgang C | 1 | % |
| 00_0010_1711_10_0100_103_1_0| Ausgang D | 1 | % |
| 00_0010_1711_10_0100_092_4_0| Systemdatum | 1 |  |
| 00_0010_1711_10_0100_096_4_0| Fehlermaske | 1 |  |
| 00_0010_1711_10_0100_096_1_1| Fehler: Sensorleitung unterbrochen | 1 |  |
| 00_0010_1711_10_0100_096_1_2| Fehler: Sensorleitung kurzgeschlossen | 1 |  |
| 00_0010_1711_10_0100_096_1_32| Fehler: Volumstromüberwachung | 1 |  |
| 00_0010_1711_10_0100_096_1_64| Fehler: Überdruck | 1 |  |
| 00_0010_1711_10_0100_096_1_128| Fehler: Minderdruck | 1 |  |
| 00_0010_1711_10_0100_096_1_512| Fehler: Datenspeicher | 1 |  |
| 00_0010_1711_10_0100_096_1_1024| Fehler: Echtzeituhr | 1 |  |
| 00_0010_1711_10_0100_096_1_4096| Fehler: Zwillingspumpe | 1 |  |
| 00_0010_1711_10_0100_096_1_8192| Fehler: HK-Kühlung unter Vorlaufminimaltemperatur | 1 |  |
| 00_0010_1711_10_0100_096_1_16384| Fehler: Thermische Desinfektion abgebrochen | 1 |  |



### <a name="0010_1711_0101"></a>DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0101

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1711_10_0101_000_4_0| Warnungsmaske | 1 |  |
| 00_0010_1711_10_0101_000_1_4| Warnung: ΔT zu hoch | 1 |  |
| 00_0010_1711_10_0101_000_1_8| Warnung: Nachtzirkulation | 1 |  |
| 00_0010_1711_10_0101_000_1_16| Warnung: Vorlauf/Rücklauf vertauscht | 1 |  |
| 00_0010_1711_10_0101_000_1_2048| Warnung: SD-Karte | 1 |  |
| 00_0010_1711_10_0101_004_1_0| Luftfeuchtigkeit Sensor 17 | 1 | %RH |
| 00_0010_1711_10_0101_005_1_0| Luftfeuchtigkeit Sensor 18 | 1 | %RH |



### <a name="0010_1711_0140"></a>DFA (0x0010) <= DeltaTherm HC max \[Regler\] (0x1711), command 0x0140

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1711_10_0140_000_1_0| Anzahl TD-Funktionen | 1 |  |
| 00_0010_1711_10_0140_001_1_0| Nummer letzte erfolgreiche TD | 1 |  |
| 00_0010_1711_10_0140_002_1_0| Nummer letzte abgebrochene TD | 1 |  |
| 00_0010_1711_10_0140_004_2_0| Maske erfolgreiche TD | 1 |  |
| 00_0010_1711_10_0140_006_2_0| Maske abgebrochene TD | 1 |  |
| 00_0010_1711_10_0140_008_4_0| Zeitstempel letzte erfolgreiche TD | 1 |  |
| 00_0010_1711_10_0140_012_4_0| Zeitstempel letzte abgebrochene TD | 1 |  |



### <a name="0010_1720_0100"></a>DFA (0x0010) <= DeltaTherm HC max \[Heizkreis\] (0x1720 - 0x172F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1720_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_1720_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_1730_0100"></a>DFA (0x0010) <= DeltaTherm HC max \[WMZ\] (0x1730 - 0x173F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1730_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_1730_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_1730_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |
| 00_0010_1730_10_0100_020_4_0| Wärmemenge Monat | 1 |  Wh |
| 00_0010_1730_10_0100_016_4_0| Gesamtvolumen | 1 |  l |
| 00_0010_1730_10_0100_024_4_0| Volumen heute | 1 |  l |
| 00_0010_1730_10_0100_028_4_0| Volumen Woche | 1 |  l |
| 00_0010_1730_10_0100_032_4_0| Volumen Monat | 1 |  l |
| 00_0010_1730_10_0100_004_4_0| Leistung | 1 |  W |



### <a name="0010_1740_0100"></a>DFA (0x0010) <= DeltaTherm HC max \[Modul\] (0x1740 - 0x174F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1740_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_1740_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_1740_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_1740_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_1740_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_1740_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_1740_10_0100_012_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_1740_10_0100_013_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_1740_10_0100_014_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_1740_10_0100_015_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_1740_10_0100_016_1_0| Drehzahl Relais 5 | 1 | % |



### <a name="0010_1800_0100"></a>DFA (0x0010) <= DeltaSol MX \[Impulszähler\] (0x1800 - 0x180F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_1800_10_0100_000_4_0| Zählerstand | 1 |  |
| 00_0010_1800_10_0100_004_4_0| Impulsrate | 1 |  Imp/h |
| 00_0010_1800_10_0100_008_4_0| Zählerstand heute | 1 |  |
| 00_0010_1800_10_0100_012_4_0| Zählerstand Woche | 1 |  |
| 00_0010_1800_10_0100_016_4_0| Zählerstand Monat | 1 |  |
| 00_0010_1800_10_0100_020_4_0| Zählerstand Jahr | 1 |  |



### <a name="0010_2211_0100"></a>DFA (0x0010) <= DeltaSol CS Plus (0x2211), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2211_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_2211_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_2211_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_2211_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_2211_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_2211_10_0100_012_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_2211_10_0100_010_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_2211_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_2211_10_0100_016_1_0| UnitType | 1 |  |
| 00_0010_2211_10_0100_017_1_0| System | 1 |  |
| 00_0010_2211_10_0100_020_2_0| ErrorMask | 1 |  |
| 00_0010_2211_10_0100_022_2_0| Systemzeit | 1 |  |
| 00_0010_2211_10_0100_020_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_2211_10_0100_020_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_2211_10_0100_020_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_2211_10_0100_020_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_2211_10_0100_024_4_0| Statusmask | 1 |  |
| 00_0010_2211_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_2211_10_0100_032_2_0| SW-Version | 0.01 |  |



### <a name="0010_2213_0100"></a>DFA (0x0010) <= DeltaSol CS Plus 2.x (0x2213), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2213_10_0100_022_2_0| Systemzeit | 1 |  |
| 00_0010_2213_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_2213_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_2213_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_2213_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_2213_10_0100_036_2_0| Temperatur GFD | 0.1 |  °C |
| 00_0010_2213_10_0100_038_2_0| Volumenstrom 1 | 1 |  l/h |
| 00_0010_2213_10_0100_040_2_0| Volumenstrom 2 | 1 |  l/h |
| 00_0010_2213_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_2213_10_0100_012_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_2213_10_0100_010_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_2213_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_2213_10_0100_044_4_0| PFB1 Duty | 0.001 | % |
| 00_0010_2213_10_0100_048_4_0| PFB1 Freq. | 0.001 |  Hz |
| 00_0010_2213_10_0100_052_4_0| PFB2 Duty | 0.001 | % |
| 00_0010_2213_10_0100_056_4_0| PFB2 Freq. | 0.001 |  Hz |
| 00_0010_2213_10_0100_016_1_0| UnitType | 1 |  |
| 00_0010_2213_10_0100_017_1_0| System | 1 |  |
| 00_0010_2213_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_2213_10_0100_024_4_0| Statusmask | 1 |  |
| 00_0010_2213_10_0100_020_2_0| ErrorMask | 1 |  |
| 00_0010_2213_10_0100_020_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_2213_10_0100_020_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_2213_10_0100_020_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_2213_10_0100_020_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_2213_10_0100_020_1_16| GFD defekt | 1 |  |
| 00_0010_2213_10_0100_020_1_32| PFB1 defekt | 1 |  |
| 00_0010_2213_10_0100_020_1_64| PFB2 defekt | 1 |  |
| 00_0010_2213_10_0100_032_2_0| SW Version | 0.01 |  |



### <a name="0010_2231_0100"></a>DFA (0x0010) <= Oranier HK \[Regler\] (0x2231), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2231_10_0100_000_2_0| Kollektor | 0.1 |  °C |
| 00_0010_2231_10_0100_002_2_0| Speicher Solar | 0.1 |  °C |
| 00_0010_2231_10_0100_004_2_0| Ofen Kesseltemp | 0.1 |  °C |
| 00_0010_2231_10_0100_006_2_0| Speicher unten | 0.1 |  °C |
| 00_0010_2231_10_0100_008_2_0| Rücklauf Heizkreis | 0.1 |  °C |
| 00_0010_2231_10_0100_010_2_0| Speicher Entnahme | 0.1 |  °C |
| 00_0010_2231_10_0100_012_2_0| Brauchwasserspeicher | 0.1 |  °C |
| 00_0010_2231_10_0100_014_2_0| Zirkulation-Fühler | 0.1 |  °C |
| 00_0010_2231_10_0100_016_2_0| Sensor 9 | 0.1 |  °C |
| 00_0010_2231_10_0100_018_2_0| Sensor 10 | 0.1 |  °C |
| 00_0010_2231_10_0100_020_2_0| Sensor 11 | 0.1 |  °C |
| 00_0010_2231_10_0100_022_2_0| Sensor 12 | 0.1 |  °C |
| 00_0010_2231_10_0100_024_2_0| Sensor 13 | 0.1 |  °C |
| 00_0010_2231_10_0100_026_2_0| Vorlauftemperatur HK1 | 0.1 |  °C |
| 00_0010_2231_10_0100_028_2_0| Aussentemperatur | 0.1 |  °C |
| 00_0010_2231_10_0100_030_2_0| Abgastemperatur | 0.1 |  °C |
| 00_0010_2231_10_0100_036_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_2231_10_0100_038_4_0| Impulseingang 1 | 1 |  |
| 00_0010_2231_10_0100_040_4_0| Impulseingang 2 | 1 |  |
| 00_0010_2231_10_0100_088_2_0| Sensorbruch-Maske | 1 |  |
| 00_0010_2231_10_0100_090_2_0| Sensorkurzschluss-Maske | 1 |  |
| 00_0010_2231_10_0100_080_4_0| Sensorbenutzungs-Maske | 1 |  |
| 00_0010_2231_10_0100_042_1_0| Pumpe Solar | 1 | % |
| 00_0010_2231_10_0100_043_1_0| Pumpe Ofen | 1 | % |
| 00_0010_2231_10_0100_044_1_0| Umschaltventil Kessel | 1 | % |
| 00_0010_2231_10_0100_045_1_0| BW-Ladepumpe | 1 | % |
| 00_0010_2231_10_0100_046_1_0| Zirkulationspumpe | 1 | % |
| 00_0010_2231_10_0100_047_1_0| Relais 6 | 1 | % |
| 00_0010_2231_10_0100_048_1_0| Relais 7 | 1 | % |
| 00_0010_2231_10_0100_049_1_0| Relais 8 | 1 | % |
| 00_0010_2231_10_0100_050_1_0| Brennersperre 2 | 1 | % |
| 00_0010_2231_10_0100_051_1_0| Mischer Auf | 1 | % |
| 00_0010_2231_10_0100_052_1_0| Mischer Zu | 1 | % |
| 00_0010_2231_10_0100_053_1_0| HK-Pumpe | 1 | % |
| 00_0010_2231_10_0100_054_1_0| Gas/ÖL/Pelletofen | 1 | % |
| 00_0010_2231_10_0100_084_4_0| Relaisbenutzungsmaske | 1 |  |
| 00_0010_2231_10_0100_056_2_0| Fehlermaske | 1 |  |
| 00_0010_2231_10_0100_058_2_0| Warnungsmaske | 1 |  |
| 00_0010_2231_10_0100_072_2_0| Reglerversion | 1 |  |
| 00_0010_2231_10_0100_074_2_0| Systemzeit | 1 |  |



### <a name="0010_2232_0100"></a>DFA (0x0010) <= Oranier HK \[WMZ1\] (0x2232), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2232_10_0100_000_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_2232_10_0100_002_2_0| Rücklauftemperatur | 0.1 |  °C |
| 00_0010_2232_10_0100_004_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_2232_10_0100_006_2_0| Wärme | 1 |  Wh |
| 00_0010_2232_10_0100_008_2_0| Wärme | 1 |  kWh |
| 00_0010_2232_10_0100_010_2_0| Wärme | 1 |  MWh |



### <a name="0010_2241_0100"></a>DFA (0x0010) <= Frischwasserregler (0x2241), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2241_10_0100_000_2_0| S1 | 0.1 |  °C |
| 00_0010_2241_10_0100_002_2_0| S2 | 0.1 |  °C |
| 00_0010_2241_10_0100_004_2_0| S3 | 0.1 |  °C |
| 00_0010_2241_10_0100_006_2_0| S4 | 0.1 |  °C |
| 00_0010_2241_10_0100_008_2_0| S5 | 0.1 |  l/min |
| 00_0010_2241_10_0100_010_2_0| Primärpumpe | 0.1 | % |
| 00_0010_2241_10_0100_040_2_0| Drehzahl Relais 1 | 0.1 | % |
| 00_0010_2241_10_0100_012_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_2241_10_0100_013_1_0| errorMask | 1 |  |
| 00_0010_2241_10_0100_014_1_0| warningMask | 1 |  |
| 00_0010_2241_10_0100_015_1_0| statusMask | 1 |  |
| 00_0010_2241_10_0100_016_4_0| Bilanz Wärmemenge | 1 |  Wh |
| 00_0010_2241_10_0100_020_4_0| Bilanz Dauer P1 an | 1 |  h |
| 00_0010_2241_10_0100_024_4_0| Bilanz Dauer P2 an | 1 |  h |
| 00_0010_2241_10_0100_028_4_0| Zapfmenge | 0.1 |  m³ |
| 00_0010_2241_10_0100_032_4_0| Systemdatum | 1 |  |
| 00_0010_2241_10_0100_036_2_0| Systemzeit | 1 |  |
| 00_0010_2241_10_0100_038_1_0| Version | 0.01 |  |



### <a name="0010_2251_0100"></a>DFA (0x0010) <= DeltaSol SL \[Regler\] (0x2251), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2251_10_0100_000_4_0| Systemdatum | 1 |  |
| 00_0010_2251_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_2251_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_2251_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_2251_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_2251_10_0100_012_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_2251_10_0100_014_2_0| Temperatur VFS/RPS \(S6\) | 0.1 |  °C |
| 00_0010_2251_10_0100_020_4_0| Volumenstrom V40 | 1 |  l/h |
| 00_0010_2251_10_0100_024_4_0| Volumenstrom VFS \(S6\) | 1 |  l/h |
| 00_0010_2251_10_0100_028_4_0| Volumenstrom Flowrotor \(S7\) | 1 |  l/h |
| 00_0010_2251_10_0100_032_2_0| Druck RPS \(S6\) | 0.01 |  bar |
| 00_0010_2251_10_0100_034_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_2251_10_0100_035_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_2251_10_0100_036_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_2251_10_0100_037_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_2251_10_0100_038_1_0| PWM A | 1 | % |
| 00_0010_2251_10_0100_039_1_0| PWM B | 1 | % |
| 00_0010_2251_10_0100_040_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_2251_10_0100_044_2_0| SW-Version | 0.01 |  |
| 00_0010_2251_10_0100_048_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_2251_10_0100_052_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_2251_10_0100_056_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_2251_10_0100_060_4_0| Betriebssekunden Relais 4 | 1 |  s |
| 00_0010_2251_10_0100_064_1_1| Urlaubsfunktion | 1 |  |
| 00_0010_2251_10_0100_065_1_0| Blockierschutz 1 | 1 | % |
| 00_0010_2251_10_0100_066_1_0| Blockierschutz 2 | 1 | % |
| 00_0010_2251_10_0100_067_1_0| Blockierschutz 3 | 1 | % |
| 00_0010_2251_10_0100_068_4_0| Initalisieren | 1 |  |
| 00_0010_2251_10_0100_072_4_0| Befüllung | 1 |  |
| 00_0010_2251_10_0100_076_4_0| Stabilisieren | 1 |  |
| 00_0010_2251_10_0100_080_1_0| Pumpenverzögerung | 1 |  |
| 00_0010_2251_10_0100_081_1_1| Überwärmeabfuhr | 1 |  |
| 00_0010_2251_10_0100_082_1_0| Nachlauf | 1 |  |
| 00_0010_2251_10_0100_083_1_0| Thermische Desinfektion | 1 |  |
| 00_0010_2251_10_0100_084_1_1| Speicherkühlung | 1 |  |
| 00_0010_2251_10_0100_085_1_1| Systemkühlung | 1 |  |
| 00_0010_2251_10_0100_086_1_0| Spreizung | 1 |  |
| 00_0010_2251_10_0100_087_1_0| Frostschutz | 1 |  |
| 00_0010_2251_10_0100_088_1_1| Kollektorkühlung | 1 |  |
| 00_0010_2251_10_0100_089_1_1| Einheit Temperatur | 1 |  |
| 00_0010_2251_10_0100_090_1_1| Einheit Durchfluss | 1 |  |
| 00_0010_2251_10_0100_091_1_1| Einheit Druck | 1 |  |
| 00_0010_2251_10_0100_093_1_1| Einheit Energie | 1 |  |
| 00_0010_2251_10_0100_094_1_1| Speichermaximaltemperatur | 1 |  |
| 00_0010_2251_10_0100_095_1_1| Neustarts | 1 |  |
| 00_0010_2251_10_0100_096_4_0| Fehlermaske | 1 |  |



### <a name="0010_2252_0100"></a>DFA (0x0010) <= DeltaSol SL \[WMZ1\] (0x2252), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2252_10_0100_000_4_0| Wmz1_Wert_Wh | 1 |  Wh |
| 00_0010_2252_10_0100_004_4_0| Wmz1_Leistung_W | 1 |  W |
| 00_0010_2252_10_0100_008_4_0| Wmz1_WertHeute_Wh | 1 |  Wh |
| 00_0010_2252_10_0100_012_4_0| Wmz1_WertWoche_Wh | 1 |  Wh |



### <a name="0010_2261_0100"></a>DFA (0x0010) <= HR Solar BASIC controller \[Regler\] (0x2261), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2261_10_0100_000_4_0| Systemdatum | 1 |  |
| 00_0010_2261_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_2261_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_2261_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_2261_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_2261_10_0100_012_2_0| TAGE | 1 |  |
| 00_0010_2261_10_0100_016_4_0| Volumenstrom Sensor V40 | 1 |  l/h |
| 00_0010_2261_10_0100_020_4_0| Volumenstrom Sensor VFS | 1 |  l/h |
| 00_0010_2261_10_0100_024_2_0| Temperatur Sensor VFS | 0.1 |  °C |
| 00_0010_2261_10_0100_026_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_2261_10_0100_027_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_2261_10_0100_028_1_0| Regler Ausgang 1 | 1 | % |
| 00_0010_2261_10_0100_032_4_0| Wmz1_Wert_Wh | 1 |  Wh |
| 00_0010_2261_10_0100_036_2_0| SW-Version | 0.01 |  |
| 00_0010_2261_10_0100_040_4_0| Betriebsstunden Relais1 | 1 |  h |
| 00_0010_2261_10_0100_044_4_0| Betriebsstunden Relais2 | 1 |  h |
| 00_0010_2261_10_0100_048_1_1| Urlaubsfunktion | 1 |  |
| 00_0010_2261_10_0100_049_1_1| Blockierschutz 1 | 1 |  |
| 00_0010_2261_10_0100_052_4_0| Initalisieren | 1 |  |
| 00_0010_2261_10_0100_056_4_0| Befüllung | 1 |  |
| 00_0010_2261_10_0100_060_4_0| Stabilisieren | 1 |  |
| 00_0010_2261_10_0100_064_1_0| Pumpenverzögerung | 1 |  |
| 00_0010_2261_10_0100_065_1_1| Überwärmeabfuhr | 1 |  |
| 00_0010_2261_10_0100_066_1_0| Nachlauf | 1 |  |
| 00_0010_2261_10_0100_067_1_1| Speicherkühlung | 1 |  |
| 00_0010_2261_10_0100_068_1_0| Frostschutz | 1 |  |
| 00_0010_2261_10_0100_069_1_1| Kollektorkühlung | 1 |  |
| 00_0010_2261_10_0100_070_1_1| Einheit Temperatur | 1 |  |
| 00_0010_2261_10_0100_071_1_1| Speichermaximaltemperatur | 1 |  |
| 00_0010_2261_10_0100_072_1_1| Neustarts | 1 |  |
| 00_0010_2261_10_0100_076_4_0| Fehlermaske | 1 |  |



### <a name="0010_2262_0100"></a>DFA (0x0010) <= HR Solar BASIC controller \[WMZ 1\] (0x2262), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2262_10_0100_000_4_0| Wmz1_Wert_Wh | 1 |  Wh |
| 00_0010_2262_10_0100_004_4_0| Wmz1_Leistung_W | 1 |  W |
| 00_0010_2262_10_0100_008_4_0| Wmz1_WertHeute_Wh | 1 |  Wh |
| 00_0010_2262_10_0100_012_4_0| Wmz1_WertWoche_Wh | 1 |  Wh |



### <a name="0010_2271_0100"></a>DFA (0x0010) <= DeltaSol SLL \[Regler\] (0x2271), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2271_10_0100_000_4_0| Systemdatum | 1 |  |
| 00_0010_2271_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_2271_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_2271_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_2271_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_2271_10_0100_012_2_0| TAGE | 1 |  |
| 00_0010_2271_10_0100_016_4_0| Volumenstrom V40 | 1 |  l/h |
| 00_0010_2271_10_0100_020_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_2271_10_0100_021_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_2271_10_0100_022_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_2271_10_0100_024_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_2271_10_0100_028_2_0| SW-Version | 0.01 |  |
| 00_0010_2271_10_0100_032_4_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_2271_10_0100_036_4_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_2271_10_0100_040_4_0| Betriebsstunden Relais 3 | 1 |  h |
| 00_0010_2271_10_0100_044_1_1| Urlaubsfunktion | 1 |  |
| 00_0010_2271_10_0100_045_1_0| Blockierschutz 1 | 1 | % |
| 00_0010_2271_10_0100_046_1_0| Blockierschutz 2 | 1 | % |
| 00_0010_2271_10_0100_047_1_0| Blockierschutz 3 | 1 | % |
| 00_0010_2271_10_0100_048_4_0| Initalisieren | 1 |  |
| 00_0010_2271_10_0100_052_4_0| Befüllung | 1 |  |
| 00_0010_2271_10_0100_054_4_0| Stabilisieren | 1 |  |
| 00_0010_2271_10_0100_060_1_0| Pumpenverzögerung | 1 |  |
| 00_0010_2271_10_0100_061_1_1| Überwärmeabfuhr | 1 |  |
| 00_0010_2271_10_0100_062_1_0| Nachlauf | 1 |  |
| 00_0010_2271_10_0100_063_1_0| Thermische Desinfektion | 1 |  |
| 00_0010_2271_10_0100_064_1_1| Speicherkühlung | 1 |  |
| 00_0010_2271_10_0100_065_1_1| Systemkühlung | 1 |  |
| 00_0010_2271_10_0100_066_1_0| Spreizung | 1 |  |
| 00_0010_2271_10_0100_067_1_0| Frostschutz | 1 |  |
| 00_0010_2271_10_0100_068_1_1| Kollektorkühlung | 1 |  |
| 00_0010_2271_10_0100_069_1_1| Speichermaximaltemperatur | 1 |  |
| 00_0010_2271_10_0100_070_1_1| Neustarts | 1 |  |
| 00_0010_2271_10_0100_072_4_0| Fehlermaske | 1 |  |
| 00_0010_2271_10_0100_072_1_1| Fehler: Sensorfehler | 1 |  |



### <a name="0010_2272_0100"></a>DFA (0x0010) <= DeltaSol SLL \[WMZ1\] (0x2272), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2272_10_0100_000_4_0| Wert | 1 |  Wh |
| 00_0010_2272_10_0100_004_4_0| Leistung | 1 |  W |
| 00_0010_2272_10_0100_008_4_0| Wert heute | 1 |  Wh |
| 00_0010_2272_10_0100_012_4_0| Wert Woche | 1 |  Wh |



### <a name="0010_2360_0100"></a>DFA (0x0010) <= HR Solar ADVANCED controller \[Regler\] (0x2360), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2360_10_0100_000_4_0| Systemdatum | 1 |  |
| 00_0010_2360_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_2360_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_2360_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_2360_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_2360_10_0100_012_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_2360_10_0100_014_2_0| Temperatur VFS/RPS \(S6\) | 0.1 |  °C |
| 00_0010_2360_10_0100_016_2_0| TAGE | 1 |  |
| 00_0010_2360_10_0100_020_4_0| Volumenstrom V40 | 1 |  l/h |
| 00_0010_2360_10_0100_024_4_0| Volumenstrom VFS \(S6\) | 1 |  l/h |
| 00_0010_2360_10_0100_028_4_0| Volumenstrom Flowrotor \(S7\) | 1 |  l/h |
| 00_0010_2360_10_0100_032_2_0| Druck RPS \(S6\) | 0.01 |  bar |
| 00_0010_2360_10_0100_034_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_2360_10_0100_035_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_2360_10_0100_036_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_2360_10_0100_037_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_2360_10_0100_038_1_0| PWM A | 1 | % |
| 00_0010_2360_10_0100_039_1_0| PWM B | 1 | % |
| 00_0010_2360_10_0100_040_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_2360_10_0100_044_2_0| SW-Version | 0.01 |  |
| 00_0010_2360_10_0100_048_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_2360_10_0100_052_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_2360_10_0100_056_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_2360_10_0100_060_4_0| Betriebssekunden Relais 4 | 1 |  s |
| 00_0010_2360_10_0100_064_1_1| Urlaubsfunktion | 1 |  |
| 00_0010_2360_10_0100_065_1_0| Blockierschutz 1 | 1 | % |
| 00_0010_2360_10_0100_066_1_0| Blockierschutz 2 | 1 | % |
| 00_0010_2360_10_0100_067_1_0| Blockierschutz 3 | 1 | % |
| 00_0010_2360_10_0100_068_4_0| Initalisieren | 1 |  |
| 00_0010_2360_10_0100_072_4_0| Befüllung | 1 |  |
| 00_0010_2360_10_0100_076_4_0| Stabilisieren | 1 |  |
| 00_0010_2360_10_0100_080_1_0| Pumpenverzögerung | 1 |  |
| 00_0010_2360_10_0100_081_1_1| Überwärmeabfuhr | 1 |  |
| 00_0010_2360_10_0100_082_1_0| Nachlauf | 1 |  |
| 00_0010_2360_10_0100_083_1_0| Thermische Desinfektion | 1 |  |
| 00_0010_2360_10_0100_084_1_1| Speicherkühlung | 1 |  |
| 00_0010_2360_10_0100_085_1_1| Systemkühlung | 1 |  |
| 00_0010_2360_10_0100_086_1_0| Spreizung | 1 |  |
| 00_0010_2360_10_0100_087_1_0| Frostschutz | 1 |  |
| 00_0010_2360_10_0100_088_1_1| Kollektorkühlung | 1 |  |
| 00_0010_2360_10_0100_089_1_1| Einheit Temperatur | 1 |  |
| 00_0010_2360_10_0100_090_1_1| Einheit Durchfluss | 1 |  |
| 00_0010_2360_10_0100_091_1_1| Einheit Druck | 1 |  |
| 00_0010_2360_10_0100_092_1_1| Einheit Leistung | 1 |  |
| 00_0010_2360_10_0100_093_1_1| Einheit Energie | 1 |  |
| 00_0010_2360_10_0100_094_1_1| Speichermaximaltemperatur | 1 |  |
| 00_0010_2360_10_0100_095_1_1| Neustarts | 1 |  |
| 00_0010_2360_10_0100_096_4_0| Fehlermaske | 1 |  |
| 00_0010_2360_10_0100_100_4_0| WAMA \(Counter\) | 1 |  |
| 00_0010_2360_10_0100_104_2_0| TWAMA | 0.1 |  °C |



### <a name="0010_2362_0100"></a>DFA (0x0010) <= HR Solar ADVANCED controller \[WMZ 1\] (0x2362), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_2362_10_0100_000_4_0| Wmz1_Wert_Wh | 1 |  Wh |
| 00_0010_2362_10_0100_004_4_0| Wmz1_Leistung_W | 1 |  W |
| 00_0010_2362_10_0100_008_4_0| Wmz1_WertHeute_Wh | 1 |  Wh |
| 00_0010_2362_10_0100_012_4_0| Wmz1_WertWoche_Wh | 1 |  Wh |



### <a name="0010_3011_0100"></a>DFA (0x0010) <= WMZ-L10 (0x3011), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3011_10_0100_000_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_3011_10_0100_002_2_0| Rücklauftemperatur | 0.1 |  °C |
| 00_0010_3011_10_0100_004_2_0| Strömungsgeschwindigkeit | 0.01 |  m/s |
| 00_0010_3011_10_0100_012_4_0| Luftstrom-Volumen | 1 |  m³/h |
| 00_0010_3011_10_0100_016_4_0| Luftstrom-Masse | 1 |  kg/h |
| 00_0010_3011_10_0100_010_2_0| Luftkanal-Querschnitt | 0.01 |  m² |
| 00_0010_3011_10_0100_020_2_0| Luftdichte | 0.0001 |  kg/m³ |
| 00_0010_3011_10_0100_024_2_0| Luftdruck | 1 |  hPa |
| 00_0010_3011_10_0100_022_2_0| Leistung | 0.1 |  kW |
| 00_0010_3011_10_0100_028_2_0| Wärmemenge kWh | 1 |  kWh |
| 00_0010_3011_10_0100_030_2_0| Wärmemenge MWh | 1 |  kWh |
| 00_0010_3011_10_0100_006_2_0| Betriebstage | 1 |  |



### <a name="0010_3112_0100"></a>DFA (0x0010) <= Remeha RemaSol A (0x3112), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3112_10_0100_000_2_0| Kollektor-Temperatur \(TC\) | 0.1 |  °C |
| 00_0010_3112_10_0100_002_2_0| Speicher-Temperatur \(TS\) | 0.1 |  °C |
| 00_0010_3112_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_3112_10_0100_008_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_3112_10_0100_012_1_0| Pumpendrehzahl \(PC\) | 1 | % |
| 00_0010_3112_10_0100_014_2_0| Steuerungszeit \(tc\) | 1 | % |
| 00_0010_3112_10_0100_016_2_0| Softwareversion | 0.01 |  |
| 00_0010_3112_10_0100_020_2_0| Systemzeit | 1 |  |
| 00_0010_3112_10_0100_022_2_0| Timer | 1 |  |



### <a name="0010_3113_0100"></a>DFA (0x0010) <= DeDietrich Diemasol Ai v2 (0x3113), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3113_10_0100_000_2_0| Kollektor-Temperatur \(TC\) | 0.1 |  °C |
| 00_0010_3113_10_0100_002_2_0| Speicher-Temperatur \(TS\) | 0.1 |  °C |
| 00_0010_3113_10_0100_008_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_3113_10_0100_012_1_0| Pumpendrehzahl \(PC\) | 1 | % |
| 00_0010_3113_10_0100_014_2_0| Steuerungszeit \(tc\) | 1 | % |
| 00_0010_3113_10_0100_016_2_0| Softwareversion | 0.01 |  |



### <a name="0010_3114_0100"></a>DFA (0x0010) <= DeDietrich Sol Plus Trio (0x3114), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3114_10_0100_000_2_0| Kollektor-Temperatur \(TC\) | 0.1 |  °C |
| 00_0010_3114_10_0100_002_2_0| Speicher-Temperatur \(TS\) | 0.1 |  °C |
| 00_0010_3114_10_0100_004_2_0| Heizungsrücklauf-Temperatur \(TR\) | 0.1 |  °C |
| 00_0010_3114_10_0100_006_2_0| Messfühler-Temperatur \(TM\) | 0.1 |  °C |
| 00_0010_3114_10_0100_008_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_3114_10_0100_012_1_0| Pumpendrehzahl \(PC\) | 1 | % |
| 00_0010_3114_10_0100_013_1_0| Ventil \(R2\) | 1 | % |
| 00_0010_3114_10_0100_014_2_0| Steuerungszeit \(tc\) | 1 | % |
| 00_0010_3114_10_0100_016_2_0| Softwareversion | 0.01 |  |



### <a name="0010_3211_0100"></a>DFA (0x0010) <= EL1 (0x3211), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3211_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_3211_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_3211_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_3211_10_0100_006_1_0| Drehzahl R1 | 1 | % |
| 00_0010_3211_10_0100_007_1_0| Fehlercode | 1 |  |
| 00_0010_3211_10_0100_008_2_0| Pumpenlaufzeit R1 | 1 |  h |
| 00_0010_3211_10_0100_010_1_0| Ladestatus | 1 |  |
| 00_0010_3211_10_0100_011_1_0| Flags | 1 |  |



### <a name="0010_3221_0100"></a>DFA (0x0010) <= DeltaSol Pro (0x3221), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3221_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_3221_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_3221_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_3221_10_0100_006_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_3221_10_0100_007_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_3221_10_0100_008_2_0| Regelflags | 1 |  |
| 00_0010_3221_10_0100_010_1_0| Fehlermaske | 1 |  |
| 00_0010_3221_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_3221_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |



### <a name="0010_3231_0100"></a>DFA (0x0010) <= DeltaSol B (0x3231), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3231_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_3231_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_3231_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_3231_10_0100_006_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_3231_10_0100_007_1_0| Fehlermaske | 1 |  |
| 00_0010_3231_10_0100_008_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_3231_10_0100_010_1_0| Relaismaske | 1 |  |
| 00_0010_3231_10_0100_010_1_1| Relaisstatus Relais 1 | 1 |  |
| 00_0010_3231_10_0100_010_1_2| Relaisstatus Relais 2 | 1 |  |



### <a name="0010_3241_0100"></a>DFA (0x0010) <= DT4 \(B\) (0x3241), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3241_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_3241_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_3241_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_3241_10_0100_006_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_3241_10_0100_007_1_0| Fehlermaske | 1 |  |
| 00_0010_3241_10_0100_010_1_0| Relaismaske | 1 |  |



### <a name="0010_3251_0100"></a>DFA (0x0010) <= DeltaSol BS (0x3251), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3251_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_3251_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_3251_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_3251_10_0100_006_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_3251_10_0100_007_1_0| Fehlermaske | 1 |  |
| 00_0010_3251_10_0100_008_2_0| Betriebsstunden Relais 1 | 1 |  h |



### <a name="0010_3271_0100"></a>DFA (0x0010) <= ConergyDT5 (0x3271), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3271_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_3271_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_3271_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_3271_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_3271_10_0100_008_1_0| Drehzahl Pumpe 1 | 1 | % |
| 00_0010_3271_10_0100_009_1_0| Drehzahl Pumpe 2 | 1 | % |
| 00_0010_3271_10_0100_010_1_0| Relaismaske | 1 |  |
| 00_0010_3271_10_0100_011_1_0| Fehlermaske | 1 |  |
| 00_0010_3271_10_0100_012_2_0| Systemzeit | 1 |  |
| 00_0010_3271_10_0100_014_1_0| Schema | 1 |  |
| 00_0010_3271_10_0100_015_1_1| Option PostPulse | 1 |  |
| 00_0010_3271_10_0100_015_1_2| Option Thermostat | 1 |  |
| 00_0010_3271_10_0100_015_1_4| Option WMZ | 1 |  |
| 00_0010_3271_10_0100_016_2_0| Betriebsstunden Relais 1 | 1 |  |
| 00_0010_3271_10_0100_018_2_0| Betriebsstunden Relais 2 | 1 |  |
| 00_0010_3271_10_0100_020_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_3271_10_0100_026_2_0| Version | 0.01 |  |



### <a name="0010_3311_0100"></a>DFA (0x0010) <= Diemasol C (0x3311), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_3311_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_3311_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_3311_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_3311_10_0100_006_2_0| Temperatur Sensor 4 \(>= v1.02\) | 0.1 |  °C |
| 00_0010_3311_10_0100_008_2_0| Drehzahl Relais 1 \(<= v1.01\) | 0.1 | % |
| 00_0010_3311_10_0100_010_2_0| Drehzahl Relais 2 \(<= v1.01\) | 0.1 | % |
| 00_0010_3311_10_0100_008_1_0| Drehzahl Relais 1 \(>= v1.02\) | 1 | % |
| 00_0010_3311_10_0100_009_1_0| Drehzahl Relais 2 \(>= v1.02\) | 1 | % |
| 00_0010_3311_10_0100_010_1_0| Fehlermaske \(>= v1.02\) | 1 |  |
| 00_0010_3311_10_0100_011_1_0| Relaismaske \(>= v1.02\) | 1 |  |
| 00_0010_3311_10_0100_006_2_0_1| Wärmemenge \(<= v1.01\) | 1 |  kWh |
| 00_0010_3311_10_0100_012_2_0| Wärmemenge \(>= v1.02\) | 1 |  kWh |



### <a name="0010_4111_0100"></a>DFA (0x0010) <= DeltaSol AL (0x4111), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4111_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4111_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4111_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4111_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_4111_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4111_10_0100_010_2_0| Anzeige-Status | 1 |  |
| 00_0010_4111_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4111_10_0100_016_4_0| Wärmemenge | 1 |  Wh |



### <a name="0010_4211_0100"></a>DFA (0x0010) <= SKSC1/2 (0x4211), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4211_10_0100_000_2_0| Temperatur S1 | 0.1 |  °C |
| 00_0010_4211_10_0100_002_2_0| Temperatur S2 | 0.1 |  °C |
| 00_0010_4211_10_0100_004_2_0| Temperatur S3 | 0.1 |  °C |
| 00_0010_4211_10_0100_006_2_0| Temperatur S4 | 0.1 |  °C |
| 00_0010_4211_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4211_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4211_10_0100_010_1_0| Fehlermaske | 1 |  |
| 00_0010_4211_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4211_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_4211_10_0100_016_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_4212_0100"></a>DFA (0x0010) <= DeltaSol C (0x4212), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4212_10_0100_000_2_0| Temperatur S1 | 0.1 |  °C |
| 00_0010_4212_10_0100_002_2_0| Temperatur S2 | 0.1 |  °C |
| 00_0010_4212_10_0100_004_2_0| Temperatur S3 | 0.1 |  °C |
| 00_0010_4212_10_0100_006_2_0| Temperatur S4 | 0.1 |  °C |
| 00_0010_4212_10_0100_008_1_0| Drehzahl R1 | 1 | % |
| 00_0010_4212_10_0100_009_1_0| Drehzahl R2 | 1 | % |
| 00_0010_4212_10_0100_010_1_0| Fehlermaske | 1 |  |
| 00_0010_4212_10_0100_011_1_0| Variante | 1 |  |
| 00_0010_4212_10_0100_012_2_0| Betriebsstunden R1 | 1 |  h |
| 00_0010_4212_10_0100_014_2_0| Betriebsstunden R2 | 1 |  h |
| 00_0010_4212_10_0100_016_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_4212_10_0100_022_2_0| Systemzeit | 1 |  |



### <a name="0010_4213_0100"></a>DFA (0x0010) <= SKSC2 HE \[Regler\] (0x4213), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4213_10_0100_000_2_0| Temperatur S1 | 0.1 |  °C |
| 00_0010_4213_10_0100_002_2_0| Temperatur S2 | 0.1 |  °C |
| 00_0010_4213_10_0100_004_2_0| Temperatur S3 | 0.1 |  °C |
| 00_0010_4213_10_0100_006_2_0| Temperatur S4 | 0.1 |  °C |
| 00_0010_4213_10_0100_024_2_0| Temperatur VFD1 | 0.1 |  °C |
| 00_0010_4213_10_0100_026_2_0| Volumenstrom VFD1 | 1 |  l/h |
| 00_0010_4213_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4213_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4213_10_0100_032_1_0| Spannung 10V | 0.1 |  V |
| 00_0010_4213_10_0100_010_1_0| Fehlermaske | 1 |  |
| 00_0010_4213_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4213_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_4213_10_0100_016_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_4214_0100"></a>DFA (0x0010) <= SKSC2 HE \[Regler\] (0x4214), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4214_10_0100_000_2_0| Temperatur S1 | 0.1 |  °C |
| 00_0010_4214_10_0100_002_2_0| Temperatur S2 | 0.1 |  °C |
| 00_0010_4214_10_0100_004_2_0| Temperatur S3 | 0.1 |  °C |
| 00_0010_4214_10_0100_006_2_0| Temperatur S4 | 0.1 |  °C |
| 00_0010_4214_10_0100_024_2_0| Temperatur VFD1 | 0.1 |  °C |
| 00_0010_4214_10_0100_026_2_0| Volumenstrom VFD1 | 1 |  l/h |
| 00_0010_4214_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4214_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4214_10_0100_032_1_0| Spannung 10V | 0.1 |  V |
| 00_0010_4214_10_0100_010_1_0| Fehlermaske | 1 |  |
| 00_0010_4214_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4214_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_4214_10_0100_016_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_4221_0100"></a>DFA (0x0010) <= DeltaSol BS Plus (0x4221), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4221_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4221_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4221_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4221_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_4221_10_0100_008_1_0| Drehzahl Pumpe 1 | 1 | % |
| 00_0010_4221_10_0100_009_1_0| Drehzahl Pumpe 2 | 1 | % |
| 00_0010_4221_10_0100_010_1_0| Relaismaske | 1 |  |
| 00_0010_4221_10_0100_011_1_0| Fehlermaske | 1 |  |
| 00_0010_4221_10_0100_012_2_0| Systemzeit | 1 |  |
| 00_0010_4221_10_0100_014_1_0| Schema | 1 |  |
| 00_0010_4221_10_0100_015_1_1| Option Kollektor Max. | 1 |  |
| 00_0010_4221_10_0100_015_1_2| Option Kollektor Min. | 1 |  |
| 00_0010_4221_10_0100_015_1_4| Option Kollektor Frost | 1 |  |
| 00_0010_4221_10_0100_015_1_8| Option Röhrenkollektor | 1 |  |
| 00_0010_4221_10_0100_015_1_16| Option Rückkühlung | 1 |  |
| 00_0010_4221_10_0100_015_1_32| Option WMZ | 1 |  |
| 00_0010_4221_10_0100_016_2_0| Betriebsstunden Relais 1 | 1 |  |
| 00_0010_4221_10_0100_018_2_0| Betriebsstunden Relais 2 | 1 |  |
| 00_0010_4221_10_0100_020_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_4221_10_0100_026_2_0| Version | 0.01 |  |



### <a name="0010_4223_0100"></a>DFA (0x0010) <= DeltaSol BS Plus BTU (0x4223), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4223_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °F |
| 00_0010_4223_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °F |
| 00_0010_4223_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °F |
| 00_0010_4223_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °F |
| 00_0010_4223_10_0100_008_1_0| Drehzahl Pumpe 1 | 1 | % |
| 00_0010_4223_10_0100_009_1_0| Drehzahl Pumpe 2 | 1 | % |
| 00_0010_4223_10_0100_010_1_0| Relaismaske | 1 |  |
| 00_0010_4223_10_0100_011_1_0| Fehlermaske | 1 |  |
| 00_0010_4223_10_0100_012_2_0| Systemzeit | 1 |  |
| 00_0010_4223_10_0100_014_1_0| Schema | 1 |  |
| 00_0010_4223_10_0100_015_1_1| Option Kollektor Max. | 1 |  |
| 00_0010_4223_10_0100_015_1_2| Option Kollektor Min. | 1 |  |
| 00_0010_4223_10_0100_015_1_4| Option Kollektor Frost | 1 |  |
| 00_0010_4223_10_0100_015_1_8| Option Röhrenkollektor | 1 |  |
| 00_0010_4223_10_0100_015_1_16| Option Rückkühlung | 1 |  |
| 00_0010_4223_10_0100_015_1_32| Option WMZ | 1 |  |
| 00_0010_4223_10_0100_016_2_0| Betriebsstunden Relais 1 | 1 |  |
| 00_0010_4223_10_0100_018_2_0| Betriebsstunden Relais 2 | 1 |  |
| 00_0010_4223_10_0100_020_2_0| Wärmemenge | 1 |  BTU |
| 00_0010_4223_10_0100_026_2_0| Version | 0.01 |  |



### <a name="0010_4224_0100"></a>DFA (0x0010) <= CS2.2 (0x4224), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4224_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4224_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4224_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4224_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_4224_10_0100_008_1_0| Drehzahl Pumpe 1 | 1 | % |
| 00_0010_4224_10_0100_009_1_0| Drehzahl Pumpe 2 | 1 | % |
| 00_0010_4224_10_0100_010_1_0| Relaismaske | 1 |  |
| 00_0010_4224_10_0100_011_1_0| Fehlermaske | 1 |  |
| 00_0010_4224_10_0100_012_2_0| Systemzeit | 1 |  |
| 00_0010_4224_10_0100_014_1_0| Schema | 1 |  |
| 00_0010_4224_10_0100_015_1_1| Option Kollektor Max. | 1 |  |
| 00_0010_4224_10_0100_015_1_2| Option Kollektor Min. | 1 |  |
| 00_0010_4224_10_0100_015_1_4| Option Kollektor Frost | 1 |  |
| 00_0010_4224_10_0100_015_1_8| Option Röhrenkollektor | 1 |  |
| 00_0010_4224_10_0100_015_1_16| Option Rückkühlung | 1 |  |
| 00_0010_4224_10_0100_015_1_32| Option WMZ | 1 |  |
| 00_0010_4224_10_0100_016_2_0| Betriebsstunden Relais 1 | 1 |  |
| 00_0010_4224_10_0100_018_2_0| Betriebsstunden Relais 2 | 1 |  |
| 00_0010_4224_10_0100_020_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_4224_10_0100_026_2_0| Version | 0.01 |  |



### <a name="0010_4231_0100"></a>DFA (0x0010) <= Frista (0x4231), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4231_10_0100_000_2_0| Temperatur Warmwasser | 0.1 |  °C |
| 00_0010_4231_10_0100_002_2_0| Temperatur Kaltwasser | 0.1 |  °C |
| 00_0010_4231_10_0100_004_2_0| Temperatur Zirkulation | 0.1 |  °C |
| 00_0010_4231_10_0100_006_2_0| Volumenstrom | 0.1 |  l/min |
| 00_0010_4231_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4231_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4231_10_0100_010_2_0| Systemzeit | 1 |  |
| 00_0010_4231_10_0100_012_1_0| Optionen | 1 |  |
| 00_0010_4231_10_0100_013_1_0| Status | 1 |  |
| 00_0010_4231_10_0100_014_1_0| Relaisstatus | 1 |  |
| 00_0010_4231_10_0100_015_1_0| SensorDefekt | 1 |  |
| 00_0010_4231_10_0100_016_1_0| Temperatur WW-Soll | 1 |  °C |
| 00_0010_4231_10_0100_017_1_0| Temperatur Quelle | 1 |  °C |
| 00_0010_4231_10_0100_019_1_0| verbl. Zapfung | 1 |  min |
| 00_0010_4231_10_0100_020_4_0| Schaltspiele | 1 |  |
| 00_0010_4231_10_0100_024_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_4231_10_0100_030_1_0| Version | 0.01 |  |
| 00_0010_4231_10_0100_032_2_0| max. Temperatur Kaltwasser | 0.1 |  °C |
| 00_0010_4231_10_0100_034_2_0| min. Temperatur Kaltwasser | 0.1 |  °C |
| 00_0010_4231_10_0100_036_2_0| max. Volumenstrom | 1 |  l/h |
| 00_0010_4231_10_0100_038_2_0| Zapfmenge | 0.1 |  m³ |



### <a name="0010_4241_0100"></a>DFA (0x0010) <= Huber - REGLOfresh / Felix \[Regler\] (0x4241), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4241_10_0100_000_2_0| Temperatur Warmwasser \(Anzeige\) | 0.1 |  °C |
| 00_0010_4241_10_0100_002_2_0| Temperatur Kaltwasser | 0.1 |  °C |
| 00_0010_4241_10_0100_004_2_0| Temperatur Puffer | 0.1 |  °C |
| 00_0010_4241_10_0100_006_2_0| Volumenstrom | 0.01 |  l/h |
| 00_0010_4241_10_0100_008_1_0| Drehzahl1 | 1 | % |
| 00_0010_4241_10_0100_009_1_0| Drehzahl2 | 1 | % |
| 00_0010_4241_10_0100_010_2_0| Systemzeit | 1 |  |
| 00_0010_4241_10_0100_012_1_1| Option Zirkulation aktiv | 1 |  |
| 00_0010_4241_10_0100_012_1_2| Option Notbetrieb aktiv | 1 |  |
| 00_0010_4241_10_0100_013_1_1| Zapfung aktiv | 1 |  |
| 00_0010_4241_10_0100_013_1_2| Frischwasserbereitung aktiv | 1 |  |
| 00_0010_4241_10_0100_013_1_4| Handbetrieb aktiv | 1 |  |
| 00_0010_4241_10_0100_013_1_8| Notbetrieb aktiv | 1 |  |
| 00_0010_4241_10_0100_013_1_16| Blockierschutz aktiv | 1 |  |
| 00_0010_4241_10_0100_013_1_32| Zirkulation aktiv | 1 |  |
| 00_0010_4241_10_0100_013_1_64| Überhitzung aktiv | 1 |  |
| 00_0010_4241_10_0100_013_1_128| Zapfungsimpuls aktiv | 1 |  |
| 00_0010_4241_10_0100_014_1_1| Relais 1 | 1 |  |
| 00_0010_4241_10_0100_014_1_2| Relais 2 | 1 |  |
| 00_0010_4241_10_0100_015_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_4241_10_0100_015_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_4241_10_0100_015_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_4241_10_0100_015_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_4241_10_0100_016_1_0| Warmwassersolltemperatur | 1 |  °C |
| 00_0010_4241_10_0100_017_1_0| Temperatur Mischer | 1 |  °C |
| 00_0010_4241_10_0100_018_1_0| dT Puffer | 0.1 |  K |
| 00_0010_4241_10_0100_019_1_0| Verbleibende Zirkulationsdauer | 1 |  min |
| 00_0010_4241_10_0100_020_4_0| Anzahl Schaltspiele | 1 |  |
| 00_0010_4241_10_0100_024_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_4241_10_0100_030_1_0| Softwareversion major | 1 |  |
| 00_0010_4241_10_0100_031_1_0| Softwareversion minor | 1 |  |
| 00_0010_4241_10_0100_032_2_0| Temperatur max. Kaltwasser | 0.1 |  °C |
| 00_0010_4241_10_0100_034_2_0| Temperatur min. Kaltwasser | 0.1 |  °C |
| 00_0010_4241_10_0100_036_2_0| Volumenstrom max. | 1 |  l/h |
| 00_0010_4241_10_0100_038_2_0| Zapfmenge max. | 1 |  m³ |
| 00_0010_4241_10_0100_040_2_0| Temperatur Warmwasser \(Regel\) | 0.1 |  °C |
| 00_0010_4241_10_0100_042_2_0| Temperatur Quelle \(Regel\) | 0.1 |  °C |
| 00_0010_4241_10_0100_044_1_0| Interner Wert | 1 |  |
| 00_0010_4241_10_0100_045_1_0| Interner Wert | 1 |  |
| 00_0010_4241_10_0100_046_1_0| Interner Wert | 1 |  |
| 00_0010_4241_10_0100_047_1_0| Interner Wert | 1 |  |
| 00_0010_4241_10_0100_048_2_0| Interner Wert | 1 |  |
| 00_0010_4241_10_0100_050_2_0| Interner Wert | 1 |  |



### <a name="0010_4251_0100"></a>DFA (0x0010) <= DSPlus UMSYS \[Regler\] (0x4251), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4251_10_0100_000_2_0| Absorbertemperatur \(S1\) | 0.1 |  °C |
| 00_0010_4251_10_0100_002_2_0| Temperatur hinter Wärmepumpe \(S2\) | 0.1 |  °C |
| 00_0010_4251_10_0100_004_2_0| Temperatur hinter Erdspeicher \(S3\) | 0.1 |  °C |
| 00_0010_4251_10_0100_006_2_0| Ann. Temperatur Erdspeicher | 0.1 |  °C |
| 00_0010_4251_10_0100_008_2_0| Temperatur hinter Pumpe 1 \(S4\) | 0.1 |  °C |
| 00_0010_4251_10_0100_010_2_0| Systemzeit | 1 |  |
| 00_0010_4251_10_0100_012_2_0| Einschalttemperaturdifferenz | 0.1 |  K |
| 00_0010_4251_10_0100_014_2_0| Ausschalttemperaturdifferenz | 0.1 |  K |
| 00_0010_4251_10_0100_016_2_0| dT Wärmepumpe an | 0.1 |  K |
| 00_0010_4251_10_0100_018_2_0| dT Wärmepumpe aus | 0.1 |  K |
| 00_0010_4251_10_0100_020_2_0| Erdspeicher Maximaltemperatur | 0.1 |  °C |
| 00_0010_4251_10_0100_022_1_1| S1 defekt | 1 |  |
| 00_0010_4251_10_0100_022_1_2| S2 defekt | 1 |  |
| 00_0010_4251_10_0100_022_1_4| S3 defekt | 1 |  |
| 00_0010_4251_10_0100_022_1_8| S4 defekt | 1 |  |
| 00_0010_4251_10_0100_022_1_16| dT ausreichend | 1 |  |
| 00_0010_4251_10_0100_022_1_32| Wärmepumpe an | 1 |  |
| 00_0010_4251_10_0100_022_1_64| Erdspeicher voll | 1 |  |
| 00_0010_4251_10_0100_022_1_128| Relais 1 an | 1 |  |
| 00_0010_4251_10_0100_022_1_256| Relais 2 an | 1 |  |
| 00_0010_4251_10_0100_024_2_0| Version | 0.01 |  |



### <a name="0010_4252_0100"></a>DFA (0x0010) <= BS Solex US (0x4252), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4252_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4252_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4252_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4252_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_4252_10_0100_008_1_0| Einheit | 1 |  |
| 00_0010_4252_10_0100_010_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4252_10_0100_011_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4252_10_0100_012_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_4252_10_0100_016_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_4252_10_0100_020_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_4252_10_0100_020_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_4252_10_0100_020_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_4252_10_0100_020_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_4252_10_0100_022_1_1| Kollektor-Nottemperatur | 1 |  |
| 00_0010_4252_10_0100_022_1_2| Kollektor-Minimaltemperatur | 1 |  |
| 00_0010_4252_10_0100_022_1_4| Wärmetauscher Nottemperatur | 1 |  |
| 00_0010_4252_10_0100_022_1_8| Speichernottemperatur | 1 |  |
| 00_0010_4252_10_0100_022_1_16| Speicher leer | 1 |  |
| 00_0010_4252_10_0100_022_1_32| Speichermaximaltemperatur | 1 |  |
| 00_0010_4252_10_0100_022_1_64| Kollektor-Frostschutz | 1 |  |
| 00_0010_4252_10_0100_022_1_128| Wärmetauscher Frostschutz | 1 |  |
| 00_0010_4252_10_0100_023_1_1| Röhrenkollektor | 1 |  |
| 00_0010_4252_10_0100_023_1_2| Beladung | 1 |  |
| 00_0010_4252_10_0100_023_1_4| R1 - Handbetrieb | 1 |  |
| 00_0010_4252_10_0100_023_1_8| R2 - Handbetrieb | 1 |  |
| 00_0010_4252_10_0100_024_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_4252_10_0100_028_2_0| Uhrzeit | 1 |  |
| 00_0010_4252_10_0100_030_2_0| Version | 0.01 |  |



### <a name="0010_4261_0100"></a>DFA (0x0010) <= DeltaSol E SorTech \[Regler\] (0x4261), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4261_10_0100_000_2_0| T LT OUT: | 0.1 |  °C |
| 00_0010_4261_10_0100_012_2_0| T LT IN: | 0.1 |  °C |
| 00_0010_4261_10_0100_002_2_0| T MT OUT: | 0.1 |  °C |
| 00_0010_4261_10_0100_004_2_0| T A1 OUT: | 0.1 |  °C |
| 00_0010_4261_10_0100_006_2_0| T A2 OUT: | 0.1 |  °C |
| 00_0010_4261_10_0100_008_2_0| T HT Ext: | 0.1 |  °C |
| 00_0010_4261_10_0100_010_2_0| T LT Ext: | 0.1 |  °C |
| 00_0010_4261_10_0100_014_1_1| Anlage: | 1 |  |
| 00_0010_4261_10_0100_014_1_2| Heizmodus: | 1 |  |
| 00_0010_4261_10_0100_014_1_4| Strömungswächter LT-Kreis: | 1 |  |
| 00_0010_4261_10_0100_014_1_8| HV_A1_IN: | 1 |  |
| 00_0010_4261_10_0100_014_1_16| HV_A2_IN: | 1 |  |
| 00_0010_4261_10_0100_014_1_32| HV_OUT: | 1 |  |
| 00_0010_4261_10_0100_014_1_64| Melderelais | 1 |  |
| 00_0010_4261_10_0100_015_1_0| RCS %: | 1 | % |
| 00_0010_4261_10_0100_016_1_0| Pumpenrelais: | 1 | % |
| 00_0010_4261_10_0100_017_1_0| SPR Relais: | 1 | % |
| 00_0010_4261_10_0100_018_1_0| Phase: | 1 |  |
| 00_0010_4261_10_0100_019_1_0| Systemcode: | 1 |  |
| 00_0010_4261_10_0100_022_2_0| W Soll: | 1 |  Hz |
| 00_0010_4261_10_0100_024_2_0| T LTS OUT AVG | 0.1 |  °C |
| 00_0010_4261_10_0100_052_2_0| T LT OUT Cycle | 0.1 |  °C |
| 00_0010_4261_10_0100_048_2_0| T LT IN AVG | 0.1 |  °C |
| 00_0010_4261_10_0100_050_2_0| T LT IN Cycle | 0.1 |  °C |
| 00_0010_4261_10_0100_026_2_0| T MT OUT AVG | 0.1 |  °C |
| 00_0010_4261_10_0100_054_2_0| T MT OUT Cycle | 0.1 |  °C |
| 00_0010_4261_10_0100_056_2_0| dQ LT Cycle | 0.1 |  kW |
| 00_0010_4261_10_0100_058_2_0| dV LT | 1 |  l/h |
| 00_0010_4261_10_0100_052_2_0_1| Aktuellen Sollwert: | 0.1 |  °C |
| 00_0010_4261_10_0100_030_2_0| Externe Solltemperatur: | 0.1 |  °C |
| 00_0010_4261_10_0100_032_4_0| Anzahl Zyklen: | 1 |  |
| 00_0010_4261_10_0100_036_4_0| Aufsummierte Besprühungzeit: | 1 |  |
| 00_0010_4261_10_0100_040_2_0| Systemzeit: | 1 |  |
| 00_0010_4261_10_0100_042_2_0| Jahr: | 1 |  |
| 00_0010_4261_10_0100_044_1_0| Monat: | 1 |  |
| 00_0010_4261_10_0100_045_1_0| Tag: | 1 |  |
| 00_0010_4261_10_0100_046_1_0| Kern: | 0.01 |  |



### <a name="0010_4265_0100"></a>DFA (0x0010) <= Aton DeltaSol BS (0x4265), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4265_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4265_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4265_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4265_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_4265_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4265_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4265_10_0100_010_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_4265_10_0100_010_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_4265_10_0100_010_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_4265_10_0100_010_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_4265_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4265_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_4265_10_0100_016_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_4265_10_0100_024_2_0| Version | 0.01 |  |



### <a name="0010_4278_0100"></a>DFA (0x0010) <= DeltaSol BS/DrainBack (0x4278), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4278_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4278_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4278_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4278_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_4278_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4278_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4278_10_0100_010_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_4278_10_0100_010_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_4278_10_0100_010_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_4278_10_0100_010_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_4278_10_0100_010_1_16| Speichernottemperatur | 1 |  |
| 00_0010_4278_10_0100_010_1_32| Kollektor-Nottemperatur | 1 |  |
| 00_0010_4278_10_0100_011_1_1| R1 - Handbetrieb | 1 |  |
| 00_0010_4278_10_0100_011_1_2| R2 - Handbetrieb | 1 |  |
| 00_0010_4278_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4278_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_4278_10_0100_016_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_4278_10_0100_022_1_0| Status | 1 |  |
| 00_0010_4278_10_0100_023_1_0| Programm | 1 |  |
| 00_0010_4278_10_0100_024_2_0| Version | 0.01 |  |



### <a name="0010_4279_0100"></a>DFA (0x0010) <= DeltaSol BS/DrainBack \(Fahrenheit\) (0x4279), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4279_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °F |
| 00_0010_4279_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °F |
| 00_0010_4279_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °F |
| 00_0010_4279_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °F |
| 00_0010_4279_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4279_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4279_10_0100_010_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_4279_10_0100_010_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_4279_10_0100_010_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_4279_10_0100_010_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_4279_10_0100_010_1_16| Speichernottemperatur | 1 |  |
| 00_0010_4279_10_0100_010_1_32| Kollektor-Nottemperatur | 1 |  |
| 00_0010_4279_10_0100_011_1_1| R1 - Handbetrieb | 1 |  |
| 00_0010_4279_10_0100_011_1_2| R2 - Handbetrieb | 1 |  |
| 00_0010_4279_10_0100_012_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4279_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_4279_10_0100_016_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_4279_10_0100_022_1_0| Status | 1 |  |
| 00_0010_4279_10_0100_023_1_0| Programm | 1 |  |
| 00_0010_4279_10_0100_024_2_0| Version | 0.01 |  |



### <a name="0010_427B_0100"></a>DFA (0x0010) <= DeltaSol BS 2009 (0x427B), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_427B_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_427B_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_427B_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_427B_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_427B_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_427B_10_0100_012_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_427B_10_0100_010_2_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_427B_10_0100_014_2_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_427B_10_0100_016_1_0| UnitType | 1 |  |
| 00_0010_427B_10_0100_017_1_0| System | 1 |  |
| 00_0010_427B_10_0100_020_2_0| ErrorMask | 1 |  |
| 00_0010_427B_10_0100_022_2_0| Systemzeit | 1 |  |
| 00_0010_427B_10_0100_020_1_1| Sensor 1 defekt | 1 |  |
| 00_0010_427B_10_0100_020_1_2| Sensor 2 defekt | 1 |  |
| 00_0010_427B_10_0100_020_1_4| Sensor 3 defekt | 1 |  |
| 00_0010_427B_10_0100_020_1_8| Sensor 4 defekt | 1 |  |
| 00_0010_427B_10_0100_024_4_0| Statusmask | 1 |  |
| 00_0010_427B_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_427B_10_0100_032_2_0| SW-Version | 0.01 |  |
| 00_0010_427B_10_0100_034_2_0| Variante | 1 |  |



### <a name="0010_4311_0100"></a>DFA (0x0010) <= DeDietrich DrainBack (0x4311), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4311_10_0100_000_2_0| TC | 0.1 |  °C |
| 00_0010_4311_10_0100_002_2_0| CD | 0.1 |  °C |
| 00_0010_4311_10_0100_004_2_0| CU | 0.1 |  °C |
| 00_0010_4311_10_0100_006_1_0| P1 | 1 | % |
| 00_0010_4311_10_0100_013_1_0| P1S | 1 |  |
| 00_0010_4311_10_0100_007_1_0| P2 | 1 | % |
| 00_0010_4311_10_0100_010_2_0| LS | 0.1 |  |
| 00_0010_4311_10_0100_012_1_0| Ph | 1 |  |
| 00_0010_4311_10_0100_016_4_0| kWh | 0.1 |  kWh |



### <a name="0010_4321_0100"></a>DFA (0x0010) <= DeltaSol MiniPool (0x4321), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4321_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4321_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4321_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4321_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_4321_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4321_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4321_10_0100_010_2_0| Systemzeit | 1 |  |
| 00_0010_4321_10_0100_012_1_0| Status-Info 1 | 1 |  |
| 00_0010_4321_10_0100_013_1_0| Status-Info 2 | 1 |  |
| 00_0010_4321_10_0100_014_2_0| Status-Restlaufzeit | 1 |  |
| 00_0010_4321_10_0100_016_3_0| Filterlaufzeit heute | 1 |  s |
| 00_0010_4321_10_0100_019_1_1| Regelstatus: Sensordefekt | 1 |  |
| 00_0010_4321_10_0100_019_1_2| Regelstatus: Solare Beladung aktiv | 1 |  |
| 00_0010_4321_10_0100_019_1_4| Regelstatus: FilterMinLaufzeit aktiv | 1 |  |
| 00_0010_4321_10_0100_019_1_8| Regelstatus: Umwälzung aktiv | 1 |  |
| 00_0010_4321_10_0100_019_1_16| Regelstatus: SolarFilterNachlauf aktiv | 1 |  |
| 00_0010_4321_10_0100_019_1_32| Regelstatus: Kühlung aktiv | 1 |  |
| 00_0010_4321_10_0100_019_1_64| Regelstatus: VLMax aktiv | 1 |  |
| 00_0010_4321_10_0100_024_4_0| Wärmemenge | 1 |  Wh |



### <a name="0010_4720_0100"></a>DFA (0x0010) <= DeltaSol BS/2 HE (0x4720), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4720_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4720_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4720_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4720_10_0100_016_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4720_10_0100_020_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_4720_10_0100_024_2_0| SW-Version | 0.01 |  |
| 00_0010_4720_10_0100_028_4_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4720_10_0100_068_4_0| Fehlermaske | 1 |  |



### <a name="0010_4721_0100"></a>DFA (0x0010) <= DeltaSol BS/2 HE \[WMZ\] (0x4721), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4721_10_0100_000_4_0| Wert | 1 |  Wh |
| 00_0010_4721_10_0100_004_4_0| Leistung | 1 |  W |
| 00_0010_4721_10_0100_008_4_0| Wert \(heute\) | 1 |  Wh |
| 00_0010_4721_10_0100_012_4_0| Wert \(Woche\) | 1 |  Wh |



### <a name="0010_4730_0100"></a>DFA (0x0010) <= DeltaSol BS/4 HE (0x4730), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4730_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_4730_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_4730_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_4730_10_0100_016_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_4730_10_0100_017_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_4730_10_0100_020_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_4730_10_0100_024_2_0| SW-Version | 0.01 |  |
| 00_0010_4730_10_0100_028_4_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_4730_10_0100_032_4_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_4730_10_0100_072_4_0| Fehlermaske | 1 |  |



### <a name="0010_4731_0100"></a>DFA (0x0010) <= DeltaSol BS/4 HE \[WMZ\] (0x4731), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4731_10_0100_000_4_0| Wert | 1 |  Wh |
| 00_0010_4731_10_0100_004_4_0| Leistung | 1 |  W |
| 00_0010_4731_10_0100_008_4_0| Wert \(heute\) | 1 |  Wh |
| 00_0010_4731_10_0100_012_4_0| Wert \(Woche\) | 1 |  Wh |



### <a name="0010_4A00_0100"></a>DFA (0x0010) <= Drainback DeDietrich (0x4A00), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_4A00_10_0100_000_2_0| TC | 0.1 |  °C |
| 00_0010_4A00_10_0100_002_2_0| CD | 0.1 |  °C |
| 00_0010_4A00_10_0100_004_2_0| CU | 0.1 |  °C |
| 00_0010_4A00_10_0100_006_1_0| P1 | 1 | % |
| 00_0010_4A00_10_0100_013_1_0| P1S | 1 |  |
| 00_0010_4A00_10_0100_007_1_0| P2 | 1 | % |
| 00_0010_4A00_10_0100_010_2_0| LS | 0.1 |  |
| 00_0010_4A00_10_0100_012_1_0| Ph | 1 |  |
| 00_0010_4A00_10_0100_016_4_0| kWh | 0.1 |  kWh |



### <a name="0010_5111_0100"></a>DFA (0x0010) <= DeltaSol D (0x5111), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5111_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5111_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5111_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5111_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5111_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_5111_10_0100_010_2_0| Systemdruck | 0.1 |  bar |
| 00_0010_5111_10_0100_012_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_5111_10_0100_014_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5111_10_0100_015_1_0| Systemmeldung | 1 |  |
| 00_0010_5111_10_0100_020_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_5111_10_0100_024_4_0| Datum | 1 |  |
| 00_0010_5111_10_0100_028_2_0| Uhrzeit | 1 |  |



### <a name="0010_5112_0100"></a>DFA (0x0010) <= Speicherofenregler (0x5112), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5112_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5112_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5112_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5112_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5112_10_0100_008_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_5112_10_0100_010_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5112_10_0100_011_1_0| Systemmeldung | 1 |  |
| 00_0010_5112_10_0100_012_4_0| Leistung | 0.001 |  kW |
| 00_0010_5112_10_0100_016_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_5112_10_0100_020_4_0| Datum | 1 |  |
| 00_0010_5112_10_0100_024_2_0| Uhrzeit | 1 |  |



### <a name="0010_5121_0100"></a>DFA (0x0010) <= FriwaMini (0x5121), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5121_10_0100_000_2_0| Kaltwassertemperatur | 0.1 |  °C |
| 00_0010_5121_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5121_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5121_10_0100_006_2_0| Sollwert | 0.01 |  °C |
| 00_0010_5121_10_0100_008_2_0| Ladetemperatur | 0.01 |  °C |
| 00_0010_5121_10_0100_010_2_0| Ladevolumenstrom | 0.01 |  l/min |
| 00_0010_5121_10_0100_012_2_0| Warmwassertemperatur | 0.01 |  °C |
| 00_0010_5121_10_0100_014_2_0| Zapfvolumenstrom | 0.01 |  l/min |
| 00_0010_5121_10_0100_016_1_0| PWM1 | 1 | % |
| 00_0010_5121_10_0100_017_1_0| Relais 1 | 1 | % |
| 00_0010_5121_10_0100_018_1_0| Status | 1 |  |
| 00_0010_5121_10_0100_019_1_0| Zapfung | 1 |  |
| 00_0010_5121_10_0100_020_4_0| Fehlermaske | 1 |  |
| 00_0010_5121_10_0100_024_4_0| Warnungsmaske | 1 |  |
| 00_0010_5121_10_0100_028_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_5121_10_0100_036_4_0| Zapfmenge | 0.1 |  |
| 00_0010_5121_10_0100_040_4_0| Datum | 1 |  |
| 00_0010_5121_10_0100_044_2_0| Systemzeit | 1 |  |
| 00_0010_5121_10_0100_046_2_0| Version | 0.01 |  |



### <a name="0010_5141_0100"></a>DFA (0x0010) <= Tuxhorn PKE (0x5141), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5141_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5141_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5141_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5141_10_0100_006_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5141_10_0100_007_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_5141_10_0100_008_1_0| Systemmeldung | 1 |  |
| 00_0010_5141_10_0100_010_2_0| Fehlermaske | 1 |  |
| 00_0010_5141_10_0100_012_4_0| Datum | 1 |  |
| 00_0010_5141_10_0100_016_2_0| Uhrzeit | 1 |  |



### <a name="0010_5210_0100"></a>DFA (0x0010) <= DeltaSol Plus (0x5210), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5210_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5210_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5210_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5210_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5210_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_5210_10_0100_010_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5210_10_0100_011_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_5210_10_0100_012_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_5210_10_0100_014_1_0| Frostschutzgehalt | 1 | % |
| 00_0010_5210_10_0100_015_1_0| Frostschutzart | 1 |  |
| 00_0010_5210_10_0100_016_2_0| Wärme | 1 |  Wh |
| 00_0010_5210_10_0100_022_1_0| Hardware | 1 |  |
| 00_0010_5210_10_0100_023_1_0| Software | 1 |  |
| 00_0010_5210_10_0100_024_1_0| Fehlermaske | 1 |  |
| 00_0010_5210_10_0100_025_1_0| Fehler-Info 1 | 1 |  |
| 00_0010_5210_10_0100_026_1_0| Fehler-Info 2 | 1 |  |
| 00_0010_5210_10_0100_027_1_0| Relaismaske | 1 |  |
| 00_0010_5210_10_0100_028_2_0| Systemzeit | 1 |  |



### <a name="0010_5221_0100"></a>DFA (0x0010) <= DT4 \(MS\) (0x5221), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5221_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5221_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5221_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5221_10_0100_006_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5221_10_0100_007_1_0| Fehlermaske | 1 |  |
| 00_0010_5221_10_0100_010_1_0| Relaismaske | 1 |  |
| 00_0010_5221_10_0100_012_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5221_10_0100_014_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_5221_10_0100_016_2_0| Volumenstrom | 0.1 |  l/min |
| 00_0010_5221_10_0100_018_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_5231_0100"></a>DFA (0x0010) <= nemux (0x5231), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5231_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5231_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5231_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5231_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5231_10_0100_008_2_0| Durchfluss Sensor 5 | 0.1 |  l/min |
| 00_0010_5231_10_0100_010_2_0| Drehzahl 1 | 0.1 | % |
| 00_0010_5231_10_0100_012_1_0| Drehzahl 2 | 1 | % |
| 00_0010_5231_10_0100_013_1_0| Fehlermaske | 1 |  |
| 00_0010_5231_10_0100_014_1_0| Warnungsmaske | 1 |  |
| 00_0010_5231_10_0100_015_1_0| Statusmaske | 1 |  |
| 00_0010_5231_10_0100_016_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_5231_10_0100_020_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_5231_10_0100_024_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_5231_10_0100_028_4_0| Zapfmenge | 0.001 |  m³ |
| 00_0010_5231_10_0100_032_4_0| Datum | 1 |  |
| 00_0010_5231_10_0100_036_2_0| Systemzeit | 1 |  |
| 00_0010_5231_10_0100_038_2_0| Version | 0.01 |  |



### <a name="0010_5251_0100"></a>DFA (0x0010) <= Frischwasserregler (0x5251), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5251_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5251_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5251_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5251_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5251_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_5251_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_5251_10_0100_022_2_0| Temperatur Sensor VFS/US | 0.1 |  °C |
| 00_0010_5251_10_0100_036_4_0| Durchfluss Sensor VFS/US | 1 |  l/h |
| 00_0010_5251_10_0100_049_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5251_10_0100_050_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_5251_10_0100_051_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_5251_10_0100_052_1_0| Drehzahl Relais pot.frei | 1 | % |
| 00_0010_5251_10_0100_056_1_0| Drehzahl Ausgang PWM 1 | 1 | % |
| 00_0010_5251_10_0100_057_1_0| Drehzahl Ausgang PWM 2 | 1 | % |
| 00_0010_5251_10_0100_064_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_5251_10_0100_068_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_5251_10_0100_072_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_5251_10_0100_076_4_0| Betriebssekunden Relais pot.frei | 1 |  s |
| 00_0010_5251_10_0100_080_4_0| Betriebssekunden Ausgang PWM 1 | 1 |  s |
| 00_0010_5251_10_0100_084_4_0| Betriebssekunden Ausgang PWM 2 | 1 |  s |
| 00_0010_5251_10_0100_096_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_5251_10_0100_100_4_0| Fehler | 1 |  |
| 00_0010_5251_10_0100_108_2_0| Version | 0.01 |  |
| 00_0010_5251_10_0100_112_4_0| Systemdatum | 1 |  |



### <a name="0010_5311_0100"></a>DFA (0x0010) <= X-Control (0x5311), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5311_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5311_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5311_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5311_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5311_10_0100_008_2_0| Einstrahlung Sensor 5 | 1 |  W/m² |
| 00_0010_5311_10_0100_010_1_0| Drehzahl R1 | 1 | % |
| 00_0010_5311_10_0100_011_1_0| Drehzahl R2 | 1 | % |
| 00_0010_5311_10_0100_012_1_0| Drehzahl R3 | 1 | % |
| 00_0010_5311_10_0100_013_1_0| Relais-Maske | 1 |  |
| 00_0010_5311_10_0100_014_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_5311_10_0100_021_1_0| System | 1 |  |
| 00_0010_5311_10_0100_022_1_1| Optionen: Frostschutz | 1 |  |
| 00_0010_5311_10_0100_022_1_4| Optionen: Röhrenkollektor | 1 |  |
| 00_0010_5311_10_0100_022_1_8| Optionen: Rückkühlung | 1 |  |
| 00_0010_5311_10_0100_022_1_16| Optionen: Kollektorkühlung | 1 |  |
| 00_0010_5311_10_0100_022_1_32| Optionen: Externer WT | 1 |  |
| 00_0010_5311_10_0100_022_1_64| Optionen: Nachheizung | 1 |  |
| 00_0010_5311_10_0100_022_1_128| Optionen: Rücklaufanhebung | 1 |  |
| 00_0010_5311_10_0100_022_1_256| Optionen: Ventil | 1 |  |
| 00_0010_5311_10_0100_022_1_512| Optionen: Minimal | 1 |  |
| 00_0010_5311_10_0100_022_1_1024| Optionen: WMZ | 1 |  |
| 00_0010_5311_10_0100_022_1_2048| Optionen: Boilerladung | 1 |  |
| 00_0010_5311_10_0100_022_1_4096| Optionen: Solarzelle | 1 |  |
| 00_0010_5311_10_0100_022_1_8192| Optionen: 2. Kollektor-Ventil | 1 |  |
| 00_0010_5311_10_0100_024_1_0| Fehlermaske | 1 |  |
| 00_0010_5311_10_0100_025_1_0| Sensorbruch-Maske | 1 |  |
| 00_0010_5311_10_0100_026_1_0| Sensorkurzschluss-Maske | 1 |  |
| 00_0010_5311_10_0100_028_2_0| Systemzeit | 1 |  |



### <a name="0010_5351_0100"></a>DFA (0x0010) <= Frischwasserregler (0x5351), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5351_10_0100_110_1_0| Hydraulik | 1 |  |
| 00_0010_5351_10_0100_132_4_0| Volumenstrom | 1 |  l/h |
| 00_0010_5351_10_0100_000_2_0| TSpVL \(S1\) | 0.1 |  °C |
| 00_0010_5351_10_0100_116_2_0| TWW | 0.1 |  °C |
| 00_0010_5351_10_0100_004_2_0| S3 | 0.1 |  °C |
| 00_0010_5351_10_0100_006_2_0| TKW \(S4\) | 0.1 |  °C |
| 00_0010_5351_10_0100_008_2_0| S5 | 0.1 |  °C |
| 00_0010_5351_10_0100_010_2_0| S6 | 0.1 |  °C |
| 00_0010_5351_10_0100_012_2_0| S7 | 0.1 |  °C |
| 00_0010_5351_10_0100_014_2_0| S8 | 0.1 |  °C |
| 00_0010_5351_10_0100_016_2_0| S9 | 0.1 |  °C |
| 00_0010_5351_10_0100_056_1_0| Drehzahl Primaerpumpe | 1 | % |
| 00_0010_5351_10_0100_118_1_0| Drehzahl Sekundaerpumpe | 1 | % |
| 00_0010_5351_10_0100_119_1_0| Drehzahl Zirkulationspumpe | 1 | % |
| 00_0010_5351_10_0100_050_1_0| R2 | 1 | % |
| 00_0010_5351_10_0100_051_1_0| R3 | 1 | % |
| 00_0010_5351_10_0100_052_1_0| R4 | 1 | % |
| 00_0010_5351_10_0100_096_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_5351_10_0100_108_2_0| Version | 0.01 |  |
| 00_0010_5351_10_0100_112_4_0| Datum/Uhrzeit | 1 |  |
| 00_0010_5351_10_0100_120_4_0| Volumenstrom US1 | 1 |  l/h |
| 00_0010_5351_10_0100_124_4_0| Volumenstrom US2 | 1 |  l/h |
| 00_0010_5351_10_0100_128_4_0| Volumenstrom US gesamt | 1 |  l/h |



### <a name="0010_5400_0100"></a>DFA (0x0010) <= DeltaTherm HC \[Regler\] (0x5400), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5400_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5400_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5400_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5400_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5400_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_5400_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_5400_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_5400_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_5400_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_5400_10_0100_018_2_0| Einstrahlung Sensor | 1 |  W/m² |
| 00_0010_5400_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_5400_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_5400_10_0100_024_4_0| Volumenstrom Sensor 1 | 1 |  l/h |
| 00_0010_5400_10_0100_028_4_0| Volumenstrom Sensor 2 | 1 |  l/h |
| 00_0010_5400_10_0100_032_4_0| Volumenstrom Sensor 3 | 1 |  l/h |
| 00_0010_5400_10_0100_036_2_0| Druck Sensor 11 | 0.01 |  bar |
| 00_0010_5400_10_0100_038_2_0| Druck Sensor 12 | 0.01 |  bar |
| 00_0010_5400_10_0100_040_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5400_10_0100_041_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_5400_10_0100_042_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_5400_10_0100_043_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_5400_10_0100_044_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_5400_10_0100_045_1_0| Regler Ausgang 1 | 1 | % |
| 00_0010_5400_10_0100_046_1_0| Regler Ausgang 2 | 1 | % |
| 00_0010_5400_10_0100_048_4_0| Systemdatum | 1 |  |
| 00_0010_5400_10_0100_052_4_0| Fehlermaske | 1 |  |
| 00_0010_5400_10_0100_052_1_1| Fehler: Sensorfehler | 1 |  |
| 00_0010_5400_10_0100_052_1_2| Fehler: Modulfehler | 1 |  |
| 00_0010_5400_10_0100_056_4_0| Warnungmaske | 1 |  |



### <a name="0010_5410_0100"></a>DFA (0x0010) <= DeltaTherm HC \[Heizkreis\] (0x5410 - 0x541F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5410_10_0100_000_2_0| TVorlaufSoll | 0.1 |  °C |
| 00_0010_5410_10_0100_002_1_0| Betriebsstatus | 1 |  |
| 00_0010_5410_10_0100_003_1_0| Betriebsart | 1 |  |
| 00_0010_5410_10_0100_004_4_0| Brennerstarts | 1 |  |



### <a name="0010_5420_0100"></a>DFA (0x0010) <= DeltaTherm HC \[WMZ\] (0x5420 - 0x542F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5420_10_0100_000_4_0| Wert | 1 |  Wh |
| 00_0010_5420_10_0100_004_4_0| Leistung | 1 |  W |
| 00_0010_5420_10_0100_008_4_0| Wert \(heute\) | 1 |  Wh |
| 00_0010_5420_10_0100_012_4_0| Wert \(Woche\) | 1 |  Wh |



### <a name="0010_5430_0100"></a>DFA (0x0010) <= DeltaTherm HC \[Modul\] (0x5430 - 0x543F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5430_10_0100_000_2_0| Sensor 1 | 0.1 |  °C |
| 00_0010_5430_10_0100_002_2_0| Sensor 2 | 0.1 |  °C |
| 00_0010_5430_10_0100_004_2_0| Sensor 3 | 0.1 |  °C |
| 00_0010_5430_10_0100_006_2_0| Sensor 4 | 0.1 |  °C |
| 00_0010_5430_10_0100_008_2_0| Sensor 5 | 0.1 |  °C |
| 00_0010_5430_10_0100_010_2_0| Sensor 6 | 0.1 |  °C |
| 00_0010_5430_10_0100_012_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5430_10_0100_013_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_5430_10_0100_014_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_5430_10_0100_015_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_5430_10_0100_016_1_0| Drehzahl Relais 5 | 1 | % |



### <a name="0010_5510_0100"></a>DFA (0x0010) <= EL2/3 (0x5510), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5510_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5510_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5510_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5510_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5510_10_0100_008_2_0| Betriebsstunden | 1 |  h |
| 00_0010_5510_10_0100_010_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5510_10_0100_011_1_0| Regelstatus | 1 |  |
| 00_0010_5510_10_0100_012_1_0| Fehlermaske | 1 |  |



### <a name="0010_5611_0100"></a>DFA (0x0010) <= DeltaTherm FK (0x5611), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_5611_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_5611_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_5611_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_5611_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_5611_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_5611_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_5611_10_0100_010_1_0| Mischer auf | 1 | % |
| 00_0010_5611_10_0100_011_1_0| Mischer zu | 1 | % |
| 00_0010_5611_10_0100_018_1_0| Systemmeldung | 1 |  |
| 00_0010_5611_10_0100_012_4_0| Datum | 1 |  |
| 00_0010_5611_10_0100_016_2_0| Uhrzeit | 1 |  |



### <a name="0010_6610_0100"></a>DFA (0x0010) <= Midi Pro (0x6610), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_6610_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_6610_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_6610_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_6610_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_6610_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_6610_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_6610_10_0100_012_1_1| Relaisstatus 1 | 1 |  |
| 00_0010_6610_10_0100_012_1_2| Relaisstatus 2 | 1 |  |
| 00_0010_6610_10_0100_012_1_4| Relaisstatus 3 | 1 |  |
| 00_0010_6610_10_0100_012_1_8| Relaisstatus 4 | 1 |  |
| 00_0010_6610_10_0100_012_1_16| Relaisstatus 5 | 1 |  |
| 00_0010_6610_10_0100_012_1_32| Relaisstatus 6 | 1 |  |
| 00_0010_6610_10_0100_013_1_0| Drehzahl 1 | 1 | % |
| 00_0010_6610_10_0100_030_1_0| Drehzahl 2 | 1 | % |
| 00_0010_6610_10_0100_031_1_0| Drehzahl 3 | 1 | % |
| 00_0010_6610_10_0100_015_1_0| Fehlernummer | 1 |  |
| 00_0010_6610_10_0100_016_2_0| Fehlermaske | 1 |  |
| 00_0010_6610_10_0100_018_1_0| Fehler-Info 1 | 1 |  |
| 00_0010_6610_10_0100_019_1_0| Fehler-Info 2 | 1 |  |
| 00_0010_6610_10_0100_020_1_0| Fehler-Info 3 | 1 |  |
| 00_0010_6610_10_0100_021_1_0| Fehler-Info 4 | 1 |  |
| 00_0010_6610_10_0100_022_2_0| Anlagenoptionen 1 | 1 |  |
| 00_0010_6610_10_0100_032_1_0| Anlagenoptionen 2 | 1 |  |
| 00_0010_6610_10_0100_024_1_0| System | 1 |  |
| 00_0010_6610_10_0100_025_2_0| Version | 1 |  |
| 00_0010_6610_10_0100_027_1_0| Modulstatus | 1 |  |
| 00_0010_6610_10_0100_028_2_0| Systemzeit | 1 |  |
| 00_0010_6610_10_0100_033_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_6610_10_0100_035_1_0| Betriebsstunden-Flag | 1 |  |



### <a name="0010_6620_0100"></a>DFA (0x0010) <= SunGo XL (0x6620), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_6620_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_6620_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_6620_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_6620_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_6620_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_6620_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_6620_10_0100_012_1_1| Relaisstatus 1 | 1 |  |
| 00_0010_6620_10_0100_012_1_2| Relaisstatus 2 | 1 |  |
| 00_0010_6620_10_0100_012_1_4| Relaisstatus 3 | 1 |  |
| 00_0010_6620_10_0100_012_1_8| Relaisstatus 4 | 1 |  |
| 00_0010_6620_10_0100_012_1_16| Relaisstatus 5 | 1 |  |
| 00_0010_6620_10_0100_012_1_32| Relaisstatus 6 | 1 |  |
| 00_0010_6620_10_0100_013_1_0| Drehzahl 1 | 1 | % |
| 00_0010_6620_10_0100_030_1_0| Drehzahl 2 | 1 | % |
| 00_0010_6620_10_0100_031_1_0| Drehzahl 3 | 1 | % |
| 00_0010_6620_10_0100_015_1_0| Fehlernummer | 1 |  |
| 00_0010_6620_10_0100_016_2_0| Fehlermaske | 1 |  |
| 00_0010_6620_10_0100_018_1_0| Fehler-Info 1 | 1 |  |
| 00_0010_6620_10_0100_019_1_0| Fehler-Info 2 | 1 |  |
| 00_0010_6620_10_0100_020_1_0| Fehler-Info 3 | 1 |  |
| 00_0010_6620_10_0100_021_1_0| Fehler-Info 4 | 1 |  |
| 00_0010_6620_10_0100_022_2_0| Anlagenoptionen 1 | 1 |  |
| 00_0010_6620_10_0100_024_1_0| System | 1 |  |
| 00_0010_6620_10_0100_025_2_0| Version | 1 |  |
| 00_0010_6620_10_0100_027_1_0| Modulstatus | 1 |  |
| 00_0010_6620_10_0100_028_2_0| Systemzeit | 1 |  |



### <a name="0010_7101_0100"></a>DFA (0x0010) <= DeltaSol BX WMZ (0x7101), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7101_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7101_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7101_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7101_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7101_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7101_10_0100_010_2_0| Temperatur RPS | 0.1 |  °C |
| 00_0010_7101_10_0100_012_2_0| Druck RPS | 0.1 |  bar |
| 00_0010_7101_10_0100_014_2_0| Temperatur VFS | 0.1 |  °C |
| 00_0010_7101_10_0100_016_2_0| Durchfluss VFS | 1 |  l/h |
| 00_0010_7101_10_0100_024_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7101_10_0100_025_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7101_10_0100_026_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7101_10_0100_027_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7101_10_0100_022_1_0| PWM 1 | 1 | % |
| 00_0010_7101_10_0100_023_1_0| PWM 2 | 1 | % |
| 00_0010_7101_10_0100_016_2_0_1| Durchfluss VFS | 1 |  l/h |
| 00_0010_7101_10_0100_018_2_0| Durchfluss V40 | 1 |  l/h |
| 00_0010_7101_10_0100_060_2_0| Durchfluss FlowRotor | 1 |  l/h |
| 00_0010_7101_10_0100_048_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7101_10_0100_054_2_0| Systemzeit | 1 |  |
| 00_0010_7101_10_0100_056_4_0| Datum | 1 |  |
| 00_0010_7101_10_0100_052_2_0| Version | 0.01 |  |
| 00_0010_7101_10_0100_028_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_7101_10_0100_032_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_7101_10_0100_036_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_7101_10_0100_040_4_0| Betriebssekunden Relais 4 | 1 |  s |
| 00_0010_7101_10_0100_046_2_0| Status | 1 |  |
| 00_0010_7101_10_0100_046_1_1| Blockierschutz 1 | 1 |  |
| 00_0010_7101_10_0100_046_1_2| Blockierschutz 2 | 1 |  |
| 00_0010_7101_10_0100_046_1_4| Blockierschutz 3 | 1 |  |
| 00_0010_7101_10_0100_046_1_8| Blockierschutz 4 | 1 |  |
| 00_0010_7101_10_0100_046_1_16| Initialisierung | 1 |  |
| 00_0010_7101_10_0100_046_1_32| Befüllung | 1 |  |
| 00_0010_7101_10_0100_046_1_64| Stabilisierung | 1 |  |
| 00_0010_7101_10_0100_046_1_128| Pumpenverzögerung | 1 |  |
| 00_0010_7101_10_0100_047_1_1| Überwärmeabfuhr | 1 |  |
| 00_0010_7101_10_0100_047_1_2| Nachlauf | 1 |  |
| 00_0010_7101_10_0100_047_1_4| Thermische Desinfektion | 1 |  |
| 00_0010_7101_10_0100_047_1_8| Systemkühlung | 1 |  |
| 00_0010_7101_10_0100_047_1_16| Speicherkühlung | 1 |  |
| 00_0010_7101_10_0100_047_1_32| Spreizung | 1 |  |
| 00_0010_7101_10_0100_047_1_64| Frostschutz | 1 |  |
| 00_0010_7101_10_0100_047_1_128| Kollektorkühlung | 1 |  |
| 00_0010_7101_10_0100_020_1_0| Einheit | 1 |  |
| 00_0010_7101_10_0100_044_2_0| Fehler | 1 |  |
| 00_0010_7101_10_0100_044_1_1| Fehler S1 | 1 |  |
| 00_0010_7101_10_0100_044_1_2| Fehler S2 | 1 |  |
| 00_0010_7101_10_0100_044_1_4| Fehler S3 | 1 |  |
| 00_0010_7101_10_0100_044_1_8| Fehler S4 | 1 |  |
| 00_0010_7101_10_0100_044_1_16| Fehler S5 | 1 |  |
| 00_0010_7101_10_0100_044_1_32| Fehler S6 | 1 |  |
| 00_0010_7101_10_0100_044_1_64| Fehler S7 | 1 |  |
| 00_0010_7101_10_0100_044_1_128| Fehler S8 | 1 |  |
| 00_0010_7101_10_0100_045_1_1| Fehler S9 | 1 |  |
| 00_0010_7101_10_0100_045_1_2| Fehler V40 | 1 |  |
| 00_0010_7101_10_0100_045_1_4| Leckage | 1 |  |
| 00_0010_7101_10_0100_045_1_8| Überdruck | 1 |  |
| 00_0010_7101_10_0100_045_1_16| Durchflussfehler | 1 |  |



### <a name="0010_7112_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Regler\] (0x7112), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7112_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7112_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7112_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7112_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7112_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7112_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7112_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7112_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7112_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7112_10_0100_018_2_0| Einstrahlung Sensor 10 | 1 |  W/m² |
| 00_0010_7112_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_7112_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_7112_10_0100_024_4_0| Volumenstrom Sensor 9 | 1 |  l/h |
| 00_0010_7112_10_0100_028_4_0| Volumenstrom Sensor 11 | 1 |  l/h |
| 00_0010_7112_10_0100_032_4_0| Volumenstrom Sensor 12 | 1 |  l/h |
| 00_0010_7112_10_0100_036_2_0| Druck Sensor 11 | 0.01 |  bar |
| 00_0010_7112_10_0100_038_2_0| Druck Sensor 12 | 0.01 |  bar |
| 00_0010_7112_10_0100_040_1_0| Relais 1 | 1 | % |
| 00_0010_7112_10_0100_041_1_0| Relais 2 | 1 | % |
| 00_0010_7112_10_0100_042_1_0| Relais 3 | 1 | % |
| 00_0010_7112_10_0100_043_1_0| Relais 4 | 1 | % |
| 00_0010_7112_10_0100_044_1_0| Relais 5 | 1 | % |
| 00_0010_7112_10_0100_064_1_0| PWM/0-10V A | 1 | % |
| 00_0010_7112_10_0100_065_1_0| PWM/0-10V B | 1 | % |
| 00_0010_7112_10_0100_048_4_0| Systemdatum | 1 |  |
| 00_0010_7112_10_0100_052_4_0| Fehlermaske | 1 |  |
| 00_0010_7112_10_0100_068_4_0| Warnungsmaske | 1 |  |



### <a name="0010_7112_0140"></a>DFA (0x0010) <= DeltaSol BX Plus \[Regler\] (0x7112), command 0x0140

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7112_10_0140_000_1_0| Anzahl TD-Funktionen | 1 |  |
| 00_0010_7112_10_0140_001_1_0| Nummer letzte erfolgreiche TD | 1 |  |
| 00_0010_7112_10_0140_002_1_0| Nummer letzte abgebrochene TD | 1 |  |
| 00_0010_7112_10_0140_004_2_0| Maske erfolgreiche TD | 1 |  |
| 00_0010_7112_10_0140_006_2_0| Maske abgebrochene TD | 1 |  |
| 00_0010_7112_10_0140_008_4_0| Zeitstempel letzte erfolgreiche TD | 1 |  |
| 00_0010_7112_10_0140_012_4_0| Zeitstempel letzte abgebrochene TD | 1 |  |



### <a name="0010_7113_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Module\] (0x7113), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7113_10_0100_000_2_0| Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 00_0010_7113_10_0100_002_2_0| Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 00_0010_7113_10_0100_004_2_0| Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 00_0010_7113_10_0100_006_2_0| Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 00_0010_7113_10_0100_008_2_0| Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 00_0010_7113_10_0100_010_2_0| Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 00_0010_7113_10_0100_012_2_0| Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 00_0010_7113_10_0100_014_2_0| Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 00_0010_7113_10_0100_016_2_0| Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 00_0010_7113_10_0100_018_2_0| Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 00_0010_7113_10_0100_020_2_0| Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 00_0010_7113_10_0100_022_2_0| Temperatur Modul 2 Sensor 6 | 0.1 |  °C |



### <a name="0010_7120_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Heizkreis\] (0x7120 - 0x712F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7120_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_7120_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_7130_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[WMZ\] (0x7130 - 0x713F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7130_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7130_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_7130_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |
| 00_0010_7130_10_0100_016_4_0| Gesamtvolumen | 1 |  l |



### <a name="0010_7140_0100"></a>DFA (0x0010) <= DeltaSol BX Pro \[Regler\] (0x7140), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7140_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7140_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7140_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7140_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7140_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7140_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7140_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7140_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7140_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7140_10_0100_018_2_0| Einstrahlung Sensor 10 | 1 |  W/m² |
| 00_0010_7140_10_0100_020_4_0| Volumenstrom Sensor 10 | 1 |  l/h |
| 00_0010_7140_10_0100_024_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7140_10_0100_025_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7140_10_0100_026_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7140_10_0100_028_4_0| Systemdatum | 1 |  |
| 00_0010_7140_10_0100_032_4_0| Fehlermaske | 1 |  |



### <a name="0010_7150_0100"></a>DFA (0x0010) <= DeltaSol BX Pro \[WMZ\] (0x7150 - 0x715F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7150_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7150_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_7150_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |



### <a name="0010_7160_0100"></a>DFA (0x0010) <= SKSC3HE (0x7160), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7160_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7160_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7160_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7160_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7160_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7160_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7160_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7160_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7160_10_0100_036_2_0| Temperatur GFD1 | 0.1 |  °C |
| 00_0010_7160_10_0100_038_2_0| Temperatur GFD2 | 0.1 |  °C |
| 00_0010_7160_10_0100_016_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_7160_10_0100_018_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7160_10_0100_044_4_0| Volumenstrom 2 | 1 |  l/h |
| 00_0010_7160_10_0100_048_4_0| Volumenstrom 3 | 1 |  l/h |
| 00_0010_7160_10_0100_020_1_0| Drehzahl A1 | 1 | % |
| 00_0010_7160_10_0100_021_1_0| Drehzahl A2 | 1 | % |
| 00_0010_7160_10_0100_022_1_0| Drehzahl A3 | 1 | % |
| 00_0010_7160_10_0100_023_1_0| Drehzahl A | 1 | % |
| 00_0010_7160_10_0100_024_2_0| Wärme | 1 |  Wh |
| 00_0010_7160_10_0100_060_2_0| Wärme 2 | 1 |  Wh |
| 00_0010_7160_10_0100_068_2_0| Wärme 3 | 1 |  Wh |
| 00_0010_7160_10_0100_052_4_0| Leistung 2 | 0.001 |  kW |
| 00_0010_7160_10_0100_056_4_0| Leistung 3 | 0.001 |  kW |
| 00_0010_7160_10_0100_032_1_0| Fehlermaske | 1 |  |
| 00_0010_7160_10_0100_033_1_0| Sensorbruch-Nummer | 1 |  |
| 00_0010_7160_10_0100_034_1_0| Sensorkurzschluss-Nummer | 1 |  |
| 00_0010_7160_10_0100_042_2_0| Systemzeit | 1 |  |
| 00_0010_7160_10_0100_042_2_0_1| Systemzeit2 | 1 |  |



### <a name="0010_7161_0100"></a>DFA (0x0010) <= SKSC3HE \[HK1\] (0x7161), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7161_10_0100_000_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0010_7161_10_0100_002_1_0| Mischerlaufzeit | 1 |  s |
| 00_0010_7161_10_0100_003_1_0| Mischerpausenzeit | 1 |  s |
| 00_0010_7161_10_0100_004_2_0| HK-Status | 1 |  |



### <a name="0010_7162_0100"></a>DFA (0x0010) <= SKSC3HE \[HK2\] (0x7162), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7162_10_0100_000_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0010_7162_10_0100_002_1_0| Mischerlaufzeit | 1 |  s |
| 00_0010_7162_10_0100_003_1_0| Mischerpausenzeit | 1 |  s |
| 00_0010_7162_10_0100_004_2_0| HK-Status | 1 |  |



### <a name="0010_7163_0100"></a>DFA (0x0010) <= SKSC3HE \[HK3\] (0x7163), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7163_10_0100_000_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0010_7163_10_0100_002_1_0| Mischerlaufzeit | 1 |  s |
| 00_0010_7163_10_0100_003_1_0| Mischerpausenzeit | 1 |  s |
| 00_0010_7163_10_0100_004_2_0| HK-Status | 1 |  |



### <a name="0010_7176_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[Regler\] (0x7176), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7176_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7176_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7176_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7176_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7176_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7176_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7176_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7176_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7176_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7176_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7176_10_0100_020_2_0| Einstrahlung Sensor 11 | 1 |  W/m² |
| 00_0010_7176_10_0100_024_2_0| Temperatur Sensor Ga1 | 0.1 |  °C |
| 00_0010_7176_10_0100_026_2_0| Temperatur Sensor Ga2 | 0.1 |  °C |
| 00_0010_7176_10_0100_028_4_0| Volumenstrom Sensor 9 | 1 |  l/h |
| 00_0010_7176_10_0100_032_4_0| Volumenstrom Sensor 10 | 1 |  l/h |
| 00_0010_7176_10_0100_036_4_0| Volumenstrom Sensor Ga1 | 1 |  l/h |
| 00_0010_7176_10_0100_040_4_0| Volumenstrom Sensor Ga2 | 1 |  l/h |
| 00_0010_7176_10_0100_044_2_0| Druck Sensor Ga1 | 0.01 |  bar |
| 00_0010_7176_10_0100_046_2_0| Druck Sensor Ga2 | 0.01 |  bar |
| 00_0010_7176_10_0100_048_1_0| Relais 1 | 1 | % |
| 00_0010_7176_10_0100_049_1_0| Relais 2 | 1 | % |
| 00_0010_7176_10_0100_050_1_0| Relais 3 | 1 | % |
| 00_0010_7176_10_0100_051_1_0| Relais 4 | 1 | % |
| 00_0010_7176_10_0100_052_1_0| Relais 5 | 1 | % |
| 00_0010_7176_10_0100_072_1_0| PWM/0-10V A | 1 | % |
| 00_0010_7176_10_0100_073_1_0| PWM/0-10V B | 1 | % |
| 00_0010_7176_10_0100_074_1_0| PWM/0-10V C | 1 | % |
| 00_0010_7176_10_0100_075_1_0| PWM/0-10V D | 1 | % |
| 00_0010_7176_10_0100_056_4_0| Systemdatum | 1 |  |
| 00_0010_7176_10_0100_060_4_0| Fehlermaske | 1 |  |



### <a name="0010_7177_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[Module\] (0x7177), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7177_10_0100_000_2_0| Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 00_0010_7177_10_0100_002_2_0| Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 00_0010_7177_10_0100_004_2_0| Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 00_0010_7177_10_0100_006_2_0| Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 00_0010_7177_10_0100_008_2_0| Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 00_0010_7177_10_0100_010_2_0| Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 00_0010_7177_10_0100_012_2_0| Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 00_0010_7177_10_0100_014_2_0| Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 00_0010_7177_10_0100_016_2_0| Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 00_0010_7177_10_0100_018_2_0| Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 00_0010_7177_10_0100_020_2_0| Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 00_0010_7177_10_0100_022_2_0| Temperatur Modul 2 Sensor 6 | 0.1 |  °C |



### <a name="0010_7178_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[Heizkreis 1\] (0x7178), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7178_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_7178_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_7179_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[Heizkreis 2\] (0x7179), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7179_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_7179_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_717A_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[WMZ 1\] (0x717A), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_717A_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_717A_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_717A_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |
| 00_0010_717A_10_0100_016_4_0| Gesamtvolumen | 1 |  l |



### <a name="0010_717B_0100"></a>DFA (0x0010) <= DeltaSol BX Plus V2A \[WMZ 2\] (0x717B), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_717B_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_717B_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_717B_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |
| 00_0010_717B_10_0100_016_4_0| Gesamtvolumen | 1 |  l |



### <a name="0010_7210_0100"></a>DFA (0x0010) <= SKSR 1/2/3 (0x7210), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7210_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7210_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7210_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7210_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7210_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7210_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7210_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7210_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7210_10_0100_016_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_7210_10_0100_018_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7210_10_0100_020_1_0| Drehzahl A1 | 1 | % |
| 00_0010_7210_10_0100_021_1_0| Drehzahl A2 | 1 | % |
| 00_0010_7210_10_0100_022_1_0| Drehzahl A3 | 1 | % |
| 00_0010_7210_10_0100_023_1_0| Drehzahl A | 1 | % |
| 00_0010_7210_10_0100_024_2_0| Wärme | 1 |  Wh |
| 00_0010_7210_10_0100_032_1_0| Fehlermaske | 1 |  |
| 00_0010_7210_10_0100_033_1_0| Sensorbruch-Nummer | 1 |  |
| 00_0010_7210_10_0100_034_1_0| Sensorkurzschluss-Nummer | 1 |  |
| 00_0010_7210_10_0100_042_2_0| Systemzeit | 1 |  |
| 00_0010_7210_10_0100_042_2_0_1| Systemzeit2 | 1 |  |



### <a name="0010_7211_0100"></a>DFA (0x0010) <= SKSC3 \[HK1\] (0x7211), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7211_10_0100_000_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0010_7211_10_0100_002_1_0| Mischerlaufzeit | 1 |  s |
| 00_0010_7211_10_0100_003_1_0| Mischerpausenzeit | 1 |  s |
| 00_0010_7211_10_0100_004_2_0| HK-Status | 1 |  |



### <a name="0010_7212_0100"></a>DFA (0x0010) <= SKSC3 \[HK2\] (0x7212), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7212_10_0100_000_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0010_7212_10_0100_002_1_0| Mischerlaufzeit | 1 |  s |
| 00_0010_7212_10_0100_003_1_0| Mischerpausenzeit | 1 |  s |
| 00_0010_7212_10_0100_004_2_0| HK-Status | 1 |  |



### <a name="0010_7213_0100"></a>DFA (0x0010) <= SKSC3 \[HK3\] (0x7213), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7213_10_0100_000_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0010_7213_10_0100_002_1_0| Mischerlaufzeit | 1 |  s |
| 00_0010_7213_10_0100_003_1_0| Mischerpausenzeit | 1 |  s |
| 00_0010_7213_10_0100_004_2_0| HK-Status | 1 |  |



### <a name="0010_7221_0100"></a>DFA (0x0010) <= DrainBloC (0x7221), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7221_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7221_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7221_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7221_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7221_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7221_10_0100_010_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7221_10_0100_012_2_0| Systemdruck | 0.1 |  bar |
| 00_0010_7221_10_0100_014_1_0| Ansteuerung 1 | 1 | % |
| 00_0010_7221_10_0100_015_1_0| Ansteuerung 2 | 1 | % |
| 00_0010_7221_10_0100_016_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7221_10_0100_017_1_0| PWM 1 | 1 | % |
| 00_0010_7221_10_0100_018_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7221_10_0100_019_1_0| PWM 2 | 1 | % |
| 00_0010_7221_10_0100_020_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7221_10_0100_036_1_0| Version | 0.01 |  |
| 00_0010_7221_10_0100_038_2_0| Uhrzeit | 1 |  |
| 00_0010_7221_10_0100_040_4_0| Datum | 1 |  |



### <a name="0010_7231_0100"></a>DFA (0x0010) <= SC25 (0x7231), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7231_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7231_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7231_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7231_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7231_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7231_10_0100_010_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7231_10_0100_012_2_0| Systemdruck | 0.1 |  bar |
| 00_0010_7231_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7231_10_0100_016_1_0| Ansteuerung 1 | 1 | % |
| 00_0010_7231_10_0100_017_1_0| Ansteuerung 2 | 1 | % |
| 00_0010_7231_10_0100_018_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7231_10_0100_019_1_0| PWM 1 | 1 | % |
| 00_0010_7231_10_0100_020_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7231_10_0100_021_1_0| PWM 2 | 1 | % |
| 00_0010_7231_10_0100_022_1_1| Handbetrieb 1 | 1 |  |
| 00_0010_7231_10_0100_022_1_2| Handbetrieb 2 | 1 |  |
| 00_0010_7231_10_0100_024_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7231_10_0100_028_1_1| ΔT Kollektor-Speicher | 1 |  |
| 00_0010_7231_10_0100_028_1_2| ΔT Vorlauf-Rücklauf | 1 |  |
| 00_0010_7231_10_0100_028_1_4| Pendelpause | 1 |  |
| 00_0010_7231_10_0100_028_1_8| Kollektorkühlung | 1 |  |
| 00_0010_7231_10_0100_028_1_16| Rückkühlung | 1 |  |
| 00_0010_7231_10_0100_028_1_32| Frostschutz | 1 |  |
| 00_0010_7231_10_0100_028_1_64| Röhrenkollektor | 1 |  |
| 00_0010_7231_10_0100_028_1_128| ΔT3 | 1 |  |
| 00_0010_7231_10_0100_029_1_1| Thermostat 1 | 1 |  |
| 00_0010_7231_10_0100_029_1_2| Blockierschutz 1 | 1 |  |
| 00_0010_7231_10_0100_029_1_4| Blockierschutz 2 | 1 |  |
| 00_0010_7231_10_0100_029_1_8| Stabilisierung | 1 |  |
| 00_0010_7231_10_0100_032_1_1| Überdruck | 1 |  |
| 00_0010_7231_10_0100_032_1_2| Nachtumwälzung | 1 |  |
| 00_0010_7231_10_0100_032_1_4| ΔT zu hoch | 1 |  |
| 00_0010_7231_10_0100_036_1_1| S1 defekt | 1 |  |
| 00_0010_7231_10_0100_036_1_2| S2 defekt | 1 |  |
| 00_0010_7231_10_0100_036_1_4| S3 defekt | 1 |  |
| 00_0010_7231_10_0100_036_1_8| S-Vorlauf defekt | 1 |  |
| 00_0010_7231_10_0100_036_1_16| S-Rücklauf defekt | 1 |  |
| 00_0010_7231_10_0100_036_1_32| Druck\(S6\) defekt | 1 |  |
| 00_0010_7231_10_0100_036_1_64| Volumenstrom\(S7\) defekt | 1 |  |
| 00_0010_7231_10_0100_036_1_128| Durchfluss | 1 |  |
| 00_0010_7231_10_0100_037_1_1| Leckage | 1 |  |
| 00_0010_7231_10_0100_040_2_0| Version | 0.01 |  |
| 00_0010_7231_10_0100_042_2_0| Uhrzeit | 1 |  |
| 00_0010_7231_10_0100_044_4_0| Datum | 1 |  |



### <a name="0010_7311_0100"></a>DFA (0x0010) <= DeltaSol M \[Regler\] (0x7311), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7311_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7311_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7311_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7311_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7311_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7311_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7311_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7311_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7311_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7311_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7311_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_7311_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_7311_10_0100_024_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_7311_10_0100_028_4_0| Impulseingang 1 | 1 |  |
| 00_0010_7311_10_0100_032_4_0| Impulseingang 2 | 1 |  |
| 00_0010_7311_10_0100_036_2_0| Sensorbruch-Maske | 1 |  |
| 00_0010_7311_10_0100_038_2_0| Sensorkurzschluss-Maske | 1 |  |
| 00_0010_7311_10_0100_040_2_0| Sensorbenutzungs-Maske | 1 |  |
| 00_0010_7311_10_0100_044_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7311_10_0100_045_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7311_10_0100_046_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7311_10_0100_047_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7311_10_0100_048_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7311_10_0100_049_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_7311_10_0100_050_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_7311_10_0100_051_1_0| Drehzahl Relais 8 | 1 | % |
| 00_0010_7311_10_0100_052_1_0| Drehzahl Relais 9 | 1 | % |
| 00_0010_7311_10_0100_058_2_0| Relaisbenutzungsmaske | 1 |  |
| 00_0010_7311_10_0100_060_2_0| Fehlermaske | 1 |  |
| 00_0010_7311_10_0100_062_2_0| Warnungsmaske | 1 |  |
| 00_0010_7311_10_0100_064_2_0| Reglerversion | 1 |  |
| 00_0010_7311_10_0100_066_2_0| Systemzeit | 1 |  |



### <a name="0010_7312_0100"></a>DFA (0x0010) <= DeltaSol M \[HK1\] (0x7312 - 0x7313), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7312_10_0100_000_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_7312_10_0100_002_2_0| Fernversteller | 0.1 |  K |
| 00_0010_7312_10_0100_004_2_0| Aussentemperatur | 0.1 |  °C |
| 00_0010_7312_10_0100_006_2_0| Speichertemperatur | 0.1 |  °C |
| 00_0010_7312_10_0100_008_2_0| Vorlaufsolltemperatur | 0.1 |  °C |
| 00_0010_7312_10_0100_010_1_0| Relaismaske | 1 |  |



### <a name="0010_7315_0100"></a>DFA (0x0010) <= DeltaSol M \[Volumen\] (0x7315), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7315_10_0100_000_4_0| Betriebssekunden R1 | 1 |  s |
| 00_0010_7315_10_0100_004_4_0| Betriebssekunden R2 | 1 |  s |
| 00_0010_7315_10_0100_008_4_0| Betriebssekunden R3 | 1 |  s |
| 00_0010_7315_10_0100_012_4_0| Betriebssekunden R4 | 1 |  s |
| 00_0010_7315_10_0100_016_4_0| Betriebssekunden R5 | 1 |  s |
| 00_0010_7315_10_0100_020_4_0| Betriebssekunden R6 | 1 |  s |
| 00_0010_7315_10_0100_024_4_0| Betriebssekunden R7 | 1 |  s |
| 00_0010_7315_10_0100_028_4_0| Betriebssekunden R8 | 1 |  s |
| 00_0010_7315_10_0100_032_4_0| Betriebssekunden R9 | 1 |  s |
| 00_0010_7315_10_0100_036_4_0| Volumen 1 | 0.1 |  l |
| 00_0010_7315_10_0100_040_4_0| Volumen 2 | 0.1 |  l |



### <a name="0010_7316_0100"></a>DFA (0x0010) <= DeltaSol M \[WMZ1\] (0x7316 - 0x7317), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7316_10_0100_000_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_7316_10_0100_002_2_0| Rücklauftemperatur | 0.1 |  °C |
| 00_0010_7316_10_0100_004_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7316_10_0100_006_2_0| Wärme | 1 |  Wh |



### <a name="0010_7321_0100"></a>DFA (0x0010) <= Vitosolic 200 \[Regler\] (0x7321), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7321_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7321_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7321_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7321_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7321_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7321_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7321_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7321_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7321_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7321_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7321_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_7321_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_7321_10_0100_024_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_7321_10_0100_028_4_0| Impulseingang 1 | 1 |  |
| 00_0010_7321_10_0100_032_4_0| Impulseingang 2 | 1 |  |
| 00_0010_7321_10_0100_036_2_0| Sensorbruch-Maske | 1 |  |
| 00_0010_7321_10_0100_038_2_0| Sensorkurzschluss-Maske | 1 |  |
| 00_0010_7321_10_0100_040_2_0| Sensorbenutzungs-Maske | 1 |  |
| 00_0010_7321_10_0100_044_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7321_10_0100_045_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7321_10_0100_046_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7321_10_0100_047_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7321_10_0100_048_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7321_10_0100_049_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_7321_10_0100_050_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_7321_10_0100_051_1_0| Drehzahl Relais 8 | 1 | % |
| 00_0010_7321_10_0100_052_1_0| Drehzahl Relais 9 | 1 | % |
| 00_0010_7321_10_0100_058_2_0| Relaisbenutzungsmaske | 1 |  |
| 00_0010_7321_10_0100_060_2_0| Fehlermaske | 1 |  |
| 00_0010_7321_10_0100_062_2_0| Warnungsmaske | 1 |  |
| 00_0010_7321_10_0100_064_2_0| Reglerversion | 1 |  |
| 00_0010_7321_10_0100_066_2_0| Systemzeit | 1 |  |



### <a name="0010_7326_0100"></a>DFA (0x0010) <= Vitosolic 200 \[WMZ1\] (0x7326 - 0x7327), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7326_10_0100_000_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_7326_10_0100_002_2_0| Rücklauftemperatur | 0.1 |  °C |
| 00_0010_7326_10_0100_004_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7326_10_0100_006_2_0| Wärme | 1 |  Wh |



### <a name="0010_7331_0100"></a>DFA (0x0010) <= SLR (0x7331), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7331_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7331_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7331_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7331_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7331_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7331_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7331_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7331_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7331_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7331_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7331_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_7331_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_7331_10_0100_024_2_0| Temperatur Sensor 13 | 0.1 |  °C |
| 00_0010_7331_10_0100_026_2_0| Temperatur Sensor 14 | 0.1 |  °C |
| 00_0010_7331_10_0100_028_2_0| Temperatur Sensor 15 | 0.1 |  °C |
| 00_0010_7331_10_0100_030_2_0| Temperatur Sensor 16 | 0.1 |  °C |
| 00_0010_7331_10_0100_032_2_0| Temperatur Sensor 17 | 0.1 |  °C |
| 00_0010_7331_10_0100_034_2_0| Temperatur Sensor 18 | 0.1 |  °C |
| 00_0010_7331_10_0100_036_2_0| Temperatur Sensor 19 | 0.1 |  °C |
| 00_0010_7331_10_0100_038_2_0| Temperatur Sensor 20 | 0.1 |  °C |
| 00_0010_7331_10_0100_040_2_0| Temperatur Sensor 21 | 0.1 |  °C |
| 00_0010_7331_10_0100_042_2_0| Temperatur Sensor 22 | 0.1 |  °C |
| 00_0010_7331_10_0100_044_1_0| Drehzahl R1 | 1 | % |
| 00_0010_7331_10_0100_045_1_0| Drehzahl R2 | 1 | % |
| 00_0010_7331_10_0100_046_1_0| Drehzahl R3 | 1 | % |
| 00_0010_7331_10_0100_047_1_0| Drehzahl R4 | 1 | % |
| 00_0010_7331_10_0100_048_1_0| Drehzahl R5 | 1 | % |
| 00_0010_7331_10_0100_049_1_0| Drehzahl R6 | 1 | % |
| 00_0010_7331_10_0100_050_1_0| Drehzahl R7 | 1 | % |
| 00_0010_7331_10_0100_051_1_0| Drehzahl R8 | 1 | % |
| 00_0010_7331_10_0100_052_1_0| Drehzahl R9 | 1 | % |
| 00_0010_7331_10_0100_053_1_0| Drehzahl R10 | 1 | % |
| 00_0010_7331_10_0100_054_1_0| Drehzahl R11 | 1 | % |
| 00_0010_7331_10_0100_055_1_0| Drehzahl R12 | 1 | % |
| 00_0010_7331_10_0100_056_1_0| Drehzahl R13 | 1 | % |
| 00_0010_7331_10_0100_057_1_0| Drehzahl R14 | 1 | % |
| 00_0010_7331_10_0100_058_1_0| Drehzahl R15 | 1 | % |
| 00_0010_7331_10_0100_059_1_0| Drehzahl R16 | 1 | % |
| 00_0010_7331_10_0100_060_1_0| Drehzahl R17 | 1 | % |
| 00_0010_7331_10_0100_061_1_0| Drehzahl R18 | 1 | % |
| 00_0010_7331_10_0100_064_4_0| Sensorbenutzungs-Maske #1 | 1 |  |
| 00_0010_7331_10_0100_068_4_0| Sensorbenutzungs-Maske #2 | 1 |  |
| 00_0010_7331_10_0100_072_2_0| Fehler-Maske | 1 |  |
| 00_0010_7331_10_0100_074_2_0| Warnungen-Maske | 1 |  |
| 00_0010_7331_10_0100_076_2_0| Version | 1 |  |
| 00_0010_7331_10_0100_078_2_0| Systemzeit | 1 |  |
| 00_0010_7331_10_0100_080_1_0| Variante | 1 |  |



### <a name="0010_7332_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul (0x7332), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7332_10_0100_000_2_0| Temperatur Sensor 17 | 0.1 |  °C |
| 00_0010_7332_10_0100_002_2_0| Temperatur Sensor 18 | 0.1 |  °C |
| 00_0010_7332_10_0100_004_2_0| Temperatur Sensor 19 | 0.1 |  °C |
| 00_0010_7332_10_0100_006_2_0| Temperatur Sensor 20 | 0.1 |  °C |
| 00_0010_7332_10_0100_008_2_0| Temperatur Sensor 21 | 0.1 |  °C |
| 00_0010_7332_10_0100_010_2_0| Temperatur Sensor 22 | 0.1 |  °C |
| 00_0010_7332_10_0100_012_1_0| Drehzahl R14 | 1 | % |
| 00_0010_7332_10_0100_013_1_0| Drehzahl R15 | 1 | % |
| 00_0010_7332_10_0100_014_1_0| Drehzahl R16 | 1 | % |
| 00_0010_7332_10_0100_015_1_0| Drehzahl R17 | 1 | % |
| 00_0010_7332_10_0100_016_1_0| Drehzahl R18 | 1 | % |



### <a name="0010_7333_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul (0x7333), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7333_10_0100_000_2_0| Temperatur Sensor 23 | 0.1 |  °C |
| 00_0010_7333_10_0100_002_2_0| Temperatur Sensor 24 | 0.1 |  °C |
| 00_0010_7333_10_0100_004_2_0| Temperatur Sensor 25 | 0.1 |  °C |
| 00_0010_7333_10_0100_006_2_0| Temperatur Sensor 26 | 0.1 |  °C |
| 00_0010_7333_10_0100_008_2_0| Temperatur Sensor 27 | 0.1 |  °C |
| 00_0010_7333_10_0100_010_2_0| Temperatur Sensor 28 | 0.1 |  °C |
| 00_0010_7333_10_0100_012_1_0| Drehzahl R19 | 1 | % |
| 00_0010_7333_10_0100_013_1_0| Drehzahl R20 | 1 | % |
| 00_0010_7333_10_0100_014_1_0| Drehzahl R21 | 1 | % |
| 00_0010_7333_10_0100_015_1_0| Drehzahl R22 | 1 | % |
| 00_0010_7333_10_0100_016_1_0| Drehzahl R23 | 1 | % |



### <a name="0010_7334_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul (0x7334), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7334_10_0100_000_2_0| Temperatur Sensor 29 | 0.1 |  °C |
| 00_0010_7334_10_0100_002_2_0| Temperatur Sensor 30 | 0.1 |  °C |
| 00_0010_7334_10_0100_004_2_0| Temperatur Sensor 31 | 0.1 |  °C |
| 00_0010_7334_10_0100_006_2_0| Temperatur Sensor 32 | 0.1 |  °C |
| 00_0010_7334_10_0100_008_2_0| Temperatur Sensor 33 | 0.1 |  °C |
| 00_0010_7334_10_0100_010_2_0| Temperatur Sensor 34 | 0.1 |  °C |
| 00_0010_7334_10_0100_012_1_0| Drehzahl R24 | 1 | % |
| 00_0010_7334_10_0100_013_1_0| Drehzahl R25 | 1 | % |
| 00_0010_7334_10_0100_014_1_0| Drehzahl R26 | 1 | % |
| 00_0010_7334_10_0100_015_1_0| Drehzahl R27 | 1 | % |
| 00_0010_7334_10_0100_016_1_0| Drehzahl R28 | 1 | % |



### <a name="0010_7335_0100"></a>DFA (0x0010) <= SLR-Erweiterungsmodul (0x7335), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7335_10_0100_000_2_0| Temperatur Sensor 35 | 0.1 |  °C |
| 00_0010_7335_10_0100_002_2_0| Temperatur Sensor 36 | 0.1 |  °C |
| 00_0010_7335_10_0100_004_2_0| Temperatur Sensor 37 | 0.1 |  °C |
| 00_0010_7335_10_0100_006_2_0| Temperatur Sensor 38 | 0.1 |  °C |
| 00_0010_7335_10_0100_008_2_0| Temperatur Sensor 39 | 0.1 |  °C |
| 00_0010_7335_10_0100_010_2_0| Temperatur Sensor 40 | 0.1 |  °C |
| 00_0010_7335_10_0100_012_1_0| Drehzahl R29 | 1 | % |
| 00_0010_7335_10_0100_013_1_0| Drehzahl R30 | 1 | % |
| 00_0010_7335_10_0100_014_1_0| Drehzahl R31 | 1 | % |
| 00_0010_7335_10_0100_015_1_0| Drehzahl R32 | 1 | % |
| 00_0010_7335_10_0100_016_1_0| Drehzahl R33 | 1 | % |



### <a name="0010_7341_0100"></a>DFA (0x0010) <= SLR XT (0x7341), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7341_10_0100_000_2_0| S1-SF-K | 0.1 |  °C |
| 00_0010_7341_10_0100_002_2_0| S2-SF-1 | 0.1 |  °C |
| 00_0010_7341_10_0100_004_2_0| S3-SF-2 | 0.1 |  °C |
| 00_0010_7341_10_0100_006_2_0| S4-SF-3/WT/F-RLA1/RLU1 | 0.1 |  °C |
| 00_0010_7341_10_0100_008_2_0| S5-FN-HK/F-RLA2 | 0.1 |  °C |
| 00_0010_7341_10_0100_010_2_0| S6-FN-WW/BF/SF-WT | 0.1 |  °C |
| 00_0010_7341_10_0100_012_2_0| S7-FN-K2 | 0.1 |  °C |
| 00_0010_7341_10_0100_014_2_0| S8-FZ | 0.1 |  °C |
| 00_0010_7341_10_0100_016_2_0| S9-AF | 0.1 |  °C |
| 00_0010_7341_10_0100_018_2_0| S10-VL-F1 | 0.1 |  °C |
| 00_0010_7341_10_0100_020_2_0| S11-FV-1 | 0.1 |  °C |
| 00_0010_7341_10_0100_022_2_0| S12-VL-F2/WA-1/SF-4/F-RLU1 | 0.1 |  °C |
| 00_0010_7341_10_0100_024_2_0| S13-FV-2/WA-2/SF-WT | 0.1 |  °C |
| 00_0010_7341_10_0100_026_2_0| S14-KF-1/KF-NH | 0.1 |  °C |
| 00_0010_7341_10_0100_028_2_0| S15-KF-2/SF-K2 | 0.1 |  °C |
| 00_0010_7341_10_0100_030_2_0| S16-BF/BF-1/F-RLU2 | 0.1 |  °C |
| 00_0010_7341_10_0100_032_4_0| SensorVolumenstrom_Regler_GAS1_TotalWert_L | 1 |  l |
| 00_0010_7341_10_0100_036_4_0| SensorVolumenstrom_Regler_GAS2_TotalWert_L | 1 |  l |
| 00_0010_7341_10_0100_040_4_0| SensorVolumenstrom_Regler_GDS1_TotalWert_L | 1 |  l |
| 00_0010_7341_10_0100_044_4_0| SensorVolumenstrom_Regler_GDS2_TotalWert_L | 1 |  l |
| 00_0010_7341_10_0100_048_2_0| Sensor_Regler_Druck_GAS1_Wert_Bar | 0.01 |  bar |
| 00_0010_7341_10_0100_050_2_0| Sensor_Regler_Druck_GAS2_Wert_Bar | 0.01 |  bar |
| 00_0010_7341_10_0100_052_2_0| Sensor_Regler_Druck_GDS1_Wert_Bar | 0.01 |  bar |
| 00_0010_7341_10_0100_054_2_0| Sensor_Regler_Druck_GDS2_Wert_Bar | 0.01 |  bar |
| 00_0010_7341_10_0100_056_1_0| R1-SP-1 | 1 | % |
| 00_0010_7341_10_0100_057_1_0| R2-SP-2 | 1 | % |
| 00_0010_7341_10_0100_058_1_0| R3-BLP/1 | 1 | % |
| 00_0010_7341_10_0100_059_1_0| R4-SV1/V-RLU | 1 | % |
| 00_0010_7341_10_0100_060_1_0| R5-HKP1 | 1 | % |
| 00_0010_7341_10_0100_061_1_0| R6-MV-1 auf | 1 | % |
| 00_0010_7341_10_0100_062_1_0| R7-MV-1 zu | 1 | % |
| 00_0010_7341_10_0100_063_1_0| R8-KLP-1/HKP-2 | 1 | % |
| 00_0010_7341_10_0100_064_1_0| R9-KLP-2/SP-3 | 1 | % |
| 00_0010_7341_10_0100_065_1_0| R10-SV-2/HKP-2/V-RL | 1 | % |
| 00_0010_7341_10_0100_066_1_0| R11-MV-2 auf/BLP-2/SV-3 | 1 | % |
| 00_0010_7341_10_0100_067_1_0| R12-MV-2 zu/SV-3/V-RLU | 1 | % |
| 00_0010_7341_10_0100_068_1_0| R13-ZP | 1 | % |
| 00_0010_7341_10_0100_069_1_0| R14-RP | 1 | % |
| 00_0010_7341_10_0100_072_2_0| Hk1_T_VorlSoll | 0.1 |  °C |
| 00_0010_7341_10_0100_074_2_0| Hk2_T_VorlSoll | 0.1 |  °C |
| 00_0010_7341_10_0100_076_2_0| Hk3_T_VorlSoll | 0.1 |  °C |
| 00_0010_7341_10_0100_078_2_0| Hk4_T_VorlSoll | 0.1 |  °C |
| 00_0010_7341_10_0100_080_2_0| Hk5_T_VorlSoll | 0.1 |  °C |
| 00_0010_7341_10_0100_082_2_0| SW_VL_Soll | 0.1 |  °C |
| 00_0010_7341_10_0100_084_4_0| Wmz1_Wert_Wh | 1 |  Wh |
| 00_0010_7341_10_0100_088_4_0| Wmz2_Wert_Wh | 1 |  Wh |
| 00_0010_7341_10_0100_092_4_0| Systemdatum | 1 |  |
| 00_0010_7341_10_0100_096_4_0| SensorBenutzt bit 0..31 | 1 |  |
| 00_0010_7341_10_0100_100_4_0| SensorBenutzt bit 31..63 | 1 |  |
| 00_0010_7341_10_0100_104_4_0| Error SensorBruch bit 0..31 | 1 |  |
| 00_0010_7341_10_0100_108_4_0| Error SensorBruch bit 31..63 | 1 |  |
| 00_0010_7341_10_0100_112_4_0| Error SensorKurzschluss bit 0..31 | 1 |  |
| 00_0010_7341_10_0100_116_4_0| Error SensorKurzschluss bit 31..63 | 1 |  |
| 00_0010_7341_10_0100_120_2_0| Errormask | 1 |  |
| 00_0010_7341_10_0100_122_2_0| Warningmask | 1 |  |
| 00_0010_7341_10_0100_124_2_0| Systemflow.Parameteraenderungen | 1 |  |



### <a name="0010_7342_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 1 (0x7342), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7342_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7342_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7342_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7342_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7342_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7342_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7342_10_0100_012_1_0| Drehzahl R1 | 1 | % |
| 00_0010_7342_10_0100_013_1_0| Drehzahl R2 | 1 | % |
| 00_0010_7342_10_0100_014_1_0| Drehzahl R3 | 1 | % |
| 00_0010_7342_10_0100_015_1_0| Drehzahl R4 | 1 | % |
| 00_0010_7342_10_0100_016_1_0| Drehzahl R5 | 1 | % |



### <a name="0010_7343_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 2 (0x7343), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7343_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7343_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7343_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7343_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7343_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7343_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7343_10_0100_012_1_0| Drehzahl R1 | 1 | % |
| 00_0010_7343_10_0100_013_1_0| Drehzahl R2 | 1 | % |
| 00_0010_7343_10_0100_014_1_0| Drehzahl R3 | 1 | % |
| 00_0010_7343_10_0100_015_1_0| Drehzahl R4 | 1 | % |
| 00_0010_7343_10_0100_016_1_0| Drehzahl R5 | 1 | % |



### <a name="0010_7344_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 3 (0x7344), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7344_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7344_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7344_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7344_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7344_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7344_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7344_10_0100_012_1_0| Drehzahl R1 | 1 | % |
| 00_0010_7344_10_0100_013_1_0| Drehzahl R2 | 1 | % |
| 00_0010_7344_10_0100_014_1_0| Drehzahl R3 | 1 | % |
| 00_0010_7344_10_0100_015_1_0| Drehzahl R4 | 1 | % |
| 00_0010_7344_10_0100_016_1_0| Drehzahl R5 | 1 | % |



### <a name="0010_7345_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 4 (0x7345), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7345_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7345_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7345_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7345_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7345_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7345_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7345_10_0100_012_1_0| Drehzahl R1 | 1 | % |
| 00_0010_7345_10_0100_013_1_0| Drehzahl R2 | 1 | % |
| 00_0010_7345_10_0100_014_1_0| Drehzahl R3 | 1 | % |
| 00_0010_7345_10_0100_015_1_0| Drehzahl R4 | 1 | % |
| 00_0010_7345_10_0100_016_1_0| Drehzahl R5 | 1 | % |



### <a name="0010_7346_0100"></a>DFA (0x0010) <= SLR XT-Erweiterungsmodul 5 (0x7346), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7346_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7346_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7346_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7346_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7346_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7346_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7346_10_0100_012_1_0| Drehzahl R1 | 1 | % |
| 00_0010_7346_10_0100_013_1_0| Drehzahl R2 | 1 | % |
| 00_0010_7346_10_0100_014_1_0| Drehzahl R3 | 1 | % |
| 00_0010_7346_10_0100_015_1_0| Drehzahl R4 | 1 | % |
| 00_0010_7346_10_0100_016_1_0| Drehzahl R5 | 1 | % |



### <a name="0010_7411_0100"></a>DFA (0x0010) <= DeltaSol ES (0x7411), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7411_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7411_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7411_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7411_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7411_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7411_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7411_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7411_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7411_10_0100_016_2_0| Volumenstrom | 0.01 |  m³/h |
| 00_0010_7411_10_0100_018_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_7411_10_0100_021_1_0| Drehzahl 1 | 1 | % |
| 00_0010_7411_10_0100_022_1_0| Drehzahl 2 | 1 | % |
| 00_0010_7411_10_0100_023_1_0| Drehzahl 3 | 1 | % |
| 00_0010_7411_10_0100_020_1_8| Relais 4 | 1 |  |
| 00_0010_7411_10_0100_020_1_16| Relais 5 | 1 |  |
| 00_0010_7411_10_0100_020_1_32| Relais 6 | 1 |  |
| 00_0010_7411_10_0100_024_2_0| Systemzeit | 1 |  |
| 00_0010_7411_10_0100_026_1_0| Schema | 1 |  |
| 00_0010_7411_10_0100_027_1_1| Option: Kollektorkühlung | 1 |  |
| 00_0010_7411_10_0100_027_1_2| Option: Kollektorminimalbegrenzung | 1 |  |
| 00_0010_7411_10_0100_027_1_4| Option: Frostschutzfunktion | 1 |  |
| 00_0010_7411_10_0100_027_1_8| Option: Röhrenkollektorfunktion | 1 |  |
| 00_0010_7411_10_0100_027_1_16| Option: Rückkühlung | 1 |  |
| 00_0010_7411_10_0100_027_1_32| Option: Wärmemengenzählung | 1 |  |
| 00_0010_7411_10_0100_028_2_0| Betriebsstunden 1 | 1 |  h |
| 00_0010_7411_10_0100_030_2_0| Betriebsstunden 2 | 1 |  h |
| 00_0010_7411_10_0100_032_2_0| Betriebsstunden 3 | 1 |  h |
| 00_0010_7411_10_0100_034_2_0| Betriebsstunden 4 | 1 |  h |
| 00_0010_7411_10_0100_036_2_0| Betriebsstunden 5 | 1 |  h |
| 00_0010_7411_10_0100_038_2_0| Betriebsstunden 6 | 1 |  h |
| 00_0010_7411_10_0100_040_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_7421_0100"></a>DFA (0x0010) <= DeltaSol BX (0x7421), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7421_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7421_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7421_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7421_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7421_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7421_10_0100_010_2_0| Temperatur RPS | 0.1 |  °C |
| 00_0010_7421_10_0100_012_2_0| Druck RPS | 0.1 |  bar |
| 00_0010_7421_10_0100_014_2_0| Temperatur VFS | 0.1 |  °C |
| 00_0010_7421_10_0100_016_2_0| Durchfluss VFS | 1 |  l/h |
| 00_0010_7421_10_0100_024_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7421_10_0100_025_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7421_10_0100_026_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7421_10_0100_027_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7421_10_0100_022_1_0| PWM 1 | 1 | % |
| 00_0010_7421_10_0100_023_1_0| PWM 2 | 1 | % |
| 00_0010_7421_10_0100_016_2_0_1| Durchfluss VFS | 1 |  l/h |
| 00_0010_7421_10_0100_018_2_0| Durchfluss V40 | 1 |  l/h |
| 00_0010_7421_10_0100_048_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7421_10_0100_054_2_0| Systemzeit | 1 |  |
| 00_0010_7421_10_0100_056_4_0| Datum | 1 |  |
| 00_0010_7421_10_0100_052_2_0| Version | 0.01 |  |
| 00_0010_7421_10_0100_028_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_7421_10_0100_032_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_7421_10_0100_036_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_7421_10_0100_040_4_0| Betriebssekunden Relais 4 | 1 |  s |
| 00_0010_7421_10_0100_046_2_0| Status | 1 |  |
| 00_0010_7421_10_0100_046_1_1| Blockierschutz 1 | 1 |  |
| 00_0010_7421_10_0100_046_1_2| Blockierschutz 2 | 1 |  |
| 00_0010_7421_10_0100_046_1_4| Blockierschutz 3 | 1 |  |
| 00_0010_7421_10_0100_046_1_8| Blockierschutz 4 | 1 |  |
| 00_0010_7421_10_0100_046_1_16| Initialisierung | 1 |  |
| 00_0010_7421_10_0100_046_1_32| Befüllung | 1 |  |
| 00_0010_7421_10_0100_046_1_64| Stabilisierung | 1 |  |
| 00_0010_7421_10_0100_046_1_128| Pumpenverzögerung | 1 |  |
| 00_0010_7421_10_0100_047_1_1| Überwärmeabfuhr | 1 |  |
| 00_0010_7421_10_0100_047_1_2| Nachlauf | 1 |  |
| 00_0010_7421_10_0100_047_1_4| Thermische Desinfektion | 1 |  |
| 00_0010_7421_10_0100_047_1_8| Systemkühlung | 1 |  |
| 00_0010_7421_10_0100_047_1_16| Speicherkühlung | 1 |  |
| 00_0010_7421_10_0100_047_1_32| Spreizung | 1 |  |
| 00_0010_7421_10_0100_047_1_64| Frostschutz | 1 |  |
| 00_0010_7421_10_0100_047_1_128| Kollektorkühlung | 1 |  |
| 00_0010_7421_10_0100_020_1_0| Einheit | 1 |  |
| 00_0010_7421_10_0100_044_2_0| Fehler | 1 |  |
| 00_0010_7421_10_0100_044_1_1| Fehler S1 | 1 |  |
| 00_0010_7421_10_0100_044_1_2| Fehler S2 | 1 |  |
| 00_0010_7421_10_0100_044_1_4| Fehler S3 | 1 |  |
| 00_0010_7421_10_0100_044_1_8| Fehler S4 | 1 |  |
| 00_0010_7421_10_0100_044_1_16| Fehler S5 | 1 |  |
| 00_0010_7421_10_0100_044_1_32| Fehler S6 | 1 |  |
| 00_0010_7421_10_0100_044_1_64| Fehler S7 | 1 |  |
| 00_0010_7421_10_0100_044_1_128| Fehler S8 | 1 |  |
| 00_0010_7421_10_0100_045_1_1| Fehler S9 | 1 |  |
| 00_0010_7421_10_0100_045_1_2| Fehler V40 | 1 |  |
| 00_0010_7421_10_0100_045_1_4| Leckage | 1 |  |
| 00_0010_7421_10_0100_045_1_8| Überdruck | 1 |  |
| 00_0010_7421_10_0100_045_1_16| Durchflussfehler | 1 |  |



### <a name="0010_7428_0100"></a>DFA (0x0010) <= DeltaSol BXL (0x7428), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7428_10_0100_000_2_0| S1 | 0.1 |  °C |
| 00_0010_7428_10_0100_002_2_0| S2 | 0.1 |  °C |
| 00_0010_7428_10_0100_004_2_0| S3 | 0.1 |  °C |
| 00_0010_7428_10_0100_006_2_0| S4 | 0.1 |  °C |
| 00_0010_7428_10_0100_008_2_0| S5 | 0.1 |  °C |
| 00_0010_7428_10_0100_024_1_0| DR 1 | 1 | % |
| 00_0010_7428_10_0100_025_1_0| DR 2 | 1 | % |
| 00_0010_7428_10_0100_026_1_0| DR 3 | 1 | % |
| 00_0010_7428_10_0100_027_1_0| DR 4 | 1 | % |
| 00_0010_7428_10_0100_018_2_0| Flow V40 | 1 |  l/h |
| 00_0010_7428_10_0100_048_4_0| Wärme | 1 |  Wh |
| 00_0010_7428_10_0100_054_2_0| Zeit | 1 |  |
| 00_0010_7428_10_0100_056_4_0| Datum | 1 |  |
| 00_0010_7428_10_0100_052_2_0| Version | 0.01 |  |
| 00_0010_7428_10_0100_028_4_0| BSR 1 | 1 |  s |
| 00_0010_7428_10_0100_032_4_0| BSR 2 | 1 |  s |
| 00_0010_7428_10_0100_036_4_0| BSR 3 | 1 |  s |
| 00_0010_7428_10_0100_040_4_0| BSR 4 | 1 |  s |
| 00_0010_7428_10_0100_046_2_0| Regelstatus | 1 |  |
| 00_0010_7428_10_0100_046_1_1| BLSC 1 | 1 |  |
| 00_0010_7428_10_0100_046_1_2| BLSC 2 | 1 |  |
| 00_0010_7428_10_0100_046_1_4| BLSC 3 | 1 |  |
| 00_0010_7428_10_0100_046_1_8| BLSC 4 | 1 |  |
| 00_0010_7428_10_0100_046_1_32| DeltaT-FKT | 1 |  |
| 00_0010_7428_10_0100_046_1_64| Thermostat | 1 |  |
| 00_0010_7428_10_0100_046_1_128| Pumpenverzögerung | 1 |  |
| 00_0010_7428_10_0100_047_1_1| Überwärmeabfuhr | 1 |  |
| 00_0010_7428_10_0100_047_1_4| Thermische Desinfektion | 1 |  |
| 00_0010_7428_10_0100_047_1_8| Systemkühlung | 1 |  |
| 00_0010_7428_10_0100_047_1_16| Speicherkühlung | 1 |  |
| 00_0010_7428_10_0100_047_1_32| Spreizung | 1 |  |
| 00_0010_7428_10_0100_047_1_64| Frostschutz | 1 |  |
| 00_0010_7428_10_0100_047_1_128| Kollektorkühlung | 1 |  |
| 00_0010_7428_10_0100_020_1_0| Einheit | 1 |  |
| 00_0010_7428_10_0100_044_2_0| Fehler | 1 |  |
| 00_0010_7428_10_0100_044_1_1| Fehler S1 | 1 |  |
| 00_0010_7428_10_0100_044_1_2| Fehler S2 | 1 |  |
| 00_0010_7428_10_0100_044_1_4| Fehler S3 | 1 |  |
| 00_0010_7428_10_0100_044_1_8| Fehler S4 | 1 |  |
| 00_0010_7428_10_0100_044_1_16| Fehler S5 | 1 |  |
| 00_0010_7428_10_0100_045_1_2| Fehler V40 | 1 |  |



### <a name="0010_7441_0100"></a>DFA (0x0010) <= ZEN DT6 \[Regler\] (0x7441), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7441_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7441_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7441_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7441_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7441_10_0100_012_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7441_10_0100_013_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7441_10_0100_014_1_0| Regler Ausgang 1 | 1 | % |
| 00_0010_7441_10_0100_016_4_0| Wmz1_Wert_Wh | 1 |  Wh |
| 00_0010_7441_10_0100_020_4_0| SW-Version | 1 |  |
| 00_0010_7441_10_0100_024_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_7441_10_0100_028_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_7441_10_0100_032_4_0| Initalisieren | 1 |  |
| 00_0010_7441_10_0100_036_4_0| Befüllung | 1 |  |
| 00_0010_7441_10_0100_040_4_0| Stabilisieren | 1 |  |
| 00_0010_7441_10_0100_044_1_0| Frostschutz | 1 |  |
| 00_0010_7441_10_0100_045_1_1| Einheit Temperatur | 1 |  |
| 00_0010_7441_10_0100_046_1_1| Einheit Durchfluss | 1 |  |
| 00_0010_7441_10_0100_047_1_1| Einheit Druck | 1 |  |
| 00_0010_7441_10_0100_048_1_1| Einheit Leistung | 1 |  |
| 00_0010_7441_10_0100_049_1_1| Einheit Energie | 1 |  |
| 00_0010_7441_10_0100_050_1_1| VDI dT zu hoch | 1 |  |
| 00_0010_7441_10_0100_052_4_0| Fehlermaske | 1 |  |



### <a name="0010_7442_0100"></a>DFA (0x0010) <= ZEN DT6 \[WMZ1\] (0x7442), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7442_10_0100_000_4_0| Wmz1_Wert_Wh | 1 |  Wh |
| 00_0010_7442_10_0100_004_4_0| Wmz1_Leistung_W | 1 |  W |
| 00_0010_7442_10_0100_008_4_0| Wmz1_WertHeute_Wh | 1 |  Wh |
| 00_0010_7442_10_0100_012_4_0| Wmz1_WertWoche_Wh | 1 |  Wh |



### <a name="0010_7511_0100"></a>DFA (0x0010) <= SOLTEX-Regler \[Teil 1\] (0x7511), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7511_10_0100_000_2_0| Temperatur Kollektoren | 0.1 |  °C |
| 00_0010_7511_10_0100_002_2_0| Temperatur S,p | 0.1 |  °C |
| 00_0010_7511_10_0100_004_2_0| Temperatur S,s | 0.1 |  °C |
| 00_0010_7511_10_0100_006_2_0| Temperatur WP-VL | 0.1 |  °C |
| 00_0010_7511_10_0100_008_2_0| Temperatur WP-RL | 0.1 |  °C |
| 00_0010_7511_10_0100_010_2_0| Temperatur Verdampf | 0.1 |  °C |
| 00_0010_7511_10_0100_012_2_0| Temperatur Erde | 0.1 |  °C |
| 00_0010_7511_10_0100_014_2_0| Volumenstrom Ko | 0.1 |  l/min |
| 00_0010_7511_10_0100_018_1_0| Leistung P,Ko | 1 | % |
| 00_0010_7511_10_0100_019_1_0| Leistung P,S | 1 | % |
| 00_0010_7511_10_0100_016_1_4| Relais P,H | 1 |  |
| 00_0010_7511_10_0100_016_1_8| Relais WP | 1 |  |
| 00_0010_7511_10_0100_016_1_16| Ventil WP | 1 |  |
| 00_0010_7511_10_0100_016_1_32| Ventil SW | 1 |  |
| 00_0010_7511_10_0100_016_1_64| Ventil Ko | 1 |  |
| 00_0010_7511_10_0100_016_1_128| Ventil So | 1 |  |
| 00_0010_7511_10_0100_017_1_1| Ventil SP | 1 |  |
| 00_0010_7511_10_0100_020_4_0| Fehlermaske | 1 |  |
| 00_0010_7511_10_0100_025_1_0| P,Ko Nennleistung | 1 | % |
| 00_0010_7511_10_0100_026_2_0| T_Wabs | 0.1 |  °C |
| 00_0010_7511_10_0100_028_4_0| Wärmemenge S,p | 0.1 |  kWh |
| 00_0010_7511_10_0100_032_4_0| Wärmemenge S,s | 0.1 |  kWh |
| 00_0010_7511_10_0100_036_2_0| Diff. TUmg/24h | 0.1 |  K |
| 00_0010_7511_10_0100_038_2_0| Diff. TSs/8h | 0.1 |  K |
| 00_0010_7511_10_0100_040_2_0| Diff. TSs/1h | 0.1 |  K |
| 00_0010_7511_10_0100_042_2_0| Betriebssekunden WP | 1 |  s |
| 00_0010_7511_10_0100_044_4_0| Zeitraum WP / 24h | 1 |  s |
| 00_0010_7511_10_0100_048_4_0| Laufzeit WP / 24h | 1 |  s |
| 00_0010_7511_10_0100_056_2_0| Temperatur T,H | 0.1 |  °C |
| 00_0010_7511_10_0100_058_2_0| Systemzeit | 1 |  |



### <a name="0010_7512_0100"></a>DFA (0x0010) <= SOLTEX-Regler \[Teil 2\] (0x7512), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7512_10_0100_000_4_0| t-Sp | 1 |  s |
| 00_0010_7512_10_0100_004_4_0| t-Ss | 1 |  s |
| 00_0010_7512_10_0100_008_4_0| Laufzeit WP | 1 |  s |
| 00_0010_7512_10_0100_012_4_0| Anzahl WP-Starts | 1 |  |
| 00_0010_7512_10_0100_016_4_0| t-WP-Ss | 1 |  s |
| 00_0010_7512_10_0100_020_4_0| t-Ps | 1 |  s |
| 00_0010_7512_10_0100_024_2_0| Temperatur T-x | 0.1 |  °C |
| 00_0010_7512_10_0100_026_2_0| Temperatur T-xx | 0.1 |  °C |
| 00_0010_7512_10_0100_028_2_0| C1 | 0.01 |  |
| 00_0010_7512_10_0100_030_2_0| Version | 0.01 |  |



### <a name="0010_7513_0100"></a>DFA (0x0010) <= SOLTEX 5VH3 (0x7513), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7513_10_0100_000_2_0| T,Ko | 0.1 |  °C |
| 00_0010_7513_10_0100_002_2_0| T,Sp | 0.1 |  °C |
| 00_0010_7513_10_0100_004_2_0| T,Ss | 0.1 |  °C |
| 00_0010_7513_10_0100_006_2_0| T,Kr | 0.1 |  °C |
| 00_0010_7513_10_0100_008_2_0| T,R | 0.1 |  °C |
| 00_0010_7513_10_0100_010_2_0| T,V | 0.1 |  °C |
| 00_0010_7513_10_0100_024_2_0| T,Erd | 0.1 |  °C |
| 00_0010_7513_10_0100_026_2_0| Volumenstrom Ko | 0.1 |  l/min |
| 00_0010_7513_10_0100_032_1_0| Leistung P,Ko | 1 | % |
| 00_0010_7513_10_0100_033_1_0| Leistung P,S | 1 | % |
| 00_0010_7513_10_0100_030_1_4| Relais P,W | 1 |  |
| 00_0010_7513_10_0100_030_1_8| Relais WP | 1 |  |
| 00_0010_7513_10_0100_030_1_16| Relais V,WP | 1 |  |
| 00_0010_7513_10_0100_030_1_32| Relais V,SW | 1 |  |
| 00_0010_7513_10_0100_030_1_64| Relais V,Ko | 1 |  |
| 00_0010_7513_10_0100_030_1_128| Relais V,So | 1 |  |
| 00_0010_7513_10_0100_030_1_256| Relais V,Sp | 1 |  |
| 00_0010_7513_10_0100_036_4_0| Fehlermaske | 1 |  |
| 00_0010_7513_10_0100_035_1_0| P,Ko Nennleistung | 1 | % |
| 00_0010_7513_10_0100_040_4_0| Q S,p | 0.1 |  kWh |
| 00_0010_7513_10_0100_044_4_0| Q S,s | 0.1 |  kWh |
| 00_0010_7513_10_0100_016_2_0| T,HR | 0.1 |  °C |
| 00_0010_7513_10_0100_018_2_0| T,HV | 0.1 |  °C |
| 00_0010_7513_10_0100_030_1_512| Relais V,TH | 1 |  |
| 00_0010_7513_10_0100_030_1_1024| Relais V,SH | 1 |  |
| 00_0010_7513_10_0100_034_1_0| Leistung P,H | 1 | % |
| 00_0010_7513_10_0100_048_2_0| Systemzeit | 1 |  |
| 00_0010_7513_10_0100_020_2_0| T,x | 0.1 |  °C |
| 00_0010_7513_10_0100_022_2_0| T,xx | 0.1 |  °C |
| 00_0010_7513_10_0100_050_2_0| C1 | 0.01 |  |



### <a name="0010_7521_0100"></a>DFA (0x0010) <= Oventrop RQ-B / RQ-B HE (0x7521), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7521_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7521_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7521_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7521_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7521_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7521_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7521_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7521_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7521_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7521_10_0100_018_2_0| Durchfluss Sensor 10 | 0.1 |  l/min |
| 00_0010_7521_10_0100_020_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7521_10_0100_021_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7521_10_0100_022_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7521_10_0100_024_2_0| Drehzahl Relais 4 | 0.1 | % |
| 00_0010_7521_10_0100_023_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7521_10_0100_026_1_1| Fehler | 1 |  |
| 00_0010_7521_10_0100_027_1_0| Desinf. Phase | 1 |  |
| 00_0010_7521_10_0100_028_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_7521_10_0100_032_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_7521_10_0100_036_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_7521_10_0100_040_4_0| Betriebssekunden Relais 4 | 1 |  s |
| 00_0010_7521_10_0100_044_4_0| Betriebssekunden Relais 5 | 1 |  s |
| 00_0010_7521_10_0100_048_3_0| Funktionen | 1 |  |
| 00_0010_7521_10_0100_048_1_1| WW-Bereitung | 1 |  |
| 00_0010_7521_10_0100_048_1_2| Blockierschutz R4 | 1 |  |
| 00_0010_7521_10_0100_048_1_4| Blockierschutz R2 | 1 |  |
| 00_0010_7521_10_0100_048_1_8| Kaltwasser | 1 |  |
| 00_0010_7521_10_0100_048_1_16| Zirkulationserfassung | 1 |  |
| 00_0010_7521_10_0100_048_1_32| Warmstart | 1 |  |
| 00_0010_7521_10_0100_048_1_64| Dauerzirkulation | 1 |  |
| 00_0010_7521_10_0100_048_1_128| Thermische Zirkulation | 1 |  |
| 00_0010_7521_10_0100_049_1_1| Anforderungszirkulation | 1 |  |
| 00_0010_7521_10_0100_049_1_2| Nachheizung | 1 |  |
| 00_0010_7521_10_0100_049_1_4| Desinfektionsnachheizung | 1 |  |
| 00_0010_7521_10_0100_049_1_8| Desinfektionszirkulation | 1 |  |
| 00_0010_7521_10_0100_049_1_16| Desinfektionsspülung | 1 |  |
| 00_0010_7521_10_0100_049_1_32| Fehlerrelais | 1 |  |
| 00_0010_7521_10_0100_049_1_64| Rücklaufeinschichtung | 1 |  |
| 00_0010_7521_10_0100_049_1_128| Funktionsblock 1 | 1 |  |
| 00_0010_7521_10_0100_050_1_1| Funktionsblock 2 | 1 |  |
| 00_0010_7521_10_0100_051_1_1| Kaltstart | 1 |  |
| 00_0010_7521_10_0100_051_1_2| Wärmepumpe | 1 |  |
| 00_0010_7521_10_0100_051_1_4| Sollwertanpassung | 1 |  |
| 00_0010_7521_10_0100_052_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7521_10_0100_056_2_0| Version | 0.01 |  |
| 00_0010_7521_10_0100_058_2_0| Systemzeit | 1 |  |
| 00_0010_7521_10_0100_060_4_0| Datum | 1 |  |



### <a name="0010_7522_0100"></a>DFA (0x0010) <= Regtronic RX-B \[Regler\] (0x7522), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7522_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7522_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7522_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7522_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7522_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7522_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7522_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7522_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7522_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7522_10_0100_020_2_0| Temperatur Sensor Gds1 | 0.1 |  °C |
| 00_0010_7522_10_0100_022_2_0| Temperatur Sensor Gds2 | 0.1 |  °C |
| 00_0010_7522_10_0100_018_2_0| Einstrahlung Sensor | 1 |  W/m² |
| 00_0010_7522_10_0100_024_4_0| Volumenstrom Sensor V40 | 1 |  l/h |
| 00_0010_7522_10_0100_028_4_0| Volumenstrom Sensor Gds1 | 1 |  l/h |
| 00_0010_7522_10_0100_032_4_0| Volumenstrom Sensor Gds2 | 1 |  l/h |
| 00_0010_7522_10_0100_036_2_0| Druck Sensor Gds1 | 0.01 |  bar |
| 00_0010_7522_10_0100_038_2_0| Druck Sensor Gds2 | 0.01 |  bar |
| 00_0010_7522_10_0100_040_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7522_10_0100_041_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7522_10_0100_042_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7522_10_0100_043_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7522_10_0100_044_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7522_10_0100_048_4_0| Systemdatum | 1 |  |
| 00_0010_7522_10_0100_052_4_0| Fehlermaske | 1 |  |
| 00_0010_7522_10_0100_052_1_1| Fehler: Sensorfehler oder Volumenstromüberwachung | 1 |  |
| 00_0010_7522_10_0100_052_1_2| Fehler: Modulfehler | 1 |  |
| 00_0010_7522_10_0100_052_1_4| Fehler: ΔT zu hoch | 1 |  |
| 00_0010_7522_10_0100_052_1_8| Fehler: Überladeschutz | 1 |  |
| 00_0010_7522_10_0100_052_1_16| Fehler: Abbruch Überwärmeabfuhr | 1 |  |



### <a name="0010_7523_0100"></a>DFA (0x0010) <= Regtronic RX-B \[Module\] (0x7523), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7523_10_0100_000_2_0| Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 00_0010_7523_10_0100_002_2_0| Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 00_0010_7523_10_0100_004_2_0| Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 00_0010_7523_10_0100_006_2_0| Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 00_0010_7523_10_0100_008_2_0| Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 00_0010_7523_10_0100_010_2_0| Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 00_0010_7523_10_0100_012_2_0| Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 00_0010_7523_10_0100_014_2_0| Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 00_0010_7523_10_0100_016_2_0| Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 00_0010_7523_10_0100_018_2_0| Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 00_0010_7523_10_0100_020_2_0| Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 00_0010_7523_10_0100_022_2_0| Temperatur Modul 2 Sensor 6 | 0.1 |  °C |
| 00_0010_7523_10_0100_024_2_0| Temperatur Modul 3 Sensor 1 | 0.1 |  °C |
| 00_0010_7523_10_0100_026_2_0| Temperatur Modul 3 Sensor 2 | 0.1 |  °C |
| 00_0010_7523_10_0100_028_2_0| Temperatur Modul 3 Sensor 3 | 0.1 |  °C |
| 00_0010_7523_10_0100_030_2_0| Temperatur Modul 3 Sensor 4 | 0.1 |  °C |
| 00_0010_7523_10_0100_032_2_0| Temperatur Modul 3 Sensor 5 | 0.1 |  °C |
| 00_0010_7523_10_0100_034_2_0| Temperatur Modul 3 Sensor 6 | 0.1 |  °C |
| 00_0010_7523_10_0100_036_2_0| Temperatur Modul 4 Sensor 1 | 0.1 |  °C |
| 00_0010_7523_10_0100_038_2_0| Temperatur Modul 4 Sensor 2 | 0.1 |  °C |
| 00_0010_7523_10_0100_040_2_0| Temperatur Modul 4 Sensor 3 | 0.1 |  °C |
| 00_0010_7523_10_0100_042_2_0| Temperatur Modul 4 Sensor 4 | 0.1 |  °C |
| 00_0010_7523_10_0100_044_2_0| Temperatur Modul 4 Sensor 5 | 0.1 |  °C |
| 00_0010_7523_10_0100_046_2_0| Temperatur Modul 4 Sensor 6 | 0.1 |  °C |
| 00_0010_7523_10_0100_048_2_0| Temperatur Modul 5 Sensor 1 | 0.1 |  °C |
| 00_0010_7523_10_0100_050_2_0| Temperatur Modul 5 Sensor 2 | 0.1 |  °C |
| 00_0010_7523_10_0100_052_2_0| Temperatur Modul 5 Sensor 3 | 0.1 |  °C |
| 00_0010_7523_10_0100_054_2_0| Temperatur Modul 5 Sensor 4 | 0.1 |  °C |
| 00_0010_7523_10_0100_056_2_0| Temperatur Modul 5 Sensor 5 | 0.1 |  °C |
| 00_0010_7523_10_0100_058_2_0| Temperatur Modul 5 Sensor 6 | 0.1 |  °C |



### <a name="0010_7530_0100"></a>DFA (0x0010) <= Regtronic RX-B \[WMZ\] (0x7530 - 0x753F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7530_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7530_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_7530_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |



### <a name="0010_7541_0100"></a>DFA (0x0010) <= Oventrop RQ XXL (0x7541), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7541_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7541_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7541_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7541_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7541_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7541_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7541_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7541_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7541_10_0100_016_2_0| Temperatur Sensor S14/VFD | 0.1 |  °C |
| 00_0010_7541_10_0100_020_4_0| Durchfluss Sensor S8/V40 | 1 |  l/h |
| 00_0010_7541_10_0100_024_4_0| Durchfluss Sensor S14/VFD | 1 |  l/h |
| 00_0010_7541_10_0100_028_2_0| Druck Sensor S14/VFD | 0.01 |  bar |
| 00_0010_7541_10_0100_132_4_0| Durchfluss Turbotron | 1 |  l/h |
| 00_0010_7541_10_0100_030_2_0| Einstrahlung Sensor 9 | 1 |  W/m² |
| 00_0010_7541_10_0100_032_4_0| PWM In Dutycycle 1 | 0.001 | % |
| 00_0010_7541_10_0100_036_4_0| PWM In Dutycycle 2 | 0.001 | % |
| 00_0010_7541_10_0100_040_4_0| PWM In Dutycycle 3 | 0.001 | % |
| 00_0010_7541_10_0100_044_4_0| PWM In Dutycycle 4 | 0.001 | % |
| 00_0010_7541_10_0100_048_4_0| PWM In Frequenz 1 | 0.001 |  Hz |
| 00_0010_7541_10_0100_052_4_0| PWM In Frequenz 2 | 0.001 |  Hz |
| 00_0010_7541_10_0100_056_4_0| PWM In Frequenz 3 | 0.001 |  Hz |
| 00_0010_7541_10_0100_060_4_0| PWM In Frequenz 4 | 0.001 |  Hz |
| 00_0010_7541_10_0100_064_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7541_10_0100_065_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7541_10_0100_066_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7541_10_0100_067_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7541_10_0100_068_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7541_10_0100_072_1_0| Ausgang PWM 1 | 1 | % |
| 00_0010_7541_10_0100_073_1_0| Ausgang PWM 2 | 1 | % |
| 00_0010_7541_10_0100_074_1_0| Ausgang PWM 3 | 1 | % |
| 00_0010_7541_10_0100_075_1_0| Ausgang PWM 4 | 1 | % |
| 00_0010_7541_10_0100_076_4_0| Betriebssekunden Relais 1 | 1 |  s |
| 00_0010_7541_10_0100_080_4_0| Betriebssekunden Relais 2 | 1 |  s |
| 00_0010_7541_10_0100_084_4_0| Betriebssekunden Relais 3 | 1 |  s |
| 00_0010_7541_10_0100_088_4_0| Betriebssekunden Relais 4 | 1 |  s |
| 00_0010_7541_10_0100_092_4_0| Betriebssekunden Relais 5 | 1 |  s |
| 00_0010_7541_10_0100_096_4_0| Betriebssekunden Ausgang PWM 1 | 1 |  s |
| 00_0010_7541_10_0100_100_4_0| Betriebssekunden Ausgang PWM 2 | 1 |  s |
| 00_0010_7541_10_0100_104_4_0| Betriebssekunden Ausgang PWM 3 | 1 |  s |
| 00_0010_7541_10_0100_108_4_0| Betriebssekunden Ausgang PWM 4 | 1 |  s |
| 00_0010_7541_10_0100_112_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7541_10_0100_116_4_0| Fehler | 1 |  |
| 00_0010_7541_10_0100_116_1_1| Sensorfehler S1 | 1 |  |
| 00_0010_7541_10_0100_116_1_2| Sensorfehler S2 | 1 |  |
| 00_0010_7541_10_0100_116_1_4| Sensorfehler S3 | 1 |  |
| 00_0010_7541_10_0100_116_1_8| Sensorfehler S4 | 1 |  |
| 00_0010_7541_10_0100_116_1_16| Sensorfehler S5 | 1 |  |
| 00_0010_7541_10_0100_116_1_32| Sensorfehler S6 | 1 |  |
| 00_0010_7541_10_0100_116_1_64| Sensorfehler S7 | 1 |  |
| 00_0010_7541_10_0100_116_1_128| Sensorfehler S8 | 1 |  |
| 00_0010_7541_10_0100_116_1_8192| Sensorfehler S14 VFD | 1 |  |
| 00_0010_7541_10_0100_116_1_65536| Desinfektion: Vorlauf zu niedrig | 1 |  |
| 00_0010_7541_10_0100_116_1_131072| Desinfektion: Fehlgeschlagen | 1 |  |
| 00_0010_7541_10_0100_116_1_262144| Uebertemperaturschutz aktiv | 1 |  |
| 00_0010_7541_10_0100_120_4_0| Optionsmaske | 1 |  |
| 00_0010_7541_10_0100_124_2_0| Version | 0.01 |  |
| 00_0010_7541_10_0100_128_4_0| Systemdatum | 1 |  |



### <a name="0010_7611_0100"></a>DFA (0x0010) <= Friwa (0x7611), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7611_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7611_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7611_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7611_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7611_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7611_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7611_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7611_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7611_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7611_10_0100_018_2_0| Systemzeit | 1 |  |
| 00_0010_7611_10_0100_020_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7611_10_0100_021_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7611_10_0100_022_1_4| Status Relais 3 | 1 |  |
| 00_0010_7611_10_0100_022_1_8| Status Relais 4 | 1 |  |
| 00_0010_7611_10_0100_023_1_0| Sensordefekt-Maske | 1 |  |
| 00_0010_7611_10_0100_024_1_0| Warmwassersolltemperatur | 1 |  °C |
| 00_0010_7611_10_0100_025_1_0| Optionen | 1 |  |
| 00_0010_7611_10_0100_026_1_0| Status | 1 |  |
| 00_0010_7611_10_0100_028_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_7611_10_0100_034_1_0| Version | 0.01 |  |



### <a name="0010_7621_0100"></a>DFA (0x0010) <= SOLEX \[Regler\] (0x7621), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7621_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7621_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7621_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7621_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7621_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7621_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7621_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7621_10_0100_014_2_0| Durchfluss Sensor 8 | 1 |  l/h |
| 00_0010_7621_10_0100_016_2_0| Einstrahlung Sensor 9 | 1 |  W/m² |
| 00_0010_7621_10_0100_018_2_0| Systemzeit | 1 |  |
| 00_0010_7621_10_0100_020_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7621_10_0100_021_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7621_10_0100_022_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7621_10_0100_023_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7621_10_0100_024_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7621_10_0100_025_2_0| Fehlermaske | 1 |  |
| 00_0010_7621_10_0100_028_2_0| Meldungen | 1 |  |
| 00_0010_7621_10_0100_030_1_0| Version | 0.01 |  |



### <a name="0010_7622_0100"></a>DFA (0x0010) <= SOLEX \[WMZ\] (0x7622), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7622_10_0100_000_2_0| Temperatur Vorlauf | 0.1 |  °C |
| 00_0010_7622_10_0100_002_2_0| Temperatur Rücklauf | 0.1 |  °C |
| 00_0010_7622_10_0100_004_2_0| Durchfluss Sensor 8 | 1 |  l/h |
| 00_0010_7622_10_0100_006_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_7651_0100"></a>DFA (0x0010) <= FriWa Kaskadenmaster Version 1 (0x7651), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7651_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7651_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7651_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7651_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7651_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7651_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7651_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7651_10_0100_014_2_0| Volumenstrom Sensor 8 | 0.1 |  l/min |
| 00_0010_7651_10_0100_016_1_0| Digitaler Eingang 9 | 1 |  |
| 00_0010_7651_10_0100_017_1_0| Status Relais 1 | 1 | % |
| 00_0010_7651_10_0100_018_1_0| Status Relais 2 | 1 | % |
| 00_0010_7651_10_0100_019_1_0| Status Relais 3 | 1 | % |
| 00_0010_7651_10_0100_020_1_0| Status Relais 4 | 1 | % |
| 00_0010_7651_10_0100_021_1_0| Status Relais 5 | 1 | % |
| 00_0010_7651_10_0100_022_1_1| T-Sensor Fehler | 1 |  |
| 00_0010_7651_10_0100_022_1_2| V-Sensor Fehler | 1 |  |
| 00_0010_7651_10_0100_022_1_4| EEPROM-Fehler | 1 |  |
| 00_0010_7651_10_0100_022_1_8| S1 Fehler | 1 |  |
| 00_0010_7651_10_0100_022_1_16| S2 Fehler | 1 |  |
| 00_0010_7651_10_0100_024_2_0| Version | 0.01 |  |
| 00_0010_7651_10_0100_026_2_0| Systemzeit | 1 |  |



### <a name="0010_7711_0100"></a>DFA (0x0010) <= Multitronic \[Regler\] (0x7711), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7711_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7711_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7711_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7711_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7711_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7711_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7711_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7711_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7711_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7711_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7711_10_0100_020_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_7711_10_0100_022_2_0| Impulseingang 1 | 1 |  |
| 00_0010_7711_10_0100_024_2_0| Impulseingang 2 | 1 |  |
| 00_0010_7711_10_0100_026_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7711_10_0100_027_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7711_10_0100_028_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7711_10_0100_029_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7711_10_0100_030_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7711_10_0100_031_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_7711_10_0100_032_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_7711_10_0100_034_2_0| Systemzeit | 1 |  |
| 00_0010_7711_10_0100_036_2_0| Fehlermaske | 1 |  |
| 00_0010_7711_10_0100_038_2_0| Warnungsmaske | 1 |  |
| 00_0010_7711_10_0100_040_2_0| Reglerversion | 1 |  |
| 00_0010_7711_10_0100_042_1_0| System | 1 |  |
| 00_0010_7711_10_0100_043_1_0| Schema | 1 |  |
| 00_0010_7711_10_0100_044_2_0| HK1-VL-Soll | 0.1 |  °C |
| 00_0010_7711_10_0100_046_1_0| HK1-Betriebsstatus | 1 |  |
| 00_0010_7711_10_0100_047_1_0| HK1-Status | 1 |  |
| 00_0010_7711_10_0100_048_2_0| HK2-VL-Soll | 0.1 |  °C |
| 00_0010_7711_10_0100_050_1_0| HK2-Betriebsstatus | 1 |  |
| 00_0010_7711_10_0100_051_1_0| HK2-Status | 1 |  |
| 00_0010_7711_10_0100_052_2_0| HK3-VL-Soll | 0.1 |  °C |
| 00_0010_7711_10_0100_054_1_0| HK3-Betriebsstatus | 1 |  |
| 00_0010_7711_10_0100_055_1_0| HK3-Status | 1 |  |
| 00_0010_7711_10_0100_056_4_0| Sensorbenutzungs-Maske | 1 |  |
| 00_0010_7711_10_0100_060_4_0| Relaisbenutzungsmaske | 1 |  |



### <a name="0010_7712_0100"></a>DFA (0x0010) <= Multitronic \[WMZ\] (0x7712), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7712_10_0100_000_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_7712_10_0100_002_2_0| Rücklauftemperatur | 0.1 |  °C |
| 00_0010_7712_10_0100_004_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7712_10_0100_006_2_0| Wärme | 1 |  Wh |



### <a name="0010_7721_0100"></a>DFA (0x0010) <= DeltaSol E \[Regler\] (0x7721), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7721_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7721_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7721_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7721_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7721_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7721_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7721_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7721_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7721_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7721_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7721_10_0100_020_2_0| Einstrahlung CS | 1 |  W/m² |
| 00_0010_7721_10_0100_022_2_0| Impulse 1 V40 | 1 |  |
| 00_0010_7721_10_0100_024_2_0| Digital Input | 1 |  |
| 00_0010_7721_10_0100_026_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7721_10_0100_027_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7721_10_0100_028_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7721_10_0100_029_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7721_10_0100_030_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7721_10_0100_031_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_7721_10_0100_032_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_7721_10_0100_036_2_0| Fehlermaske | 1 |  |
| 00_0010_7721_10_0100_038_2_0| Meldungen | 1 |  |
| 00_0010_7721_10_0100_040_1_0| System | 1 |  |
| 00_0010_7721_10_0100_042_2_0| Schema | 1 |  |
| 00_0010_7721_10_0100_044_2_0| Vorlauf Soll HK1 Modul Sensor 18 | 0.1 |  °C |
| 00_0010_7721_10_0100_046_2_0| Status HK1 Modul | 1 |  |
| 00_0010_7721_10_0100_048_2_0| Vorlauf Soll HK2 Modul Sensor 25 | 0.1 |  °C |
| 00_0010_7721_10_0100_050_2_0| Status HK2 Modul | 1 |  |
| 00_0010_7721_10_0100_052_2_0| Vorlauf Soll HK3 Modul Sensor 32 | 0.1 |  °C |
| 00_0010_7721_10_0100_054_2_0| Status HK3 Modul | 1 |  |
| 00_0010_7721_10_0100_056_2_0| Vorlauf Soll Heizkreis Sensor 11 | 0.1 |  °C |
| 00_0010_7721_10_0100_058_2_0| Status Heizkreis | 1 |  |
| 00_0010_7721_10_0100_062_2_0| Systemzeit | 1 |  |
| 00_0010_7721_10_0100_064_2_0| Jahr | 1 |  |
| 00_0010_7721_10_0100_066_1_0| Monat | 1 |  |
| 00_0010_7721_10_0100_067_1_0| Tag | 1 |  |
| 00_0010_7721_10_0100_060_1_0| Version | 0.01 |  |



### <a name="0010_7722_0100"></a>DFA (0x0010) <= DeltaSol E \[WMZ\] (0x7722), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7722_10_0100_000_2_0| Temperatur Vorlauf | 0.1 |  °C |
| 00_0010_7722_10_0100_002_2_0| Temperatur Rücklauf | 0.1 |  °C |
| 00_0010_7722_10_0100_004_2_0| Durchfluss Sensor 8 | 1 |  l/h |
| 00_0010_7722_10_0100_006_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_7729_0100"></a>DFA (0x0010) <= DeltaSol E Fahrenheit \[Regler\] (0x7729), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7729_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °F |
| 00_0010_7729_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °F |
| 00_0010_7729_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °F |
| 00_0010_7729_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °F |
| 00_0010_7729_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °F |
| 00_0010_7729_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °F |
| 00_0010_7729_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °F |
| 00_0010_7729_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °F |
| 00_0010_7729_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °F |
| 00_0010_7729_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °F |
| 00_0010_7729_10_0100_020_2_0| Einstrahlung CS | 1 |  W/m² |
| 00_0010_7729_10_0100_022_2_0| Impulse 1 V40 | 1 |  |
| 00_0010_7729_10_0100_024_2_0| Digital Input | 1 |  |
| 00_0010_7729_10_0100_026_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7729_10_0100_027_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7729_10_0100_028_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7729_10_0100_029_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7729_10_0100_030_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7729_10_0100_031_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_7729_10_0100_032_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_7729_10_0100_036_2_0| Fehlermaske | 1 |  |
| 00_0010_7729_10_0100_038_2_0| Meldungen | 1 |  |
| 00_0010_7729_10_0100_040_1_0| System | 1 |  |
| 00_0010_7729_10_0100_042_2_0| Schema | 1 |  |
| 00_0010_7729_10_0100_044_2_0| Vorlauf Soll HK1 Modul Sensor 18 | 0.1 |  °F |
| 00_0010_7729_10_0100_046_2_0| Status HK1 Modul | 1 |  |
| 00_0010_7729_10_0100_048_2_0| Vorlauf Soll HK2 Modul Sensor 25 | 0.1 |  °F |
| 00_0010_7729_10_0100_050_2_0| Status HK2 Modul | 1 |  |
| 00_0010_7729_10_0100_052_2_0| Vorlauf Soll HK3 Modul Sensor 32 | 0.1 |  °F |
| 00_0010_7729_10_0100_054_2_0| Status HK3 Modul | 1 |  |
| 00_0010_7729_10_0100_056_2_0| Vorlauf Soll Heizkreis Sensor 11 | 0.1 |  °F |
| 00_0010_7729_10_0100_058_2_0| Status Heizkreis | 1 |  |
| 00_0010_7729_10_0100_062_2_0| Systemzeit | 1 |  |
| 00_0010_7729_10_0100_064_2_0| Jahr | 1 |  |
| 00_0010_7729_10_0100_066_1_0| Monat | 1 |  |
| 00_0010_7729_10_0100_067_1_0| Tag | 1 |  |
| 00_0010_7729_10_0100_060_1_0| Version | 0.01 |  |



### <a name="0010_772A_0100"></a>DFA (0x0010) <= DeltaSol E Fahrenheit \[WMZ\] (0x772A), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_772A_10_0100_000_2_0| Temperatur Vorlauf | 0.1 |  °F |
| 00_0010_772A_10_0100_002_2_0| Temperatur Rücklauf | 0.1 |  °F |
| 00_0010_772A_10_0100_004_2_0| Durchfluss Sensor 8 | 1 |  l/h |
| 00_0010_772A_10_0100_006_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_7731_0100"></a>DFA (0x0010) <= SOLTOP DeltaSol S2/S3 (0x7731), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7731_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7731_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7731_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7731_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7731_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7731_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7731_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7731_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7731_10_0100_016_1_0| Drehzahl R1 | 1 | % |
| 00_0010_7731_10_0100_017_1_0| Drehzahl R2 | 1 | % |
| 00_0010_7731_10_0100_018_1_0| Drehzahl R3 | 1 | % |
| 00_0010_7731_10_0100_019_1_0| Relaisbyte | 1 |  |
| 00_0010_7731_10_0100_020_2_0| Wärme | 1 |  Wh |
| 00_0010_7731_10_0100_026_1_0| Schema | 1 |  |



### <a name="0010_7751_0100"></a>DFA (0x0010) <= DeDietrich Diemasol C v2007 (0x7751), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7751_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7751_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7751_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7751_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7751_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7751_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7751_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7751_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7751_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7751_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7751_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_7751_10_0100_022_2_0| Volumenstrom | 0.1 |  l/min |
| 00_0010_7751_10_0100_024_1_0| Drehzahl R1 | 1 | % |
| 00_0010_7751_10_0100_025_1_0| Drehzahl R2 | 1 | % |
| 00_0010_7751_10_0100_026_1_0| Drehzahl R3 | 1 | % |
| 00_0010_7751_10_0100_027_1_1| Relaisstatus R4 | 1 |  |
| 00_0010_7751_10_0100_027_1_2| Relaisstatus R5 | 1 |  |
| 00_0010_7751_10_0100_027_1_4| Relaisstatus R6 | 1 |  |
| 00_0010_7751_10_0100_027_1_8| Relaisstatus R7 | 1 |  |
| 00_0010_7751_10_0100_027_1_16| Relaisstatus R8 | 1 |  |
| 00_0010_7751_10_0100_027_1_32| Relaisstatus R9 | 1 |  |
| 00_0010_7751_10_0100_028_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7751_10_0100_032_4_0| Systemdatum | 1 |  |
| 00_0010_7751_10_0100_036_2_0| Systemzeit | 1 |  |
| 00_0010_7751_10_0100_039_1_0| Variante | 1 |  |



### <a name="0010_7761_0100"></a>DFA (0x0010) <= DeltaSol Pool (0x7761), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7761_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7761_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7761_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7761_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7761_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7761_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7761_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7761_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7761_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7761_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7761_10_0100_020_2_0| Einstrahlung CS | 1 |  W/m² |
| 00_0010_7761_10_0100_022_2_0| Impulse 1 V40 | 1 |  |
| 00_0010_7761_10_0100_024_2_0| Digital Input | 1 |  |
| 00_0010_7761_10_0100_026_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7761_10_0100_027_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7761_10_0100_028_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7761_10_0100_029_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7761_10_0100_030_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7761_10_0100_031_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_7761_10_0100_032_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_7761_10_0100_033_2_0| Fehlermaske | 1 |  |
| 00_0010_7761_10_0100_036_4_0| Meldungen | 1 |  |
| 00_0010_7761_10_0100_040_2_0| Filterlaufzeit | 1 |  min |
| 00_0010_7761_10_0100_046_2_0| Systemzeit | 1 |  |
| 00_0010_7761_10_0100_048_2_0| Jahr | 1 |  |
| 00_0010_7761_10_0100_050_1_0| Monat | 1 |  |
| 00_0010_7761_10_0100_051_1_0| Tag | 1 |  |
| 00_0010_7761_10_0100_044_1_0| Version | 0.01 |  |
| 00_0010_7761_10_0100_052_4_0| Umwaelzzeitzähler | 1 |  s |
| 00_0010_7761_10_0100_056_4_0| Extra-Filterzeit | 1 |  s |
| 00_0010_7761_10_0100_060_4_0| Pumpenüberwachung | 1 |  s |
| 00_0010_7761_10_0100_064_4_0| Solar Min. Ein/Aus | 1 |  s |
| 00_0010_7761_10_0100_068_4_0| Sim5 | 1 |  |
| 00_0010_7761_10_0100_072_4_0| Dauer Regelungsblock | 1 |  ms |
| 00_0010_7761_10_0100_044_1_0_1| Solarphase | 1 |  |
| 00_0010_7761_10_0100_036_1_1| Solar dTein | 1 |  |
| 00_0010_7761_10_0100_036_1_67108864| Solar dTaus | 1 |  |
| 00_0010_7761_10_0100_036_1_2| CS ein | 1 |  |
| 00_0010_7761_10_0100_036_1_4| Solar Mindestein | 1 |  |
| 00_0010_7761_10_0100_036_1_8| Solar Mindestaus | 1 |  |
| 00_0010_7761_10_0100_036_1_16| Beckenmax. | 1 |  |
| 00_0010_7761_10_0100_036_1_32| Filtermin. | 1 |  |
| 00_0010_7761_10_0100_036_1_64| Nachheizung | 1 |  |
| 00_0010_7761_10_0100_036_1_128| Solar Nachheizung | 1 |  |
| 00_0010_7761_10_0100_036_1_256| dT Solar Nachheizung | 1 |  |
| 00_0010_7761_10_0100_036_1_512| Umwälzung | 1 |  |
| 00_0010_7761_10_0100_036_1_1024| Kollektorabschaltung | 1 |  |
| 00_0010_7761_10_0100_036_1_2048| Kollektorminimal | 1 |  |
| 00_0010_7761_10_0100_036_1_262144| T Beckenkühlfkt | 1 |  |
| 00_0010_7761_10_0100_036_1_524288| dT Beckenkühlfkt ein | 1 |  |
| 00_0010_7761_10_0100_036_1_4096| dT Beckenkühlfkt aus | 1 |  |
| 00_0010_7761_10_0100_036_1_8192| Vorlaufbegrenzung | 1 |  |
| 00_0010_7761_10_0100_036_1_16384| Extra Filterlaufzeit | 1 |  |
| 00_0010_7761_10_0100_036_1_32768| Externe Reglerfreigabe | 1 |  |
| 00_0010_7761_10_0100_036_1_65536| Fehlerrelais | 1 |  |
| 00_0010_7761_10_0100_036_1_524288_1| Solarkreis ein | 1 |  |
| 00_0010_7761_10_0100_036_1_1048576| Filter eingeschaltet | 1 |  |
| 00_0010_7761_10_0100_036_1_2097152| Nachhzg normal | 1 |  |
| 00_0010_7761_10_0100_036_1_4194304| Solarkreis aktiv | 1 |  |
| 00_0010_7761_10_0100_036_1_8388608| Betriebsrelais ein | 1 |  |
| 00_0010_7761_10_0100_036_1_16777216| Pumpencheck | 1 |  |



### <a name="0010_7762_0100"></a>DFA (0x0010) <= DeltaSol Pool \[WMZ\] (0x7762), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7762_10_0100_000_2_0| Temperatur Vorlauf | 0.1 |  °C |
| 00_0010_7762_10_0100_002_2_0| Temperatur Rücklauf | 0.1 |  °C |
| 00_0010_7762_10_0100_004_2_0| Durchfluss Sensor 8 | 1 |  l/h |
| 00_0010_7762_10_0100_006_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_7774_0100"></a>DFA (0x0010) <= EMZ/CME (0x7774), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7774_10_0100_000_4_0| Datum | 1 |  |
| 00_0010_7774_10_0100_004_2_0| Uhrzeit | 1 |  |
| 00_0010_7774_10_0100_008_2_0| TSS | 0.1 |  °C |
| 00_0010_7774_10_0100_010_2_0| TEF | 0.1 |  °C |
| 00_0010_7774_10_0100_012_2_0| Wärme | 1 |  Wh |
| 00_0010_7774_10_0100_018_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7774_10_0100_020_4_0| Volumen | 0.01 |  m³ |
| 00_0010_7774_10_0100_096_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_024_2_0| TSS | 0.1 |  °C |
| 00_0010_7774_10_0100_026_2_0| TSA | 0.1 |  °C |
| 00_0010_7774_10_0100_028_2_0| Wärme2 | 1 |  Wh |
| 00_0010_7774_10_0100_034_2_0| Volumenstrom2 | 1 |  l/h |
| 00_0010_7774_10_0100_096_4_0_1| Impulse | 1 |  |
| 00_0010_7774_10_0100_036_2_0| TAC | 0.1 |  °C |
| 00_0010_7774_10_0100_038_2_0| TAF | 0.1 |  °C |
| 00_0010_7774_10_0100_040_2_0| Wärme3 | 1 |  Wh |
| 00_0010_7774_10_0100_046_2_0| Volumenstrom3 | 1 |  l/h |
| 00_0010_7774_10_0100_100_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_048_2_0| TBC | 0.1 |  °C |
| 00_0010_7774_10_0100_050_2_0| TBF | 0.1 |  °C |
| 00_0010_7774_10_0100_052_2_0| Wärme4 | 1 |  Wh |
| 00_0010_7774_10_0100_058_2_0| Volumenstrom4 | 1 |  l/h |
| 00_0010_7774_10_0100_104_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_060_2_0| TSC | 0.1 |  °C |
| 00_0010_7774_10_0100_062_2_0| TSF | 0.1 |  °C |
| 00_0010_7774_10_0100_064_2_0| Wärme5 | 1 |  Wh |
| 00_0010_7774_10_0100_070_2_0| Volumenstrom5 | 1 |  l/h |
| 00_0010_7774_10_0100_108_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_072_4_0| Strom1 | 1 |  Wh |
| 00_0010_7774_10_0100_076_4_0| Strom1 | 1 |  kWh |
| 00_0010_7774_10_0100_112_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_080_4_0| Strom2 | 1 |  kWh |
| 00_0010_7774_10_0100_116_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_084_4_0| Gas1 | 0.01 |  m³ |
| 00_0010_7774_10_0100_128_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_088_4_0| Therm. Energie1 | 1 |  kWh |
| 00_0010_7774_10_0100_120_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_092_4_0| Therm. Energie2 | 1 |  kWh |
| 00_0010_7774_10_0100_124_4_0| Impulse | 1 |  |
| 00_0010_7774_10_0100_096_4_0_2| Impulszähler 1 \(Volumen 1/2\) | 1 |  |
| 00_0010_7774_10_0100_100_4_0_1| Impulszähler 2 \(Volumen 3\) | 1 |  |
| 00_0010_7774_10_0100_104_4_0_1| Impulszähler 3 \(Volumen 4\) | 1 |  |
| 00_0010_7774_10_0100_108_4_0_1| Impulszähler 4 \(Volumen 5\) | 1 |  |
| 00_0010_7774_10_0100_112_4_0_1| Impulszähler 5 \(Strom 1\) | 1 |  |
| 00_0010_7774_10_0100_116_4_0_1| Impulszähler 6 \(Strom 2\) | 1 |  |
| 00_0010_7774_10_0100_120_4_0_1| Impulszähler 7 \(th. Energie 1\) | 1 |  |
| 00_0010_7774_10_0100_124_4_0_1| Impulszähler 8 \(th. Energie 2\) | 1 |  |
| 00_0010_7774_10_0100_128_4_0_1| Impulszähler 9 \(Gas 1\) | 1 |  |



### <a name="0010_7821_0100"></a>DFA (0x0010) <= COSMO Multi \[Regler\] (0x7821), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7821_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7821_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7821_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7821_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7821_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7821_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7821_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7821_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7821_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7821_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7821_10_0100_020_2_0| Einstrahlung CS | 1 |  W/m² |
| 00_0010_7821_10_0100_022_2_0| Impulse 1 V40 | 1 |  |
| 00_0010_7821_10_0100_024_2_0| Digital Input | 1 |  |
| 00_0010_7821_10_0100_026_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7821_10_0100_027_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7821_10_0100_028_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7821_10_0100_029_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7821_10_0100_030_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7821_10_0100_031_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_7821_10_0100_032_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_7821_10_0100_036_2_0| Fehlermaske | 1 |  |
| 00_0010_7821_10_0100_038_2_0| Meldungen | 1 |  |
| 00_0010_7821_10_0100_040_1_0| System | 1 |  |
| 00_0010_7821_10_0100_042_2_0| Schema | 1 |  |
| 00_0010_7821_10_0100_044_2_0| Vorlauf Soll HK1 Modul Sensor 18 | 0.1 |  °C |
| 00_0010_7821_10_0100_046_2_0| Status HK1 Modul | 1 |  |
| 00_0010_7821_10_0100_048_2_0| Vorlauf Soll HK2 Modul Sensor 25 | 0.1 |  °C |
| 00_0010_7821_10_0100_050_2_0| Status HK2 Modul | 1 |  |
| 00_0010_7821_10_0100_052_2_0| Vorlauf Soll HK3 Modul Sensor 32 | 0.1 |  °C |
| 00_0010_7821_10_0100_054_2_0| Status HK3 Modul | 1 |  |
| 00_0010_7821_10_0100_056_2_0| Vorlauf Soll Heizkreis Sensor 11 | 0.1 |  °C |
| 00_0010_7821_10_0100_058_2_0| Status Heizkreis | 1 |  |
| 00_0010_7821_10_0100_062_2_0| Systemzeit | 1 |  |
| 00_0010_7821_10_0100_064_2_0| Jahr | 1 |  |
| 00_0010_7821_10_0100_066_1_0| Monat | 1 |  |
| 00_0010_7821_10_0100_067_1_0| Tag | 1 |  |
| 00_0010_7821_10_0100_060_1_0| Version | 0.01 |  |



### <a name="0010_7822_0100"></a>DFA (0x0010) <= COSMO Multi \[WMZ\] (0x7822), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7822_10_0100_000_2_0| Temperatur Vorlauf | 0.1 |  °C |
| 00_0010_7822_10_0100_002_2_0| Temperatur Rücklauf | 0.1 |  °C |
| 00_0010_7822_10_0100_004_2_0| Durchfluss Sensor 8 | 1 |  l/h |
| 00_0010_7822_10_0100_006_2_0| Wärmemenge | 1 |  Wh |



### <a name="0010_7830_0100"></a>DFA (0x0010) <= COSMO Multi HK 1 Estrichtrockung \[Modul 1\] (0x7831 - 0x783F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7830_10_0100_000_2_0| Jahr | 1 |  |
| 00_0010_7830_10_0100_002_1_0| Monat | 1 |  |
| 00_0010_7830_10_0100_003_1_0| Tag | 1 |  |
| 00_0010_7830_10_0100_004_2_0| Systemzeit | 1 |  |
| 00_0010_7830_10_0100_006_1_0| Status | 1 |  |
| 00_0010_7830_10_0100_007_1_0| Fehlermeldung | 1 |  |
| 00_0010_7830_10_0100_008_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_7830_10_0100_010_2_0| Vorlauftemperatur | 0.1 |  °C |
| 00_0010_7830_10_0100_012_1_0| Relais Pumpe | 1 | % |
| 00_0010_7830_10_0100_013_1_0| Relais Mischer Auf | 1 | % |
| 00_0010_7830_10_0100_014_1_0| Relais Mischer Zu | 1 | % |
| 00_0010_7830_10_0100_015_1_0| Handebetrieb Relais Pumpe | 1 |  |
| 00_0010_7830_10_0100_016_1_0| Handebetrieb Relais Mischer Auf | 1 |  |
| 00_0010_7830_10_0100_017_1_0| Handebetrieb Relais Mischer Zu | 1 |  |
| 00_0010_7830_10_0100_018_1_0| NH-Anforderung | 1 |  |
| 00_0010_7830_10_0100_019_1_0| Parameter Start | 1 |  |
| 00_0010_7830_10_0100_020_2_0| Parameter TStart | 0.1 |  °C |
| 00_0010_7830_10_0100_022_2_0| Parameter TMax | 0.1 |  °C |
| 00_0010_7830_10_0100_024_2_0| Parameter Anstieg | 0.1 |  °C |
| 00_0010_7830_10_0100_026_1_0| Parameter Anstiegszeit | 1 |  h |
| 00_0010_7830_10_0100_027_1_0| Parameter Haltezeit | 1 |  d |



### <a name="0010_7840_0100"></a>DFA (0x0010) <= COSMO UNO (0x7840), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7840_10_0100_004_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7840_10_0100_006_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7840_10_0100_008_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7840_10_0100_010_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7840_10_0100_020_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7840_10_0100_021_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7840_10_0100_028_2_0| SW-Version | 0.01 |  |
| 00_0010_7840_10_0100_032_4_0| Betriebsstunden Relais 1 | 1 |  h |
| 00_0010_7840_10_0100_036_4_0| Betriebsstunden Relais 2 | 1 |  h |
| 00_0010_7840_10_0100_064_1_1| Speicherkühlung | 1 |  |
| 00_0010_7840_10_0100_065_1_1| Systemkühlung | 1 |  |
| 00_0010_7840_10_0100_067_1_0| Frostschutz | 1 |  |
| 00_0010_7840_10_0100_068_1_1| Kollektorkühlung | 1 |  |
| 00_0010_7840_10_0100_069_1_1| Speichermaximaltemperatur | 1 |  |
| 00_0010_7840_10_0100_072_4_0| Fehlermaske | 1 |  |



### <a name="0010_7841_0100"></a>DFA (0x0010) <= COSMO UNO \[WMZ1\] (0x7841), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7841_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7841_10_0100_004_4_0| Leistung | 1 |  W |



### <a name="0010_7910_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[Regler\] (0x7910), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7910_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7910_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7910_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7910_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7910_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7910_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7910_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7910_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7910_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7910_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7910_10_0100_020_4_0| Volumenstrom Sensor S10/V40 | 1 |  l/h |
| 00_0010_7910_10_0100_024_2_0| Einstrahlung Sensor CS10 | 1 |  W/m² |
| 00_0010_7910_10_0100_026_2_0| Druck Sensor RPS | 0.01 |  bar |
| 00_0010_7910_10_0100_028_4_0| Volumenstrom Sensor FlowRotor | 1 |  l/h |
| 00_0010_7910_10_0100_032_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7910_10_0100_033_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7910_10_0100_034_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7910_10_0100_035_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7910_10_0100_036_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7910_10_0100_040_4_0| Systemdatum | 1 |  |
| 00_0010_7910_10_0100_044_4_0| Fehlermaske | 1 |  |



### <a name="0010_7911_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[Module\] (0x7911), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7911_10_0100_000_2_0| Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 00_0010_7911_10_0100_002_2_0| Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 00_0010_7911_10_0100_004_2_0| Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 00_0010_7911_10_0100_006_2_0| Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 00_0010_7911_10_0100_008_2_0| Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 00_0010_7911_10_0100_010_2_0| Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 00_0010_7911_10_0100_012_2_0| Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 00_0010_7911_10_0100_014_2_0| Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 00_0010_7911_10_0100_016_2_0| Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 00_0010_7911_10_0100_018_2_0| Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 00_0010_7911_10_0100_020_2_0| Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 00_0010_7911_10_0100_022_2_0| Temperatur Modul 2 Sensor 6 | 0.1 |  °C |



### <a name="0010_7920_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[Heizkreis\] (0x7920 - 0x792F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7920_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_7920_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_7930_0100"></a>DFA (0x0010) <= PAW SOLEX SC5.14 \[WMZ\] (0x7930 - 0x793F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7930_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7930_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_7930_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |



### <a name="0010_7D04_0100"></a>DFA (0x0010) <= FRISTA-mix (0x7D04), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7D04_10_0100_000_2_0| Temperatur Warmwasser | 0.1 |  °C |
| 00_0010_7D04_10_0100_002_2_0| Temperatur Kaltwasser | 0.1 |  °C |
| 00_0010_7D04_10_0100_004_2_0| Temperatur Zirkulation | 0.1 |  °C |
| 00_0010_7D04_10_0100_006_2_0| Volumenstrom | 0.1 |  l/min |
| 00_0010_7D04_10_0100_008_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7D04_10_0100_009_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7D04_10_0100_010_2_0| Systemzeit | 1 |  |
| 00_0010_7D04_10_0100_012_1_0| Optionen | 1 |  |
| 00_0010_7D04_10_0100_013_1_0| Status | 1 |  |
| 00_0010_7D04_10_0100_014_1_0| Relaisstatus | 1 |  |
| 00_0010_7D04_10_0100_015_1_0| SensorDefekt | 1 |  |
| 00_0010_7D04_10_0100_016_1_0| Temperatur WW-Soll | 1 |  °C |
| 00_0010_7D04_10_0100_017_1_0| Temperatur Quelle | 1 |  °C |
| 00_0010_7D04_10_0100_019_1_0| verbl. Zapfung | 1 |  min |
| 00_0010_7D04_10_0100_020_4_0| Schaltspiele | 1 |  |
| 00_0010_7D04_10_0100_024_2_0| Wärmemenge | 1 |  Wh |
| 00_0010_7D04_10_0100_030_1_0| Version | 0.01 |  |
| 00_0010_7D04_10_0100_032_2_0| max. Temperatur Kaltwasser | 0.1 |  °C |
| 00_0010_7D04_10_0100_034_2_0| min. Temperatur Kaltwasser | 0.1 |  °C |
| 00_0010_7D04_10_0100_036_2_0| max. Volumenstrom | 1 |  l/h |
| 00_0010_7D04_10_0100_038_2_0| Zapfmenge | 0.1 |  m³ |



### <a name="0010_7E11_0100"></a>DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7E11_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7E11_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7E11_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7E11_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7E11_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7E11_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7E11_10_0100_012_2_0| Temperatur Sensor 7 | 0.1 |  °C |
| 00_0010_7E11_10_0100_014_2_0| Temperatur Sensor 8 | 0.1 |  °C |
| 00_0010_7E11_10_0100_016_2_0| Temperatur Sensor 9 | 0.1 |  °C |
| 00_0010_7E11_10_0100_018_2_0| Temperatur Sensor 10 | 0.1 |  °C |
| 00_0010_7E11_10_0100_020_2_0| Temperatur Sensor 11 | 0.1 |  °C |
| 00_0010_7E11_10_0100_022_2_0| Temperatur Sensor 12 | 0.1 |  °C |
| 00_0010_7E11_10_0100_024_2_0| Temperatur Sensor 13 | 0.1 |  °C |
| 00_0010_7E11_10_0100_026_2_0| Temperatur Sensor 14 | 0.1 |  °C |
| 00_0010_7E11_10_0100_028_2_0| Temperatur Sensor 15 | 0.1 |  °C |
| 00_0010_7E11_10_0100_030_2_0| Einstrahlung Sensor 16 | 1 |  W/m² |
| 00_0010_7E11_10_0100_032_2_0| Temperatur Sensor 17 | 0.1 |  °C |
| 00_0010_7E11_10_0100_034_2_0| Temperatur Sensor 18 | 0.1 |  °C |
| 00_0010_7E11_10_0100_036_2_0| Temperatur Sensor 19 | 0.1 |  °C |
| 00_0010_7E11_10_0100_038_2_0| Temperatur Sensor 20 | 0.1 |  °C |
| 00_0010_7E11_10_0100_040_4_0| Volumenstrom Sensor 13 | 1 |  l/h |
| 00_0010_7E11_10_0100_044_4_0| Volumenstrom Sensor 14 | 1 |  l/h |
| 00_0010_7E11_10_0100_048_4_0| Volumenstrom Sensor 15 | 1 |  l/h |
| 00_0010_7E11_10_0100_052_4_0| Volumenstrom Sensor 17 | 1 |  l/h |
| 00_0010_7E11_10_0100_056_4_0| Volumenstrom Sensor 18 | 1 |  l/h |
| 00_0010_7E11_10_0100_060_4_0| Volumenstrom Sensor 19 | 1 |  l/h |
| 00_0010_7E11_10_0100_064_4_0| Volumenstrom Sensor 20 | 1 |  l/h |
| 00_0010_7E11_10_0100_104_4_0| Volumenstrom Sensor 21 | 1 |  l/h |
| 00_0010_7E11_10_0100_068_2_0| Druck Sensor 17 | 0.01 |  bar |
| 00_0010_7E11_10_0100_070_2_0| Druck Sensor 18 | 0.01 |  bar |
| 00_0010_7E11_10_0100_072_2_0| Druck Sensor 19 | 0.01 |  bar |
| 00_0010_7E11_10_0100_074_2_0| Druck Sensor 20 | 0.01 |  bar |
| 00_0010_7E11_10_0100_076_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7E11_10_0100_077_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7E11_10_0100_078_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7E11_10_0100_079_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7E11_10_0100_080_1_0| Drehzahl Relais 5 | 1 | % |
| 00_0010_7E11_10_0100_081_1_0| Drehzahl Relais 6 | 1 | % |
| 00_0010_7E11_10_0100_082_1_0| Drehzahl Relais 7 | 1 | % |
| 00_0010_7E11_10_0100_083_1_0| Drehzahl Relais 8 | 1 | % |
| 00_0010_7E11_10_0100_084_1_0| Drehzahl Relais 9 | 1 | % |
| 00_0010_7E11_10_0100_085_1_0| Drehzahl Relais 10 | 1 | % |
| 00_0010_7E11_10_0100_086_1_0| Drehzahl Relais 11 | 1 | % |
| 00_0010_7E11_10_0100_087_1_0| Drehzahl Relais 12 | 1 | % |
| 00_0010_7E11_10_0100_088_1_0| Drehzahl Relais 13 | 1 | % |
| 00_0010_7E11_10_0100_089_1_0| Drehzahl Relais 14 | 1 | % |
| 00_0010_7E11_10_0100_100_1_0| Ausgang A | 1 | % |
| 00_0010_7E11_10_0100_101_1_0| Ausgang B | 1 | % |
| 00_0010_7E11_10_0100_102_1_0| Ausgang C | 1 | % |
| 00_0010_7E11_10_0100_103_1_0| Ausgang D | 1 | % |
| 00_0010_7E11_10_0100_092_4_0| Systemdatum | 1 |  |
| 00_0010_7E11_10_0100_096_4_0| Fehlermaske | 1 |  |
| 00_0010_7E11_10_0100_096_1_1| Fehler: Sensorleitung unterbrochen | 1 |  |
| 00_0010_7E11_10_0100_096_1_2| Fehler: Sensorleitung kurzgeschlossen | 1 |  |
| 00_0010_7E11_10_0100_096_1_32| Fehler: Volumstromüberwachung | 1 |  |
| 00_0010_7E11_10_0100_096_1_64| Fehler: Überdruck | 1 |  |
| 00_0010_7E11_10_0100_096_1_128| Fehler: Minderdruck | 1 |  |
| 00_0010_7E11_10_0100_096_1_512| Fehler: Datenspeicher | 1 |  |
| 00_0010_7E11_10_0100_096_1_1024| Fehler: Echtzeituhr | 1 |  |
| 00_0010_7E11_10_0100_096_1_4096| Fehler: Zwillingspumpe | 1 |  |
| 00_0010_7E11_10_0100_096_1_8192| Fehler: HK-Kühlung unter Vorlaufminimaltemperatur | 1 |  |
| 00_0010_7E11_10_0100_096_1_16384| Fehler: Thermische Desinfektion abgebrochen | 1 |  |



### <a name="0010_7E11_0101"></a>DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0101

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7E11_10_0101_000_4_0| Warnungsmaske | 1 |  |
| 00_0010_7E11_10_0101_000_1_4| Warnung: ΔT zu hoch | 1 |  |
| 00_0010_7E11_10_0101_000_1_8| Warnung: Nachtzirkulation | 1 |  |
| 00_0010_7E11_10_0101_000_1_16| Warnung: Vorlauf/Rücklauf vertauscht | 1 |  |
| 00_0010_7E11_10_0101_000_1_2048| Warnung: SD-Karte | 1 |  |
| 00_0010_7E11_10_0101_004_1_0| Luftfeuchtigkeit Sensor 17 | 1 | %RH |
| 00_0010_7E11_10_0101_005_1_0| Luftfeuchtigkeit Sensor 18 | 1 | %RH |
| 00_0010_7E11_10_0101_006_1_0| Luftfeuchtigkeit Sensor 19 | 1 | %RH |
| 00_0010_7E11_10_0101_007_1_0| Luftfeuchtigkeit Sensor 20 | 1 | %RH |



### <a name="0010_7E11_0140"></a>DFA (0x0010) <= DeltaSol MX \[Regler\] (0x7E11), command 0x0140

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7E11_10_0140_000_1_0| Anzahl TD-Funktionen | 1 |  |
| 00_0010_7E11_10_0140_001_1_0| Nummer letzte erfolgreiche TD | 1 |  |
| 00_0010_7E11_10_0140_002_1_0| Nummer letzte abgebrochene TD | 1 |  |
| 00_0010_7E11_10_0140_004_2_0| Maske erfolgreiche TD | 1 |  |
| 00_0010_7E11_10_0140_006_2_0| Maske abgebrochene TD | 1 |  |
| 00_0010_7E11_10_0140_008_4_0| Zeitstempel letzte erfolgreiche TD | 1 |  |
| 00_0010_7E11_10_0140_012_4_0| Zeitstempel letzte abgebrochene TD | 1 |  |



### <a name="0010_7E12_0100"></a>DFA (0x0010) <= DeltaSol MX \[Module\] (0x7E12), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7E12_10_0100_000_2_0| Temperatur Modul 1 Sensor 1 | 0.1 |  °C |
| 00_0010_7E12_10_0100_002_2_0| Temperatur Modul 1 Sensor 2 | 0.1 |  °C |
| 00_0010_7E12_10_0100_004_2_0| Temperatur Modul 1 Sensor 3 | 0.1 |  °C |
| 00_0010_7E12_10_0100_006_2_0| Temperatur Modul 1 Sensor 4 | 0.1 |  °C |
| 00_0010_7E12_10_0100_008_2_0| Temperatur Modul 1 Sensor 5 | 0.1 |  °C |
| 00_0010_7E12_10_0100_010_2_0| Temperatur Modul 1 Sensor 6 | 0.1 |  °C |
| 00_0010_7E12_10_0100_012_2_0| Temperatur Modul 2 Sensor 1 | 0.1 |  °C |
| 00_0010_7E12_10_0100_014_2_0| Temperatur Modul 2 Sensor 2 | 0.1 |  °C |
| 00_0010_7E12_10_0100_016_2_0| Temperatur Modul 2 Sensor 3 | 0.1 |  °C |
| 00_0010_7E12_10_0100_018_2_0| Temperatur Modul 2 Sensor 4 | 0.1 |  °C |
| 00_0010_7E12_10_0100_020_2_0| Temperatur Modul 2 Sensor 5 | 0.1 |  °C |
| 00_0010_7E12_10_0100_022_2_0| Temperatur Modul 2 Sensor 6 | 0.1 |  °C |
| 00_0010_7E12_10_0100_024_2_0| Temperatur Modul 3 Sensor 1 | 0.1 |  °C |
| 00_0010_7E12_10_0100_026_2_0| Temperatur Modul 3 Sensor 2 | 0.1 |  °C |
| 00_0010_7E12_10_0100_028_2_0| Temperatur Modul 3 Sensor 3 | 0.1 |  °C |
| 00_0010_7E12_10_0100_030_2_0| Temperatur Modul 3 Sensor 4 | 0.1 |  °C |
| 00_0010_7E12_10_0100_032_2_0| Temperatur Modul 3 Sensor 5 | 0.1 |  °C |
| 00_0010_7E12_10_0100_034_2_0| Temperatur Modul 3 Sensor 6 | 0.1 |  °C |
| 00_0010_7E12_10_0100_036_2_0| Temperatur Modul 4 Sensor 1 | 0.1 |  °C |
| 00_0010_7E12_10_0100_038_2_0| Temperatur Modul 4 Sensor 2 | 0.1 |  °C |
| 00_0010_7E12_10_0100_040_2_0| Temperatur Modul 4 Sensor 3 | 0.1 |  °C |
| 00_0010_7E12_10_0100_042_2_0| Temperatur Modul 4 Sensor 4 | 0.1 |  °C |
| 00_0010_7E12_10_0100_044_2_0| Temperatur Modul 4 Sensor 5 | 0.1 |  °C |
| 00_0010_7E12_10_0100_046_2_0| Temperatur Modul 4 Sensor 6 | 0.1 |  °C |
| 00_0010_7E12_10_0100_048_2_0| Temperatur Modul 5 Sensor 1 | 0.1 |  °C |
| 00_0010_7E12_10_0100_050_2_0| Temperatur Modul 5 Sensor 2 | 0.1 |  °C |
| 00_0010_7E12_10_0100_052_2_0| Temperatur Modul 5 Sensor 3 | 0.1 |  °C |
| 00_0010_7E12_10_0100_054_2_0| Temperatur Modul 5 Sensor 4 | 0.1 |  °C |
| 00_0010_7E12_10_0100_056_2_0| Temperatur Modul 5 Sensor 5 | 0.1 |  °C |
| 00_0010_7E12_10_0100_058_2_0| Temperatur Modul 5 Sensor 6 | 0.1 |  °C |



### <a name="0010_7E20_0100"></a>DFA (0x0010) <= DeltaSol MX \[Heizkreis\] (0x7E20 - 0x7E2F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7E20_10_0100_000_2_0| Vorlauf-Soll-Temperatur | 0.1 |  °C |
| 00_0010_7E20_10_0100_002_1_0| Betriebsstatus | 1 |  |



### <a name="0010_7E30_0100"></a>DFA (0x0010) <= DeltaSol MX \[WMZ\] (0x7E30 - 0x7E3F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7E30_10_0100_000_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7E30_10_0100_008_4_0| Wärmemenge heute | 1 |  Wh |
| 00_0010_7E30_10_0100_012_4_0| Wärmemenge Woche | 1 |  Wh |
| 00_0010_7E30_10_0100_020_4_0| Wärmemenge Monat | 1 |  Wh |
| 00_0010_7E30_10_0100_016_4_0| Gesamtvolumen | 1 |  l |
| 00_0010_7E30_10_0100_024_4_0| Volumen heute | 1 |  l |
| 00_0010_7E30_10_0100_028_4_0| Volumen Woche | 1 |  l |
| 00_0010_7E30_10_0100_032_4_0| Volumen Monat | 1 |  l |
| 00_0010_7E30_10_0100_004_4_0| Leistung | 1 |  W |



### <a name="0010_7E40_0100"></a>DFA (0x0010) <= DeltaSol MX \[Modul\] (0x7E40 - 0x7E4F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7E40_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7E40_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7E40_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7E40_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7E40_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7E40_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7E40_10_0100_012_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7E40_10_0100_013_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7E40_10_0100_014_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7E40_10_0100_015_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7E40_10_0100_016_1_0| Drehzahl Relais 5 | 1 | % |



### <a name="0010_7E60_0100"></a>DFA (0x0010) <= DeltaSol BX Plus \[Modul\] (0x7E60 - 0x7E6F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7E60_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7E60_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7E60_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7E60_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7E60_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7E60_10_0100_010_2_0| Temperatur Sensor 6 | 0.1 |  °C |
| 00_0010_7E60_10_0100_012_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7E60_10_0100_013_1_0| Drehzahl Relais 2 | 1 | % |
| 00_0010_7E60_10_0100_014_1_0| Drehzahl Relais 3 | 1 | % |
| 00_0010_7E60_10_0100_015_1_0| Drehzahl Relais 4 | 1 | % |
| 00_0010_7E60_10_0100_016_1_0| Drehzahl Relais 5 | 1 | % |



### <a name="0010_7F61_0100"></a>DFA (0x0010) <= IOC-Modul \[Messwerte\] (0x7F61), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7F61_10_0100_000_4_0| SekNr | 1 |  s |
| 00_0010_7F61_10_0100_004_4_0| T-Umgebung | 0.1 |  °C |
| 00_0010_7F61_10_0100_008_4_0| T-Vorlauf/S1 | 0.1 |  °C |
| 00_0010_7F61_10_0100_012_4_0| T-Rücklauf/S2 | 0.1 |  °C |
| 00_0010_7F61_10_0100_016_4_0| TSL | 0.1 |  °C |
| 00_0010_7F61_10_0100_020_4_0| Tmax-Temp./S5 | 0.1 |  °C |
| 00_0010_7F61_10_0100_024_4_0| Einstrahlung | 0.1 |  W/m² |
| 00_0010_7F61_10_0100_028_4_0| Volumenstr.1 | 1 |  l/h |
| 00_0010_7F61_10_0100_032_4_0| Volumenstr.2 | 1 |  l/h |
| 00_0010_7F61_10_0100_036_4_0| S6 | 0.1 |  °C |
| 00_0010_7F61_10_0100_040_4_0| S7 | 0.1 |  °C |
| 00_0010_7F61_10_0100_044_4_0| Stromstärke 1 | 0.01 |  mA |
| 00_0010_7F61_10_0100_048_4_0| Stromstärke 2 | 0.01 |  mA |
| 00_0010_7F61_10_0100_052_4_0| Datum_Messdaten | 1 |  |
| 00_0010_7F61_10_0100_056_4_0| Wärmemenge 1 | 0.01 |  kWh |
| 00_0010_7F61_10_0100_060_4_0| Wärmemenge 2 | 0.01 |  kWh |
| 00_0010_7F61_10_0100_068_2_0| Solarwärme | 1 |  Wh |
| 00_0010_7F61_10_0100_064_4_0| 5-Min-Fehlercode | 1 |  |



### <a name="0010_7F62_0100"></a>DFA (0x0010) <= IOC-Modul \[Tagesbilanz\] (0x7F62), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7F62_10_0100_000_4_0| Datum | 1 |  |
| 00_0010_7F62_10_0100_004_4_0| H-Day | 0.01 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_008_4_0| Q-mess | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_012_4_0| Q-erw2 | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_016_4_0| Q-erw | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_020_4_0| Meldung | 1 |  |
| 00_0010_7F62_10_0100_024_4_0| dt-mess | 0.01 |  h |
| 00_0010_7F62_10_0100_028_4_0| dt-erw2 | 0.01 |  h |
| 00_0010_7F62_10_0100_032_4_0| dt-erw | 0.01 |  h |
| 00_0010_7F62_10_0100_036_4_0| Qutil-m | 0.01 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_040_4_0| Qutil-e2 | 0.01 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_044_4_0| Qutil-e | 0.01 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_048_4_0| Qtv-e2 | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_052_4_0| Qtv-e | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_056_4_0| Qkv-e2 | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_060_4_0| Qkv-e | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_064_4_0| Qskv-e2 | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_068_4_0| Qskv-e | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F62_10_0100_072_4_0| Tsoll-Day | 0.01 |  °C |



### <a name="0010_7F63_0100"></a>DFA (0x0010) <= IOC-Modul \[Entnahmekreis\] (0x7F63), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7F63_10_0100_000_4_0| Vlast-Day/Vol2 | 0.1 |  l/\(m²*d\) |
| 00_0010_7F63_10_0100_004_4_0| Qmess2 | 0.001 |  kWh/\(m²*d\) |
| 00_0010_7F63_10_0100_008_4_0| Tagesfehlercode | 1 |  |



### <a name="0010_7F64_0100"></a>DFA (0x0010) <= IOC-Modul \[Debug-Werte\] (0x7F64), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7F64_10_0100_000_4_0| Tkol-erw | 0.1 |  °C |
| 00_0010_7F64_10_0100_004_4_0| Volumenstrom-erw | 1 |  l/h |
| 00_0010_7F64_10_0100_008_4_0| IAM | 1 | % |
| 00_0010_7F64_10_0100_012_4_0| Diffusstrahlung | 1 |  W/m² |
| 00_0010_7F64_10_0100_016_4_0| Einfallswinkel | 1 |  ° |



### <a name="0010_7F65_0100"></a>DFA (0x0010) <= IOC-Modul \[Messwerte_1s\] (0x7F65), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7F65_10_0100_000_2_0| T-Umgebung_1s | 0.1 |  °C |
| 00_0010_7F65_10_0100_002_2_0| T-Vorlauf/S1_1s | 0.1 |  °C |
| 00_0010_7F65_10_0100_004_2_0| T-Rücklauf/S2_1s | 0.1 |  °C |
| 00_0010_7F65_10_0100_006_2_0| TSL_1s | 0.1 |  °C |
| 00_0010_7F65_10_0100_008_2_0| Tmax-Temp./S5_1s | 0.1 |  °C |
| 00_0010_7F65_10_0100_010_2_0| Einstrahlung_1s | 0.1 |  W/m² |
| 00_0010_7F65_10_0100_012_4_0| Volumenstrom1_1s | 1 |  l/h |
| 00_0010_7F65_10_0100_016_4_0| Volumenstrom2_1s | 1 |  l/h |
| 00_0010_7F65_10_0100_020_2_0| S6_1s | 0.1 |  °C |
| 00_0010_7F65_10_0100_022_2_0| S7_1s | 0.1 |  °C |
| 00_0010_7F65_10_0100_024_2_0| Stromstärke1_1s | 0.01 |  mA |
| 00_0010_7F65_10_0100_026_2_0| Stromstärke2_1s | 0.01 |  mA |
| 00_0010_7F65_10_0100_028_2_0| Solarwärme_1s | 1 |  Wh |
| 00_0010_7F65_10_0100_036_4_0| Statusflag_1s | 1 |  |



### <a name="0010_7F71_0100"></a>DFA (0x0010) <= DeltaSol FCS (0x7F71), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0010_7F71_10_0100_000_2_0| Temperatur Sensor 1 | 0.1 |  °C |
| 00_0010_7F71_10_0100_002_2_0| Temperatur Sensor 2 | 0.1 |  °C |
| 00_0010_7F71_10_0100_004_2_0| Temperatur Sensor 3 | 0.1 |  °C |
| 00_0010_7F71_10_0100_006_2_0| Temperatur Sensor 4 | 0.1 |  °C |
| 00_0010_7F71_10_0100_008_2_0| Temperatur Sensor 5 | 0.1 |  °C |
| 00_0010_7F71_10_0100_010_2_0| Systemdruck | 0.01 |  bar |
| 00_0010_7F71_10_0100_012_2_0| Volumenstrom | 1 |  l/h |
| 00_0010_7F71_10_0100_014_1_0| Drehzahl Relais 1 | 1 | % |
| 00_0010_7F71_10_0100_015_1_0| Systemmeldung | 1 |  |
| 00_0010_7F71_10_0100_016_4_0| Leistung | 1 |  W |
| 00_0010_7F71_10_0100_020_4_0| Wärmemenge | 1 |  Wh |
| 00_0010_7F71_10_0100_024_4_0| Datum | 1 |  |
| 00_0010_7F71_10_0100_028_2_0| Uhrzeit | 1 |  |
| 00_0010_7F71_10_0100_030_1_0| Eff_Min-Drehzahl | 1 | % |
| 00_0010_7F71_10_0100_032_4_0| Debug1 | 1 |  |
| 00_0010_7F71_10_0100_036_4_0| Debug2 | 1 |  |
| 00_0010_7F71_10_0100_040_4_0| Debug3 | 1 |  |
| 00_0010_7F71_10_0100_044_4_0| Debug4 | 1 |  |
| 00_0010_7F71_10_0100_048_4_0| Debug5 | 1 |  |
| 00_0010_7F71_10_0100_052_2_0| Einstrahlung | 1 |  W/m² |
| 00_0010_7F71_10_0100_054_2_0| Zelltemperatur | 0.1 |  °C |



### <a name="0015_105F_0100"></a>Standard-Infos (0x0015) <= Tuxhorn BHKW (0x105F), command 0x0100

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_0015_105F_10_0100_004_2_0| SD3: Temperatur Sensor 1 | 0.1 |  °C |
| 00_0015_105F_10_0100_006_2_0| SD3: Temperatur Sensor 2 | 0.1 |  °C |
| 00_0015_105F_10_0100_008_4_0| SD3: Wärmemenge | 1 |  Wh |
| 00_0015_105F_10_0100_016_1_0| DZ: Drehzahl 1 | 1 | % |
| 00_0015_105F_10_0100_017_1_0| DZ: Drehzahl 2 | 1 | % |
| 00_0015_105F_10_0100_024_1_0| ERR: Errormask | 1 |  |
| 00_0015_105F_10_0100_032_2_0| TW: Temperatur Sensor 1 | 0.1 |  °C |
| 00_0015_105F_10_0100_034_2_0| TW: Temperatur Sensor 2 | 0.1 |  °C |
| 00_0015_105F_10_0100_036_2_0| TW: Temperatur Sensor 3 | 0.1 |  °C |
| 00_0015_105F_10_0100_038_2_0| TW: Temperatur Sensor 4 | 0.1 |  °C |
| 00_0015_105F_10_0100_044_4_0| WM: Wärmemenge | 1 |  Wh |
| 00_0015_105F_10_0100_052_4_0| BS: Betriebsstunden Relais 1 | 1 |  h |
| 00_0015_105F_10_0100_056_4_0| BS: Betriebsstunden Relais 2 | 1 |  h |



### <a name="1260_1260_0101"></a>Viessmann Vitotrans 353 2017 Broadcast (0x1260) <= Viessmann Vitotrans 353 2017 Broadcast (0x1260 - 0x126F), command 0x0101

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1260_1260_10_0101_040_4_0| Systemdatum | 1 |  |
| 00_1260_1260_10_0101_002_1_0| Einschaltschwelle | 1 | % |
| 00_1260_1260_10_0101_003_1_0| Ausschaltschwelle | 1 | % |
| 00_1260_1260_10_0101_008_1_2| Master / Station 1 vorhanden | 1 |  |
| 00_1260_1260_10_0101_008_1_4| Station 2 vorhanden | 1 |  |
| 00_1260_1260_10_0101_008_1_8| Station 3 vorhanden | 1 |  |
| 00_1260_1260_10_0101_008_1_16| Station 4 vorhanden | 1 |  |



### <a name="1261_1261_0301"></a>Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1261_1261_10_0301_000_2_0| Master: Version | 1 |  |
| 00_1261_1261_10_0301_028_1_0| Master: Reglervariante | 1 |  |
| 00_1261_1261_10_0301_002_2_0| Master: Status | 1 |  |
| 00_1261_1261_10_0301_004_4_0| Master: Fehlermaske | 1 |  |
| 00_1261_1261_10_0301_008_2_0| Master: T-WW | 0.1 |  °C |
| 00_1261_1261_10_0301_010_2_0| Master: T-KW | 0.1 |  °C |
| 00_1261_1261_10_0301_012_2_0| Master: T-SpVL | 0.1 |  °C |
| 00_1261_1261_10_0301_016_4_0| Master: Volumenstrom | 0.1 |  l/min |
| 00_1261_1261_10_0301_049_1_0| Master: Primärpumpe Drehzahl | 1 | % |
| 00_1261_1261_10_0301_052_4_0| Master: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1261_1261_10_0301_056_1_0| Master: Strangventil Zustand | 1 |  |
| 00_1261_1261_10_0301_024_4_0| Master: Stationsbetriebssekunden | 1 |  s |



### <a name="1261_1262_0301"></a>Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1261_1262_10_0301_000_2_0| Slave 1: Version | 1 |  |
| 00_1261_1262_10_0301_028_1_0| Slave 1: Reglervariante | 1 |  |
| 00_1261_1262_10_0301_002_2_0| Slave 1: Status | 1 |  |
| 00_1261_1262_10_0301_004_4_0| Slave 1: Fehlermaske | 1 |  |
| 00_1261_1262_10_0301_008_2_0| Slave 1: T-WW | 0.1 |  °C |
| 00_1261_1262_10_0301_010_2_0| Slave 1: T-KW | 0.1 |  °C |
| 00_1261_1262_10_0301_012_2_0| Slave 1: T-SpVL | 0.1 |  °C |
| 00_1261_1262_10_0301_016_4_0| Slave 1: Volumenstrom | 0.1 |  l/min |
| 00_1261_1262_10_0301_049_1_0| Slave 1: Primärpumpe Drehzahl | 1 | % |
| 00_1261_1262_10_0301_052_4_0| Slave 1: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1261_1262_10_0301_056_1_0| Slave 1: Strangventil Zustand | 1 |  |
| 00_1261_1262_10_0301_024_4_0| Slave 1: Stationsbetriebssekunden | 1 |  s |



### <a name="1261_1263_0301"></a>Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1261_1263_10_0301_000_2_0| Slave 2: Version | 1 |  |
| 00_1261_1263_10_0301_028_1_0| Slave 2: Reglervariante | 1 |  |
| 00_1261_1263_10_0301_002_2_0| Slave 2: Status | 1 |  |
| 00_1261_1263_10_0301_004_4_0| Slave 2: Fehlermaske | 1 |  |
| 00_1261_1263_10_0301_008_2_0| Slave 2: T-WW | 0.1 |  °C |
| 00_1261_1263_10_0301_010_2_0| Slave 2: T-KW | 0.1 |  °C |
| 00_1261_1263_10_0301_012_2_0| Slave 2: T-SpVL | 0.1 |  °C |
| 00_1261_1263_10_0301_016_4_0| Slave 2: Volumenstrom | 0.1 |  l/min |
| 00_1261_1263_10_0301_049_1_0| Slave 2: Primärpumpe Drehzahl | 1 | % |
| 00_1261_1263_10_0301_052_4_0| Slave 2: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1261_1263_10_0301_056_1_0| Slave 2: Strangventil Zustand | 1 |  |
| 00_1261_1263_10_0301_024_4_0| Slave 2: Stationsbetriebssekunden | 1 |  s |



### <a name="1261_1264_0301"></a>Viessmann Vitotrans 353 2017 Master (0x1261) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1261_1264_10_0301_000_2_0| Slave 3: Version | 1 |  |
| 00_1261_1264_10_0301_028_1_0| Slave 3: Reglervariante | 1 |  |
| 00_1261_1264_10_0301_002_2_0| Slave 3: Status | 1 |  |
| 00_1261_1264_10_0301_004_4_0| Slave 3: Fehlermaske | 1 |  |
| 00_1261_1264_10_0301_008_2_0| Slave 3: T-WW | 0.1 |  °C |
| 00_1261_1264_10_0301_010_2_0| Slave 3: T-KW | 0.1 |  °C |
| 00_1261_1264_10_0301_012_2_0| Slave 3: T-SpVL | 0.1 |  °C |
| 00_1261_1264_10_0301_016_4_0| Slave 3: Volumenstrom | 0.1 |  l/min |
| 00_1261_1264_10_0301_049_1_0| Slave 3: Primärpumpe Drehzahl | 1 | % |
| 00_1261_1264_10_0301_052_4_0| Slave 3: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1261_1264_10_0301_056_1_0| Slave 3: Strangventil Zustand | 1 |  |
| 00_1261_1264_10_0301_024_4_0| Slave 3: Stationsbetriebssekunden | 1 |  s |



### <a name="1262_1261_0301"></a>Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1262_1261_10_0301_000_2_0| Master: Version | 1 |  |
| 00_1262_1261_10_0301_028_1_0| Master: Reglervariante | 1 |  |
| 00_1262_1261_10_0301_002_2_0| Master: Status | 1 |  |
| 00_1262_1261_10_0301_004_4_0| Master: Fehlermaske | 1 |  |
| 00_1262_1261_10_0301_008_2_0| Master: T-WW | 0.1 |  °C |
| 00_1262_1261_10_0301_010_2_0| Master: T-KW | 0.1 |  °C |
| 00_1262_1261_10_0301_012_2_0| Master: T-SpVL | 0.1 |  °C |
| 00_1262_1261_10_0301_016_4_0| Master: Volumenstrom | 0.1 |  l/min |
| 00_1262_1261_10_0301_049_1_0| Master: Primärpumpe Drehzahl | 1 | % |
| 00_1262_1261_10_0301_052_4_0| Master: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1262_1261_10_0301_056_1_0| Master: Strangventil Zustand | 1 |  |
| 00_1262_1261_10_0301_024_4_0| Master: Stationsbetriebssekunden | 1 |  s |



### <a name="1262_1262_0301"></a>Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1262_1262_10_0301_000_2_0| Slave 1: Version | 1 |  |
| 00_1262_1262_10_0301_028_1_0| Slave 1: Reglervariante | 1 |  |
| 00_1262_1262_10_0301_002_2_0| Slave 1: Status | 1 |  |
| 00_1262_1262_10_0301_004_4_0| Slave 1: Fehlermaske | 1 |  |
| 00_1262_1262_10_0301_008_2_0| Slave 1: T-WW | 0.1 |  °C |
| 00_1262_1262_10_0301_010_2_0| Slave 1: T-KW | 0.1 |  °C |
| 00_1262_1262_10_0301_012_2_0| Slave 1: T-SpVL | 0.1 |  °C |
| 00_1262_1262_10_0301_016_4_0| Slave 1: Volumenstrom | 0.1 |  l/min |
| 00_1262_1262_10_0301_049_1_0| Slave 1: Primärpumpe Drehzahl | 1 | % |
| 00_1262_1262_10_0301_052_4_0| Slave 1: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1262_1262_10_0301_056_1_0| Slave 1: Strangventil Zustand | 1 |  |
| 00_1262_1262_10_0301_024_4_0| Slave 1: Stationsbetriebssekunden | 1 |  s |



### <a name="1262_1263_0301"></a>Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1262_1263_10_0301_000_2_0| Slave 2: Version | 1 |  |
| 00_1262_1263_10_0301_028_1_0| Slave 2: Reglervariante | 1 |  |
| 00_1262_1263_10_0301_002_2_0| Slave 2: Status | 1 |  |
| 00_1262_1263_10_0301_004_4_0| Slave 2: Fehlermaske | 1 |  |
| 00_1262_1263_10_0301_008_2_0| Slave 2: T-WW | 0.1 |  °C |
| 00_1262_1263_10_0301_010_2_0| Slave 2: T-KW | 0.1 |  °C |
| 00_1262_1263_10_0301_012_2_0| Slave 2: T-SpVL | 0.1 |  °C |
| 00_1262_1263_10_0301_016_4_0| Slave 2: Volumenstrom | 0.1 |  l/min |
| 00_1262_1263_10_0301_049_1_0| Slave 2: Primärpumpe Drehzahl | 1 | % |
| 00_1262_1263_10_0301_052_4_0| Slave 2: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1262_1263_10_0301_056_1_0| Slave 2: Strangventil Zustand | 1 |  |
| 00_1262_1263_10_0301_024_4_0| Slave 2: Stationsbetriebssekunden | 1 |  s |



### <a name="1262_1264_0301"></a>Viessmann Vitotrans 353 2017 Slave 1 (0x1262) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1262_1264_10_0301_000_2_0| Slave 3: Version | 1 |  |
| 00_1262_1264_10_0301_028_1_0| Slave 3: Reglervariante | 1 |  |
| 00_1262_1264_10_0301_002_2_0| Slave 3: Status | 1 |  |
| 00_1262_1264_10_0301_004_4_0| Slave 3: Fehlermaske | 1 |  |
| 00_1262_1264_10_0301_008_2_0| Slave 3: T-WW | 0.1 |  °C |
| 00_1262_1264_10_0301_010_2_0| Slave 3: T-KW | 0.1 |  °C |
| 00_1262_1264_10_0301_012_2_0| Slave 3: T-SpVL | 0.1 |  °C |
| 00_1262_1264_10_0301_016_4_0| Slave 3: Volumenstrom | 0.1 |  l/min |
| 00_1262_1264_10_0301_049_1_0| Slave 3: Primärpumpe Drehzahl | 1 | % |
| 00_1262_1264_10_0301_052_4_0| Slave 3: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1262_1264_10_0301_056_1_0| Slave 3: Strangventil Zustand | 1 |  |
| 00_1262_1264_10_0301_024_4_0| Slave 3: Stationsbetriebssekunden | 1 |  s |



### <a name="1263_1261_0301"></a>Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1263_1261_10_0301_000_2_0| Master: Version | 1 |  |
| 00_1263_1261_10_0301_028_1_0| Master: Reglervariante | 1 |  |
| 00_1263_1261_10_0301_002_2_0| Master: Status | 1 |  |
| 00_1263_1261_10_0301_004_4_0| Master: Fehlermaske | 1 |  |
| 00_1263_1261_10_0301_008_2_0| Master: T-WW | 0.1 |  °C |
| 00_1263_1261_10_0301_010_2_0| Master: T-KW | 0.1 |  °C |
| 00_1263_1261_10_0301_012_2_0| Master: T-SpVL | 0.1 |  °C |
| 00_1263_1261_10_0301_016_4_0| Master: Volumenstrom | 0.1 |  l/min |
| 00_1263_1261_10_0301_049_1_0| Master: Primärpumpe Drehzahl | 1 | % |
| 00_1263_1261_10_0301_052_4_0| Master: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1263_1261_10_0301_056_1_0| Master: Strangventil Zustand | 1 |  |
| 00_1263_1261_10_0301_024_4_0| Master: Stationsbetriebssekunden | 1 |  s |



### <a name="1263_1262_0301"></a>Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1263_1262_10_0301_000_2_0| Slave 1: Version | 1 |  |
| 00_1263_1262_10_0301_028_1_0| Slave 1: Reglervariante | 1 |  |
| 00_1263_1262_10_0301_002_2_0| Slave 1: Status | 1 |  |
| 00_1263_1262_10_0301_004_4_0| Slave 1: Fehlermaske | 1 |  |
| 00_1263_1262_10_0301_008_2_0| Slave 1: T-WW | 0.1 |  °C |
| 00_1263_1262_10_0301_010_2_0| Slave 1: T-KW | 0.1 |  °C |
| 00_1263_1262_10_0301_012_2_0| Slave 1: T-SpVL | 0.1 |  °C |
| 00_1263_1262_10_0301_016_4_0| Slave 1: Volumenstrom | 0.1 |  l/min |
| 00_1263_1262_10_0301_049_1_0| Slave 1: Primärpumpe Drehzahl | 1 | % |
| 00_1263_1262_10_0301_052_4_0| Slave 1: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1263_1262_10_0301_056_1_0| Slave 1: Strangventil Zustand | 1 |  |
| 00_1263_1262_10_0301_024_4_0| Slave 1: Stationsbetriebssekunden | 1 |  s |



### <a name="1263_1263_0301"></a>Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1263_1263_10_0301_000_2_0| Slave 2: Version | 1 |  |
| 00_1263_1263_10_0301_028_1_0| Slave 2: Reglervariante | 1 |  |
| 00_1263_1263_10_0301_002_2_0| Slave 2: Status | 1 |  |
| 00_1263_1263_10_0301_004_4_0| Slave 2: Fehlermaske | 1 |  |
| 00_1263_1263_10_0301_008_2_0| Slave 2: T-WW | 0.1 |  °C |
| 00_1263_1263_10_0301_010_2_0| Slave 2: T-KW | 0.1 |  °C |
| 00_1263_1263_10_0301_012_2_0| Slave 2: T-SpVL | 0.1 |  °C |
| 00_1263_1263_10_0301_016_4_0| Slave 2: Volumenstrom | 0.1 |  l/min |
| 00_1263_1263_10_0301_049_1_0| Slave 2: Primärpumpe Drehzahl | 1 | % |
| 00_1263_1263_10_0301_052_4_0| Slave 2: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1263_1263_10_0301_056_1_0| Slave 2: Strangventil Zustand | 1 |  |
| 00_1263_1263_10_0301_024_4_0| Slave 2: Stationsbetriebssekunden | 1 |  s |



### <a name="1263_1264_0301"></a>Viessmann Vitotrans 353 2017 Slave 2 (0x1263) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1263_1264_10_0301_000_2_0| Slave 3: Version | 1 |  |
| 00_1263_1264_10_0301_028_1_0| Slave 3: Reglervariante | 1 |  |
| 00_1263_1264_10_0301_002_2_0| Slave 3: Status | 1 |  |
| 00_1263_1264_10_0301_004_4_0| Slave 3: Fehlermaske | 1 |  |
| 00_1263_1264_10_0301_008_2_0| Slave 3: T-WW | 0.1 |  °C |
| 00_1263_1264_10_0301_010_2_0| Slave 3: T-KW | 0.1 |  °C |
| 00_1263_1264_10_0301_012_2_0| Slave 3: T-SpVL | 0.1 |  °C |
| 00_1263_1264_10_0301_016_4_0| Slave 3: Volumenstrom | 0.1 |  l/min |
| 00_1263_1264_10_0301_049_1_0| Slave 3: Primärpumpe Drehzahl | 1 | % |
| 00_1263_1264_10_0301_052_4_0| Slave 3: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1263_1264_10_0301_056_1_0| Slave 3: Strangventil Zustand | 1 |  |
| 00_1263_1264_10_0301_024_4_0| Slave 3: Stationsbetriebssekunden | 1 |  s |



### <a name="1264_1261_0301"></a>Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Master (0x1261), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1264_1261_10_0301_000_2_0| Master: Version | 1 |  |
| 00_1264_1261_10_0301_028_1_0| Master: Reglervariante | 1 |  |
| 00_1264_1261_10_0301_002_2_0| Master: Status | 1 |  |
| 00_1264_1261_10_0301_004_4_0| Master: Fehlermaske | 1 |  |
| 00_1264_1261_10_0301_008_2_0| Master: T-WW | 0.1 |  °C |
| 00_1264_1261_10_0301_010_2_0| Master: T-KW | 0.1 |  °C |
| 00_1264_1261_10_0301_012_2_0| Master: T-SpVL | 0.1 |  °C |
| 00_1264_1261_10_0301_016_4_0| Master: Volumenstrom | 0.1 |  l/min |
| 00_1264_1261_10_0301_049_1_0| Master: Primärpumpe Drehzahl | 1 | % |
| 00_1264_1261_10_0301_052_4_0| Master: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1264_1261_10_0301_056_1_0| Master: Strangventil Zustand | 1 |  |
| 00_1264_1261_10_0301_024_4_0| Master: Stationsbetriebssekunden | 1 |  s |



### <a name="1264_1262_0301"></a>Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 1 (0x1262), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1264_1262_10_0301_000_2_0| Slave 1: Version | 1 |  |
| 00_1264_1262_10_0301_028_1_0| Slave 1: Reglervariante | 1 |  |
| 00_1264_1262_10_0301_002_2_0| Slave 1: Status | 1 |  |
| 00_1264_1262_10_0301_004_4_0| Slave 1: Fehlermaske | 1 |  |
| 00_1264_1262_10_0301_008_2_0| Slave 1: T-WW | 0.1 |  °C |
| 00_1264_1262_10_0301_010_2_0| Slave 1: T-KW | 0.1 |  °C |
| 00_1264_1262_10_0301_012_2_0| Slave 1: T-SpVL | 0.1 |  °C |
| 00_1264_1262_10_0301_016_4_0| Slave 1: Volumenstrom | 0.1 |  l/min |
| 00_1264_1262_10_0301_049_1_0| Slave 1: Primärpumpe Drehzahl | 1 | % |
| 00_1264_1262_10_0301_052_4_0| Slave 1: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1264_1262_10_0301_056_1_0| Slave 1: Strangventil Zustand | 1 |  |
| 00_1264_1262_10_0301_024_4_0| Slave 1: Stationsbetriebssekunden | 1 |  s |



### <a name="1264_1263_0301"></a>Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 2 (0x1263), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1264_1263_10_0301_000_2_0| Slave 2: Version | 1 |  |
| 00_1264_1263_10_0301_028_1_0| Slave 2: Reglervariante | 1 |  |
| 00_1264_1263_10_0301_002_2_0| Slave 2: Status | 1 |  |
| 00_1264_1263_10_0301_004_4_0| Slave 2: Fehlermaske | 1 |  |
| 00_1264_1263_10_0301_008_2_0| Slave 2: T-WW | 0.1 |  °C |
| 00_1264_1263_10_0301_010_2_0| Slave 2: T-KW | 0.1 |  °C |
| 00_1264_1263_10_0301_012_2_0| Slave 2: T-SpVL | 0.1 |  °C |
| 00_1264_1263_10_0301_016_4_0| Slave 2: Volumenstrom | 0.1 |  l/min |
| 00_1264_1263_10_0301_049_1_0| Slave 2: Primärpumpe Drehzahl | 1 | % |
| 00_1264_1263_10_0301_052_4_0| Slave 2: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1264_1263_10_0301_056_1_0| Slave 2: Strangventil Zustand | 1 |  |
| 00_1264_1263_10_0301_024_4_0| Slave 2: Stationsbetriebssekunden | 1 |  s |



### <a name="1264_1264_0301"></a>Viessmann Vitotrans 353 2017 Slave 3 (0x1264) <= Viessmann Vitotrans 353 2017 Slave 3 (0x1264), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1264_1264_10_0301_000_2_0| Slave 3: Version | 1 |  |
| 00_1264_1264_10_0301_028_1_0| Slave 3: Reglervariante | 1 |  |
| 00_1264_1264_10_0301_002_2_0| Slave 3: Status | 1 |  |
| 00_1264_1264_10_0301_004_4_0| Slave 3: Fehlermaske | 1 |  |
| 00_1264_1264_10_0301_008_2_0| Slave 3: T-WW | 0.1 |  °C |
| 00_1264_1264_10_0301_010_2_0| Slave 3: T-KW | 0.1 |  °C |
| 00_1264_1264_10_0301_012_2_0| Slave 3: T-SpVL | 0.1 |  °C |
| 00_1264_1264_10_0301_016_4_0| Slave 3: Volumenstrom | 0.1 |  l/min |
| 00_1264_1264_10_0301_049_1_0| Slave 3: Primärpumpe Drehzahl | 1 | % |
| 00_1264_1264_10_0301_052_4_0| Slave 3: Primärpumpe Betriebssekunden | 1 |  s |
| 00_1264_1264_10_0301_056_1_0| Slave 3: Strangventil Zustand | 1 |  |
| 00_1264_1264_10_0301_024_4_0| Slave 3: Stationsbetriebssekunden | 1 |  s |



### <a name="1520_1521_0222"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0222

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1520_1521_10_0222_000_1_2| Station 1 Basis | 1 |  |
| 00_1520_1521_10_0222_000_1_4| Station 2 Basis | 1 |  |
| 00_1520_1521_10_0222_000_1_8| Station 3 Basis | 1 |  |
| 00_1520_1521_10_0222_000_1_16| Station 4 Basis | 1 |  |
| 00_1520_1521_10_0222_001_1_2| Station 1 Ein | 1 |  |
| 00_1520_1521_10_0222_001_1_4| Station 2 Ein | 1 |  |
| 00_1520_1521_10_0222_001_1_8| Station 3 Ein | 1 |  |
| 00_1520_1521_10_0222_001_1_16| Station 4 Ein | 1 |  |
| 00_1520_1521_10_0222_002_1_2| Station 1 Erreichbar | 1 |  |
| 00_1520_1521_10_0222_002_1_4| Station 2 Erreichbar | 1 |  |
| 00_1520_1521_10_0222_002_1_8| Station 3 Erreichbar | 1 |  |
| 00_1520_1521_10_0222_002_1_16| Station 4 Erreichbar | 1 |  |
| 00_1520_1521_10_0222_003_1_2| Station 1 Fehler | 1 |  |
| 00_1520_1521_10_0222_003_1_4| Station 2 Fehler | 1 |  |
| 00_1520_1521_10_0222_003_1_8| Station 3 Fehler | 1 |  |
| 00_1520_1521_10_0222_003_1_16| Station 4 Fehler | 1 |  |
| 00_1520_1521_10_0222_004_1_2| Station 1 Durchflusserkennung | 1 |  |
| 00_1520_1521_10_0222_004_1_4| Station 2 Durchflusserkennung | 1 |  |
| 00_1520_1521_10_0222_004_1_8| Station 3 Durchflusserkennung | 1 |  |
| 00_1520_1521_10_0222_004_1_16| Station 4 Durchflusserkennung | 1 |  |
| 00_1520_1521_10_0222_005_1_2| Station 1 Desinfektion | 1 |  |
| 00_1520_1521_10_0222_005_1_4| Station 2 Desinfektion | 1 |  |
| 00_1520_1521_10_0222_005_1_8| Station 3 Desinfektion | 1 |  |
| 00_1520_1521_10_0222_005_1_16| Station 4 Desinfektion | 1 |  |
| 00_1520_1521_10_0222_006_1_2| Station 1 Blockierschutz | 1 |  |
| 00_1520_1521_10_0222_006_1_4| Station 2 Blockierschutz | 1 |  |
| 00_1520_1521_10_0222_006_1_8| Station 3 Blockierschutz | 1 |  |
| 00_1520_1521_10_0222_006_1_16| Station 4 Blockierschutz | 1 |  |
| 00_1520_1521_10_0222_007_1_0| DurchflussErwartet | 1 |  |
| 00_1520_1521_10_0222_008_1_0| RLEinschichtung Relais | 1 |  |



### <a name="1520_1521_0333"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0333

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1520_1521_10_0333_004_4_0| Station 1: Systemdatum | 1 |  |
| 00_1520_1521_10_0333_024_2_0| Station 1: Solltemperatur | 0.1 |  °C |
| 00_1520_1521_10_0333_028_1_0| Station 1: Variante | 1 |  |



### <a name="1520_1522_0222"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0222

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1520_1522_10_0222_000_1_2| Station 1 Basis | 1 |  |
| 00_1520_1522_10_0222_000_1_4| Station 2 Basis | 1 |  |
| 00_1520_1522_10_0222_000_1_8| Station 3 Basis | 1 |  |
| 00_1520_1522_10_0222_000_1_16| Station 4 Basis | 1 |  |
| 00_1520_1522_10_0222_001_1_2| Station 1 Ein | 1 |  |
| 00_1520_1522_10_0222_001_1_4| Station 2 Ein | 1 |  |
| 00_1520_1522_10_0222_001_1_8| Station 3 Ein | 1 |  |
| 00_1520_1522_10_0222_001_1_16| Station 4 Ein | 1 |  |
| 00_1520_1522_10_0222_002_1_2| Station 1 Erreichbar | 1 |  |
| 00_1520_1522_10_0222_002_1_4| Station 2 Erreichbar | 1 |  |
| 00_1520_1522_10_0222_002_1_8| Station 3 Erreichbar | 1 |  |
| 00_1520_1522_10_0222_002_1_16| Station 4 Erreichbar | 1 |  |
| 00_1520_1522_10_0222_003_1_2| Station 1 Fehler | 1 |  |
| 00_1520_1522_10_0222_003_1_4| Station 2 Fehler | 1 |  |
| 00_1520_1522_10_0222_003_1_8| Station 3 Fehler | 1 |  |
| 00_1520_1522_10_0222_003_1_16| Station 4 Fehler | 1 |  |
| 00_1520_1522_10_0222_004_1_2| Station 1 Durchflusserkennung | 1 |  |
| 00_1520_1522_10_0222_004_1_4| Station 2 Durchflusserkennung | 1 |  |
| 00_1520_1522_10_0222_004_1_8| Station 3 Durchflusserkennung | 1 |  |
| 00_1520_1522_10_0222_004_1_16| Station 4 Durchflusserkennung | 1 |  |
| 00_1520_1522_10_0222_005_1_2| Station 1 Desinfektion | 1 |  |
| 00_1520_1522_10_0222_005_1_4| Station 2 Desinfektion | 1 |  |
| 00_1520_1522_10_0222_005_1_8| Station 3 Desinfektion | 1 |  |
| 00_1520_1522_10_0222_005_1_16| Station 4 Desinfektion | 1 |  |
| 00_1520_1522_10_0222_006_1_2| Station 1 Blockierschutz | 1 |  |
| 00_1520_1522_10_0222_006_1_4| Station 2 Blockierschutz | 1 |  |
| 00_1520_1522_10_0222_006_1_8| Station 3 Blockierschutz | 1 |  |
| 00_1520_1522_10_0222_006_1_16| Station 4 Blockierschutz | 1 |  |
| 00_1520_1522_10_0222_007_1_0| DurchflussErwartet | 1 |  |
| 00_1520_1522_10_0222_008_1_0| RLEinschichtung Relais | 1 |  |



### <a name="1520_1522_0333"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0333

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1520_1522_10_0333_004_4_0| Station 2: Systemdatum | 1 |  |
| 00_1520_1522_10_0333_024_2_0| Station 2: Solltemperatur | 0.1 |  °C |
| 00_1520_1522_10_0333_028_1_0| Station 2: Variante | 1 |  |



### <a name="1520_1523_0222"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0222

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1520_1523_10_0222_000_1_2| Station 1 Basis | 1 |  |
| 00_1520_1523_10_0222_000_1_4| Station 2 Basis | 1 |  |
| 00_1520_1523_10_0222_000_1_8| Station 3 Basis | 1 |  |
| 00_1520_1523_10_0222_000_1_16| Station 4 Basis | 1 |  |
| 00_1520_1523_10_0222_001_1_2| Station 1 Ein | 1 |  |
| 00_1520_1523_10_0222_001_1_4| Station 2 Ein | 1 |  |
| 00_1520_1523_10_0222_001_1_8| Station 3 Ein | 1 |  |
| 00_1520_1523_10_0222_001_1_16| Station 4 Ein | 1 |  |
| 00_1520_1523_10_0222_002_1_2| Station 1 Erreichbar | 1 |  |
| 00_1520_1523_10_0222_002_1_4| Station 2 Erreichbar | 1 |  |
| 00_1520_1523_10_0222_002_1_8| Station 3 Erreichbar | 1 |  |
| 00_1520_1523_10_0222_002_1_16| Station 4 Erreichbar | 1 |  |
| 00_1520_1523_10_0222_003_1_2| Station 1 Fehler | 1 |  |
| 00_1520_1523_10_0222_003_1_4| Station 2 Fehler | 1 |  |
| 00_1520_1523_10_0222_003_1_8| Station 3 Fehler | 1 |  |
| 00_1520_1523_10_0222_003_1_16| Station 4 Fehler | 1 |  |
| 00_1520_1523_10_0222_004_1_2| Station 1 Durchflusserkennung | 1 |  |
| 00_1520_1523_10_0222_004_1_4| Station 2 Durchflusserkennung | 1 |  |
| 00_1520_1523_10_0222_004_1_8| Station 3 Durchflusserkennung | 1 |  |
| 00_1520_1523_10_0222_004_1_16| Station 4 Durchflusserkennung | 1 |  |
| 00_1520_1523_10_0222_005_1_2| Station 1 Desinfektion | 1 |  |
| 00_1520_1523_10_0222_005_1_4| Station 2 Desinfektion | 1 |  |
| 00_1520_1523_10_0222_005_1_8| Station 3 Desinfektion | 1 |  |
| 00_1520_1523_10_0222_005_1_16| Station 4 Desinfektion | 1 |  |
| 00_1520_1523_10_0222_006_1_2| Station 1 Blockierschutz | 1 |  |
| 00_1520_1523_10_0222_006_1_4| Station 2 Blockierschutz | 1 |  |
| 00_1520_1523_10_0222_006_1_8| Station 3 Blockierschutz | 1 |  |
| 00_1520_1523_10_0222_006_1_16| Station 4 Blockierschutz | 1 |  |
| 00_1520_1523_10_0222_007_1_0| DurchflussErwartet | 1 |  |
| 00_1520_1523_10_0222_008_1_0| RLEinschichtung Relais | 1 |  |



### <a name="1520_1523_0333"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0333

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1520_1523_10_0333_004_4_0| Station 3: Systemdatum | 1 |  |
| 00_1520_1523_10_0333_024_2_0| Station 3: Solltemperatur | 0.1 |  °C |
| 00_1520_1523_10_0333_028_1_0| Station 3: Variante | 1 |  |



### <a name="1520_1524_0222"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0222

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1520_1524_10_0222_000_1_2| Station 1 Basis | 1 |  |
| 00_1520_1524_10_0222_000_1_4| Station 2 Basis | 1 |  |
| 00_1520_1524_10_0222_000_1_8| Station 3 Basis | 1 |  |
| 00_1520_1524_10_0222_000_1_16| Station 4 Basis | 1 |  |
| 00_1520_1524_10_0222_001_1_2| Station 1 Ein | 1 |  |
| 00_1520_1524_10_0222_001_1_4| Station 2 Ein | 1 |  |
| 00_1520_1524_10_0222_001_1_8| Station 3 Ein | 1 |  |
| 00_1520_1524_10_0222_001_1_16| Station 4 Ein | 1 |  |
| 00_1520_1524_10_0222_002_1_2| Station 1 Erreichbar | 1 |  |
| 00_1520_1524_10_0222_002_1_4| Station 2 Erreichbar | 1 |  |
| 00_1520_1524_10_0222_002_1_8| Station 3 Erreichbar | 1 |  |
| 00_1520_1524_10_0222_002_1_16| Station 4 Erreichbar | 1 |  |
| 00_1520_1524_10_0222_003_1_2| Station 1 Fehler | 1 |  |
| 00_1520_1524_10_0222_003_1_4| Station 2 Fehler | 1 |  |
| 00_1520_1524_10_0222_003_1_8| Station 3 Fehler | 1 |  |
| 00_1520_1524_10_0222_003_1_16| Station 4 Fehler | 1 |  |
| 00_1520_1524_10_0222_004_1_2| Station 1 Durchflusserkennung | 1 |  |
| 00_1520_1524_10_0222_004_1_4| Station 2 Durchflusserkennung | 1 |  |
| 00_1520_1524_10_0222_004_1_8| Station 3 Durchflusserkennung | 1 |  |
| 00_1520_1524_10_0222_004_1_16| Station 4 Durchflusserkennung | 1 |  |
| 00_1520_1524_10_0222_005_1_2| Station 1 Desinfektion | 1 |  |
| 00_1520_1524_10_0222_005_1_4| Station 2 Desinfektion | 1 |  |
| 00_1520_1524_10_0222_005_1_8| Station 3 Desinfektion | 1 |  |
| 00_1520_1524_10_0222_005_1_16| Station 4 Desinfektion | 1 |  |
| 00_1520_1524_10_0222_006_1_2| Station 1 Blockierschutz | 1 |  |
| 00_1520_1524_10_0222_006_1_4| Station 2 Blockierschutz | 1 |  |
| 00_1520_1524_10_0222_006_1_8| Station 3 Blockierschutz | 1 |  |
| 00_1520_1524_10_0222_006_1_16| Station 4 Blockierschutz | 1 |  |
| 00_1520_1524_10_0222_007_1_0| DurchflussErwartet | 1 |  |
| 00_1520_1524_10_0222_008_1_0| RLEinschichtung Relais | 1 |  |



### <a name="1520_1524_0333"></a>DeltaSol Fresh 2018 Kaskade Broadcast (0x1520) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0333

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1520_1524_10_0333_004_4_0| Station 4: Systemdatum | 1 |  |
| 00_1520_1524_10_0333_024_2_0| Station 4: Solltemperatur | 0.1 |  °C |
| 00_1520_1524_10_0333_028_1_0| Station 4: Variante | 1 |  |



### <a name="1521_1521_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1521_1521_10_0112_004_4_0| Station 1: Systemdatum | 1 |  |
| 00_1521_1521_10_0112_012_4_0| Station 1: Gesamtbetriebssekunden | 1 |  |
| 00_1521_1521_10_0112_016_4_0| Station 1: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1521_1521_10_0112_024_4_0| Station 1: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1521_1521_10_0112_042_2_0| Station 1: Warmwasser TWW | 0.1 |  °C |
| 00_1521_1521_10_0112_046_2_0| Station 1: Warmwasser TVL | 0.1 |  °C |
| 00_1521_1521_10_0112_048_2_0| Station 1: Primärpumpe Drehzahl | 1 | % |
| 00_1521_1521_10_0112_050_2_0| Station 1: Zirkulation TRL | 0.1 |  °C |
| 00_1521_1521_10_0112_052_2_0| Station 1: Zirkulation Drehzahl | 1 | % |
| 00_1521_1521_10_0112_054_2_0| Station 1: RLEinschichtung TRL | 0.1 |  °C |
| 00_1521_1521_10_0112_056_2_0| Station 1: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1521_1521_10_0112_058_1_0| Station 1: Variante | 1 |  |
| 00_1521_1521_10_0112_060_1_0| Station 1: Strangventil Zustand | 1 |  |
| 00_1521_1521_10_0112_062_1_0| Station 1: RLEinschichtung Ventil | 1 |  |



### <a name="1521_1522_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1521_1522_10_0112_004_4_0| Station 2: Systemdatum | 1 |  |
| 00_1521_1522_10_0112_012_4_0| Station 2: Gesamtbetriebssekunden | 1 |  |
| 00_1521_1522_10_0112_016_4_0| Station 2: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1521_1522_10_0112_024_4_0| Station 2: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1521_1522_10_0112_042_2_0| Station 2: Warmwasser TWW | 0.1 |  °C |
| 00_1521_1522_10_0112_046_2_0| Station 2: Warmwasser TVL | 0.1 |  °C |
| 00_1521_1522_10_0112_048_2_0| Station 2: Primärpumpe Drehzahl | 1 | % |
| 00_1521_1522_10_0112_050_2_0| Station 2: Zirkulation TRL | 0.1 |  °C |
| 00_1521_1522_10_0112_052_2_0| Station 2: Zirkulation Drehzahl | 1 | % |
| 00_1521_1522_10_0112_054_2_0| Station 2: RLEinschichtung TRL | 0.1 |  °C |
| 00_1521_1522_10_0112_056_2_0| Station 2: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1521_1522_10_0112_058_1_0| Station 2: Variante | 1 |  |
| 00_1521_1522_10_0112_060_1_0| Station 2: Strangventil Zustand | 1 |  |
| 00_1521_1522_10_0112_062_1_0| Station 2: RLEinschichtung Ventil | 1 |  |



### <a name="1521_1523_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1521_1523_10_0112_004_4_0| Station 3: Systemdatum | 1 |  |
| 00_1521_1523_10_0112_012_4_0| Station 3: Gesamtbetriebssekunden | 1 |  |
| 00_1521_1523_10_0112_016_4_0| Station 3: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1521_1523_10_0112_024_4_0| Station 3: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1521_1523_10_0112_042_2_0| Station 3: Warmwasser TWW | 0.1 |  °C |
| 00_1521_1523_10_0112_046_2_0| Station 3: Warmwasser TVL | 0.1 |  °C |
| 00_1521_1523_10_0112_048_2_0| Station 3: Primärpumpe Drehzahl | 1 | % |
| 00_1521_1523_10_0112_050_2_0| Station 3: Zirkulation TRL | 0.1 |  °C |
| 00_1521_1523_10_0112_052_2_0| Station 3: Zirkulation Drehzahl | 1 | % |
| 00_1521_1523_10_0112_054_2_0| Station 3: RLEinschichtung TRL | 0.1 |  °C |
| 00_1521_1523_10_0112_056_2_0| Station 3: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1521_1523_10_0112_058_1_0| Station 3: Variante | 1 |  |
| 00_1521_1523_10_0112_060_1_0| Station 3: Strangventil Zustand | 1 |  |
| 00_1521_1523_10_0112_062_1_0| Station 3: RLEinschichtung Ventil | 1 |  |



### <a name="1521_1524_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1521_1524_10_0112_004_4_0| Station 4: Systemdatum | 1 |  |
| 00_1521_1524_10_0112_012_4_0| Station 4: Gesamtbetriebssekunden | 1 |  |
| 00_1521_1524_10_0112_016_4_0| Station 4: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1521_1524_10_0112_024_4_0| Station 4: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1521_1524_10_0112_042_2_0| Station 4: Warmwasser TWW | 0.1 |  °C |
| 00_1521_1524_10_0112_046_2_0| Station 4: Warmwasser TVL | 0.1 |  °C |
| 00_1521_1524_10_0112_048_2_0| Station 4: Primärpumpe Drehzahl | 1 | % |
| 00_1521_1524_10_0112_050_2_0| Station 4: Zirkulation TRL | 0.1 |  °C |
| 00_1521_1524_10_0112_052_2_0| Station 4: Zirkulation Drehzahl | 1 | % |
| 00_1521_1524_10_0112_054_2_0| Station 4: RLEinschichtung TRL | 0.1 |  °C |
| 00_1521_1524_10_0112_056_2_0| Station 4: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1521_1524_10_0112_058_1_0| Station 4: Variante | 1 |  |
| 00_1521_1524_10_0112_060_1_0| Station 4: Strangventil Zustand | 1 |  |
| 00_1521_1524_10_0112_062_1_0| Station 4: RLEinschichtung Ventil | 1 |  |



### <a name="1522_1521_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1522_1521_10_0112_004_4_0| Station 1: Systemdatum | 1 |  |
| 00_1522_1521_10_0112_012_4_0| Station 1: Gesamtbetriebssekunden | 1 |  |
| 00_1522_1521_10_0112_016_4_0| Station 1: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1522_1521_10_0112_024_4_0| Station 1: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1522_1521_10_0112_042_2_0| Station 1: Warmwasser TWW | 0.1 |  °C |
| 00_1522_1521_10_0112_046_2_0| Station 1: Warmwasser TVL | 0.1 |  °C |
| 00_1522_1521_10_0112_048_2_0| Station 1: Primärpumpe Drehzahl | 1 | % |
| 00_1522_1521_10_0112_050_2_0| Station 1: Zirkulation TRL | 0.1 |  °C |
| 00_1522_1521_10_0112_052_2_0| Station 1: Zirkulation Drehzahl | 1 | % |
| 00_1522_1521_10_0112_054_2_0| Station 1: RLEinschichtung TRL | 0.1 |  °C |
| 00_1522_1521_10_0112_056_2_0| Station 1: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1522_1521_10_0112_058_1_0| Station 1: Variante | 1 |  |
| 00_1522_1521_10_0112_060_1_0| Station 1: Strangventil Zustand | 1 |  |
| 00_1522_1521_10_0112_062_1_0| Station 1: RLEinschichtung Ventil | 1 |  |



### <a name="1522_1522_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1522_1522_10_0112_004_4_0| Station 2: Systemdatum | 1 |  |
| 00_1522_1522_10_0112_012_4_0| Station 2: Gesamtbetriebssekunden | 1 |  |
| 00_1522_1522_10_0112_016_4_0| Station 2: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1522_1522_10_0112_024_4_0| Station 2: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1522_1522_10_0112_042_2_0| Station 2: Warmwasser TWW | 0.1 |  °C |
| 00_1522_1522_10_0112_046_2_0| Station 2: Warmwasser TVL | 0.1 |  °C |
| 00_1522_1522_10_0112_048_2_0| Station 2: Primärpumpe Drehzahl | 1 | % |
| 00_1522_1522_10_0112_050_2_0| Station 2: Zirkulation TRL | 0.1 |  °C |
| 00_1522_1522_10_0112_052_2_0| Station 2: Zirkulation Drehzahl | 1 | % |
| 00_1522_1522_10_0112_054_2_0| Station 2: RLEinschichtung TRL | 0.1 |  °C |
| 00_1522_1522_10_0112_056_2_0| Station 2: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1522_1522_10_0112_058_1_0| Station 2: Variante | 1 |  |
| 00_1522_1522_10_0112_060_1_0| Station 2: Strangventil Zustand | 1 |  |
| 00_1522_1522_10_0112_062_1_0| Station 2: RLEinschichtung Ventil | 1 |  |



### <a name="1522_1523_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1522_1523_10_0112_004_4_0| Station 3: Systemdatum | 1 |  |
| 00_1522_1523_10_0112_012_4_0| Station 3: Gesamtbetriebssekunden | 1 |  |
| 00_1522_1523_10_0112_016_4_0| Station 3: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1522_1523_10_0112_024_4_0| Station 3: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1522_1523_10_0112_042_2_0| Station 3: Warmwasser TWW | 0.1 |  °C |
| 00_1522_1523_10_0112_046_2_0| Station 3: Warmwasser TVL | 0.1 |  °C |
| 00_1522_1523_10_0112_048_2_0| Station 3: Primärpumpe Drehzahl | 1 | % |
| 00_1522_1523_10_0112_050_2_0| Station 3: Zirkulation TRL | 0.1 |  °C |
| 00_1522_1523_10_0112_052_2_0| Station 3: Zirkulation Drehzahl | 1 | % |
| 00_1522_1523_10_0112_054_2_0| Station 3: RLEinschichtung TRL | 0.1 |  °C |
| 00_1522_1523_10_0112_056_2_0| Station 3: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1522_1523_10_0112_058_1_0| Station 3: Variante | 1 |  |
| 00_1522_1523_10_0112_060_1_0| Station 3: Strangventil Zustand | 1 |  |
| 00_1522_1523_10_0112_062_1_0| Station 3: RLEinschichtung Ventil | 1 |  |



### <a name="1522_1524_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1522_1524_10_0112_004_4_0| Station 4: Systemdatum | 1 |  |
| 00_1522_1524_10_0112_012_4_0| Station 4: Gesamtbetriebssekunden | 1 |  |
| 00_1522_1524_10_0112_016_4_0| Station 4: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1522_1524_10_0112_024_4_0| Station 4: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1522_1524_10_0112_042_2_0| Station 4: Warmwasser TWW | 0.1 |  °C |
| 00_1522_1524_10_0112_046_2_0| Station 4: Warmwasser TVL | 0.1 |  °C |
| 00_1522_1524_10_0112_048_2_0| Station 4: Primärpumpe Drehzahl | 1 | % |
| 00_1522_1524_10_0112_050_2_0| Station 4: Zirkulation TRL | 0.1 |  °C |
| 00_1522_1524_10_0112_052_2_0| Station 4: Zirkulation Drehzahl | 1 | % |
| 00_1522_1524_10_0112_054_2_0| Station 4: RLEinschichtung TRL | 0.1 |  °C |
| 00_1522_1524_10_0112_056_2_0| Station 4: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1522_1524_10_0112_058_1_0| Station 4: Variante | 1 |  |
| 00_1522_1524_10_0112_060_1_0| Station 4: Strangventil Zustand | 1 |  |
| 00_1522_1524_10_0112_062_1_0| Station 4: RLEinschichtung Ventil | 1 |  |



### <a name="1523_1521_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1523_1521_10_0112_004_4_0| Station 1: Systemdatum | 1 |  |
| 00_1523_1521_10_0112_012_4_0| Station 1: Gesamtbetriebssekunden | 1 |  |
| 00_1523_1521_10_0112_016_4_0| Station 1: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1523_1521_10_0112_024_4_0| Station 1: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1523_1521_10_0112_042_2_0| Station 1: Warmwasser TWW | 0.1 |  °C |
| 00_1523_1521_10_0112_046_2_0| Station 1: Warmwasser TVL | 0.1 |  °C |
| 00_1523_1521_10_0112_048_2_0| Station 1: Primärpumpe Drehzahl | 1 | % |
| 00_1523_1521_10_0112_050_2_0| Station 1: Zirkulation TRL | 0.1 |  °C |
| 00_1523_1521_10_0112_052_2_0| Station 1: Zirkulation Drehzahl | 1 | % |
| 00_1523_1521_10_0112_054_2_0| Station 1: RLEinschichtung TRL | 0.1 |  °C |
| 00_1523_1521_10_0112_056_2_0| Station 1: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1523_1521_10_0112_058_1_0| Station 1: Variante | 1 |  |
| 00_1523_1521_10_0112_060_1_0| Station 1: Strangventil Zustand | 1 |  |
| 00_1523_1521_10_0112_062_1_0| Station 1: RLEinschichtung Ventil | 1 |  |



### <a name="1523_1522_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1523_1522_10_0112_004_4_0| Station 2: Systemdatum | 1 |  |
| 00_1523_1522_10_0112_012_4_0| Station 2: Gesamtbetriebssekunden | 1 |  |
| 00_1523_1522_10_0112_016_4_0| Station 2: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1523_1522_10_0112_024_4_0| Station 2: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1523_1522_10_0112_042_2_0| Station 2: Warmwasser TWW | 0.1 |  °C |
| 00_1523_1522_10_0112_046_2_0| Station 2: Warmwasser TVL | 0.1 |  °C |
| 00_1523_1522_10_0112_048_2_0| Station 2: Primärpumpe Drehzahl | 1 | % |
| 00_1523_1522_10_0112_050_2_0| Station 2: Zirkulation TRL | 0.1 |  °C |
| 00_1523_1522_10_0112_052_2_0| Station 2: Zirkulation Drehzahl | 1 | % |
| 00_1523_1522_10_0112_054_2_0| Station 2: RLEinschichtung TRL | 0.1 |  °C |
| 00_1523_1522_10_0112_056_2_0| Station 2: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1523_1522_10_0112_058_1_0| Station 2: Variante | 1 |  |
| 00_1523_1522_10_0112_060_1_0| Station 2: Strangventil Zustand | 1 |  |
| 00_1523_1522_10_0112_062_1_0| Station 2: RLEinschichtung Ventil | 1 |  |



### <a name="1523_1523_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1523_1523_10_0112_004_4_0| Station 3: Systemdatum | 1 |  |
| 00_1523_1523_10_0112_012_4_0| Station 3: Gesamtbetriebssekunden | 1 |  |
| 00_1523_1523_10_0112_016_4_0| Station 3: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1523_1523_10_0112_024_4_0| Station 3: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1523_1523_10_0112_042_2_0| Station 3: Warmwasser TWW | 0.1 |  °C |
| 00_1523_1523_10_0112_046_2_0| Station 3: Warmwasser TVL | 0.1 |  °C |
| 00_1523_1523_10_0112_048_2_0| Station 3: Primärpumpe Drehzahl | 1 | % |
| 00_1523_1523_10_0112_050_2_0| Station 3: Zirkulation TRL | 0.1 |  °C |
| 00_1523_1523_10_0112_052_2_0| Station 3: Zirkulation Drehzahl | 1 | % |
| 00_1523_1523_10_0112_054_2_0| Station 3: RLEinschichtung TRL | 0.1 |  °C |
| 00_1523_1523_10_0112_056_2_0| Station 3: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1523_1523_10_0112_058_1_0| Station 3: Variante | 1 |  |
| 00_1523_1523_10_0112_060_1_0| Station 3: Strangventil Zustand | 1 |  |
| 00_1523_1523_10_0112_062_1_0| Station 3: RLEinschichtung Ventil | 1 |  |



### <a name="1523_1524_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1523_1524_10_0112_004_4_0| Station 4: Systemdatum | 1 |  |
| 00_1523_1524_10_0112_012_4_0| Station 4: Gesamtbetriebssekunden | 1 |  |
| 00_1523_1524_10_0112_016_4_0| Station 4: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1523_1524_10_0112_024_4_0| Station 4: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1523_1524_10_0112_042_2_0| Station 4: Warmwasser TWW | 0.1 |  °C |
| 00_1523_1524_10_0112_046_2_0| Station 4: Warmwasser TVL | 0.1 |  °C |
| 00_1523_1524_10_0112_048_2_0| Station 4: Primärpumpe Drehzahl | 1 | % |
| 00_1523_1524_10_0112_050_2_0| Station 4: Zirkulation TRL | 0.1 |  °C |
| 00_1523_1524_10_0112_052_2_0| Station 4: Zirkulation Drehzahl | 1 | % |
| 00_1523_1524_10_0112_054_2_0| Station 4: RLEinschichtung TRL | 0.1 |  °C |
| 00_1523_1524_10_0112_056_2_0| Station 4: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1523_1524_10_0112_058_1_0| Station 4: Variante | 1 |  |
| 00_1523_1524_10_0112_060_1_0| Station 4: Strangventil Zustand | 1 |  |
| 00_1523_1524_10_0112_062_1_0| Station 4: RLEinschichtung Ventil | 1 |  |



### <a name="1524_1521_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 1 (0x1521), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1524_1521_10_0112_004_4_0| Station 1: Systemdatum | 1 |  |
| 00_1524_1521_10_0112_012_4_0| Station 1: Gesamtbetriebssekunden | 1 |  |
| 00_1524_1521_10_0112_016_4_0| Station 1: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1524_1521_10_0112_024_4_0| Station 1: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1524_1521_10_0112_042_2_0| Station 1: Warmwasser TWW | 0.1 |  °C |
| 00_1524_1521_10_0112_046_2_0| Station 1: Warmwasser TVL | 0.1 |  °C |
| 00_1524_1521_10_0112_048_2_0| Station 1: Primärpumpe Drehzahl | 1 | % |
| 00_1524_1521_10_0112_050_2_0| Station 1: Zirkulation TRL | 0.1 |  °C |
| 00_1524_1521_10_0112_052_2_0| Station 1: Zirkulation Drehzahl | 1 | % |
| 00_1524_1521_10_0112_054_2_0| Station 1: RLEinschichtung TRL | 0.1 |  °C |
| 00_1524_1521_10_0112_056_2_0| Station 1: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1524_1521_10_0112_058_1_0| Station 1: Variante | 1 |  |
| 00_1524_1521_10_0112_060_1_0| Station 1: Strangventil Zustand | 1 |  |
| 00_1524_1521_10_0112_062_1_0| Station 1: RLEinschichtung Ventil | 1 |  |



### <a name="1524_1522_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 2 (0x1522), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1524_1522_10_0112_004_4_0| Station 2: Systemdatum | 1 |  |
| 00_1524_1522_10_0112_012_4_0| Station 2: Gesamtbetriebssekunden | 1 |  |
| 00_1524_1522_10_0112_016_4_0| Station 2: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1524_1522_10_0112_024_4_0| Station 2: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1524_1522_10_0112_042_2_0| Station 2: Warmwasser TWW | 0.1 |  °C |
| 00_1524_1522_10_0112_046_2_0| Station 2: Warmwasser TVL | 0.1 |  °C |
| 00_1524_1522_10_0112_048_2_0| Station 2: Primärpumpe Drehzahl | 1 | % |
| 00_1524_1522_10_0112_050_2_0| Station 2: Zirkulation TRL | 0.1 |  °C |
| 00_1524_1522_10_0112_052_2_0| Station 2: Zirkulation Drehzahl | 1 | % |
| 00_1524_1522_10_0112_054_2_0| Station 2: RLEinschichtung TRL | 0.1 |  °C |
| 00_1524_1522_10_0112_056_2_0| Station 2: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1524_1522_10_0112_058_1_0| Station 2: Variante | 1 |  |
| 00_1524_1522_10_0112_060_1_0| Station 2: Strangventil Zustand | 1 |  |
| 00_1524_1522_10_0112_062_1_0| Station 2: RLEinschichtung Ventil | 1 |  |



### <a name="1524_1523_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 3 (0x1523), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1524_1523_10_0112_004_4_0| Station 3: Systemdatum | 1 |  |
| 00_1524_1523_10_0112_012_4_0| Station 3: Gesamtbetriebssekunden | 1 |  |
| 00_1524_1523_10_0112_016_4_0| Station 3: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1524_1523_10_0112_024_4_0| Station 3: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1524_1523_10_0112_042_2_0| Station 3: Warmwasser TWW | 0.1 |  °C |
| 00_1524_1523_10_0112_046_2_0| Station 3: Warmwasser TVL | 0.1 |  °C |
| 00_1524_1523_10_0112_048_2_0| Station 3: Primärpumpe Drehzahl | 1 | % |
| 00_1524_1523_10_0112_050_2_0| Station 3: Zirkulation TRL | 0.1 |  °C |
| 00_1524_1523_10_0112_052_2_0| Station 3: Zirkulation Drehzahl | 1 | % |
| 00_1524_1523_10_0112_054_2_0| Station 3: RLEinschichtung TRL | 0.1 |  °C |
| 00_1524_1523_10_0112_056_2_0| Station 3: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1524_1523_10_0112_058_1_0| Station 3: Variante | 1 |  |
| 00_1524_1523_10_0112_060_1_0| Station 3: Strangventil Zustand | 1 |  |
| 00_1524_1523_10_0112_062_1_0| Station 3: RLEinschichtung Ventil | 1 |  |



### <a name="1524_1524_0112"></a>DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524) <= DeltaSol Fresh 2018 Kaskade - Station 4 (0x1524), command 0x0112

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_1524_1524_10_0112_004_4_0| Station 4: Systemdatum | 1 |  |
| 00_1524_1524_10_0112_012_4_0| Station 4: Gesamtbetriebssekunden | 1 |  |
| 00_1524_1524_10_0112_016_4_0| Station 4: Warmwasser Volumenstrom | 0.1 |  l/min |
| 00_1524_1524_10_0112_024_4_0| Station 4: Primaerpumpe Betriebssekunden | 1 |  s |
| 00_1524_1524_10_0112_042_2_0| Station 4: Warmwasser TWW | 0.1 |  °C |
| 00_1524_1524_10_0112_046_2_0| Station 4: Warmwasser TVL | 0.1 |  °C |
| 00_1524_1524_10_0112_048_2_0| Station 4: Primärpumpe Drehzahl | 1 | % |
| 00_1524_1524_10_0112_050_2_0| Station 4: Zirkulation TRL | 0.1 |  °C |
| 00_1524_1524_10_0112_052_2_0| Station 4: Zirkulation Drehzahl | 1 | % |
| 00_1524_1524_10_0112_054_2_0| Station 4: RLEinschichtung TRL | 0.1 |  °C |
| 00_1524_1524_10_0112_056_2_0| Station 4: RLEinschichtung TSpeicher | 0.1 |  °C |
| 00_1524_1524_10_0112_058_1_0| Station 4: Variante | 1 |  |
| 00_1524_1524_10_0112_060_1_0| Station 4: Strangventil Zustand | 1 |  |
| 00_1524_1524_10_0112_062_1_0| Station 4: RLEinschichtung Ventil | 1 |  |



### <a name="4420_0000_0200"></a>HKM1 (0x4420 - 0x442F) <= any source, command 0x0200

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_4420_0000_10_0200_008_1_0| Vorlaufmaximaltemperatur | 1 |  °C |
| 00_4420_0000_10_0200_009_1_0| HK-Kennlinie | 0.1 |  |
| 00_4420_0000_10_0200_010_1_0| Nachtabsenkung | 1 |  K |
| 00_4420_0000_10_0200_011_1_0| Tageskorrektur | 1 |  K |
| 00_4420_0000_10_0200_012_1_0| Mischerlaufzeit | 1 |  s |
| 00_4420_0000_10_0200_013_1_0| Sommerbetrieb | 1 |  °C |
| 00_4420_0000_10_0200_014_1_0| Info Schaltuhr | 1 |  |



### <a name="5260_5260_0102"></a>Kaskade BasisAdr (0x5260) <= Kaskade BasisAdr (0x5260 - 0x526F), command 0x0102

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_5260_5260_10_0102_004_2_0| mStationEin | 1 |  |
| 00_5260_5260_10_0102_006_2_0| mStationAus | 1 |  |
| 00_5260_5260_10_0102_008_2_0| mStationAlive | 1 |  |
| 00_5260_5260_10_0102_010_2_0| mStationFehler | 1 |  |
| 00_5260_5260_10_0102_012_2_0| Version | 1 |  |
| 00_5260_5260_10_0102_014_1_0| Reglervariante | 1 |  |
| 00_5260_5260_10_0102_015_1_0| Durchfluss erwartet | 1 |  |
| 00_5260_5260_10_0102_016_2_0| DurchschnittsDrehzahl | 0.1 | % |



### <a name="5261_5260_0301"></a>Kaskade Master (0x5261) <= Kaskade BasisAdr (0x5260 - 0x526F), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_5261_5260_10_0301_000_2_0| Version | 1 |  |
| 00_5261_5260_10_0301_002_2_0| Status | 1 |  |
| 00_5261_5260_10_0301_004_4_0| Fehler | 1 |  |
| 00_5261_5260_10_0301_008_2_0| TWW | 0.1 |  °C |
| 00_5261_5260_10_0301_010_2_0| TKW | 0.1 |  °C |
| 00_5261_5260_10_0301_012_2_0| TSpVL | 0.1 |  °C |
| 00_5261_5260_10_0301_014_2_0| Volumenstrom | 1 |  l/h |
| 00_5261_5260_10_0301_016_4_0| Wärmemenge | 1 |  Wh |
| 00_5261_5260_10_0301_020_4_0| Betriebssekunden | 1 |  s |
| 00_5261_5260_10_0301_024_4_0| Stationsbetriebssekunden | 1 |  s |
| 00_5261_5260_10_0301_028_4_0| Gesamtbetriebsstunden | 1 |  s |
| 00_5261_5260_10_0301_032_1_0| Reglervariante | 1 |  |
| 00_5261_5260_10_0301_033_1_0| Drehzahl | 0.1 | % |
| 00_5261_5260_10_0301_034_1_0| Handbetrieb Relais Kaskade | 1 |  |
| 00_5261_5260_10_0301_035_1_0| Handbetrieb PWM1 | 1 |  |



### <a name="5360_5360_0102"></a>PAW Kaskade BasisAdr (0x5360) <= PAW Kaskade BasisAdr (0x5360 - 0x536F), command 0x0102

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_5360_5360_10_0102_004_2_0| mStationEin | 1 |  |
| 00_5360_5360_10_0102_006_2_0| mStationAus | 1 |  |
| 00_5360_5360_10_0102_008_2_0| mStationAlive | 1 |  |
| 00_5360_5360_10_0102_010_2_0| mStationFehler | 1 |  |
| 00_5360_5360_10_0102_012_2_0| Version | 1 |  |
| 00_5360_5360_10_0102_014_1_0| Reglervariante | 1 |  |
| 00_5360_5360_10_0102_015_1_0| Durchfluss erwartet | 1 |  |
| 00_5360_5360_10_0102_016_2_0| DurchschnittsDrehzahl | 0.1 | % |



### <a name="5361_5360_0301"></a>PAW Kaskade Master (0x5361) <= PAW Kaskade BasisAdr (0x5360 - 0x536F), command 0x0301

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_5361_5360_10_0301_000_2_0| Version | 1 |  |
| 00_5361_5360_10_0301_002_2_0| Status | 1 |  |
| 00_5361_5360_10_0301_004_4_0| Fehler | 1 |  |
| 00_5361_5360_10_0301_008_2_0| TWW | 0.1 |  °C |
| 00_5361_5360_10_0301_010_2_0| TKW | 0.1 |  °C |
| 00_5361_5360_10_0301_012_2_0| TSpVL | 0.1 |  °C |
| 00_5361_5360_10_0301_014_2_0| Volumenstrom | 1 |  l/h |
| 00_5361_5360_10_0301_016_4_0| Wärmemenge | 1 |  Wh |
| 00_5361_5360_10_0301_020_4_0| Betriebssekunden | 1 |  s |
| 00_5361_5360_10_0301_024_4_0| Stationsbetriebssekunden | 1 |  s |
| 00_5361_5360_10_0301_028_4_0| Gesamtbetriebsstunden | 1 |  s |
| 00_5361_5360_10_0301_032_1_0| Reglervariante | 1 |  |
| 00_5361_5360_10_0301_033_1_0| Drehzahl | 0.1 | % |
| 00_5361_5360_10_0301_034_1_0| Handbetrieb Relais Kaskade | 1 |  |
| 00_5361_5360_10_0301_035_1_0| Handbetrieb PWM1 | 1 |  |



### <a name="6510_0000_0200"></a>HKM2 (0x6510 - 0x651F) <= any source, command 0x0200

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_6510_0000_10_0200_000_2_0| Steuerregister | 1 |  |
| 00_6510_0000_10_0200_008_1_0| Vorlaufmaximaltemperatur | 1 |  °C |
| 00_6510_0000_10_0200_009_1_0| HK-Kennlinie | 0.1 |  |
| 00_6510_0000_10_0200_010_1_0| Nachtabsenkung | 1 |  K |
| 00_6510_0000_10_0200_011_1_0| Tageskorrektur | 1 |  K |
| 00_6510_0000_10_0200_012_1_0| Mischerlaufzeit | 1 |  s |
| 00_6510_0000_10_0200_013_1_0| Sommerbetrieb | 1 |  °C |
| 00_6510_0000_10_0200_014_1_0| Info Schaltuhr | 1 |  |
| 00_6510_0000_10_0200_015_1_0| Option Nachheizung | 1 |  |
| 00_6510_0000_10_0200_016_2_0| Speichertemperatur 1 \(Bus\) | 0.1 |  °C |
| 00_6510_0000_10_0200_018_2_0| Aussentemperatur Bus | 0.1 |  °C |
| 00_6510_0000_10_0200_020_2_0| dT-NH-ein | 0.1 |  K |
| 00_6510_0000_10_0200_022_2_0| dT-NH-aus | 0.1 |  K |
| 00_6510_0000_10_0200_024_1_0| Speicherminimaltemperatur | 1 |  °C |
| 00_6510_0000_10_0200_025_1_0| Speicherkühltemperatur | 1 |  °C |
| 00_6510_0000_10_0200_026_1_0| Speicheranforderungstemperatur \(ein\) | 1 |  °C |
| 00_6510_0000_10_0200_027_1_0| Speicheranforderungstemperatur \(aus\) | 1 |  °C |
| 00_6510_0000_10_0200_028_1_0| WW-Anforderungstemperatur \(ein\) | 1 |  °C |
| 00_6510_0000_10_0200_029_1_0| WW-Anforderungstemperatur \(aus\) | 1 |  °C |
| 00_6510_0000_10_0200_030_2_0| Speichertemperatur 2 \(Bus\) | 0.1 |  °C |



### <a name="6520_0000_0200"></a>MSR65 (0x6520 - 0x652F) <= any source, command 0x0200

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_6520_0000_10_0200_000_1_0| Drehzahl 1 R1 | 1 | % |
| 00_6520_0000_10_0200_001_3_0| Laufzeit 1 R1 | 1 |  s |
| 00_6520_0000_10_0200_004_1_0| Drehzahl 2 R1 | 1 | % |
| 00_6520_0000_10_0200_005_3_0| Laufzeit 2 R1 | 1 |  s |
| 00_6520_0000_10_0200_008_1_0| Drehzahl 1 R2 | 1 | % |
| 00_6520_0000_10_0200_009_3_0| Laufzeit 1 R2 | 1 |  s |
| 00_6520_0000_10_0200_012_1_0| Drehzahl 2 R2 | 1 | % |
| 00_6520_0000_10_0200_013_3_0| Laufzeit 2 R2 | 1 |  s |
| 00_6520_0000_10_0200_016_1_0| Drehzahl 1 R3 | 1 | % |
| 00_6520_0000_10_0200_017_3_0| Laufzeit 1 R3 | 1 |  s |
| 00_6520_0000_10_0200_020_1_0| Drehzahl 2 R3 | 1 | % |
| 00_6520_0000_10_0200_021_3_0| Laufzeit 2 R3 | 1 |  s |
| 00_6520_0000_10_0200_024_1_0| Drehzahl 1 R4 | 1 | % |
| 00_6520_0000_10_0200_025_3_0| Laufzeit 1 R4 | 1 |  s |
| 00_6520_0000_10_0200_028_1_0| Drehzahl 2 R4 | 1 | % |
| 00_6520_0000_10_0200_029_3_0| Laufzeit 2 R4 | 1 |  s |
| 00_6520_0000_10_0200_032_1_0| Drehzahl 1 R5 | 1 | % |
| 00_6520_0000_10_0200_033_3_0| Laufzeit 1 R5 | 1 |  s |
| 00_6520_0000_10_0200_036_1_0| Drehzahl 2 R5 | 1 | % |
| 00_6520_0000_10_0200_037_3_0| Laufzeit 2 R5 | 1 |  s |
| 00_6520_0000_10_0200_040_1_0| Offset Sensor 1 | 0.1 |  K |
| 00_6520_0000_10_0200_041_1_0| Offset Sensor 2 | 0.1 |  K |
| 00_6520_0000_10_0200_042_1_0| Offset Sensor 3 | 0.1 |  K |
| 00_6520_0000_10_0200_043_1_0| Offset Sensor 4 | 0.1 |  K |
| 00_6520_0000_10_0200_044_1_0| Offset Sensor 5 | 0.1 |  K |
| 00_6520_0000_10_0200_045_1_0| Offset Sensor 6 | 0.1 |  K |
| 00_6520_0000_10_0200_046_1_0| Sensormaske | 1 |  |
| 00_6520_0000_10_0200_047_1_0| Relaismaske | 1 |  |



### <a name="6650_0000_0200"></a>EM (0x6650 - 0x665F) <= any source, command 0x0200

| ID | Name | Factor | Unit |
|:--|:--|:-:|:-:|
| 00_6650_0000_10_0200_000_1_0| Drehzahl Relais 1.1 | 1 | % |
| 00_6650_0000_10_0200_001_3_0| Timer 1.1 | 1 |  s |
| 00_6650_0000_10_0200_004_1_0| Drehzahl Relais 1.2 | 1 | % |
| 00_6650_0000_10_0200_005_3_0| Timer 1.2 | 1 |  s |
| 00_6650_0000_10_0200_008_1_0| Drehzahl Relais 2.1 | 1 | % |
| 00_6650_0000_10_0200_009_3_0| Timer 2.1 | 1 |  s |
| 00_6650_0000_10_0200_012_1_0| Drehzahl Relais 2.2 | 1 | % |
| 00_6650_0000_10_0200_013_3_0| Timer 2.2 | 1 |  s |
| 00_6650_0000_10_0200_016_1_0| Drehzahl Relais 3.1 | 1 | % |
| 00_6650_0000_10_0200_017_3_0| Timer 3.1 | 1 |  s |
| 00_6650_0000_10_0200_020_1_0| Drehzahl Relais 3.2 | 1 | % |
| 00_6650_0000_10_0200_021_3_0| Timer 3.2 | 1 |  s |
| 00_6650_0000_10_0200_024_1_0| Drehzahl Relais 4.1 | 1 | % |
| 00_6650_0000_10_0200_025_3_0| Timer 4.1 | 1 |  s |
| 00_6650_0000_10_0200_028_1_0| Drehzahl Relais 4.2 | 1 | % |
| 00_6650_0000_10_0200_029_3_0| Timer 4.2 | 1 |  s |
| 00_6650_0000_10_0200_032_1_0| Drehzahl Relais 5.1 | 1 | % |
| 00_6650_0000_10_0200_033_3_0| Timer 5.1 | 1 |  s |
| 00_6650_0000_10_0200_036_1_0| Drehzahl Relais 5.2 | 1 | % |
| 00_6650_0000_10_0200_037_3_0| Timer 5.2 | 1 |  s |
| 00_6650_0000_10_0200_040_1_0| SensorOutputType1 | 1 |  |
| 00_6650_0000_10_0200_041_1_0| SensorOutputType2 | 1 |  |
| 00_6650_0000_10_0200_042_1_0| SensorOutputType3 | 1 |  |
| 00_6650_0000_10_0200_043_1_0| SensorOutputType4 | 1 |  |
| 00_6650_0000_10_0200_044_1_0| SensorOutputType5 | 1 |  |
| 00_6650_0000_10_0200_045_1_0| SensorOutputType6 | 1 |  |



> Based on VSF dated 20191129

