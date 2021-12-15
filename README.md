igv.js-flask

# Overview

A user interface based on IGV.

# Prerequisites

* [Docker](https://www.docker.com) *or* Python 3.7

# Installation & running via Docker

For portability across systems, ``igv.js-flask`` is
Dockerized. To build the Docker container, open a terminal in the folder in
which you have downloaded the source code, and run::

```sh
$ docker build -t igv.js-flask .
```

Then, you may execute ``igv.js-flask`` from any folder via::

```sh
# get help
$ docker run -it --rm igv.js-flask --help

# run the program. See --help for info on parameters
$ docker run -p 5000:5000 -it --rm -v:$(pwd):/portal igv.js-flask run --host=0.0.0.0
```

Notes: 
* The ``-p 5000:5000`` option for ``docker run`` is required to publish the container's port to the host. 
* The ``run --host=0.0.0.0`` options passed to the ``flask`` entrypoint are required to make the server externally visible.

Then, the user can view the IGV browser, preloaded with all files, by pointing a web browser to ``http://172.17.0.2:5000/`` or whatever URL is specified in the portion of the output of the above command in the section that says:
```sh
* Running on http://<URL_specified_here> (Press CTRL+C to quit)
```

**TODO** The script will put any output files in the current working directory, and read
any input files with paths relative to the current working directory.

Currently, sample input files for dataset ``G213`` are being pulled from this repository itself from the folder ``igv.js-flask/igvjs/static/data/examples`` and no output files are generated.

If you want to manually explore inside the container, you do so at your own
risk. You can open a ``bash`` terminal inside the container via::

```sh
$ docker run -it --rm --entrypoint bash igv.js-flask
```


# Installation & running in your environment (outside Docker)


# IMPORTANT

This repository is an example of an integration of igv.js with a Flask server.   It is not an active development project and not maintained.   Our efforts are focused on the [igv.js component itself](https://github.com/igvteam/igv.js).  For an example of a complete website integrating igv.js for use with any web server, including Flask,  see [igv-webapp](https://github.com/igvteam/igv-webapp).

## Notes on sample data

The sample project includes test data in "static/data/public".   The bedgraph and bigwig files in that directory contain data on chr1 (only).  The "gsst1.bam" file contains data for the gstt1 locus, specifically ```chr22:24,374,133-24,386,311```.  

## Installation
You can install all required packages including Flask using [pip](https://pip.pypa.io/en/stable/).
```sh
pip install -r requirements.txt
```
## Running the app
To run the app using the simple builtin server, you can use the provided run file:
```sh
python run.py
```

Now that the server is running, go to (http://localhost:5000) to use IGV.
To view one of the example tracks, click on it in the box in the upper left corner.

Alternatively, you can set the environment variable FLASK_APP to igvjs.py and use 'flask run':
```sh
export FLASK_APP=igvjs.py
flask run
```
Note: With this method, you can use the command-line options for flask run. For
example, use the -p option to set port number. Use --host=0.0.0.0 to make the
server externally visible (eg. flask run -p 8659 --host=0.0.0.0).

## Additional Flask Blueprints

Additional Flask Blueprints are defined in the project for the following:

### UCSC Blueprint

The UCSC genome database may be directly accessed with this blueprint.

The mysql connection needs to be installed for this blueprint to work:

```
pip install mysql-connector==2.1.7
```
Restarting the application and going to (http://localhost:5000/ucsc) links up with the UCSC database.

A full set of parameters (db, table, chr, start, end) needs to be provided as GET parameters, e.g. (http://localhost:5000/ucsc?db=hg38&table=knownGene&chr=chrX&start=15560138&end=15602945). See the[UCSC Table Browser](https://genome.ucsc.edu/cgi-bin/hgTables) for inspiration on what parameter values to use.

### Alignment Blueprint

The [pysam module needs to be installed](https://pysam.readthedocs.io/en/latest/installation.html) for this Blueprint to work (this may be a non-trivial installation on some machines).

Restarting the application and going to (http://localhost:5000/alignments) links up with the UCSC database.

### Configuration

Configuration options can be set in _config.py in the root directory.

Currently supported options are:  
USES_OAUTH - whether or not data is protected using OAuth  
ALLOWED_EMAILS - the filename containing the list of allowed emails when using OAuth  
PUBLIC_DIR - path to directory of public data when using OAuth (eg. /static/data/public)
