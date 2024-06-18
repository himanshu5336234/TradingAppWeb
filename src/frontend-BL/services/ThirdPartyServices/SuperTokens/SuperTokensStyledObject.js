const SuperTokensStyledObject = `
[data-supertokens~=container] {
    --palette-background: #1F1F24;
    --palette-inputBackground: rgba(79, 79, 79, 0.25);
    --palette-inputBorder: 41, 41, 41;
    --palette-textTitle: 255, 255, 255;
    --palette-secondaryText: 255, 255, 255;
    --palette-textLabel: 255, 255, 255;
    --palette-primary: 255, 255, 255;
    --palette-textPrimary: 255, 255, 255;
    --palette-error: 173, 46, 46;
    --palette-textLink: 226, 255, 11;
    --palette-buttonText: 255, 255, 255;
    --palette-superTokensBrandingBackground: 92, 92, 92;
    --palette-superTokensBrandingText: "grey";
    border: 1px solid #4F4F4F;
    --palette-textInput: 255, 255, 255;
    --palette-primaryBorder: 255, 255, 255;
    font-family: "Neurial";
    width: 578px

}
[data-supertokens~=input] {
  "&:-webkit-autofill": {
    "-webkit-text-fill-color": "white !important",
    "-webkit-box-shadow": "0 0 0 0 transparent inset !important"
  },
}
[data-supertokens~=divider]{
  display: none;
}
[data-supertokens~=thirdPartyEmailPasswordDividerOr]{
  color: rgba(79, 79, 79, 0.25);
}
[data-supertokens~=inputWrapper] {
  background: rgba(79, 79, 79, 0.25);
  border: 1px solid #4F4F4F;
  borderRadius: 5px;
  height: 44px;
}
[data-supertokens~=forgotPasswordLink]{
  color: rgba(226, 255, 11);
}
[data-supertokens~=button]{
  height: 48px;
  color: #000000;
}
[data-supertokens~=providerGoogle]{
  background: rgba(79, 79, 79, 0.25);
  border: 1px solid #ffffff;
  paddingTop: 5px;
  paddingBottom: 5px;
  min-width: 100%;
}
[data-supertokens~=providerButtonLeft]{
  margin-left: 0px !important;
  border-right: 1px solid white;
}
[data-supertokens~=providerButtonText]{
  margin: auto;
  font-family: Neurial;
  color: #FFFFFF !important;
  font-weight: 700;
}
[data-supertokens~=providerGoogle]:hover {
  color: #000000;
  background-color: rgba(79, 79, 79, 0.25);
}
[data-supertokens~=superTokensBranding]{
  display: none;
}
[data-supertokens~=container] {
  background: #1F1F24;
}
`;
export default SuperTokensStyledObject;
