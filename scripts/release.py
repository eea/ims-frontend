#!/bin/env python
import os
import sys
import json
from pprint import pprint
import subprocess
import argparse
import urllib.request

URL = "https://raw.githubusercontent.com/eea/ims-frontend/master/package.json"

def main(verbose=True):
    versions = {}
    to_be_release = []

    with urllib.request.urlopen(URL) as ofile:
        config = json.loads(ofile.read())

    for package, version in config['dependencies'].items():
        tag = version.split("#")[-1]
        versions[package] = tag

    with open("jsconfig.json", "r") as ofile:
        config = json.loads(ofile.read())

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
