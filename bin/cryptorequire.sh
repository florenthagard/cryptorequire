homescript=$(dirname $0);
source_directory=$(pwd);
export_directory=$(dirname $(pwd))"/"$(basename $(pwd))".encrypted"
cd "$homescript/../node_modules/cryptorequire/"
clear
npm install --silent;
echo $source_directory
pwd
#rm -rf $export_directory;
#node encrypt.js -i $source_directory -o $export_directory