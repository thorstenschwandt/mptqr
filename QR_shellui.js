var EFSCmdQRfObj=null,EFSCmdQRAddCon=null;var sCurLang="";

function OnNewShellUI( shellUI ) {
	return {
		OnNewShellFrame: function ( shellFrame ) {
			customData = shellFrame; customData.bShowPrintButton=bShowPrintButton;customData.bShowAboutButton=bShowAboutButton;customData.bShowHelpButton=bShowHelpButton;customData.AddCon=bAddVaultConCmd;
			// custom action 
			function showEFS(bAddConCmd) {										
				customData.baseURL=sBaseUrl;
				if (bAddConCmd) customData.AddCon=true; else customData.AddCon=false;
				try {
					if (shellFrame.ActiveListing.CurrentSelection.GetObjectVersionsCount()>0||shellFrame.ActiveListing.CurrentSelection.Folders.Count>=0) {
						if (sCurLang.substring(0,2)=="de") {shellFrame.ShowPopupDashboard( "QR_de", false, customData );} else {shellFrame.ShowPopupDashboard( "QR_en", false, customData );} 
					}
				} catch (e) { }
			}

			function toggleMenu( EFSShown ) {
				shellFrame.Commands.SetCommandState( EFSCmdQRfObj, CommandLocation_All, ( EFSShown ? CommandState_Hidden : CommandState_Active ) );
				if (customData.AddCon) shellFrame.Commands.SetCommandState( EFSCmdQRAddCon, CommandLocation_All, ( EFSShown ? CommandState_Hidden : CommandState_Active ) );				
			}
	
			// Return ShellFrame Event Handlers
			return {
				OnStarted: function () {
					var vault = shellFrame.ShellUI.Vault;var sVaultLang=String(vault.UserSettingOperations.GetVaultLanguage()).toLowerCase();var langPriority ="";var bIsMFWeb=false;
					try {				
						langPriority = navigator.language || navigator.userLanguage;bIsMFWeb=true;	
					} catch (e) {
						langPriority = vault.SessionInfo.ClientCulture; bIsMFWeb=false;
					}				
					
					if (sVaultLang=="auto"||sVaultLang=="0"||sVaultLang=="undefined") sCurLang = langPriority; else sCurLang = sVaultLang;
					sCurLang=String(sCurLang).toLowerCase();
										
					if (sCurLang.substring(0,2)=="de") {	
						customData.lang="de";
						EFSCmdQRfObj = shellFrame.Commands.CreateCustomCommand( "QR-Mobilelink abrufen...");						
						if (customData.AddCon) EFSCmdQRAddCon = shellFrame.Commands.CreateCustomCommand( "QR-Mobile Vaultverbindung hinzufügen...");										
					}
					else { 
						customData.lang="en"; //default
						EFSCmdQRfObj = shellFrame.Commands.CreateCustomCommand( "Get QR-Mobilelink..."); 
						if (customData.AddCon) EFSCmdQRAddCon = shellFrame.Commands.CreateCustomCommand( "Add QR-Mobile Vault Connection...");
					}
					shellFrame.Commands.AddCustomCommandToMenu( EFSCmdQRfObj, MenuLocation_ContextMenu_Misc2_Middle, 0 ); 
					if (customData.AddCon) shellFrame.Commands.AddCustomCommandToMenu( EFSCmdQRAddCon, MenuLocation_ContextMenu_Misc1_Bottom, 0 );
									
					// Register handler to listen custom commands.
					shellFrame.Commands.Events.Register(Event_CustomCommand, function(command) {
						if(command == EFSCmdQRAddCon) showEFS(true);
						else if(command == EFSCmdQRfObj) showEFS(false);
					});
				},

				OnNewShellListing: function ( shellListing ) {					
					var isCommandInMenu = false;
					// Called when a new shell listing is created.
					// Return new shell listing Event Handlers
					return {
						OnStarted: function () {
							// Called when a new shell listing is started.
							toggleMenu( false ); isCommandInMenu = true;
						},
						OnSelectionChanged: function (selItems) {
							if (shellFrame.CurrentPath!="") {
								ShowEFSMenu(false,isCommandInMenu,shellFrame,EFSCmdQRfObj);
							}
						}
								
					}
				} // End ShellFrame Event Handlers			
		}
	} // End ShellUI Event Handlers
}

}

function ShowEFSMenu(bHide, isCommandInMenu, shellFrame, EFSCmdQRfObj) {
	if (bHide&&isCommandInMenu) {
			shellFrame.Commands.SetCommandState( EFSCmdQRfObj, CommandLocation_All, CommandState_Hidden );
			if (customData.AddCon) shellFrame.Commands.SetCommandState( EFSCmdQRAddCon, CommandLocation_All, CommandState_Hidden );
	}
	else {					
			if (customData.AddCon) shellFrame.Commands.SetCommandState(EFSCmdQRAddCon, MenuLocation_ContextMenu_Misc1_Bottom, CommandState_Active);		
			shellFrame.Commands.SetCommandState( EFSCmdQRfObj, MenuLocation_ContextMenu_Misc2_Middle, CommandState_Active ); 
	}
}
