export default class LocalStorer {
    save(key, val) {
        const json = JSON.stringify(key, val)
        console.log(json)
    }
}