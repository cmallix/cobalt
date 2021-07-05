import {getRank, keepTopTen, sortByScore} from "./helpers";


test("Sorting array of objects by highest score.", ()=>{

    const unsortedScores = [{score: 10}, {score: 40}, {score: 100}, {score: 64}]
    const sorted = sortByScore(unsortedScores);

    expect(sorted[0].score).toBe(100);
    expect(sorted[1].score).toBe(64);
    expect(sorted[2].score).toBe(40);
    expect(sorted[3].score).toBe(10);
});

test("Big array is reduced to first 10 items", ()=>{

    const bigArray = [{foo: '1'}, {foo: '2'}, {foo: '3'}, {foo: '4'}, {foo: '5'}, {foo: '6'}, {foo: '7'},
        {foo: '8'}, {foo: '9'}, {foo: '10'}, {foo: '11'}, {foo: '12'}, {foo: '13'}, {foo: '14'}, {foo: '15'},
        {foo: '16'}, {foo: '17'}, {foo: '18'}, {foo: '19'}, {foo: '20'}];

    const arrayOfTen = keepTopTen(bigArray);

    expect(arrayOfTen.length).toBe(10);
});

test("Will return index of ranked (named|scored) object or null.", ()=>{

    const highScores = [
        {name: 'a', score: 100},
        {name: 'b', score: 23},
        {name: 'c', score: 45},
        {name: 'd', score: 67},
        {name: 'e', score: 233},
        {name: 'f', score: 13},
        {name: 'g', score: 43}
    ];

    const index1 = getRank(highScores, "a", 100);
    const index4 = getRank(highScores, "d", 67);
    const index7 = getRank(highScores, "g", 43);
    const outOfBoundsIndex = getRank(highScores, "z", 100);

    expect(index1).toBe(1);
    expect(index4).toBe(3);
    expect(index7).toBe(7);
    expect(outOfBoundsIndex).toBe(null);


});
