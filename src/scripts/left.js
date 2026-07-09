import logos from "./logos.js";

export function left(logo, state) {
  state.currentLogo--;

  if (state.currentLogo < 0) {
    state.currentLogo = logos.length - 1;
  }
  logo.src = logos[state.currentLogo];
}