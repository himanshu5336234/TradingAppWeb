export function enableFreshChat(restoreID, profileDetails) {
  window.fcWidget.init({
    token: "ae0cd8cb-5669-4691-bcf6-ce6f3408b61c",
    host: "https://density-help.freshchat.com",
    externalId: profileDetails.email, // user’s id unique to your system,
    restoreId: restoreID,
    phone: profileDetails.mobile_number,
    firstName: profileDetails.firstName, // user’s first name
    lastName: profileDetails.lastName, // user’s last name
    email: profileDetails.email // user’s email address
  });
  window.fcWidget.on("widget:loaded", function (resp) {
    window.fcWidget.open();
  });
}

export function disableFreshChat() {
  window.fcWidget.destroy();
}
