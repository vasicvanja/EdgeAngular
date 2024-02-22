export const ResponseMessages = {
    Create_success: (typeName: string) => `You've successfully created an ${typeName}!`,
    Delete_success: (typeName: string, objectName: string,) => `You've successfully deleted the ${typeName} ${objectName}.`,
    Sing_in_failure: "An error occurred while signing in. Please try again later.",
    Sing_up_failure: "An error occurred while signing up. Please try again later.",
    Delete_assurance: (object: string, name: string) => `Are you sure that you want to delete the ${object} ${name}`,
    Update_success: (typeName: string, objectName: string) => `You've successfully deleted the ${typeName} ${objectName}.`,
}