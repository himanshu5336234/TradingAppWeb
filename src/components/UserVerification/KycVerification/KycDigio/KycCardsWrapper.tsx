import TextView from "@/components/UI/TextView/TextView";
import { getKyc, getUpdatedKyc } from "@/frontend-BL/redux/actions/User/UserKyc.ac";
import { initiateKycVerification, KycResponse, regenerateKycToken } from "@/pages/UserVerification/KYCVerification/helpers";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { KycCard } from "./KycCard";
import ExpressKyc from "@/assets/images/KycDigio/ExpressKyc.svg";
import ManualKyc from "@/assets/images/KycDigio/ManualKyc.svg";
import StatusModal from "@/components/CustomModals/newModal/StatusModal";
import { setProfileDetails } from "@/frontend-BL/redux/actions/User/SetProfile.ac";
import DensityLogoWithName from "ASSETS/images/logo/LogoWithText.svg";
const KycCardsWrapper = ({ kycDetails }: { kycDetails: KycResponse }) => {
  const dispatch = useDispatch<any>();
  const [apiResponseStatus, setapiResponse] = useState<boolean>(false);

  const [KycVerifiedSuccessFully, setKycVerifiedSuccessFully] = useState<any>({
    isOpen: false,
    KID: ""
  });
  useEffect(() => {
    if (KycVerifiedSuccessFully.isOpen) {
      let second = 0;
      let interval: string | number | NodeJS.Timeout | null | undefined = null;
      interval = setInterval(() => {
        if (second !== 6) {
          second += 1;
        } else {
          dispatch(getUpdatedKyc({ flowId: KycVerifiedSuccessFully.KID }));
          dispatch(setProfileDetails());
          setKycVerifiedSuccessFully({ isOpen: false });
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [KycVerifiedSuccessFully]);

  const initDigio = ({ documentId, identifier, tokenId }: { documentId: string; identifier: string; tokenId: string }) => {
    try {
      const options = {
        environment: "production",
        callback: function (response: { hasOwnProperty: (arg0: string) => any }) {
          if (response.hasOwnProperty("error_code")) {
            // return console.log("error occurred in process");
          }
        },
        // is_iframe: true,
        logo: DensityLogoWithName,
        theme: {
          primaryColor: "#000000",
          secondaryColor: "#000000"
        }
      };

      options.callback = (_digio) => {
        if (_digio?.message.length > 0) {
          setKycVerifiedSuccessFully({
            isOpen: true,
            KID: _digio.digio_doc_id
          });
        }
        if (_digio.error_code !== undefined) {
          throw new Error(_digio.message);
        }
      };
      const digioInstance = new Digio(options);
      digioInstance.init();
      digioInstance.submit(documentId, identifier, tokenId);
    } catch (error) {
      console.log(error, "adiadiadiadiaidaadi");
    }
  };

  const _INITIATE_KYC_REQUEST = async ({ kycType, action }: { kycType: string; action: string }) => {
    if (action !== "REGENERATE_TOKEN") {
      const result = await initiateKycVerification({
        payload: { kycType },
        callback: setapiResponse,
        snackBar: dispatch
      });
      const { email } = result;
      const { entityId, id } = result?.accessToken;
      initDigio({ identifier: email, tokenId: id, documentId: entityId });
      dispatch(getKyc());
    } else {
      const result = await regenerateKycToken({
        payload: { kycType },
        callback: setapiResponse,
        snackBar: dispatch
      });

      const { email } = result;
      const { entityId, id } = result?.accessToken;
      initDigio({
        identifier: email,
        tokenId: id,
        documentId: entityId
      });
    }
  };
  return (
    <>
      <Grid container item gap={3} justifyContent={{ xs: "center", lg: "space-between" }} alignItems={"center"}>
        <Grid item xs={12} lg={5.4}>
          <KycCard
            kycType={"QUICK_KYC_FLOW"}
            kycDetails={kycDetails}
            KycImage={ExpressKyc}
            heading={"Express KYC"}
            headingText={"Takes approx 5 minutes"}
            text={"Must have Active Mobile Number linked with Aadhar"}
            primaryButtonText={"Continue with Express KYC"}
            isRecommended={kycDetails?.flowData?.workFlowType === ""}
            secondaryAction={() =>
              _INITIATE_KYC_REQUEST({
                kycType: "QUICK_KYC_FLOW",
                action: "REGENERATE_TOKEN"
              })
            }
            primaryAction={() =>
              _INITIATE_KYC_REQUEST({
                kycType: "QUICK_KYC_FLOW",
                action: ""
              })
            }
            isDisabled={apiResponseStatus}
          />
        </Grid>
        <Grid item xs={0.5}>
          <TextView component={"p"} textAlign={"center"} text={"OR"} />
        </Grid>

        <Grid item xs={12} lg={5.4}>
          <KycCard
            kycType={"MANUAL_KYC_FLOW"}
            kycDetails={kycDetails}
            KycImage={ManualKyc}
            heading={"Manual KYC"}
            headingText={"Takes approx 10 minutes"}
            text={"Must have Physical or Digital copy of your documents"}
            primaryButtonText={"Continue with Manual KYC"}
            isRecommended={false}
            isDisabled={apiResponseStatus}
            secondaryAction={() =>
              _INITIATE_KYC_REQUEST({
                kycType: "MANUAL_KYC_FLOW",
                action: "REGENERATE_TOKEN"
              })
            }
            primaryAction={() =>
              _INITIATE_KYC_REQUEST({
                kycType: "MANUAL_KYC_FLOW",
                action: ""
              })
            }
          />
        </Grid>
      </Grid>
      <StatusModal
        title={""}
        type={"loading"}
        loader={{
          workflowRunId: "",
          remarks: ""
        }}
        IsOpen={KycVerifiedSuccessFully?.isOpen}
        close={() => null}
        primaryMessage={""}
        secondaryMessage={""}
        mainMessage={""}
      />
    </>
  );
};

export default KycCardsWrapper;
