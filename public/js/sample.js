const username = configData.username; // CUCM user
const password = configData.password;
const cucm =  configData.cucm; // CUCM ip/hostname

$(document).ready(function ()
{
	cwic.SystemController.setLoggingLevel(0);
	cwic.SystemController.addEventHandler('onInitialized', onCwicLoaded);
	cwic.SystemController.addEventHandler('onInitializationError', onCwicError);
	cwic.SystemController.addEventHandler('onUserAuthorized', onUserAuthorized);
	cwic.SystemController.addEventHandler('onUserAuthorizationRejected', onAuthorizationRejected);
	cwic.SystemController.addEventHandler('onAddonConnectionLost', onAddonConnectionLost);
	cwic.SystemController.initialize();
});

document.addEventListener("unload", (function()
{
	window.open("www.google.com", '', 'height=500,width=500,scrollbars=1');
}));

function onAddonConnectionLost()
{
	var $ErrorMessageWindowCloseButton = $('#closeErrorMessageWindowButton');
	var $ErrorMessageWindow = $('#errorMessageContainer');


	$ErrorMessageWindowCloseButton.click(function()
	{
		$ErrorMessageWindow.hide();
	});

	var messageContainer = document.getElementById("errorMessage");
	messageContainer.innerHTML = "Lost connection with add-on";

	$ErrorMessageWindow.show();
}

function onCwicError(errorInfo)
{
	var $ErrorMessageWindowCloseButton = $('#closeErrorMessageWindowButton');
	var $ErrorMessageWindow = $('#errorMessageContainer');


	$ErrorMessageWindowCloseButton.click(function()
	{
		$ErrorMessageWindow.hide();
	});

	var extensionURL = errorInfo.errorData.extensionURL;
	var errorReason  = errorInfo.errorData.reason;

	errorMessage = "Could not initialize CWIC library: " + errorReason;

	switch(errorInfo.errorType)
	{
		case "ChromeExtension":
			errorMessage += "<br>" + "<a href='" + extensionURL + "'> You can download extension here</a>";
	}

	var messageContainer = document.getElementById("errorMessage");
	messageContainer.innerHTML = errorMessage;
	$ErrorMessageWindow.show();
}

function onCwicLoaded()
{
	$("#cwicVersion").text(cwic.SystemController.cwicVersion);
	$("#addonVersion").text(cwic.SystemController.addonVersion);
	$("#systemRelease").text(cwic.SystemController.systemRelease);
	autoLoginInit();
}

function onUserAuthorized()
{
	initializeLoginExampleUI();
	initializeMediaDeviceExampleUI();
	initializeRingtoneExampleUI();
	initializeMonitorExampleUI();
	initializeTelephonyDeviceExampleUI();
	initializeTelephonyConversationExampleUI();
	initializeCallPickupExampleUI();
	initializeInvalidCertificateExampleUI();

	
}

function onAuthorizationRejected()
{
	console.log("rejected");
	//document.location.reload(true)
}

function initializeLoginExampleUI()
{
	initilizeLoginEventHandlers();
}

function initializeMediaDeviceExampleUI()
{
	initializeMediaDeviceEventHandlers();
}

function initializeRingtoneExampleUI()
{
	initializeRingtoneEventHandlers();

	var $RingtoneList = $('#ringtonesSelect');

	$RingtoneList.change(selectRingtone);
}

function initializeMonitorExampleUI()
{
	initializeMonitorEventHandlers();

	var $RefreshMonitorListButton = $('#refreshMonitorListButton');
	var $UnHighlightMonitor = $("#UnhighlightMonitorButton");

	$RefreshMonitorListButton.click(refreshMonitorList);
	$UnHighlightMonitor.click(unhighlightScreen);
}

function initializeTelephonyDeviceExampleUI()
{
	initializeTelephonyDeviceHandlers();
}

