#!/bin/env python
import os
import sys
import json
from pprint import pprint
import subprocess
import argparse

def main(verbose=True):
    RELEASES = {}
    TO_BE_RELEASED = []

    with open("package.json", 'r') as ofile:
        config = json.loads(ofile.read())

    for package, version in config['dependencies'].items():
        tag = version.split("#")[-1]
        RELEASES[package] = tag

    with open("jsconfig.json", "r") as ofile:
        config = json.loads(ofile.read())

    for addon, paths in config['compilerOptions']['paths'].items():
        path = paths[0]
        release = RELEASES[addon]
        with subprocess.Popen(
            ["git", "log", "--pretty=oneline", "--abbrev-commit", "%s..HEAD" % release],
            cwd=os.path.join(os.getcwd(), "src", path), stdout=subprocess.PIPE) as proc:
            res = proc.stdout.read()
            if res:
                if(verbose):
                    print("==================== %s " % path)
                    print(res.decode('utf-8'))
                TO_BE_RELEASED.append(addon)
    return TO_BE_RELEASED

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-v', '--verbose', help='Verbose', action='store_true')
    args = parser.parse_args()
    res = main(args.verbose)
    print("==================== Add-ons to be released: \n%s\n====================" % "\n".join(res))
