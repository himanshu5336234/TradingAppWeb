import { getCompetitionName, getLeaderBoardDetails, getRankByNickName, getUserRankDetails } from "@/frontend-BL/redux/actions/LeaderBoard/GetLeaderBoardDetails.ac";
import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type RootState = {
  profile: {
    profileDetails: {
      userName: string;
    };
  };
};

interface TfilterOption {
  name: string;
  value: string;
}

export const useLeaderBoardDetails = () => {
  // states
  const { isLoggedIn } = useCheckLoginStatus();
  const { nickName } = useSelector((state: RootState) => ({
    nickName: state.profile.profileDetails?.userName
  }));
  const [leaders, setLeaders] = useState<Record<string, any>>({});
  const [userRankDetail, setUserRankDetail] = useState<Record<string, any>>({});
  const [tableData, setTableData] = useState<any[]>([]);
  const TableDataFromServer = useRef([]);
  //   const [fallBackTableData, setFallBackTableData] = useState([]);
  const [duration, setDuration] = useState<string>("DailyComp");
  // const [debounceTimeout, setDebounceTimeout] = useState<string | number | null | NodeJS.Timeout>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(5);
  const [renderTableBoolean, setRenderTableBoolean] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // intial filter state
  const [filterOptions, setFilterOptions] = useState<TfilterOption[]>([
    {
      name: "1 Day",
      value: "day"
    },
    { name: "1 Week", value: "week" },
    { name: "1 Month", value: "month" },
    { name: "Daily Competition", value: "DailyComp" },
    { name: "Live Competition", value: "Futures" }
  ]);

  const fetchLeaderBoardData = async (payload: any) => {
    setLoading(true);
    const leaderBoardData = await getLeaderBoardDetails(payload);
    if (isLoggedIn) {
      // get user details
      const userDetails = await getUserRankDetails(payload);
      userDetails.nickName = nickName ? userDetails?.nickName : "";
      setUserRankDetail(userDetails);
    }
    setLoading(false);
    setLeaders(leaderBoardData.winnersObj);
    TableDataFromServer.current = leaderBoardData.leaderBoardTableData;
    setTableData(leaderBoardData.leaderBoardTableData);
    //  setFallBackTableData(leaderBoardData.leaderBoardTableData);
  };

  const fetchCompetitionName = async () => {
    const LatestCompetitionName = await getCompetitionName();
    //  append latest competition to filter options
    if (LatestCompetitionName) {
      const updatedFilterOptions = [...filterOptions, { name: "Live Competition", value: LatestCompetitionName }];
      const uniqueFilterOptions = getUniqueFilterOptions(updatedFilterOptions);
      setFilterOptions(uniqueFilterOptions);
    }
  };

  const handleClearSearch = () => {
    (async () => await fetchLeaderBoardData({ count: 100, duration }))();
    setSearchName("");
  };
  const searchArray = (arr: string[], searchTerm: string): string[] => {
    // Escape special characters in the search term
    const term = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a regular expression with the search term
    const regex = new RegExp(`^${term}`, "i");

    // Filter the array to find matching elements
    const matchElements = arr.filter((element: any) => regex.test(element.nickname));

    return matchElements;
  };
  const performSearchWithApi = async (payload: any) => {
    if (payload.name === "") {
      handleClearSearch();
      return;
    }
    const searchResult = await getRankByNickName(payload);
    setTableData(searchResult);
  };
  const debounceSearch = (searchName: string) => {
    setSearchName(searchName);
    const SearchDate = searchArray(TableDataFromServer.current, searchName);
    setTableData(SearchDate);
  };

  const handlePageSize = (newSize: number) => setPageSize(newSize);

  const changeDuration = async (value: any) => {
    // call api based on search term
    if (searchName === "") {
      await fetchLeaderBoardData({ count: 100, duration: value });
    } else {
      await performSearchWithApi({ name: searchName, duration: value });
    }
    // update state
    setDuration(value);
  };

  const refreshScreen = () => setRenderTableBoolean(!renderTableBoolean);

  useEffect(() => {
    fetchCompetitionName();
    fetchLeaderBoardData({ count: 100, duration });
  }, [isLoggedIn, nickName]);

  // On refresh
  useEffect(() => {
    // clear search
    setSearchName("");
    setDuration("DailyComp");
    fetchLeaderBoardData({ count: 100, duration: "DailyComp" });
    // call table data
  }, [renderTableBoolean]);

  return {
    leaders,
    userRankDetail,
    tableData,
    duration,
    searchName,
    pageSize,
    handlePageSize,
    changeDuration,
    refreshScreen,
    debounceSearch,
    handleClearSearch,
    filterOptions,
    loading
  };
};

// helper

const getUniqueFilterOptions = (list: TfilterOption[]) => {
  // Create a Set to store unique objects
  const uniqueObjects = new Set();

  // Iterate over the array and add each object to the Set
  list.forEach((obj) => {
    // Use a combination of "name" and "value" as the uniqueness criterion
    const key = `${obj.name}-${obj.value}`;
    uniqueObjects.add(key);
  });

  // Convert the Set back to an array of unique objects
  const uniqueFilterOptions = Array.from(uniqueObjects).map((key: any) => {
    const [name, value] = key.split("-");
    return { name, value };
  });

  return uniqueFilterOptions;
};
