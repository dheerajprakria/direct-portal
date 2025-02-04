import { EditIcon } from "@chakra-ui/icons";
import { auth } from "@/firebase/firebase";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";

type ChangePasswordFields = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
function Security() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordFields>();

  const newPassword = watch("newPassword");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: ChangePasswordFields) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.currentPassword}>
        <FormLabel fontSize="14px">Old Password</FormLabel>
        <Input
          placeholder="**********"
          {...register("currentPassword", { required: true })}
        />
        <FormErrorMessage>{errors.currentPassword?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.newPassword}>
        <FormLabel fontSize="14px">Enter New Pasword</FormLabel>
        <Input
          placeholder="**********"
          {...register("newPassword", {
            required: true,
          })}
        />
        <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.confirmNewPassword}>
        <FormLabel fontSize="14px">Re-enter New Password</FormLabel>
        <Input
          placeholder="**********"
          {...register("confirmNewPassword", {
            required: true,
            validate: (value) =>
              value === newPassword || "password do not match",
          })}
        />
        <FormErrorMessage>
          {errors.confirmNewPassword?.message}
        </FormErrorMessage>
      </FormControl>

      <Flex textAlign="end" align="center" justifyContent="end">
        <Button type="submit" colorScheme="teal" gap={2} isLoading={isLoading}>
          <EditIcon /> Update
        </Button>
      </Flex>
    </Stack>
  );
}

/**
 * Changes the password for the current user after verifying the current password.
 * @param currentPassword - The user's current password.
 * @param newPassword - The new password to be set.
 * @throws Will throw an error if the user is not signed in or if the password change fails.
 */
async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is signed in.");
  }

  // Create a credential using the current password
  const credential = EmailAuthProvider.credential(
    user.email || "", // Ensure email is not null
    currentPassword
  );

  try {
    // Re-authenticate the user
    // await user.reauthenticateWithCredential(credential);
    await reauthenticateWithCredential(user, credential);

    // Change the user's password
    // await user.updatePassword(newPassword);
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error("Error changing password:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

export default Security;
