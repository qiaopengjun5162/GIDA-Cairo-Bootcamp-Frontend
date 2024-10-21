"use client";
import { useContractRead, useAccount, useBalance } from "@starknet-react/core";
import Balance from "./components/balance";
import Header from "./components/header";
import StudentsTable from "./components/students-table";
import StudentsTableControl from "./components/students-table-control";
import TotalStudents from "./components/total-students";
import { contractAddress, dummyStudents } from "./lib/data";
import { ABI } from "./abis/abi";
import Loading from "./components/loading";

export default function Home() {
  // TODO - Fetch Students from Contract
  const {
    data: allStudents,
    isLoading: isLoadingStudents,
    refetch: refetchStudents,
    isFetching: isFetchingStudents,
  } = useContractRead({
    functionName: "get_all_students",
    args: [],
    abi: ABI,
    address: contractAddress,
  });

  console.log(allStudents);
  const { address, status } = useAccount();
  const { data, error } = useBalance({
    address,
    token: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  });

  return (
    <div className="py-[60px] px-[100px]">
      <Header />
      {isLoadingStudents || isFetchingStudents ? (
        <Loading message="Fetching students..." />
      ) : (
        <div className="mt-[60px]">
          <div className="flex justify-between items-center">
            {/* TODO: - Pass correct students length */}
            <TotalStudents total={allStudents?.length || 0} />
            <Balance />
          </div>
          {/* TODO: - Pass correct students */}
          <StudentsTable students={allStudents ? allStudents : []} />
          {/* TODO: - Pass correct students length */}
          <StudentsTableControl
            count={allStudents ? allStudents.length : 0}
            handleRefreshStudents={() => {
              refetchStudents();
              console.log("Handle refetch");
            }}
          />
        </div>
      )}
    </div>
  );
}
