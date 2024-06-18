import { getMetaDataApi, postMetaDataApi } from "../../src/frontend-api-service/Api";
import { disableFreshChat, enableFreshChat } from "../../src/frontend-BL/services/ThirdPartyServices/FreshChat";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useCheckLoginStatus } from "../frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";

export const getSupportChat = () => {
  const { isLoggedIn } = useCheckLoginStatus();
  const [isSupportChatVisible, setIsSupportChatVisible] = useState(false);
  const supertokensMetadata = useRef({});
  const { profileDetails } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isLoggedIn) {
      getMetaDataApi().then((successResponse) => {
        supertokensMetadata.current = successResponse.data.metadata;
        setIsSupportChatVisible(supertokensMetadata.current?.isSupportChatEnabled);
      });
    }
  }, [isLoggedIn]);

  // Third party FreshChat : test DataSource
  function toggleIsSupportChatVisible(event) {
    postMetaDataApi(
      JSON.stringify({
        ...supertokensMetadata.current,
        isSupportChatEnabled: event.target.checked
      })
    );
    setIsSupportChatVisible(event.target.checked);
    if (event.target.checked) {
      enableFreshChat(supertokensMetadata.current.restoreId, profileDetails);
    } else {
      disableFreshChat();
    }
  }

  function openFcSupportChat() {
    enableFreshChat(supertokensMetadata.current.restoreId, profileDetails);
  }

  window.fcWidget.on("widget:closed", function (resp) {
    toggleIsSupportChatVisible({ target: { checked: false } });
  });

  return {
    isSupportChatVisible,
    toggleIsSupportChatVisible,
    openFcSupportChat
  };
};
