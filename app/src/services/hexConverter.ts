class Converter {
    decimalToHex(value) {
        return "0x" + value.toString(16);
    }
}
let converter = new Converter;
export {converter as Converter}
