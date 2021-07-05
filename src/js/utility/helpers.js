export function sortByScore(highScore) {
    return highScore.sort(((a, b) => {
        return b.score - a.score
    }))
}

export function keepTopTen(highScore) {
    if(highScore.length <= 10) return highScore;
    return highScore.slice(0, 10);
}

export function getRank(topTen, name, score) {
    // This is not the best way to do this.
    // We know the array we are looping through only has 10 values so it's acceptable.
    // This approach is not scalable.
    // Fine for a little demo app like this.
    let rank = null;
    topTen.forEach((value, index)=> {
        if(name === value.name && score === value.score) {
            rank = index + 1; // plus 1 to correct for zero index
        }
    })
    return rank;
}
