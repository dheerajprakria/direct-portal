import { updateUserInfo } from "@/api/users";
import { useAuth } from "@/hooks/auth";
import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type UserDetails = {
  image: FileList;
  bio: string;
};
function Details() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<any>(null);
  const updateUser = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
  const { register, handleSubmit, watch } = useForm<UserDetails>({
    defaultValues: {
      bio: user?.user?.bio,
    },
  });
  const onSubmit = async (data: UserDetails) => {
    const file = data.image?.[0] || null;
    const formData = new FormData();
    formData.append("bio", data.bio);

    if (file) {
      const blob = new Blob([file], { type: file.type });
      formData.append("image", blob, file.name);
    }

    updateUser.mutate({ firebaseId: user.uid, body: formData });
  };
  const watchedFile: any = watch("image");

  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      const file = watchedFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [watchedFile]);
  return (
    <>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box mb={10}>
          <Heading as="h2" mb={1} size="md">
            Profile details
          </Heading>
          <Text fontSize={"15px"}>You can change your profile details here seamlessly.</Text>
        </Box>
        <hr></hr>
        <Flex my={10} gap={5}>
          <Box width="30%">
            <Heading as="h3" mb={1} size="xs">
              Profile Picture
            </Heading>
            <Text>This is where people will see your actual face.</Text>
          </Box>

          <Avatar
            width={"70px"}
            height={"70px"}
            src={preview || user?.user?.image}
            name={user?.user?.name}
            border={"1px solid grey"}
          />
          <Box width="100%">
            <FormControl
              textAlign="left"
              rounded="lg"
              bg="gray.50"
              p={10}
              border="1px solid"
              borderColor="#e2e8f0"
            >
              <Input
                textAlign="center"
                type="file"
                rounded="lg"
                p={1}
                border="0"
                {...register("image")}
              />
            </FormControl>
          </Box>
        </Flex>
        <hr></hr>
        <Flex my={10}>
          <Box width="30%">
            <Heading as="h3" mb={1} size="xs">
              Bio Description
            </Heading>
            <Text>This will be your main story. Keep it very, very long.</Text>
          </Box>
          <Box width="100%">
            <FormControl>
              <Textarea
                bg="gray.50"
                rounded="lg"
                rows={4}
                {...register("bio")}
              ></Textarea>
            </FormControl>
          </Box>
        </Flex>
        <Flex justifyContent={"flex-end"}>
          <Button
            gap={2}
            type="submit"
            colorScheme="teal"
            isLoading={updateUser.isPending}
          >
            <EditIcon /> Update
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Details;
