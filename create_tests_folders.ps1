# remove folder if exists
if(Test-Path -Path .\test) {
 Remove-Item test -recurse
}
mkdir test
cd test
# 1: all opt dir
mkdir sample1/node_modules
mkdir sample1/obj
mkdir sample1/bin
# 2: node dir
mkdir sample2/.vscode
mkdir sample2/node_modules
# 3: vs dir
mkdir sample3/.vs
mkdir sample3/obj
mkdir sample3/bin
# 4 tmp files dir
mkdir sample4/.vs
mkdir sample4/.vscode
cd ..