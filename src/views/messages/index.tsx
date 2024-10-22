import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import ChatPage from "@/components/messages/chat/chat";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
function Messages() {
  const [IsCustomerChat, setIsCustomerChat] = useState<boolean>(true);
  return (
    <>
      <Box bg="#f1ff00" h={120}></Box>
      <Box mt={-100} px={70}>
        <ButtonToggle IsCustomerChat={IsCustomerChat} setIsCustomerChat={setIsCustomerChat} />
        <ChatPage isCustomerChat={IsCustomerChat} />
      </Box>
    </>
  );
}

function ButtonToggle({ IsCustomerChat, setIsCustomerChat }: { IsCustomerChat: boolean, setIsCustomerChat: Function }) {
  const { user } = useAuth();
  if (user.role !== "servicing") return null;

  return <Flex justifyContent={"center"} p={1} >
    <ButtonGroup size={"sm"} colorScheme="pink" spacing={0} >
      <Button borderRadius={0} variant={IsCustomerChat ? "solid" : "outline"} onClick={() => setIsCustomerChat(true)}>customer</Button>
      <Button borderRadius={0} variant={IsCustomerChat ? "outline" : "solid"} onClick={() => setIsCustomerChat(false)}>Internal</Button>
    </ButtonGroup>



  </Flex>

}

export default Messages;
