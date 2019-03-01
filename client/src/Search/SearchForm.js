import * as React from 'react';
import { Form, FormGroup, Input, Button} from 'reactstrap';

export default class SearchForm extends React.PureComponent {
  state = {
    summonerName : ' ' || this.props.match.params.summonerName,
    isNameInvalid: false
  }

  render() {
    return (
      <Form inline onSubmit={this.handleFromSubmit} className='justify-content-center'>
        {this.state.isNameInvalid && (
          <div className='d-block invalid-feedback mb-2'>Please enter a Summoner Name in valid format.</div>
        )}
        <FormGroup>
          <Input
            type='text'
            placeholder='Summoner Name'
            value={this.state.summonerName}
            onChange={this.handleSummonerNameChange}
            invalid={this.state.isNameInvalid}
            className='mr-2'
          />
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