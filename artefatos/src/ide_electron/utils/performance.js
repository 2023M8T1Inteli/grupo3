function calc(hits, mistakes) {
    var sum = hits + mistakes

    return (hits/ sum) * 100
}

module.exports = calc