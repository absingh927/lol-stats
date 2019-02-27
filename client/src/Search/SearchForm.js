import * as React from 'react';
import { Form, FormGroup, Input, FormFeedback, Button} from 'reactstrap';

export default class SearchForm extends React.PureComponent {
  state = {
    summonerName : ' ' || this.props.match.params.summonerName,
    isNameInvalid: false
  }

  render() {
    return (
      <Form onSubmit={this.handleFromSubmit}>
        <FormGroup>
          <Input
            type='text'
            placeholder='Summoner Name'
            value={this.state.summonerName}
            onChange={this.handleSummonerNameChange}
            invalid={this.state.isNameInvalid}
            className='mr-2'
          />
          <FormFeedback>Please enter a Summoner Name in valid format.</FormFeedback>
        </FormGroup>
        <Button color='danger'>Search</Button>
      </Form>
    );
  }

  handleSummonerNameChange = (e) => {
    const name =  e.target.value;    
    if (name.length > 0 && !this.isValidSummonerName(name)) {
      this.setState({
        isNameInvalid: !this.setState.isNameInvalid,
        summonerName: name,
      })
    } else {
      this.setState({
        summonerName: name,
        isNameInvalid: false,
      })
    }
  }

  handleFromSubmit = (e) => {
    e.preventDefault();
    //push to summoner page
    this.props.history.push(`/summoner/${this.state.summonerName}`);
  }

  isValidSummonerName = (name) => name.length > 0 && /^[\da-zA-Z _.]+$/g.test(name);
}