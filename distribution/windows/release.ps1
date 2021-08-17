mkdir "C:\dist"
$dir="C:\dist"
mkdir $dir
cd $dir
Invoke-WebRequest https://nodejs.org/dist/v14.17.5/node-v14.17.5-win-x86.zip -OutFile node.zip
Expand-Archive node.zip
