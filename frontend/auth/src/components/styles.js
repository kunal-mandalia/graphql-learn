import styled, { css } from 'react-emotion'

export const Container = styled('div')`
  padding: 15px;
`
export const TextInput = styled('input')`
  font-size: large;
  margin: 4px;
  height: 30px;
`
export const Button = styled('button')`
  padding: 18px 22px;
  background-color: ${p => p.btnStyle === 'success'
    ? 'green'
    : p.btnStyle === 'danger'
      ? 'red'
      : 'purple'
  }
  color: white;
  font-size: large;
`
