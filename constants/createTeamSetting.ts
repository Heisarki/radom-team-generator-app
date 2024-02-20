const NUMBER_IN_WORDS: string[] = [
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
] as const

const NUMBER_OF_TEAM_ARR: any = []
for (let i = 0; i < 10; i++) {
    NUMBER_OF_TEAM_ARR.push({
        id: i,
        number: i + 2,
        numberInWords: NUMBER_IN_WORDS[i]
    })
}

export {
    NUMBER_IN_WORDS,
    NUMBER_OF_TEAM_ARR
}