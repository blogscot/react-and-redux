import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'

import * as courseActions from '../../actions/courseActions'
import CourseForm from './courseForm'

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      course: Object.assign({}, props.course),
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onChange(event) {
    const field = event.target.name
    let course = this.state.course
    course[field] = event.target.value
    return this.setState({course: course})
  }

  onSave(event) {
    event.preventDefault()
    this.props.actions.saveCourse(this.state.course)
    this.context.router.push('/courses')
  }

  render() {
    const {authors} = this.props
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          allAuthors={authors}
          course={this.state.course}
          errors={this.state.errors}
          onChange={this.onChange}
          onSave={this.onSave}
          />
      </div>
    )
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' }

  const authorsFormatted = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    }
  })

  return {
    course: course,
    authors: authorsFormatted
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)

