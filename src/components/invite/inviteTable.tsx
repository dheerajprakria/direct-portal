import {
    TableContainer,
    Thead,
    Tr,
    Td,
    Th,
    Table,
    Tbody,
    VStack,
    Text,
    Button,
    Flex,
    Heading,
} from "@chakra-ui/react";
// import ActionButton from "./ActionButton";
import { InvitationBody, updateOrRejectInvitation } from "@/api/invite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type TableData = {
    _id: string; // team _id
    Organization: {
        companyName: string;
    },
}
type ClickFunction = (data: InvitationBody) => Promise<void>;

type TeamTableRowData = {
    data: TableData[]
}
function InviteTable({ data }: TeamTableRowData) {
    const queryClient = useQueryClient()
    const acceptOrReject = useMutation({
        mutationFn: updateOrRejectInvitation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invitation"] })
        }
    });
    const onAction: ClickFunction = async (data) => {
        acceptOrReject.mutate(data);
    }

    return (
        <TableContainer mt={5} mb={10}>
            <Table variant="simple" colorScheme="black">
                <Thead>
                    <Tr>
                        <Th fontFamily="inherit">Orgnization</Th>
                        {/* <Th fontFamily="inherit" textAlign={"center"}>from</Th> */}
                        <Th fontFamily="inherit" textAlign={"center"}>Action</Th>
                    </Tr>
                </Thead>

                {
                    data?.length > 0 &&
                    <Tbody>

                        {data?.map((row, index) => {
                            return <TableRow row={row} key={index?.toString()} onClick={onAction}
                                isLoading={acceptOrReject.isPending}
                            />
                        })}

                    </Tbody>
                }
            </Table>
            {
                !data?.length &&
                <Flex width={"100%"} height={"200px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Heading size={"sm"}>
                        No Invitations
                    </Heading>
                </Flex>
            }
        </TableContainer>
    );
}


function TableRow({ row, onClick, isLoading }: { row: TableData, onClick?: ClickFunction, isLoading: boolean }) {

    const onReject = () => {
        onClick?.({
            teamId: row._id,
            status: "rejected"

        });
    }
    const onAccpet = () => {
        onClick?.({
            teamId: row._id,
            status: "accpted"
        });
    }
    return <Tr>
        <Td>
            <VStack gap={0} alignItems="left">
                <Text fontSize="12px">
                    {row?.Organization?.companyName}</Text>
            </VStack>
        </Td>
        <Td alignItems={"center"}>
            <Flex gap={"10px"} >
                <Button colorScheme="red" size={"sm"} onClick={onReject}
                    disabled={isLoading}
                >
                    reject
                </Button>
                <Button colorScheme="green" size={"sm"} onClick={onAccpet}
                    disabled={isLoading}
                >
                    Accept
                </Button>
            </Flex>
            {/* <ActionButton /> */}
        </Td>
    </Tr>
}
export default InviteTable;
