
var bWeb;

window.newObject = function () {
	return {};
}

function OnNewDashboard( dashboard ) {
	var shellFrame = dashboard.CustomData; var sTitle="";	
	
	try {
		bWeb=eval(shellFrame.ActiveListing.CurrentSelection.GetObjectVersionsAndPropertiesAsync);
	}
	catch (e) {}
	
	try {
		if (shellFrame.AddCon) {
			var sVault=dashboard.Vault.SessionInfo.VaultGUID;
			if (shellFrame.lang=="de") sTitle="Vaultverbindung";else sTitle="vault connection";
			if (sVault.length!=undefined) {
				if (sVault[0]=="{") sVault = sVault.substring(1, sVault.length-1);
			}
			dashboard.Vault.Async.NamedValueStorageOperations.GetNamedValues( 3, "M-Files.Core.WebConfiguration", function ( namedValues ) {	
				sBaseURL=namedValues.Value("CanonicalBaseURL");		
				if (sBaseURL!=null&&sBaseURL!="") {
					var sAddConBC="m-files://addvault?url=" + sBaseURL + "&vault=" + sVault;		
					EFS_QRRendition(shellFrame,sAddConBC,sTitle);							
				} else {
					$('#mfbctext').append("<H3>Info: Cannot render QR-symbol for this vault. Please specify the vaults M-Files Web URL in M-Files Admin Console first.</H3>");$('#mfbctext').show(); 
				}
			});		
			return false;	
		};
		
		var currentSelection = shellFrame.ActiveListing.CurrentSelection;	
		// Something has to be selected ..
		if (currentSelection) {
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
	if (shellFrame.bShowPrintButton) $('#mfbtn').show();if (shellFrame.bShowAboutButton) $('#mfabout').show();if (shellFrame.bShowHelpButton) $('#mfhelp').show();if (shellFrame.bShowCopyButton) $('#mfbtn2').show();
}

function EFS_PrintQR() {
		var doc = new jsPDF();doc.setFontSize(10);doc.text($('#title').text(), 12, 18);
		var imgData = $('#mfbc > img').attr('src');doc.addImage(imgData, 'png', 12, 30 ); 	
		doc.autoPrint(); var bShow=bWeb;
		// check if current browser is IE. IE should only download/print the PDF. 
		if (bShow) {
			var ua = window.navigator.userAgent;
			var oie = ua.indexOf('MSIE ');var nie = ua.indexOf('Trident/');
			if ((oie>-1)||(nie>-1)) {
				bShow=false; 
			} 
		}
		if (bShow) {
			var spdfdoc = doc.output('datauristring');
			var windowObject = window.open('', '_blank', 'width=600,height=600,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes,menubar=no,status=no,toolbar=no');
			windowObject.document.open();
			windowObject.document.writeln("<html><head><body>" );windowObject.document.writeln("<object data='" + spdfdoc + "' type='application/pdf' width='600' height='600'><embed src='" + spdfdoc + "' type='application/pdf'></embed></object>" );windowObject.document.writeln("</body></head></html>" );
			windowObject.document.close();
		} else {
			doc.save("printme.pdf");
		}
}

function EFS_CopyQR(cid,sL) {
	
	try {
		var range = document.createRange();range.selectNode(document.getElementById(cid));window.getSelection().removeAllRanges();window.getSelection().addRange(range); document.execCommand("copy");window.getSelection().removeAllRanges();
		if (sL="de") alert("QR-Code wurde in die Zwischenablage kopiert. ");
		else alert("QR-Code copied to clipboard. ");

	} catch (e) {alert(e);}
		
}
