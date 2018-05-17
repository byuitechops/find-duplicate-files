# Find Duplicate Files
### *Package Name*: find-duplicate-files
### *Child Type*: post import
### *Platform*: all
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

This child module downloads all of the files in the course and hashes them to find which files have the same contents

## How to Install

```
npm install git+https://github.com/byuitechops/find-duplicate-files.git
```

## Run Requirements

Only needs `course.info.canvasOU`

## Process

1. Downloads all of the files in the course
2. Hashes all of the file data
3. Compares the hashes to find duplicates

## Log Categories

- Duplicate Files Found
  - File1 Name
  - File1 Id
  - File2 Name
  - File2 Id

## Requirements

Log all of the files that contain the same data