
window.newObject = function () {
	return {};
}

var xOnLoad=true; 
function OnNewDashboard( dashboard ) {
	var shellFrame = dashboard.CustomData; var sTitle="";	
	
	try {
		if (shellFrame.AddCon) {
			var sVault=dashboard.Vault.SessionInfo.VaultGUID;
			if (shellFrame.lang=="de") sTitle="Vaultverbindung";else sTitle="vault connection";
			if (sVault.length!=undefined) {
				if (sVault[0]=="{") sVault = sVault.substring(1, sVault.length-1);
			}
			var sAddConBC="m-files://addvault?url=" + shellFrame.baseURL + "&vault=" + sVault;		
			EFS_QRRendition(shellFrame,sAddConBC,sTitle);		
			return false;
		};
		
		var currentSelection = shellFrame.ActiveListing.CurrentSelection;	
		// Something has to be selected ..
		if (currentSelection&&xOnLoad) {
			xOnLoad=false;			
			// VIEW?
			if (currentSelection.GetObjectVersionsCount()==0) {
				
				var sVault=dashboard.Vault.SessionInfo.VaultGUID;
				if (shellFrame.lang=="de") sTitle="Ansicht"; else sTitle="view"
				if (sVault.length!=undefined) {
					if (sVault[0]=="{") sVault = sVault.substring(1, sVault.length-1);
				}
				if (currentSelection.Folders.Count<=0) {
					dashboard.Window.Close();return false;
				}
				var sViewBC="m-files://viewid/" + sVault;		
				if (currentSelection.Folders.Count>0) {sViewBC+="/" + currentSelection.Folders[0].View;}
				try	{
						sTitle+=" " +shellFrame.ActiveListing.GetFolderName(currentSelection.Folders[0]); // MF Web currently doesn't allow us to get the folder name
				}
				catch (e) {}
				
				EFS_QRRendition(shellFrame,sViewBC,sTitle);
		
				return false;
			} else {
				var vault = shellFrame.ShellUI.Vault; var sMFID=""; var sObjType=""; var sCurUserID=vault.SessionInfo.UserID;var sCurPath=shellFrame.CurrentPath;

				var sVault=dashboard.Vault.SessionInfo.VaultGUID;
				if (sVault.length!=undefined) {
					if (sVault[0]=="{") sVault = sVault.substring(1, sVault.length-1);
				}

				if(currentSelection.GetObjectVersionsAndPropertiesAsync) {
					// WEB CLIENT
					currentSelection.GetObjectVersionsAndPropertiesAsync( function ( items ) {
						var oap = items[0];	sObjType=oap.ObjVer.Type;sMFID=oap.ObjVer.ID;sTitle=oap.VersionData.Title;						
						EFS_QRRendition(shellFrame,"m-files://show/" + sVault + "/" + sObjType + "-" + sMFID,sTitle);
						
					});		
				} else {
					// DESKTOP CLIENT
					var oap = shellFrame.ActiveListing.CurrentSelection.ObjectVersionsAndProperties[0];
					var classID = oap.Properties.SearchForProperty(100).Value.GetLookupID();var classObject = vault.ClassOperations.GetObjectClass(classID);
					sTitle=oap.VersionData.Title;sMFID=oap.ObjVer.ID; sObjType=oap.ObjVer.Type; 
					EFS_QRRendition(shellFrame,"m-files://show/" + sVault + "/" + sObjType + "-" + sMFID,sTitle);
				}								
			}
		}		
	} catch (e) { $('#mfbctext').append("<H3>Info: Cannot render QR-symbol for this selection. Currently only M-Files Views and Objects are supported.</H3>");$('#mfbctext').show(); }
}

function EFS_QRRendition(shellFrame,sBC,sTitle) {	
	$('#mfbc').empty();$('#mfbc').qrcode({render:'image',text:sBC, mode: 0,background:'#fff', size: 200, ecLevel: 'L'});$('#mfbc').show();
	$('#mfbctext').append("<p>" + sTitle + "<p>"); 
	if (shellFrame.lang=="de") sTitle="QR-Code für " + sTitle; else sTitle="QR-Code for " + sTitle;
	$('#title').html(sTitle);
	if (shellFrame.bShowPrintButton) $('#mfbtn').show();if (shellFrame.bShowAboutButton) $('#mfabout').show();if (shellFrame.bShowHelpButton) $('#mfhelp').show();		
}

function EFS_PrintQR() {
	var docContainer=document.getElementById('mfbcpage'); 
	var sPreHTML="<html><head><title>printout</title><meta http-equiv='X-UA-Compatible' content='IE=10,9' /><style type='text/css'>	body {margin: 1cm; } </style><link href='css/prnt.css' rel='stylesheet' media='print' type='text/css'/></head><body>";
	var sSufHTML="</body></html>";var windowObject = window.open('', '_blank', 'width=600,height=600,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes,menubar=no,status=no,toolbar=no');
	windowObject.document.writeln(sPreHTML);windowObject.document.writeln(docContainer.innerHTML);windowObject.document.writeln(sSufHTML);	
	windowObject.document.close();windowObject.focus();windowObject.print();
}
