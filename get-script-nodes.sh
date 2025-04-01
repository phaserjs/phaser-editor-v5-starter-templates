#!/bin/bash

for project in "editor-starter-template-basic-javascript" "editor-example-sunny-land";
do
    for lib in "editor-scripts-base";
    do
        rm -fR $project/$lib/*
        cp -R $PHASEREDITOR4_HOME/script-nodes/$lib/browser/* $project/
    done
done