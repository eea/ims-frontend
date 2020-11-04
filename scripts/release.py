#!/bin/env python
import os
import sys
import json
from pprint import pprint
import subprocess
import argparse
import urllib.request

URL = "https://raw.githubusercontent.com/eea/ims-frontend/master/package.json"
VOLTO = "https://raw.githubusercontent.com/plone/volto/master/package.json"

def main(verbose=True):
    versions = {}
    to_be_release = []
    prod_volto = 'PROD'
    dev_volto = 'DEV'
    latest_volto = 'LATEST'

    # Get PROD
    with urllib.request.urlopen(URL) as ofile:
        config = json.load(ofile)

        for package, version in config['dependencies'].items():
            if package == "@plone/volto":
                prod_volto = version
                continue

            tag = version.split("#")[-1]
            versions[package] = tag

    # Get DEV
    with open("package.json", "r") as ofile:
        dev = json.load(ofile)
        dev_volto = dev['dependencies']['@plone/volto']

    # Get LATEST
    print("====================")
    with urllib.request.urlopen(VOLTO) as ofile:
        volto = json.loads(ofile.read())
        latest_volto = volto['version']
    
    # Volto
    if dev_volto != latest_volto:
        print("DEV: \t @plone/volto: %s -> %s" % (dev_volto, latest_volto))
    if prod_volto != latest_volto:
        print("PROD:\t @plone/volto: %s -> %s" % (prod_volto, latest_volto))

    # Add-ons
    with open("jsconfig.json", "r") as ofile:
        config = json.load(ofile)

        for addon, paths in config['compilerOptions']['paths'].items():
            path = paths[0]
            release = versions.get(addon)
            if not release:
                to_be_release.append(addon)
                continue

            with subprocess.Popen(
                ["git", "log", "--pretty=oneline", "--abbrev-commit", "%s..HEAD" % release],
                cwd=os.path.join(os.getcwd(), "src", path), stdout=subprocess.PIPE) as proc:
                res = proc.stdout.read()
                if res:
                    if(verbose):
                        print("==================== %s " % path)
                        print(res.decode('utf-8'))
                    to_be_release.append(addon)

    return to_be_release

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-v', '--verbose', help='Verbose', action='store_true')
    args = parser.parse_args()
    res = main(args.verbose)
    print("==================== Add-ons to be released: \n%s\n====================" % "\n".join(res))
