const logos = [];
const total = 2;

for (let i = 1; i <= total; i++) {
    const src = `../public/images/logo${i}.png`;
    if (!src) {
        break;
    } else {
        logos.push(src);
    }
}

export default logos;