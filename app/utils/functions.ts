// Utility function to generate a random string
export const generateRandomString = (length: number): string => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const result: string = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result.concat(characters.charAt(randomIndex));
    }
    return result;
}
