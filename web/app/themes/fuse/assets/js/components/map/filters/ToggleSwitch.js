import React from 'react'
import styled from 'styled-components'

const Toggle = styled.label`
cursor: pointer;
display: inline-block;
position: relative;
vertical-align: middle;
margin: 0;

input[type=checkbox] {
  opacity: 0;
}

span {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: 22px;
  height: 14px;
  border-radius: 7px;
  border: 1px solid #DDD;
  background: #FFF;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 1px;
    bottom: 0;
    width: 11px;
    border: 1px solid #DDD;
    border-radius: 100em;
    transition: .3s ease-in-out;
    background: rgba(0,0,0,.1);
  }
}

input:checked + span:before {
  transform: translate(100%, 0);
  background: #F18903;
}
`

export default ({ title, name, value }) => (
  <Toggle>
    <input type='checkbox' name={name} value={value} />
    <span /> {title}
  </Toggle>
)
