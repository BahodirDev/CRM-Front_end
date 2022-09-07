import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class ConfirmExampleHeader extends Component {
  state = { open: false }

  s

  render() {
    return (
      <div>
        <Button onClick={this.show}>Show</Button>
        
      </div>
    )
  }
}

export default ConfirmExampleHeader