import styled, { css } from 'react-emotion'

const btnBase = css`
  cursor: pointer;
  padding: 18px 22px;
  color: white;
  font-size: large;
`
const bgGreen = css`
  ${btnBase};
  background-color: green;
`
const hoverBgGreen = css`
  transition: all 0.25s;
  :hover {
    background-color: darkGreen;
  }
`
const bgPurple = css`
  background-color: purple;
`
const hoverBgPurple = css`
  transition: all 0.25s;
  :hover {
    background-color: #5d015d;
  }
`
const btnSuccess = css`
  ${btnBase};
  ${bgGreen};
  ${hoverBgGreen};
`
const btnPrimary = css`
  ${btnBase};
  ${bgPurple};
  ${hoverBgPurple};
`
const btnDisabled = css `
  cursor: not-allowed;
  background-color: lightGrey;
  &:hover {
    background-color: lightGrey;
  }
`
const primary = css`
  background-color: red;
`
export const Container = styled('div')`
  padding: 15px;
`
export const TextInput = styled('input')`
  font-size: large;
  margin: 4px;
  height: 30px;
`
export const Button = styled('button')`
${p => p.btnStyle === 'success' ? btnSuccess : btnPrimary}
${p => p.disabled && btnDisabled }
`
export const SpaceV = styled('div')`
  margin: ${p => p.size || '8px'} 0;
`
export const SpaceH = styled('div')`
  margin: 0 ${p => p.size || '8px'};
`
export const Gradient = styled('div')`
  background: #8E0E00;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #1F1C18, #8E0E00);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #1F1C18, #8E0E00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`