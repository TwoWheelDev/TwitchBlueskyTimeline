export const truncateString = (str: string | undefined, maxLength: number) => {
    if (str && str.length > maxLength) {
        return str.substring(0, maxLength) + "..."
    }

    return str
}