import React from 'react'

const style = {
  width: '100%',
  height:'100%',
  border: "solid 1px #000",
  background: "#6bf06b"

};

const styleTd = {
  border: 'solid 1px silver'
};

const elementTable = ({ name }) => {
  return (
    <table style={{...style}}>
      <tbody>
      <tr>
        <td style={{...styleTd}}>
          пивет
        </td>
        <td style={{...styleTd}}>
          мир
        </td>
      </tr>
      <tr>
        <td style={{...styleTd}}>
          пока
        </td>
        <td style={{...styleTd}}>
          мир
        </td>
      </tr>
      </tbody>
    </table>
  )
};
export default elementTable