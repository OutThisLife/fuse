import React, { PureComponent } from 'react'
import Rheostat from 'rheostat'
import styled from 'styled-components'
import kformat from '../../../helpers/kformat'

const RangeFilter = styled.div`
width: 100%;
padding: 0 55px;
position: relative;

.rheostat {
  overflow: none;
}

.rheostat-background {
  background-color: #fcfcfc;
  border: 5px solid #CCC;
  position: relative;
  border-radius: 5px;
}

.rheostat-progress {
  background-color: #abc4e8;
  position: absolute;
}

.rheostat-handle:before,
.rheostat-handle:after {
  content: '';
  display: block;
  position: absolute;
  background-color: #FFF;
  top: -20px;
}

.rheostat-handle {
  padding: 0;
  background: transparent;
  border: 0;
  margin-left: -40px;

  &:before {
    content: attr(aria-valuenow);
    padding: 2px 10px;
    border-radius: 4px;
    color: #707270;
    font-size: 16px;
    border: 2px solid #EDEDED;
    font-weight: 700;
    min-width: 75px;
  }
}
`

export default class RangeSlider extends PureComponent {
  shouldComponentUpdate ({ max }) {
    return this.props.max !== max
  }

  render () {
    return (
      <RangeFilter>
        <Rheostat
          {...this.props}
          ref={c => (this.$slider = c)}
          onValuesUpdated={e => {
            const $minInput = this.$slider.offsetParent.nextElementSibling
            const $maxInput = $minInput.nextElementSibling
            const min = e.values[0]
            const max = e.values[1]

            if (this.props.formatNumber) {
              this.$min.setAttribute('aria-valuenow', `${kformat(min)}`)
              this.$max.setAttribute('aria-valuenow', `${kformat(max)}`)
            } else {
              this.$min.setAttribute('aria-valuenow', `${min}`)
              this.$max.setAttribute('aria-valuenow', `${max}`)
            }

            $minInput.value = min
            $maxInput.value = max
          }}
        />
      </RangeFilter>
    )
  }
}
