import {
    createReadStream,
    createWriteStream,
} from 'node:fs';


const readableStream = createReadStream("input.txt");

const writeableStream = createWriteStream("output.txt");

const data = []

const sortingHandler = () => {
    const dirtyArray = data?.map(el=> el.replaceAll('\r', ' ').replaceAll('\n', ' ').replaceAll(' ', ',').split(',').filter(el => el))
    const sortingArray = dirtyArray?.flat().reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {})

    return `[${Object.values(sortingArray)}]`
}

readableStream.on('data', (chunk) => {
    data.push(chunk.toString())
})


readableStream.on('end', () => {

    try {
        writeableStream.write(sortingHandler())

    } catch (err) {
        throw new Error(err)
    } finally {
        writeableStream.end()
    }
})