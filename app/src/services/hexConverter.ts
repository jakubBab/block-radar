class Converter {
    decimalToHex(value) {
        return "0x" + value.toString(16);
    }
}
const converter = new Converter;
export {converter as Converter};
