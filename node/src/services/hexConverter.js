class Converter {
    decimalToHex(value) {
        return "0x" + value.toString(16);
    }
}

module.exports = new Converter;
