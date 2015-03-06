# Running the VBus Touch proxy on a Raspberry Pi


| Author | Paul Hanna |
|---|---|
| Date | 2015-03-05 |
| Version | 1 |


## Installing NODE

Make sure you are running latest Raspbian

	$ sudo apt-get update
	$ sudo apt-get upgrade

Next install NODE itself from your home directory

	$ cd
	$ wget http://nodejs.org/dist/v0.10.25/node-v0.10.25-linux-arm-pi.tar.gz
	$ tar -xvzf node-v0.10.25-linux-arm-pi.tar.gz
	$ node-v0.10.25-linux-arm-pi/bin/node --version

You should see:

	v0.10.25

Now set the `NODE_JS_HOME` variable to the directory where you un-tarred Node, and add the bin dir to your `PATH`.

From your Home directory

	$ cd
	$ sudo nano .profile

Add the following to end

	NODE_JS_HOME=/home/pi/node-v0.10.25-linux-arm-pi
	PATH=$PATH:$NODE_JS_HOME/bin

Now you should be able to run node from any directory. NPM, the node package manager, comes bundled with Node now, so you already have it:
To test

	$ node --version
	v0.10.25
	$ npm --version
	1.3.24
 
Your now all set to install VBUS.  From your home directory

	$ cd
	$ git clone https://github.com/danielwippermann/resol-vbus
	$ cd resol-vbus
	$ npm install
	$ cd examples/vbustouch-proxy
	$ npm install
	$ cp config.js.example config.js

Now edit config.js to match your API Keys and Feed ID.  Also add the VBUS/LAN details and parameters you wish to pass to Xively.  As a example

	module.exports = {

	    // ... snip ...

	    /**
	     * Options for the Connection instance.
	     */
	    connectionOptions: {
	        host: 'YOUR VBUS/LAN IP ADDRESS',
	        password: 'vbus',
	    },

	    // ... snip ...

	    /**
	     * Interval in which data will be uploaded to Xively.com. A value of zero disables this functionality.
	     */
	    xivelyInterval: 120000,

	    /**
	     * Xively.com API Key.
	     */
	    xivelyApiKey: 'YOUR KEY HERE',

	    /**
	     * Xively.com Feed ID.
	     */
	    xivelyFeedId: 'YOUR FEED ID HERE',

	    /**
	     * A map of Xively.com data point IDs to VBus packet field IDs.
	     */
	    xivelyPacketFieldMap: {
	        // YOUR PACKET FIELDS HERE
	        'Collector': '00_0015_427B_0100_000_2_0',
	        'TankBottom': '00_0015_427B_0100_002_2_0',
	    },

	};


Now all you need is run Node as follows

	$ cd ~/resol-vbus/examples/vbustouch-proxy
	$ node index.js &

You will get the following response after a few seconds

	Connecting to VBus...
	Connection state changed to CONNECTING
	Connection state changed to CONNECTED
	Connected to VBus...
	Starting web server...
	Starting HeaderSetConsolidator timer...
	Starting Xively client
	Started web server at: 
	  - http://0.0.0.0:3000/ (internal)
	  - http://127.0.0.1:3000/ (internal)
	  - http://10.1.1.100:3000/

Running the VBUSTouch App and using ip address information from above will provide VBUS information.

Xively will also update with your results.


## Automatically run on startup

To enable VBUS to run at startup edit `/etc/rc.local` and add the following line but ensure you leave the `exit 0` as last line.

	/home/pi/node-v0.10.25-linux-arm-pi/bin/node /home/pi/resol-vbus/examples/vbustouch-proxy/index.js &
	exit 0


Full paths as used above may be required.


ENJOY
