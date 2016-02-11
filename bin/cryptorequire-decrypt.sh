homescript=$(dirname $0);
homeproject=$(pwd)
cd "$homescript/../lib/node_modules/cryptorequire/"

node decrypt.js $homeproject $1