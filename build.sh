#!/bin/zsh

#############################################################
# This script will create the zip file to upload to lambda. #
# It will not contain the express server or other packages  #
# only used for local development.                          #
#                                                           #
#############################################################
#                                                           #
# Usage:                                                    #
# DO NOT MOVE THIS FILE. Should be right below the src dir  #
# Navigate to where this script is and run:                 #
#                                                           #
# ./build.sh                                                #
#                                                           #
# This will download a fresh copy of the repo from github   #
# and zip the develop branch. You can specify other branch: #
#                                                           #
# ./build.sh "branch" (or tag or commit)                    #
#                                                           #
#############################################################

# Checks the status of the last command. If it had an error, exit
function okorkill {
  if [[ "$?" -gt 0 ]]; then
    echo $1
    exit 1
  fi
}

# If the user didn't specify a branch, use develop
if [ -z $1 ]; then
  branch="develop"
else
  branch=$1
fi

origin=`git remote get-url origin`

okorkill "Git origin is not set. Aborting"

mkdir build

git clone "$origin" build

okorkill "Error cloning git repo."

cd build

git checkout $branch

okorkill "Error checking out $branch."

cd src

commit=`git rev-parse --verify --short HEAD` #Finds the latest commit on the branch

npm install --production

okorkill "Error installing npm production packages."

zip -r "../dist/$branch.$commit.zip" * # The zip file will have the short checksum of the commit as a name.

okorkill "Error generating the zip."

cd ../

echo "Done your build is in dist/$branch.$commit.zip"

rm -rf build # Clean up

okorkill "You should delete the build directory"

exit 0
