import { getAllAssignedProjects, ProjectBody } from "@/api/project";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LogCard from "./logCard";
import Loading from "../Loading";
import { useState } from "react";
import SearchBar from "../search";
import LoadingWrapper from "../global/loadingWrapper";
import TableEmty from "../notfound/tableEmty";

function ManagerProjectLogs() {
  const [filterText, setFilterText] = useState("");
  const allprojects = useQuery({
    queryKey: ["projects"],
    queryFn: getAllAssignedProjects,
  });
  if (allprojects.isLoading) return <Loading />;

  // Filtering function
  const filteredData = allprojects?.data?.data?.filter((item: ProjectBody) => {
    return (
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status?.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <>
      <LoadingWrapper isLoading={allprojects?.isLoading}>
        <Flex alignContent={"center"} justifyContent={"space-between"} pb="5">
          <Box>
            <Heading as="h5" size="md">
              Project Logs
            </Heading>
          </Box>
          <SearchBar filterText={filterText} setFilterText={setFilterText} />
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {filteredData?.map((projects: any, index: number) => (
            <Link key={index?.toString()} to={"/project-logs/" + projects?._id}>
              <LogCard
                type="servicing"
                border="1px"
                borderColor="gray.300"
                bg={"white"}
                projectInfo={projects as ProjectBody}
              />
            </Link>
          ))}
        </Grid>
        {filteredData?.length === 0 ? <TableEmty text="No projects yet" /> : null}
      </LoadingWrapper>
    </>
  );
}

export default ManagerProjectLogs;
