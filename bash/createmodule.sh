#!/bin/bash

# $1 : module name
# $2 : module directory
# $3 : work directory
mkdir $3/$1
cd $3/$1
git clone gitbox:gitolite-admin 
cd gitolite-admin
echo "repo $1" >> conf/gitolite.conf
echo -e "\tRW+ = git" >> conf/gitolite.conf
echo "added module=$1" | xargs --null git commit -a -m 
git push

cd $2
echo "========="
pwd
echo "========="
git clone gitbox:$1

/opt/pehu/bin/pehu-modcreate $2 $1 normal

rm -rf $3/$1

 
