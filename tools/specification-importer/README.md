# specification-importer

This tool converts XML based VBus specifications (e.g. provided by RESOL's ServiceCenter software) into JavaScript source.


## Summary


## Installation

Just install the dependencies for the resol-vbus library and this tool:

	$ cd .../resol-vbus
	$ npm install
	$ cd tools/specification-importer
	$ npm install


## Usage

To update the `Specification` data you need to follow these steps.


### Get the XML files from the RSC

	$ mkdir <tmpdir>
	$ cd <tmpdir>
	$ 7z x <RSC setup exe>
	$ mkdir resol
	$ cp -a \$_OUTDIR/plugins/de.resol* resol/
	$ cd resol
	$ for NAME in *.jar; do DIR="$(basename $NAME .jar)"; mkdir $DIR; (cd $DIR; 7z x ../$NAME); done
	$ rm ./de.resol.servicecenter.vbus.sortech_2.0.0/VBusSpecificationSorTech_eCoo-MX.xml
	$ find . -iname VBus*.xml


### Run the tool

	$ node .../resol-vbus/tools/specification-importer/index.js
