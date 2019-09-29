#!/bin/bash
  git init

  git config user.name "codebreaker444"
  git config user.email "zeroerror.444@gmail.com"

  git add .
  git commit -m "Deploy"

  # We redirect any output to
  # /dev/null to hide any sensitive credential data that might otherwise be exposed.
  git push --force --quiet "https://${git_user}:${git_password}@${git_target}" master:master > /dev/null 2>&1
