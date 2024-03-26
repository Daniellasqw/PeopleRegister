export const addCPFMask = (value: string) => {
    value = value.replace(/\D/g, "");
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const addPhoneMask = (value: string) => {
    value = value.replace(/\D/g, "");
    return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export const addCnpjMask = (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return onlyNumbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export function extractPhraseAfterThirdHyphen(fileName: string | undefined) {
    if (typeof fileName === "undefined") {
        return "Imagem documento";
    }

    const hyphenCount = (fileName.match(/-/g) || []).length;
    if (hyphenCount < 3) {
        console.warn("O nome do arquivo não contém pelo menos três hífens. Retornando o nome original.");
        return fileName;
    }

    // Extrai a parte da frase após o terceiro hífen
    const parts = fileName.split("-");
    const phrase = parts.slice(3).join("-");
    return phrase;
}