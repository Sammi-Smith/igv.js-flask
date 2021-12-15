#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""The setup script."""

from setuptools import setup, find_packages

with open('README.md') as readme_file:
    readme = readme_file.read()

requirements = [
]

setup_requirements = [
]

test_requirements = [
]

setup(
    author       = "Sammi Smith",
    author_email = 'sammi.smith@peraton.com',
    classifiers  = [
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'Programming Language :: Python :: 3.6',
    ],
    description          = "A user interface based on IGV",
    install_requires     = requirements,
    long_description     = readme,
    include_package_data = True,
    keywords             = 'igv.js-flask',
    name                 = 'igv.js-flask',
    packages             = find_packages(include=['igv.js-flask']),
    setup_requires       = setup_requirements,
    test_suite           = 'test',
    tests_require        = test_requirements,
    url                  = 'https://github.com/Sammi-Smith/igv.js-flask',
    #version              = '0.0.1',
    zip_safe             = False,
)
