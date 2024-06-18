import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { Box, Typography, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { TnC_CONTAINER } from "./Modals.styles";

interface TnCProps {
  IsOpen: boolean;
  setShowTnC: React.Dispatch<React.SetStateAction<boolean>>;
  primaryAction: Function;
}
const TermsAndConditionsModal: React.FC<TnCProps> = ({ IsOpen, setShowTnC, primaryAction }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: any) => {
    setIsChecked(e.target.checked);
  };
  return (
    <CustomModal
      IsOpen={IsOpen}
      close={() => setShowTnC(false)}
      isClose={true}
      isPrimaryAction={true}
      isSecondaryAction={true}
      secondaryAction={() => setShowTnC(false)}
      primaryName={"Continue"}
      secondaryName={"Cancel"}
      primaryAction={() => {
        setShowTnC(false);
        primaryAction();
      }}
      primaryDisabled={!isChecked}
    >
      <Box p={2} display={"flex"} flexDirection={"column"}>
        <Typography variant={"Medium_16"}>{"Terms & Conditions"}</Typography>
        <Typography mt={4} color={"#EBB62F"} variant={"Regular_12"}>
          {"Please review the T&C carefully before proceeding."}
        </Typography>
        <Box sx={TnC_CONTAINER}>
          <Typography variant="Regular_18">{"SIGNAL TRADING (COPY TRADING):"}</Typography>
          <Typography variant="Regular_14" mt={1}>
            {`Signal Trading, also known as Copy Trading, is a service that permits you to replicate the transactions of other users, referred to as "Copied Traders," "Master Traders," or "Analysts." When engaging in Copy Trading, parameters such as symbols, limit price, leverage, take profit, and stop loss will be automatically configured in accordance with the settings established by the Copied Trader. You retain the ability to manually close a Copy Trade prior to completion. By utilizing Copy Trading, you acknowledge and consent to the following terms:`}
          </Typography>
          <Typography variant="Regular_18" mt={1}>
            {"GENERAL TERMS AND CONDITIONS:"}
          </Typography>
          <Typography variant="Regular_14" mt={1}>
            {`These provisions are supplementary to our general terms and conditions, which govern all our services, including Copy Trading.`}
          </Typography>
          <Box pl={2} my={2}>
            <Typography variant="Regular_14" mt={1}>
              1. We may execute your Copy Trades without securing your explicit consent. <br /> 2. You are solely responsible for all fees associated with your use of Copy Trading. <br /> 3. Access to
              specific or all Copy Trading functions may be restricted in accordance with applicable laws, regulations, and rules.
              <br />
              4. We do not warrant or guarantee the performance of any Copied Trader. Past performance does not necessarily reflect future performance. We bear no liability for the actions of Copied
              Traders. <br /> 5. Copy Trading does not constitute investment, financial, or other forms of advice. You should employ Copy Trading as a tool for conducting your independent research and
              refrain from making decisions solely based on the actions of Copied Traders. <br />
              6. We retain the right to cancel, suspend, block, or cease all Copy Traders, Copy Trades, and/or Copy Trading.
              <br /> 7. You assume responsibility for all Copy Trades executed on the platform.
              <br /> 8. We are not accountable or liable for software and/or system failures that may impact Copy Trading. <br /> 9. Any and all losses you incur through the use of Copy Trading are
              your responsibility. <br />
              10. Copy Trading is a speculative endeavor, and significant losses may arise due to various factors, including slippage during trade execution, materially different outcomes compared to
              Copied Traders, or the replication of trades conducted by inexperienced or unprofessional Copied Traders.
            </Typography>
          </Box>
          <Typography variant="Regular_18">{`RISK DISCLOSURE:`}</Typography>
          <Typography mt={2} variant="Regular_14">
            {`Please be aware that this risk disclosure supplements the risk disclosure concerning products traded on our platform. When considering the replication of specific traders, strategies, and/or investment portfolios, it is imperative to assess your financial situation, including your financial obligations. Copy Trading carries substantial risk, please consider the following risks associated with Copy Trading:`}
          </Typography>
          <Typography my={1} variant="Regular_14">
            (i) Automatic execution of trade orders, where trades are initiated and closed in your account without your intervention or guidance. <br /> (ii) Modification or closure of orders created
            by the Copy Trading function may result in significantly different outcomes compared to the trader you are copying. <br />
            (iii) The system will not replicate a copy trading value lower than the minimum trade value indicated on our platform. <br /> (iv) When copying all trades associated with the Master Trader
            you are following, your position may be executed at the best available price at the time of the copy trade, rather than the opening price of the copied trade. <br />
            (v) Withdrawals made by the Principal Trader, strategy, and/or investment portfolio you are copying may have substantially different implications for you compared to the Master Trader you
            are following. This discrepancy arises from factors including your initial account balance, the varying proportion of trades, minimum trade size, account settings, spread fluctuations,
            interest rates, investment prices at the time of your investment, and potential fee variations.
            <br />
            (vi) Copying the decisions of inexperienced and/or non-professional traders carries inherent risks, and we do not guarantee the expertise, skill, or diligence of any trader you choose to
            follow and/or copy.
            <br />
            (vii) You may be copying traders with objectives, ultimate intentions, or financial statuses that significantly differ from your own. <br />
            (viii) Following and/or copying traders or their portfolios that trade products unavailable to you, whether due to regulatory constraints or other reasons, and in cases where equivalent
            trade replication is not feasible, may impact the performance of your portfolio, the composition of your investments, risk ranking, and other factors related to your investment portfolio
            that deviate from the portfolio of the trader you are copying or the portfolio being copied.
          </Typography>
          <Typography variant="Regular_18">{`TRADING INSTRUCTIONS:`}</Typography>
          <Box pl={2} my={2}>
            <Typography variant="Regular_14" mt={1}>
              1. The platform enables interaction, tracking, and replication of other traders' signals/orders, providing "Social Trading Features." These features encompass comprehensive account
              information, trading history, risk profiles, and other pertinent data related to Principal Traders' strategies and/or portfolios, which may assist you in deciding whether to replicate
              the Master Trader, strategy, and/or portfolio.
              <br />
              2. Copy trading is a functionality that permits you to emulate the trades of other traders, particularly the Master Trader. By submitting a copy trade instruction via our platform, you
              authorize us to automatically execute trade orders on your account based on the Master Trader's account, to the fullest extent within the maximum scope defined by the service or copy
              trading function, which may periodically be detailed on our platform, without the necessity of consultation or prior consent. Copy trades will be executed proportionally and in
              correlation with identical products and trade recommendations. Therefore, we possess the authority to initiate and conclude positions, establish limits, and undertake all requisite
              actions to provide the copy trading service. <br />
              3. We may be unable to replicate trades in the same manner as the Master Trader or the portfolio being copied due to reasons including:
              <br />
              <Typography pl={1}>
                (a) Inapplicability of the described trading method to your account, as a result of regulatory constraints or other considerations.
                <br />
                (b) Non-execution of trades if your account lacks the requisite available balance for execution.
                <br />
                (c) Non-execution of trades failing to comply with the risk parameters specified by you at the time of following the Master Trader.
                <br />
                (d) In the event that the signal is removed or withdrawn by either the individual replicating said signal or the Master Trader/Analyst personally.
                <br />
                (e) If the order is rejected by the liquidity provider due to sufficient reasons.
                <br />
              </Typography>
              4. If you are constrained from trading certain asset types or specific products due to regulatory restrictions, other regulatory stipulations, or other factors we may deem fit at our
              sole discretion, we may opt for actions consistent with applicable law to ensure comparable or analogous trading within your account instead of restricted trading (e.g., transitioning to
              trading similar derivatives or vice versa) <br />
              5. Prior to utilizing the copy trading service, you must maintain a sufficient balance in your account to access the service. In the event of insufficient assets, you consent to our
              utilization of any balance within your account to execute trade orders <br />
              6. In instances where no remaining balance exists in your account for copy trades, no copy trade instruction will be executed. To facilitate the maximum possible execution of copy trades
              within authorized limits, you grant us, but not others, the authority to allocate the balance in your account in proportion to the account you are copying.
              <br />
              7. When we execute trade orders automatically pursuant to your instructions for copying traders or copied portfolios, we are not obligated to seek approval, advance confirmation, or
              consent from you for said trade orders. Specific limitations on trade instructions apply when employing the copy trading service, which include minimum and maximum investment amounts
              with traders or copied portfolios. These limitations are specified on our website and may be periodically adjusted at our sole discretion. Trades contravening these limitations will be
              closed at our discretion. <br />
              8. Notably, when utilizing our copy trading service, we exclusively replicate newly initiated trades following the commencement of your replication of the Master Trader's account. This
              implies that we do not replicate any trades within the trader's account that have been initiated prior to this point.
              <br />
            </Typography>
          </Box>
          <Typography variant="Regular_18">{`LIMITATION OF LIABILITY:`}</Typography>
          <Typography mt={2} variant="Regular_14">
            1. Our services encompass copy trading services provided "as-is." <br />
            2. To the greatest extent permitted by applicable law, we do not provide any warranties or assurances regarding the quality of our platform and services. By using our services, you assume
            exclusive risk and accountability for all outcomes and legal matters (including infringements, breaches, or other liabilities) arising from the use of our platform, website, third-party
            content, or accounts. We, and any parties providing compensation for any damages, shall not be liable to you or any third party for any damages, whether direct, indirect, special,
            incidental, consequential, or stemming from or connected to any cause, including business loss, data loss, business disruption, or loss of profit, savings, or data. This encompasses
            liability under contract, tort, strict liability, or any other theory arising from or related to the site, platform, third-party content, or any account or demand from any party, in any
            event, even if we are aware or have reason to be aware of the potential for such damage, claim, or demand. The aforementioned limitations and waivers of liability shall be deemed valid and
            effective.
            <br />
            3. Furthermore, to the maximum extent allowed by applicable law, we shall not be liable for (i) any actions we take in compliance with your relevant copy trading instructions, or (ii) any
            decisions or actions of the Master Trader you are copying.
            <br />
            4. We reserve the right to assess whether copy trading services are a suitable investment tool for you and may impose specific conditions ("Suitability Assessment"). The outcome of the
            Suitability Assessment, if we choose to proceed, shall be based on the information and documents you provide as requested by us. You have the option to modify your information at any time.
            <br />
            5. Your ability to employ our copy trading service may be limited based on your Suitability Assessment. If we ascertain that copy trading is an unsuitable investment tool for you, you will
            not be granted access to various copy trading functions on our platform. We are not responsible for any losses you may incur due to the provision of false information or information
            leading to a misunderstanding, which forms part of the Suitability Assessment, including cases where such information results in the creation of an inaccurate investment profile for you.{" "}
            <br />
            6. Within the maximum allowable scope of applicable law, nothing within our copy trading service or platform functionalities shall have an impact on personal investment recommendations,
            investment advice, tax-related advice, or other financial advice. Descriptions or information presented by us as part of our services or related to the performance of our copy trading
            service shall not constitute, and should not be construed as, any form of investment recommendation. The information we provide through our platform is intended solely for informational
            purposes. <br />
            7. You should use information obtained from our website or social trading features as a starting point for independently considering investment decisions. However, you should refrain from
            making investment decisions solely based on the information displayed on our platform or within our community
            <br />
            8. We shall undertake reasonable measures to evaluate the performance of Principal Traders who are being copied under the copy trading functionality, including the performance of our copy
            trading service.
            <br />
            9. We reserve the right to suspend, terminate, or block Master Traders being copied under the copy trading functionality. In such instances, any trades initiated as a result of the copy
            trading functionality shall be closed. <br />
            10. We reserve the right to terminate the copy trading service or portfolio copy functionality at our discretion (including in the event that you no longer meet the criteria to receive the
            service or if we are hindered from providing the service by any applicable law or regulation) and shall provide written notification thereof. <br />
            11. We may terminate the copy trading service or portfolio copy functionality if we suspect or have reason to believe that (i) prohibited trading activities are being conducted, including
            manipulated trading activities or violations, (ii) false information has been provided for account opening purposes, or (iii) you have acted in a manner contrary to good faith. <br />
            12. Upon termination of the copy trading service or portfolio copy functionality, any trades initiated as a result of these functionalities shall be closed. <br />
            13. We retain the right to amend the terms of the copy trading service or portfolio copy functionality without requiring further consent from you. <br />
            14. We do not endorse or guarantee the performance of traders, investments, accounts, investment portfolios, or any strategies. We do not guarantee the replication of past performance
            rates achieved, which are results of a Master Trader's performance or a portfolio you choose to follow. The profits (or losses) you accrue or experience may not mirror those of the Master
            Trader or the investment portfolio you copy. <br />
            15. Past performance, risk scores, statistics, and other information related to traders on our platform under the copy trading functionality and/or portfolio copy functionality, or any
            other investment portfolios and trading strategies under the portfolio copy functionality, do not serve as reliable indicators of future performance <br />
            16. We cannot endorse or guarantee that you will attain profits or losses similar to those demonstrated by the trader or portfolio you opt to copy, as results may vary.
            <br />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mt: 2
          }}
        >
          <Checkbox checked={isChecked} onChange={handleChange} />
          <Typography onClick={() => handleChange({ target: { checked: !isChecked } })} variant={"SemiBold_12"} color={"text.regular"} sx={{ cursor: "pointer" }}>
            {"I have read the T&C and I accept it."}
          </Typography>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default TermsAndConditionsModal;
