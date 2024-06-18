import { getReferralDetails, getReferralEarningsByTimeFrame, getReferralRewardHistory } from "@/frontend-BL/redux/actions/Setting/GetRewardData.ac";
import { getMetaDataApi, postMetaDataApi } from "@/frontend-api-service/Api";
import { GetAppURL } from "@/frontend-api-service/Base";
import { getTimeFrameRange } from "@/helpers/getRewardTimeFrame";
// import { BRANCH_IO_KEY } from "@/utils/constants";
import Branch from "branch-sdk";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { BRANCH_IO_KEY } from "@/utils/constants";

export const useReferralTab = () => {
  // Get the current Date object
  const currentDate = new Date();
  const profileData = useSelector((state) => state.profile.profileDetails);
  const [referralCode, setReferralCode] = useState("");
  const [ReferralDeepLinkUrl, setReferralDeepLinkUrl] = useState("");
  const [referralEarnings, setReferralEarnings] = useState({
    totalVolume: 0,
    totalReward: 0,
    level: "0"
  });
  const [totalCount, setTotalCount] = useState(0);
  const [referralRewardHistory, setReferralRewardHistory] = useState([]);
  const [refereeHistory, setRefereeHistory] = useState([]);
  const [duration, setDuration] = useState("day");
  const [refereeHistoryTable, setRefereeHistoryTable] = useState({
    page: 0,
    rowsPerPage: 5
  });
  const [referralRewardTable, setReferralRewardTable] = useState({
    page: 1,
    rowsPerPage: 5
  });

  useEffect(() => {
    getReferralDetails().then((data) => {
      setReferralCode(data.referralCode);
      setRefereeHistory(data.refereeHistory);
      const linkData = {
        method: "POST",
        url: "https://api2.branch.io/v1/url",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        data: {
          $fallback_url: GetAppURL() + "/auth/signup",
          $desktop_url: GetAppURL() + "/auth/signup",
          referralCode: data?.referralCode,
          $ios_url: "https://apps.apple.com/in/app/density/id6449458595",
          $android_url: "https://play.google.com/store/apps/details?id=com.densityexchange",
          $marketing_title: profileData?.email,
          branch_key: BRANCH_IO_KEY
        }
      };
      getMetaDataApi().then((MetaData) => {
        if (MetaData.data.metadata?.referralDeepLink?.length > 0) {
          setReferralDeepLinkUrl(MetaData.data.metadata.referralDeepLink);
        } else {
          Branch.link(linkData, function (err, link) {
            if (err) {
              return;
            }
            setReferralDeepLinkUrl(link);
            const NewMetaData = MetaData;
            NewMetaData.data.metadata = {
              ...NewMetaData.data.metadata,
              referralDeepLink: link
            };

            postMetaDataApi(JSON.stringify(NewMetaData.data.metadata));
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    const rewardHistoryPayload = {
      page: referralRewardTable.page,
      size: referralRewardTable.rowsPerPage
    };
    getReferralRewardHistory(rewardHistoryPayload).then((data) => {
      setReferralRewardHistory(data.tableData);
      setTotalCount(data.totalCount);
    });
  }, [referralRewardTable]);

  useEffect(() => {
    // get start and end time
    const timeRange = getTimeFrameRange(currentDate, duration);
    // earning data on first of every month will be 0
    // if (currentDate.getDate() === 1) return;
    getReferralEarningsByTimeFrame(timeRange).then((data) => setReferralEarnings(data));
  }, [duration]);

  const changeDuration = (event, selectedDuration) => {
    setDuration(selectedDuration ?? duration);
  };

  // pagination handler
  const changeRefereeHistoryTablePage = useCallback(
    (pageIndex) => {
      setRefereeHistoryTable({ ...refereeHistoryTable, page: pageIndex });
    },
    [refereeHistoryTable]
  );

  const changeRefereeHistoryTableRows = useCallback(
    (newRowsPerPage) => {
      setRefereeHistoryTable({
        ...refereeHistoryTable,
        rowsPerPage: newRowsPerPage
      });
    },
    [refereeHistoryTable]
  );

  const changeReferralRewardTablePage = useCallback(
    (pageIndex) => {
      setReferralRewardTable({ ...referralRewardTable, page: pageIndex });
    },
    [referralRewardTable]
  );

  const changeReferralRewardTableRows = useCallback(
    (newRowsPerPage) => {
      setReferralRewardTable({
        ...referralRewardTable,
        rowsPerPage: newRowsPerPage
      });
    },
    [referralRewardTable]
  );

  return {
    referralCode,
    referralEarnings,
    referralRewardHistory,
    refereeHistory,
    duration,
    changeDuration,
    refereeHistoryTable,
    referralRewardTable,
    totalCount,
    changeRefereeHistoryTablePage,
    changeRefereeHistoryTableRows,
    changeReferralRewardTablePage,
    changeReferralRewardTableRows,
    ReferralDeepLinkUrl
  };
};
