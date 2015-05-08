# configuration-importer

This tool converts XML based parameter lists (e.g. provided by RESOL's Parameterization Tool RPT) into JavaScript source.


## Summary

Every controller has a varying set of parameters. To make it easier for the `Customizer` class to transfer configuration sets to and from the controller it needs to know which values can be accessed and how.

RESOL's own Parameterization Tool (RPT) solves this by distributing XML-based parameter lists in its installation destination directory.

Since the `Customizer` class cannot use those XML files directly they have to be converted to JavaScript data source code. And that is what this tool is for :)


## Installation

Just install the dependencies for the resol-vbus library and this tool:

	$ cd .../resol-vbus
	$ npm install
	$ cd tools/configuration-importer
	$ npm install
	$ mkdir rpt-files


## Usage

To add `Customizer` support for a new controller you need to follow these steps.


### Get the XML file from the RPT

Simply extract (or install) the RPT installer to get access to the `<product>-Menu.xml` of the controller you want to add. Copy that file over to the `.../resol-vbus/tools/configuration-importer/rpt-files` directory you created above.


### Modify the importer tool

Inside the `main` function of the `.../resol-vbus/tools/configuration-importer/index.js` you find a sequence of commands that basically look like this:


	// ...
    }).then(function() {
        return convertMenuXmlFile('<controller>-Menu.xml', '<vendor>-<controller>-<version>-data.js', function(menuSystem) {
            return menuSystem;
        });
    // ...

A call to the `convertMenuXmlFile` function converts a single RPT XML file to a JavaScript data source file. The function assumes that the XML file is located under `.../resol-vbus/tools/configuration-importer/rpt-files` and it stores the JavaScript data source file under `.../resol-vbus/src/configuration-optimizers`.

Just comment out all the controllers you do not want to create a new data file for and then add a block describing your new controller.


### Run the tool

After copying the RPT XML file and modifying the `index.js` simply run the tool:

	$ cd .../resol-vbus/tools/configuration-importer
	$ node index.js
	.../resol-vbus/src/configuration-optimizers/resol-deltasol-bs4v2-103-data.js

The tool outputs the file name of the created JavaScript source.


### Write a configuration optimizer

Once the JavaScript data source file is created you need an additional JavaScript file: a `ConfigurationOptimizer`. The `ConfigurationOptimizer` takes the information from the data source file and wraps it in a resuable class. For larger controllers the `ConfigurationOptimizer` can be used to reduce the amount of values to transfer based on other configuration parameters. See the `.../resol-vbus/src/configuration-optimizers/resol-deltasol-mx-112-configuration-optimizer.js` for a non-trivial example.

If you have a small controller or do not exactly know which parameters depend on others it is sufficient to write a minimal `ConfigurationOptimizer` that simply wraps the data source file. See `.../resol-vbus/src/configuration-optimizers/resol-deltasol-cs-plus-xxx-configuration-optimizer.js` for a minimal implementation example.

Just save your `ConfigurationOptimizer` implementation in a file as `.../resol-vbus/src/configuration-optimizers/<vendor>-<product>-<version>-configuration-optimizer.js`.


### Add your configuration optimizer to the factory

The factory's source is located under `.../resol-vbus/src/configuration-optimizer-factory.js`.


### Write and run tests

See `.../resol-vbus/test/specs/configuration-optimizers/resol-deltasol-cs-plus-xxx-configuration-optimizer.spec.js` and others for inspiration.
