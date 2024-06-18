import React, { useState, useEffect } from "react";

import { Box, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

import TextView from "@/components/UI/TextView/TextView";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import CreateKeyModal from "../UserProfile/PersonalDetails/APIManagementCreateKeyModal";
import EnterOTPModal from "../UserProfile/PersonalDetails/APIManagementEnterOTPModal.tsx";
import KeyCreatedAPIModal from "../UserProfile/PersonalDetails/APIMangementSetKeyDetails";
import DeleteKeyModal from "../UserProfile/PersonalDetails/APIManagementDeleteKeyModal";
import DeleteKeyOTPModal from "../UserProfile/PersonalDetails/APIManagemenetDeleteKeyOTPModal";

import ArrowRight from "@/assets/icons/Arrow-Right.svg";
import APIManagement_DocView from "@/assets/icons/APIManagement_DocView.svg";
import EmptyKeysAsset from "@/assets/icons/APIManagementEmptyKeys.svg";

import { getAuthKeys } from "@/frontend-api-service/Api";
interface listOfApiKeysCreatedProp {
  id: string;
  name: string;
  expiresAt: number;
  expiryDaysLimit: number;
  accessRoleList: string;
  isActive: boolean;
  apiKey: string;
  createdAt: number;
  updatedAt: number;
}
export const APIManagement = () => {
  const navigate = useNavigate();

  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [isCreateOTPModalOpen, setIsCreateOTPModalOpen] = useState(false);
  const [isAPIKeyCreatedModalOpen, setIsAPIKeyCreatedModalOpen] = useState(false);
  const [OTPDetails, setOTPDetails] = useState({});
  const [APICreatedKeyDetails, setAPICreatedKeyDetails] = useState({});

  const [isAPIDeleteKeyModalOpen, setIsAPIKeyDeleteModalOpen] = useState(false);
  const [isAPIDeleteKeyOTPModalOpen, setIsAPIDeleteKeyOTPModalOpen] = useState(false);
  const [deleteKeyOTPDetails, setDeleteKeyOTPDetails] = useState({});

  const [deleteKeyId, setDeleteKeyId] = useState("");
  const [deleteKeyName, setDeleteKeyName] = useState("");
  const [listOfApiKeysCreated, setListOfApiKeysCreated] = useState([]);
  const listOfApiKeysTableHeaders = [
    {
      id: 0,
      name: "API NAME",
      gridSize: 2
    },

    {
      id: 1,
      name: "API EXPIRY",
      gridSize: 2
    },
    {
      id: 0,
      name: "API KEY",
      gridSize: 4
    },
    {
      id: 0,
      name: "SECRET KEY",
      gridSize: 2
    },
    {
      id: 0,
      name: "ACTIONS",
      gridSize: 2
    }
  ];

  const instructionSet = [
    "1. You can create up to 5 active API keys per account.",
    "2. Do not disclose your API Key, Secret Key (HMAC) or Private Key (Ed25519, RSA) to anyone to avoid asset losses. You should treat your API Key and your Secret Key (HMAC) or Private Key (Ed25519, RSA) like your passwords.",
    "3. KYC is required to create an API key",
    "4. The API secret  will be displayed only once -  when an API key is created. Please make sure to note it down as there is no way to retrieve the API secret",
    "5. If you happen to forget or misplace your secret key, it's recommended to delete the existing API key and generate a new one for security purposes."
  ];

  useEffect(() => {
    if (!isAPIDeleteKeyOTPModalOpen && !isAPIKeyCreatedModalOpen) {
      getAuthKeys().then((authKeys: any) => {
        setListOfApiKeysCreated(authKeys.data.apiKeyList);
      });
    }
  }, [isAPIDeleteKeyOTPModalOpen, isAPIKeyCreatedModalOpen]);

  const convertTODaysFromTimestamp = (futureTimestamp: number) => {
    const DaysLeftforExpiry = Math.ceil((futureTimestamp - new Date().getTime()) / (1000 * 3600 * 24));
    return DaysLeftforExpiry > 1 ? DaysLeftforExpiry + " Days " : DaysLeftforExpiry + " Day ";
  };

  return (
    <Box p={"1rem"} sx={{ height: "100%" }}>
      <Box p={"2.5rem 1.5rem 2.5rem 1.5rem"} sx={{ backgroundColor: "background.primary" }}>
        <TextView variant={"Medium_14"} color={"text.secondary"} text={"Profile / API Management"} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box onClick={() => navigate(-1)} sx={{ display: "flex", cursor: "pointer", flexBasis: "50%" }}>
            <Box component={"img"} src={ArrowRight} style={{ marginRight: "5px" }} />
            <TextView component={"h1"} variant={"Bold_40"} text={"API Management"} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              component={"img"}
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.href = "https://density-uploads-dev.s3.ap-south-1.amazonaws.com/assets/api-trading+.pdf")}
              src={APIManagement_DocView}
            />
            <CustomButton
              onClick={() => {
                setIsCreateKeyModalOpen(true);
              }}
              label={"Create API Key"}
              variant={"primary"}
              isDisabled={listOfApiKeysCreated.length >= 5}
              style={{ width: "186px", hight: "48px", marginLeft: "1rem" }}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "1rem" }}>
          {instructionSet.map((data, index) => {
            return (
              <Box key={index}>
                <TextView text={data} variant={"Regular_14"} color={"color.tertiary"} />
              </Box>
            );
          })}
          <TextView text={"6. After you create your API key. Please go through these"} variant={"Regular_14"} color={"color.tertiary"} />
          <TextView
            onClick={() => (window.location.href = "https://density-uploads-dev.s3.ap-south-1.amazonaws.com/assets/api-trading+.pdf")}
            style={{ cursor: "pointer" }}
            text={" Documents "}
            variant={"Regular_14"}
            color={"text.highlight"}
          />
          <TextView text={"to start API trading."} variant={"Regular_14"} color={"color.tertiary"} />
        </Box>
      </Box>
      {listOfApiKeysCreated.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "50%",
            alignItems: "center"
          }}
        >
          <Box>
            <Box sx={{ paddingLeft: "1.5rem" }} component={"img"} src={EmptyKeysAsset} alt={EmptyKeysAsset} />
            <Box sx={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
              <TextView text={"No API Keys Created till now"} variant={"Medium_15"} />
            </Box>
            <Box>
              <CustomButton
                onClick={() => {
                  setIsCreateKeyModalOpen(true);
                }}
                label={"Create API Key"}
                variant={"primary"}
                style={{ width: "186px", hight: "48px", marginLeft: "1rem" }}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginTop: "1.5rem" }}>
          <Grid container xs={12}>
            {listOfApiKeysTableHeaders.map((header) => {
              return (
                <Grid xs={header.gridSize} key={header.id}>
                  <TextView text={header.name} variant={"Medium_11"} color={"text.regular"} />
                </Grid>
              );
            })}
          </Grid>
          {listOfApiKeysCreated.map((apiKey: listOfApiKeysCreatedProp, index: number) => {
            return (
              <Grid key={index} container xs={12} sx={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
                <Grid xs={2}>
                  <TextView text={apiKey?.name} variant={"Medium_14"} />
                </Grid>
                <Grid xs={2}>
                  <TextView text={convertTODaysFromTimestamp(apiKey?.expiresAt)} variant={"Medium_14"} />
                </Grid>
                <Grid xs={4}>
                  <TextView text={apiKey?.apiKey?.substring(0, 45)} variant={"Medium_14"} />
                  <CopyButton copyText={apiKey?.apiKey} />
                </Grid>
                <Grid xs={2}>
                  <TextView text={"**********"} variant={"Medium_14"} />
                </Grid>
                <Grid xs={2}>
                  <TextView
                    text={"Delete API"}
                    variant={"Medium_14"}
                    color={"text.highlight"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setDeleteKeyId(apiKey?.id);
                      setDeleteKeyName(apiKey?.name);
                      setIsAPIKeyDeleteModalOpen(true);
                    }}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Box>
      )}
      {isCreateKeyModalOpen && (
        <CreateKeyModal
          listOfApiKeysCreated={listOfApiKeysCreated}
          isOpen={isCreateKeyModalOpen}
          setOTPDetails={setOTPDetails}
          setIsOTPModalOpen={setIsCreateOTPModalOpen}
          setIsOpen={setIsCreateKeyModalOpen}
        />
      )}
      {isCreateOTPModalOpen && (
        <EnterOTPModal
          OTPDetails={OTPDetails}
          setOTPDetails={setOTPDetails}
          setIsAPIKeyCreatedModalOpen={setIsAPIKeyCreatedModalOpen}
          setAPICreatedKeyDetails={setAPICreatedKeyDetails}
          isOpen={isCreateOTPModalOpen}
          setIsOpen={setIsCreateOTPModalOpen}
        />
      )}
      {isAPIKeyCreatedModalOpen && <KeyCreatedAPIModal APICreatedKeyDetails={APICreatedKeyDetails} isOpen={isAPIKeyCreatedModalOpen} setIsOpen={setIsAPIKeyCreatedModalOpen} />}
      {isAPIDeleteKeyModalOpen && (
        <DeleteKeyModal
          isOpen={isAPIDeleteKeyModalOpen}
          deleteKeyName={deleteKeyName}
          setIsOpen={setIsAPIKeyDeleteModalOpen}
          setDeleteKeyOTPDetails={setDeleteKeyOTPDetails}
          setIsAPIDeleteKeyOTPModalOpen={setIsAPIDeleteKeyOTPModalOpen}
        />
      )}
      {isAPIDeleteKeyOTPModalOpen && (
        <DeleteKeyOTPModal
          deleteKeyId={deleteKeyId}
          isOpen={isAPIDeleteKeyOTPModalOpen}
          setIsOpen={setIsAPIDeleteKeyOTPModalOpen}
          setDeleteKeyOTPDetails={setDeleteKeyOTPDetails}
          deleteKeyOTPDetails={deleteKeyOTPDetails}
        />
      )}
    </Box>
  );
};