function initializeTelephonyConversationExampleUI()
{
	initializeTelephonyConversationHandlers();


	var $StartAudioConversationButton = $('#startAudioConversationButton');
	var $StartVideoConversationButton = $('#startVideoConversationButton');

	var $EndButton              = $('#endCallButton');
	var $AnswerAudioButton      = $('#answerAudioButton');
	var $AnswerVideoButton      = $('#answerVideoButton');
	var $IDivertButton          = $('#iDevertButton');
	var $HoldResumeButton       = $('#holdResumeButton');
	var $MuteAudioButton        = $('#muteAudioButton');
	var $MuteVideoButton        = $('#muteVideoButton');
	var $StartVideoButton       = $('#sendVideoButton');
	var $StartScreenShareButton = $('#screenShareButton');
	var $TransferButton         = $('#transferbtn');
	var $CompleteTransferButton = $('#completebtn');
	var $StartConferenceButton  = $('#conferencebtn');
	var $DTMFField              = $('#dtmfNumberEntry');

	var $CameraTurnLeftButton  = $("#cameraTurnLeft");
	var $CameraTurnRightButton = $("#cameraTurnRight");
	var $CameraTurnUpButton    = $("#cameraTurnUp");
	var $CameraTurnDownButton  = $("#cameraTurnDown");
	var $CameraZoomInButton    = $("#cameraZoomIn");
	var $CameraZoomOutButton   = $("#cameraZoomOut");

	var $CallList = $('#calllist');



	$StartAudioConversationButton.click(startAudioConversation);
	$StartVideoConversationButton.click(startVideoConversation);

	$EndButton.click(endCall);
	$AnswerAudioButton.click(answerAudio);
	$AnswerVideoButton.click(answerVideo);
	$IDivertButton.click(iDivert);
	$HoldResumeButton.click(hold);
	$MuteAudioButton.click(muteAudio);
	$MuteVideoButton.click(muteVideo);
	$StartVideoButton.click(startVideo);
	$StartScreenShareButton.click(shareScreen);
	$TransferButton.click(transferConversation);
	$CompleteTransferButton.click(completeTransfer);
	$StartConferenceButton.click(mergeConversations);

	$CameraTurnLeftButton.mousedown(remoteCameraTurnLeftStart);
	$CameraTurnLeftButton.mouseup(remoteCameraTurnLeftStop);
	$CameraTurnRightButton.mousedown(remoteCameraTurnRightStart);
	$CameraTurnRightButton.mouseup(remoteCameraTurnRightStop);
	$CameraTurnDownButton.mousedown(remoteCameraTiltDownStart);
	$CameraTurnDownButton.mouseup(remoteCameraTiltDownStop);
	$CameraTurnUpButton.mousedown(remoteCameraTiltUpStart);
	$CameraTurnUpButton.mouseup(remoteCameraTiltUpStop);
	$CameraZoomInButton.mousedown(remoteCameraZoomInStart);
	$CameraZoomInButton.mouseup(remoteCameraZoomInStop);
	$CameraZoomOutButton.mousedown(remoteCameraZoomOutStart);
	$CameraZoomOutButton.mouseup(remoteCameraZoomOutStop);

	$CallList.click(onConversationSelected);
	$DTMFField.keypress(onDTMFDigitEntered);
}

function initializeExternalWindowExampleUI()
{
	if (cwic.SystemController.getCapabilities().nativeWindowDockingSupport)
	{
		var dockPreviewButton   = '<input type="button" id="dockPreviewWindow" class="externalbtns"  value="Dock">\n';
		var undockPreviewButton = '<input type="button" id="undockPreviewWindow" class="externalbtns" value="Undock">';

		$('#previewWindowButtonsStrip').append(dockPreviewButton, undockPreviewButton);

		var dockDesktopShareButton   = '<input type="button" id="dockDesktopShareWindow" class="externalbtns"  value="Dock">\n';
		var undockDesktopShareButton = '<input type="button" id="undockDesktopShareWindow" class="externalbtns" value="Undock">';

		$('#desktopShareButtonsStrip').append(dockDesktopShareButton, undockDesktopShareButton);

		initializeLocalPreviewExternalWindowControls();
		initializeScreenShareExternalWindowControls();
		initializeConversationExternalWindowControls();
	}
	else
	{
		initializeLocalPreviewVideoWindowControls();
		initializeScreenShareVideoWindowControls();
	}
}

function initializeCallPickupExampleUI()
{
	initializeCallPickupEventHandlers();

	var $CallPickupButton = $('#callPickupButton');
	var $GroupCallPickupButton = $('#groupCallPickupButton');
	var $OtherGroupPickupButton = $('#otherGroupPickupButton');

	$CallPickupButton.click(onCallPickupButtonPressed);
	$GroupCallPickupButton.click(onGroupCallPickuButtonPressed);
	$OtherGroupPickupButton.click(onOtherGroupPickupButtonPressed);

	var $CallPickupNotificationPickupButton = $('#callPickupNotificationPickupButton');
	var $CallPickupNotificationIgnoreButton = $('#callPickupNotificationIgnoreButton');

	$CallPickupNotificationPickupButton.click(onPickupButtonPressed);
	$CallPickupNotificationIgnoreButton.click(onIgnoreButtonPressed);
}

function initializeInvalidCertificateExampleUI()
{
	initializeInvalidCertificateEventHandlers();
}

function autoLoginInit(){

	cwic.LoginController.setCUCMServers(cucm);
    cwic.LoginController.setCTIServers(cucm);
    cwic.LoginController.setTFTPServers(cucm);
	cwic.LoginController.setCredentials(username, password);
	cwic.LoginController.signIn();

}

	