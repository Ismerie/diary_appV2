export const getEmojiFeeling = (feeling) => {
    switch (feeling) {
        case "happy":
            return "😄";
        case "inlove":
            return "😍"
        case "laughing":
            return "😂"
        case "sad":
            return "😢"
        case "chocked":
            return "😮"
        case "angry":
            return "😡"
    }
}

export const getStrFeeling = (feeling) => {
    switch (feeling) {
        case "😄":
            return "happy";
        case "😍":
            return "inlove"
        case "😂":
            return "laughing"
        case "😢":
            return "sad"
        case "😮":
            return "chocked"
        case "😡":
            return "angry"
    }
}