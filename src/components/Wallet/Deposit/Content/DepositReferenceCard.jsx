import React from "react";
import { Box, Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import PropTypes from "prop-types";

const DepositReferenceCard = ({ link, imgUrl, buttonText, cardHeading, cardSubHeading }) => {
  return (
    <Card sx={{ maxHeight: 290, maxWidth: 350 }}>
      {/* <CardActionArea sx={{ ".MuiCardActionArea-focusHighlight": { backgroundColor: "transparent" } }}> */}
      <CardMedia component="img" height={160} image={imgUrl} alt="referenceImg" sx={{ opacity: 0.5 }} />
      <CardContent sx={{ backgroundColor: "#2C2C34", display: "flex", flexDirection: "column", height: 130, pb: "0 !important" }}>
        <Box sx={{ height: "50%" }}>
          <Typography variant="SemiBold_16" component="div">
            {cardHeading}
          </Typography>
          <Typography variant="Regular_12" component={"p"}>
            {cardSubHeading}
          </Typography>
        </Box>
        <Box sx={{ width: 123, height: "40%", marginTop: "10px" }}>
          <Link size="small" fullWidth variant="primary" sx={{ height: 30, textTransform: "none" }} href={link} target={"_blank"}>
            {buttonText}
          </Link>
        </Box>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default DepositReferenceCard;
DepositReferenceCard.propTypes = {
  link: PropTypes.string,
  imgUrl: PropTypes.string,
  buttonText: PropTypes.string,
  cardHeading: PropTypes.string,
  cardSubHeading: PropTypes.string
};
