@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\karma\bin\karma" %*
) ELSE (
  node  "%~dp0\support\node_modules\karma\bin\karma" %*
)