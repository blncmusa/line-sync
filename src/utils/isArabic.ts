export const isArabic = (text: string) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    console.log("isArabic", arabicPattern.test(text));
    return arabicPattern.test(text);
};