import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Heading,
} from "@chakra-ui/react";


// Props for the modal
interface TaskDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: any; // The card details to be shown, can be null if no card is selected
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
    isOpen,
    onClose,
    card,
}) => {
    if (!card) return null; // If no card is selected, don't render anything

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    bg="#000"
                    color={"#fff"}
                    borderRadius="0.375rem 0.375rem 0 0"
                >
                    <Heading fontWeight={500} size="sm">
                        Job Name: {card.title}
                    </Heading>
                </ModalHeader>
                <ModalBody py={8}>
                    {/* Display the card details here */}
                    <Text fontSize="14px">
                        <b>Job Description</b>
                    </Text>
                    <Text mt={2}>
                        {card.description}
                    </Text>
                    <Text mt={4}>
                        Dead Line: <b>{card.deadline}</b>
                    </Text>
                </ModalBody>
                <ModalFooter borderTop="1px solid #ebebeb">
                    <Button size={"sm"} colorScheme="teal" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TaskDetailsModal;
