type ItemSuggestionProps = {
    teste: string
}

export function ItemSuggestion({ teste }: ItemSuggestionProps) {
    return (
        <button>{ teste }</button>
    )
}