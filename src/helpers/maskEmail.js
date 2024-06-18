export const maskEmail = (email) => {
  if (!email) return "";
  const atIndex = email.lastIndexOf("@");
  const emailName = email.substring(0, atIndex);
  const postFix = email.substring(atIndex, email.length);
  const stars = "***";
  const maxLength = 4;
  let maskedEmail;

  if (emailName.length > maxLength) {
    const prefix = emailName.substring(0, 1);
    maskedEmail = prefix + stars + postFix;
  } else {
    maskedEmail = email;
  }
  return maskedEmail;
};
