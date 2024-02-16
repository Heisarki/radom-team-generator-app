export function randomizeArrayIndex(length:number) {
    // const randomNumber = Math.floor(Math.random() * limit);
    const array: number[] = []
    for (let i = 0; i < length; i++)
        array.push(i)

    const shuffle = (array: number[]) => { 
        return array.sort(() => Math.random() - 0.5); 
    }; 
    return shuffle(array)
        // const array: number[] = []
        // for (let i = 0; i < length; i++)
        //     array.push(i)
        //     function shuffleArray(array:any) {
        //         for (let i = array.length - 1; i > 0; i--) {
        //             const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
        //             [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
        //         }
        //         return array;
        // }
        // console.log(shuffleArray(array))
        // return shuffleArray(array)
}