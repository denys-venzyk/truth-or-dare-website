const logos = [];
const total = 10;

for (let i = 1; i <= total; i++) {
    const src = `./images/logo${i}.png`;
    if (!src) {
        break;
    } else {
        logos.push(src);
    }
}

export default logos;