@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  org.hyperledger.fabric.javaapp startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Add default JVM options here. You can also use JAVA_OPTS and ORG_HYPERLEDGER_FABRIC_JAVAAPP_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\org.hyperledger.fabric.javaapp.jar;%APP_HOME%\lib\fabric-chaincode-shim-2.0.0-SNAPSHOT.jar;%APP_HOME%\lib\org.everit.json.schema-1.9.0.jar;%APP_HOME%\lib\reflections-0.9.11.jar;%APP_HOME%\lib\fabric-chaincode-protos-2.0.0-SNAPSHOT.jar;%APP_HOME%\lib\grpc-protobuf-1.9.0.jar;%APP_HOME%\lib\protobuf-java-util-3.5.1.jar;%APP_HOME%\lib\grpc-netty-1.9.0.jar;%APP_HOME%\lib\grpc-stub-1.9.0.jar;%APP_HOME%\lib\grpc-protobuf-lite-1.9.0.jar;%APP_HOME%\lib\grpc-core-1.9.0.jar;%APP_HOME%\lib\instrumentation-api-0.4.3.jar;%APP_HOME%\lib\opencensus-contrib-grpc-metrics-0.10.0.jar;%APP_HOME%\lib\opencensus-api-0.10.0.jar;%APP_HOME%\lib\guava-26.0-jre.jar;%APP_HOME%\lib\jsr305-3.0.2.jar;%APP_HOME%\lib\checker-qual-2.5.2.jar;%APP_HOME%\lib\error_prone_annotations-2.1.3.jar;%APP_HOME%\lib\j2objc-annotations-1.1.jar;%APP_HOME%\lib\animal-sniffer-annotations-1.14.jar;%APP_HOME%\lib\commons-cli-1.4.jar;%APP_HOME%\lib\commons-validator-1.6.jar;%APP_HOME%\lib\commons-beanutils-1.9.2.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\netty-tcnative-boringssl-static-2.0.7.Final.jar;%APP_HOME%\lib\swagger-annotations-2.0.0.jar;%APP_HOME%\lib\bcpkix-jdk15on-1.60.jar;%APP_HOME%\lib\bcprov-jdk15on-1.60.jar;%APP_HOME%\lib\cglib-3.2.10.jar;%APP_HOME%\lib\json-20180130.jar;%APP_HOME%\lib\handy-uri-templates-2.1.6.jar;%APP_HOME%\lib\re2j-1.1.jar;%APP_HOME%\lib\protobuf-java-3.5.1.jar;%APP_HOME%\lib\javassist-3.21.0-GA.jar;%APP_HOME%\lib\asm-7.0.jar;%APP_HOME%\lib\ant-1.10.3.jar;%APP_HOME%\lib\commons-digester-1.8.1.jar;%APP_HOME%\lib\commons-collections-3.2.2.jar;%APP_HOME%\lib\joda-time-2.9.4.jar;%APP_HOME%\lib\gson-2.7.jar;%APP_HOME%\lib\netty-codec-http2-4.1.17.Final.jar;%APP_HOME%\lib\netty-handler-proxy-4.1.17.Final.jar;%APP_HOME%\lib\proto-google-common-protos-1.0.0.jar;%APP_HOME%\lib\ant-launcher-1.10.3.jar;%APP_HOME%\lib\grpc-context-1.9.0.jar;%APP_HOME%\lib\netty-codec-http-4.1.17.Final.jar;%APP_HOME%\lib\netty-handler-4.1.17.Final.jar;%APP_HOME%\lib\netty-codec-socks-4.1.17.Final.jar;%APP_HOME%\lib\netty-codec-4.1.17.Final.jar;%APP_HOME%\lib\netty-transport-4.1.17.Final.jar;%APP_HOME%\lib\netty-buffer-4.1.17.Final.jar;%APP_HOME%\lib\netty-resolver-4.1.17.Final.jar;%APP_HOME%\lib\netty-common-4.1.17.Final.jar

@rem Execute org.hyperledger.fabric.javaapp
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %ORG_HYPERLEDGER_FABRIC_JAVAAPP_OPTS%  -classpath "%CLASSPATH%" org.hyperledger.fabric.javaapp.App %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable ORG_HYPERLEDGER_FABRIC_JAVAAPP_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%ORG_HYPERLEDGER_FABRIC_JAVAAPP_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
