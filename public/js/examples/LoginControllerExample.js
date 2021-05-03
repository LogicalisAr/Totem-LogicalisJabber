var SSOPopUpWindow = null;
var loginFailed = false;
function initilizeLoginEventHandlers()
{
    cwic.LoginController.addEventHandler('onEmailRequired', onEmailRequired);
    cwic.LoginController.addEventHandler('onCredentialsRequired', onCredentialsRequired);
    cwic.LoginController.addEventHandler('onLoggedIn', onLoggedIn);
    cwic.LoginController.addEventHandler('onLifeCycleStateChanged', onLifeCycleStateChanged);
    cwic.LoginController.addEventHandler('onSigningOut', onSigningOut);
    cwic.LoginController.addEventHandler('onSignedIn', onSignedIn);
    cwic.LoginController.addEventHandler('onSingingIn', onSigningIn);
    cwic.LoginController.addEventHandler('onServiceDiscovering', onServiceDiscovering);
    cwic.LoginController.addEventHandler('onDataResetting', onDataResetting);

    cwic.LoginController.addEventHandler('onAuthenticationStateChanged', onAuthenticationStateChanged);
    cwic.LoginController.addEventHandler('onAuthenticationFailed', onAuthenticationError);

    cwic.LoginController.addEventHandler('onSSONavigationRequired', onSSONavigationRequired);

    cwic.LoginController.setSSORedirectURL(location.origin + "/newSample/ssopopup.html");
}

function onEmailRequired()
{
    setEmailButtonPressed(configData.username)
}

function onCredentialsRequired()
{
    if(loginFailed){
        cwic.LoginController.signOut();
        console.log("RELOAD PAGE VERIFY CREDENTIALS")
        return;
    }
    cwic.LoginController.setCUCMServers(configData.cucm);
    cwic.LoginController.setCTIServers(configData.cucm);
    cwic.LoginController.setTFTPServers(configData.cucm);
    cwic.LoginController.setCredentials(configData.username, configData.password)
}

function onLifeCycleStateChanged(content)
{
 
}

function onLoggedIn()
{
    console.log("SUCCESFULLY LOGGED IN")
}


function startDiscoveryButtonPressed()
{
    cwic.LoginController.startDiscovery();
}

function manualSignInButtonPressed()
{
    $('.SignInWindow').hide();
    $('#mansignindetails').show();
    
}

function signInButtonPressed()
{
    var username   = configData.username;
    var password   = configData.password;
    var cucm       = configData.cucm;
    var serverList = [];

    serverList.push(cucm);

    cwic.LoginController.setCTIServers(serverList);
    cwic.LoginController.setTFTPServers(serverList);
    cwic.LoginController.setCUCMServers(serverList);

    cwic.LoginController.setCredentials(username, password);
    cwic.LoginController.signIn();

}

function signOutButtonPressed()
{
    cwic.LoginController.signOut();
    $('#signInWindow').show();
}

function setEmailButtonPressed()
{
    var email = configData.username;
    cwic.LoginController.setEmail(email);
    //$('#emailRequiredWindow').hide();
}

function setCredentialsButtonPressed()
{
    var username = configData.username; // CUCM user
	var password = configData.password;

    cwic.LoginController.setCredentials(username, password);
}

function onSignedOut()
{
   /* $('#signInWindow').show();
    cwic.LoginController.removeEventHandler('onSignedOut');*/
    //alert('ONSIGNINOUT TRYING SIGN IN')
    cwic.LoginController.removeEventHandler('onSignedOut');
    console.log("ONSIGNINOUT TRYING SIGN IN")
   // setCredentialsButtonPressed();
   cwic.LoginController.signIn();
}

function onSigningOut()
{
   /* $('.SignInWindow').hide();
    $('.SignOutWindow').hide();
    $("#callcontainer").hide();
    $('#desktopShareWindow').hide();*/

   // cwic.LoginController.addEventHandler('onSignedOut', onSignedOut);
    alert('ONSIGNINOUT TRYING SIGN IN')
    cwic.LoginController.signIn();
   // setCredentialsButtonPressed();
}

function onSignedIn()
{
    //alert('SING IN SUCCESSFULLY')
    console.log("SIGN IN SUCCESSFULLY")
    connectToTelephonyDevice();
    
  /*  $('.SignInWindow').hide();
    $('#devicedetails').show();
    $('#signOut').show();
    $('#signoutbtn').attr('disabled', false);
    $('.externalbtns').attr('disabled', false);*/

    initializeExternalWindowExampleUI();
}

function onSigningIn()
{
    //alert('INICIAR SESION')
    console.log("Loggin init process")
    //setCredentialsButtonPressed();
}

function onServiceDiscovering()
{
   // alert('DISCOVERING SERVICE');
   console.log("Discovering Services")
}

function onDataResetting()
{
    
}

function onAuthenticationStateChanged(state)
{
    console.log("---------------- AUTHENTICATION IN PROGRESS")
    console.log(state)
}

function onAuthenticationError(error)
{
    console.log("---------- ERROR IN AUHTENTICATION - RECARGAR PAGINA");
    console.log(error);
    loginFailed = true;
    return;
    //document.location.reload(true)
}

function onSSONavigationRequired(url)
{
    var $SSOWindow = $("#sdssoinprogress");
    $SSOWindow.show();

    window.onSSONavigationComplete = onSSONavigationComplete;

    //Open a child window for user interaction
    SSOPopUpWindow = window.open(url, '', 'height=500,width=500,scrollbars=1');
}

function onSSONavigationComplete(content)
{
    var $SSOWindow = $("#sdssoinprogress");
    $SSOWindow.hide();
    cwic.LoginController.setSSOTokenURI(content.url);
    console.log("SSO Navigation complete");
}

function cancelSSOButtonPressed()
{
    var $SSOWindow = $("#sdssoinprogress");
    $SSOWindow.hide();

    if(SSOPopUpWindow)
    {
        SSOPopUpWindow.close();
    }


    cwic.LoginController.cancelSSO();
}