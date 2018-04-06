//Dependencies
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

//MaterialUI
  //Components
  import Checkbox from 'material-ui/Checkbox';
  import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
  import Paper from 'material-ui/Paper';
  import RaisedButton from 'material-ui/RaisedButton';

  //Icons
  import AccountCircle from 'material-ui/svg-icons/action/account-circle';
  import AccountCircleBorder from 'material-ui/svg-icons/toggle/check-box-outline-blank';
  //Colors
  import {red700} from 'material-ui/styles/colors';

//Actions
import {getStudents} from '../../actions/students/studentsAction'
import {getBatches} from '../../actions/batches/batchesAction'

//Components

class Students2Batches extends PureComponent {
  state={

  }

  capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
  checkboxClickChecker = (student) => {

  }
  componentWillMount() {
    const {students, batches, authenticated, getStudents, getBatches} = this.props
    if (authenticated) {
      if (students === null) getStudents()
      if (batches === null) getBatches()
    }
  }

	render() {
    const {students, batches, authenticated, match} = this.props
    if (!authenticated) return (
      <Redirect to="/login" />
    )
    if(!students) this.componentWillMount()
		return (
        <div style={{
          overflow: 'hidden'
        }}>
          <div style={{
            height: 364,
            width: '100%',
            position: 'relative',
            top: 0,
            backgroundColor: red700,
          }}>
          { students &&
            <h1 style={{
              position: 'relative',
              top: 130,
              color: 'white',
            }}>{`/ ${this.capitalize(match.path.slice(1))} /`}</h1>
          }
          <p style={{
            position: 'relative',
            top: 130,
            color: 'white',
          }}>Your Teaching journey starts here!</p>
          </div>
            <div className='card-wrapper' style={{
              textAlign: 'center',
              height: 300,
            }}>
            <Paper style={{
              position: 'relative',
              top: 20,
              left: 300,
              width: 300,
              height: 270,
              overflow: 'scroll',
            }}>
              {students &&
              <div className='students2batch-wrapper'>
                {students.map((student) => {
                    return <ul>
                    <Checkbox
                      onClick={_=> this.checkboxClickChecker(student)}
                      checkedIcon={<AccountCircle />}
                      uncheckedIcon={<AccountCircleBorder />}
                      label={`${student.firstName} ${student.lastName}`}
                      style={{
                        width: 300,
                        margin: 0,
                      }}
                    /></ul>
                })}
              </div>}
            </Paper>
            <Paper style={{
              position: 'relative',
              left: 700,
              top: -250,
              width: 300,
              height: 270,
              overflow: 'scroll',
            }}>
              {batches &&
              <div className='batch2students-wrapper'>
              <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                {batches.map((batch) => {
                  return<
                    RadioButton
                      value="light"
                      label={`Batch:${batch.batchNumber}`}
                      style={{
                        width: 100,
                        margin: 5,
                        marginTop: 15,
                      }}
                    /
                  >
                })}
              </RadioButtonGroup>
              </div>}
            </Paper>
            <RaisedButton
              label="Connect"
              backgroundColor='#d32f2f'
              labelColor='#ffffff'
              style={
                {
                  width:'10%',
                  position: 'relative',
                  top: -400,
                  left: 500,
                }
              }
              onClick={_ => console.log(this.state)}
            />
          </div>
        </div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
    authenticated: state.currentTeacher !== null,
    batches: state.batches === null ?
    null : Object.values(state.batches).sort((a, b) => a.id - b.id),
    students: state.students === null ?
    null : Object.values(state.students).sort((a, b) => a.id - b.id)
	}
}

const mapDispatchToProps = {
  getStudents,
  getBatches,
}

export default connect(mapStateToProps, mapDispatchToProps)(Students2Batches)
