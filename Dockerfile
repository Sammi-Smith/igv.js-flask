# Copyright (c) 2022 Ginkgo Bioworks
FROM phusion/baseimage:focal-1.1.0
LABEL maintainer "Ginkgo Developers <devs@ginkgobioworks.com>"


# Make apt-get install without issues
ARG DEBIAN_FRONTEND=noninteractive

# Set up US eastern time zone by default
ENV TZ=:America/New_York

ENV HOME=/root

########################################################################
# Core packages
# apt-get Base
RUN apt-get update \
    && apt-get upgrade --assume-yes --verbose-versions \
           --allow-change-held-packages \
           -o Dpkg::Options::="--force-confdef" \
    && apt-get install --assume-yes --verbose-versions \
           --allow-change-held-packages \
           -o Dpkg::Options::="--force-confdef"  \
           apt-utils \
           binfmt-support \
           build-essential \
           git \
           libssl-dev \
           pkg-config \
           sudo \
           wget \
           gfortran \
           graphviz \
           libffi-dev \
           libatlas-base-dev \
           libfreetype6-dev \
           libgif-dev \
           libjpeg8-dev \
           liblapack-dev \
           liblcms2-dev \
           libmysqlclient-dev \
           libnetcdf-dev \
           libopenblas-dev \
           libpng-dev \
           libtiff5-dev \
           libwebp-dev \
           libxml2-dev \
           libxslt1-dev \
           man \
           nfs-common \
           ncurses-dev \
           ttf-bitstream-vera \
           unzip \
           zlib1g-dev \
           nano



########################################################################
# Python Base
ENV PYTHON3_VERSION=python3.7
ENV PYTHONHASHSEED=random

RUN sudo add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install --assume-yes --verbose-versions \
        $PYTHON3_VERSION \
        $PYTHON3_VERSION-dev \
        python-tk



########################################################################
# Pip
ARG PYTHON_PIP_VERSION=20.2.4
ARG PYTHON_SETUPTOOLS_VERSION=44.1.1
ARG PYTHON_WHEEL_VERSION=0.35.1

RUN curl --silent --show-error --retry 5 --location --output /tmp/get-pip.py \
    https://bootstrap.pypa.io/get-pip.py \
    && $PYTHON3_VERSION /tmp/get-pip.py \
        pip==$PYTHON_PIP_VERSION \
        setuptools==$PYTHON_SETUPTOOLS_VERSION \
        wheel==$PYTHON_WHEEL_VERSION


########################################################################
# Local Project settings

# Matplotlib should use the 'AGG' backend to generate pngs directly,
# since we aren't running X11
ENV MPLBACKEND=agg


########################################################################
# Local Project settings

ENV PROJECT_HOME=/usr/src/igv.js_flask
WORKDIR $PROJECT_HOME


# Install package inside Docker container under Python specified by PYTHON3_VERSION,
# to enable the container to execute.
COPY . .
RUN pip install -r requirements.txt \
#    && pip install tox \
    && pip install --editable .

# Automatically build testing environments, but don't run tests unless needed.
#RUN tox -r requirements.txt --notest

# Create filesystem /portal for container execution, and work from that folder
# so that when users supply input & output files, they don't need to specify
# within-container paths.
VOLUME /portal
WORKDIR /portal

#####################################################################
# Final settings for the entrypoint and CMD

# The entrypoint sets the default program that is run inside the container
# when the container is executed via `docker run`.
#
# We set this default to execute `flask`
# Set FLASK_APP variable so app can be run using `flask run` command
ENV FLASK_APP=igvjs.py
#ENTRYPOINT [ "/bin/bash" ]
ENTRYPOINT [ "flask" ] #need to pass in "run --host=0.0.0.0" as parameters

# CMD sets the default parameters for the entrypoint. These are overridden
# by any extra arguments supplied by the user to `docker run`. If the 
# user supplies no arguments, we default to passing `--help` to the entrypoint.
CMD [ "--help" ]
