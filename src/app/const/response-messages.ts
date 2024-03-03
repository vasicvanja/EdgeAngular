export const ResponseMessages = {
    Create_success: (typeName: string) => `You've successfully created an ${typeName}!`,
    Delete_success: (typeName: string, objectName: string,) => `You've successfully deleted the ${typeName} ${objectName}.`,
    Sing_in_failure: "An error occurred while signing in. Please try again later.",
    Sing_up_failure: "An error occurred while signing up. Please try again later.",
    Delete_assurance: (object: string, name: string) => `Are you sure that you want to delete the ${object} ${name}`,
    Update_success: (typeName: string, objectName: string) => `You've successfully deleted the ${typeName} ${objectName}.`,
    Successfully_added_to_cart: (artworkName: string) => `You've successfulyy added the artwork ${artworkName} from the shopping cart.`,
    Unsuccessfully_added_to_cart: "Failed to add the artwork to the shopping cart. Please try again later.",
    Successfully_removed_from_cart: (artworkName: string) => `You've successfulyy removed the artwork ${artworkName} from the shopping cart.`,
    Unsuccessfully_removed_from_cart: "Failed to remove the artwork from the shopping cart. Please try again later."
}