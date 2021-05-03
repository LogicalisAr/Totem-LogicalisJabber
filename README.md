# Totem Logicalis

This Totem allows external people that have arrived to the office floor call to some contact inside of the office to notify the arrival.

This is a [Visual Studio Code](https://code.visualstudio.com/) based project (though it can be run using any web server, all files are static.)

**Prerequisites**

* Windows
* Chrome
* Node.js
* Jabber SDK Browser Add-On from https://github.com/LogicalisAr/Totem-LogicalisJabber/blob/master/toInstall/CiscoWebCommunicatorAddOnInstaller.exe
* Google Chrome Extension https://chrome.google.com/webstore/detail/cisco-web-communicator/mbhnoblcplfcookpoennihpndjobapeo

## Getting Started

1. From the project root directory, install Node.js dependencies:
    ```
    npm install
    ```
    
2. You must to configure configInfo.js with your AD Credentials

3. Launch the HTTP server (start debugging:) press **F5**
    > or from the command-line: 
    ```
    cd public
    node ../node_modules/http-server/bin/http-server -o -c-1 -p 3000
    ```

4. Browse to url shown and you will see this page:
![alt text](https://github.com/LogicalisAr/Totem-LogicalisJabber/blob/main/public/img/selectaprivadoimage.JPG?raw=true)

Communication between CiscoWebCommunicatorAddon and the application is not
supported when running application from file system. Application can be hosted on localhost.

## Disclaimer

Copyright (c) 2021, Logicalis and/or its affiliates.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE
