$dir = New-Item -Path "c:\" -Name "dist" -ItemType "directory"

Invoke-WebRequest "https://nodejs.org/dist/v14.17.5/node-v14.17.5-win-x86.zip" -OutFile "$dir\node.zip"
Expand-Archive "$dir\node.zip" -DestinationPath $dir
Rename-Item "$dir\node-v14.17.5-win-x86" "$dir\node"
Remove-Item "$dir\node.zip"

Copy-Item -Path "src" -Destination "$dir\node" -Recurse
Copy-Item -Path "package*.json" -Destination "$dir\node"
Copy-Item -Path ".\distribution\windows\app.cmd" -Destination $dir
Copy-Item -Path ".\distribution\windows\dist.env" -Destination "$dir\node\.env"

cd $dir\node
.\npm install

$output = New-Item -Path "c:\" -Name "output" -ItemType "directory"
Compress-Archive -Path $dir -DestinationPath "$output\excel2csv.zip"