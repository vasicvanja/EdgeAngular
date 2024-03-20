export const ResponseMessages = {
    Create_success: (typeName: string) => `Successfully created an ${typeName}!`,
    Delete_success: (typeName: string, objectName: string,) => `Successfully deleted the ${typeName} ${objectName}.`,
    Sing_in_failure: "An error occurred while signing in. Please try again later.",
    Sing_up_failure: "An error occurred while signing up. Please try again later.",
    Delete_assurance: (object: string, name: string) => `Are you sure that you want to delete the ${object} ${name}`,
    Update_success: (typeName: string, objectName: string) => `Successfully updated the ${typeName} ${objectName}.`,
    Successfully_added_to_cart: (artworkName: string) => `Successfulyy added the artwork ${artworkName} from the shopping cart.`,
    Unsuccessfully_added_to_cart: "Failed to add the artwork to the shopping cart. Please try again later.",
    Successfully_removed_from_cart: (artworkName: string) => `Successfulyy removed the artwork ${artworkName} from the shopping cart.`,
    Unsuccessfully_removed_from_cart: "Failed to remove the artwork from the shopping cart. Please try again later.",
    Update_smtp_success: "Successfully updated the Smtp Settings.",
    Update_smtp_failure: "Failed to update the Smtp Settings. Please try again later.",
    Send_contact_message_success: "Successfully sent a message!",
    Successfully_deleted_message: (email: string) => `Successfully removed the message from ${email}.`,
    Invalid_id: (objectName: string) => `Invalid ${objectName} Id`,
    Reply_sent_successfully:(email: string) => `Successfully sent a message to ${email}!`
}