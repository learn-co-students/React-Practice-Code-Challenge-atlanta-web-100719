import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.sushiList.map(sushi => {
            let eaten = props.eaten.includes(sushi)
            return <Sushi key={sushi.id} sushi={sushi} handleSushiClick={props.handleSushiClick} eaten={eaten} />
          })
        }
        <MoreButton handleMoreClick={props.handleMoreClick} />
      </div>
    </Fragment>
  )
}

export default SushiContainer