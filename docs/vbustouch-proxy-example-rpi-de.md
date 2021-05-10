# Einrichtung einer VBus-Datenaufzeichnung auf einem Raspberry PI

Diese Anleitung ist eine überarbeitete Fassung einer vorhandenen Dokumentation,
die unter folgender URL zur Verfügung steht:

https://github.com/danielwippermann/resol-vbus/blob/master/examples/vbustouch-proxy/RunningOnRPi.md


## Voraussetzungen

- Raspberry PI mit aktuellem Raspbian
- VBus/LAN-Adapter

Auf dem Raspbian sind einige Pakete notwendig, die mit den folgenden Befehlen
nachinstalliert werden können:

```bash
sudo apt-get update
sudo apt-get install build-essential git
```


## Installation von Node.js

Raspbian hat zwar mittlerweile eigene Pakete für Node.js, diese sind allerdings
stark veraltet. Deshalb empfiehlt es sich, Node.js direkt zu installieren. Der
hier beschriebene Weg verwendet den "Node Version Manager (nvm)", um die
parallele Installation mehrerer unterschiedlicher Node.js-Versionen zu
ermöglichen.

Quelle: https://github.com/creationix/nvm#manual-install

```bash
export NVM_DIR="$HOME/.nvm" && (
  git clone https://github.com/creationix/nvm.git "$NVM_DIR"
  cd "$NVM_DIR"
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" origin`
) && . "$NVM_DIR/nvm.sh"
```

Dadurch bekommt man einen "nvm"-Befehl. Damit dieser auch nach dem Aus- und
Wiedereinloggen noch zur Verfügung steht, muss folgendes an die Datei
`/home/pi/.bashrc` angehängt werden:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

Nun kann das eigentliche Node.js installiert werden. Für diese Anleitung
empfiehlt sich die Installation der aktuellen "Long Term Support (LTS)"-Version,
die zum Zeitpunkt dieses Artikels die Version 6.9.4 war:

```bash
nvm install --lts
```

Nach der Installation kann man mit den beiden folgenden Befehlen sicherstellen,
dass die Installation geklappt hat:

```bash
node -v
npm -v
```

In beiden Fällen sollte eine Versionsnummer angezeigt werden und keine
Fehlermeldung kommen.


## Installation der resol-vbus-Bibliothek

Im nächsten Schritt kann die resol-vbus-Bibliothek heruntergeladen werden:

```bash
git clone https://github.com/danielwippermann/resol-vbus
cd resol-vbus
```

Danach können die Abhängigkeiten der resol-vbus-Bibliothek installiert werden:

```bash
npm install
```

Als Grundlage für die Datenaufzeichnung kann die mitgelieferte "vbustouch-proxy"-
Beispielapplikation benutzt werden. Da auch diese Applikation eigene
Abhängigkeiten hat, müssen auch die installiert werden:

```bash
cd examples/vbustouch-proxy
npm install
```


## Konfiguration der Beispielapplikation

Die Beispiel-Applikation wird mit einer Konfigurationsdatei ausgeliefert, die
nach eigenen Wünschen verändert werden kann. Dafür muss die Vorlage kopiert oder
umbenannt werden:

```bash
cp config.js.example config.js
```

Nun kann mit einem Editor diese Datei bearbeitet werden. Es müssen mindestens
folgende Konfigurationen geprüft und ggf. angepasst werden:

```js
connectionOptions: {
    host: '192.168.14.100',
    password: 'vbus',
},
```

Hier müssen IP-Adresse und Fernparametrisierungspasswort des VBus/LAN-Adapters
hinterlegt werden.

```javascript
textLoggingInterval: 0,
```

Das `textLoggingInterval` gibt die Anzahl Millisekunden an, die zwischen zwei
Zeilen in der CSV-Datei-Erzeugung als Mindestabstand eingehalten werden sollen.
Wenn Wert auf 0 steht, wird keine CSV-Datei erzeugt. Um alle 5 Minuten eine neue
Zeile in die CSV-Datei schreiben zu lassen, muss der Wert auf `300000`
(5 Minuten \* 60 Sekunden/Minute \* 1000 Millisekunden/Sekunde) gesetzt werden.

```javascript
textLoggingPath: path.resolve(__dirname, 'log'),
```

Der `textLoggingPath` gibt den Speicherort für die CSV-Dateien an. Standardmäßig
werden die Dateien in einen Order "log" gelegt, der sich im selben Verzeichnis
wie die "config.js" befindet. Der Ordner muss vorhanden sein, sonst stürzt die
Applikation ab.

Sie können den Speicherort auch auf einen absoluten Pfad ausserhalb des Ordners
der Beispiel-Applikation verändern:

```javascript
textLoggingPath: '/mnt/HDA_ROOT/........',
```

Auch dieser Ordner wird nicht automatisch erzeugt, sondern muss manuell vorher
angelegt werden.

```javascript
textLoggingOptions: {
    columnSeparator: '\t',
    lineSeparator: '\r\n',
    separateDateAndTime: false,
},
```

Die `textLoggingOptions` legen fest, wie der CSV-Dateien aufgebaut sein sollen.
Standardmäßig werden die Spalten mit Tabulatorzeichen getrennt und die Zeilen
mit einem Windows-freundlichen Carriage-Return + Newline beendet.


## Starten der Aufzeichnung

Über die `index.js`-Datei im Ordner der Beispiel-Applikation kann die
Datenaufzeichnung und der Web-Server für die Datenabfrage gestartet werden:

```bash
$ node index.js
Connecting to VBus...
Connection state changed to CONNECTING
Connection state changed to CONNECTED
Connected to VBus...
Starting web server...
Starting HeaderSetConsolidator timer...
Starting text logging
Started web server at:
  - http://0.0.0.0:3000/ (internal)
  - http://127.0.0.1:3000/ (internal)
  - http://192.168.178.31:3000/
```

Der Web-Server implementiert gerade genug vom sogenannten
"VBus Data Download API", um sich gegenüber einer iOS-VBusTouch-App als
Datenlogger auszugeben (wenn das von Interesse sein sollte).
