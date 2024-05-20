# Design System - Supernova - Exporter

Welcome! This project is owned by Team Transformers. Please contact us if you have any question.

## Introduction

[Supernova](https://supernova.io) is a design system platform that manages assets, tokens, components and allows to write documentations. It acts as a bridge between design and development between Figma and your repository. In poor words, Supernova listens to changes into your design system (developed, for example, in Figma) and automates the creation of a pull-request in the project target.

To learn everything about Supernova, please check out the [developer documentation](https://developers.supernova.io/).

Our supernova project is hosted [here](https://app.supernova.io/21777-new-day).

## How it works 

The exporter is connected to a [supernova project](https://app.supernova.io/21777-new-day/106948-rise-beta) where the design system tokens are declared.

1. Supernova listens to changes applied to this Figma project (ex. a new token is created or a value is updated). Once a change is detected, Supernova triggers the logic present in the output.js file, regenerating colors, borderWidth, typography, etc files with the updated values.
2. The output.json file contains a list of scripts or templates that generate token files. For example: at each change event, the writeColor.pr file is triggered and updates the colors.ts file in the folder where the Supernova pipeline points to (if you run it locally, then the file will be updated in the .build folder instead).
3. Token files are updated and a Pull Request (PR) is opened or updated in the GitHub project connected to the pipeline. 

Supernova scripts are written in [Pulsar language](https://supernova-developers.gitbook.io/supernova-dsm/pulsar-language) and it offers a way to test changes in scripts locally. To do so, install the Supernova [Visual Code extension](https://supernova-developers.gitbook.io/supernova-dsm/getting-started). Further info is present in the documentation provided.
